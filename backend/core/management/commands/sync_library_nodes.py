"""
Management command to sync missing requirement nodes from stored library to database.
This is useful when a library was updated with new children but wasn't re-imported.
"""

from django.core.management.base import BaseCommand
from django.db import transaction
from core.models import (
    StoredLibrary,
    LoadedLibrary,
    Framework,
    RequirementNode,
    RequirementAssessment,
    ComplianceAssessment,
    transform_questions_to_answers,
)
from library.helpers import get_referential_translation
from iam.models import Folder
import structlog

logger = structlog.get_logger(__name__)


class Command(BaseCommand):
    help = "Sync missing requirement nodes from stored library to database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--library-urn",
            type=str,
            help="URN of the library to sync (e.g., urn:intuitem:risk:library:nca-eca)",
        )
        parser.add_argument(
            "--framework-urn",
            type=str,
            help="URN of the framework to sync (if different from library)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would be done without making changes",
        )
        parser.add_argument(
            "--list",
            action="store_true",
            help="List all loaded libraries and their frameworks",
        )

    def handle(self, *args, **options):
        if options["list"]:
            self.list_libraries()
            return

        library_urn = options.get("library_urn")
        framework_urn = options.get("framework_urn")
        dry_run = options.get("dry_run", False)

        if not library_urn:
            self.stderr.write(
                self.style.ERROR(
                    "Please provide --library-urn or use --list to see available libraries"
                )
            )
            return

        self.sync_library(library_urn, framework_urn, dry_run)

    def list_libraries(self):
        """List all loaded libraries and their frameworks."""
        self.stdout.write(self.style.SUCCESS("\n=== Loaded Libraries ===\n"))

        for lib in LoadedLibrary.objects.all():
            self.stdout.write(f"Library: {lib.name}")
            self.stdout.write(f"  URN: {lib.urn}")
            self.stdout.write(f"  Version: {lib.version}")

            frameworks = Framework.objects.filter(library=lib)
            for fw in frameworks:
                node_count = RequirementNode.objects.filter(framework=fw).count()
                self.stdout.write(f"  Framework: {fw.name}")
                self.stdout.write(f"    URN: {fw.urn}")
                self.stdout.write(f"    Requirement nodes in DB: {node_count}")

                # Check stored library for comparison
                stored_lib = StoredLibrary.objects.filter(urn=lib.urn).first()
                if stored_lib and stored_lib.content:
                    framework_data = stored_lib.content.get(
                        "framework"
                    ) or stored_lib.content.get("frameworks", [{}])[0]
                    if framework_data:
                        stored_nodes = framework_data.get("requirement_nodes", [])
                        self.stdout.write(
                            f"    Requirement nodes in stored library: {len(stored_nodes)}"
                        )
                        if len(stored_nodes) != node_count:
                            self.stdout.write(
                                self.style.WARNING(
                                    f"    ⚠️  MISMATCH: {len(stored_nodes) - node_count} nodes missing from DB"
                                )
                            )
            self.stdout.write("")

    @transaction.atomic
    def sync_library(self, library_urn: str, framework_urn: str | None, dry_run: bool):
        """Sync missing requirement nodes from stored library to database."""

        # Find the stored library
        stored_lib = StoredLibrary.objects.filter(urn=library_urn).first()
        if not stored_lib:
            # Try with lowercase
            stored_lib = StoredLibrary.objects.filter(urn=library_urn.lower()).first()

        if not stored_lib:
            self.stderr.write(
                self.style.ERROR(f"Stored library not found: {library_urn}")
            )
            return

        self.stdout.write(f"Found stored library: {stored_lib.name} (v{stored_lib.version})")

        # Get library content
        content = stored_lib.content
        if not content:
            self.stderr.write(self.style.ERROR("Library has no content"))
            return

        # Get framework data
        framework_data = content.get("framework")
        if not framework_data and "frameworks" in content:
            frameworks_list = content.get("frameworks", [])
            if frameworks_list:
                framework_data = frameworks_list[0]

        if not framework_data:
            self.stderr.write(self.style.ERROR("No framework found in library"))
            return

        stored_nodes = framework_data.get("requirement_nodes", [])
        self.stdout.write(f"Stored library has {len(stored_nodes)} requirement nodes")

        # Find the loaded library and framework
        loaded_lib = LoadedLibrary.objects.filter(urn=library_urn).first()
        if not loaded_lib:
            loaded_lib = LoadedLibrary.objects.filter(urn=library_urn.lower()).first()

        if not loaded_lib:
            self.stderr.write(
                self.style.ERROR(
                    f"Loaded library not found: {library_urn}. Import the library first."
                )
            )
            return

        # Find the framework
        target_framework_urn = framework_urn or framework_data.get("urn", "").lower()
        framework = Framework.objects.filter(library=loaded_lib).first()

        if not framework:
            self.stderr.write(self.style.ERROR("Framework not found in database"))
            return

        self.stdout.write(f"Found framework: {framework.name}")

        # Get existing nodes
        existing_nodes = {
            node.urn.lower(): node
            for node in RequirementNode.objects.filter(framework=framework)
        }
        self.stdout.write(f"Database has {len(existing_nodes)} requirement nodes")

        # Find missing nodes
        missing_nodes = []
        for index, node_data in enumerate(stored_nodes):
            node_urn = node_data.get("urn", "").lower()
            if node_urn and node_urn not in existing_nodes:
                missing_nodes.append((index, node_data))

        if not missing_nodes:
            self.stdout.write(
                self.style.SUCCESS("✓ All requirement nodes are already in the database")
            )
            return

        self.stdout.write(
            self.style.WARNING(f"\nFound {len(missing_nodes)} missing requirement nodes:")
        )

        for index, node_data in missing_nodes:
            ref_id = node_data.get("ref_id", "")
            name = get_referential_translation(node_data, "name") or ""
            parent_urn = node_data.get("parent_urn", "")
            assessable = node_data.get("assessable", False)
            self.stdout.write(
                f"  - {ref_id}: {name[:50]}{'...' if len(name) > 50 else ''}"
                f" (parent: {parent_urn or 'none'}, assessable: {assessable})"
            )

        if dry_run:
            self.stdout.write(
                self.style.WARNING("\n[DRY RUN] No changes made. Remove --dry-run to apply changes.")
            )
            return

        # Create missing nodes
        self.stdout.write("\nCreating missing requirement nodes...")
        created_nodes = []

        for index, node_data in missing_nodes:
            parent_urn = node_data.get("parent_urn")
            if parent_urn:
                parent_urn = parent_urn.lower()

            node = RequirementNode.objects.create(
                folder=Folder.get_root_folder(),
                framework=framework,
                urn=node_data["urn"].lower(),
                parent_urn=parent_urn,
                assessable=node_data.get("assessable", False),
                ref_id=node_data.get("ref_id"),
                annotation=node_data.get("annotation"),
                typical_evidence=node_data.get("typical_evidence"),
                provider=framework.provider,
                order_id=index,
                name=node_data.get("name"),
                description=node_data.get("description"),
                implementation_groups=node_data.get("implementation_groups"),
                weight=node_data.get("weight", 1),
                locale=framework.locale,
                default_locale=framework.default_locale,
                translations=node_data.get("translations", {}),
                is_published=True,
                questions=node_data.get("questions"),
            )
            created_nodes.append(node)
            self.stdout.write(f"  ✓ Created: {node.ref_id} - {node.name}")

        self.stdout.write(
            self.style.SUCCESS(f"\nCreated {len(created_nodes)} requirement nodes")
        )

        # Create requirement assessments for existing compliance assessments
        compliance_assessments = ComplianceAssessment.objects.filter(framework=framework)
        if compliance_assessments.exists():
            self.stdout.write(
                f"\nCreating requirement assessments for {compliance_assessments.count()} compliance assessments..."
            )

            ra_count = 0
            for ca in compliance_assessments:
                for node in created_nodes:
                    # Check if RA already exists
                    if not RequirementAssessment.objects.filter(
                        compliance_assessment=ca, requirement=node
                    ).exists():
                        RequirementAssessment.objects.create(
                            compliance_assessment=ca,
                            requirement=node,
                            folder=ca.folder,
                            answers=transform_questions_to_answers(node.questions)
                            if node.questions
                            else {},
                        )
                        ra_count += 1

            self.stdout.write(
                self.style.SUCCESS(f"Created {ra_count} requirement assessments")
            )

        self.stdout.write(self.style.SUCCESS("\n✓ Sync completed successfully!"))
        self.stdout.write(
            "Note: You may need to restart the server for changes to take effect."
        )
