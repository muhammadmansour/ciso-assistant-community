import io
from collections import Counter

from django.db.models import Count, Prefetch
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from openpyxl import Workbook
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import AppliedControl, RiskAssessment, RiskScenario
from core.nca_ecc_report_views import _accessible_ids
from core.risk_assessment_pdf import _matrix_view, _rating
from global_settings.models import GlobalSettings

SECTION_KEYS = [
    "summary",
    "scoring",
    "areas",
    "top_risks",
    "heatmaps",
    "controls",
    "cost_allocation",
    "cost_effectiveness",
    "treatment",
]
TOP_RISK_COUNT = 10
UNCLASSIFIED_AREA = "Unclassified"
NO_OBJECTIVE = "No objective"
EFFECTIVENESS_FLAGS = {
    "no_reduction": "No score reduction from current controls",
    "twice_average": "At least twice the average cost per point",
    "above_tolerance": "Still above risk tolerance",
}


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


def _ref(item):
    return item.ref_id or item.name


def _control_category(control):
    parts = [
        control.get_category_display() if control.category else "",
        control.get_csf_function_display() if control.csf_function else "",
    ]
    return " · ".join(p for p in parts if p) or "—"


def _status_label(control):
    return control.get_status_display() if control.status else "Undefined"


def _matrix_settings():
    general = GlobalSettings.objects.filter(name="general").first()
    values = general.value if general else {}
    return values.get("risk_matrix_swap_axes", False), values.get("risk_matrix_flip_vertical", False)


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
    tolerance = assessment.risk_tolerance
    has_tolerance = tolerance is not None and 0 <= tolerance < len(matrix["risk"])
    max_score = len(matrix["probability"]) * len(matrix["impact"])

    control_prefetch = AppliedControl.objects.prefetch_related("owner", "objectives")
    scenarios = list(
        RiskScenario.objects.filter(risk_assessment=assessment)
        .prefetch_related(
            "owner",
            "qualifications",
            Prefetch("existing_applied_controls", queryset=control_prefetch),
            Prefetch("applied_controls", queryset=control_prefetch),
        )
        .order_by("ref_id", "created_at")
    )

    risks = []
    for scenario in scenarios:
        current = _rated(matrix, scenario, "current")
        areas = [q.get_name_translated for q in scenario.qualifications.all()]
        risks.append(
            {
                "scenario": scenario,
                "id": str(scenario.id),
                "ref": _ref(scenario),
                "ref_id": scenario.ref_id or "",
                "name": scenario.name,
                "description": scenario.description or "",
                "href": f"/risk-scenarios/{scenario.id}",
                "area": areas[0] if areas else UNCLASSIFIED_AREA,
                "areas": areas,
                "owners": [str(o) for o in scenario.owner.all()],
                "treatment": scenario.treatment,
                "treatment_label": scenario.get_treatment_display(),
                "inherent": _rated(matrix, scenario, "inherent"),
                "current": current,
                "residual": _rated(matrix, scenario, "residual"),
                "above": has_tolerance and current["rated"] and current["value"] > tolerance,
                "residual_above": has_tolerance
                and scenario.residual_level >= 0
                and scenario.residual_level > tolerance,
            }
        )

    ranked = sorted(
        [r for r in risks if r["current"]["rated"]],
        key=lambda r: (
            -r["current"]["value"],
            -(r["current"]["score"] or 0),
            -(r["inherent"]["score"] or 0),
            r["ref"],
        ),
    )
    top = ranked[:TOP_RISK_COUNT]

    currencies = Counter()
    controls = {}
    for risk in top:
        for control in risk["scenario"].existing_applied_controls.all():
            entry = controls.setdefault(
                control.id, {"control": control, "risks": []}
            )
            entry["risks"].append(risk)
            if control.cost and control.cost.get("currency"):
                currencies[control.cost["currency"]] += 1
        for control in risk["scenario"].applied_controls.all():
            if control.cost and control.cost.get("currency"):
                currencies[control.cost["currency"]] += 1
    currency = currencies.most_common(1)[0][0] if currencies else ""

    objective_names = {}
    risk_cost = {r["id"]: 0.0 for r in top}
    risk_parts = {r["id"]: [] for r in top}
    risk_objective_cost = {r["id"]: Counter() for r in top}
    control_items = []
    for entry in controls.values():
        control = entry["control"]
        annual = float(control.annual_cost or 0)
        share = 1 / len(entry["risks"])
        objectives = list(control.objectives.all())
        for objective in objectives:
            objective_names[str(objective.id)] = (
                f"{objective.ref_id} {objective.name}".strip() if objective.ref_id else objective.name
            )
        for risk in entry["risks"]:
            amount = annual * share
            risk_cost[risk["id"]] += amount
            if amount:
                risk_parts[risk["id"]].append(
                    {"ref": _ref(control), "amount": round(amount), "label": _money(amount, currency)}
                )
            keys = [str(o.id) for o in objectives] or [NO_OBJECTIVE]
            for key in keys:
                risk_objective_cost[risk["id"]][key] += amount / len(keys)
        control_items.append(
            {
                "id": str(control.id),
                "ref": _ref(control),
                "ref_id": control.ref_id or "",
                "name": control.name,
                "href": f"/applied-controls/{control.id}",
                "type": _control_category(control),
                "category": control.category or "",
                "csf_function": control.csf_function or "",
                "status": control.status or "--",
                "status_label": _status_label(control),
                "effort": control.get_effort_display() if control.effort else "",
                "owners": [str(o) for o in control.owner.all()],
                "objectives": [objective_names[str(o.id)] for o in objectives],
                "annual_cost": round(annual),
                "annual_cost_label": _money(annual, currency),
                "risks": [
                    {"ref": r["ref"], "pct": round(share * 100)} for r in entry["risks"]
                ],
            }
        )
    control_items.sort(key=lambda c: (-c["annual_cost"], c["ref"].lower()))
    total_control_cost = sum(c["annual_cost"] for c in control_items)

    objective_keys = sorted(objective_names, key=lambda k: objective_names[k].lower())
    if any(risk_objective_cost[r["id"]].get(NO_OBJECTIVE) for r in top):
        objective_keys.append(NO_OBJECTIVE)
        objective_names[NO_OBJECTIVE] = NO_OBJECTIVE

    top_items = []
    for rank, risk in enumerate(top, start=1):
        cost = risk_cost[risk["id"]]
        reduction = None
        if risk["inherent"]["score"] is not None and risk["current"]["score"] is not None:
            reduction = risk["inherent"]["score"] - risk["current"]["score"]
        planned = list(risk["scenario"].applied_controls.all())
        top_items.append(
            {
                **{k: v for k, v in risk.items() if k != "scenario"},
                "rank": rank,
                "control_cost": round(cost),
                "control_cost_label": _money(cost, currency),
                "cost_parts": risk_parts[risk["id"]],
                "reduction": reduction,
                "cost_per_point": round(cost / reduction) if cost and reduction and reduction > 0 else None,
                "objective_costs": [
                    {
                        "key": key,
                        "amount": round(risk_objective_cost[risk["id"]].get(key, 0)),
                        "label": _money(risk_objective_cost[risk["id"]][key], currency)
                        if risk_objective_cost[risk["id"]].get(key)
                        else "",
                    }
                    for key in objective_keys
                ],
                "objectives": [
                    objective_names[k] for k in objective_keys if risk_objective_cost[risk["id"]].get(k) and k != NO_OBJECTIVE
                ],
                "planned_controls": [
                    {
                        "ref": _ref(c),
                        "ref_id": c.ref_id or "",
                        "name": c.name,
                        "href": f"/applied-controls/{c.id}",
                        "status": c.status or "--",
                        "status_label": _status_label(c),
                        "eta": c.eta.isoformat() if c.eta else None,
                        "annual_cost": round(float(c.annual_cost or 0)),
                    }
                    for c in planned
                ],
            }
        )

    objective_totals = [
        {
            "key": key,
            "name": objective_names[key],
            "amount": round(sum(risk_objective_cost[r["id"]].get(key, 0) for r in top)),
        }
        for key in objective_keys
    ]
    for item in objective_totals:
        item["label"] = _money(item["amount"], currency)
        item["pct"] = round(item["amount"] * 100 / total_control_cost) if total_control_cost else 0
        item["above_count"] = sum(
            1
            for r in top_items
            if r["above"] and any(o["key"] == item["key"] and o["amount"] for o in r["objective_costs"])
        )

    areas = {}
    for risk in top_items:
        area = areas.setdefault(
            risk["area"],
            {"name": risk["area"], "risks": [], "above": [], "inherent_sum": 0, "current_sum": 0, "cost": 0, "top": None},
        )
        area["risks"].append(risk["ref"])
        if risk["above"]:
            area["above"].append(risk["ref"])
        area["inherent_sum"] += risk["inherent"]["score"] or 0
        area["current_sum"] += risk["current"]["score"] or 0
        area["cost"] += risk["control_cost"]
        best = area["top"]
        if best is None or (risk["current"]["value"], risk["current"]["score"] or 0) > (
            best["value"],
            best["score"] or 0,
        ):
            area["top"] = risk["current"]
    area_items = sorted(
        areas.values(),
        key=lambda a: (-a["top"]["value"], -(a["top"]["score"] or 0), -len(a["above"]), a["name"]),
    )
    for rank, area in enumerate(area_items, start=1):
        area["rank"] = rank
        area["cost_label"] = _money(area["cost"], currency)
        area["cost_pct"] = round(area["cost"] * 100 / total_control_cost) if total_control_cost else 0

    reductions = [r for r in top_items if r["reduction"] and r["reduction"] > 0 and r["control_cost"]]
    total_reduction = sum(r["reduction"] for r in reductions)
    average_per_point = round(sum(r["control_cost"] for r in reductions) / total_reduction) if total_reduction else None
    effectiveness = []
    for risk in sorted(
        [r for r in top_items if r["control_cost"]],
        key=lambda r: (r["cost_per_point"] is not None, -(r["cost_per_point"] or 0)),
    ):
        flag_keys = []
        if not risk["reduction"] or risk["reduction"] <= 0:
            flag_keys.append("no_reduction")
        elif average_per_point and risk["cost_per_point"] >= 2 * average_per_point:
            flag_keys.append("twice_average")
        if risk["above"]:
            flag_keys.append("above_tolerance")
        flags = [EFFECTIVENESS_FLAGS[key] for key in flag_keys]
        effectiveness.append(
            {
                "ref": risk["ref"],
                "ref_id": risk["ref_id"],
                "name": risk["name"],
                "href": risk["href"],
                "cost": risk["control_cost"],
                "cost_label": risk["control_cost_label"],
                "inherent": risk["inherent"]["score"],
                "current": risk["current"]["score"],
                "reduction": risk["reduction"],
                "cost_per_point": risk["cost_per_point"],
                "cost_per_point_label": _money(risk["cost_per_point"], currency),
                "flags": flags,
                "flag_keys": flag_keys,
            }
        )

    if has_tolerance:
        treatment_risks = [r for r in top_items if r["above"]]
    else:
        treatment_risks = [r for r in top_items if r["planned_controls"] and r["treatment"] != "accept"]
    treatment = []
    for risk in treatment_risks:
        extra = sum(c["annual_cost"] for c in risk["planned_controls"])
        etas = [c["eta"] for c in risk["planned_controls"] if c["eta"]]
        treatment.append(
            {
                "ref": risk["ref"],
                "ref_id": risk["ref_id"],
                "name": risk["name"],
                "href": risk["href"],
                "current": risk["current"],
                "residual": risk["residual"],
                "treatment": risk["treatment"],
                "treatment_label": risk["treatment_label"],
                "controls": risk["planned_controls"],
                "extra_cost": extra,
                "extra_cost_label": _money(extra, currency),
                "owners": risk["owners"],
                "target_date": max(etas) if etas else None,
                "residual_above": risk["residual_above"],
            }
        )
    total_extra = sum(t["extra_cost"] for t in treatment)

    swap_axes, flip_vertical = _matrix_settings()
    heatmaps = []
    for kind, title in (("inherent", "Inherent risk"), ("current", "Current risk"), ("residual", "Residual risk")):
        cells = {}
        for risk in top_items:
            if risk[kind]["rated"]:
                scenario = next(s for s in scenarios if str(s.id) == risk["id"])
                key = (getattr(scenario, f"{kind}_proba"), getattr(scenario, f"{kind}_impact"))
                cells.setdefault(key, []).append(risk["ref"])
        heatmaps.append({"kind": kind, "title": title, **_matrix_view(matrix, cells, swap_axes, flip_vertical)})

    def _avg(kind):
        values = [r[kind]["score"] for r in top_items if r[kind]["score"] is not None]
        return round(sum(values) / len(values), 1) if values else None

    level_counts = Counter(r["current"]["value"] for r in top_items)
    band_mix = [
        {"name": matrix["risk"][level].get("name", ""), "count": level_counts[level]}
        for level in sorted(level_counts, reverse=True)
    ]
    highest = top_items[0]["current"] if top_items else None
    highest_refs = [
        r["ref"]
        for r in top_items
        if highest and r["current"]["value"] == highest["value"] and r["current"]["score"] == highest["score"]
    ]
    least_effective = next((e for e in effectiveness if e["cost_per_point"] is not None), None)
    top_objective = max(objective_totals, key=lambda o: o["amount"], default=None)

    return {
        "assessments": choices,
        "assessment": {
            "id": str(assessment.id),
            "name": assessment.name,
            "ref_id": assessment.ref_id or "",
            "version": assessment.version or "",
            "status": assessment.get_status_display() if assessment.status else "",
            "folder": assessment.folder.name if assessment.folder else "",
            "perimeter": assessment.perimeter.name if assessment.perimeter else "",
            "risk_matrix": str(assessment.risk_matrix),
            "authors": [str(a) for a in assessment.authors.all()],
            "reviewers": [str(r) for r in assessment.reviewers.all()],
            "href": f"/risk-assessments/{assessment.id}",
        },
        "generated_on": timezone.localtime().strftime("%d %b %Y, %H:%M"),
        "generated_at": timezone.localtime().isoformat(),
        "currency": currency,
        "max_score": max_score,
        "tolerance": (
            {"value": tolerance, "name": matrix["risk"][tolerance].get("name", ""),
             "color": matrix["risk"][tolerance].get("hexcolor") or "#CBD5E1"}
            if has_tolerance
            else None
        ),
        "summary": {
            "total_risks": len(risks),
            "rated_risks": len(ranked),
            "top_count": len(top_items),
            "posture": highest["name"] if highest else None,
            "posture_color": highest["color"] if highest else None,
            "band_mix": band_mix,
            "above": [{"ref": r["ref"], "ref_id": r["ref_id"], "name": r["name"]} for r in top_items if r["above"]],
            "highest_refs": highest_refs,
            "highest": highest,
            "exposure_areas": [a["name"] for a in area_items[:2]],
            "control_count": len(control_items),
            "total_control_cost": total_control_cost,
            "total_control_cost_label": _money(total_control_cost, currency),
            "top_objective": top_objective,
            "least_effective": least_effective,
            "average_per_point": average_per_point,
            "average_per_point_label": _money(average_per_point, currency),
            "total_extra": total_extra,
            "total_extra_label": _money(total_extra, currency),
            "after_treatment_label": _money(total_control_cost + total_extra, currency),
            "avg_inherent": _avg("inherent"),
            "avg_current": _avg("current"),
            "avg_residual": _avg("residual"),
        },
        "scales": {
            "probability": [
                {"value": i + 1, "name": p.get("name", ""), "description": p.get("description") or ""}
                for i, p in enumerate(matrix["probability"])
            ],
            "impact": [
                {"value": i + 1, "name": p.get("name", ""), "description": p.get("description") or ""}
                for i, p in enumerate(matrix["impact"])
            ],
            "levels": [
                {
                    "name": r.get("name", ""),
                    "description": r.get("description") or "",
                    "color": r.get("hexcolor") or "#CBD5E1",
                    "within_tolerance": has_tolerance and index <= tolerance,
                }
                for index, r in reversed(list(enumerate(matrix["risk"])))
            ],
        },
        "objectives": objective_totals,
        "areas": area_items,
        "top_risks": top_items,
        "heatmaps": heatmaps,
        "controls": control_items,
        "effectiveness": effectiveness,
        "treatment": treatment,
    }


