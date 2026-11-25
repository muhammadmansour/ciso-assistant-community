import pytest
import yaml

from core.models import LegalInstrument, LoadedLibrary, StoredLibrary

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
                "status": "amended",
            }
        ],
        "cabinet_decisions": [{"urn": "urn:test:cd:98", "ref_id": "98"}],
        "regulator_instructions": [
            {"urn": "urn:test:ri:ecc", "ref_id": "ECC-2", "link": "https://nca.gov.sa"}
        ],
        "board_decisions": [{"urn": "urn:test:bd:12", "ref_id": "BD-12"}],
        "official_letters": [{"urn": "urn:test:ol:7", "ref_id": "OL-7"}],
    },
}


def _store(content: dict) -> StoredLibrary:
    return StoredLibrary.store_library_content(yaml.safe_dump(content).encode())


@pytest.mark.django_db
def test_each_yaml_key_loads_as_its_own_kind(authenticated_client):
    _store(LIBRARY).load()

    library = LoadedLibrary.objects.get(urn=LIBRARY["urn"])
    assert dict(
        library.legal_instruments.values_list("ref_id", "kind")
    ) == {
        "M/19": "law",
        "98": "cabinet_decision",
        "ECC-2": "regulator_instruction",
        "BD-12": "board_decision",
        "OL-7": "official_letter",
    }
    law = LegalInstrument.objects.get(ref_id="M/19")
    assert law.status == "amended"
    assert str(law.issue_date) == "2021-09-16"
    assert law.provider == "Tests"

    laws = authenticated_client.get("/api/laws/").json()
    assert [r["ref_id"] for r in laws["results"]] == ["M/19"]
    assert authenticated_client.get("/api/legal-instruments/").json()["count"] == 5
    assert authenticated_client.get("/api/official-letters/").json()["count"] == 1


@pytest.mark.django_db
def test_creating_through_a_typed_endpoint_pins_the_kind(authenticated_client):
    response = authenticated_client.post(
        "/api/board-decisions/",
        {"name": "Approve budget", "ref_id": "BD-1", "kind": "law"},
        format="json",
    )
    assert response.status_code == 201, response.content
    assert LegalInstrument.objects.get(ref_id="BD-1").kind == "board_decision"


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
    assert set(LegalInstrument.LIBRARY_KEYS) <= set(choices)


@pytest.mark.django_db
def test_invalid_status_rejects_the_library(authenticated_client):
    bad = {
        **LIBRARY,
        "urn": "urn:test:risk:library:bad-status",
        "objects": {"laws": [{"urn": "urn:test:law:x", "ref_id": "X", "status": "gone"}]},
    }
    error = _store(bad).load()
    assert error and "LEGAL_INSTRUMENT_ERROR" in error
    assert not LegalInstrument.objects.filter(ref_id="X").exists()
