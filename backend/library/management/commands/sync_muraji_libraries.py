import json
import signal
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

import structlog
import yaml
from django.conf import settings
from django.core.management.base import BaseCommand

from core.models import LoadedLibrary, StoredLibrary

logger = structlog.getLogger(__name__)

signal.signal(signal.SIGINT, signal.SIG_DFL)


def muraji_libraries_url() -> str:
    return settings.MURAJI_LIBRARIES_API_URL


def build_library_payload(entry: dict) -> dict:
    payload = {
        "urn": entry["urn"],
        "locale": entry.get("locale") or "en",
        "ref_id": entry["ref_id"],
        "name": entry["name"],
        "version": entry["version"],
        "objects": entry["content"],
    }
    for key in ("description", "copyright", "provider", "packager", "publication_date"):
        value = entry.get(key)
        if not value:
            continue
        if key == "publication_date" and "T" in str(value):
            value = str(value).split("T")[0]
        payload[key] = value
    if entry.get("dependencies"):
        payload["dependencies"] = entry["dependencies"]
    return payload


class Command(BaseCommand):
    help = (
        "Fetch libraries from Muraji (/api/libraries), store them, "
        "and import into frameworks"
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--url",
            type=str,
            help="Muraji libraries API URL (default: MURAJI_LIBRARIES_API_URL)",
        )
        parser.add_argument(
            "--no-load",
            action="store_true",
            help="Store only; do not import into frameworks",
        )
        parser.add_argument(
            "--replace-stored",
            action="store_true",
            help="Delete existing stored libraries by URN before storing (matches UI sync)",
        )

    def handle(self, *args, **options):
        StoredLibrary.__init_class__()
        url = options.get("url") or muraji_libraries_url()
        load_frameworks = not options["no_load"]
        replace_stored = options["replace_stored"]

        self.stdout.write(f"Fetching libraries from {url}")

        try:
            with urlopen(url, timeout=120) as response:
                body = response.read()
        except (HTTPError, URLError) as exc:
            self.stderr.write(self.style.ERROR(f"Failed to fetch Muraji libraries: {exc}"))
            return

        try:
            muraji_payload = json.loads(body)
        except json.JSONDecodeError as exc:
            self.stderr.write(self.style.ERROR(f"Invalid JSON response: {exc}"))
            return

        if not muraji_payload.get("success") or not muraji_payload.get("data"):
            self.stdout.write(self.style.WARNING("No libraries returned from Muraji"))
            return

        stored_count = 0
        updated_count = 0
        loaded_count = 0
        skipped_count = 0
        error_count = 0

        for entry in muraji_payload["data"]:
            name = entry.get("name") or entry.get("urn", "unknown")
            try:
                urn = entry["urn"].lower()
                was_existing = StoredLibrary.objects.filter(urn=urn).exists()

                if replace_stored and was_existing:
                    for stored in StoredLibrary.objects.filter(urn=urn):
                        StoredLibrary.HASH_CHECKSUM_SET.discard(stored.hash_checksum)
                        stored.delete()

                library_data = build_library_payload(entry)
                content_bytes = yaml.dump(
                    library_data, allow_unicode=True, sort_keys=False
                ).encode("utf-8")

                stored_lib = StoredLibrary.store_library_content(content_bytes)
                if stored_lib is None:
                    stored_lib = (
                        StoredLibrary.objects.filter(
                            urn=urn, locale=library_data["locale"]
                        )
                        .order_by("-version")
                        .first()
                    )
                    if stored_lib is None:
                        self.stdout.write(
                            self.style.WARNING(f"Skipped {name}: could not store")
                        )
                        skipped_count += 1
                        continue
                    self.stdout.write(f"Unchanged: {name}")
                    skipped_count += 1
                elif was_existing and not replace_stored:
                    updated_count += 1
                    self.stdout.write(self.style.SUCCESS(f"Updated: {name}"))
                else:
                    stored_count += 1
                    self.stdout.write(self.style.SUCCESS(f"Stored: {name}"))

                if not load_frameworks:
                    continue

                if LoadedLibrary.objects.filter(
                    urn=stored_lib.urn, locale=stored_lib.locale
                ).exists():
                    self.stdout.write(f"  Already loaded as framework: {name}")
                    continue

                error_msg = stored_lib.load()
                if error_msg:
                    self.stderr.write(
                        self.style.ERROR(f"  Load failed for {name}: {error_msg}")
                    )
                    error_count += 1
                else:
                    loaded_count += 1
                    self.stdout.write(f"  Loaded into frameworks: {name}")

            except Exception as exc:
                logger.exception("Failed to sync library", library=name)
                self.stderr.write(self.style.ERROR(f"Error processing {name}: {exc}"))
                error_count += 1

        self.stdout.write("")
        self.stdout.write(
            f"Done: {stored_count} new, {updated_count} updated, "
            f"{loaded_count} loaded, {skipped_count} skipped, {error_count} errors"
        )
