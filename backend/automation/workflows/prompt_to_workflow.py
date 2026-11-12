"""Generate a new workflow library document from a natural-language prompt.

v1 allowlist: trigger (manual / internal_event), set_variables, read_objects,
condition, loop, send_email, log, end. Anything else is rejected before import.
"""

from __future__ import annotations

import copy
import json
import re
from typing import Any

import structlog
from django.conf import settings

logger = structlog.get_logger(__name__)

# Keep in sync with graph.REF_RE (avoid importing graph → models at module load).
REF_RE = re.compile(r"^[a-z][a-z0-9_]{0,99}$")

ALLOWED_NODE_TYPES = frozenset({"trigger", "action", "condition", "loop", "end"})
ALLOWED_ACTION_TYPES = frozenset(
    {"set_variables", "read_objects", "send_email", "log"}
)
ALLOWED_TRIGGER_TYPES = frozenset({"manual", "internal_event"})
ALLOWED_EVENT_KEYS = frozenset(
    {
        "evidencerevision.created",
        "evidence.updated",
        "evidence.created",
        "complianceassessment.updated",
        "complianceassessment.created",
        "appliedcontrol.updated",
        "appliedcontrol.created",
        "incident.created",
        "incident.updated",
        "vulnerability.created",
        "vulnerability.updated",
        "finding.created",
        "finding.updated",
        "task.updated",
        "task.created",
    }
)
ALLOWED_READ_MODELS = frozenset(
    {
        "evidence",
        "complianceassessment",
        "appliedcontrol",
        "incident",
        "vulnerability",
        "finding",
        "perimeter",
        "asset",
        "user",
    }
)

WORKFLOW_JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "description": {"type": "string"},
        "ref_id": {"type": "string"},
        "graph": {
            "type": "object",
            "properties": {
                "variables": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "key": {"type": "string"},
                            "type": {"type": "string"},
                            "default_value": {},
                        },
                        "required": ["key"],
                    },
                },
                "nodes": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "ref": {"type": "string"},
                            "type": {"type": "string"},
                            "label": {"type": "string"},
                            "trigger_config": {"type": "object"},
                            "action_config": {"type": "object"},
                            "loop_config": {"type": "object"},
                            "input_mapping": {"type": "object"},
                            "branches": {"type": "array"},
                        },
                        "required": ["ref", "type"],
                    },
                },
                "edges": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "source": {"type": "string"},
                            "target": {"type": "string"},
                            "source_branch": {"type": "string"},
                        },
                        "required": ["source", "target"],
                    },
                },
            },
            "required": ["variables", "nodes", "edges"],
        },
    },
    "required": ["name", "description", "graph"],
}

