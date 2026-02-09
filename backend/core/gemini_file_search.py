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
            
            # Debug: dump operation object
            op_name = getattr(operation, 'name', 'NO_NAME')
            op_type = type(operation).__name__
            op_done = getattr(operation, 'done', 'NO_DONE')
            op_result = getattr(operation, 'result', 'NO_RESULT')
            op_response = getattr(operation, 'response', 'NO_RESPONSE')
            op_metadata = getattr(operation, 'metadata', 'NO_METADATA')
            
            logger.info(
                "File upload initiated - FULL DEBUG",
                operation_type=op_type,
                operation_name=op_name,
                operation_done=str(op_done),
                operation_result=str(op_result)[:500],
                operation_response=str(op_response)[:500],
                operation_metadata=str(op_metadata)[:500],
                operation_dir=str([a for a in dir(operation) if not a.startswith('_')])[:500],
                display_name=display_name
            )
            
            return {
                'operation_id': op_name,
                'operation_object': operation,
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
                
                updated_type = type(updated).__name__
                updated_done = getattr(updated, 'done', 'NO_DONE')
                updated_name = getattr(updated, 'name', 'NO_NAME')
                updated_result = getattr(updated, 'result', 'NO_RESULT')
                updated_response = getattr(updated, 'response', 'NO_RESPONSE')
                updated_metadata = getattr(updated, 'metadata', 'NO_METADATA')
                
                logger.info(
                    "Poll result - FULL DEBUG",
                    operation_name=operation_name,
                    updated_type=updated_type,
                    updated_done=str(updated_done),
                    updated_name=str(updated_name)[:300],
                    updated_result=str(updated_result)[:500],
                    updated_response=str(updated_response)[:500],
                    updated_metadata=str(updated_metadata)[:500],
                    updated_dir=str([a for a in dir(updated) if not a.startswith('_')])[:500] if not isinstance(updated, str) else 'IS_STRING',
                    elapsed=elapsed
                )
                
                # If the SDK returns a string, it could be the completed file ID or operation name
                if isinstance(updated, str):
                    # If it looks like an operation path, it's NOT a file ID
                    if '/upload/operations/' in updated:
                        logger.warning("Got operation path as string, not a file ID", value=updated)
                        # The operation might have completed but returned the operation name
                        # Use the store name as reference since files are in the store
                        return {
                            'status': 'completed',
                            'gemini_file_id': updated,
                            'gemini_store_id': self.store_name,
                        }
                    return {
                        'status': 'completed',
                        'gemini_file_id': updated,
                        'gemini_store_id': self.store_name,
                    }
                
                done = getattr(updated, 'done', None)
                
                if done:
                    # Extract file ID from the completed operation
                    file_id = self._extract_file_id(updated)
                    logger.info(
                        "Operation done=True, extracted file_id",
                        file_id=file_id[:200] if file_id else 'EMPTY',
                        operation_name=operation_name
                    )
                    return {
                        'status': 'completed',
                        'gemini_file_id': file_id,
                        'gemini_store_id': self.store_name,
                    }
                
                # If no 'done' attribute at all, the object might be the result itself
                if done is None:
                    file_id = self._extract_file_id(updated)
                    if file_id:
                        logger.info(
                            "Operation done=None, extracted file_id",
                            file_id=file_id[:200] if file_id else 'EMPTY',
                            operation_name=operation_name
                        )
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
        """Extract a file ID from various possible response types.
        
        Priority: result/response sub-objects > metadata > name
        We check result/response FIRST because obj.name is typically the operation name,
        not the file ID.
        """
        if obj is None:
            return ''
        if isinstance(obj, str):
            return obj
        
        # Debug: log what we're trying to extract from
        logger.info(
            "_extract_file_id called",
            obj_type=type(obj).__name__,
            obj_dir=str([a for a in dir(obj) if not a.startswith('_')])[:500],
            obj_str=str(obj)[:500]
        )
        
        # FIRST: Try response/result sub-objects (these contain the actual file info)
        for attr in ('response', 'result'):
            sub = getattr(obj, attr, None)
            if sub is not None:
                logger.info(
                    f"_extract_file_id checking {attr}",
                    sub_type=type(sub).__name__,
                    sub_value=str(sub)[:500]
                )
                if isinstance(sub, str):
                    return sub
                if isinstance(sub, dict):
                    file_id = sub.get('file_id', '') or sub.get('name', '') or sub.get('id', '')
                    if file_id:
                        return file_id
                # Try attributes on sub-object
                for sub_attr in ('file_id', 'name', 'id'):
                    val = getattr(sub, sub_attr, None)
                    if val and isinstance(val, str):
                        return val
        
        # SECOND: Try metadata
        metadata = getattr(obj, 'metadata', None)
        if metadata:
            logger.info(
                "_extract_file_id checking metadata",
                metadata_type=type(metadata).__name__,
                metadata_value=str(metadata)[:500]
            )
            if isinstance(metadata, str):
                return metadata
            if isinstance(metadata, dict):
                file_id = metadata.get('file_id', '') or metadata.get('name', '') or metadata.get('id', '')
                if file_id:
                    return file_id
            val = getattr(metadata, 'file_id', None)
            if val and isinstance(val, str):
                return val
        
        # THIRD: Try direct attributes (but skip name if it looks like operation path)
        for attr in ('file_id', 'id', 'name'):
            val = getattr(obj, attr, None)
            if val and isinstance(val, str):
                # Skip if it looks like an operation path
                if attr == 'name' and '/upload/operations/' in val:
                    logger.info(
                        "_extract_file_id skipping operation-like name",
                        name=val[:200]
                    )
                    continue
                return val
        
        # Last resort: return name even if it's an operation path (better than empty)
        name = getattr(obj, 'name', None)
        if name and isinstance(name, str):
            logger.warning(
                "_extract_file_id falling back to name (may be operation path)",
                name=name[:200]
            )
            return name
        
        # Absolute last resort
        return str(obj)

    def check_operation_status(self, operation_id: str) -> Dict[str, Any]:
        """
        Check the status of an upload operation by string ID.
        """
        if not self.client:
            raise ValueError("Gemini File Search client is not initialized")
        
        try:
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
                    break
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
