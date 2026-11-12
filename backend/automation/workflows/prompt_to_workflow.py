"""Generate a new workflow library document from a natural-language prompt.

Taskade-style: Gemini may use the full authorable action catalog. Soft repair
+ warnings; hard-fail only when there is no usable graph. Drafts open in the
builder for the user to finish/publish.
"""

from __future__ import annotations

import copy
import json
import re
from typing import Any

import structlog
from django.conf import settings

from .ai_action_catalog import (
    authorable_action_types,
    authorable_node_types,
    catalog_prompt_section,
)
from .validation import DISABLED_ACTION_TYPES, DISABLED_NODE_TYPES

logger = structlog.get_logger(__name__)

# Keep in sync with graph.REF_RE (avoid importing graph → models at module load).
REF_RE = re.compile(r"^[a-z][a-z0-9_]{0,99}$")
EVENT_KEY_RE = re.compile(r"^[a-z][a-z0-9_]*\.(created|updated|deleted)$")

ALLOWED_NODE_TYPES = frozenset(authorable_node_types())
ALLOWED_TRIGGER_TYPES = frozenset({"manual", "internal_event"})

ACTION_TYPE_ALIASES = {
    "email": "send_email",
    "sendmail": "send_email",
    "send_mail": "send_email",
    "mail": "send_email",
    "set_variable": "set_variables",
    "setvariables": "set_variables",
    "read": "read_objects",
    "read_object": "read_objects",
    "fetch": "read_objects",
    "get_objects": "read_objects",
    "create": "create_object",
    "update": "update_object",
    "http": "http_request",
    "webhook": "http_request",
    "request": "http_request",
    "logger": "log",
    "print": "log",
    "ai": "ai_generate",
}
MODEL_ALIASES = {
    "incidents": "incident",
    "evidences": "evidence",
    "controls": "appliedcontrol",
    "applied_control": "appliedcontrol",
    "appliedcontrols": "appliedcontrol",
    "compliance_assessment": "complianceassessment",
    "assessments": "complianceassessment",
    "vulnerabilities": "vulnerability",
    "findings": "finding",
    "assets": "asset",
    "users": "user",
    "tasks": "task",
}

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


class PromptWorkflowError(ValueError):
    """Generation failure with a stable code and optional details."""

    def __init__(self, code: str, details: list[str] | None = None):
        self.code = code
        self.details = details or []
        super().__init__(code)


