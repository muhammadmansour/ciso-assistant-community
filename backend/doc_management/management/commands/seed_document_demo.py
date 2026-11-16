"""Seed the Halvard Devices document catalog (upstream demo documents).

Usage:

    poetry run python manage.py seed_document_demo
"""

from django.core.management.base import BaseCommand
from django.db import transaction

from core.demo import COMPANY, DemoContext
from core.models import ObjectClassification
from global_settings.models import GlobalSettings
from iam.models import Folder


class Command(BaseCommand):
    help = "Create the Halvard Devices domain and published document catalog."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing demo documents in this domain before seeding.",
        )

    def handle(self, *args, **options):
        ObjectClassification.create_default_classifications()
        self._enable_flags()
        domain = self._ensure_domain()

        from doc_management.demo_builders import DocumentsBuilder
        from doc_management.models import (
            DocumentAttachment,
            DocumentContainer,
            DocumentRevision,
            DocumentTemplate,
            ManagedDocument,
        )

        if options["reset"]:
            with transaction.atomic():
                DocumentAttachment.objects.filter(folder=domain).delete()
                DocumentRevision.objects.filter(folder=domain).delete()
                ManagedDocument.objects.filter(folder=domain).delete()
                DocumentContainer.objects.filter(folder=domain).delete()
                DocumentTemplate.objects.filter(folder=domain).delete()
            self.stdout.write("Cleared existing demo documents in this domain.")

        ctx = DemoContext(domain=domain, out=self.stdout.write)
        DocumentsBuilder().build(ctx)

        DocumentContainer.objects.filter(folder=domain).update(is_published=True)
        ManagedDocument.objects.filter(folder=domain).update(is_published=True)
        DocumentRevision.objects.filter(folder=domain).update(is_published=True)
        DocumentTemplate.objects.filter(folder=domain).update(is_published=True)
        DocumentAttachment.objects.filter(folder=domain).update(is_published=True)

        published = DocumentContainer.objects.filter(folder=domain).count()
        templates = DocumentTemplate.objects.filter(folder=domain).count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {published} document containers and {templates} templates "
                f"in {COMPANY}. Reload /documents."
            )
        )

    def _ensure_domain(self) -> Folder:
        root = Folder.get_root_folder()
        domain, created = Folder.objects.get_or_create(
            name=COMPANY,
            parent_folder=root,
            defaults={
                "content_type": Folder.ContentType.DOMAIN,
                "description": "Fictional maker of connected home devices, loaded as demo data.",
            },
        )
        if created:
            self.stdout.write(f"Created domain {COMPANY}.")
        else:
            self.stdout.write(f"Using existing domain {COMPANY}.")
        return domain

    def _enable_flags(self):
        name = GlobalSettings.Names.FEATURE_FLAGS
        gs = GlobalSettings.objects.filter(name=name).first()
        value = dict((gs.value if gs else {}) or {})
        for key in ("document_management", "policy_documents"):
            value[key] = True
        if gs is None:
            GlobalSettings.objects.create(name=name, value=value)
        else:
            gs.value = value
            gs.save(update_fields=["value"])
