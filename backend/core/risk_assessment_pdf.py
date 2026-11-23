from collections import Counter

from django.db.models import Prefetch
from django.utils import timezone
from django.utils.translation import gettext as _

from core.models import AppliedControl, RiskAssessment, RiskScenario

NOT_RATED_COLOR = "#CBD5E1"
DONE_CONTROL_STATUSES = {"active", "deprecated"}
CONTROL_STATUS_ORDER = ["to_do", "in_progress", "on_hold", "--", "active", "deprecated"]
CONTROL_STATUS_COLORS = {
    "to_do": "#64748B",
    "in_progress": "#F59E0B",
    "on_hold": "#DC2626",
    "--": "#CBD5E1",
    "active": "#16A34A",
    "deprecated": "#94A3B8",
}
TREATMENT_COLORS = {
    "open": "#DC2626",
    "mitigate": "#316FD3",
    "accept": "#F59E0B",
    "avoid": "#16A34A",
    "transfer": "#7C3AED",
}


def _percent(part, whole):
    return round(part * 100 / whole, 1) if whole else 0


def _text_on(hexcolor):
    """Readable text color for labels drawn on a matrix-defined background."""
    value = (hexcolor or "").lstrip("#")
    if len(value) == 3:
        value = "".join(ch * 2 for ch in value)
    try:
        r, g, b = (int(value[i : i + 2], 16) for i in (0, 2, 4))
    except ValueError:
        return "#1E293B"
    return "#1E293B" if (0.299 * r + 0.587 * g + 0.114 * b) > 140 else "#FFFFFF"


def _level_style(risk):
    color = risk.get("hexcolor") or NOT_RATED_COLOR
    return {"color": color, "text": _text_on(color)}


def _rating(matrix, level, proba, impact):
    if level is None or level < 0:
        return {
            "rated": False,
            "value": -1,
            "name": "--",
            "abbr": "--",
            "color": NOT_RATED_COLOR,
            "text": _text_on(NOT_RATED_COLOR),
            "proba": "--",
            "impact": "--",
        }
    risk = matrix["risk"][level]
    return {
        "rated": True,
        "value": level,
        "name": risk.get("name", ""),
        "abbr": risk.get("abbreviation") or risk.get("name", ""),
        **_level_style(risk),
        "proba": matrix["probability"][proba].get("name", "") if proba >= 0 else "--",
        "impact": matrix["impact"][impact].get("name", "") if impact >= 0 else "--",
    }


def _status_label(status):
    try:
        return str(AppliedControl.Status(status).label)
    except ValueError:
        return status or str(AppliedControl.Status.UNDEFINED.label)


def _control_item(control, today, scenario_refs):
    status = control.status or "--"
    return {
        "ref_id": control.ref_id or "",
        "name": control.name,
        "description": control.description or "",
        "status": status,
        "status_label": _status_label(status),
        "status_color": CONTROL_STATUS_COLORS.get(status, "#64748B"),
        "priority": control.priority,
        "category": control.get_category_display() if control.category else "",
        "csf_function": control.get_csf_function_display() if control.csf_function else "",
        "eta": control.eta,
        "expiry_date": control.expiry_date,
        "overdue": bool(control.eta and control.eta < today and status not in DONE_CONTROL_STATUSES),
        "effort": control.get_effort_display() if control.effort else "",
        "owners": [str(o) for o in control.owner.all()],
        "scenarios": scenario_refs,
    }


def _matrix_view(matrix, cells, swap_axes, flip_vertical):
    """Lay out a risk grid with the same axis settings as the app."""
    grid = matrix["grid"]
    probabilities = matrix["probability"]
    impacts = matrix["impact"]
    if swap_axes:
        row_axis, col_axis = impacts, probabilities
        cell_at = lambda r, c: (c, r)
    else:
        row_axis, col_axis = probabilities, impacts
        cell_at = lambda r, c: (r, c)
    row_order = range(len(row_axis)) if flip_vertical else reversed(range(len(row_axis)))
    rows = []
    for r in row_order:
        row_cells = []
        for c in range(len(col_axis)):
            p, i = cell_at(r, c)
            level = grid[p][i]
            row_cells.append(
                {
                    **_level_style(matrix["risk"][level]),
                    "refs": sorted(cells.get((p, i), [])),
                }
            )
        rows.append({"label": row_axis[r].get("abbreviation") or row_axis[r].get("name"), "title": row_axis[r].get("name"), "cells": row_cells})
    return {
        "row_axis": _("Impact") if swap_axes else _("Probability"),
        "col_axis": _("Probability") if swap_axes else _("Impact"),
        "rows": rows,
        "columns": [
            {"label": a.get("abbreviation") or a.get("name"), "title": a.get("name")}
            for a in col_axis
        ],
    }


