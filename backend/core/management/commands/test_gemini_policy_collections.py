"""Local smoke test for GET /api/gemini/policy-collections/ (Gemini-backed stores)."""

import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from rest_framework.test import APIClient

from core.gemini_file_search import GEMINI_API_KEY, list_gemini_file_search_stores_metadata


class Command(BaseCommand):
    help = (
        "Call Gemini File Search list APIs and/or the HTTP policy-collections "
        "endpoint; print JSON results to stdout."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--http",
            action="store_true",
            help="Also GET /api/gemini/policy-collections/ as the first superuser",
        )
        parser.add_argument(
            "--no-counts",
            action="store_true",
            help="Skip per-store document counts (faster)",
        )

    def handle(self, *args, **options):
        include_counts = not options["no_counts"]

        self.stdout.write("=== GEMINI_API_KEY ===")
        self.stdout.write("set" if GEMINI_API_KEY else "NOT SET")
        self.stdout.write("")

        self.stdout.write("=== Direct Gemini list (list_gemini_file_search_stores_metadata) ===")
        try:
            rows = list_gemini_file_search_stores_metadata(
                include_document_counts=include_counts,
            )
            self.stdout.write(json.dumps({"collections": rows}, indent=2, default=str))
        except Exception as exc:
            self.stdout.write(self.style.ERROR(f"FAILED: {exc}"))
        self.stdout.write("")

        if options["http"]:
            self.stdout.write("=== HTTP GET /api/gemini/policy-collections/ ===")
            User = get_user_model()
            user = User.objects.filter(is_superuser=True).first()
            if not user:
                self.stdout.write(self.style.ERROR("No superuser; create one first."))
                return
            client = APIClient(HTTP_HOST="localhost")
            client.force_authenticate(user=user)
            q = "?include_document_counts=false" if not include_counts else ""
            response = client.get(f"/api/gemini/policy-collections/{q}")
            self.stdout.write(f"status={response.status_code}")
            try:
                self.stdout.write(json.dumps(response.data, indent=2, default=str))
            except Exception:
                self.stdout.write(response.content.decode()[:4000])
