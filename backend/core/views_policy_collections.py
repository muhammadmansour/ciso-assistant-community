"""Policy collections widget: list Gemini File Search stores and chat (no GRC DB)."""

import uuid

from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from core.gemini_file_search import (
    list_policy_collections_from_gemini,
    policy_chat_with_file_search_stores,
    GEMINI_ENABLED,
)


def _policy_chat_cache_key(user_id, session_id: str) -> str:
    return f"policy_widget_chat:v1:{user_id}:{session_id}"


def _history_to_contents(history):
    """Build ``types.Content`` list from simple ``(role, text)`` pairs."""
    from google.genai import types

    out = []
    for role, text in history:
        r = "user" if role == "user" else "model"
        out.append(types.Content(role=r, parts=[types.Part(text=text)]))
    return out


class PolicyCollectionsGeminiView(APIView):
    """GET: File Search stores and documents from Google Gemini API."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not GEMINI_ENABLED:
            return Response(
                {
                    "success": False,
                    "message": "GEMINI_API_KEY is not configured.",
                    "data": [],
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        try:
            data = list_policy_collections_from_gemini()
            return Response({"success": True, "data": data})
        except ValueError as e:
            return Response(
                {"success": False, "message": str(e), "data": []},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": f"Failed to list Gemini file search stores: {e}",
                    "data": [],
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )


class PolicyCollectionsChatView(APIView):
    """POST: grounded chat over selected File Search stores (Gemini)."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not GEMINI_ENABLED:
            return Response(
                {
                    "success": False,
                    "message": "GEMINI_API_KEY is not configured.",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        body = request.data if isinstance(request.data, dict) else {}
        message = (body.get("message") or "").strip()
        store_ids = body.get("storeIds") or body.get("store_ids") or []
        if isinstance(store_ids, str):
            store_ids = [store_ids]
        session_id = body.get("sessionId") or body.get("session_id")

        if not message:
            return Response(
                {"success": False, "message": "message is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not store_ids:
            return Response(
                {"success": False, "message": "storeIds is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not session_id or not isinstance(session_id, str):
            session_id = str(uuid.uuid4())

        cache_key = _policy_chat_cache_key(request.user.pk, session_id)
        history = cache.get(cache_key) or []  # list of ["user"|"model", str]

        try:
            history.append(("user", message))
            contents = _history_to_contents(history)
            result = policy_chat_with_file_search_stores(
                list(store_ids),
                contents,
            )
            reply = result.get("text") or ""
            history.append(("model", reply))
            cache.set(cache_key, history, timeout=60 * 60)

            return Response(
                {
                    "success": True,
                    "message": reply,
                    "sessionId": session_id,
                    "sources": result.get("sources") or [],
                }
            )
        except ValueError as e:
            return Response(
                {"success": False, "message": str(e), "sessionId": session_id},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": f"Gemini chat failed: {e}",
                    "sessionId": session_id,
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )
