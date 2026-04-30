"""
Django management command that mirrors the frontend "مزامنة مع مراجع"
(Sync with Muraji) button.

It fetches the library catalog from the Muraji API and re-imports every
library into the local ``StoredLibrary`` table — exactly like the hidden
``fetchMuraji`` SvelteKit action did, but server-side and without going
through HTTP.

Usage:

    poetry run python manage.py syncmurajilibraries
    poetry run python manage.py syncmurajilibraries --url https://muraji-api.wathbahs.com/api/libraries
    poetry run python manage.py syncmurajilibraries --dry-run
    poetry run python manage.py syncmurajilibraries --no-replace   # keep existing rows, only insert new versions
"""

from __future__ import annotations

import os
import signal
import sys
from typing import Any

import requests
import structlog
import yaml
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from core.models import StoredLibrary

logger = structlog.getLogger(__name__)

signal.signal(signal.SIGINT, signal.SIG_DFL)

DEFAULT_MURAJI_LIBRARIES_URL = os.environ.get(
    "MURAJI_LIBRARIES_API_URL",
    "https://muraji-api.wathbahs.com/api/libraries",
)


class Command(BaseCommand):
    help = (
        "Re-fetch and store libraries from the Muraji API "
        "(equivalent to the frontend 'مزامنة مع مراجع' button)."
    )

    def add_arguments(self, parser) -> None:
        parser.add_argument(
            "--url",
            type=str,
            default=DEFAULT_MURAJI_LIBRARIES_URL,
            help=(
                "Muraji libraries API endpoint. "
                f"Defaults to MURAJI_LIBRARIES_API_URL env var or "
                f"{DEFAULT_MURAJI_LIBRARIES_URL}."
            ),
        )
        parser.add_argument(
            "--timeout",
            type=int,
            default=60,
            help="HTTP timeout in seconds for the Muraji API call (default: 60).",
        )
        parser.add_argument(
            "--no-replace",
            action="store_true",
            help=(
                "Do not delete the existing StoredLibrary row before "
                "re-storing. By default, every library returned by Muraji "
                "is wiped and re-inserted (matching the frontend behavior)."
            ),
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Fetch and validate, but do not write anything to the database.",
        )

    def handle(self, *args, **options) -> None:
        url: str = options["url"]
        timeout: int = options["timeout"]
        replace: bool = not options["no_replace"]
        dry_run: bool = options["dry_run"]

        self.stdout.write(
            self.style.MIGRATE_HEADING(f"[syncMuraji] syncing libraries from {url}")
        )

        try:
            response = requests.get(url, timeout=timeout)
        except requests.RequestException as exc:
            logger.error("muraji_sync_connection_error", error=str(exc), url=url)
            raise CommandError(f"خطأ في الاتصال بمراجع API: {exc}") from exc

        if not response.ok:
            logger.error(
                "muraji_sync_http_error",
                status_code=response.status_code,
                url=url,
                body=response.text[:500],
            )
            raise CommandError(
                f"فشل في جلب المكتبات من مراجع (HTTP {response.status_code})"
            )

        try:
            payload: dict[str, Any] = response.json()
        except ValueError as exc:
            raise CommandError(
                f"Invalid JSON returned from Muraji API: {exc}"
            ) from exc

        if not payload.get("success") or not payload.get("data"):
            self.stdout.write(
                self.style.WARNING("لا توجد مكتبات متاحة في مراجع")
            )
            return

        libraries: list[dict[str, Any]] = payload["data"]

        # Re-prime StoredLibrary's hash cache so updates are not skipped after
        # we delete rows below.
        StoredLibrary.__init_class__()

        success_count = 0  # newly created
        update_count = 0  # already-existing URN that we replaced
        error_count = 0
        skipped_count = 0  # store_library_content returned None (older/dup)

        for library in libraries:
            urn = (library.get("urn") or "").strip()
            name = library.get("name") or library.get("ref_id") or "<unnamed>"
            if not urn:
                logger.warning(
                    "muraji_library_missing_urn", library_name=name
                )
                error_count += 1
                continue

            try:
                with transaction.atomic():
                    was_existing = False
                    if replace:
                        deleted_qs = StoredLibrary.objects.filter(
                            urn__iexact=urn
                        )
                        was_existing = deleted_qs.exists()
                        if was_existing and not dry_run:
                            deleted_qs.delete()
                            # Re-prime the in-memory hash cache to ensure
                            # store_library_content does not skip the row.
                            StoredLibrary.__init_class__()

                    yaml_payload = self._library_to_yaml_payload(library)

                    if dry_run:
                        # Validate by parsing only; do not persist.
                        yaml.safe_load(yaml_payload)
                        self.stdout.write(
                            f"  [dry-run] would store {urn} "
                            f"(version {library.get('version')})"
                        )
                        if was_existing:
                            update_count += 1
                        else:
                            success_count += 1
                        continue

                    stored = StoredLibrary.store_library_content(
                        yaml_payload.encode("utf-8"),
                        builtin=False,
                    )

                if stored is None:
                    skipped_count += 1
                    self.stdout.write(
                        self.style.NOTICE(
                            f"  - skipped {urn}: identical hash or older version"
                        )
                    )
                    continue

                if was_existing:
                    update_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f"  ~ updated {urn}")
                    )
                else:
                    success_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f"  + stored  {urn}")
                    )

            except Exception as exc:  # noqa: BLE001 — match frontend behavior
                error_count += 1
                logger.exception(
                    "muraji_library_store_error",
                    library_urn=urn,
                    library_name=name,
                    error=str(exc),
                )
                self.stdout.write(
                    self.style.ERROR(f"  ! failed  {urn}: {exc}")
                )

        self._report(
            success_count=success_count,
            update_count=update_count,
            error_count=error_count,
            skipped_count=skipped_count,
            dry_run=dry_run,
        )

    @staticmethod
    def _library_to_yaml_payload(library: dict[str, Any]) -> str:
        """Build the YAML body that ``StoredLibrary.store_library_content``
        expects, mirroring the frontend ``fetchMuraji`` action.

        The Muraji API returns each library with a ``content`` field that
        holds the actual ``objects`` payload (framework, threats, ...). We
        rename ``content`` → ``objects`` and drop empty values, matching
        the SvelteKit code that wraps the result in a YAML upload.
        """
        publication_date = library.get("publication_date")
        if isinstance(publication_date, str) and "T" in publication_date:
            publication_date = publication_date.split("T", 1)[0]

        data: dict[str, Any] = {
            "urn": library.get("urn"),
            "locale": library.get("locale") or "en",
            "ref_id": library.get("ref_id"),
            "name": library.get("name"),
            "description": library.get("description") or None,
            "copyright": library.get("copyright") or None,
            "version": library.get("version"),
            "provider": library.get("provider") or None,
            "packager": library.get("packager") or None,
            "publication_date": publication_date or None,
            "objects": library.get("content") or {},
        }

        cleaned = {k: v for k, v in data.items() if v is not None}

        return yaml.safe_dump(cleaned, allow_unicode=True, sort_keys=False)

    def _report(
        self,
        *,
        success_count: int,
        update_count: int,
        error_count: int,
        skipped_count: int,
        dry_run: bool,
    ) -> None:
        total_processed = success_count + update_count
        prefix = "[dry-run] " if dry_run else ""

        if total_processed > 0:
            if update_count > 0 and success_count > 0:
                msg = (
                    f"تم مزامنة {total_processed} مكتبة "
                    f"({success_count} جديدة، {update_count} محدثة)"
                )
            elif update_count > 0:
                msg = f"تم تحديث {update_count} مكتبة من مراجع"
            else:
                msg = f"تم إضافة {success_count} مكتبة جديدة من مراجع"
            self.stdout.write(self.style.SUCCESS(prefix + msg))
        elif error_count > 0:
            self.stdout.write(
                self.style.ERROR(prefix + f"فشل في المزامنة. الأخطاء: {error_count}")
            )
        else:
            self.stdout.write(
                self.style.NOTICE(prefix + "لا توجد مكتبات للمزامنة")
            )

        self.stdout.write("")
        self.stdout.write(
            f"  created : {success_count}\n"
            f"  updated : {update_count}\n"
            f"  skipped : {skipped_count}\n"
            f"  errors  : {error_count}"
        )

        if error_count and not dry_run:
            sys.exit(1)