def risk_posture_workbook(payload: dict) -> bytes:
    workbook = Workbook()
    sections = payload["sections"]
    summary = payload["summary"]
    assessment = payload["assessment"]
    sheet = workbook.active
    sheet.title = "Summary" if "summary" in sections else "Assessment"
    for row in [
        ["Risk assessment", assessment["name"]],
        ["Domain", assessment["folder"]],
        ["Perimeter", assessment["perimeter"]],
        ["Risk matrix", assessment["risk_matrix"]],
        ["Risk tolerance", payload["tolerance"]["name"] if payload["tolerance"] else "Not set"],
        ["Generated on", payload["generated_on"]],
    ]:
        sheet.append(row)
    if "summary" in sections:
        for row in [
            [],
            ["Overall posture", summary["posture"] or "-"],
            ["Risks in scope", f"{summary['top_count']} top risks of {summary['total_risks']}"],
            ["Risks above tolerance", ", ".join(r["ref"] for r in summary["above"]) or "-"],
            ["Highest current risks", ", ".join(summary["highest_refs"]) or "-"],
            ["Highest-exposure areas", ", ".join(summary["exposure_areas"]) or "-"],
            ["Annual cost of controls", summary["total_control_cost_label"]],
            ["Average inherent score", summary["avg_inherent"]],
            ["Average current score", summary["avg_current"]],
            ["Extra annual investment planned", summary["total_extra_label"]],
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
        "scoring",
        "Scoring",
        ["Scale", "Value", "Name", "Description"],
        [["Probability", p["value"], p["name"], p["description"]] for p in payload["scales"]["probability"]]
        + [["Impact", p["value"], p["name"], p["description"]] for p in payload["scales"]["impact"]]
        + [["Risk level", "", l["name"], l["description"]] for l in payload["scales"]["levels"]],
    )
    table(
        "areas",
        "Risk areas",
        ["Rank", "Area", "Top risks", "Highest current", "Above tolerance", "Inherent sum", "Current sum", "Control cost"],
        [[a["rank"], a["name"], ", ".join(a["risks"]), f"{a['top']['score']} {a['top']['name']}",
          ", ".join(a["above"]), a["inherent_sum"], a["current_sum"], a["cost"]] for a in payload["areas"]],
    )
    table(
        "top_risks",
        "Top risks",
        ["Rank", "Ref", "Risk", "Area", "Inherent LxI", "Inherent score", "Inherent level", "Current LxI",
         "Current score", "Current level", "Residual score", "Residual level", "Above tolerance", "Treatment",
         "Objectives", "Owners"],
        [[r["rank"], r["ref_id"], r["name"], r["area"], r["inherent"]["lxi"], r["inherent"]["score"], r["inherent"]["name"],
          r["current"]["lxi"], r["current"]["score"], r["current"]["name"], r["residual"]["score"], r["residual"]["name"],
          "Yes" if r["above"] else "No", r["treatment_label"], ", ".join(r["objectives"]), ", ".join(r["owners"])]
         for r in payload["top_risks"]],
    )
    table(
        "controls",
        "Controls in place",
        ["Ref", "Control", "Type", "Status", "Annual cost", "Risks covered", "Objectives", "Owners"],
        [[c["ref_id"], c["name"], c["type"], c["status_label"], c["annual_cost"],
          ", ".join(f"{r['ref']} {r['pct']}%" for r in c["risks"]), ", ".join(c["objectives"]), ", ".join(c["owners"])]
         for c in payload["controls"]],
    )
    table(
        "cost_allocation",
        "Cost allocation",
        ["Risk", "Built from controls", "Total"] + [o["name"] for o in payload["objectives"]],
        [[f"{r['ref_id']} {r['name']}".strip(), "; ".join(f"{p['ref']} {p['amount']}" for p in r["cost_parts"]), r["control_cost"]]
         + [o["amount"] or "" for o in r["objective_costs"]] for r in payload["top_risks"]]
        + [["Total", "", payload["summary"]["total_control_cost"]] + [o["amount"] for o in payload["objectives"]]],
    )
    table(
        "cost_effectiveness",
        "Cost-effectiveness",
        ["Ref", "Risk", "Control cost", "Inherent score", "Current score", "Points reduced", "Cost per point", "Flags"],
        [[e["ref_id"], e["name"], e["cost"], e["inherent"], e["current"], e["reduction"], e["cost_per_point"] or "",
          "; ".join(e["flags"])] for e in payload["effectiveness"]],
    )
    table(
        "treatment",
        "Treatment plan",
        ["Ref", "Risk", "Current", "Treatment", "Planned controls", "Extra annual cost", "Target residual", "Owners", "Target date"],
        [[t["ref_id"], t["name"], f"{t['current']['score']} ({t['current']['lxi']}) {t['current']['name']}", t["treatment_label"],
          "; ".join(f"{c['ref_id']} {c['name']} [{c['status_label']}]".strip() for c in t["controls"]), t["extra_cost"],
          f"{t['residual']['score']} {t['residual']['name']}" if t["residual"]["rated"] else "-",
          ", ".join(t["owners"]), t["target_date"] or ""] for t in payload["treatment"]],
    )

    buffer = io.BytesIO()
    workbook.save(buffer)
    return buffer.getvalue()


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
        payload, error = _payload_or_404(request)
        if error or payload["assessment"] is None:
            return error or Response(status=status.HTTP_404_NOT_FOUND)
        response = HttpResponse(
            risk_posture_workbook(payload),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response["Content-Disposition"] = 'attachment; filename="risk-posture-report.xlsx"'
        return response


class RiskPostureReportPdfView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from core.views import _render_weasyprint_pdf

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