_SYSTEM_PROMPT = """You design GRC automation workflows for CISO Assistant.

Return JSON for ONE workflow object with name, description, optional ref_id, and graph
{variables, nodes, edges}. Do not wrap in a library envelope.

ALLOWED node types only: trigger, action, condition, loop, end.
ALLOWED trigger_config.type: manual, internal_event.
ALLOWED action_config.type: set_variables, read_objects, send_email, log.
Do NOT use create_object, update_object, http_request, ai_generate, emit_event, subprocess, task, or event nodes.

Useful event_key values:
- evidencerevision.created (file uploaded to evidence)
- evidence.updated
- complianceassessment.updated (filter on status / new_values.status for in_review)
- appliedcontrol.updated
- incident.created

Useful read_objects models and includes:
- evidence + includes: controls, control_names, control_owner_emails, audits, reviewer_emails
- complianceassessment + includes: reviewers, reviewer_emails
- appliedcontrol + includes: owners, owner_emails

Patterns:
- Event trigger: take payload into variables with set_variables, then read_objects, then send_email.
- Always include a manual trigger for test runs when sensible.
- Always end with an end node; wire every branch.
- Prefer HTML send_email layout with title/sections/details/buttons when emailing.
- Use {{app_url}} in links; include an app_url string variable (default may be empty).
- Node refs: lowercase snake_case starting with a letter (e.g. on_upload, mail_owners).
- Edges: {source, target} and optional source_branch for condition branches.
- Condition branches: name + condition_groups OR is_default: true.

Example shape (abbreviated):
{
  "name": "Evidence uploaded - notify owners",
  "description": "When evidence is uploaded, email control owners.",
  "ref_id": "ai-evidence-owners",
  "graph": {
    "variables": [
      {"key": "evidence_id", "type": "string", "default_value": ""},
      {"key": "app_url", "type": "string", "default_value": ""},
      {"key": "owner_emails", "type": "string", "default_value": ""}
    ],
    "nodes": [
      {"ref": "on_upload", "type": "trigger", "label": "Upload",
       "trigger_config": {"type": "internal_event", "event_key": "evidencerevision.created"}},
      {"ref": "run_now", "type": "trigger", "label": "Manual",
       "trigger_config": {"type": "manual"},
       "input_mapping": {"evidence_id": "evidence_id"}},
      {"ref": "take_payload", "type": "action", "label": "Payload",
       "action_config": {"type": "set_variables",
         "variables": {"evidence_id": "{{payload.new_values.evidence}}"}}},
      {"ref": "read_evidence", "type": "action", "label": "Read",
       "action_config": {"type": "read_objects", "model": "evidence", "mode": "first",
         "include": ["controls", "control_owner_emails"],
         "filters": {"operator": "and", "conditions": [
           {"op": "eq", "field": "id", "value": "{{evidence_id}}"}]}}},
      {"ref": "mail", "type": "action", "label": "Email",
       "action_config": {"type": "send_email",
         "recipients": "{{nodes.read_evidence.object.control_owner_emails}}",
         "subject": "Evidence updated",
         "body": "See {{app_url}}/evidences/{{evidence_id}}"}},
      {"ref": "done", "type": "end"}
    ],
    "edges": [
      {"source": "on_upload", "target": "take_payload"},
      {"source": "take_payload", "target": "read_evidence"},
      {"source": "run_now", "target": "read_evidence"},
      {"source": "read_evidence", "target": "mail"},
      {"source": "mail", "target": "done"}
    ]
  }
}

Build a workflow that matches the user request. Prefer Arabic+English labels when the prompt is Arabic.
"""


def generate_workflow_from_prompt(prompt: str) -> dict:
    """Ask Gemini for a workflow graph and return a preview payload with document."""
    prompt = (prompt or "").strip()
    if not prompt:
        raise ValueError("promptRequired")

    from .ai_provider import NoLLMAvailable, TruncatedCompletion, ai_available, get_llm_strict

    if not ai_available():
        raise ValueError("geminiNotConfigured")

    try:
        llm = get_llm_strict()
    except NoLLMAvailable:
        raise ValueError("geminiNotConfigured") from None

    try:
        raw = llm.generate(
            f"User request:\n{prompt}",
            schema=WORKFLOW_JSON_SCHEMA,
            system_prompt=_SYSTEM_PROMPT,
            max_output_tokens=8192,
        )
    except TruncatedCompletion:
        raise ValueError("geminiInvalidWorkflow") from None
    except Exception as e:  # noqa: BLE001
        logger.info("prompt_to_workflow: llm failed", error=str(e))
        raise ValueError("geminiRequestFailed") from e

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        logger.info("prompt_to_workflow: invalid json", error=str(e))
        raise ValueError("geminiInvalidWorkflow") from e

    if not isinstance(data, dict):
        raise ValueError("geminiInvalidWorkflow")

    # Model may return the library envelope or a bare workflow object.
    if "objects" in data and isinstance(data.get("objects"), dict):
        document = data
    else:
        document = _wrap_library(data)

    document = normalize_ai_document(document)
    errors = validate_ai_document(document)
    if errors:
        logger.info("prompt_to_workflow: validation failed", errors=errors[:5])
        raise ValueError("geminiInvalidWorkflow")

    workflow = ((document.get("objects") or {}).get("workflows") or [None])[0]
    name = (workflow or {}).get("name") or document.get("name") or "Generated workflow"
    description = (workflow or {}).get("description") or document.get("description") or ""

    return {
        "matched": True,
        "source": "llm",
        "prompt": prompt,
        "name": name,
        "description": description,
        "summary": build_summary(document),
        "document": document,
        "generated": True,
    }


