"""
Preflight check: create a throwaway Evidence, index it in the Gemini File Search
Store using the exact same upload+poll flow as the production Huey task, and
verify it reached ``is_indexed()``.

Prints a GREEN summary on success and a RED summary on failure, and exits with
status 0 (success) or 1 (failure) so it can gate a go-live checklist or CI.

Usage:
    # Run the full create -> index -> verify -> cleanup cycle
    poetry run python manage.py check_evidence_indexing

    # Keep the test evidence (and its indexed document) instead of deleting it
    poetry run python manage.py check_evidence_indexing --keep

    # Attach the test evidence to a specific folder (defaults to root)
    poetry run python manage.py check_evidence_indexing --folder <folder_id>

    # Override the Gemini indexing poll cap (seconds) for slow stores
    poetry run python manage.py check_evidence_indexing --max-wait 3600
"""

import time
from datetime import datetime, timezone as dt_timezone

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError

from iam.models import Folder

from core.gemini_file_search import GEMINI_ENABLED, get_gemini_client
from core.models import Evidence, EvidenceRevision, FileSearchTable
from core.tasks_gemini import (
    _build_evidence_custom_metadata,
    _materialize_attachment,
)

# Small, self-contained text payload so the store has something real to chunk
# and index. Kept tiny so the round-trip is fast.
SAMPLE_EVIDENCE_TEXT = (
    "Preflight indexing check.\n\n"
    "This is an automatically generated evidence document used to verify that "
    "evidence upload and Gemini File Search indexing work end to end on this "
    "server. It contains a short paragraph of representative compliance text so "
    "the File Search Store has real content to chunk, embed, and index.\n\n"
    "Control: access to production systems is restricted to authorized "
    "personnel and reviewed quarterly. Evidence of the review is retained for "
    "audit purposes.\n"
)


