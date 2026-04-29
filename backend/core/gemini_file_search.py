"""
Gemini File Search Integration
Handles uploading evidence files to a Gemini File Search Store for AI analysis.

The store-upload flow returns a durable ``gemini_document_id``
(``fileSearchStores/<store>/documents/<doc>``) that does not expire — this is
the only identifier we keep for an evidence file. Analysis uses Gemini's
grounded ``fileSearch`` tool against these documents.
"""

import os
import time
import structlog
from typing import Optional, Dict, Any
from django.conf import settings

logger = structlog.get_logger(__name__)

# Gemini API configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
GEMINI_FILE_SEARCH_STORE_NAME = os.getenv('GEMINI_FILE_SEARCH_STORE_NAME', '')
GEMINI_ENABLED = bool(GEMINI_API_KEY)  # Only API key is required for files.upload()


class GeminiFileSearchClient:
    """Client for interacting with Gemini Files API"""
    
    def __init__(self):
        self.client = None
        self.store_name = None
        
        if not GEMINI_API_KEY:
            logger.warning("Gemini is not configured. Set GEMINI_API_KEY in .env")
            return
        
        try:
            from google import genai
            self.client = genai.Client(api_key=GEMINI_API_KEY)
            self.store_name = GEMINI_FILE_SEARCH_STORE_NAME or None
            logger.info("Gemini client initialized", store_name=self.store_name)
        except ImportError:
            logger.error("google-genai package not installed. Install with: pip install google-genai")
            raise
    
    def upload_to_store_and_wait(
        self,
        file_path: str,
        display_name: str,
        custom_metadata: Optional[Dict[str, Any]] = None,
        max_wait_seconds: int = 300,
        poll_interval: int = 3,
    ) -> Dict[str, Any]:
        """Upload a file to the configured File Search Store and wait for indexing.

        The document name returned here is **durable** — it persists in the
        store until explicitly deleted, so a single reference is sufficient
        for any future analysis.

        ``custom_metadata`` is an optional ``{key: value}`` mapping written to
        the document's ``customMetadata`` so it can be referenced from a
        ``metadataFilter`` at query time. This is what lets Muraji restrict
        retrieval to the exact documents an analysis request submitted (the
        File Search tool itself only accepts store names, so without metadata
        retrieval is store-wide). Values are coerced to strings; numeric values
        are also stored as strings — if you need numeric filtering, extend
        the encoder to set ``numeric_value`` instead.

        Returns a dict with:
            * status: 'completed' | 'failed' | 'timeout'
            * gemini_document_id: 'fileSearchStores/<store>/documents/<doc-id>'
            * gemini_store_id: the store name
            * operation_id: the long-running operation name (for diagnostics)
        """
        if not self.client:
            raise ValueError("Gemini client is not initialized")
        if not self.store_name:
            raise ValueError(
                "GEMINI_FILE_SEARCH_STORE_NAME is not configured — cannot upload to store"
            )

        upload_config: Dict[str, Any] = {'display_name': display_name}
        encoded_metadata = self._encode_custom_metadata(custom_metadata)
        if encoded_metadata:
            upload_config['custom_metadata'] = encoded_metadata

        try:
            logger.info(
                "Uploading file to Gemini File Search Store",
                file_path=file_path,
                display_name=display_name,
                store_name=self.store_name,
                custom_metadata_keys=[m.get('key') for m in encoded_metadata] if encoded_metadata else [],
            )
            operation = self.client.file_search_stores.upload_to_file_search_store(
                file=file_path,
                file_search_store_name=self.store_name,
                config=upload_config,
            )
        except TypeError as e:
            # Older google-genai versions may not accept ``custom_metadata`` in
            # the upload config. Retry once without metadata so the upload
            # still succeeds; the operator gets a clear log line to upgrade.
            if encoded_metadata and 'custom_metadata' in str(e):
                logger.warning(
                    "google-genai SDK rejected custom_metadata; retrying without it. "
                    "Upgrade google-genai to enable per-document metadata filtering.",
                    error=str(e),
                )
                upload_config.pop('custom_metadata', None)
                operation = self.client.file_search_stores.upload_to_file_search_store(
                    file=file_path,
                    file_search_store_name=self.store_name,
                    config=upload_config,
                )
            else:
                logger.error(
                    "Failed to upload file to Gemini File Search Store",
                    error=str(e),
                    file_path=file_path,
                )
                raise
        except Exception as e:
            logger.error(
                "Failed to upload file to Gemini File Search Store",
                error=str(e),
                file_path=file_path,
            )
            raise

        operation_id = getattr(operation, 'name', '') or ''

        # Poll the operation until it's done. The document name is only available
        # after indexing completes, on operation.response / operation.metadata.
        elapsed = 0
        while elapsed < max_wait_seconds:
            done = bool(getattr(operation, 'done', False))
            if done:
                break
            time.sleep(poll_interval)
            elapsed += poll_interval
            try:
                operation = self.client.operations.get(operation)
            except Exception as e:
                logger.warning(
                    "Error polling File Search Store upload operation",
                    operation_id=operation_id,
                    error=str(e),
                )
                # Don't bail on transient errors — keep polling until timeout
                continue

        if not getattr(operation, 'done', False):
            logger.warning(
                "File Search Store upload did not complete in time",
                operation_id=operation_id,
                elapsed=elapsed,
            )
            return {
                'status': 'timeout',
                'operation_id': operation_id,
                'gemini_store_id': self.store_name,
                'error': f'Indexing did not complete within {max_wait_seconds}s',
            }

        op_error = getattr(operation, 'error', None)
        if op_error:
            logger.error(
                "File Search Store upload operation failed",
                operation_id=operation_id,
                error=str(op_error),
            )
            return {
                'status': 'failed',
                'operation_id': operation_id,
                'gemini_store_id': self.store_name,
                'error': str(op_error),
            }

        # The document resource is on operation.response. The exact attribute name
        # varies across SDK versions; try the common shapes.
        document_name = self._extract_document_name(operation)
        if not document_name:
            logger.error(
                "File Search Store upload completed but document name not found",
                operation_id=operation_id,
                response_attrs=[a for a in dir(operation) if not a.startswith('_')],
            )
            return {
                'status': 'failed',
                'operation_id': operation_id,
                'gemini_store_id': self.store_name,
                'error': 'Indexing completed but document name was not returned',
            }

        logger.info(
            "File Search Store document indexed",
            operation_id=operation_id,
            document_name=document_name,
        )
        return {
            'status': 'completed',
            'operation_id': operation_id,
            'gemini_document_id': document_name,
            'gemini_store_id': self.store_name,
        }

    @staticmethod
    def _encode_custom_metadata(custom_metadata):
        """Encode a ``{key: value}`` dict into the SDK's ``CustomMetadata`` shape.

        Each entry becomes ``{'key': str, 'string_value': str}``. ``None`` and
        empty values are skipped (Gemini rejects empty strings for the value
        slot). Up to 20 entries are kept — that's the per-document limit
        documented in the SDK's ``Document`` type.
        """
        if not custom_metadata:
            return []
        encoded = []
        for key, value in custom_metadata.items():
            if value is None:
                continue
            if not isinstance(key, str) or not key:
                continue
            value_str = str(value)
            if not value_str:
                continue
            encoded.append({'key': key, 'string_value': value_str})
            if len(encoded) >= 20:
                break
        return encoded

    @staticmethod
    def _extract_document_name(operation) -> str:
        """Best-effort extraction of the document resource name from a long-running op.

        The google-genai SDK has shifted between attribute-based and dict-shaped
        operation responses over versions, so we probe both.
        """
        def _probe(container) -> str:
            if container is None:
                return ''
            for attr in ('name', 'document_name', 'document'):
                # Attribute access (typed protos / pydantic models)
                val = getattr(container, attr, None)
                if isinstance(val, str) and val.startswith('fileSearchStores/'):
                    return val
                inner = getattr(val, 'name', None) if val is not None else None
                if isinstance(inner, str) and inner.startswith('fileSearchStores/'):
                    return inner
                # Dict-style access
                if isinstance(container, dict):
                    val = container.get(attr)
                    if isinstance(val, str) and val.startswith('fileSearchStores/'):
                        return val
                    if isinstance(val, dict):
                        nested = val.get('name')
                        if isinstance(nested, str) and nested.startswith('fileSearchStores/'):
                            return nested
            return ''

        for source_attr in ('response', 'metadata', 'result'):
            found = _probe(getattr(operation, source_attr, None))
            if found:
                return found
        if isinstance(operation, dict):
            for source_attr in ('response', 'metadata', 'result'):
                found = _probe(operation.get(source_attr))
                if found:
                    return found
        return ''

    def delete_store_document(self, document_name: str) -> bool:
        """Best-effort deletion of a File Search Store document.

        Returns True on success, False on any failure (logged). Never raises —
        deletion is a cleanup operation, not a critical path.
        """
        if not document_name or not document_name.startswith('fileSearchStores/'):
            return False
        if not self.client:
            return False
        try:
            self.client.file_search_stores.documents.delete(name=document_name)
            logger.info("Deleted File Search Store document", document_name=document_name)
            return True
        except Exception as e:
            logger.warning(
                "Failed to delete File Search Store document",
                document_name=document_name,
                error=str(e),
            )
            return False

def get_gemini_client() -> Optional[GeminiFileSearchClient]:
    """Get a configured Gemini client, or None if not configured"""
    if not GEMINI_ENABLED:
        return None
    
    try:
        return GeminiFileSearchClient()
    except Exception as e:
        logger.error("Failed to initialize Gemini client", error=str(e))
        return None
