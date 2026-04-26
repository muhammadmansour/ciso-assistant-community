"""
Background tasks for Gemini File Search integration.

The task uploads each evidence revision to the configured **File Search Store**,
producing a durable ``gemini_document_id`` that does not expire (unlike Files API
IDs, which are transient and only refreshed at request time).
"""

import structlog
from django.utils import timezone
from huey.contrib.djhuey import task

from core.models import FileSearchTable, EvidenceRevision
from core.gemini_file_search import get_gemini_client

logger = structlog.get_logger(__name__)


@task()
def upload_evidence_to_gemini(evidence_revision_id: str):
    """Upload an evidence file to the Gemini File Search Store.

    Idempotent: if a durable ``gemini_document_id`` already exists for the revision,
    the task is a no-op. The transient Files API ID is *not* refreshed here — that
    happens lazily at Muraji request time when the stored ID is stale.
    """
    try:
        revision = EvidenceRevision.objects.get(id=evidence_revision_id)

        if not revision.attachment:
            logger.info(
                "Evidence revision has no attachment, skipping Gemini upload",
                revision_id=evidence_revision_id,
            )
            return

        file_search, created = FileSearchTable.objects.get_or_create(
            evidence_revision=revision,
            defaults={
                'upload_status': FileSearchTable.UploadStatus.PENDING,
                'gemini_file_id': '',
                'gemini_document_id': '',
                'gemini_store_id': '',
            },
        )

        # Skip if a durable store document is already recorded.
        if not created and file_search.has_durable_document():
            logger.info(
                "Evidence already indexed in File Search Store",
                revision_id=evidence_revision_id,
                gemini_document_id=file_search.gemini_document_id,
            )
            return

        client = get_gemini_client()
        if not client:
            logger.warning("Gemini client not configured, skipping upload")
            return

        if not client.store_name:
            logger.warning(
                "GEMINI_FILE_SEARCH_STORE_NAME is not set — cannot index evidence durably",
                revision_id=evidence_revision_id,
            )
            return

        file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
        file_search.error_message = None
        file_search.save()

        logger.info(
            "Starting Gemini File Search Store upload",
            revision_id=evidence_revision_id,
            evidence_name=revision.evidence.name,
        )

        file_path = revision.attachment.path
        display_name = f"{revision.evidence.name} - {revision.evidence.filename()}"

        result = client.upload_to_store_and_wait(
            file_path=file_path,
            display_name=display_name,
            max_wait_seconds=300,
            poll_interval=3,
        )

        if result['status'] == 'completed':
            file_search.gemini_document_id = result.get('gemini_document_id', '')
            file_search.gemini_store_id = result.get('gemini_store_id', '')
            file_search.operation_id = result.get('operation_id', '') or file_search.operation_id
            file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
            file_search.error_message = None
            file_search.save()

            logger.info(
                "Gemini File Search Store upload completed",
                revision_id=evidence_revision_id,
                gemini_document_id=file_search.gemini_document_id,
                evidence_name=revision.evidence.name,
            )
        else:
            error_msg = result.get('error', 'Unknown error')
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = error_msg
            file_search.save()

            logger.error(
                "Gemini File Search Store upload failed",
                revision_id=evidence_revision_id,
                error=error_msg,
                evidence_name=revision.evidence.name,
            )

    except EvidenceRevision.DoesNotExist:
        logger.error(
            "Evidence revision not found",
            revision_id=evidence_revision_id,
        )
    except Exception as e:
        logger.error(
            "Failed to upload evidence to Gemini",
            revision_id=evidence_revision_id,
            error=str(e),
        )
        try:
            file_search = FileSearchTable.objects.get(evidence_revision_id=evidence_revision_id)
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = str(e)
            file_search.save()
        except Exception:
            pass


def refresh_files_api_id(file_search: FileSearchTable) -> bool:
    """Re-upload the local attachment to the Files API and refresh the transient ID.

    Synchronous helper used at Muraji request time when ``is_gemini_file_fresh()``
    returns False. Returns True if the file_search row now has a fresh Files API ID,
    False otherwise.
    """
    revision = file_search.evidence_revision
    if not revision or not revision.attachment:
        return False

    client = get_gemini_client()
    if not client:
        return False

    try:
        file_path = revision.attachment.path
        display_name = f"{revision.evidence.name} - {revision.evidence.filename()}"
        result = client.upload_file(
            file_path=file_path,
            display_name=display_name,
            max_wait_seconds=120,
            poll_interval=3,
        )
        if result.get('status') == 'completed' and result.get('gemini_file_id', '').startswith('files/'):
            file_search.gemini_file_id = result['gemini_file_id']
            file_search.gemini_uploaded_at = timezone.now()
            if not file_search.gemini_store_id:
                file_search.gemini_store_id = result.get('gemini_store_id', '') or ''
            if file_search.upload_status != FileSearchTable.UploadStatus.COMPLETED:
                file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
            file_search.error_message = None
            file_search.save(
                update_fields=[
                    'gemini_file_id',
                    'gemini_uploaded_at',
                    'gemini_store_id',
                    'upload_status',
                    'error_message',
                    'updated_at',
                ]
            )
            return True
    except Exception as e:
        logger.warning(
            "Failed to refresh Files API id for evidence revision",
            revision_id=str(revision.id),
            error=str(e),
        )
    return False
