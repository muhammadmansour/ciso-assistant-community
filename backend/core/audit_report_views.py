import io

from django.db.models import Prefetch, Q
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from openpyxl import Workbook
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.evidence_report_views import _assessment_choices
from core.models import (
    AppliedControl,
    ComplianceAssessment,
    Finding,
    RequirementAssessment,
)
from core.nca_ecc_report_views import _accessible_ids

RESULT_KEYS = ["compliant", "partially_compliant", "non_compliant", "not_applicable"]
RESULT_ABBR = {
    "compliant": "I",
    "partially_compliant": "PI",
    "non_compliant": "NI",
    "not_applicable": "N/A",
    "not_assessed": "—",
}
SEVERITIES = [
    {"value": 4, "key": "critical", "label": "Critical", "short": "C"},
    {"value": 3, "key": "high", "label": "High", "short": "H"},
    {"value": 2, "key": "medium", "label": "Medium", "short": "M"},
    {"value": 1, "key": "low", "label": "Low", "short": "L"},
]
SEVERITY_BY_VALUE = {s["value"]: s for s in SEVERITIES}
DETAILED_SEVERITIES = {3, 4}
SECTION_KEYS = ["summary", "domains", "findings", "observations", "action_plan"]
CLOSED_FINDING_STATUSES = {"dismissed", "mitigated", "resolved", "closed", "deprecated"}
ACTION_PLAN_EXCLUDED = {"active", "deprecated"}


def _date(value):
    return value.isoformat() if value else None


def _actors(manager):
    return [str(actor) for actor in manager.all()]


def _ratio(counts):
    assessable = counts["compliant"] + counts["partially_compliant"] + counts["non_compliant"]
    if not assessable:
        return None
    return round((counts["compliant"] + 0.5 * counts["partially_compliant"]) * 100 / assessable, 1)


def _counts(rows):
    counts = {key: 0 for key in [*RESULT_KEYS, "not_assessed"]}
    for ra in rows:
        counts[ra.result if ra.result in counts else "not_assessed"] += 1
    counts["assessed"] = sum(counts[key] for key in RESULT_KEYS)
    counts["ratio"] = _ratio(counts)
    return counts


def _finding_tone(status_key):
    if status_key == "in_progress":
        return "progress"
    if status_key in {"mitigated", "resolved", "closed"}:
        return "done"
    if status_key in {"dismissed", "deprecated"}:
        return "muted"
    return "open"


def _control_item(control):
    return {
        "id": str(control.id),
        "name": control.name,
        "status": control.status or "--",
        "status_label": control.get_status_display() if control.status else "Undefined",
        "owners": _actors(control.owner),
        "eta": _date(control.eta),
        "href": f"/applied-controls/{control.id}",
    }