def _system_prompt() -> str:
    return f"""You design GRC automation workflows for CISO Assistant.

Return JSON for ONE workflow object with name, description, optional ref_id, and graph
{{variables, nodes, edges}}. Do not wrap in a library envelope.

{catalog_prompt_section()}

Trigger types: manual, internal_event (with event_key like incident.created, evidencerevision.created,
complianceassessment.updated, evidence.updated, appliedcontrol.updated).

Patterns:
- Event trigger → set_variables from payload (often {{payload.object_id}}) → actions → end.
- Always include a manual trigger for test runs when sensible.
- Always include an end node; wire every branch.
- Node refs: lowercase snake_case (no hyphens).
- Use {{app_url}} in links; include an app_url string variable.
- Prefer send_email layout for notifications; hardcoded recipient emails are fine.
- You MAY use create_object, update_object, http_request, ai_generate, compute, etc. when the user asks.

Incident email example (abbreviated):
{{
  "name": "New incident - notify security",
  "description": "When an incident is created, email security.",
  "ref_id": "ai-incident-security",
  "graph": {{
    "variables": [
      {{"key": "incident_id", "type": "string", "default_value": ""}},
      {{"key": "app_url", "type": "string", "default_value": ""}}
    ],
    "nodes": [
      {{"ref": "on_incident", "type": "trigger", "label": "Incident created",
       "trigger_config": {{"type": "internal_event", "event_key": "incident.created"}}}},
      {{"ref": "run_now", "type": "trigger", "label": "Manual",
       "trigger_config": {{"type": "manual"}},
       "input_mapping": {{"incident_id": "incident_id"}}}},
      {{"ref": "take_payload", "type": "action", "label": "Payload",
       "action_config": {{"type": "set_variables",
         "variables": {{"incident_id": "{{{{payload.object_id}}}}"}}}}}},
      {{"ref": "read_incident", "type": "action", "label": "Read",
       "action_config": {{"type": "read_objects", "model": "incident", "mode": "first",
         "filters": {{"operator": "and", "conditions": [
           {{"op": "eq", "field": "id", "value": "{{{{incident_id}}}}"}}]}}}}}},
      {{"ref": "mail_security", "type": "action", "label": "Email",
       "action_config": {{"type": "send_email",
         "recipients": "security@example.com",
         "subject": "New incident: {{{{nodes.read_incident.object.name}}}}",
         "body": "Severity: {{{{nodes.read_incident.object.severity}}}}\\n{{{{app_url}}}}/incidents/{{{{incident_id}}}}"}}}},
      {{"ref": "done", "type": "end"}}
    ],
    "edges": [
      {{"source": "on_incident", "target": "take_payload"}},
      {{"source": "take_payload", "target": "read_incident"}},
      {{"source": "run_now", "target": "read_incident"}},
      {{"source": "read_incident", "target": "mail_security"}},
      {{"source": "mail_security", "target": "done"}}
    ]
  }}
}}

Build a workflow that matches the user request. Prefer Arabic+English labels when the prompt is Arabic.
Draft graphs may be imperfect — still produce a complete graph with triggers, actions, edges, and end.
"""


def generate_workflow_from_prompt(prompt: str) -> dict:
    """Ask Gemini for a workflow graph; return a draftable document + warnings."""
    prompt = (prompt or "").strip()
    if not prompt:
        raise PromptWorkflowError("promptRequired")

    from .ai_provider import NoLLMAvailable, TruncatedCompletion, ai_available, get_llm_strict

    if not ai_available():
        raise PromptWorkflowError("geminiNotConfigured")

    try:
        llm = get_llm_strict()
    except NoLLMAvailable:
        raise PromptWorkflowError("geminiNotConfigured") from None

    try:
        raw = llm.generate(
            f"User request:\n{prompt}",
            schema=WORKFLOW_JSON_SCHEMA,
            system_prompt=_system_prompt(),
            max_output_tokens=8192,
        )
    except TruncatedCompletion:
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["The model answer was cut off. Try a shorter prompt."],
        ) from None
    except Exception as e:  # noqa: BLE001
        logger.info("prompt_to_workflow: llm failed", error=str(e))
        raise PromptWorkflowError("geminiRequestFailed") from e

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        logger.info("prompt_to_workflow: invalid json", error=str(e))
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Gemini returned invalid JSON."],
        ) from e

    if not isinstance(data, dict):
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Gemini returned a non-object response."],
        )

    if "objects" in data and isinstance(data.get("objects"), dict):
        document = data
    elif isinstance(data.get("graph"), dict):
        document = _wrap_library(data)
    elif isinstance(data.get("workflow"), dict):
        document = _wrap_library(data["workflow"])
    else:
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Gemini response was missing a workflow graph."],
        )

    document = normalize_ai_document(document)
    document, warnings = sanitize_ai_document(document)

    fatal = draft_blocking_errors(document)
    if fatal:
        logger.info("prompt_to_workflow: unusable graph", errors=fatal[:8])
        raise PromptWorkflowError("geminiInvalidWorkflow", fatal[:8])

    workflow = ((document.get("objects") or {}).get("workflows") or [None])[0]
    name = (workflow or {}).get("name") or document.get("name") or "Generated workflow"
    description = (
        (workflow or {}).get("description") or document.get("description") or ""
    )

    return {
        "matched": True,
        "source": "llm",
        "prompt": prompt,
        "name": name,
        "description": description,
        "summary": build_summary(document),
        "document": document,
        "generated": True,
        "warnings": warnings,
    }


