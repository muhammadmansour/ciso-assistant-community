import io
from collections import Counter

from django.db.models import Count, Prefetch
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.formats import date_format
from django.utils.translation import get_language_bidi, gettext_noop
from django.utils.translation import gettext as _
from openpyxl import Workbook
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.audit_report_views import report_language
from core.models import AppliedControl, RiskAssessment, RiskScenario
from core.nca_ecc_report_views import _accessible_ids
from core.risk_assessment_pdf import _matrix_view, _rating
from global_settings.models import GlobalSettings

SECTION_KEYS = [
    "summary",
    "scoring",
    "heatmaps",
    "top_risks",
    "controls",
    "cost_effectiveness",
    "treatment",
]
TREATMENT_ORDER = ["mitigate", "transfer", "accept", "avoid", "open"]
HEATMAP_TITLES = (
    ("current", gettext_noop("Current (before planned treatment)")),
    ("residual", gettext_noop("Residual (after treatment)")),
)
EFFECTIVENESS_TAGS = {
    "twice_average": gettext_noop("> 2× average"),
    "no_reduction": gettext_noop("No reduction"),
    "no_costed_control": gettext_noop("No costed control"),
}
HEATMAP_TEXT = "#1E293B"


def _selected_sections(raw: str | None) -> list[str]:
    requested = {key.strip() for key in (raw or "").split(",")}
    selected = [key for key in SECTION_KEYS if key in requested]
    return selected or list(SECTION_KEYS)


def _assessment_choices(assessment_ids):
    return [
        {
            "id": str(item.id),
            "name": item.name,
            "ref_id": item.ref_id or "",
            "folder": item.folder.name if item.folder else "",
            "perimeter": item.perimeter.name if item.perimeter else "",
            "risk_matrix": item.risk_matrix.name if item.risk_matrix else "",
            "scenario_count": item.scenario_count,
        }
        for item in RiskAssessment.objects.filter(id__in=assessment_ids)
        .select_related("folder", "perimeter", "risk_matrix")
        .annotate(scenario_count=Count("risk_scenarios", distinct=True))
        .order_by("-scenario_count", "name")
    ]


def _score(proba, impact):
    if proba is None or impact is None or proba < 0 or impact < 0:
        return None
    return (proba + 1) * (impact + 1)


def _rated(matrix, scenario, kind):
    proba = getattr(scenario, f"{kind}_proba")
    impact = getattr(scenario, f"{kind}_impact")
    level = getattr(scenario, f"{kind}_level")
    rating = _rating(matrix, level, proba, impact)
    score = _score(proba, impact) if rating["rated"] else None
    return {
        **rating,
        "score": score,
        "lxi": f"{proba + 1} × {impact + 1}" if score is not None else "—",
    }


def _money(value, currency):
    if value is None:
        return "—"
    amount = f"{value:,.0f}"
    return f"{currency} {amount}".strip() if currency else amount


def _compact_money(value, currency):
    """Short amounts for tiles and bars: 5.13M, 230k."""
    if value is None:
        return "—"
    if abs(value) >= 1_000_000:
        amount = f"{value / 1_000_000:.2f}M"
    elif abs(value) >= 10_000:
        amount = f"{value / 1_000:.0f}k"
    else:
        amount = f"{value:,.0f}"
    return f"{currency} {amount}".strip() if currency else amount


def _pastel(hex_value, strength=0.35):
    """The band colour washed out towards white, so reference chips stay readable on the grid."""
    value = (hex_value or "").lstrip("#")
    if len(value) == 3:
        value = "".join(ch * 2 for ch in value)
    try:
        channels = [int(value[i : i + 2], 16) for i in (0, 2, 4)]
    except ValueError:
        return "#F1F5F9"
    return "#" + "".join(f"{round(255 - (255 - c) * strength):02X}" for c in channels)


def _ref(item):
    return item.ref_id or item.name


def _status_label(control):
    return control.get_status_display() if control.status else _("Undefined")


def _matrix_settings():
    general = GlobalSettings.objects.filter(name="general").first()
    values = general.value if general else {}
    return values.get("risk_matrix_swap_axes", False), values.get("risk_matrix_flip_vertical", False)