def _findings(assessment, user, ra_by_requirement, section_of):
    assessment_controls = AppliedControl.objects.filter(
        requirement_assessments__compliance_assessment=assessment
    )
    findings = (
        Finding.objects.filter(id__in=_accessible_ids(user, Finding))
        .filter(
            Q(applied_controls__in=assessment_controls)
            | Q(requirement_node_id__in=list(ra_by_requirement), folder=assessment.folder)
        )
        .distinct()
        .prefetch_related(
            "evidences",
            Prefetch(
                "applied_controls",
                queryset=AppliedControl.objects.prefetch_related(
                    "owner",
                    "evidences",
                    Prefetch(
                        "requirement_assessments",
                        queryset=RequirementAssessment.objects.filter(
                            compliance_assessment=assessment
                        ).only("id", "requirement_id"),
                    ),
                ),
            ),
        )
    )

    items = []
    for finding in findings:
        requirement_ids = []
        if finding.requirement_node_id in ra_by_requirement:
            requirement_ids.append(finding.requirement_node_id)
        controls = list(finding.applied_controls.all())
        for control in controls:
            for ra in control.requirement_assessments.all():
                if ra.requirement_id not in requirement_ids:
                    requirement_ids.append(ra.requirement_id)
        requirement_ids.sort(key=lambda rid: ra_by_requirement[rid]["order"])

        evidence_names = []
        for evidence in [*finding.evidences.all(), *(e for c in controls for e in c.evidences.all())]:
            if evidence.name not in evidence_names:
                evidence_names.append(evidence.name)

        severity = SEVERITY_BY_VALUE.get(finding.severity)
        items.append(
            {
                "id": str(finding.id),
                "ref_id": finding.ref_id or "",
                "name": finding.name,
                "description": finding.description or "",
                "severity": finding.severity,
                "severity_key": severity["key"] if severity else "info",
                "severity_label": severity["label"] if severity else finding.get_severity_display().capitalize(),
                "status": finding.status,
                "status_label": finding.get_status_display(),
                "status_tone": _finding_tone(finding.status),
                "open": finding.status not in CLOSED_FINDING_STATUSES,
                "requirement_ids": requirement_ids,
                "requirements": [ra_by_requirement[rid]["obs"] for rid in requirement_ids],
                "sections": sorted({section_of[rid] for rid in requirement_ids if rid in section_of}),
                "controls": [_control_item(c) for c in controls],
                "evidence": evidence_names,
                "href": f"/findings/{finding.id}",
            }
        )

    items.sort(key=lambda f: (-f["severity"], f["ref_id"] or "~", f["name"].lower()))
    for item in items:
        item["code"] = item["ref_id"] or "—"
        item["label"] = item["ref_id"] or item["name"]
    return items


def build_audit_report(user, assessment_id: str | None = None) -> dict | None:
    from core.views import _compliance_assessment_pdf_context

    choices = _assessment_choices(_accessible_ids(user, ComplianceAssessment))
    if assessment_id:
        if not any(choice["id"] == assessment_id for choice in choices):
            return None
    elif choices:
        assessment_id = choices[0]["id"]
    else:
        return {"assessments": [], "assessment": None}

    assessment = ComplianceAssessment.objects.select_related(
        "framework", "folder", "perimeter"
    ).get(id=assessment_id)
    rows = list(assessment.get_requirement_assessments(include_non_assessable=False))
    context = _compliance_assessment_pdf_context(assessment, rows)

    ra_by_requirement = {}
    for order, ra in enumerate(context["requirement_assessments"]):
        result = ra.result or "not_assessed"
        ref = ra.requirement.ref_id or ra.requirement.name or ""
        abbr = RESULT_ABBR.get(result, "—")
        observation = (ra.observation or "").strip()
        ra_by_requirement[ra.requirement_id] = {
            "order": order,
            "ra": ra,
            "obs": {
                "ref_id": ref,
                "result": result,
                "abbr": abbr,
                "observation": observation,
                "href": f"/requirement-assessments/{ra.id}",
            },
        }

    section_of = {}
    domains = []
    for index, section in enumerate(context["sections"]):
        section_rows = [row for group in section["groups"] for row in group["rows"]]
        for row in section_rows:
            section_of[row.requirement_id] = index
        node = section["node"]
        domains.append(
            {
                "index": index,
                "ref_id": node.ref_id if node else "",
                "name": (node.name if node else "") or "Requirements",
                **_counts(section_rows),
                "findings": [],
            }
        )

    findings = _findings(assessment, user, ra_by_requirement, section_of)
    for finding in findings:
        for index in finding["sections"]:
            domains[index]["findings"].append(finding["label"])

    totals = _counts(context["requirement_assessments"])
    rated = [d for d in domains if d["ratio"] is not None]
    strongest = max(rated, key=lambda d: d["ratio"]) if rated else None
    weakest = min(rated, key=lambda d: d["ratio"]) if len(rated) > 1 else None

    finding_requirements = {rid for f in findings for rid in f["requirement_ids"]}
    observations = [
        entry["obs"]
        for rid, entry in ra_by_requirement.items()
        if entry["obs"]["result"] == "partially_compliant" and rid not in finding_requirements
    ]

    plan = {}
    for finding in findings:
        for control in finding["controls"]:
            if control["status"] in ACTION_PLAN_EXCLUDED:
                continue
            entry = plan.setdefault(control["id"], {**control, "findings": []})
            entry["findings"].append(finding["label"])
    action_plan = sorted(plan.values(), key=lambda c: (c["eta"] is None, c["eta"] or "", c["name"].lower()))

    severity_counts = [
        {**s, "count": sum(1 for f in findings if f["severity"] == s["value"])} for s in SEVERITIES
    ]
    framework = assessment.framework
    return {
        "assessments": choices,
        "assessment": {
            "id": str(assessment.id),
            "name": assessment.name,
            "ref_id": assessment.ref_id or "",
            "version": assessment.version or "",
            "status": assessment.get_status_display() if assessment.status else "",
            "framework": framework.name if framework else "",
            "framework_ref": (getattr(framework, "ref_id", "") or "") if framework else "",
            "folder": assessment.folder.name if assessment.folder else "",
            "perimeter": assessment.perimeter.name if assessment.perimeter else "",
            "authors": _actors(assessment.authors),
            "reviewers": _actors(assessment.reviewers),
            "href": f"/compliance-assessments/{assessment.id}",
        },
        "generated_on": timezone.localtime().strftime("%d %b %Y, %H:%M"),
        "summary": {
            **totals,
            "total": len(context["requirement_assessments"]),
            "reviewed_pct": round(totals["assessed"] * 100 / len(rows)) if rows else 0,
            "assessable": totals["compliant"] + totals["partially_compliant"] + totals["non_compliant"],
            "strongest": strongest,
            "weakest": weakest,
        },
        "domains": domains,
        "findings": findings,
        "severity_counts": severity_counts,
        "detailed_findings": [f for f in findings if f["severity"] in DETAILED_SEVERITIES],
        "observations": observations,
        "action_plan": action_plan,
    }


