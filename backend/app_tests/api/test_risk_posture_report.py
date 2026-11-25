import pytest
from django.template.loader import render_to_string

from core.models import (
    AppliedControl,
    Perimeter,
    RiskAssessment,
    RiskMatrix,
    RiskScenario,
)
from core.risk_posture_report_views import (
    SECTION_KEYS,
    build_risk_posture_report,
    risk_posture_document,
    risk_posture_workbook,
)
from iam.models import Folder, User
from test_fixtures import RISK_MATRIX_JSON_DEFINITION


def _cost(amount):
    return {"currency": "EUR", "build": {"fixed_cost": amount}, "amortization_period": 1}


@pytest.fixture
def report(db):
    domain = Folder.objects.create(
        parent_folder=Folder.get_root_folder(),
        name="Posture Domain",
        content_type=Folder.ContentType.DOMAIN,
    )
    assessment = RiskAssessment.objects.create(
        name="Payments 2026",
        perimeter=Perimeter.objects.create(name="Payments", folder=domain),
        risk_matrix=RiskMatrix.objects.create(
            name="3x3", folder=domain, json_definition=RISK_MATRIX_JSON_DEFINITION
        ),
    )
    shared = AppliedControl.objects.create(
        name="SOC", folder=domain, status="active", cost=_cost(900)
    )
    planned = AppliedControl.objects.create(
        name="WAF", folder=domain, status="to_do", cost=_cost(300)
    )
    mitigated = RiskScenario.objects.create(
        name="Ransomware",
        ref_id="R-01",
        risk_assessment=assessment,
        treatment="mitigate",
        current_proba=2,
        current_impact=2,
        residual_proba=1,
        residual_impact=1,
    )
    mitigated.existing_applied_controls.add(shared)
    mitigated.applied_controls.add(planned)
    accepted = RiskScenario.objects.create(
        name="FX feed error",
        ref_id="R-02",
        risk_assessment=assessment,
        treatment="accept",
        justification="Cheaper to live with",
        current_proba=1,
        current_impact=1,
        residual_proba=1,
        residual_impact=1,
    )
    accepted.existing_applied_controls.add(shared)

    admin = User.objects.create_superuser("posture-admin@tests.com")
    payload = build_risk_posture_report(admin, str(assessment.id))
    payload["sections"] = list(SECTION_KEYS)
    payload["section_numbers"] = {key: i for i, key in enumerate(SECTION_KEYS, start=1)}
    return payload


class TestRiskPostureReport:
    def test_the_summary_counts_each_control_once(self, report):
        summary = report["summary"]
        assert summary["total_cost"] == 1200
        assert summary["control_count"] == 2
        assert [(t["key"], t["count"]) for t in summary["treatment_split"]] == [
            ("mitigate", 1),
            ("accept", 1),
        ]
        assert [(b["name"], b["count"]) for b in summary["residual_bands"]] == [
            ("Low", 0),
            ("Medium", 2),
            ("High", 0),
        ]
        assert summary["avg_current"] == 6.5
        assert summary["avg_residual"] == 4.0
        assert summary["highest_residual"]["score"] == 4
        assert {r["ref"] for r in summary["highest_residual"]["risks"]} == {"R-01", "R-02"}

    def test_scoring_bands_list_their_score_range_highest_first(self, report):
        assert [(b["name"], b["range"]) for b in report["scales"]["bands"]] == [
            ("High", "6–9"),
            ("Medium", "3–4"),
            ("Low", "1–2"),
        ]

    def test_a_shared_control_cost_is_split_across_its_scenarios(self, report):
        rows = {row["ref"]: row for row in report["effectiveness"]}
        assert rows["R-01"]["allocated"] == 750
        assert rows["R-01"]["points"] == 5
        assert rows["R-01"]["cost_per_point"] == 150
        assert rows["R-02"]["tag"] == "no_reduction"
        assert report["average_per_point"] == 240

    def test_the_treatment_plan_lists_planned_controls_and_accepted_risks(self, report):
        treatment = report["treatment"]
        assert [(row["risk_ref"], row["control_name"]) for row in treatment["planned"]] == [
            ("R-01", "WAF")
        ]
        assert treatment["extra_cost"] == 300
        assert [(a["ref"], a["justification"]) for a in treatment["accepted"]] == [
            ("R-02", "Cheaper to live with")
        ]

    def test_heatmaps_place_each_scenario_on_its_cell(self, report):
        current, residual = report["heatmaps"]
        placed = lambda heatmap: sorted(
            ref for row in heatmap["rows"] for cell in row["cells"] for ref in cell["refs"]
        )
        assert placed(current) == ["R-01", "R-02"]
        assert placed(residual) == ["R-01", "R-02"]

    def test_every_export_renders_all_sections(self, report):
        html = render_to_string("core/risk_posture_report_pdf.html", report)
        for title in ["Summary", "Scoring method", "Top risks", "Controls & costs", "Treatment plan"]:
            assert title in html
        assert "Cheaper to live with" in html
        assert risk_posture_document(report)[:2] == b"PK"
        assert risk_posture_workbook(report)[:2] == b"PK"
