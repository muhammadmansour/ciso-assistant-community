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
    """Best-effort: delete the corresponding File Search Store document.

    Failures are logged and swallowed — the local row is already gone, and the
    upstream document (if any) can be reconciled by a periodic sweep job.
    """
    document_name = getattr(instance, 'gemini_document_id', '') or ''
    if not document_name.startswith('fileSearchStores/'):
        return

    try:
        from core.gemini_file_search import get_gemini_client

        client = get_gemini_client()
        if not client:
            return
        client.delete_store_document(document_name)
    except Exception as e:
        logger.warning(
            "Failed to delete Gemini store document on FileSearchTable delete",
            document_name=document_name,
            error=str(e),
        )
