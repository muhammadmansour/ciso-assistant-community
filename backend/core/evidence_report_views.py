import datetime
import io

from django.db.models import Count
from django.http import HttpResponse
from openpyxl import Workbook
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import ComplianceAssessment, RequirementNode
from core.nca_ecc_report_views import _accessible_ids

EXPIRING_DAYS = 60
PROVEN_STATUSES = {"approved"}
PENDING_STATUSES = {"draft", "in_review"}
COMPLIANT_RESULTS = {"compliant"}

COVERAGE_LABELS = {
    "proven": "Approved, with file or link",
    "pending": "Awaiting approval or proof",
    "weak": "Only missing, rejected or expired evidence",
    "none": "No evidence",
}
ISSUE_LABELS = {
    "expired": "Expired",
    "expiring": f"Expires within {EXPIRING_DAYS} days",
    "missing": "Marked missing",
    "rejected": "Rejected",
    "no_proof": "No file or link attached",
    "no_owner": "No owner",
}


def _effective_status(evidence, today):
    if evidence.expiry_date and evidence.expiry_date < today:
        return "expired"
    return evidence.status or "draft"


def _evidence_item(evidence, today):
    revision = evidence.last_revision
    effective = _effective_status(evidence, today)
    issues = []
    if effective == "expired":
        issues.append("expired")
    elif evidence.expiry_date and (evidence.expiry_date - today).days <= EXPIRING_DAYS:
        issues.append("expiring")
    if effective in ("missing", "rejected"):
        issues.append(effective)
    if not revision or not (revision.attachment or revision.link):
        issues.append("no_proof")
    if not evidence.owner.exists():
        issues.append("no_owner")
    return {
        "id": str(evidence.id),
        "name": evidence.name,
        "status": effective,
        "status_label": effective.replace("_", " ").capitalize(),
        "recorded_status": evidence.status or "",
        "expiry_date": evidence.expiry_date.isoformat() if evidence.expiry_date else None,
        "link": (revision.link or "") if revision else "",
        "has_file": bool(revision and revision.attachment),
        "owners": [str(owner) for owner in evidence.owner.all()],
        "issues": issues,
        "href": f"/evidences/{evidence.id}",
        "requirements": [],
    }


def _coverage(items):
    if not items:
        return "none"
    if any(
        item["status"] in PROVEN_STATUSES and "no_proof" not in item["issues"]
        for item in items
    ):
        return "proven"
    if any(item["status"] in PROVEN_STATUSES | PENDING_STATUSES for item in items):
        return "pending"
    return "weak"


def _outline(framework):
    nodes = {
        node.urn: node
        for node in RequirementNode.objects.filter(framework=framework).only(
            "urn", "parent_urn", "ref_id", "name", "order_id"
        )
    }

    def ancestors(node):
        chain = []
        while node is not None:
            chain.append(node)
            node = nodes.get(node.parent_urn) if node.parent_urn else None
        return list(reversed(chain))

    return ancestors


def _label(node):
    if node is None:
        return {"ref_id": "", "name": ""}
    return {"ref_id": node.ref_id or "", "name": node.name or ""}


def _assessment_choices(assessment_ids):
    return [
        {
            "id": str(item.id),
            "name": item.name,
            "framework": item.framework.name if item.framework else "",
            "folder": item.folder.name if item.folder else "",
            "evidence_count": item.evidence_count,
        }
        for item in ComplianceAssessment.objects.filter(id__in=assessment_ids)
        .select_related("framework", "folder")
        .annotate(evidence_count=Count("requirement_assessments__evidences", distinct=True))
        .order_by("-evidence_count", "name")
    ]


