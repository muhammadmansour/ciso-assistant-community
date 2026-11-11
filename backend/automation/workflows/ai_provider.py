"""The AI steps' model client, backed by the Gemini key the rest of the app
uses. Same surface as upstream's chat.providers (get_llm_strict and the token
helpers), so ai_call_task reads the same either way."""

import os

import structlog
from django.conf import settings

logger = structlog.get_logger(__name__)

#: A reasoning model on an unbounded field has no stopping condition of its
#: own, so an unattended call always carries a ceiling.
DEFAULT_MAX_OUTPUT_TOKENS = 2048


class TruncatedCompletion(Exception):
    """The model stopped because it ran out of tokens, not because it finished."""


class NoLLMAvailable(Exception):
    """No AI provider is configured or reachable."""


def llm_max_output_tokens() -> int | None:
    configured = getattr(settings, "LLM_MAX_OUTPUT_TOKENS", None)
    return int(configured) if configured else None


def unattended_max_output_tokens() -> int:
    return llm_max_output_tokens() or DEFAULT_MAX_OUTPUT_TOKENS


def words_to_output_tokens(words: int) -> int:
    """Under two tokens a word, plus slack for a preamble."""
    return max(unattended_max_output_tokens(), words * 2 + 256)


def workflow_model() -> str:
    return os.getenv("GEMINI_WORKFLOW_MODEL") or "gemini-2.5-flash"


class GeminiLLM:
    def __init__(self, client, model: str):
        self.client = client
        self.model = model

    def _config(self, system_prompt, max_output_tokens, schema, with_schema):
        from google.genai import types

        kwargs = {
            "system_instruction": system_prompt or None,
            "max_output_tokens": max_output_tokens,
            "temperature": 0.2,
        }
        # Thinking tokens count against max_output_tokens on 2.5 models; flash
        # can turn it off, pro cannot.
        if "flash" in self.model:
            kwargs["thinking_config"] = types.ThinkingConfig(thinking_budget=0)
        if schema is not None:
            kwargs["response_mime_type"] = "application/json"
            if with_schema:
                kwargs["response_json_schema"] = schema
        return types.GenerateContentConfig(**kwargs)

    def generate(
        self,
        prompt: str,
        context: str = "",
        schema: dict | None = None,
        system_prompt: str | None = None,
        max_output_tokens: int | None = None,
    ) -> str:
        contents = f"{prompt}\n\n{context}" if context else prompt
        tokens = max_output_tokens or unattended_max_output_tokens()
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents,
                config=self._config(system_prompt, tokens, schema, True),
            )
        except Exception as e:
            if schema is None:
                raise
            # Gemini accepts a subset of JSON Schema; the parser still checks
            # the full schema, so fall back to plain JSON mode.
            logger.info("gemini rejected the response schema", error=str(e))
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents,
                config=self._config(system_prompt, tokens, schema, False),
            )

        candidates = getattr(response, "candidates", None) or []
        finish = getattr(candidates[0], "finish_reason", None) if candidates else None
        if finish is not None and "MAX_TOKENS" in str(finish):
            raise TruncatedCompletion(
                f"the model's answer hit the {tokens}-token ceiling "
                "(LLM_MAX_OUTPUT_TOKENS)"
            )
        text = getattr(response, "text", None) or ""
        if not text and candidates:
            try:
                text = "".join(
                    getattr(p, "text", "") or "" for p in candidates[0].content.parts
                )
            except (AttributeError, TypeError):
                text = ""
        return text


def get_llm_strict() -> GeminiLLM:
    from core.gemini_file_search import get_genai_raw_client

    client = get_genai_raw_client()
    if client is None:
        raise NoLLMAvailable("GEMINI_API_KEY is not configured")
    return GeminiLLM(client, workflow_model())


def ai_available() -> bool:
    from core.gemini_file_search import GEMINI_API_KEY

    return bool(GEMINI_API_KEY)