def _band_ranges(matrix):
    scores = {}
    for p, row in enumerate(matrix["grid"]):
        for i, level in enumerate(row):
            scores.setdefault(level, []).append((p + 1) * (i + 1))
    return {level: (min(values), max(values)) for level, values in scores.items()}


def _heatmap(matrix, kind, title, scenarios, swap_axes, flip_vertical):
    cells = {}
    for scenario in scenarios:
        if getattr(scenario, f"{kind}_level") is None or getattr(scenario, f"{kind}_level") < 0:
            continue
        key = (getattr(scenario, f"{kind}_proba"), getattr(scenario, f"{kind}_impact"))
        cells.setdefault(key, []).append(_ref(scenario))
    view = _matrix_view(matrix, cells, swap_axes, flip_vertical)
    for row in view["rows"]:
        row["label"] = row["title"]
        for cell in row["cells"]:
            cell["band_color"] = cell["color"]
            cell["color"] = _pastel(cell["color"])
            cell["text"] = HEATMAP_TEXT
    for column in view["columns"]:
        column["label"] = column["title"]
    return {"kind": kind, "title": _(title), **view}


def build_risk_posture_report(user, assessment_id: str | None = None) -> dict | None:
    choices = _assessment_choices(_accessible_ids(user, RiskAssessment))
    if assessment_id:
        if not any(choice["id"] == assessment_id for choice in choices):
            return None
    elif choices:
        assessment_id = choices[0]["id"]
    else:
        return {"assessments": [], "assessment": None}

    assessment = RiskAssessment.objects.select_related(
        "folder", "perimeter", "risk_matrix"
    ).get(id=assessment_id)
    matrix = assessment.risk_matrix.parse_json_translated()
    max_score = len(matrix["probability"]) * len(matrix["impact"])
    levels = matrix["risk"]

    control_prefetch = AppliedControl.objects.prefetch_related("owner")
    scenarios = list(
        RiskScenario.objects.filter(risk_assessment=assessment)
        .prefetch_related(
            "owner",
            Prefetch("existing_applied_controls", queryset=control_prefetch),
            Prefetch("applied_controls", queryset=control_prefetch),
        )
        .order_by("ref_id", "created_at")
    )

    # A control counts once however many scenarios it is linked to, existing or planned.
    linked = {}
    controls = {}
    currencies = Counter()
    for scenario in scenarios:
        own = {}
        for control in [*scenario.existing_applied_controls.all(), *scenario.applied_controls.all()]:
            own.setdefault(control.id, control)
        linked[scenario.id] = list(own.values())
        for control in own.values():
            entry = controls.setdefault(control.id, {"control": control, "scenarios": []})
            entry["scenarios"].append(scenario)
            if control.cost and control.cost.get("currency"):
                currencies[control.cost["currency"]] += 1
    currency = currencies.most_common(1)[0][0] if currencies else ""
    annual = {cid: float(entry["control"].annual_cost or 0) for cid, entry in controls.items()}

    risks = []
    for scenario in scenarios:
        current = _rated(matrix, scenario, "current")
        residual = _rated(matrix, scenario, "residual")
        allocated = sum(annual[c.id] / len(controls[c.id]["scenarios"]) for c in linked[scenario.id])
        points = (
            current["score"] - residual["score"]
            if current["score"] is not None and residual["score"] is not None
            else None
        )
        risks.append(
            {
                "id": str(scenario.id),
                "ref": _ref(scenario),
                "ref_id": scenario.ref_id or "",
                "name": scenario.name,
                "description": scenario.description or "",
                "href": f"/risk-scenarios/{scenario.id}",
                "owners": [str(o) for o in scenario.owner.all()],
                "treatment": scenario.treatment,
                "treatment_label": scenario.get_treatment_display(),
                "justification": scenario.justification or "",
                "current": current,
                "residual": residual,
                "control_count": len(linked[scenario.id]),
                "allocated": round(allocated),
                "allocated_label": _money(allocated, currency),
                "points": points,
                "scenario": scenario,
            }
        )

    def public(risk):
        return {k: v for k, v in risk.items() if k != "scenario"}

    top_risks = [
        public(r)
        for r in sorted(
            risks,
            key=lambda r: (
                r["residual"]["score"] is None,
                -(r["residual"]["score"] or 0),
                -(r["current"]["score"] or 0),
                r["ref"],
            ),
        )
    ]

    def average(kind):
        values = [r[kind]["score"] for r in risks if r[kind]["score"] is not None]
        return round(sum(values) / len(values), 1) if values else None

    residual_counts = Counter(r["residual"]["value"] for r in risks if r["residual"]["rated"])
    residual_bands = [
        {
            "name": level.get("name", ""),
            "color": level.get("hexcolor") or "#CBD5E1",
            "text": _rating(matrix, index, 0, 0)["text"],
            "count": residual_counts[index],
        }
        for index, level in enumerate(levels)
    ]
    top_band_indexes = list(range(len(levels)))[-2:]
    top_band_names = [levels[i].get("name", "") for i in reversed(top_band_indexes)]
    residual_high = sum(residual_counts[i] for i in top_band_indexes)

    rated_residual = [r for r in risks if r["residual"]["score"] is not None]
    highest_score = max((r["residual"]["score"] for r in rated_residual), default=None)
    highest = [r for r in rated_residual if r["residual"]["score"] == highest_score]

    control_items = []
    for cid, entry in controls.items():
        control = entry["control"]
        cost = annual[cid]
        control_items.append(
            {
                "id": str(control.id),
                "ref_id": control.ref_id or "",
                "name": control.name,
                "href": f"/applied-controls/{control.id}",
                "category": control.category or "",
                "category_label": control.get_category_display() if control.category else "—",
                "csf_function": control.csf_function or "",
                "csf_function_label": control.get_csf_function_display() if control.csf_function else "—",
                "status": control.status or "--",
                "status_label": _status_label(control),
                "annual_cost": round(cost) if cost else None,
                "annual_cost_label": _money(cost, currency) if cost else "—",
                "covers": [_ref(s) for s in entry["scenarios"]],
            }
        )
    control_items.sort(key=lambda c: (c["annual_cost"] is None, -(c["annual_cost"] or 0), c["name"].lower()))
    costed = [c for c in control_items if c["annual_cost"]]
    total_cost = sum(c["annual_cost"] for c in costed)

    measured = [r for r in risks if r["points"] is not None]
    spending = [r for r in measured if r["allocated"]]
    spent_points = sum(r["points"] for r in spending)
    average_per_point = round(sum(r["allocated"] for r in spending) / spent_points) if spent_points > 0 else None
    with_cost_per_point = []
    without_cost_per_point = []
    for risk in measured:
        row = {
            "ref": risk["ref"],
            "ref_id": risk["ref_id"],
            "name": risk["name"],
            "href": risk["href"],
            "allocated": risk["allocated"],
            "allocated_label": risk["allocated_label"],
            "current": risk["current"]["score"],
            "residual": risk["residual"]["score"],
            "points": risk["points"],
            "cost_per_point": None,
            "cost_per_point_label": "",
            "bar_pct": 0,
            "tag": None,
            "tag_label": "",
        }
        if risk["allocated"] and risk["points"] > 0:
            row["cost_per_point"] = round(risk["allocated"] / risk["points"])
            row["cost_per_point_label"] = _compact_money(row["cost_per_point"], currency)
            if average_per_point and row["cost_per_point"] >= 2 * average_per_point:
                row["tag"] = "twice_average"
            with_cost_per_point.append(row)
        else:
            row["tag"] = "no_reduction" if risk["points"] <= 0 else "no_costed_control"
            without_cost_per_point.append(row)
        if row["tag"]:
            row["tag_label"] = _(EFFECTIVENESS_TAGS[row["tag"]])
    with_cost_per_point.sort(key=lambda r: (-r["cost_per_point"], r["ref"]))
    without_cost_per_point.sort(key=lambda r: (-(r["current"] or 0), r["ref"]))
    top_cost_per_point = with_cost_per_point[0]["cost_per_point"] if with_cost_per_point else 0
    for row in with_cost_per_point:
        row["bar_pct"] = max(2, round(row["cost_per_point"] * 100 / top_cost_per_point))
    effectiveness = with_cost_per_point + without_cost_per_point

    mitigating = sorted(
        [r for r in risks if r["treatment"] == "mitigate"],
        key=lambda r: (-(r["current"]["score"] or 0), r["ref"]),
    )
    planned_rows = []
    planned_ids = set()
    unplanned = 0
    for risk in mitigating:
        planned = [c for c in linked[risk["scenario"].id] if c.status != "active"]
        if not planned:
            unplanned += 1
        for control in planned:
            planned_ids.add(control.id)
            cost = annual[control.id]
            planned_rows.append(
                {
                    "risk_ref": risk["ref"],
                    "risk_ref_id": risk["ref_id"],
                    "risk_name": risk["name"],
                    "risk_href": risk["href"],
                    "current": risk["current"],
                    "residual": risk["residual"],
                    "owners": risk["owners"],
                    "control_ref_id": control.ref_id or "",
                    "control_name": control.name,
                    "control_href": f"/applied-controls/{control.id}",
                    "status": control.status or "--",
                    "status_label": _status_label(control),
                    "annual_cost": round(cost) if cost else None,
                    "annual_cost_label": _money(cost, currency) if cost else "—",
                    "eta": control.eta.isoformat() if control.eta else None,
                }
            )
    planned_extra = sum(annual[cid] for cid in planned_ids)
    accepted = [
        {
            "ref": r["ref"],
            "ref_id": r["ref_id"],
            "name": r["name"],
            "href": r["href"],
            "residual": r["residual"],
            "owners": r["owners"],
            "justification": r["justification"],
        }
        for r in sorted(
            [r for r in risks if r["treatment"] == "accept"],
            key=lambda r: (-(r["residual"]["score"] or 0), r["ref"]),
        )
    ]

    treatment_counts = Counter(r["treatment"] for r in risks)
    treatment_labels = dict(RiskScenario.TREATMENT_OPTIONS)
    treatment_split = [
        {"key": key, "label": str(treatment_labels[key]), "count": treatment_counts[key]}
        for key in TREATMENT_ORDER
        if treatment_counts[key]
    ]

    ranges = _band_ranges(matrix)
    swap_axes, flip_vertical = _matrix_settings()

    return {
        "assessments": choices,
        "assessment": {
            "id": str(assessment.id),
            "name": assessment.name,
            "ref_id": assessment.ref_id or "",
            "version": assessment.version or "",
            "status": assessment.get_status_display() if assessment.status else "",
            "status_key": assessment.status or "",
            "folder": assessment.folder.name if assessment.folder else "",
            "perimeter": assessment.perimeter.name if assessment.perimeter else "",
            "risk_matrix": str(assessment.risk_matrix),
            "authors": [str(a) for a in assessment.authors.all()],
            "reviewers": [str(r) for r in assessment.reviewers.all()],
            "scenario_count": len(risks),
            "href": f"/risk-assessments/{assessment.id}",
        },
        "generated_on": date_format(timezone.localtime(), "j M Y, H:i"),
        "generated_at": timezone.localtime().isoformat(),
        "currency": currency,
        "max_score": max_score,
        "matrix_size": f"{len(matrix['probability'])}×{len(matrix['impact'])}",
        "summary": {
            "residual_bands": residual_bands,
            "top_band_names": top_band_names,
            "residual_high": residual_high,
            "avg_current": average("current"),
            "avg_residual": average("residual"),
            "highest_residual": (
                {
                    "score": highest_score,
                    "rating": highest[0]["residual"],
                    "risks": [{"ref": r["ref"], "ref_id": r["ref_id"], "name": r["name"]} for r in highest],
                }
                if highest
                else None
            ),
            "control_count": len(costed),
            "uncosted_count": len(control_items) - len(costed),
            "total_cost": total_cost,
            "total_cost_label": _money(total_cost, currency),
            "total_cost_compact": _compact_money(total_cost, currency),
            "treatment_split": treatment_split,
            "mitigate_count": treatment_counts["mitigate"],
            "accept_count": treatment_counts["accept"],
        },
        "scales": {
            "bands": [
                {
                    "name": level.get("name", ""),
                    "description": level.get("description") or "",
                    "color": level.get("hexcolor") or "#CBD5E1",
                    "text": _rating(matrix, index, 0, 0)["text"],
                    "range": "–".join(str(v) for v in dict.fromkeys(ranges[index])) if index in ranges else "—",
                }
                for index, level in reversed(list(enumerate(levels)))
            ],
            "probability": [
                {"value": i + 1, "name": p.get("name", ""), "description": p.get("description") or ""}
                for i, p in enumerate(matrix["probability"])
            ],
            "impact": [
                {"value": i + 1, "name": p.get("name", ""), "description": p.get("description") or ""}
                for i, p in enumerate(matrix["impact"])
            ],
        },
        "heatmaps": [
            _heatmap(matrix, kind, title, scenarios, swap_axes, flip_vertical) for kind, title in HEATMAP_TITLES
        ],
        "top_risks": top_risks,
        "controls": control_items,
        "effectiveness": effectiveness,
        "average_per_point": average_per_point,
        "average_per_point_label": _money(average_per_point, currency),
        "treatment": {
            "planned": planned_rows,
            "extra_cost": round(planned_extra),
            "extra_cost_label": _money(planned_extra, currency),
            "unplanned_count": unplanned,
            "accepted": accepted,
        },
    }


