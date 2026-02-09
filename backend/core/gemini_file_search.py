"""
Gemini File Search Integration
Handles uploading evidence files to Gemini File Search API
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
GEMINI_ENABLED = bool(GEMINI_API_KEY and GEMINI_FILE_SEARCH_STORE_NAME)


class GeminiFileSearchClient:
    """Client for interacting with Gemini File Search API"""
    
    def __init__(self):
        self.client = None
        self.store_name = None
        
        if not GEMINI_ENABLED:
            logger.warning("Gemini File Search is not configured. Set GEMINI_API_KEY and GEMINI_FILE_SEARCH_STORE_NAME")
            return
        
        try:
            from google import genai
            self.client = genai.Client(api_key=GEMINI_API_KEY)
            self.store_name = GEMINI_FILE_SEARCH_STORE_NAME
            logger.info("Gemini File Search client initialized", store_name=self.store_name)
        except ImportError:
            logger.error("google-genai package not installed. Install with: pip install google-genai")
            raise
    
    def upload_file_to_search_store(
        self,
        file_path: str,
        display_name: str
    ) -> Dict[str, Any]:
        """
        Upload a file directly to Gemini File Search store.
        Returns immediately with the operation info (non-blocking).
        
        Args:
            file_path: Path to the file to upload
            display_name: Display name for the file (used in citations)
        
        Returns:
            Dict containing operation_id, gemini_store_id, status, and the raw operation object
        """
        if not self.client:
            raise ValueError("Gemini File Search client is not initialized")
        
        try:
            logger.info(
                "Uploading file to Gemini File Search",
                file_path=file_path,
                display_name=display_name
            )
            
            # Upload file directly to File Search store
            operation = self.client.file_search_stores.upload_to_file_search_store(
                file=file_path,
                file_search_store_name=self.store_name,
                config={
                    'display_name': display_name,
                }
            )
            
            logger.info(
                "File upload initiated",
                operation_name=operation.name,
                display_name=display_name
            )
            
            return {
                'operation_id': operation.name,
                'operation_object': operation,  # Keep the raw operation object for polling
                'gemini_store_id': self.store_name,
                'status': 'uploading'
            }
            
        except Exception as e:
            logger.error(
                "Failed to upload file to Gemini File Search",
                error=str(e),
                file_path=file_path
            )
            raise
    
    def upload_file_and_wait(
        self,
        file_path: str,
        display_name: str,
        max_wait_seconds: int = 120,
        poll_interval: int = 3
    ) -> Dict[str, Any]:
        """
        Upload a file and wait for the operation to complete (synchronous/blocking).
        
        Args:
            file_path: Path to the file to upload
            display_name: Display name for the file
            max_wait_seconds: Maximum time to wait for completion
            poll_interval: Time between status checks
        
        Returns:
            Dict with status, gemini_file_id, gemini_store_id
        """
        result = self.upload_file_to_search_store(file_path, display_name)
        operation = result['operation_object']
        operation_name = result['operation_id']
        
        logger.info(
            "Waiting for upload operation to complete",
            operation_name=operation_name,
            max_wait_seconds=max_wait_seconds
        )
        
        elapsed = 0
        while elapsed < max_wait_seconds:
            try:
                # Poll the operation using the operation object directly
                updated = self.client.operations.get(operation=operation)
                
                logger.info(
                    "Poll result",
                    operation_name=operation_name,
                    result_type=type(updated).__name__,
                    done=getattr(updated, 'done', 'N/A'),
                    elapsed=elapsed
                )
                
                # If the SDK returns a string, it's the completed file ID
                if isinstance(updated, str):
                    return {
                        'status': 'completed',
                        'gemini_file_id': updated,
                        'gemini_store_id': self.store_name,
                    }
                
                done = getattr(updated, 'done', None)
                
                if done:
                    # Extract file ID from the completed operation
                    file_id = self._extract_file_id(updated)
                    return {
                        'status': 'completed',
                        'gemini_file_id': file_id,
                        'gemini_store_id': self.store_name,
                    }
                
                # If no 'done' attribute at all, the object might be the result itself
                if done is None:
                    file_id = self._extract_file_id(updated)
                    if file_id:
                        return {
                            'status': 'completed',
                            'gemini_file_id': file_id,
                            'gemini_store_id': self.store_name,
                        }
                        
            except Exception as e:
                logger.warning(
                    "Error polling operation, will retry",
                    operation_name=operation_name,
                    error=str(e),
                    error_type=type(e).__name__,
                    elapsed=elapsed
                )
            
            time.sleep(poll_interval)
            elapsed += poll_interval
        
        return {
            'status': 'timeout',
            'error': f'Operation did not complete within {max_wait_seconds} seconds'
        }
    
    def _extract_file_id(self, obj) -> str:
        """Extract a file ID from various possible response types."""
        if obj is None:
            return ''
        if isinstance(obj, str):
            return obj
        
        # Try common attributes
        for attr in ('name', 'file_id', 'id'):
            val = getattr(obj, attr, None)
            if val and isinstance(val, str):
                return val
        
        # Try response/result sub-objects
        for attr in ('response', 'result'):
            sub = getattr(obj, attr, None)
            if sub is not None:
                if isinstance(sub, str):
                    return sub
                if isinstance(sub, dict):
                    return sub.get('name', '') or sub.get('file_id', '') or sub.get('id', '')
                for sub_attr in ('name', 'file_id', 'id'):
                    val = getattr(sub, sub_attr, None)
                    if val and isinstance(val, str):
                        return val
        
        # Try metadata
        metadata = getattr(obj, 'metadata', None)
        if metadata:
            if isinstance(metadata, str):
                return metadata
            if isinstance(metadata, dict):
                return metadata.get('file_id', '') or metadata.get('name', '')
            val = getattr(metadata, 'file_id', None)
            if val and isinstance(val, str):
                return val
        
        # Last resort
        return str(obj)

    def check_operation_status(self, operation_id: str) -> Dict[str, Any]:
        """
        Check the status of an upload operation by string ID.
        NOTE: Some SDK versions require the operation object, not a string.
        Prefer upload_file_and_wait() for reliable polling.
        
        Args:
            operation_id: The operation ID string to check
        
        Returns:
            Dict with status and file_id (if completed)
        """
        if not self.client:
            raise ValueError("Gemini File Search client is not initialized")
        
        try:
            # Try passing as positional arg first, then keyword variations
            operation = None
            errors = []
            
            for call_style in ['positional', 'operation_kw', 'name_kw']:
                try:
                    if call_style == 'positional':
                        operation = self.client.operations.get(operation_id)
                    elif call_style == 'operation_kw':
                        operation = self.client.operations.get(operation=operation_id)
                    elif call_style == 'name_kw':
                        operation = self.client.operations.get(name=operation_id)
                    break  # Success
                except TypeError as te:
                    errors.append(f"{call_style}: {te}")
                    continue
            
            if operation is None:
                return {
                    'status': 'failed',
                    'error': f'All call styles failed: {"; ".join(errors)}'
                }
            
            if isinstance(operation, str):
                return {
                    'status': 'completed',
                    'gemini_file_id': operation,
                    'done': True
                }
            
            done = getattr(operation, 'done', None)
            if done:
                file_id = self._extract_file_id(operation)
                return {
                    'status': 'completed',
                    'gemini_file_id': file_id,
                    'done': True
                }
            elif done is False:
                return {
                    'status': 'uploading',
                    'done': False
                }
            else:
                # No 'done' attribute — probably the completed result itself
                file_id = self._extract_file_id(operation)
                return {
                    'status': 'completed',
                    'gemini_file_id': file_id,
                    'done': True
                }
                
        except Exception as e:
            logger.error(
                "Failed to check operation status",
                error=str(e),
                operation_id=operation_id
            )
            return {
                'status': 'failed',
                'error': str(e)
            }
    
    def wait_for_operation(
        self,
        operation_id: str,
        max_wait_seconds: int = 300,
        poll_interval: int = 5
    ) -> Dict[str, Any]:
        """
        Wait for an operation to complete by polling with string ID.
        NOTE: Prefer upload_file_and_wait() which uses the operation object directly.
        """
        elapsed = 0
        while elapsed < max_wait_seconds:
            result = self.check_operation_status(operation_id)
            
            if result.get('done') or result.get('status') in ('failed', 'completed'):
                return result
            
            time.sleep(poll_interval)
            elapsed += poll_interval
        
        return {
            'status': 'timeout',
            'error': f'Operation did not complete within {max_wait_seconds} seconds'
        }


def get_gemini_client() -> Optional[GeminiFileSearchClient]:
    """Get a configured Gemini File Search client, or None if not configured"""
    if not GEMINI_ENABLED:
        return None
    
    try:
        return GeminiFileSearchClient()
    except Exception as e:
        logger.error("Failed to initialize Gemini client", error=str(e))
        return None