def normalize_ai_document(document: dict) -> dict:
    """Stamp library metadata and app_url defaults."""
    doc = copy.deepcopy(document)
    workflows = (doc.get("objects") or {}).get("workflows") or []
    if not workflows:
        raise ValueError("geminiInvalidWorkflow")

    wf = workflows[0]
    if not isinstance(wf, dict):
        raise ValueError("geminiInvalidWorkflow")

    name = (wf.get("name") or doc.get("name") or "Generated workflow").strip()
    description = (wf.get("description") or doc.get("description") or "").strip()
    ref_id = _safe_ref(wf.get("ref_id") or name)
    wf["name"] = name
    wf["description"] = description
    wf["ref_id"] = ref_id
    wf.setdefault("schema_version", 1)

    doc["name"] = name
    doc["description"] = description
    doc.setdefault("locale", "en")
    doc.setdefault("version", 1)
    doc["ref_id"] = f"workflow-{ref_id}"
    doc["urn"] = f"urn:custom:risk:library:workflow-{ref_id}"
    wf["urn"] = f"{doc['urn']}:workflow:{ref_id}"

    app_url = (getattr(settings, "CISO_ASSISTANT_URL", "") or "").rstrip("/")
    graph = wf.setdefault("graph", {})
    variables = graph.setdefault("variables", [])
    if not isinstance(variables, list):
        graph["variables"] = []
        variables = graph["variables"]
    app_var = next((v for v in variables if isinstance(v, dict) and v.get("key") == "app_url"), None)
    if app_var is None:
        variables.append(
            {"key": "app_url", "type": "string", "default_value": app_url}
        )
    elif app_url and not (app_var.get("default_value") or "").strip():
        app_var["default_value"] = app_url
        app_var.setdefault("type", "string")

    return doc


def validate_ai_document(document: Any) -> list[str]:
    """Return human-readable errors if the AI document fails the v1 allowlist."""
    errors: list[str] = []
    if not isinstance(document, dict):
        return ["document must be a mapping"]

    objects = document.get("objects")
    if not isinstance(objects, dict):
        return ["missing objects"]
    workflows = objects.get("workflows")
    if not isinstance(workflows, list) or not workflows:
        return ["objects.workflows is empty"]

    for index, entry in enumerate(workflows):
        prefix = f"workflows[{index}]"
        if not isinstance(entry, dict):
            errors.append(f"{prefix}: not a mapping")
            continue
        graph = entry.get("graph")
        if not isinstance(graph, dict):
            errors.append(f"{prefix}: missing graph")
            continue
        errors.extend(_validate_graph_allowlist(graph, prefix))
    return errors


def assert_ai_document_allowed(document: Any) -> None:
    errors = validate_ai_document(document)
    if errors:
        raise ValueError("geminiInvalidWorkflow")


def build_summary(document: dict) -> list[dict]:
    """Compact step list for the confirm UI."""
    workflows = (document.get("objects") or {}).get("workflows") or []
    if not workflows:
        return []
    graph = workflows[0].get("graph") or {}
    summary = []
    for node in graph.get("nodes") or []:
        if not isinstance(node, dict):
            continue
        ntype = node.get("type") or ""
        detail = ntype
        if ntype == "trigger":
            cfg = node.get("trigger_config") or {}
            detail = cfg.get("type") or "trigger"
            if cfg.get("event_key"):
                detail = f"{detail}:{cfg['event_key']}"
        elif ntype == "action":
            detail = (node.get("action_config") or {}).get("type") or "action"
        elif ntype == "loop":
            detail = "loop"
        elif ntype == "condition":
            detail = "condition"
        summary.append(
            {
                "ref": node.get("ref") or "",
                "label": node.get("label") or node.get("ref") or "",
                "type": ntype,
                "detail": detail,
            }
        )
    return summary


