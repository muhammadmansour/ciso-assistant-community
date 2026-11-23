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
    bound_here = Q(requirement_assessment__compliance_assessment=assessment) | Q(
        findings_assessment__compliance_assessment=assessment
    )
    unbound = Q(
        requirement_assessment__isnull=True,
        findings_assessment__compliance_assessment__isnull=True,
    ) & (
        Q(applied_controls__in=assessment_controls)
        | Q(requirement_node_id__in=list(ra_by_requirement), folder=assessment.folder)
    )
    findings = (
        Finding.objects.filter(id__in=_accessible_ids(user, Finding))
        .filter(bound_here | unbound)
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
            "status_key": assessment.status or "",
            "framework": framework.name if framework else "",
            "framework_ref": (getattr(framework, "ref_id", "") or "") if framework else "",
            "folder": assessment.folder.name if assessment.folder else "",
            "perimeter": assessment.perimeter.name if assessment.perimeter else "",
            "authors": _actors(assessment.authors),
            "reviewers": _actors(assessment.reviewers),
            "href": f"/compliance-assessments/{assessment.id}",
        },
        "generated_on": timezone.localtime().strftime("%d %b %Y, %H:%M"),
        "generated_at": timezone.localtime().isoformat(),
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


SEVERITY_COLORS = {
    "critical": "B91C1C",
    "high": "C2410C",
    "medium": "B45309",
    "low": "1D4ED8",
    "info": "475569",
}