def _rating_text(value):
    return f"{value['score']} {value['name']} ({value['lxi']})" if value.get("rated") else "—"


def risk_posture_workbook(payload: dict) -> bytes:
    workbook = Workbook()
    sections = payload["sections"]
    summary = payload["summary"]
    assessment = payload["assessment"]
    sheet = workbook.active
    sheet.sheet_view.rightToLeft = get_language_bidi()
    sheet.title = _("Summary") if "summary" in sections else _("Assessment")
    for row in [
        [_("Risk assessment"), assessment["name"]],
        [_("Domain"), assessment["folder"]],
        [_("Perimeter"), assessment["perimeter"]],
        [_("Risk matrix"), assessment["risk_matrix"]],
        [_("Status"), assessment["status"]],
        [_("Scenarios"), assessment["scenario_count"]],
        [_("Generated on"), payload["generated_on"]],
    ]:
        sheet.append(row)
    if "summary" in sections:
        highest = summary["highest_residual"]
        for row in [
            [],
            [_("Residual risk by band"), ", ".join(f"{b['name']} {b['count']}" for b in summary["residual_bands"])],
            [_("Average score, current → residual"), f"{summary['avg_current'] or '—'} → {summary['avg_residual'] or '—'}"],
            [
                _("Highest residual risks"),
                f"{'; '.join(r['ref'] for r in highest['risks'])} — {highest['score']} {highest['rating']['name']}"
                if highest
                else "—",
            ],
            [_("Annual cost of controls"), summary["total_cost"]],
            [_("Treatment split"), ", ".join(f"{t['label']} {t['count']}" for t in summary["treatment_split"])],
        ]:
            sheet.append(row)

    def table(key, title, headers, rows):
        if key not in sections:
            return
        target = workbook.create_sheet(title)
        target.sheet_view.rightToLeft = get_language_bidi()
        target.append(headers)
        for row in rows:
            target.append(row)

    scales = payload["scales"]
    table(
        "scoring",
        _("Scoring method"),
        [_("Scale"), _("Value"), _("Name"), _("Score range"), _("Meaning")],
        [[_("Band"), "", b["name"], b["range"], b["description"]] for b in scales["bands"]]
        + [[_("Probability"), p["value"], p["name"], "", p["description"]] for p in scales["probability"]]
        + [[_("Impact"), p["value"], p["name"], "", p["description"]] for p in scales["impact"]],
    )
    table(
        "heatmaps",
        _("Heatmaps"),
        ["ID", _("Risk"), _("Current"), _("Residual")],
        [[r["ref_id"], r["name"], r["current"]["lxi"], r["residual"]["lxi"]] for r in payload["top_risks"]],
    )
    table(
        "top_risks",
        _("Top risks"),
        ["ID", _("Risk"), _("Current score"), _("Current level"), _("Residual score"), _("Residual level"),
         _("Treatment"), _("Owner"), _("Controls")],
        [[r["ref_id"], r["name"], r["current"]["score"], r["current"]["name"], r["residual"]["score"],
          r["residual"]["name"], r["treatment_label"], ", ".join(r["owners"]), r["control_count"]]
         for r in payload["top_risks"]],
    )
    table(
        "controls",
        _("Controls & costs"),
        ["ID", _("Control"), _("Category"), _("CSF function"), _("Status"), _("Annual cost"), _("Covers")],
        [[c["ref_id"], c["name"], c["category_label"], c["csf_function_label"], c["status_label"],
          c["annual_cost"] or "", ", ".join(c["covers"])] for c in payload["controls"]]
        + [["", _("Total"), "", "", "", summary["total_cost"], ""]],
    )
    table(
        "cost_effectiveness",
        _("Cost-effectiveness"),
        ["ID", _("Risk"), _("Allocated cost"), _("Current score"), _("Residual score"), _("Points reduced"),
         _("Cost per point"), _("Flag")],
        [[e["ref_id"], e["name"], e["allocated"], e["current"], e["residual"], e["points"],
          e["cost_per_point"] or "", e["tag_label"]] for e in payload["effectiveness"]],
    )
    treatment = payload["treatment"]
    table(
        "treatment",
        _("Treatment plan"),
        [_("Risk"), _("Current"), _("Planned control"), _("Status"), _("Annual cost"), _("ETA"),
         _("Target residual"), _("Owner")],
        [[f"{t['risk_ref_id']} {t['risk_name']}".strip(), _rating_text(t["current"]),
          f"{t['control_ref_id']} {t['control_name']}".strip(), t["status_label"], t["annual_cost"] or "",
          t["eta"] or "", _rating_text(t["residual"]), ", ".join(t["owners"])] for t in treatment["planned"]],
    )
    if "treatment" in sections and treatment["accepted"]:
        target = workbook.create_sheet(_("Accepted risks"))
        target.sheet_view.rightToLeft = get_language_bidi()
        target.append([_("Risk"), _("Residual"), _("Owner"), _("Justification")])
        for a in treatment["accepted"]:
            target.append([f"{a['ref_id']} {a['name']}".strip(), _rating_text(a["residual"]), ", ".join(a["owners"]),
                           a["justification"]])

    buffer = io.BytesIO()
    workbook.save(buffer)
    return buffer.getvalue()


