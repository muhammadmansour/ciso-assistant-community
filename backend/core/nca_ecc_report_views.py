import io

from django.http import HttpResponse
from openpyxl import Workbook
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import AppliedControl, StoredLibrary
from core.nca_ecc_readiness import (
    ECC_ARABIC_NAME,
    ECC_EDITION,
    ECC_REF_ID,
    assemble_domain_report,
    control_posture,
    ecc_outline_from_library,
    evidence_refs,
)
from doc_management.models import DocumentContainer
from iam.models import Folder, RoleAssignment

LIBRARY_FILE = "library/libraries/ecc-1.yaml"


def _library_content():
    stored = (
        StoredLibrary.objects.filter(ref_id=ECC_REF_ID, locale="en")
        .order_by("-updated_at")
        .first()
    )
    if stored and stored.content:
        content = stored.content
        return content.decode("utf-8") if isinstance(content, bytes) else content
    from pathlib import Path

    from django.conf import settings

    return Path(settings.BASE_DIR, LIBRARY_FILE).read_text(encoding="utf-8")


def _accessible_ids(user, model):
    view_ids, _, _ = RoleAssignment.get_accessible_object_ids(
        Folder.get_root_folder(), user, model
    )
    if view_ids:
        return view_ids
    if getattr(user, "is_superuser", False) or (
        hasattr(user, "is_admin") and user.is_admin()
    ):
        return list(model.objects.values_list("id", flat=True))
    return []


def _evidence_for_folder(folder, controls, documents) -> list[dict]:
    items = []
    for control in controls:
        if control.folder_id != folder.id or not (control.name or "").strip():
            continue
        items.append(
            {
                "kind": "control",
                "id": str(control.id),
                "name": control.name,
                "record_status": control.status or "",
                "posture": control_posture(control.status),
                "observation": control.observation or "",
                "href": f"/applied-controls/{control.id}",
                "ecc_refs": evidence_refs(control.name),
            }
        )
    for document in documents:
        if document.folder_id != folder.id or not (document.name or "").strip():
            continue
        items.append(
            {
                "kind": "document",
                "id": str(document.id),
                "name": document.name,
                "record_status": "recorded",
                "posture": "documented",
                "observation": "",
                "href": f"/documents/{document.id}/read",
                "ecc_refs": evidence_refs(document.name),
            }
        )
    return items


def build_nca_ecc_readiness(user, folder_id: str | None = None) -> dict:
    outline = ecc_outline_from_library(_library_content())
    control_ids = _accessible_ids(user, AppliedControl)
    document_ids = _accessible_ids(user, DocumentContainer)
    controls = list(
        AppliedControl.objects.filter(id__in=control_ids).select_related("folder")
    )
    documents = list(
        DocumentContainer.objects.filter(id__in=document_ids).select_related("folder")
    )
    folders = {}
    for record in [*controls, *documents]:
        folder = record.folder
        if folder is None or folder.content_type != Folder.ContentType.DOMAIN:
            continue
        folders[folder.id] = folder
    if folder_id:
        folders = {key: value for key, value in folders.items() if str(key) == folder_id}

    domains = [
        assemble_domain_report(
            folder_id=str(folder.id),
            folder_name=folder.name,
            outline=outline,
            evidence=_evidence_for_folder(folder, controls, documents),
        )
        for folder in sorted(folders.values(), key=lambda item: item.name.lower())
    ]
    domains.sort(key=lambda domain: domain["summary"]["gap"])
    return {
        "framework": {
            "ref_id": ECC_REF_ID,
            "name": "Essential Cybersecurity Controls",
            "provider": "NCA",
            "edition": ECC_EDITION,
            "arabic_name": ECC_ARABIC_NAME,
        },
        "domains": domains,
    }


def readiness_workbook(payload: dict) -> bytes:
    workbook = Workbook()
    summary = workbook.active
    summary.title = "Summary"
    summary.append(
        [
            "Domain",
            "ECC edition",
            "Subdomains",
            "Implemented",
            "Policy recorded",
            "In progress",
            "Not started",
            "No record",
            "Controls",
            "Documents",
            "Unmapped records",
        ]
    )
    for domain in payload["domains"]:
        counts = domain["summary"]
        summary.append(
            [
                domain["name"],
                payload["framework"]["edition"],
                counts["subdomains"],
                counts["covered"],
                counts["documented"],
                counts["partial"],
                counts["planned"],
                counts["gap"],
                counts["controls"],
                counts["documents"],
                counts["unmapped"],
            ]
        )

    detail = workbook.create_sheet("ECC subdomains")
    detail.append(
        [
            "Domain",
            "ECC domain",
            "Subdomain",
            "Subdomain name",
            "Readiness",
            "Evidence type",
            "Evidence",
            "Record status",
            "Observation",
        ]
    )
    labels = {
        "covered": "Implemented",
        "documented": "Policy recorded",
        "partial": "In progress",
        "planned": "Not started",
        "gap": "No record",
    }
    for domain in payload["domains"]:
        for section in domain["sections"]:
            for subdomain in section["subdomains"]:
                evidence = subdomain["evidence"] or [None]
                for item in evidence:
                    detail.append(
                        [
                            domain["name"],
                            section["name"],
                            subdomain["ref_id"],
                            subdomain["name"],
                            labels[subdomain["status"]],
                            item["kind"] if item else "",
                            item["name"] if item else "",
                            item["record_status"] if item else "",
                            item["observation"] if item else "",
                        ]
                    )

    unmapped = workbook.create_sheet("Unmapped records")
    unmapped.append(["Domain", "Type", "Name", "Record status", "Observation"])
    for domain in payload["domains"]:
        for item in domain["unmapped"]:
            unmapped.append(
                [
                    domain["name"],
                    item["kind"],
                    item["name"],
                    item["record_status"],
                    item["observation"],
                ]
            )

    buffer = io.BytesIO()
    workbook.save(buffer)
    return buffer.getvalue()


class NcaEccReadinessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        folder_id = request.query_params.get("folder")
        payload = build_nca_ecc_readiness(request.user, folder_id=folder_id)
        if folder_id and not payload["domains"]:
            return Response(
                {"error": "Domain not found or not visible."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(payload)


class NcaEccReadinessXlsxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        folder_id = request.query_params.get("folder")
        payload = build_nca_ecc_readiness(request.user, folder_id=folder_id)
        if folder_id and not payload["domains"]:
            return Response(
                {"error": "Domain not found or not visible."},
                status=status.HTTP_404_NOT_FOUND,
            )
        content = readiness_workbook(payload)
        response = HttpResponse(
            content,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = (
            'attachment; filename="nca-ecc-readiness.xlsx"'
        )
        return response
