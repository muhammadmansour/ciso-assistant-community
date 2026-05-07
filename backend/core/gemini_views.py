"""HTTP endpoints that read from the Gemini developer API (not GRC models)."""

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import structlog

from core.gemini_file_search import (
    GEMINI_API_KEY,
    list_gemini_file_search_stores_metadata,
)

logger = structlog.get_logger(__name__)


class GeminiPolicyCollectionsView(APIView):
    """List policy chat collections as **Gemini File Search stores** (API-backed).

    This is intentionally **not** backed by ``GenericCollection`` or GRC DB rows.
    Consumers (e.g. GRC admin) can call this URL instead of a DB-driven
    ``policy-collections`` route when they want live Gemini store metadata.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        if not GEMINI_API_KEY:
            return Response(
                {
                    "detail": "GEMINI_API_KEY is not configured.",
                    "source": "gemini",
                    "collections": [],
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        include_counts = request.query_params.get("include_document_counts", "true").lower() not in (
            "0",
            "false",
            "no",
        )

        try:
            collections = list_gemini_file_search_stores_metadata(
                include_document_counts=include_counts,
            )
        except Exception as exc:
            logger.error("gemini_policy_collections_list_failed", error=str(exc))
            return Response(
                {
                    "detail": str(exc),
                    "source": "gemini",
                    "collections": [],
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(
            {
                "source": "gemini",
                "collections": collections,
            }
        )
