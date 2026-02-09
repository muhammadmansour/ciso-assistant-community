"""
Management command to retroactively upload all evidence files to Gemini File Search.

Usage:
    poetry run python manage.py upload_evidences_to_gemini
    poetry run python manage.py upload_evidences_to_gemini --dry-run
    poetry run python manage.py upload_evidences_to_gemini --force
"""

from django.core.management.base import BaseCommand
from core.models import Evidence, EvidenceRevision, FileSearchTable
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

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        force = options["force"]

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

            # Check if FileSearchTable entry already exists
            try:
                existing = FileSearchTable.objects.filter(evidence_revision=revision).first()
                if existing and not force:
                    if existing.upload_status == FileSearchTable.UploadStatus.COMPLETED:
                        already_done += 1
                        self.stdout.write(
                            f"  [SKIP] {evidence_name} (rev {rev_id[:8]}...) — "
                            f"already uploaded (gemini_file_id: {existing.gemini_file_id})"
                        )
                        continue
                    elif existing.upload_status == FileSearchTable.UploadStatus.UPLOADING:
                        skipped += 1
                        self.stdout.write(
                            f"  [SKIP] {evidence_name} (rev {rev_id[:8]}...) — "
                            f"upload in progress"
                        )
                        continue
            except Exception:
                pass

            if not revision.attachment:
                skipped += 1
                continue

            # Check file exists on disk
            try:
                file_path = revision.attachment.path
            except Exception as e:
                self.stdout.write(
                    self.style.WARNING(
                        f"  [WARN] {evidence_name} (rev {rev_id[:8]}...) — "
                        f"cannot resolve file path: {e}"
                    )
                )
                skipped += 1
                continue

            display_name = f"{evidence_name} - {revision.evidence.filename()}"

            if dry_run:
                self.stdout.write(
                    f"  [DRY-RUN] Would upload: {evidence_name} (rev {rev_id[:8]}...) "
                    f"— {file_path}"
                )
                uploaded += 1
                continue

            # Perform the upload
            self.stdout.write(
                f"  [UPLOAD] {evidence_name} (rev {rev_id[:8]}...) — {file_path}"
            )

            try:
                # Create or update FileSearchTable entry
                file_search, _ = FileSearchTable.objects.get_or_create(
                    evidence_revision=revision,
                    defaults={
                        "upload_status": FileSearchTable.UploadStatus.PENDING,
                        "gemini_file_id": "",
                        "gemini_store_id": "",
                    },
                )

                file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
                file_search.error_message = None
                file_search.save()

                # Upload to Gemini and wait for completion
                self.stdout.write(f"           Uploading and waiting for completion...")
                final_status = client.upload_file_and_wait(
                    file_path=file_path,
                    display_name=display_name,
                    max_wait_seconds=120,
                    poll_interval=3,
                )

                if final_status["status"] == "completed":
                    file_search.gemini_file_id = final_status.get("gemini_file_id", "")
                    file_search.gemini_store_id = final_status.get("gemini_store_id", "")
                    file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
                    file_search.save()
                    uploaded += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"           ✓ Uploaded (gemini_file_id: {file_search.gemini_file_id})"
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
