"""
Synchronously index a single EvidenceRevision in the Gemini File Search Store,
bypassing Huey entirely.

Why: when a FileSearchTable row is stuck in ``uploading`` (e.g. Huey worker was
restarted mid-flight), there is no way from the UI to know whether the problem
is Gemini-side (slow / throttled indexing) or worker-side (orphaned row). This
command runs the *exact* same upload+poll flow as the Huey task in the
foreground, with per-step timing, so you can tell the two apart.

Usage examples:
    # Index a revision (only works if no durable doc yet)
    poetry run python manage.py index_evidence_now <revision_id>

    # Force re-index, clearing any existing FileSearchTable row first
    poetry run python manage.py index_evidence_now <revision_id> --reset

    # Override the polling cap for slow Gemini indexing jobs
    poetry run python manage.py index_evidence_now <revision_id> --reset --max-wait 3600

    # Inside a Docker container (example: ciso staging)
    docker exec -it dcbd9fcf15a7 \
        poetry run python manage.py index_evidence_now <revision_id> --reset

The command updates the FileSearchTable row in the same way the Huey task
would, so a successful run also clears the stuck ``uploading`` state in the UI.
"""

import os
import time

from django.core.management.base import BaseCommand, CommandError

from core.gemini_file_search import GEMINI_ENABLED, get_gemini_client
from core.models import Evidence, EvidenceRevision, FileSearchTable
from core.tasks_gemini import (
    _build_evidence_custom_metadata,
    _materialize_attachment,
)


