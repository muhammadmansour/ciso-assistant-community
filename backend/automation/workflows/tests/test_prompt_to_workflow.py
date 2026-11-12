"""Allowlist and import smoke tests for AI-generated workflow documents."""

import pytest

from iam.models import Folder
from automation.workflows.import_export import import_workflow_library
from automation.workflows.prompt_to_workflow import (
    build_summary,
    normalize_ai_document,
    validate_ai_document,
)


def _minimal_workflow_obj(**overrides):
    base = {
        "name": "AI evidence notice",
        "description": "Notify owners when evidence is uploaded",
        "ref_id": "ai-evidence-notice",
        "graph": {
            "variables": [
                {"key": "evidence_id", "type": "string", "default_value": ""},
                {"key": "app_url", "type": "string", "default_value": ""},
            ],
            "nodes": [
                {
                    "ref": "on_upload",
                    "type": "trigger",
                    "label": "Upload",
                    "trigger_config": {
                        "type": "internal_event",
                        "event_key": "evidencerevision.created",
                    },
                },
                {
                    "ref": "run_now",
                    "type": "trigger",
                    "label": "Manual",
                    "trigger_config": {"type": "manual"},
                    "input_mapping": {"evidence_id": "evidence_id"},
                },
                {
                    "ref": "take_payload",
                    "type": "action",
                    "label": "Payload",
                    "action_config": {
                        "type": "set_variables",
                        "variables": {
                            "evidence_id": "{{payload.new_values.evidence}}"
                        },
                    },
                },
                {
                    "ref": "read_evidence",
                    "type": "action",
                    "label": "Read",
                    "action_config": {
                        "type": "read_objects",
                        "model": "evidence",
                        "mode": "first",
                        "include": ["controls", "control_owner_emails"],
                        "filters": {
                            "operator": "and",
                            "conditions": [
                                {
                                    "op": "eq",
                                    "field": "id",
                                    "value": "{{evidence_id}}",
                                }
                            ],
                        },
                    },
                },
                {
                    "ref": "mail",
                    "type": "action",
                    "label": "Email",
                    "action_config": {
                        "type": "send_email",
                        "recipients": "{{nodes.read_evidence.object.control_owner_emails}}",
                        "subject": "Evidence updated",
                        "body": "See {{app_url}}/evidences/{{evidence_id}}",
                    },
                },
                {"ref": "done", "type": "end"},
            ],
            "edges": [
                {"source": "on_upload", "target": "take_payload"},
                {"source": "take_payload", "target": "read_evidence"},
                {"source": "run_now", "target": "read_evidence"},
                {"source": "read_evidence", "target": "mail"},
                {"source": "mail", "target": "done"},
            ],
        },
    }
    base.update(overrides)
    return base


def _library(workflow_obj=None):
    wf = workflow_obj or _minimal_workflow_obj()
    return {
        "urn": "urn:custom:risk:library:workflow-ai-evidence-notice",
        "locale": "en",
        "ref_id": "workflow-ai-evidence-notice",
        "name": wf["name"],
        "description": wf["description"],
        "version": 1,
        "objects": {"workflows": [wf]},
    }


def test_validate_accepts_minimal_allowlisted_document():
    errors = validate_ai_document(_library())
    assert errors == []


def test_validate_rejects_http_request_action():
    wf = _minimal_workflow_obj()
    wf["graph"]["nodes"].append(
        {
            "ref": "call_api",
            "type": "action",
            "label": "HTTP",
            "action_config": {
                "type": "http_request",
                "url": "https://example.com",
                "method": "POST",
            },
        }
    )
    wf["graph"]["edges"].append({"source": "mail", "target": "call_api"})
    wf["graph"]["edges"].append({"source": "call_api", "target": "done"})
    # Remove mail->done to avoid dangling, keep end reachable via http node
    wf["graph"]["edges"] = [
        e for e in wf["graph"]["edges"] if not (e["source"] == "mail" and e["target"] == "done")
    ]
    errors = validate_ai_document(_library(wf))
    assert any("http_request" in e for e in errors)


def test_validate_rejects_create_object_action():
    wf = _minimal_workflow_obj()
    for node in wf["graph"]["nodes"]:
        if node["ref"] == "mail":
            node["action_config"] = {
                "type": "create_object",
                "model": "incident",
                "values": {"name": "x"},
            }
    errors = validate_ai_document(_library(wf))
    assert any("create_object" in e for e in errors)


def test_validate_rejects_disallowed_event_key():
    wf = _minimal_workflow_obj()
    for node in wf["graph"]["nodes"]:
        if node["ref"] == "on_upload":
            node["trigger_config"]["event_key"] = "workflowinstance.created"
    errors = validate_ai_document(_library(wf))
    assert any("event_key" in e for e in errors)


def test_normalize_wraps_bare_workflow_and_stamps_app_url(settings):
    from automation.workflows.prompt_to_workflow import _wrap_library

    settings.CISO_ASSISTANT_URL = "https://gov-grc.example"
    bare = _minimal_workflow_obj()
    bare["graph"]["variables"] = [
        v for v in bare["graph"]["variables"] if v["key"] != "app_url"
    ]
    doc = normalize_ai_document(_wrap_library(bare))
    variables = doc["objects"]["workflows"][0]["graph"]["variables"]
    app = next(v for v in variables if v["key"] == "app_url")
    assert app["default_value"] == "https://gov-grc.example"
    assert doc["objects"]["workflows"][0]["ref_id"]


def test_build_summary_lists_steps():
    summary = build_summary(_library())
    refs = [s["ref"] for s in summary]
    assert "on_upload" in refs
    assert "mail" in refs
    assert any(s["detail"].startswith("internal_event") for s in summary)


@pytest.mark.django_db
def test_allowlisted_document_imports(db):
    folder = Folder.get_root_folder()
    document = normalize_ai_document(_library())
    assert validate_ai_document(document) == []
    workflows, warnings = import_workflow_library(document, folder, secrets={})
    assert len(workflows) == 1
    assert workflows[0].name == "AI evidence notice"
    assert workflows[0].draft_version is not None
    assert isinstance(warnings, list)


def test_validate_rejects_missing_end():
    wf = _minimal_workflow_obj()
    wf["graph"]["nodes"] = [n for n in wf["graph"]["nodes"] if n["type"] != "end"]
    wf["graph"]["edges"] = [
        e for e in wf["graph"]["edges"] if e["target"] != "done" and e["source"] != "done"
    ]
    errors = validate_ai_document(_library(wf))
    assert any("end node" in e for e in errors)
