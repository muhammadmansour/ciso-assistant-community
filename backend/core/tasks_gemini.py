"""
Background tasks for Gemini File Search integration
"""

import structlog
from huey.contrib.djhuey import task
from django.utils import timezone

from core.models import FileSearchTable, EvidenceRevision
from core.gemini_file_search import get_gemini_client

logger = structlog.get_logger(__name__)


@task()
def upload_evidence_to_gemini(evidence_revision_id: str):
    """
    Background task to upload evidence file to Gemini File Search
    
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
        
        if not created and file_search.upload_status == FileSearchTable.UploadStatus.COMPLETED:
            logger.info(
                "File already uploaded to Gemini",
                revision_id=evidence_revision_id,
                gemini_file_id=file_search.gemini_file_id
            )
            return
        
        # Get Gemini client
        client = get_gemini_client()
        if not client:
            logger.warning("Gemini File Search not configured, skipping upload")
            return
        
        # Update status to uploading
        file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
        file_search.save()
        
        logger.info(
            "Starting Gemini File Search upload",
            revision_id=evidence_revision_id,
            evidence_name=revision.evidence.name
        )
        
        # Get file path and display name
        file_path = revision.attachment.path
        display_name = f"{revision.evidence.name} - {revision.evidence.filename()}"
        
        # Upload file to Gemini
        result = client.upload_file_to_search_store(
            file_path=file_path,
            display_name=display_name
        )
        
        # Update file search entry
        file_search.operation_id = result['operation_id']
        file_search.gemini_store_id = result['gemini_store_id']
        file_search.upload_status = FileSearchTable.UploadStatus.UPLOADING
        file_search.save()
        
        logger.info(
            "Gemini upload initiated",
            revision_id=evidence_revision_id,
            operation_id=result['operation_id']
        )
        
        # Queue task to check operation status
        check_gemini_upload_status.schedule(
            args=(str(file_search.id),),
            delay=10  # Check status after 10 seconds
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
        except:
            pass


@task()
def check_gemini_upload_status(file_search_id: str, retry_count: int = 0):
    """
    Check the status of a Gemini File Search upload operation
    
    Args:
        file_search_id: UUID of the FileSearchTable entry
        retry_count: Number of retries so far (max 60 = 5 minutes)
    """
    max_retries = 60  # 5 minutes with 5-second intervals
    
    try:
        file_search = FileSearchTable.objects.get(id=file_search_id)
        
        if not file_search.operation_id:
            logger.error(
                "FileSearch entry has no operation_id",
                file_search_id=file_search_id
            )
            return
        
        # Get Gemini client
        client = get_gemini_client()
        if not client:
            logger.warning("Gemini File Search not configured")
            return
        
        # Check operation status
        status = client.check_operation_status(file_search.operation_id)
        
        if status['status'] == 'completed':
            # Update with completed status and file ID
            file_search.gemini_file_id = status.get('gemini_file_id', '')
            file_search.upload_status = FileSearchTable.UploadStatus.COMPLETED
            file_search.save()
            
            logger.success(
                "Gemini File Search upload completed",
                file_search_id=file_search_id,
                gemini_file_id=file_search.gemini_file_id
            )
            
        elif status['status'] == 'failed':
            # Update with failed status
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = status.get('error', 'Unknown error')
            file_search.save()
            
            logger.error(
                "Gemini File Search upload failed",
                file_search_id=file_search_id,
                error=file_search.error_message
            )
            
        elif retry_count < max_retries:
            # Still uploading, check again in 5 seconds
            check_gemini_upload_status.schedule(
                args=(file_search_id, retry_count + 1),
                delay=5
            )
        else:
            # Timeout
            file_search.upload_status = FileSearchTable.UploadStatus.FAILED
            file_search.error_message = f"Upload timeout after {max_retries * 5} seconds"
            file_search.save()
            
            logger.error(
                "Gemini File Search upload timeout",
                file_search_id=file_search_id
            )
            
    except FileSearchTable.DoesNotExist:
        logger.error(
            "FileSearchTable entry not found",
            file_search_id=file_search_id
        )
    except Exception as e:
        logger.error(
            "Error checking Gemini upload status",
            file_search_id=file_search_id,
            error=str(e)
        )
