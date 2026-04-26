"""
Gemini File Search Integration
Handles uploading evidence files to Gemini API for AI analysis.

Two upload methods:
1. files.upload() - Uploads to Gemini Files API, returns file IDs like 'files/abc123'
   Used by Muraji API to reference individual files in generateContent calls.
2. file_search_stores.upload_to_file_search_store() - Uploads to a File Search Store
   Used for grounded search across all evidence files.
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
    
    def upload_file(
        self,
        file_path: str,
        display_name: str,
        max_wait_seconds: int = 120,
        poll_interval: int = 3
    ) -> Dict[str, Any]:
        """
        Upload a file to Gemini Files API using client.files.upload().
        Returns the actual Gemini file ID (e.g., 'files/abc123').
        
        This is the PRIMARY upload method - Muraji API uses these file IDs
        to reference files in generateContent calls.
        
        Args:
            file_path: Path to the file to upload
            display_name: Display name for the file
            max_wait_seconds: Maximum time to wait for processing
            poll_interval: Time between status checks
        
        Returns:
            Dict with status, gemini_file_id, gemini_store_id
        """
        if not self.client:
            raise ValueError("Gemini client is not initialized")
        
        try:
            logger.info(
                "Uploading file to Gemini Files API",
                file_path=file_path,
                display_name=display_name
            )
            
            # Upload using the Files API - this gives us proper file IDs
            uploaded_file = self.client.files.upload(
                file=file_path,
                config={
                    'display_name': display_name,
                }
            )
            
            # Log the result
            file_name = getattr(uploaded_file, 'name', None)
            file_state = getattr(uploaded_file, 'state', None)
            file_uri = getattr(uploaded_file, 'uri', None)
            
            logger.info(
                "File upload result",
                file_name=file_name,
                file_state=str(file_state),
                file_uri=file_uri,
                file_type=type(uploaded_file).__name__,
                file_attrs=[a for a in dir(uploaded_file) if not a.startswith('_')]
            )
            
            # Wait for file to be processed (state = ACTIVE)
            elapsed = 0
            while elapsed < max_wait_seconds:
                state = getattr(uploaded_file, 'state', None)
                state_str = str(state).upper() if state else ''
                
                if 'ACTIVE' in state_str:
                    logger.info(
                        "File is ACTIVE and ready",
                        file_name=file_name,
                        file_uri=file_uri
                    )
                    return {
                        'status': 'completed',
                        'gemini_file_id': file_name or '',
                        'gemini_store_id': self.store_name or '',
                        'file_uri': file_uri or '',
                    }
                elif 'FAILED' in state_str:
                    error = getattr(uploaded_file, 'error', 'Unknown error')
                    logger.error(
                        "File processing failed",
                        file_name=file_name,
                        error=str(error)
                    )
                    return {
                        'status': 'failed',
                        'error': f'File processing failed: {error}'
                    }
                
                logger.info(
                    "File still processing, waiting...",
                    file_name=file_name,
                    state=state_str,
                    elapsed=elapsed
                )
                
                time.sleep(poll_interval)
                elapsed += poll_interval
                
                # Re-fetch file status
                try:
                    uploaded_file = self.client.files.get(name=file_name)
                except Exception as e:
                    logger.warning(
                        "Error re-fetching file status",
                        file_name=file_name,
                        error=str(e)
                    )
            
            # If we got here without returning, file didn't become active
            # But if we have a file name, consider it completed (some files process instantly)
            if file_name:
                logger.warning(
                    "File didn't reach ACTIVE state within timeout, using file ID anyway",
                    file_name=file_name,
                    last_state=str(getattr(uploaded_file, 'state', 'unknown'))
                )
                return {
                    'status': 'completed',
                    'gemini_file_id': file_name,
                    'gemini_store_id': self.store_name or '',
                    'file_uri': getattr(uploaded_file, 'uri', '') or '',
                }
            
            return {
                'status': 'timeout',
                'error': f'File did not become active within {max_wait_seconds} seconds'
            }
            
        except Exception as e:
            logger.error(
                "Failed to upload file to Gemini",
                error=str(e),
                error_type=type(e).__name__,
                file_path=file_path
            )
            raise

    def upload_to_store_and_wait(
        self,
        file_path: str,
        display_name: str,
        max_wait_seconds: int = 300,
        poll_interval: int = 3,
    ) -> Dict[str, Any]:
        """Upload a file to the configured File Search Store and wait for indexing.

        Unlike :meth:`upload_file` (Files API, ~48h TTL), the document name returned
        here is **durable** — it persists in the store until explicitly deleted.

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

        try:
            logger.info(
                "Uploading file to Gemini File Search Store",
                file_path=file_path,
                display_name=display_name,
                store_name=self.store_name,
            )
            operation = self.client.file_search_stores.upload_to_file_search_store(
                file=file_path,
                file_search_store_name=self.store_name,
                config={'display_name': display_name},
            )
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

    # ── Back-compat shims ──────────────────────────────────────────────────────
    # Older callers expect upload_file_and_wait() — keep it pointing at the
    # transient Files API path so request-time uploads remain unchanged.
    def upload_file_and_wait(self, *args, **kwargs):
        """Alias for :meth:`upload_file` (Files API, transient)."""
        return self.upload_file(*args, **kwargs)

    def upload_file_to_search_store(self, file_path: str, display_name: str) -> Dict[str, Any]:
        """Deprecated. Use :meth:`upload_to_store_and_wait` instead.

        Kept as a thin wrapper so any external callers don't break — but this now
        polls to completion and returns the durable document name in
        ``gemini_document_id`` (previously this returned only an operation_id).
        """
        return self.upload_to_store_and_wait(file_path=file_path, display_name=display_name)


def get_gemini_client() -> Optional[GeminiFileSearchClient]:
    """Get a configured Gemini client, or None if not configured"""
    if not GEMINI_ENABLED:
        return None
    
    try:
        return GeminiFileSearchClient()
    except Exception as e:
        logger.error("Failed to initialize Gemini client", error=str(e))
        return None
