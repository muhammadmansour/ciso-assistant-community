"""Authorable workflow actions/nodes exposed to Gemini for prompt→workflow.

Mirrors what the builder may create: ACTION_REGISTRY minus DISABLED_* from
validation.py (subprocess/task/event nodes and emit_event).
"""

from __future__ import annotations

from functools import lru_cache

from .validation import DISABLED_ACTION_TYPES, DISABLED_NODE_TYPES

# Short hints so the model knows required config shape without dumping code.
ACTION_HINTS: dict[str, str] = {
    "log": "message: string (templated)",
    "set_variables": "variables: {key: value} (templated)",
    "date_offset": "input, amount, unit, output variable key",
    "compute": "rows of {key, expression} using CEL",
    "create_object": "model + values object (see creatable models)",
    "upsert_objects": "model + match + values",
    "read_objects": "model, mode first|list, filters, optional include[]",
    "update_object": "model, id/filter, values",
    "attach_evidence": "evidence attachment config",
    "record_measurement": "measurement fields",
    "post_results": "post results payload",
    "send_email": "recipients, subject, body; optional layout{title,sections,details,buttons,footer}",
    "http_request": "method, url, headers, body; secrets via {{secrets.name}}",
    "provision_folder": "folder provisioning fields",
    "provision_user": "user provisioning fields",
    "manage_group_membership": "group membership changes",
    "ai_extract": "prompt + schema for extraction",
    "ai_generate": "prompt for free-text generation",
}

NODE_HINTS = {
    "trigger": "trigger_config.type = manual | internal_event (+ event_key for events)",
    "action": "action_config.type = one of the action types below",
    "condition": "branches[] with name + condition_groups or is_default",
    "loop": "loop_config.collection (templated list path)",
    "end": "terminal node; no config",
}


@lru_cache(maxsize=1)
def authorable_action_types() -> tuple[str, ...]:
    from .actions import ACTION_REGISTRY

    types = sorted(
        t for t in ACTION_REGISTRY.keys() if t and t not in DISABLED_ACTION_TYPES
    )
    return tuple(types)


def authorable_node_types() -> tuple[str, ...]:
    all_nodes = (
        "trigger",
        "action",
        "condition",
        "loop",
        "end",
        "subprocess",
        "task",
        "event",
    )
    disabled = {str(x) for x in DISABLED_NODE_TYPES}
    return tuple(n for n in all_nodes if n not in disabled)


def catalog_prompt_section() -> str:
    actions = authorable_action_types()
    nodes = authorable_node_types()
    action_lines = []
    for name in actions:
        hint = ACTION_HINTS.get(name, "see builder config")
        action_lines.append(f"- {name}: {hint}")
    node_lines = [f"- {n}: {NODE_HINTS.get(n, '')}" for n in nodes]
    return (
        "Authorable node types:\n"
        + "\n".join(node_lines)
        + "\n\nAuthorable action_config.type values (full platform set):\n"
        + "\n".join(action_lines)
        + "\n\nDo NOT use: emit_event, subprocess, task, or event wait nodes."
    )
