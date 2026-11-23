import pytest
from rest_framework.test import APIClient

from core.models import Finding, FindingsAssessment, TaskTemplate
from iam.models import Folder, User


@pytest.fixture
def setup(db):
    root = Folder.get_root_folder()
    domain = Folder.objects.create(
        parent_folder=root,
        name="Findings Domain",
        content_type=Folder.ContentType.DOMAIN,
    )
    other_domain = Folder.objects.create(
        parent_folder=root,
        name="Other Domain",
        content_type=Folder.ContentType.DOMAIN,
    )
    binder = FindingsAssessment.objects.create(name="Pentest 2026", folder=domain)
    other_binder = FindingsAssessment.objects.create(
        name="Audit 2026", folder=other_domain
    )

    admin = User.objects.create_superuser("findings-admin@tests.com")
    client = APIClient()
    client.force_authenticate(admin)

    return {
        "domain": domain,
        "other_domain": other_domain,
        "binder": binder,
        "other_binder": other_binder,
        "client": client,
    }


def create_finding(client, **payload):
    return client.post("/api/findings/", payload, format="json")


def set_flag(enabled: bool):
    from global_settings.models import GlobalSettings

    gs, _ = GlobalSettings.objects.get_or_create(
        name=GlobalSettings.Names.FEATURE_FLAGS, defaults={"value": {}}
    )
    gs.value = {**(gs.value or {}), "findings_from_requirements": enabled}
    gs.save()


class TestFindingsFromRequirements:
    """A finding raised from a requirement lands in the audit's own binder."""

    @pytest.fixture
    def audit(self, setup):
        from core.models import (
            ComplianceAssessment,
            Framework,
            RequirementAssessment,
            RequirementNode,
        )

        framework = Framework.objects.create(name="F", folder=Folder.get_root_folder())
        node = RequirementNode.objects.create(
            framework=framework,
            urn="urn:test:req:1",
            ref_id="1",
            assessable=True,
            folder=Folder.get_root_folder(),
        )
        assessment = ComplianceAssessment.objects.create(
            name="ISO audit", folder=setup["domain"], framework=framework
        )
        # Requirement assessments are created by the audit's create flow, not by the
        # model's save, so make the one under test explicitly.
        return assessment, RequirementAssessment.objects.create(
            compliance_assessment=assessment,
            requirement=node,
            folder=setup["domain"],
        )

    def test_the_setting_gates_it(self, setup, audit):
        _, requirement_assessment = audit
        set_flag(False)
        res = setup["client"].post(
            f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
        )
        assert res.status_code == 403

    def test_a_locked_audit_has_no_binder(self, setup, audit):
        assessment, requirement_assessment = audit
        set_flag(True)
        assessment.is_locked = True
        assessment.save()
        res = setup["client"].post(
            f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
        )
        assert res.status_code == 403
        assert not FindingsAssessment.objects.filter(
            compliance_assessment=assessment
        ).exists()
        set_flag(False)

    def test_a_locked_audit_takes_no_finding_from_the_api_either(self, setup, audit):
        assessment, requirement_assessment = audit
        assessment.is_locked = True
        assessment.save()
        res = create_finding(
            setup["client"],
            name="Late",
            folder=str(setup["domain"].id),
            findings_assessment=str(setup["binder"].id),
            requirement_assessment=str(requirement_assessment.id),
        )
        assert res.status_code == 400
        assert "requirement_assessment" in res.json()

        # Reparenting an existing finding onto it is refused the same way.
        finding = Finding.objects.create(findings_assessment=setup["binder"], name="Orphan", folder=setup["domain"])
        res = setup["client"].patch(
            f"/api/findings/{finding.id}/",
            {"requirement_assessment": str(requirement_assessment.id)},
            format="json",
        )
        assert res.status_code == 400
        finding.refresh_from_db()
        assert finding.requirement_assessment is None

    def test_the_binder_is_created_once_and_bound_to_the_audit(self, setup, audit):
        assessment, requirement_assessment = audit
        set_flag(True)
        endpoint = (
            f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
        )

        first = setup["client"].post(endpoint)
        assert first.status_code == 201, first.json()
        second = setup["client"].post(endpoint)
        assert second.status_code == 200
        assert second.json()["id"] == first.json()["id"]

        binder = FindingsAssessment.objects.get(id=first.json()["id"])
        assert binder.compliance_assessment == assessment
        assert binder.folder == assessment.folder
        assert binder.category == "audit"
        set_flag(False)

    def test_the_binder_name_distinguishes_it_from_the_audit(self, setup, audit):
        assessment, requirement_assessment = audit
        set_flag(True)
        binder_id = (
            setup["client"]
            .post(
                f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
            )
            .json()["id"]
        )
        binder = FindingsAssessment.objects.get(id=binder_id)
        assert binder.name != assessment.name
        assert "findings" in binder.name.lower()
        set_flag(False)

    def test_a_requirement_assessment_can_carry_several_findings(self, setup, audit):
        assessment, requirement_assessment = audit
        set_flag(True)
        binder_id = (
            setup["client"]
            .post(
                f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
            )
            .json()["id"]
        )

        for name in ("Major nonconformity", "Minor nonconformity"):
            res = setup["client"].post(
                "/api/findings/",
                {
                    "name": name,
                    "findings_assessment": binder_id,
                    "requirement_assessment": str(requirement_assessment.id),
                    "requirement_node": str(requirement_assessment.requirement_id),
                },
                format="json",
            )
            assert res.status_code == 201, res.json()

        listed = setup["client"].get(
            f"/api/findings/?requirement_assessment={requirement_assessment.id}"
        )
        assert {f["name"] for f in listed.json()["results"]} == {
            "Major nonconformity",
            "Minor nonconformity",
        }
        # And each one links back to what raised it.
        assert listed.json()["results"][0]["requirement_assessment"]["id"] == str(
            requirement_assessment.id
        )
        set_flag(False)

    def test_the_audit_lists_its_findings_through_the_binder(self, setup, audit):
        assessment, requirement_assessment = audit
        set_flag(True)
        binder_id = (
            setup["client"]
            .post(
                f"/api/requirement-assessments/{requirement_assessment.id}/findings-binder/"
            )
            .json()["id"]
        )

        res = setup["client"].post(
            "/api/findings/",
            {
                "name": "Nonconformity",
                "findings_assessment": binder_id,
                "requirement_node": str(requirement_assessment.requirement_id),
            },
            format="json",
        )
        assert res.status_code == 201, res.json()

        listed = setup["client"].get(
            f"/api/findings-assessments/?compliance_assessment={assessment.id}"
        )
        assert [b["id"] for b in listed.json()["results"]] == [binder_id]
        set_flag(False)


