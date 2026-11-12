"""Soft-catalog and repair tests for AI-generated workflow documents."""

import pytest

from iam.models import Folder
from automation.workflows.ai_action_catalog import authorable_action_types
from automation.workflows.import_export import import_workflow_library
from automation.workflows.prompt_to_workflow import (
    build_summary,
    draft_blocking_errors,
    normalize_ai_document,
    repair_ai_document,
    sanitize_ai_document,
)
from automation.workflows.validation import DISABLED_ACTION_TYPES


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


def test_catalog_includes_broad_actions_excludes_emit_event():
    types = set(authorable_action_types())
    assert "send_email" in types
    assert "http_request" in types
    assert "create_object" in types
    assert "ai_generate" in types
    assert "emit_event" not in types
    assert "emit_event" in DISABLED_ACTION_TYPES


def test_draft_blocking_accepts_minimal_document():
    assert draft_blocking_errors(_library()) == []


def test_http_request_action_is_kept_in_sanitize():
    wf = _minimal_workflow_obj()
    wf["graph"]["nodes"].insert(
        -1,
        {
            "ref": "call_api",
            "type": "action",
            "label": "HTTP",
            "action_config": {
                "type": "http_request",
                "url": "https://example.com",
                "method": "POST",
            },
        },
    )
    wf["graph"]["edges"] = [
        e for e in wf["graph"]["edges"] if not (e["source"] == "mail" and e["target"] == "done")
    ]
    wf["graph"]["edges"].extend(
        [
            {"source": "mail", "target": "call_api"},
            {"source": "call_api", "target": "done"},
        ]
    )
    doc, warnings = sanitize_ai_document(_library(wf))
    refs = [n["ref"] for n in doc["objects"]["workflows"][0]["graph"]["nodes"]]
    assert "call_api" in refs
    assert not any("http_request" in w for w in warnings)


def test_emit_event_action_is_stripped_with_warning():
    wf = _minimal_workflow_obj()
    for node in wf["graph"]["nodes"]:
        if node["ref"] == "mail":
            node["action_config"] = {
                "type": "emit_event",
                "event_key": "incident.created",
            }
    doc, warnings = sanitize_ai_document(_library(wf))
    refs = [n["ref"] for n in doc["objects"]["workflows"][0]["graph"]["nodes"]]
    assert "mail" not in refs
    assert any("emit_event" in w or "unsupported action" in w for w in warnings)


def test_normalize_stamps_app_url(settings):
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


def test_build_summary_lists_steps():
    summary = build_summary(_library())
    refs = [s["ref"] for s in summary]
    assert "on_upload" in refs
    assert "mail" in refs


@pytest.mark.django_db
def test_allowlisted_document_imports(db):
    folder = Folder.get_root_folder()
    document = normalize_ai_document(_library())
    document, _warnings = sanitize_ai_document(document)
    assert draft_blocking_errors(document) == []
    workflows, warnings = import_workflow_library(document, folder, secrets={})
    assert len(workflows) == 1
    assert workflows[0].name == "AI evidence notice"
    assert workflows[0].draft_version is not None
    assert isinstance(warnings, list)


def test_repair_fixes_messy_incident_style_graph():
    messy = {
        "name": "Notify security",
        "description": "email on incident",
        "ref_id": "ai-incident",
        "graph": {
            "variables": [{"key": "incident_id", "type": "string", "default_value": ""}],
            "nodes": [
                {
                    "ref": "on-incident",
                    "type": "trigger",
                    "trigger_config": {
                        "type": "event",
                        "event_key": "Incident.created",
                    },
                },
                {
                    "ref": "take_payload",
                    "type": "action",
                    "action_config": {
                        "type": "set_variable",
                        "variables": [
                            {"key": "incident_id", "value": "{{payload.object_id}}"}
                        ],
                    },
                },
                {
                    "ref": "read",
                    "type": "action",
                    "action_config": {
                        "type": "fetch",
                        "model": "incidents",
                        "filters": {
                            "operator": "and",
                            "conditions": [
                                {
                                    "op": "eq",
                                    "field": "id",
                                    "value": "{{incident_id}}",
                                }
                            ],
                        },
                    },
                },
                {
                    "ref": "mail",
                    "type": "email",
                    "recipients": ["security@example.com"],
                    "action_config": {"subject": "New incident", "body": "hi"},
                },
            ],
            "edges": [
                {"source": "on-incident", "target": "take_payload"},
                {"source": "take_payload", "target": "read"},
                {"source": "read", "target": "mail"},
            ],
        },
    }
    doc = normalize_ai_document(_library(messy))
    doc = repair_ai_document(doc)
    doc, warnings = sanitize_ai_document(doc)
    assert draft_blocking_errors(doc) == []
    nodes = doc["objects"]["workflows"][0]["graph"]["nodes"]
    by_ref = {n["ref"]: n for n in nodes}
    assert by_ref["on_incident"]["trigger_config"]["event_key"] == "incident.created"
    assert by_ref["mail"]["action_config"]["type"] == "send_email"
    assert by_ref["mail"]["action_config"]["recipients"] == "security@example.com"
    assert any(n["type"] == "end" for n in nodes)