def _risk_controls(risk_assessment, scenarios, today):
    scenario_ids = [s.id for s in scenarios]
    controls = (
        AppliedControl.objects.filter(risk_scenarios__in=scenario_ids)
        .distinct()
        .prefetch_related(
            "owner",
            Prefetch(
                "risk_scenarios",
                queryset=RiskScenario.objects.filter(risk_assessment=risk_assessment).only("id", "ref_id", "name"),
            ),
        )
    )
    items = [
        _control_item(c, today, [s.ref_id or s.name for s in c.risk_scenarios.all()])
        for c in controls
    ]
    status_rank = {s: i for i, s in enumerate(CONTROL_STATUS_ORDER)}
    items.sort(key=lambda c: (status_rank.get(c["status"], 99), c["eta"] is None, c["eta"] or today, c["name"].lower()))
    counts = Counter(c["status"] for c in items)
    by_status = [
        {
            "key": s,
            "label": _status_label(s),
            "color": CONTROL_STATUS_COLORS[s],
            "count": counts.get(s, 0),
            "pct": _percent(counts.get(s, 0), len(items)),
        }
        for s in CONTROL_STATUS_ORDER
    ]
    groups = [
        {**status, "items": [c for c in items if c["status"] == status["key"]]}
        for status in by_status
        if status["count"]
    ]
    return {
        "items": items,
        "by_status": by_status,
        "groups": groups,
        "done": sum(1 for c in items if c["status"] in DONE_CONTROL_STATUSES),
        "overdue": sum(1 for c in items if c["overdue"]),
    }


def _assessment_meta(risk_assessment: RiskAssessment):
    return {
        "name": risk_assessment.name,
        "ref_id": risk_assessment.ref_id or "",
        "version": risk_assessment.version or "",
        "status": risk_assessment.get_status_display() if risk_assessment.status else "",
        "description": risk_assessment.description or "",
        "folder": str(risk_assessment.folder) if risk_assessment.folder else "",
        "perimeter": risk_assessment.perimeter.name if risk_assessment.perimeter else "",
        "risk_matrix": str(risk_assessment.risk_matrix),
        "eta": risk_assessment.eta,
        "due_date": risk_assessment.due_date,
        "authors": [str(a) for a in risk_assessment.authors.all()],
        "reviewers": [str(r) for r in risk_assessment.reviewers.all()],
    }