def normalize_ai_document(document: dict) -> dict:
    """Stamp library metadata and app_url defaults."""
    doc = copy.deepcopy(document)
    workflows = (doc.get("objects") or {}).get("workflows") or []
    if not workflows:
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Generated document has no workflow."],
        )

    wf = workflows[0]
    if not isinstance(wf, dict):
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Generated workflow entry is invalid."],
        )

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
    if not isinstance(graph, dict):
        raise PromptWorkflowError(
            "geminiInvalidWorkflow",
            ["Generated workflow is missing a graph."],
        )
    variables = graph.setdefault("variables", [])
    if not isinstance(variables, list):
        graph["variables"] = []
        variables = graph["variables"]
    app_var = next(
        (v for v in variables if isinstance(v, dict) and v.get("key") == "app_url"),
        None,
    )
    if app_var is None:
        variables.append({"key": "app_url", "type": "string", "default_value": app_url})
    elif app_url and not str(app_var.get("default_value") or "").strip():
        app_var["default_value"] = app_url
        app_var.setdefault("type", "string")

    return doc


def sanitize_ai_document(document: dict) -> tuple[dict, list[str]]:
    """Repair common mistakes; strip disabled types; collect soft warnings."""
    warnings: list[str] = []
    doc = repair_ai_document(document)
    workflows = (doc.get("objects") or {}).get("workflows") or []
    if not workflows or not isinstance(workflows[0], dict):
        return doc, warnings
    graph = workflows[0].get("graph")
    if not isinstance(graph, dict):
        return doc, warnings

    authorable_actions = set(authorable_action_types())
    disabled_nodes = {str(x) for x in DISABLED_NODE_TYPES}
    nodes = list(graph.get("nodes") or [])
    edges = list(graph.get("edges") or [])
    kept: list[dict] = []
    dropped_refs: set[str] = set()

    for node in nodes:
        if not isinstance(node, dict):
            continue
        ntype = node.get("type")
        if ntype in disabled_nodes:
            warnings.append(
                f"Removed unsupported node '{node.get('ref')}' (type {ntype})."
            )
            dropped_refs.add(str(node.get("ref") or ""))
            continue
        if ntype == "action":
            cfg = node.get("action_config") if isinstance(node.get("action_config"), dict) else {}
            atype = cfg.get("type")
            if atype in DISABLED_ACTION_TYPES or (
                atype and atype not in authorable_actions
            ):
                warnings.append(
                    f"Removed unsupported action '{node.get('ref')}' ({atype})."
                )
                dropped_refs.add(str(node.get("ref") or ""))
                continue
        if ntype == "trigger":
            cfg = node.get("trigger_config") if isinstance(node.get("trigger_config"), dict) else {}
            ttype = cfg.get("type")
            if ttype and ttype not in ALLOWED_TRIGGER_TYPES:
                warnings.append(
                    f"Trigger '{node.get('ref')}' has unusual type '{ttype}' — edit in builder."
                )
            event_key = str(cfg.get("event_key") or "")
            if ttype == "internal_event" and event_key and not EVENT_KEY_RE.match(event_key):
                warnings.append(
                    f"Trigger '{node.get('ref')}' event_key '{event_key}' may need editing."
                )
        kept.append(node)

    if dropped_refs:
        edges = [
            e
            for e in edges
            if isinstance(e, dict)
            and e.get("source") not in dropped_refs
            and e.get("target") not in dropped_refs
        ]

    # Re-ensure end after drops.
    if kept and not any(n.get("type") == "end" for n in kept):
        kept.append({"ref": "done", "type": "end"})
        warnings.append("Added a missing end node.")
        end_ref = "done"
        sources = {e.get("source") for e in edges if isinstance(e, dict)}
        for node in kept:
            if node.get("type") != "end" and node.get("ref") not in sources:
                edges.append({"source": node["ref"], "target": end_ref})

    graph["nodes"] = kept
    graph["edges"] = edges
    if not any(n.get("type") == "trigger" for n in kept):
        warnings.append("No trigger found — add one in the builder before publishing.")
    return doc, warnings