def risk_posture_document(payload: dict) -> bytes:
    from core.report_docx import NAVY, ReportDocument, color

    assessment = payload["assessment"]
    summary = payload["summary"]
    sections = payload.get("sections") or SECTION_KEYS
    numbers = payload.get("section_numbers") or {}
    doc = ReportDocument(f"{assessment['name']} · {_('Risk posture report')}")
    arrow = "←" if get_language_bidi() else "→"

    def joined(values, separator=", "):
        return separator.join(str(v) for v in values) or "—"

    def band(value):
        return (_rating_text(value), color(value["color"])) if value.get("rated") else "—"

    doc.title(
        _("Risk posture report"),
        assessment["name"],
        f"{assessment['risk_matrix']} · {_('Generated on')} {payload['generated_on']}",
    )
    perimeter = assessment["folder"] + (f" — {assessment['perimeter']}" if assessment["perimeter"] else "")
    doc.key_values(
        [
            (_("Perimeter"), perimeter),
            (_("Risk matrix"), assessment["risk_matrix"]),
            (_("Status"), assessment["status"] or "—"),
            (_("Authors"), ", ".join(assessment["authors"])),
            (_("Scenarios"), str(assessment["scenario_count"])),
        ]
    )

    if "summary" in sections:
        doc.heading(
            numbers.get("summary"),
            _("Summary"),
            _("Computed from the assessment's scenarios: score (probability index + 1) × (impact index + 1); band read from the matrix grid."),
        )
        highest = summary["highest_residual"]
        highest_names = joined((f"{r['ref_id']} {r['name']}".strip() for r in highest["risks"]), "; ") if highest else ""
        uncosted = (
            f" · {summary['uncosted_count']} {_('without cost excluded')}" if summary["uncosted_count"] else ""
        )
        doc.key_values(
            [
                (_("Residual risk by band"), joined(f"{b['name']} {b['count']}" for b in summary["residual_bands"])),
                (
                    _("Average score, current → residual"),
                    f"{summary['avg_current'] or '—'} {arrow} {summary['avg_residual'] or '—'} / {payload['max_score']}",
                ),
                (
                    _("Highest residual risks"),
                    f"{highest_names} — {highest['score']} {highest['rating']['name']}"
                    if highest
                    else "—",
                ),
                (
                    _("Annual cost of controls"),
                    f"{summary['total_cost_label']} {_('across')} {summary['control_count']} {_('controls')}{uncosted}",
                ),
                (_("Treatment split"), joined(f"{t['label']} {t['count']}" for t in summary["treatment_split"])),
            ]
        )

    if "scoring" in sections:
        scales = payload["scales"]
        doc.heading(
            numbers.get("scoring"),
            _("Scoring method"),
            _("Rendered verbatim from the assessment's risk matrix")
            + f" ({assessment['risk_matrix']}, {payload['matrix_size']}). "
            + _("Score range per band = min–max of the scores of the grid cells mapped to it."),
        )
        doc.grid(
            [_("Band"), _("Score range"), _("Meaning")],
            [[(b["name"], color(b["color"])), b["range"], b["description"] or "—"] for b in scales["bands"]],
            [4.0, 3.0, 10.4],
        )
        for title, scale in ((_("Probability"), scales["probability"]), (_("Impact"), scales["impact"])):
            doc.subheading(title)
            doc.grid(
                ["#", _("Name"), _("Meaning")],
                [[p["value"], p["name"], p["description"] or "—"] for p in scale],
                [1.2, 5.0, 11.2],
            )

    if "heatmaps" in sections:
        doc.heading(
            numbers.get("heatmaps"),
            _("Heatmaps — current vs residual"),
            _("Grid size and cell colours come from the matrix; each scenario sits at (probability, impact) for its current and its residual rating. Unrated scenarios are left off."),
        )
        for heatmap in payload["heatmaps"]:
            doc.heatmap(heatmap["title"], heatmap)

    if "top_risks" in sections:
        doc.heading(
            numbers.get("top_risks"),
            _("Top risks"),
            _("One row per scenario, sorted by residual score, then current score."),
        )
        if payload["top_risks"]:
            doc.grid(
                ["ID", _("Risk"), _("Current"), _("Residual"), _("Treatment"), _("Owner"), _("Controls")],
                [
                    [r["ref_id"] or "—", r["name"], band(r["current"]), band(r["residual"]), r["treatment_label"],
                     joined(r["owners"]), r["control_count"]]
                    for r in payload["top_risks"]
                ],
                [1.6, 4.6, 2.6, 2.6, 2.0, 2.6, 1.4],
            )
        else:
            doc.paragraph(_("No risk scenarios yet."))

    if "controls" in sections:
        doc.heading(
            numbers.get("controls"),
            _("Controls & costs"),
            _("Union of the controls linked to the scenarios, each listed once. Status stands in for tested effectiveness, which has no field."),
        )
        if payload["controls"]:
            rows = [
                [c["name"], c["category_label"], c["csf_function_label"], c["status_label"], c["annual_cost_label"],
                 joined(c["covers"])]
                for c in payload["controls"]
            ]
            rows.append([(_("Total"), NAVY), "", "", "", (summary["total_cost_label"], NAVY), ""])
            doc.grid(
                [_("Control"), _("Category"), _("CSF function"), _("Status"), _("Annual cost"), _("Covers")],
                rows,
                [5.2, 2.2, 2.2, 2.2, 2.6, 3.0],
            )
        else:
            doc.paragraph(_("No applied controls are linked to the scenarios."))

    if "cost_effectiveness" in sections:
        note = _("alloc(s) = Σ cost(c) ÷ scenarios(c) · points(s) = current − residual · cost per point = alloc ÷ points.")
        if payload["average_per_point"]:
            note += f" {_('Average')}: {payload['average_per_point_label']} {_('per point')}."
        doc.heading(numbers.get("cost_effectiveness"), _("Cost-effectiveness"), note)
        doc.paragraph(
            _("Estimate: the model has no cost-share weights on the control ↔ scenario link, so each control's cost is split equally across the scenarios it covers."),
            color=color("92400E"),
            size=8,
        )
        if payload["effectiveness"]:
            doc.grid(
                ["ID", _("Risk"), _("Allocated cost"), _("Points reduced"), _("Cost per point")],
                [
                    [
                        e["ref_id"] or "—",
                        e["name"],
                        e["allocated_label"],
                        f"{e['current']} {arrow} {e['residual']} = {e['points']}",
                        (f"{e['cost_per_point_label']} {e['tag_label']}".strip(), color("B91C1C"))
                        if e["tag"] == "twice_average"
                        else (e["cost_per_point_label"] or e["tag_label"]),
                    ]
                    for e in payload["effectiveness"]
                ],
                [1.6, 6.2, 3.2, 2.8, 3.6],
            )
        else:
            doc.paragraph(_("No rated scenarios to compare."))

    if "treatment" in sections:
        treatment = payload["treatment"]
        note = _("Scenarios with treatment = mitigate and their non-active linked controls (cost, ETA); target = the scenario's residual rating. Accepted scenarios show their justification verbatim.")
        if treatment["unplanned_count"]:
            note += f" {treatment['unplanned_count']} {_('mitigate scenarios have no planned control left.')}"
        doc.heading(numbers.get("treatment"), _("Treatment plan"), note)
        doc.subheading(f"{_('Mitigate — planned controls')} · {_('extra annual cost')} {treatment['extra_cost_label']}")
        if treatment["planned"]:
            doc.grid(
                [_("Risk"), _("Current"), _("Planned control"), _("Status"), _("Annual cost"), _("ETA"),
                 _("Target residual"), _("Owner")],
                [
                    [f"{t['risk_ref_id']} {t['risk_name']}".strip(), band(t["current"]), t["control_name"],
                     t["status_label"], t["annual_cost_label"], t["eta"] or "—", band(t["residual"]),
                     joined(t["owners"])]
                    for t in treatment["planned"]
                ],
                [3.2, 2.0, 3.0, 1.6, 2.0, 1.8, 2.0, 1.8],
            )
        else:
            doc.paragraph(_("No planned controls on mitigate scenarios."))
        doc.subheading(_("Accepted risks"))
        if treatment["accepted"]:
            doc.grid(
                [_("Risk"), _("Residual"), _("Owner"), _("Justification (as written)")],
                [
                    [f"{a['ref_id']} {a['name']}".strip(), band(a["residual"]), joined(a["owners"]),
                     a["justification"] or "—"]
                    for a in treatment["accepted"]
                ],
                [4.2, 2.6, 2.4, 8.2],
            )
        else:
            doc.paragraph(_("No accepted scenarios."))

    return doc.to_bytes()