def risk_assessment_pdf_context(risk_assessment: RiskAssessment, *, include_inherent=False, swap_axes=False, flip_vertical=False):
    today = timezone.localdate()
    matrix = risk_assessment.risk_matrix.parse_json_translated()
    tolerance = risk_assessment.risk_tolerance
    has_tolerance = tolerance is not None and tolerance >= 0

    scenarios = list(
        RiskScenario.objects.filter(risk_assessment=risk_assessment)
        .prefetch_related("threats", "assets", "existing_applied_controls", "applied_controls", "owner")
        .order_by("ref_id", "created_at")
    )

    sok_options = RiskScenario.DEFAULT_SOK_OPTIONS
    kinds = ["inherent", "current", "residual"] if include_inherent else ["current", "residual"]
    cells = {kind: {} for kind in kinds}
    items = []
    for s in scenarios:
        ratings = {
            "inherent": _rating(matrix, s.inherent_level, s.inherent_proba, s.inherent_impact),
            "current": _rating(matrix, s.current_level, s.current_proba, s.current_impact),
            "residual": _rating(matrix, s.residual_level, s.residual_proba, s.residual_impact),
        }
        ref = s.ref_id or s.name
        for kind in kinds:
            proba, impact = getattr(s, f"{kind}_proba"), getattr(s, f"{kind}_impact")
            if ratings[kind]["rated"]:
                cells[kind].setdefault((proba, impact), []).append(ref)
        sok = sok_options.get(s.strength_of_knowledge, sok_options[-1])
        items.append(
            {
                "ref_id": s.ref_id or "",
                "name": s.name,
                "description": s.description or "",
                "threats": [t.get_name_translated for t in s.threats.all()],
                "assets": [str(a) for a in s.assets.all()],
                "existing_controls": [c.name for c in s.existing_applied_controls.all()],
                "existing_text": s.existing_controls or "",
                "controls": [
                    {"name": c.name, "status": c.status or "--", "color": CONTROL_STATUS_COLORS.get(c.status or "--", "#64748B")}
                    for c in s.applied_controls.all()
                ],
                "treatment": s.treatment,
                "treatment_label": s.get_treatment_display(),
                "treatment_color": TREATMENT_COLORS.get(s.treatment, "#64748B"),
                "sok": str(sok["name"]),
                "sok_symbol": sok.get("symbol", ""),
                "owners": [str(o) for o in s.owner.all()],
                "current_above": has_tolerance and s.current_level > tolerance,
                "residual_above": has_tolerance and s.residual_level > tolerance,
                **ratings,
            }
        )

    total = len(items)
    distribution = []
    for kind, label in (("inherent", _("Inherent")), ("current", _("Current")), ("residual", _("Residual"))):
        if kind not in kinds:
            continue
        counts = Counter(i[kind]["value"] for i in items)
        levels = [
            {
                "name": r.get("name", ""),
                "abbr": r.get("abbreviation") or r.get("name", ""),
                "color": r.get("hexcolor") or NOT_RATED_COLOR,
                "count": counts.get(idx, 0),
                "pct": _percent(counts.get(idx, 0), total),
            }
            for idx, r in enumerate(matrix["risk"])
        ]
        levels.append(
            {
                "name": _("Not rated"),
                "abbr": "--",
                "color": NOT_RATED_COLOR,
                "count": counts.get(-1, 0),
                "pct": _percent(counts.get(-1, 0), total),
            }
        )
        distribution.append({"kind": kind, "label": label, "levels": levels})

    treatment_counts = Counter(i["treatment"] for i in items)
    treatments = [
        {
            "key": key,
            "label": str(label),
            "color": TREATMENT_COLORS.get(key, "#64748B"),
            "count": treatment_counts.get(key, 0),
            "pct": _percent(treatment_counts.get(key, 0), total),
        }
        for key, label in RiskScenario.TREATMENT_OPTIONS
    ]

    controls = _risk_controls(risk_assessment, scenarios, today)

    current_above = sum(1 for i in items if i["current_above"])
    residual_above = sum(1 for i in items if i["residual_above"])
    attention = []
    if not total:
        attention.append(_("This assessment has no risk scenarios yet."))
    if not has_tolerance:
        attention.append(_("No risk tolerance is set, so scenarios cannot be compared against it."))
    unrated = sum(1 for i in items if not i["current"]["rated"])
    if unrated:
        attention.append(_("%(n)s of %(t)s scenarios have no current risk rating.") % {"n": unrated, "t": total})
    no_residual = sum(1 for i in items if i["current"]["rated"] and not i["residual"]["rated"])
    if no_residual:
        attention.append(_("%(n)s scenarios have no residual risk rating.") % {"n": no_residual})
    open_above = sum(1 for i in items if i["current_above"] and i["treatment"] == "open")
    if open_above:
        attention.append(_("%(n)s scenarios are above risk tolerance and still untreated.") % {"n": open_above})
    still_above = sum(1 for i in items if i["residual_above"] and i["treatment"] != "accept")
    if still_above:
        attention.append(_("%(n)s scenarios remain above tolerance after planned treatment.") % {"n": still_above})
    mitigate_no_controls = sum(1 for i in items if i["treatment"] == "mitigate" and not i["controls"])
    if mitigate_no_controls:
        attention.append(_("%(n)s scenarios marked 'Mitigate' have no treatment controls.") % {"n": mitigate_no_controls})
    if controls["overdue"]:
        attention.append(_("%(n)s treatment controls are past their target date.") % {"n": controls["overdue"]})
    no_owner = sum(1 for i in items if not i["owners"])
    if total and no_owner:
        attention.append(_("%(n)s scenarios have no owner.") % {"n": no_owner})

    matrix_titles = {"inherent": _("Inherent risk"), "current": _("Current risk"), "residual": _("Residual risk")}
    matrices = [
        {"kind": kind, "title": matrix_titles[kind], **_matrix_view(matrix, cells[kind], swap_axes, flip_vertical)}
        for kind in kinds
    ]

    return {
        "assessment": _assessment_meta(risk_assessment),
        "generated_on": timezone.localtime().strftime("%Y-%m-%d %H:%M"),
        "include_inherent": include_inherent,
        "tolerance": (
            {"name": matrix["risk"][tolerance].get("name", ""), **_level_style(matrix["risk"][tolerance])}
            if has_tolerance and tolerance < len(matrix["risk"])
            else None
        ),
        "scenarios": items,
        "summary": {
            "total": total,
            "current_above": current_above,
            "residual_above": residual_above,
            "has_tolerance": has_tolerance,
            "open": treatment_counts.get("open", 0),
            "rated": total - unrated,
        },
        "distribution": distribution,
        "treatments": treatments,
        "controls": controls,
        "attention": attention,
        "matrices": matrices,
        "risk_levels": [
            {
                "name": r.get("name", ""),
                "abbr": r.get("abbreviation") or "",
                "description": r.get("description") or "",
                **_level_style(r),
            }
            for r in matrix["risk"]
        ],
    }


def risk_action_plan_pdf_context(risk_assessment: RiskAssessment):
    today = timezone.localdate()
    scenarios = list(RiskScenario.objects.filter(risk_assessment=risk_assessment).only("id"))
    return {
        "assessment": _assessment_meta(risk_assessment),
        "generated_on": timezone.localtime().strftime("%Y-%m-%d %H:%M"),
        "scenario_count": len(scenarios),
        "controls": _risk_controls(risk_assessment, scenarios, today),
    }
