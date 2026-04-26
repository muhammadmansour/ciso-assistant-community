"""
Background tasks for Gemini File Search integration
"""

import structlog
from huey.contrib.djhuey import task

from core.models import FileSearchTable, EvidenceRevision
from core.gemini_file_search import get_gemini_client

logger = structlog.get_logger(__name__)


@task()
def upload_evidence_to_gemini(evidence_revision_id: str):
    """
    Background task to upload evidence file to Gemini File Search.
    Uses upload_file_and_wait() to upload and poll synchronously within the task.
    
    Args:
        evidence_revision_id: UUID of the EvidenceRevision to upload
    """
    try:
        revision = EvidenceRevision.objects.get(id=evidence_revision_id)
        
        # Check if revision has an attachment
        if not revision.attachment:
            logger.info(
                "Evidence revision has no attachment, skipping Gemini upload",
                revision_id=evidence_revision_id
            )
            return
        
        # Get or create FileSearchTable entry
        file_search, created = FileSearchTable.objects.get_or_create(
            evidence_revision=revision,
            defaults={
                'upload_status': FileSearchTable.UploadStatus.PENDING,
                'gemini_file_id': '',
                'gemini_store_id': ''
            }
        )
        
        # Check if already uploaded with a VALID Gemini file ID (must start with 'files/')
        if not created and file_search.upload_status == FileSearchTable.UploadStatus.COMPLETED:
            if file_search.gemini_file_id and file_search.gemini_file_id.startswith('files/'):
                logger.info(
                    "File already uploaded to Gemini with valid ID",
                    revision_id=evidence_revision_id,
                    gemini_file_id=file_search.gemini_file_id
                )
                return
            else:
                # Old invalid ID (operation path) - need to re-upload
                logger.warning(
                    "File has invalid gemini_file_id (not files/...), re-uploading",
                    revision_id=evidence_revision_id,
                    old_gemini_file_id=file_search.gemini_file_id[:80] if file_search.gemini_file_id else ''
                )
        
        # Get Gemini client
        client = get_gemini_client()
        if not client:
            logger.warning("Gemini File Search not configured, skipping upload")
            return
        
        # Update status to uploading
        file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
        file_search.error_message = None
        file_search.save()
        
        logger.info(
            "Starting Gemini File Search upload",
            revision_id=evidence_revision_id,
            evidence_name=revision.evidence.name
        )
        
        # Get file path and display name
        file_path = revision.attachment.path
        display_name = f"{revision.evidence.name} - {revision.evidence.filename()}"
        
        # Upload and wait for completion (synchronous within background task)
        result = client.upload_file_and_wait(
            file_path=file_path,
            display_name=display_name,
            max_wait_seconds=120,
            poll_interval=3,
        )
        
        if result['status'] == 'completed':
            file_search.gemini_file_id = result.get('gemini_file_id', '')
            file_search.gemini_store_id = result.get('gemini_store_id', '')
            file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
            file_search.save()
            
            logger.info(
                "Gemini File Search upload completed",
                revision_id=evidence_revision_id,
                gemini_file_id=file_search.gemini_file_id,
                evidence_name=revision.evidence.name
            )
        else:
            error_msg = result.get('error', 'Unknown error')
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = error_msg
            file_search.save()
            
            logger.error(
                "Gemini File Search upload failed",
                revision_id=evidence_revision_id,
                error=error_msg,
                evidence_name=revision.evidence.name
            )
        
    except EvidenceRevision.DoesNotExist:
        logger.error(
            "Evidence revision not found",
            revision_id=evidence_revision_id
        )
    except Exception as e:
        logger.error(
            "Failed to upload evidence to Gemini",
            revision_id=evidence_revision_id,
            error=str(e)
        )
        # Update status to failed
        try:
            file_search = FileSearchTable.objects.get(evidence_revision_id=evidence_revision_id)
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = str(e)
            file_search.save()
        except Exception:
            pass