class Command(BaseCommand):
    help = (
        "Synchronously index a single evidence revision in Gemini File Search "
        "Store (bypasses Huey). Use to isolate Gemini-side issues from worker "
        "issues when a row is stuck in 'uploading'."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "revision_id",
            type=str,
            help=(
                "UUID of the EvidenceRevision to index. You may also pass an "
                "Evidence UUID (e.g. the id from /evidences/<id>) and the latest "
                "revision with an attachment is selected automatically."
            ),
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help=(
                "Delete any existing FileSearchTable row first. Required to "
                "re-index a revision that already has a durable doc, or to "
                "force-unstick a row in 'uploading'."
            ),
        )
        parser.add_argument(
            "--max-wait",
            type=int,
            default=None,
            help=(
                "Override GEMINI_INDEX_MAX_WAIT_SECONDS for this run only "
                "(seconds). Default = value from env / 1800."
            ),
        )
        parser.add_argument(
            "--poll-interval",
            type=int,
            default=3,
            help="Polling interval in seconds (default: 3).",
        )

    def handle(self, *args, **options):
        revision_id = options["revision_id"]
        reset = options["reset"]
        max_wait = options["max_wait"]
        poll_interval = options["poll_interval"]

        # 1. Validate Gemini config -----------------------------------------
        if not GEMINI_ENABLED:
            raise CommandError(
                "Gemini is not configured: GEMINI_API_KEY is missing in this "
                "process's environment. If running via PM2, verify start-pm2.sh "
                "forwards GEMINI_API_KEY into the env block for the worker AND "
                "for whichever process you're running this command from."
            )

        client = get_gemini_client()
        if not client:
            raise CommandError("Failed to initialize Gemini client.")
        if not client.store_name:
            raise CommandError(
                "GEMINI_FILE_SEARCH_STORE_NAME is not configured — cannot "
                "index to a File Search Store."
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Gemini OK — store={client.store_name}"
            )
        )

        # 2. Load revision ---------------------------------------------------
        # Accept either an EvidenceRevision id or an Evidence id (the id shown in
        # the /evidences/<id> URL). If it's not a revision, resolve it as an
        # Evidence and pick the latest revision that has an attachment.
        try:
            revision = EvidenceRevision.objects.select_related("evidence").get(
                id=revision_id
            )
        except ValueError as exc:
            raise CommandError(f"Invalid UUID '{revision_id}': {exc}")
        except EvidenceRevision.DoesNotExist:
            try:
                evidence = Evidence.objects.get(id=revision_id)
            except (Evidence.DoesNotExist, ValueError):
                raise CommandError(
                    f"No EvidenceRevision or Evidence found with id {revision_id}."
                )

            revision = (
                evidence.revisions.filter(attachment__isnull=False)
                .exclude(attachment="")
                .order_by("-version")
                .select_related("evidence")
                .first()
            )
            if revision is None:
                raise CommandError(
                    f"Evidence '{evidence.name}' ({revision_id}) has no revision "
                    "with an attachment to index."
                )
            self.stdout.write(
                self.style.WARNING(
                    f"Resolved Evidence {revision_id} -> latest revision with a "
                    f"file: {revision.id} (v{revision.version})"
                )
            )
            revision_id = str(revision.id)

        if not revision.attachment:
            raise CommandError(
                f"EvidenceRevision {revision_id} has no attachment — nothing "
                "to index."
            )

        evidence_name = (
            revision.evidence.name if revision.evidence else "<unknown>"
        )
        self.stdout.write(
            f"Revision:   {revision_id}\n"
            f"  Evidence:   {evidence_name}\n"
            f"  Attachment: {revision.attachment.name}"
        )

        # 3. Inspect / reset existing FileSearchTable row -------------------
        fs_row = FileSearchTable.objects.filter(
            evidence_revision=revision
        ).first()

        if fs_row is not None:
            self.stdout.write(
                "  Existing row: "
                f"status={fs_row.upload_status} "
                f"doc={fs_row.gemini_document_id or '-'} "
                f"updated_at={fs_row.updated_at}"
            )
            if fs_row.is_indexed() and not reset:
                self.stdout.write(
                    self.style.WARNING(
                        f"Already indexed ({fs_row.chunk_count or 1} document(s)). "
                        "Pass --reset to force re-index."
                    )
                )
                return
            if reset:
                self.stdout.write(
                    self.style.WARNING("--reset: deleting existing row")
                )
                fs_row.delete()
                fs_row = None

        if fs_row is None:
            fs_row = FileSearchTable.objects.create(
                evidence_revision=revision,
                upload_status=FileSearchTable.UploadStatus.PENDING,
                gemini_document_id="",
                gemini_store_id="",
            )

        fs_row.upload_status = FileSearchTable.UploadStatus.UPLOADING
        fs_row.error_message = None
        fs_row.save()

        # 4. Synchronously call Gemini --------------------------------------
        display_name = f"{evidence_name} - {revision.evidence.filename()}"
        custom_metadata = _build_evidence_custom_metadata(revision)

        self.stdout.write(
            "\nStarting direct upload (no Huey) — timing each step..."
        )
        t_start = time.monotonic()

        try:
            with _materialize_attachment(revision.attachment) as file_path:
                t_after_materialize = time.monotonic()
                try:
                    size_bytes = os.path.getsize(file_path)
                except OSError:
                    size_bytes = -1
                self.stdout.write(
                    f"  [t={t_after_materialize - t_start:6.2f}s] "
                    f"attachment materialized -> {file_path} "
                    f"({size_bytes} bytes)"
                )

                upload_kwargs = {
                    "file_path": file_path,
                    "display_name": display_name,
                    "custom_metadata": custom_metadata,
                    "poll_interval": poll_interval,
                }
                if max_wait is not None:
                    upload_kwargs["max_wait_seconds"] = max_wait

                t_before_upload = time.monotonic()
                self.stdout.write(
                    f"  [t={t_before_upload - t_start:6.2f}s] "
                    "calling upload_evidence_file_and_wait(...) — splits large "
                    "PDFs into page-range chunks; blocks until Gemini reports "
                    "done / failed / timeout."
                )

                result = client.upload_evidence_file_and_wait(**upload_kwargs)

            t_total = time.monotonic() - t_start
            self.stdout.write(
                f"\n[t={t_total:6.2f}s total] Gemini returned "
                f"status={result.get('status')!r}"
            )
            self.stdout.write(
                f"  operation_id={result.get('operation_id') or '-'}"
            )

            if result["status"] == "completed":
                doc_ids = result.get("gemini_document_ids") or (
                    [result["gemini_document_id"]]
                    if result.get("gemini_document_id") else []
                )
                fs_row.gemini_document_ids = doc_ids
                fs_row.gemini_document_id = doc_ids[0] if doc_ids else ""
                fs_row.chunk_count = result.get("chunk_count", len(doc_ids))
                fs_row.gemini_store_id = result.get("gemini_store_id", "")
                fs_row.operation_id = (
                    result.get("operation_id", "") or fs_row.operation_id
                )
                fs_row.upload_status = FileSearchTable.UploadStatus.COMPLETED
                fs_row.error_message = None
                fs_row.save()
                self.stdout.write(
                    self.style.SUCCESS(
                        f"  PASS — indexed {fs_row.chunk_count} document(s)"
                    )
                )
                for d in result.get("documents", []) or []:
                    self.stdout.write(
                        f"    - pages {d.get('page_range', '?')}: "
                        f"{d.get('gemini_document_id', '-')}"
                    )
                if not result.get("documents"):
                    self.stdout.write(f"    - {fs_row.gemini_document_id}")
                self.stdout.write(
                    "\nConclusion: Gemini works for this evidence. The "
                    "earlier 'uploading' state was a worker-side issue "
                    "(orphaned row), not Gemini."
                )
                return

            error_msg = result.get("error", "Unknown error")
            fs_row.upload_status = FileSearchTable.UploadStatus.FAILED
            fs_row.error_message = error_msg
            fs_row.operation_id = (
                result.get("operation_id", "") or fs_row.operation_id
            )
            fs_row.save()
            self.stdout.write(
                self.style.ERROR(
                    f"  FAIL [{result['status']}]: {error_msg}"
                )
            )
            if result["status"] == "timeout":
                self.stdout.write(
                    "\nConclusion: Gemini accepted the upload but its "
                    "long-running indexing operation did not finish within "
                    "the configured budget. This is a Gemini-side delay; "
                    "raise --max-wait or set GEMINI_INDEX_MAX_WAIT_SECONDS "
                    "and retry."
                )
            else:
                self.stdout.write(
                    "\nConclusion: Gemini itself returned an error — see "
                    "message above. Not a worker issue."
                )

        except Exception as exc:
            fs_row.upload_status = FileSearchTable.UploadStatus.FAILED
            fs_row.error_message = f"{type(exc).__name__}: {exc}"
            fs_row.save()
            self.stdout.write(
                self.style.ERROR(
                    f"\nException during indexing: {type(exc).__name__}: {exc}"
                )
            )
            raise
