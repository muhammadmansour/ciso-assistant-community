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

            # Check if FileSearchTable entry already exists
            try:
                existing = FileSearchTable.objects.filter(evidence_revision=revision).first()
                if existing and not force:
                    if existing.upload_status == FileSearchTable.UploadStatus.COMPLETED:
                        already_done += 1
                        self.stdout.write(
                            f"  [SKIP] {evidence_name} (rev {rev_id[:8]}...) — "
                            f"already uploaded (gemini_file_id: {existing.gemini_file_id[:60]})"
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
                # Delete existing failed entry if force
                if force:
                    FileSearchTable.objects.filter(evidence_revision=revision).delete()

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

                self.stdout.write(f"           Final status: {final_status}")

                if final_status["status"] == "completed":
                    file_search.gemini_file_id = final_status.get("gemini_file_id", "")
                    file_search.gemini_store_id = final_status.get("gemini_store_id", "")
                    file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
                    file_search.save()
                    uploaded += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"           ✓ Uploaded (gemini_file_id: {file_search.gemini_file_id[:80]})"
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

        gemini_file_ids = []
        for evidence in evidences:
            self.stdout.write(f"\n  Evidence: {evidence.name} (id={evidence.id})")
            revisions = evidence.revisions.all()
            self.stdout.write(f"    Revisions: {revisions.count()}")

            for revision in revisions:
                self.stdout.write(f"    Revision {revision.id}:")
                self.stdout.write(f"      Has attachment: {bool(revision.attachment)}")
                if revision.attachment:
                    self.stdout.write(f"      Attachment: {revision.attachment.name[:80]}")

                # Check FileSearchTable via direct DB query
                fs_entries = FileSearchTable.objects.filter(evidence_revision=revision)
                self.stdout.write(f"      FileSearchTable entries: {fs_entries.count()}")

                for fs in fs_entries:
                    self.stdout.write(f"        upload_status: {fs.upload_status}")
                    self.stdout.write(f"        gemini_file_id: {fs.gemini_file_id[:80] if fs.gemini_file_id else 'EMPTY'}")
                    self.stdout.write(f"        gemini_store_id: {fs.gemini_store_id[:80] if fs.gemini_store_id else 'EMPTY'}")
                    self.stdout.write(f"        error_message: {fs.error_message}")

                    if fs.upload_status == 'completed':
                        gemini_file_ids.append({
                            'gemini_file_id': fs.gemini_file_id,
                            'gemini_store_id': fs.gemini_store_id,
                            'evidence_name': evidence.name,
                        })

                # Also check via hasattr (the way run_ai_analysis does it)
                try:
                    has_rel = hasattr(revision, 'file_search')
                    self.stdout.write(f"      hasattr(revision, 'file_search'): {has_rel}")
                    if has_rel:
                        fs_rel = revision.file_search
                        self.stdout.write(f"      relation.upload_status: {fs_rel.upload_status}")
                        self.stdout.write(f"      relation.gemini_file_id: {fs_rel.gemini_file_id[:80] if fs_rel.gemini_file_id else 'EMPTY'}")
                except Exception as e:
                    self.stdout.write(f"      Error accessing file_search relation: {e}")

        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"RESULT: Would send {len(gemini_file_ids)} gemini_file_ids to Muraji")
        for gf in gemini_file_ids:
            self.stdout.write(f"  - {gf['evidence_name']}: {gf['gemini_file_id'][:80]}")
        self.stdout.write(f"{'='*60}")

        # Also show ALL FileSearchTable entries for reference
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"ALL FileSearchTable entries in DB:")
        for fs in FileSearchTable.objects.all().select_related('evidence_revision__evidence'):
            ev_name = fs.evidence_revision.evidence.name if fs.evidence_revision.evidence else 'Unknown'
            self.stdout.write(f"  {ev_name}: status={fs.upload_status}, file_id={fs.gemini_file_id[:60]}")
        self.stdout.write(f"{'='*60}")
