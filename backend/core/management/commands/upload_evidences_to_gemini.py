"""
Management command to retroactively upload all evidence files to Gemini File Search.

Usage:
    poetry run python manage.py upload_evidences_to_gemini
    poetry run python manage.py upload_evidences_to_gemini --dry-run
    poetry run python manage.py upload_evidences_to_gemini --force
    poetry run python manage.py upload_evidences_to_gemini --diagnose <applied_control_id>
"""

from django.core.management.base import BaseCommand
from core.models import Evidence, EvidenceRevision, FileSearchTable, AppliedControl
from core.gemini_file_search import get_gemini_client, GEMINI_ENABLED


class Command(BaseCommand):
    help = "Upload all existing evidence files to Gemini File Search (retroactive sync)"

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would be uploaded without actually uploading",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Re-upload files even if they already have a FileSearchTable entry",
        )
        parser.add_argument(
            "--diagnose",
            type=str,
            default=None,
            help="Diagnose a specific applied control ID — show what the analysis would find",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        force = options["force"]
        diagnose_id = options.get("diagnose")

        if diagnose_id:
            return self._diagnose_applied_control(diagnose_id)

        if not GEMINI_ENABLED:
            self.stderr.write(self.style.ERROR(
                "Gemini File Search is NOT configured.\n"
                "Set GEMINI_API_KEY and GEMINI_FILE_SEARCH_STORE_NAME in your .env file."
            ))
            return

        client = get_gemini_client()
        if not client:
            self.stderr.write(self.style.ERROR("Failed to initialize Gemini client."))
            return

        self.stdout.write(self.style.SUCCESS("Gemini File Search client initialized."))

        # Get all evidence revisions with attachments
        revisions = EvidenceRevision.objects.filter(
            attachment__isnull=False
        ).exclude(attachment="").select_related("evidence")

        total = revisions.count()
        self.stdout.write(f"\nFound {total} evidence revision(s) with attachments.")

        uploaded = 0
        skipped = 0
        failed = 0
        already_done = 0

        for revision in revisions:
            evidence_name = revision.evidence.name if revision.evidence else "Unknown"
            rev_id = str(revision.id)

            # Check if FileSearchTable entry already exists. The durable identifier
            # is gemini_document_id (File Search Store) — Files API IDs expire after
            # 48h and are intentionally not what this command populates.
            try:
                existing = FileSearchTable.objects.filter(evidence_revision=revision).first()
                if existing and not force:
                    if existing.is_indexed():
                        already_done += 1
                        self.stdout.write(
                            f"  [SKIP] {evidence_name} (rev {rev_id[:8]}...) — "
                            f"already indexed ({existing.chunk_count or 1} document(s))"
                        )
                        continue
                    if existing.upload_status == FileSearchTable.UploadStatus.COMPLETED:
                        # Completed in legacy Files-API-only mode: still needs a
                        # durable store document.
                        self.stdout.write(
                            self.style.WARNING(
                                f"  [INDEX] {evidence_name} (rev {rev_id[:8]}...) — "
                                f"completed without store document, indexing now..."
                            )
                        )
                    elif existing.upload_status == FileSearchTable.UploadStatus.UPLOADING:
                        from django.utils import timezone
                        from core.tasks_gemini import GEMINI_UPLOAD_STALE_SECONDS

                        age = (
                            (timezone.now() - existing.updated_at).total_seconds()
                            if existing.updated_at else None
                        )
                        if age is not None and age >= GEMINI_UPLOAD_STALE_SECONDS:
                            # Orphaned by a killed worker — retry instead of
                            # skipping forever.
                            self.stdout.write(
                                self.style.WARNING(
                                    f"  [RETRY] {evidence_name} (rev {rev_id[:8]}...) — "
                                    f"stale upload ({int(age)}s old). Retrying..."
                                )
                            )
                            existing.delete()
                        else:
                            skipped += 1
                            self.stdout.write(
                                f"  [SKIP] {evidence_name} (rev {rev_id[:8]}...) — "
                                f"upload in progress"
                            )
                            continue
                    elif existing.upload_status == FileSearchTable.UploadStatus.FAILED:
                        self.stdout.write(
                            self.style.WARNING(
                                f"  [RETRY] {evidence_name} (rev {rev_id[:8]}...) — "
                                f"previous upload failed: {existing.error_message}. Retrying..."
                            )
                        )
                        existing.delete()
            except Exception:
                pass

            if not revision.attachment:
                skipped += 1
                continue

            display_name = f"{evidence_name} - {revision.evidence.filename()}"

            if dry_run:
                self.stdout.write(
                    f"  [DRY-RUN] Would upload: {evidence_name} (rev {rev_id[:8]}...) "
                    f"— {revision.attachment.name}"
                )
                uploaded += 1
                continue

            self.stdout.write(
                f"  [UPLOAD] {evidence_name} (rev {rev_id[:8]}...) — {revision.attachment.name}"
            )

            try:
                if force:
                    FileSearchTable.objects.filter(evidence_revision=revision).delete()

                file_search, _ = FileSearchTable.objects.get_or_create(
                    evidence_revision=revision,
                    defaults={
                        "upload_status": FileSearchTable.UploadStatus.PENDING,
                        "gemini_document_id": "",
                        "gemini_store_id": "",
                    },
                )

                file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
                file_search.error_message = None
                file_search.save()

                # Stream from storage (works for local FS, GCS, S3, …) into a
                # tempfile and feed that to the Gemini SDK. ``attachment.path``
                # would raise NotImplementedError on cloud backends.
                from core.tasks_gemini import _materialize_attachment, _build_evidence_custom_metadata
                self.stdout.write(f"           Indexing in File Search Store and waiting for completion...")
                custom_metadata = _build_evidence_custom_metadata(revision)
                with _materialize_attachment(revision.attachment) as file_path:
                    final_status = client.upload_evidence_file_and_wait(
                        file_path=file_path,
                        display_name=display_name,
                        custom_metadata=custom_metadata,
                    )

                self.stdout.write(f"           Final status: {final_status.get('status')}")

                if final_status["status"] == "completed":
                    doc_ids = final_status.get("gemini_document_ids") or (
                        [final_status["gemini_document_id"]]
                        if final_status.get("gemini_document_id") else []
                    )
                    file_search.gemini_document_ids = doc_ids
                    file_search.gemini_document_id = doc_ids[0] if doc_ids else ""
                    file_search.chunk_count = final_status.get("chunk_count", len(doc_ids))
                    file_search.gemini_store_id = final_status.get("gemini_store_id", "")
                    if final_status.get("operation_id"):
                        file_search.operation_id = final_status["operation_id"]
                    file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
                    file_search.save()
                    uploaded += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"           ✓ Indexed ({file_search.chunk_count or 1} document(s))"
                        )
                    )
                else:
                    error_msg = final_status.get("error", "Unknown error")
                    file_search.upload_status = FileSearchTable.UploadStatus.FAILED
                    file_search.error_message = error_msg
                    file_search.save()
                    failed += 1
                    self.stdout.write(
                        self.style.ERROR(
                            f"           ✗ Failed: {error_msg}"
                        )
                    )

            except Exception as e:
                failed += 1
                self.stdout.write(
                    self.style.ERROR(
                        f"           ✗ Exception: {e}"
                    )
                )
                try:
                    fs = FileSearchTable.objects.get(evidence_revision=revision)
                    fs.upload_status = FileSearchTable.UploadStatus.FAILED
                    fs.error_message = str(e)
                    fs.save()
                except Exception:
                    pass

        # Summary
        self.stdout.write("\n" + "=" * 50)
        prefix = "[DRY-RUN] " if dry_run else ""
        self.stdout.write(self.style.SUCCESS(f"{prefix}Upload Summary:"))
        self.stdout.write(f"  Total revisions with attachments: {total}")
        self.stdout.write(f"  Already uploaded (skipped):       {already_done}")
        self.stdout.write(f"  Skipped (other reasons):          {skipped}")
        self.stdout.write(
            self.style.SUCCESS(f"  Successfully uploaded:            {uploaded}")
        )
        if failed:
            self.stdout.write(
                self.style.ERROR(f"  Failed:                           {failed}")
            )
        self.stdout.write("=" * 50)

    def _diagnose_applied_control(self, ac_id):
        """Diagnose what the AI analysis would see for a specific applied control."""
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"DIAGNOSING Applied Control: {ac_id}")
        self.stdout.write(f"{'='*60}\n")

        try:
            ac = AppliedControl.objects.get(id=ac_id)
        except AppliedControl.DoesNotExist:
            self.stderr.write(self.style.ERROR(f"Applied control {ac_id} not found!"))
            return

        self.stdout.write(f"Name: {ac.name}")
        self.stdout.write(f"Status: {ac.status}")
        self.stdout.write(f"Category: {ac.category}")

        evidences = ac.evidences.all()
        self.stdout.write(f"\nLinked Evidences: {evidences.count()}")

        gemini_documents = []
        for evidence in evidences:
            self.stdout.write(f"\n  Evidence: {evidence.name} (id={evidence.id})")
            revisions = evidence.revisions.all()
            self.stdout.write(f"    Revisions: {revisions.count()}")

            for revision in revisions:
                self.stdout.write(f"    Revision {revision.id}:")
                self.stdout.write(f"      Has attachment: {bool(revision.attachment)}")
                if revision.attachment:
                    self.stdout.write(f"      Attachment: {revision.attachment.name[:80]}")

                fs_entries = FileSearchTable.objects.filter(evidence_revision=revision)
                self.stdout.write(f"      FileSearchTable entries: {fs_entries.count()}")

                for fs in fs_entries:
                    doc_ids = fs.all_document_ids()
                    self.stdout.write(f"        upload_status:      {fs.upload_status}")
                    self.stdout.write(f"        chunk_count:        {fs.chunk_count}")
                    self.stdout.write(f"        document count:     {len(doc_ids)}")
                    self.stdout.write(f"        gemini_store_id:    {fs.gemini_store_id[:80] if fs.gemini_store_id else 'EMPTY'}")
                    self.stdout.write(f"        is_indexed:         {fs.is_indexed()}")
                    self.stdout.write(f"        error_message:      {fs.error_message}")
                    for d in doc_ids:
                        self.stdout.write(f"          - {d[:80]}")

                    if fs.is_indexed():
                        gemini_documents.append({
                            'gemini_document_id': doc_ids[0] if doc_ids else '',
                            'gemini_document_ids': doc_ids,
                            'gemini_store_id': fs.gemini_store_id,
                            'evidence_name': evidence.name,
                            'evidence_revision_id': str(revision.id),
                            'evidence_id': str(evidence.id),
                        })

        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"RESULT: Would send {len(gemini_documents)} indexed document(s) to Muraji")
        for gd in gemini_documents:
            self.stdout.write(f"  - {gd['evidence_name']}: {gd['gemini_document_id'][:80]}")
        self.stdout.write(f"{'='*60}")

        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"ALL FileSearchTable entries in DB:")
        for fs in FileSearchTable.objects.all().select_related('evidence_revision__evidence'):
            ev_name = fs.evidence_revision.evidence.name if fs.evidence_revision.evidence else 'Unknown'
            doc_short = fs.gemini_document_id[:60] if fs.gemini_document_id else 'EMPTY'
            self.stdout.write(f"  {ev_name}: status={fs.upload_status}, doc={doc_short}")
        self.stdout.write(f"{'='*60}")
