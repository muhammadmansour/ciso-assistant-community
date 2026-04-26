"""
Background tasks for Gemini File Search integration.

The task uploads each evidence revision to the configured **File Search Store**,
producing a durable ``gemini_document_id`` that does not expire. This is the
sole identifier we keep for an evidence file: it is referenced directly in
analysis requests and never needs refreshing.
"""

import os
import shutil
import tempfile
from contextlib import contextmanager

import structlog
from huey.contrib.djhuey import task

from core.models import FileSearchTable, EvidenceRevision
from core.gemini_file_search import get_gemini_client


@contextmanager
def _materialize_attachment(attachment):
    """Yield a local filesystem path for ``attachment``, regardless of backend.

    ``FieldFile.path`` raises ``NotImplementedError`` on any non-local storage
    backend (GCS, S3, …), so we can't pass ``attachment.path`` straight to the
    Gemini SDK. We always stream the bytes into a tempfile and yield its path.
    For local-FS storage this is a tiny extra copy; for cloud storage this is
    the only thing that works.

    The tempfile is removed when the context exits, so the worker's tmpdir
    stays clean even on long-running Huey processes.
    """
    suffix = os.path.splitext(getattr(attachment, 'name', '') or '')[1]
    tmp = tempfile.NamedTemporaryFile(prefix='gemini-upload-', suffix=suffix, delete=False)
    tmp_path = tmp.name
    tmp.close()
    try:
        with attachment.open('rb') as src, open(tmp_path, 'wb') as dst:
            shutil.copyfileobj(src, dst)
        yield tmp_path
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass

logger = structlog.get_logger(__name__)


# Status tokens returned by ``ensure_evidence_indexed`` — they mirror the four
# UploadStatus values plus two sentinel values for cases the model can't
# represent. The keys are kept stable (never localized) so the API can include
# them in machine-readable diagnostic responses.
INDEXING_STATUS_COMPLETED = "completed"          # durable gemini_document_id present
INDEXING_STATUS_UPLOADING = "uploading"          # already in flight, do not re-enqueue
INDEXING_STATUS_ENQUEUED = "enqueued"            # we (re)enqueued upload_evidence_to_gemini
INDEXING_STATUS_NO_ATTACHMENT = "no_attachment"  # revision has no file to index


def ensure_evidence_indexed(evidence_revision):
    """Idempotently make sure an evidence revision is on track to be indexed.

    Returns a dict with the current indexing state, suitable for inclusion in
    diagnostic API responses (e.g. the 409 returned by ``run_ai_analysis``
    when no evidence is yet indexed).

    Behaviour:
        * No attachment           → ``no_attachment`` (cannot index).
        * Already has a durable
          ``gemini_document_id``  → ``completed`` (no work).
        * Currently ``uploading`` → ``uploading`` (do **not** re-enqueue,
          another worker is mid-flight).
        * Anything else (no row,
          pending, or failed)     → enqueue ``upload_evidence_to_gemini`` and
          return ``enqueued``.

    The helper is safe to call from request paths: enqueue is non-blocking
    via Huey, and the function never raises (defensive ``try/except``).
    """
    revision_id = str(getattr(evidence_revision, 'id', '') or '')
    evidence_name = ''
    try:
        evidence_name = getattr(getattr(evidence_revision, 'evidence', None), 'name', '') or ''
    except Exception:
        pass

    base = {
        'evidence_revision_id': revision_id,
        'evidence_name': evidence_name,
        'gemini_document_id': '',
        'gemini_store_id': '',
        'error_message': None,
    }

    if not getattr(evidence_revision, 'attachment', None):
        base['status'] = INDEXING_STATUS_NO_ATTACHMENT
        return base

    fs_row = FileSearchTable.objects.filter(evidence_revision=evidence_revision).first()

    if fs_row is not None:
        base['gemini_document_id'] = fs_row.gemini_document_id or ''
        base['gemini_store_id'] = fs_row.gemini_store_id or ''
        base['error_message'] = fs_row.error_message or None

        if fs_row.has_durable_document():
            base['status'] = INDEXING_STATUS_COMPLETED
            return base

        if fs_row.upload_status == FileSearchTable.UploadStatus.UPLOADING:
            # Another worker is mid-upload. Re-enqueueing now would race with it
            # and could double-index.
            base['status'] = INDEXING_STATUS_UPLOADING
            return base

    # No row yet, or the row is PENDING / FAILED — kick off (or retry) indexing.
    # Reset a FAILED row back to PENDING with the previous error cleared so the
    # UI sees a fresh attempt rather than a stale failure during the re-run.
    if fs_row is not None and fs_row.upload_status == FileSearchTable.UploadStatus.FAILED:
        fs_row.upload_status = FileSearchTable.UploadStatus.PENDING
        fs_row.error_message = None
        fs_row.save(update_fields=['upload_status', 'error_message', 'updated_at'])

    try:
        upload_evidence_to_gemini(revision_id)
    except Exception as exc:
        # Huey enqueue failures (broker down, etc.) shouldn't 500 the caller —
        # surface them in the diagnostic payload instead.
        logger.warning(
            "Failed to enqueue upload_evidence_to_gemini",
            revision_id=revision_id,
            error=str(exc),
        )
        base['status'] = INDEXING_STATUS_ENQUEUED  # caller still retries
        base['error_message'] = f"enqueue failed: {exc}"
        return base

    base['status'] = INDEXING_STATUS_ENQUEUED
    return base


@task()
def upload_evidence_to_gemini(evidence_revision_id: str):
    """Upload an evidence file to the Gemini File Search Store.

    Idempotent: if a durable ``gemini_document_id`` already exists for the
    revision, the task is a no-op.
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
                'gemini_document_id': '',
                'gemini_store_id': '',
            },
        )

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

        display_name = f"{revision.evidence.name} - {revision.evidence.filename()}"

        # Stream from the configured storage backend into a tempfile. This
        # works for local FS, GCS, S3, etc — ``revision.attachment.path``
        # would raise NotImplementedError on cloud backends.
        with _materialize_attachment(revision.attachment) as file_path:
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