def audit_workbook(payload: dict) -> bytes:
    workbook = Workbook()
    assessment = payload["assessment"]
    summary = payload["summary"]
    sections = payload.get("sections") or SECTION_KEYS
    sheet = workbook.active
    sheet.title = "Summary" if "summary" in sections else "Assessment"
    severity_text = " / ".join(f"{s['label']} {s['count']}" for s in payload["severity_counts"])
    for row in [
        ["Assessment", assessment["name"]],
        ["Framework", assessment["framework"]],
        ["Domain", assessment["folder"]],
        ["Perimeter", assessment["perimeter"]],
        ["Status", assessment["status"]],
        ["Authors", ", ".join(assessment["authors"])],
        ["Reviewers", ", ".join(assessment["reviewers"])],
        ["Generated on", payload["generated_on"]],
    ]:
        sheet.append(row)

    for row in [] if "summary" not in sections else [
        [],
        ["Compliance ratio", f"{summary['ratio']}%" if summary["ratio"] is not None else "-"],
        ["Formula", "(I + 0.5 x PI) / (I + PI + NI), N/A excluded"],
        ["Controls assessed", summary["assessed"]],
        ["Implemented (I)", summary["compliant"]],
        ["Partially implemented (PI)", summary["partially_compliant"]],
        ["Not implemented (NI)", summary["non_compliant"]],
        ["Not applicable (N/A)", summary["not_applicable"]],
        ["Not assessed", summary["not_assessed"]],
        ["Strongest domain", f"{summary['strongest']['name']} ({summary['strongest']['ratio']}%)" if summary["strongest"] else "-"],
        ["Weakest domain", f"{summary['weakest']['name']} ({summary['weakest']['ratio']}%)" if summary["weakest"] else "-"],
        ["Findings", f"{len(payload['findings'])} ({severity_text})"],
        ["Observations", len(payload["observations"])],
    ]:
        sheet.append(row)

    def table(key, title, headers, rows):
        if key not in sections:
            return
        target = workbook.create_sheet(title)
        target.append(headers)
        for row in rows:
            target.append(row)

    table(
        "domains",
        "Results by domain",
        ["Domain", "Controls", "I", "PI", "NI", "N/A", "Not assessed", "Ratio %", "Findings"],
        [
            [f"{d['ref_id']} {d['name']}".strip(), d["assessed"], d["compliant"], d["partially_compliant"],
             d["non_compliant"], d["not_applicable"], d["not_assessed"],
             d["ratio"] if d["ratio"] is not None else "", ", ".join(d["findings"])]
            for d in payload["domains"]
        ]
        + [["Total", summary["assessed"], summary["compliant"], summary["partially_compliant"],
            summary["non_compliant"], summary["not_applicable"], summary["not_assessed"],
            summary["ratio"] if summary["ratio"] is not None else "", len(payload["findings"])]],
    )
    table(
        "findings",
        "Findings",
        ["ID", "Title", "Severity", "Status", "Description", "Requirement observations",
         "Applied controls", "Evidence"],
        [
            [f["ref_id"], f["name"], f["severity_label"], f["status_label"], f["description"],
             "; ".join(f"{r['ref_id']}: {r['observation'] + ' ' if r['observation'] else ''}({r['abbr']})" for r in f["requirements"]),
             "; ".join(f"{c['name']} [{c['status_label']}]" for c in f["controls"]),
             ", ".join(f["evidence"])]
            for f in payload["findings"]
        ],
    )
    table(
        "observations",
        "Observations",
        ["ID", "Observation"],
        [[o["ref_id"], o["observation"]] for o in payload["observations"]],
    )
    table(
        "action_plan",
        "Action plan",
        ["Applied control", "Linked findings", "Owner", "ETA", "Status"],
        [[c["name"], ", ".join(c["findings"]), ", ".join(c["owners"]), c["eta"] or "", c["status_label"]]
         for c in payload["action_plan"]],
    )

    buffer = io.BytesIO()
    workbook.save(buffer)
    return buffer.getvalue()


