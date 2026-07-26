"""
Signal handlers for Gemini File Search lifecycle.

When a ``FileSearchTable`` row is deleted (either directly or via cascade from its
``EvidenceRevision``), we best-effort delete the durable File Search Store document
so it doesn't accumulate as an orphaned object in the store.
"""

import structlog
from django.db.models.signals import post_delete
from django.dispatch import receiver

from core.models import FileSearchTable

logger = structlog.get_logger(__name__)


@receiver(post_delete, sender=FileSearchTable)
def delete_gemini_store_document(sender, instance: FileSearchTable, **kwargs):
    """Best-effort: delete every File Search Store document for this revision.

    A split (large-PDF) upload produces multiple chunk documents, so we delete
    them all. Failures are logged and swallowed — the local row is already gone,
    and any leftover document can be reconciled by a periodic sweep job.
    """
    try:
        document_names = instance.all_document_ids()
    except Exception:
        document_names = []
    if not document_names:
        return

    try:
        from core.gemini_file_search import get_gemini_client

        client = get_gemini_client()
        if not client:
            return
        client.delete_store_documents(document_names)
    except Exception as e:
        logger.warning(
            "Failed to delete Gemini store document(s) on FileSearchTable delete",
            document_count=len(document_names),
            error=str(e),
        )
