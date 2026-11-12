"""Map a natural-language request to the best bundled gallery workflow kit.

Muhkam AI (when available / required) picks a catalog id. Keyword matching is
the fallback when the LLM is not required. Never invents a free-form graph
here — install always loads the bundled YAML for the chosen kit.
"""

from __future__ import annotations

import json

import structlog

from .catalog import get_template, list_templates, load_template_document, match_templates

logger = structlog.get_logger(__name__)

PROMPT_SCHEMA = {
    "type": "object",
    "properties": {
        "template_id": {
            "type": "string",
            "description": "One of the catalog ids, or empty if none fit.",
        },
        "name": {"type": "string"},
        "description": {"type": "string"},
        "rationale": {"type": "string"},
    },
    "required": ["template_id", "name", "description"],
}


def prompt_to_template(prompt: str, *, require_llm: bool = False) -> dict:
    prompt = (prompt or "").strip()
    if not prompt:
        raise ValueError("promptRequired")

    matches = match_templates(prompt)
    catalog = list_templates()

    if require_llm:
        from .ai_provider import ai_available

        if not ai_available():
            raise ValueError("geminiNotConfigured")
        llm_pick = _ask_llm(prompt, catalog) if catalog else None
        if llm_pick is None:
            raise ValueError("geminiRequestFailed")
        if not llm_pick.get("template_id") or not get_template(llm_pick["template_id"]):
            return {
                "matched": False,
                "source": "llm",
                "prompt": prompt,
                "suggestions": matches,
                "templates": catalog,
                "message": (
                    "No gallery kit matched that request. Browse the kits below "
                    "or refine the prompt."
                ),
            }
        chosen_id = llm_pick["template_id"]
        name = llm_pick.get("name") or ""
        description = llm_pick.get("description") or ""
        rationale = llm_pick.get("rationale") or ""
        source = "llm"
    else:
        llm_pick = _ask_llm(prompt, catalog) if catalog else None
        if llm_pick and llm_pick.get("template_id") and get_template(llm_pick["template_id"]):
            chosen_id = llm_pick["template_id"]
            name = llm_pick.get("name") or ""
            description = llm_pick.get("description") or ""
            rationale = llm_pick.get("rationale") or ""
            source = "llm"
        elif matches:
            chosen_id = matches[0]["id"]
            name = matches[0]["name"]
            description = matches[0]["description"]
            rationale = "Best keyword match in the workflow template gallery."
            source = "catalog"
        else:
            return {
                "matched": False,
                "source": "none",
                "prompt": prompt,
                "suggestions": matches,
                "templates": catalog,
                "message": (
                    "No bundled template matched. Browse the gallery or refine the "
                    "prompt."
                ),
            }

    template = get_template(chosen_id)
    document = load_template_document(chosen_id)
    # Optional rename for display; install still uses the kit document.
    display_name = name or template.name
    display_description = description or template.description

    return {
        "matched": True,
        "source": source,
        "prompt": prompt,
        "template_id": chosen_id,
        "name": display_name,
        "description": display_description,
        "rationale": rationale,
        "category": template.category,
        "tags": list(template.tags),
        "document": document,
        "suggestions": matches,
    }


def _ask_llm(prompt: str, catalog: list[dict]) -> dict | None:
    try:
        from .ai_provider import NoLLMAvailable, get_llm_strict
    except Exception:  # noqa: BLE001
        return None
    try:
        llm = get_llm_strict()
    except NoLLMAvailable:
        return None
    except Exception as e:  # noqa: BLE001
        logger.info("prompt_to_template: llm unavailable", error=str(e))
        return None

    catalog_lines = "\n".join(
        f"- id={t['id']}: {t['name']} — {t['description']}" for t in catalog
    )
    system = (
        "You map a GRC automation request to ONE bundled workflow template from "
        "the gallery catalog. Reply with JSON only. template_id must be an id "
        "from the catalog, or an empty string if nothing fits. You may improve "
        "name and description for the tenant; do not invent new graph nodes or "
        "new templates."
    )
    user = f"Catalog:\n{catalog_lines}\n\nUser request:\n{prompt}"
    try:
        raw = llm.generate(
            user,
            schema=PROMPT_SCHEMA,
            system_prompt=system,
            max_output_tokens=1024,
        )
        data = json.loads(raw)
        if not isinstance(data, dict):
            return None
        return data
    except Exception as e:  # noqa: BLE001
        logger.info("prompt_to_template: llm failed", error=str(e))
        return None