class Command(BaseCommand):
    help = (
        "Create a throwaway evidence, index it in the Gemini File Search Store "
        "(real upload flow), verify it indexed, and report GREEN/RED."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--keep",
            action="store_true",
            help=(
                "Do not delete the test evidence and its indexed document after "
                "the check. Default: clean everything up."
            ),
        )
        parser.add_argument(
            "--folder",
            type=str,
            default=None,
            help="Folder UUID to attach the test evidence to (default: root folder).",
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
            help="Polling interval in seconds while indexing (default: 3).",
        )

    # -- small colored helpers -------------------------------------------------
    def _ok(self, msg):
        self.stdout.write(self.style.SUCCESS(msg))

    def _warn(self, msg):
        self.stdout.write(self.style.WARNING(msg))

    def _err(self, msg):
        self.stdout.write(self.style.ERROR(msg))

    def handle(self, *args, **options):
        keep = options["keep"]
        folder_id = options["folder"]
        max_wait = options["max_wait"]
        poll_interval = options["poll_interval"]

        evidence = None
        fs_row = None
        client = None

        try:
            # 1. Validate Gemini configuration --------------------------------
            self.stdout.write("Step 1/4: validating Gemini configuration...")
            if not GEMINI_ENABLED:
                raise CommandError(
                    "GEMINI_API_KEY is missing in this process's environment — "
                    "cannot index. If running under PM2, restart the worker so it "
                    "reloads backend/.env (pm2 restart dev-huey dev-backend)."
                )
            client = get_gemini_client()
            if not client:
                raise CommandError("Failed to initialize the Gemini client.")
            if not client.store_name:
                raise CommandError(
                    "GEMINI_FILE_SEARCH_STORE_NAME is not configured — cannot "
                    "index to a File Search Store."
                )
            self._ok(f"  OK - Gemini configured (store={client.store_name})")

            # 2. Create the throwaway evidence + revision ---------------------
            self.stdout.write("Step 2/4: creating test evidence...")
            if folder_id:
                try:
                    folder = Folder.objects.get(id=folder_id)
                except (Folder.DoesNotExist, ValueError):
                    raise CommandError(f"Folder '{folder_id}' not found.")
            else:
                folder = Folder.get_root_folder()

            stamp = datetime.now(dt_timezone.utc).strftime("%Y%m%d-%H%M%S")
            evidence = Evidence.objects.create(
                name=f"[preflight] index check {stamp}",
                description="Auto-generated by check_evidence_indexing.",
                folder=folder,
            )
            revision = EvidenceRevision.objects.create(
                evidence=evidence,
                folder=folder,
                version=1,
            )
            revision.attachment.save(
                f"preflight-index-check-{stamp}.txt",
                ContentFile(SAMPLE_EVIDENCE_TEXT.encode("utf-8")),
                save=True,
            )
            self._ok(
                f"  OK - evidence '{evidence.name}' "
                f"(id={evidence.id}, revision={revision.id})"
            )

            # 3. Index it synchronously (same flow as the Huey task) ----------
            self.stdout.write("Step 3/4: indexing in Gemini File Search Store...")
            fs_row = FileSearchTable.objects.create(
                evidence_revision=revision,
                upload_status=FileSearchTable.UploadStatus.UPLOADING,
                gemini_document_id="",
                gemini_store_id="",
            )

            display_name = f"{evidence.name} - {revision.filename()}"
            custom_metadata = _build_evidence_custom_metadata(revision)

            upload_kwargs = {
                "file_path": None,  # set inside the context manager below
                "display_name": display_name,
                "custom_metadata": custom_metadata,
                "poll_interval": poll_interval,
            }
            if max_wait is not None:
                upload_kwargs["max_wait_seconds"] = max_wait

            t_start = time.monotonic()
            with _materialize_attachment(revision.attachment) as file_path:
                upload_kwargs["file_path"] = file_path
                result = client.upload_evidence_file_and_wait(**upload_kwargs)
            elapsed = time.monotonic() - t_start

            if result.get("status") == "completed":
                doc_ids = result.get("gemini_document_ids") or (
                    [result["gemini_document_id"]]
                    if result.get("gemini_document_id")
                    else []
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
                self._ok(
                    f"  OK - upload completed in {elapsed:.1f}s "
                    f"({fs_row.chunk_count} document(s))"
                )
            else:
                error_msg = result.get("error", "Unknown error")
                fs_row.upload_status = FileSearchTable.UploadStatus.FAILED
                fs_row.error_message = error_msg
                fs_row.operation_id = (
                    result.get("operation_id", "") or fs_row.operation_id
                )
                fs_row.save()
                raise CommandError(
                    f"Indexing did not complete (status={result.get('status')!r}): "
                    f"{error_msg}"
                )

            # 4. Verify is_indexed() ------------------------------------------
            self.stdout.write("Step 4/4: verifying indexed state...")
            fs_row.refresh_from_db()
            if not fs_row.is_indexed():
                raise CommandError(
                    "FileSearchTable row is not marked indexed after upload "
                    f"(status={fs_row.upload_status}, "
                    f"docs={len(fs_row.all_document_ids())})."
                )
            self._ok(
                f"  OK - evidence is indexed "
                f"(status={fs_row.upload_status}, docs={len(fs_row.all_document_ids())})"
            )

            # Success summary (GREEN)
            self.stdout.write("")
            self._ok("========================================")
            self._ok("  PASS - evidence indexing works")
            self._ok(f"  store: {client.store_name}")
            self._ok(f"  documents indexed: {fs_row.chunk_count}")
            self._ok("========================================")

        except Exception as exc:
            # Failure summary (RED). CommandError messages are already concise.
            self.stdout.write("")
            self._err("========================================")
            self._err("  FAIL - evidence indexing check failed")
            self._err(f"  reason: {exc}")
            self._err("========================================")
            self._cleanup(evidence, fs_row, client, keep)
            raise SystemExit(1)

        # Cleanup on success (unless --keep)
        self._cleanup(evidence, fs_row, client, keep)

    def _cleanup(self, evidence, fs_row, client, keep):
        """Delete the test evidence and its Gemini store documents unless --keep."""
        if keep:
            if evidence is not None:
                self._warn(
                    f"--keep: leaving test evidence in place (id={evidence.id})."
                )
            return
        # Best-effort deletion of the indexed documents from the store first, so
        # we never leave orphaned docs behind.
        try:
            if client is not None and fs_row is not None:
                doc_ids = fs_row.all_document_ids()
                if doc_ids:
                    client.delete_store_documents(doc_ids)
        except Exception as exc:  # noqa: BLE001
            self._warn(f"  cleanup: could not delete store documents: {exc}")
        # Deleting the evidence cascades to the revision and FileSearchTable row.
        try:
            if evidence is not None:
                ev_id = evidence.id
                evidence.delete()
                self.stdout.write(f"  cleanup: deleted test evidence {ev_id}")
        except Exception as exc:  # noqa: BLE001
            self._warn(f"  cleanup: could not delete test evidence: {exc}")