def repair_ai_document(document: dict) -> dict:
    """Fix common Gemini mistakes before soft sanitize."""
    doc = copy.deepcopy(document)
    workflows = (doc.get("objects") or {}).get("workflows") or []
    if not workflows or not isinstance(workflows[0], dict):
        return doc
    wf = workflows[0]
    graph = wf.get("graph")
    if not isinstance(graph, dict):
        return doc
    wf["graph"] = _repair_graph(graph)
    return doc


def _repair_graph(graph: dict) -> dict:
    nodes = graph.get("nodes")
    edges = graph.get("edges")
    if not isinstance(nodes, list):
        nodes = []
    if not isinstance(edges, list):
        edges = []

    cleaned_nodes: list[dict] = []
    ref_map: dict[str, str] = {}
    used_refs: set[str] = set()

    for node in nodes:
        if not isinstance(node, dict):
            continue
        original_ref = str(node.get("ref") or "")
        ref = _unique_ref(
            _safe_ref(original_ref or node.get("label") or "step"), used_refs
        )
        used_refs.add(ref)
        if original_ref:
            ref_map[original_ref] = ref
        ref_map[ref] = ref
        node = copy.deepcopy(node)
        node["ref"] = ref

        ntype = str(node.get("type") or "").strip().lower()
        if ntype in {"email", "mail", "send_email"}:
            cfg = (
                node.get("action_config")
                if isinstance(node.get("action_config"), dict)
                else {}
            )
            cfg = dict(cfg)
            cfg.setdefault("type", "send_email")
            if "recipients" not in cfg and node.get("recipients"):
                cfg["recipients"] = node.get("recipients")
            node["type"] = "action"
            node["action_config"] = cfg
            ntype = "action"
        else:
            node["type"] = ntype

        if ntype == "trigger":
            cfg = (
                node.get("trigger_config")
                if isinstance(node.get("trigger_config"), dict)
                else {}
            )
            cfg = dict(cfg)
            ttype = str(cfg.get("type") or "").strip().lower()
            if ttype in {"event", "on_event", "internal", "webhook"}:
                ttype = "internal_event"
            if ttype not in ALLOWED_TRIGGER_TYPES and cfg.get("event_key"):
                ttype = "internal_event"
            cfg["type"] = ttype
            if ttype == "internal_event":
                event_key = str(cfg.get("event_key") or "").strip().lower().replace("-", "")
                if event_key and "." not in event_key and "_" in event_key:
                    left, _, right = event_key.rpartition("_")
                    if right in {"created", "updated", "deleted"} and left:
                        event_key = f"{left}.{right}"
                cfg["event_key"] = event_key
            node["trigger_config"] = cfg
        elif ntype == "action":
            cfg = (
                node.get("action_config")
                if isinstance(node.get("action_config"), dict)
                else {}
            )
            cfg = dict(cfg)
            atype = str(cfg.get("type") or "").strip().lower()
            atype = ACTION_TYPE_ALIASES.get(atype, atype)
            cfg["type"] = atype
            if atype == "read_objects":
                model = str(cfg.get("model") or "").strip().lower().replace("-", "")
                model = MODEL_ALIASES.get(model, model)
                cfg["model"] = model
                cfg.setdefault("mode", "first")
            elif atype == "send_email":
                recipients = cfg.get("recipients")
                if isinstance(recipients, list):
                    cfg["recipients"] = ", ".join(str(x) for x in recipients if x)
                elif recipients is not None:
                    cfg["recipients"] = str(recipients)
                if not cfg.get("subject"):
                    cfg["subject"] = "Workflow notification"
                if not cfg.get("body"):
                    cfg["body"] = "A workflow notification was triggered."
            elif atype == "set_variables":
                variables = cfg.get("variables")
                if isinstance(variables, list):
                    mapped = {}
                    for item in variables:
                        if isinstance(item, dict) and item.get("key") is not None:
                            mapped[str(item["key"])] = item.get("value", "")
                    cfg["variables"] = mapped
            node["action_config"] = cfg
        elif ntype == "loop":
            cfg = (
                node.get("loop_config")
                if isinstance(node.get("loop_config"), dict)
                else {}
            )
            node["loop_config"] = dict(cfg)

        cleaned_nodes.append(node)

    end_refs = [n["ref"] for n in cleaned_nodes if n.get("type") == "end"]
    if not end_refs:
        end_ref = _unique_ref("done", used_refs)
        used_refs.add(end_ref)
        cleaned_nodes.append({"ref": end_ref, "type": "end"})
        end_refs = [end_ref]
    end_ref = end_refs[0]

    cleaned_edges: list[dict] = []
    for edge in edges:
        if not isinstance(edge, dict):
            continue
        source = ref_map.get(
            str(edge.get("source") or ""),
            _safe_ref(str(edge.get("source") or "")),
        )
        target = ref_map.get(
            str(edge.get("target") or ""),
            _safe_ref(str(edge.get("target") or "")),
        )
        if not source or not target:
            continue
        item = {"source": source, "target": target}
        if edge.get("source_branch"):
            item["source_branch"] = str(edge["source_branch"])
        cleaned_edges.append(item)

    sources = {e["source"] for e in cleaned_edges}
    for node in cleaned_nodes:
        ref = node["ref"]
        if node.get("type") == "end":
            continue
        if ref not in sources:
            cleaned_edges.append({"source": ref, "target": end_ref})

    graph["nodes"] = cleaned_nodes
    graph["edges"] = cleaned_edges
    if not isinstance(graph.get("variables"), list):
        graph["variables"] = []
    return graph