def _wrap_library(workflow_obj: dict) -> dict:
    name = workflow_obj.get("name") or "Generated workflow"
    description = workflow_obj.get("description") or ""
    ref_id = _safe_ref(workflow_obj.get("ref_id") or name)
    return {
        "urn": f"urn:custom:risk:library:workflow-{ref_id}",
        "locale": "en",
        "ref_id": f"workflow-{ref_id}",
        "name": name,
        "description": description,
        "version": 1,
        "objects": {"workflows": [workflow_obj]},
    }


def _safe_ref(value: str) -> str:
    text = re.sub(r"[^a-z0-9_]+", "-", (value or "").lower()).strip("-_")
    text = re.sub(r"-+", "-", text).replace("-", "_")
    if not text or not text[0].isalpha():
        text = f"ai_{text}" if text else "ai_workflow"
    return text[:80]


def _validate_graph_allowlist(graph: dict, prefix: str) -> list[str]:
    errors: list[str] = []
    nodes = graph.get("nodes")
    edges = graph.get("edges")
    variables = graph.get("variables")

    if not isinstance(nodes, list) or not nodes:
        errors.append(f"{prefix}: graph.nodes is empty")
        return errors
    if not isinstance(edges, list):
        errors.append(f"{prefix}: graph.edges must be a list")
        return errors
    if variables is not None and not isinstance(variables, list):
        errors.append(f"{prefix}: graph.variables must be a list")

    refs: set[str] = set()
    has_trigger = False
    has_end = False

    for i, node in enumerate(nodes):
        np = f"{prefix}.nodes[{i}]"
        if not isinstance(node, dict):
            errors.append(f"{np}: not a mapping")
            continue
        ref = node.get("ref") or ""
        if not isinstance(ref, str) or not REF_RE.match(ref):
            errors.append(f"{np}: invalid ref '{ref}'")
        elif ref in refs:
            errors.append(f"{np}: duplicate ref '{ref}'")
        else:
            refs.add(ref)

        ntype = node.get("type")
        if ntype not in ALLOWED_NODE_TYPES:
            errors.append(f"{np}: node type '{ntype}' is not allowed")
            continue

        if ntype == "trigger":
            has_trigger = True
            cfg = node.get("trigger_config") or {}
            if not isinstance(cfg, dict):
                errors.append(f"{np}: trigger_config must be a mapping")
                continue
            ttype = cfg.get("type")
            if ttype not in ALLOWED_TRIGGER_TYPES:
                errors.append(f"{np}: trigger type '{ttype}' is not allowed")
            if ttype == "internal_event":
                event_key = cfg.get("event_key") or ""
                if event_key and event_key not in ALLOWED_EVENT_KEYS:
                    # Soft: warn via error so we stay predictable in v1
                    errors.append(f"{np}: event_key '{event_key}' is not allowed")
        elif ntype == "action":
            cfg = node.get("action_config") or {}
            if not isinstance(cfg, dict):
                errors.append(f"{np}: action_config must be a mapping")
                continue
            atype = cfg.get("type")
            if atype not in ALLOWED_ACTION_TYPES:
                errors.append(f"{np}: action type '{atype}' is not allowed")
            if atype == "read_objects":
                model = (cfg.get("model") or "").lower()
                if model and model not in ALLOWED_READ_MODELS:
                    errors.append(f"{np}: read model '{model}' is not allowed")
        elif ntype == "loop":
            cfg = node.get("loop_config") or {}
            if not isinstance(cfg, dict) or not cfg.get("collection"):
                errors.append(f"{np}: loop_config.collection is required")
        elif ntype == "condition":
            branches = node.get("branches") or []
            if not isinstance(branches, list) or not branches:
                errors.append(f"{np}: condition needs branches")
        elif ntype == "end":
            has_end = True

    if not has_trigger:
        errors.append(f"{prefix}: at least one trigger is required")
    if not has_end:
        errors.append(f"{prefix}: an end node is required")

    for i, edge in enumerate(edges):
        ep = f"{prefix}.edges[{i}]"
        if not isinstance(edge, dict):
            errors.append(f"{ep}: not a mapping")
            continue
        source = edge.get("source")
        target = edge.get("target")
        if source not in refs:
            errors.append(f"{ep}: unknown source '{source}'")
        if target not in refs:
            errors.append(f"{ep}: unknown target '{target}'")

    return errors
