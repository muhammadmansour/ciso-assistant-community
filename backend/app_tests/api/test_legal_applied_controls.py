import pytest
import yaml

from core.models import AppliedControl, LoadedLibrary, StoredLibrary

LIBRARY = {
    "urn": "urn:test:risk:library:sa-legal-instruments",
    "locale": "ar",
    "ref_id": "SA-LEGAL",
    "name": "Saudi legal instruments",
    "version": 1,
    "provider": "Tests",
    "objects": {
        "laws": [
            {
                "urn": "urn:test:law:pdpl",
                "ref_id": "M/19",
                "name": "Personal Data Protection Law",
                "issuing_authority": "Royal Decree",
                "issue_date": "2021-09-16",
                "effective_date": "2023-09-14",
                "status": "amended",
            }
        ],
        "cabinet_decisions": [
            {"urn": "urn:test:cd:98", "ref_id": "98", "status": "draft"}
        ],
        "regulator_instructions": [
            {"urn": "urn:test:ri:ecc", "ref_id": "ECC-2", "link": "https://nca.gov.sa"}
        ],
        "board_decisions": [
            {"urn": "urn:test:bd:12", "ref_id": "BD-12", "status": "repealed"}
        ],
        "official_letters": [{"urn": "urn:test:ol:7", "ref_id": "OL-7"}],
    },
}


def _store(content: dict) -> StoredLibrary:
    return StoredLibrary.store_library_content(yaml.safe_dump(content).encode())


@pytest.mark.django_db
def test_each_yaml_key_loads_as_an_applied_control_category(authenticated_client):
    _store(LIBRARY).load()

    library = LoadedLibrary.objects.get(urn=LIBRARY["urn"])
    assert dict(library.applied_controls.values_list("ref_id", "category")) == {
        "M/19": "law",
        "98": "cabinet_decision",
        "ECC-2": "regulator_instruction",
        "BD-12": "board_decision",
        "OL-7": "official_letter",
    }
    assert dict(library.applied_controls.values_list("ref_id", "status")) == {
        "M/19": "active",
        "98": "to_do",
        "ECC-2": "active",
        "BD-12": "deprecated",
        "OL-7": "active",
    }
    law = AppliedControl.objects.get(ref_id="M/19")
    assert str(law.start_date) == "2021-09-16"
    assert str(law.eta) == "2023-09-14"
    assert "Royal Decree" in law.observation
    assert AppliedControl.objects.get(ref_id="ECC-2").link == "https://nca.gov.sa"

    laws = authenticated_client.get("/api/laws/").json()
    assert [r["ref_id"] for r in laws["results"]] == ["M/19"]
    assert authenticated_client.get("/api/official-letters/").json()["count"] == 1
    applied = authenticated_client.get("/api/applied-controls/").json()
    assert applied["count"] == 5


@pytest.mark.django_db
def test_unloading_the_library_removes_its_controls(authenticated_client):
    _store(LIBRARY).load()
    LoadedLibrary.objects.get(urn=LIBRARY["urn"]).delete()
    assert not AppliedControl.objects.filter(urn__startswith="urn:test:").exists()


@pytest.mark.django_db
def test_typed_endpoint_pins_the_category(authenticated_client):
    response = authenticated_client.post(
        "/api/board-decisions/",
        {"name": "Approve budget", "ref_id": "BD-1", "category": "law"},
        format="json",
    )
    assert response.status_code == 201, response.content
    control = AppliedControl.objects.get(ref_id="BD-1")
    assert control.category == "board_decision"

    response = authenticated_client.patch(
        f"/api/board-decisions/{control.id}/", {"category": "policy"}, format="json"
    )
    assert response.status_code == 200, response.content
    control.refresh_from_db()
    assert control.category == "board_decision"


@pytest.mark.django_db
def test_libraries_can_be_filtered_by_each_type(authenticated_client):
    _store(LIBRARY)
    _store(
        {
            **LIBRARY,
            "urn": "urn:test:risk:library:only-letters",
            "ref_id": "LETTERS",
            "objects": {"official_letters": LIBRARY["objects"]["official_letters"]},
        }
    )

    def refs(object_type):
        response = authenticated_client.get(
            f"/api/stored-libraries/?object_type={object_type}"
        )
        return sorted(lib["ref_id"] for lib in response.json()["results"])

    assert refs("laws") == ["SA-LEGAL"]
    assert refs("official_letters") == ["LETTERS", "SA-LEGAL"]

    choices = authenticated_client.get("/api/stored-libraries/object_type/").json()
    assert set(AppliedControl.LEGAL_LIBRARY_KEYS) <= set(choices)


@pytest.mark.django_db
def test_invalid_status_rejects_the_library(authenticated_client):
    bad = {
        **LIBRARY,
        "urn": "urn:test:risk:library:bad-status",
        "objects": {"laws": [{"urn": "urn:test:law:x", "ref_id": "X", "status": "gone"}]},
    }
    error = _store(bad).load()
    assert error and "LEGAL_CONTROL_ERROR" in error
    assert not AppliedControl.objects.filter(ref_id="X").exists()
