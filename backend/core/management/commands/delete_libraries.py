"""
Management command to delete all libraries from the database.
Usage: python manage.py delete_libraries
"""

from django.core.management.base import BaseCommand
from core.models import StoredLibrary, LoadedLibrary


class Command(BaseCommand):
    help = "Delete all libraries (both stored and loaded) from the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Force deletion without confirmation prompt",
        )
        parser.add_argument(
            "--stored-only",
            action="store_true",
            help="Delete only stored libraries (not loaded ones)",
        )
        parser.add_argument(
            "--loaded-only",
            action="store_true",
            help="Delete only loaded libraries (not stored ones)",
        )

    def handle(self, *args, **options):
        force = options.get("force", False)
        stored_only = options.get("stored_only", False)
        loaded_only = options.get("loaded_only", False)

        # Count libraries
        stored_count = StoredLibrary.objects.count()
        loaded_count = LoadedLibrary.objects.count()

        self.stdout.write(f"\nFound {stored_count} stored libraries")
        self.stdout.write(f"Found {loaded_count} loaded libraries\n")

        if stored_count == 0 and loaded_count == 0:
            self.stdout.write(self.style.WARNING("No libraries found in the database."))
            return

        # List libraries
        if not loaded_only:
            self.stdout.write(self.style.NOTICE("Stored Libraries:"))
            for lib in StoredLibrary.objects.all():
                self.stdout.write(f"  - {lib.urn} (v{lib.version}) - {lib.name}")

        if not stored_only:
            self.stdout.write(self.style.NOTICE("\nLoaded Libraries:"))
            for lib in LoadedLibrary.objects.all():
                ref_count = lib.reference_count
                status = f" [REFERENCED: {ref_count}]" if ref_count > 0 else ""
                self.stdout.write(f"  - {lib.urn} (v{lib.version}) - {lib.name}{status}")

        # Confirmation
        if not force:
            self.stdout.write(self.style.WARNING("\nThis will DELETE all libraries listed above!"))
            confirm = input("Are you sure you want to proceed? (yes/no): ")
            if confirm.lower() != "yes":
                self.stdout.write(self.style.ERROR("Operation cancelled."))
                return

        # Delete loaded libraries first (they may have references to stored)
        deleted_loaded = 0
        failed_loaded = []
        
        if not stored_only:
            self.stdout.write(self.style.NOTICE("\nDeleting loaded libraries..."))
            for lib in LoadedLibrary.objects.all():
                try:
                    lib_info = f"{lib.urn} (v{lib.version})"
                    lib.delete()
                    deleted_loaded += 1
                    self.stdout.write(self.style.SUCCESS(f"  Deleted: {lib_info}"))
                except ValueError as e:
                    failed_loaded.append((lib.urn, str(e)))
                    self.stdout.write(self.style.ERROR(f"  Failed: {lib.urn} - {e}"))

        # Delete stored libraries
        deleted_stored = 0
        
        if not loaded_only:
            self.stdout.write(self.style.NOTICE("\nDeleting stored libraries..."))
            for lib in StoredLibrary.objects.all():
                lib_info = f"{lib.urn} (v{lib.version})"
                lib.delete()
                deleted_stored += 1
                self.stdout.write(self.style.SUCCESS(f"  Deleted: {lib_info}"))

        # Summary
        self.stdout.write(self.style.SUCCESS(f"\n=== Summary ==="))
        self.stdout.write(f"Deleted {deleted_loaded} loaded libraries")
        self.stdout.write(f"Deleted {deleted_stored} stored libraries")
        
        if failed_loaded:
            self.stdout.write(self.style.WARNING(f"\nFailed to delete {len(failed_loaded)} loaded libraries:"))
            for urn, error in failed_loaded:
                self.stdout.write(self.style.ERROR(f"  - {urn}: {error}"))
            self.stdout.write(self.style.NOTICE("\nNote: Libraries that are referenced by assessments cannot be deleted."))