def build_evidence_report(user, assessment_id: str | None = None) -> dict | None:
    assessment_ids = _accessible_ids(user, ComplianceAssessment)
    choices = _assessment_choices(assessment_ids)
    if assessment_id:
        if not any(choice["id"] == assessment_id for choice in choices):
            return None
    elif choices:
        assessment_id = choices[0]["id"]
    else:
        return {"assessments": [], "assessment": None}

    assessment = ComplianceAssessment.objects.select_related("framework", "folder").get(
        id=assessment_id
    )
    today = datetime.date.today()
    ancestors = _outline(assessment.framework)
    rows = sorted(
        assessment.get_requirement_assessments(include_non_assessable=False),
        key=lambda row: row.requirement.order_id or 0,
    )

    evidence_items = {}
    requirements = []
    levels = {}
    for row in rows:
        chain = ancestors(row.requirement)
        level = chain[0] if len(chain) > 1 else None
        group = chain[1] if len(chain) > 2 else None
        linked = []
        for evidence in row.evidences.all():
            item = evidence_items.get(evidence.id)
            if item is None:
                item = _evidence_item(evidence, today)
                evidence_items[evidence.id] = item
            item["requirements"].append(row.requirement.ref_id or "")
            linked.append(item)
        coverage = _coverage(linked)
        requirement = {
            "id": str(row.id),
            "ref_id": row.requirement.ref_id or "",
            "name": row.requirement.name or "",
            "level": _label(level),
            "group": _label(group),
            "result": row.result or "not_assessed",
            "coverage": coverage,
            "claimed_without_proof": row.result in COMPLIANT_RESULTS
            and coverage != "proven",
            "evidence": [
                {"id": item["id"], "name": item["name"], "status": item["status"], "href": item["href"]}
                for item in linked
            ],
            "href": f"/requirement-assessments/{row.id}",
        }
        requirements.append(requirement)
        key = requirement["level"]["ref_id"] or "-"
        bucket = levels.setdefault(
            key,
            {**requirement["level"], "requirements": 0, **{name: 0 for name in COVERAGE_LABELS}},
        )
        bucket["requirements"] += 1
        bucket[coverage] += 1

    for evidence in assessment.evidences.all():
        if evidence.id not in evidence_items:
            evidence_items[evidence.id] = _evidence_item(evidence, today)

    evidence = sorted(evidence_items.values(), key=lambda item: item["name"].lower())
    by_status = {}
    for item in evidence:
        by_status[item["status"]] = by_status.get(item["status"], 0) + 1
    issue_counts = {
        key: sum(key in item["issues"] for item in evidence) for key in ISSUE_LABELS
    }
    coverage_counts = {
        key: sum(row["coverage"] == key for row in requirements) for key in COVERAGE_LABELS
    }

    return {
        "assessments": choices,
        "assessment": {
            "id": str(assessment.id),
            "name": assessment.name,
            "framework": assessment.framework.name if assessment.framework else "",
            "folder": assessment.folder.name if assessment.folder else "",
            "href": f"/compliance-assessments/{assessment.id}",
        },
        "generated_on": today.isoformat(),
        "expiring_days": EXPIRING_DAYS,
        "summary": {
            "requirements": len(requirements),
            "evidence": len(evidence),
            "unlinked_evidence": sum(not item["requirements"] for item in evidence),
            "claimed_without_proof": sum(row["claimed_without_proof"] for row in requirements),
            "coverage": coverage_counts,
            "evidence_status": by_status,
            "issues": issue_counts,
        },
        "coverage_labels": COVERAGE_LABELS,
        "issue_labels": ISSUE_LABELS,
        "levels": list(levels.values()),
        "requirements": requirements,
        "evidence": evidence,
    }


def evidence_workbook(payload: dict) -> bytes:
    workbook = Workbook()
    assessment = payload["assessment"]
    summary = payload["summary"]
    sheet = workbook.active
    sheet.title = "Summary"
    for row in [
        ["Assessment", assessment["name"]],
        ["Framework", assessment["framework"]],
        ["Domain", assessment["folder"]],
        ["Generated on", payload["generated_on"]],
        ["Assessable requirements", summary["requirements"]],
        *[[label, summary["coverage"][key]] for key, label in COVERAGE_LABELS.items()],
        ["Compliant without approved proof", summary["claimed_without_proof"]],
        ["Evidence records", summary["evidence"]],
        ["Evidence not linked to a requirement", summary["unlinked_evidence"]],
        *[[f"Evidence: {label}", summary["issues"][key]] for key, label in ISSUE_LABELS.items()],
    ]:
        sheet.append(row)

    levels = workbook.create_sheet("By level")
    levels.append(["Level", "Name", "Requirements", *COVERAGE_LABELS.values()])
    for level in payload["levels"]:
        levels.append(
            [level["ref_id"], level["name"], level["requirements"]]
            + [level[key] for key in COVERAGE_LABELS]
        )

    detail = workbook.create_sheet("Requirements")
    detail.append(
        ["Level", "Group", "Ref", "Requirement", "Result", "Evidence coverage", "Evidence", "Evidence status"]
    )
    for row in payload["requirements"]:
        for item in row["evidence"] or [None]:
            detail.append(
                [
                    row["level"]["ref_id"],
                    row["group"]["name"],
                    row["ref_id"],
                    row["name"],
                    row["result"].replace("_", " "),
                    COVERAGE_LABELS[row["coverage"]],
                    item["name"] if item else "",
                    item["status"].replace("_", " ") if item else "",
                ]
            )

    register = workbook.create_sheet("Evidence register")
    register.append(
        ["Evidence", "Status", "Expiry date", "File attached", "Link", "Owners", "Requirements", "Issues"]
    )
    for item in payload["evidence"]:
        register.append(
            [
                item["name"],
                item["status"].replace("_", " "),
                item["expiry_date"] or "",
                "yes" if item["has_file"] else "no",
                item["link"],
                ", ".join(item["owners"]),
                ", ".join(item["requirements"]),
                ", ".join(ISSUE_LABELS[key] for key in item["issues"]),
            ]
        )

    buffer = io.BytesIO()
    workbook.save(buffer)
    return buffer.getvalue()


def _not_found():
    return Response(
        {"error": "Assessment not found or not visible."},
        status=status.HTTP_404_NOT_FOUND,
    )


class EvidenceReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payload = build_evidence_report(
            request.user, request.query_params.get("assessment")
        )
        if payload is None:
            return _not_found()
        return Response(payload)


class EvidenceReportXlsxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payload = build_evidence_report(
            request.user, request.query_params.get("assessment")
        )
        if payload is None or payload["assessment"] is None:
            return _not_found()
        response = HttpResponse(
            evidence_workbook(payload),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = 'attachment; filename="evidence-coverage.xlsx"'
        return response