class TestPickingExistingFindings:
    """An existing finding can be bound to a requirement assessment from the
    assessment's side, like applied controls and evidences."""

    @pytest.fixture
    def audit(self, setup):
        from core.models import (
            ComplianceAssessment,
            Framework,
            RequirementAssessment,
            RequirementNode,
        )

        framework = Framework.objects.create(name="F", folder=Folder.get_root_folder())
        node = RequirementNode.objects.create(
            framework=framework,
            urn="urn:test:req:1",
            ref_id="1",
            assessable=True,
            folder=Folder.get_root_folder(),
        )
        assessment = ComplianceAssessment.objects.create(
            name="ISO audit", folder=setup["domain"], framework=framework
        )
        return RequirementAssessment.objects.create(
            compliance_assessment=assessment,
            requirement=node,
            folder=setup["domain"],
        )

    def test_the_assessment_exposes_its_findings(self, setup, audit):
        finding = Finding.objects.create(
            name="Bound",
            folder=setup["domain"],
            findings_assessment=setup["binder"],
            requirement_assessment=audit,
        )
        res = setup["client"].get(f"/api/requirement-assessments/{audit.id}/")
        assert res.status_code == 200
        assert [f["id"] for f in res.json()["findings"]] == [str(finding.id)]

    def test_patching_findings_binds_and_unbinds(self, setup, audit):
        kept = Finding.objects.create(findings_assessment=setup["binder"], 
            name="Kept", folder=setup["domain"], requirement_assessment=audit
        )
        dropped = Finding.objects.create(findings_assessment=setup["binder"], 
            name="Dropped", folder=setup["domain"], requirement_assessment=audit
        )
        picked = Finding.objects.create(
            name="Picked",
            folder=setup["other_domain"],
            findings_assessment=setup["other_binder"],
        )
        picked_before = picked.updated_at

        res = setup["client"].patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(kept.id), str(picked.id)]},
            format="json",
        )
        assert res.status_code == 200, res.json()

        for finding in (kept, dropped, picked):
            finding.refresh_from_db()
        assert kept.requirement_assessment == audit
        assert picked.requirement_assessment == audit
        assert dropped.requirement_assessment is None
        # Binding does not move the finding out of its own binder.
        assert picked.findings_assessment == setup["other_binder"]
        # It is an edit of the finding, so it shows as one.
        assert picked.updated_at > picked_before

    def test_a_locked_binder_keeps_its_findings(self, setup, audit):
        setup["binder"].is_locked = True
        setup["binder"].save()
        locked = Finding.objects.create(
            name="Locked",
            folder=setup["domain"],
            findings_assessment=setup["binder"],
        )
        res = setup["client"].patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(locked.id)]},
            format="json",
        )
        assert res.status_code == 400
        locked.refresh_from_db()
        assert locked.requirement_assessment is None

    def test_a_finding_bound_elsewhere_is_not_stolen(self, setup, audit):
        from core.models import RequirementAssessment

        other = RequirementAssessment.objects.create(
            compliance_assessment=audit.compliance_assessment,
            requirement=audit.requirement,
            folder=setup["domain"],
        )
        taken = Finding.objects.create(findings_assessment=setup["binder"], 
            name="Taken", folder=setup["domain"], requirement_assessment=other
        )
        res = setup["client"].patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(taken.id)]},
            format="json",
        )
        assert res.status_code == 400
        taken.refresh_from_db()
        assert taken.requirement_assessment == other

    def test_the_picker_lists_the_unbound_and_its_own(self, setup, audit):
        from core.models import RequirementAssessment

        other = RequirementAssessment.objects.create(
            compliance_assessment=audit.compliance_assessment,
            requirement=audit.requirement,
            folder=setup["domain"],
        )
        own = Finding.objects.create(findings_assessment=setup["binder"], 
            name="Own", folder=setup["domain"], requirement_assessment=audit
        )
        free = Finding.objects.create(findings_assessment=setup["binder"], name="Free", folder=setup["domain"])
        Finding.objects.create(findings_assessment=setup["binder"], 
            name="Taken", folder=setup["domain"], requirement_assessment=other
        )
        res = setup["client"].get(
            f"/api/findings/?requirement_assessment=--&requirement_assessment={audit.id}"
        )
        assert res.status_code == 200
        assert {f["id"] for f in res.json()["results"]} == {str(own.id), str(free.id)}

    def test_binding_needs_change_permission_on_the_finding(self, setup, audit):
        from iam.models import Role, RoleAssignment
        from core.utils import RoleCodename

        # Analyst on the audit's domain only: can edit the assessment, cannot touch
        # a finding that lives in another domain.
        analyst = User.objects.create_user("findings-analyst@tests.com")
        assignment = RoleAssignment.objects.create(
            user=analyst,
            role=Role.objects.get(name=RoleCodename.ANALYST.value),
            folder=Folder.get_root_folder(),
            is_recursive=True,
        )
        assignment.perimeter_folders.add(setup["domain"])
        client = APIClient()
        client.force_authenticate(analyst)

        foreign = Finding.objects.create(
            name="Foreign",
            folder=setup["other_domain"],
            findings_assessment=setup["other_binder"],
        )
        res = client.patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(foreign.id)]},
            format="json",
        )
        assert res.status_code == 403
        foreign.refresh_from_db()
        assert foreign.requirement_assessment is None

        own = Finding.objects.create(findings_assessment=setup["binder"], name="Own", folder=setup["domain"])
        res = client.patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(own.id)]},
            format="json",
        )
        assert res.status_code == 200, res.json()
        own.refresh_from_db()
        assert own.requirement_assessment == audit

    def test_an_unchanged_locked_finding_does_not_block_the_save(self, setup, audit):
        locked = Finding.objects.create(
            name="Locked",
            folder=setup["domain"],
            findings_assessment=setup["binder"],
            requirement_assessment=audit,
        )
        setup["binder"].is_locked = True
        setup["binder"].save()
        res = setup["client"].patch(
            f"/api/requirement-assessments/{audit.id}/",
            {"findings": [str(locked.id)], "observation": "still fine"},
            format="json",
        )
        assert res.status_code == 200, res.json()