def audit_document(payload: dict) -> bytes:
    from docx import Document
    from docx.enum.section import WD_ORIENT
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Cm, Pt, RGBColor

    from core.branding import add_docx_branding

    assessment = payload["assessment"]
    summary = payload["summary"]
    sections = payload.get("sections") or SECTION_KEYS
    numbers = payload.get("section_numbers") or {}
    navy = RGBColor(0x19, 0x2A, 0x44)
    blue = RGBColor(0x31, 0x6F, 0xD3)
    grey = RGBColor(0x64, 0x74, 0x8B)

    document = Document()
    page = document.sections[0]
    page.orientation = WD_ORIENT.PORTRAIT
    page.page_width, page.page_height = Cm(21), Cm(29.7)
    page.left_margin = page.right_margin = Cm(1.8)
    page.top_margin = page.bottom_margin = Cm(1.8)
    add_docx_branding(document, f"{assessment['name']} · Audit report")
    document.styles["Normal"].font.size = Pt(9.5)

    def shade(cell, fill):
        properties = cell._tc.get_or_add_tcPr()
        shading = OxmlElement("w:shd")
        shading.set(qn("w:val"), "clear")
        shading.set(qn("w:color"), "auto")
        shading.set(qn("w:fill"), fill)
        properties.append(shading)

    def text(paragraph, value, *, bold=False, color=None, size=None):
        run = paragraph.add_run(value)
        run.bold = bold
        if color is not None:
            run.font.color.rgb = color
        if size is not None:
            run.font.size = Pt(size)
        return run

    def heading(key, title, note):
        paragraph = document.add_paragraph()
        paragraph.paragraph_format.space_before = Pt(14)
        paragraph.paragraph_format.space_after = Pt(0)
        paragraph.paragraph_format.keep_with_next = True
        text(paragraph, f"{numbers.get(key, '')}. ", bold=True, color=blue, size=13)
        text(paragraph, title, bold=True, color=navy, size=13)
        note_paragraph = document.add_paragraph()
        note_paragraph.paragraph_format.space_after = Pt(4)
        note_paragraph.paragraph_format.keep_with_next = True
        text(note_paragraph, note, color=grey, size=8)

    def grid(headers, rows, widths):
        table = document.add_table(rows=1, cols=len(headers))
        table.style = "Table Grid"
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        for cell, header in zip(table.rows[0].cells, headers):
            shade(cell, "EEF3FB")
            cell.paragraphs[0].text = ""
            text(cell.paragraphs[0], header, bold=True, color=navy, size=8)
        for values in rows:
            cells = table.add_row().cells
            for cell, value in zip(cells, values):
                if isinstance(value, tuple):
                    label, color = value
                    text(cell.paragraphs[0], label, bold=True, color=color, size=8.5)
                else:
                    text(cell.paragraphs[0], "" if value is None else str(value), size=8.5)
        for row in table.rows:
            for cell, width in zip(row.cells, widths):
                cell.width = Cm(width)
        return table

    def key_values(rows):
        table = document.add_table(rows=0, cols=2)
        table.style = "Table Grid"
        for key, value in rows:
            cells = table.add_row().cells
            shade(cells[0], "F8FAFC")
            text(cells[0].paragraphs[0], key, bold=True, color=navy, size=8.5)
            text(cells[1].paragraphs[0], value or "—", size=8.5)
            cells[0].width, cells[1].width = Cm(4.2), Cm(13.2)
        return table

    def severity(finding):
        color = SEVERITY_COLORS.get(finding["severity_key"], SEVERITY_COLORS["info"])
        return finding["severity_label"], RGBColor.from_string(color)

    eyebrow = document.add_paragraph()
    eyebrow.paragraph_format.space_after = Pt(0)
    text(eyebrow, "AUDIT REPORT", bold=True, color=blue, size=8.5)
    title = document.add_paragraph()
    title.paragraph_format.space_after = Pt(2)
    prefix = f"{assessment['framework_ref']} — " if assessment["framework_ref"] else ""
    text(title, f"{prefix}{assessment['name']}", bold=True, color=navy, size=20)
    subtitle = document.add_paragraph()
    text(subtitle, f"{assessment['framework']} · Generated {payload['generated_on']}", color=grey, size=10)

    perimeter = assessment["folder"] + (f" — {assessment['perimeter']}" if assessment["perimeter"] else "")
    key_values(
        [
            ("Perimeter", perimeter),
            ("Assessment status", f"{assessment['status'] or '—'} · {summary['reviewed_pct']}% reviewed"),
            ("Authors", ", ".join(assessment["authors"])),
            ("Reviewers", ", ".join(assessment["reviewers"])),
        ]
    )

    findings = payload["findings"]
    if "summary" in sections:
        heading(
            "summary",
            "Summary",
            "Computed from requirement answers: ratio = (I + 0.5×PI) / assessable, N/A excluded.",
        )
        ratio = (
            f"{summary['ratio']}% = ({summary['compliant']} + 0.5×{summary['partially_compliant']}) / {summary['assessable']}"
            if summary["ratio"] is not None
            else "No implemented, partially implemented or not implemented answers yet"
        )
        assessed = f"{summary['assessed']} ({summary['not_applicable']} not applicable)"
        if summary["not_assessed"]:
            assessed += f" · {summary['not_assessed']} of {summary['total']} not assessed yet"

        def domain_label(domain):
            if not domain:
                return "—"
            return f"{domain['ref_id']} {domain['name']} — {domain['ratio']}%".strip()

        counts = " / ".join(f"{s['label']} {s['count']}" for s in payload["severity_counts"])
        key_values(
            [
                ("Compliance ratio", ratio),
                ("Controls assessed", assessed),
                ("Strongest domain", domain_label(summary["strongest"])),
                ("Weakest domain", domain_label(summary["weakest"])),
                ("Findings", f"{len(findings)} — {counts}"),
                ("Observations", str(len(payload["observations"]))),
            ]
        )

    if "domains" in sections:
        heading(
            "domains",
            "Results by domain",
            "Requirement answers grouped by top-level framework node. Same ratio formula per group.",
        )

        def ratio_text(value):
            return f"{value}%" if value is not None else "—"

        rows = [
            [
                f"{d['ref_id']} {d['name']}".strip(),
                d["assessed"],
                d["compliant"],
                d["partially_compliant"],
                d["non_compliant"],
                d["not_applicable"],
                ratio_text(d["ratio"]),
                ", ".join(d["findings"]) or "—",
            ]
            for d in payload["domains"]
        ]
        rows.append(
            [
                ("Total", navy),
                summary["assessed"],
                summary["compliant"],
                summary["partially_compliant"],
                summary["non_compliant"],
                summary["not_applicable"],
                ratio_text(summary["ratio"]),
                len(findings),
            ]
        )
        grid(
            ["Domain", "Controls", "I", "PI", "NI", "N/A", "Ratio", "Findings"],
            rows,
            [5.6, 1.6, 1.0, 1.0, 1.0, 1.1, 1.5, 4.6],
        )

    if "findings" in sections:
        heading(
            "findings",
            "Findings",
            "Findings recorded in the follow-up module. Owner and ETA come from each finding's linked applied control.",
        )
        if findings:
            grid(
                ["ID", "Title", "Severity", "Status"],
                [[f["code"], f["name"], severity(f), f["status_label"]] for f in findings],
                [2.8, 9.6, 2.4, 2.6],
            )
        else:
            text(document.add_paragraph(), "No findings recorded for this assessment.", color=grey)

        detailed = payload["detailed_findings"]
        if detailed:
            sub = document.add_paragraph()
            sub.paragraph_format.space_before = Pt(10)
            sub.paragraph_format.keep_with_next = True
            text(sub, "Details — Critical & High", bold=True, color=navy, size=11)
            for finding in detailed:
                head = document.add_paragraph()
                head.paragraph_format.space_before = Pt(8)
                head.paragraph_format.space_after = Pt(2)
                head.paragraph_format.keep_with_next = True
                if finding["ref_id"]:
                    text(head, f"{finding['ref_id']} ", bold=True, color=blue)
                text(head, f"{finding['name']}  ", bold=True, color=navy)
                label, color = severity(finding)
                text(head, label, bold=True, color=color, size=8.5)
                key_values(
                    [
                        ("Description", finding["description"]),
                        (
                            "Requirement obs.",
                            "; ".join(
                                f"{r['ref_id']}: {r['observation'] + ' ' if r['observation'] else ''}({r['abbr']})"
                                for r in finding["requirements"]
                            ),
                        ),
                        (
                            "Applied control",
                            "\n".join(
                                f"{c['name']} [{c['status_label']}] · owner {', '.join(c['owners']) or '—'}"
                                + (f" · ETA {c['eta']}" if c["eta"] else "")
                                for c in finding["controls"]
                            ),
                        ),
                        ("Evidence", ", ".join(finding["evidence"]) or "None attached"),
                    ]
                )

    if "observations" in sections:
        heading(
            "observations",
            "Observations",
            "Requirement answers marked Partially implemented with no linked finding; text is the requirement's observation field, verbatim.",
        )
        if payload["observations"]:
            grid(
                ["ID", "Observation"],
                [[o["ref_id"], o["observation"] or "—"] for o in payload["observations"]],
                [2.8, 14.6],
            )
        else:
            text(document.add_paragraph(), "No observations.", color=grey)

    if "action_plan" in sections:
        heading(
            "action_plan",
            "Action plan",
            "All non-active applied controls linked to this assessment's findings, sorted by ETA.",
        )
        if payload["action_plan"]:
            grid(
                ["Applied control", "Linked findings", "Owner", "ETA", "Status"],
                [
                    [c["name"], ", ".join(c["findings"]), ", ".join(c["owners"]) or "—", c["eta"] or "—", c["status_label"]]
                    for c in payload["action_plan"]
                ],
                [5.8, 3.8, 3.4, 2.2, 2.2],
            )
        else:
            text(document.add_paragraph(), "No open actions.", color=grey)

    buffer = io.BytesIO()
    document.save(buffer)
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


class AuditReportDocxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payload, error = _payload_or_404(request)
        if error or payload["assessment"] is None:
            return error or Response(status=status.HTTP_404_NOT_FOUND)
        response = HttpResponse(
            audit_document(payload),
            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
        response["Content-Disposition"] = 'attachment; filename="audit-report.docx"'
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