def _payload_or_404(request):
    payload = build_risk_posture_report(request.user, request.query_params.get("assessment"))
    if payload is None:
        return None, Response(
            {"error": "Risk assessment not found or not visible."},
            status=status.HTTP_404_NOT_FOUND,
        )
    sections = _selected_sections(request.query_params.get("sections"))
    payload["sections"] = sections
    payload["section_numbers"] = {key: index for index, key in enumerate(sections, start=1)}
    return payload, None


class RiskPostureReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.query_params.get("choices") == "1":
            choices = _assessment_choices(_accessible_ids(request.user, RiskAssessment))
            return Response({"assessments": choices})
        payload, error = _payload_or_404(request)
        return error or Response(payload)


class RiskPostureReportXlsxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        with report_language(request):
            payload, error = _payload_or_404(request)
            if error or payload["assessment"] is None:
                return error or Response(status=status.HTTP_404_NOT_FOUND)
            workbook = risk_posture_workbook(payload)
        response = HttpResponse(
            workbook,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = 'attachment; filename="risk-posture-report.xlsx"'
        return response


class RiskPostureReportDocxView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        with report_language(request):
            payload, error = _payload_or_404(request)
            if error or payload["assessment"] is None:
                return error or Response(status=status.HTTP_404_NOT_FOUND)
            document = risk_posture_document(payload)
        response = HttpResponse(
            document,
            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
        response["Content-Disposition"] = 'attachment; filename="risk-posture-report.docx"'
        return response


class RiskPostureReportPdfView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from core.views import _render_weasyprint_pdf

        with report_language(request):
            payload, error = _payload_or_404(request)
            if error or payload["assessment"] is None:
                return error or Response(status=status.HTTP_404_NOT_FOUND)
            try:
                pdf = _render_weasyprint_pdf(render_to_string("core/risk_posture_report_pdf.html", payload))
            except RuntimeError as exc:
                return Response({"error": str(exc)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        response = HttpResponse(pdf, content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="risk-posture-report.pdf"'
        return response