def _selected_sections(raw: str | None) -> list[str]:
    requested = {key.strip() for key in (raw or "").split(",")}
    selected = [key for key in SECTION_KEYS if key in requested]
    return selected or list(SECTION_KEYS)


def _payload_or_404(request):
    payload = build_audit_report(request.user, request.query_params.get("assessment"))
    if payload is None:
        return None, Response(
            {"error": "Assessment not found or not visible."},
            status=status.HTTP_404_NOT_FOUND,
        )
    sections = _selected_sections(request.query_params.get("sections"))
    payload["sections"] = sections
    payload["section_numbers"] = {key: index for index, key in enumerate(sections, start=1)}
    return payload, None


class AuditReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.query_params.get("choices") == "1":
            choices = _assessment_choices(_accessible_ids(request.user, ComplianceAssessment))
            return Response({"assessments": choices})
        payload, error = _payload_or_404(request)
        return error or Response(payload)


class AuditReportXlsxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payload, error = _payload_or_404(request)
        if error or payload["assessment"] is None:
            return error or Response(status=status.HTTP_404_NOT_FOUND)
        response = HttpResponse(
            audit_workbook(payload),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = 'attachment; filename="audit-report.xlsx"'
        return response


class AuditReportPdfView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from core.views import _render_weasyprint_pdf

        payload, error = _payload_or_404(request)
        if error or payload["assessment"] is None:
            return error or Response(status=status.HTTP_404_NOT_FOUND)
        try:
            pdf = _render_weasyprint_pdf(render_to_string("core/audit_report_pdf.html", payload))
        except RuntimeError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        response = HttpResponse(pdf, content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="audit-report.pdf"'
        return response
