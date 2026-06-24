"""
Find and (optionally) delete Gemini File Search documents that no
``FileSearchTable`` row references anymore — i.e. orphans left behind by:

  * a previous ``--reset`` whose force-delete predates the ``force=True`` fix
    (deletion 400'd with "Cannot delete non-empty Document");
  * a split-upload that crashed mid-way before rollback existed;
  * legacy single-document uploads superseded by a chunked re-index.

By default the command is **dry-run** — it prints what it would delete. Pass
``--apply`` to actually delete. Pass ``--evidence <id>`` (or ``--revision <id>``)
to scope the sweep to a single evidence / revision via ``custom_metadata``.

Usage:
    poetry run python manage.py cleanup_gemini_orphans
    poetry run python manage.py cleanup_gemini_orphans --evidence 5f8b3eb2-... --apply
    poetry run python manage.py cleanup_gemini_orphans --apply
"""

from django.core.management.base import BaseCommand, CommandError

from core.gemini_file_search import GEMINI_ENABLED, get_gemini_client
from core.models import FileSearchTable


class Command(BaseCommand):
    help = (
        "Delete Gemini File Search documents that no FileSearchTable row "
        "references (orphans). Dry-run by default; pass --apply to delete."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--apply",
            action="store_true",
            help="Actually delete orphans (default is dry-run).",
        )
        parser.add_argument(
            "--evidence",
            type=str,
            default=None,
            help="Limit sweep to documents whose evidence_id matches this UUID.",
        )
        parser.add_argument(
            "--revision",
            type=str,
            default=None,
            help="Limit sweep to documents whose evidence_revision_id matches this UUID.",
        )

    def handle(self, *args, **options):
        apply = options["apply"]
        evidence_id = options.get("evidence")
        revision_id = options.get("revision")

        if not GEMINI_ENABLED:
            raise CommandError("Gemini is not configured (GEMINI_API_KEY missing).")
        client = get_gemini_client()
        if not client or not client.store_name:
            raise CommandError("Gemini client / store not configured.")

        store = client.store_name
        self.stdout.write(f"Store: {store}")

        # Every document name a FileSearchTable row currently references.
        referenced = set()
        for row in FileSearchTable.objects.all().iterator():
            for d in row.all_document_ids():
                referenced.add(d)
        self.stdout.write(f"FileSearchTable referenced docs: {len(referenced)}")

        # Walk the store and find docs without a referencing row.
        orphans = []
        total = 0
        try:
            for doc in client.client.file_search_stores.documents.list(parent=store):
                total += 1
                name = getattr(doc, "name", "") or ""
                if not name or name in referenced:
                    continue

                # Pull custom_metadata as a flat dict for filtering / display.
                md = {}
                for cm in (getattr(doc, "custom_metadata", None) or []):
                    k = getattr(cm, "key", None)
                    v = getattr(cm, "string_value", None)
                    if v is None:
                        v = getattr(cm, "numeric_value", None)
                    md[k] = v

                if evidence_id and md.get("evidence_id") != evidence_id:
                    continue
                if revision_id and md.get("evidence_revision_id") != revision_id:
                    continue

                orphans.append((name, getattr(doc, "display_name", "") or "", md))
        except Exception as exc:  # noqa: BLE001
            raise CommandError(f"Listing documents failed: {exc}")

        self.stdout.write(f"Documents in store: {total}")
        self.stdout.write(self.style.WARNING(f"Orphans found: {len(orphans)}"))
        for name, disp, md in orphans:
            ev = md.get("evidence_id", "-")
            rev = md.get("evidence_revision_id", "-")
            pr = md.get("page_range", "-")
            self.stdout.write(
                f"  - {disp or name} (ev={ev[:8]}.. rev={rev[:8]}.. pages={pr})"
            )

        if not orphans:
            return

        if not apply:
            self.stdout.write(self.style.WARNING("(dry-run; pass --apply to delete)"))
            return

        deleted = client.delete_store_documents([n for n, _, _ in orphans])
        self.stdout.write(self.style.SUCCESS(f"Deleted {deleted}/{len(orphans)} orphans"))