def _unique_ref(base: str, used: set[str]) -> str:
    ref = base if REF_RE.match(base) else _safe_ref(base)
    if ref not in used:
        return ref
    i = 2
    while f"{ref}_{i}" in used:
        i += 1
    return f"{ref}_{i}"


def draft_blocking_errors(document: Any) -> list[str]:
    """Only structural problems that make import impossible."""
    if not isinstance(document, dict):
        return ["document must be a mapping"]
    objects = document.get("objects")
    if not isinstance(objects, dict):
        return ["missing objects"]
    workflows = objects.get("workflows")
    if not isinstance(workflows, list) or not workflows:
        return ["objects.workflows is empty"]
    entry = workflows[0]
    if not isinstance(entry, dict):
        return ["workflow entry invalid"]
    graph = entry.get("graph")
    if not isinstance(graph, dict):
        return ["missing graph"]
    nodes = graph.get("nodes")
    if not isinstance(nodes, list) or not nodes:
        return ["graph.nodes is empty"]
    if not any(isinstance(n, dict) and n.get("type") != "end" for n in nodes):
        return ["graph has no actionable nodes"]
    return []


def assert_ai_document_allowed(document: Any) -> None:
    """Soft gate: only block unusable graphs (disabled types already stripped)."""
    document, _warnings = sanitize_ai_document(document) if isinstance(document, dict) else (document, [])
    errors = draft_blocking_errors(document)
    if errors:
        raise PromptWorkflowError("geminiInvalidWorkflow", errors[:8])


def prepare_ai_document(document: dict) -> tuple[dict, list[str]]:
    """Normalize + sanitize for install; return document and warnings."""
    doc = normalize_ai_document(document)
    doc, warnings = sanitize_ai_document(doc)
    errors = draft_blocking_errors(doc)
    if errors:
        raise PromptWorkflowError("geminiInvalidWorkflow", errors[:8])
    return doc, warnings


def build_summary(document: dict) -> list[dict]:
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


def validate_ai_document(document: Any) -> list[str]:
    """Legacy name: structural blocking errors only (soft catalog)."""
    return draft_blocking_errors(document)
