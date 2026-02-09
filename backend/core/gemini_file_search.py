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
        Upload a file directly to Gemini File Search store
        
        Args:
            file_path: Path to the file to upload
            display_name: Display name for the file (used in citations)
        
        Returns:
            Dict containing operation_id, gemini_store_id, and status
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
    
    def check_operation_status(self, operation_id: str) -> Dict[str, Any]:
        """
        Check the status of an upload operation
        
        Args:
            operation_id: The operation ID to check
        
        Returns:
            Dict with status and file_id (if completed)
        """
        if not self.client:
            raise ValueError("Gemini File Search client is not initialized")
        
        try:
            operation = self.client.operations.get(name=operation_id)
            
            if operation.done:
                # Extract file ID from the completed operation
                # The response may be a protobuf object or dict depending on SDK version
                file_id = ''
                response = getattr(operation, 'response', None)
                if response is not None:
                    # Handle both dict and protobuf-like objects
                    if isinstance(response, dict):
                        file_id = response.get('name', '')
                    elif hasattr(response, 'name'):
                        file_id = response.name
                    else:
                        # Try to convert to string as fallback
                        file_id = str(response)
                
                # Also check metadata for the file ID
                if not file_id:
                    metadata = getattr(operation, 'metadata', None)
                    if metadata:
                        if isinstance(metadata, dict):
                            file_id = metadata.get('file_id', '') or metadata.get('name', '')
                        elif hasattr(metadata, 'file_id'):
                            file_id = metadata.file_id
                
                logger.info(
                    "Operation completed",
                    operation_id=operation_id,
                    file_id=file_id
                )
                
                return {
                    'status': 'completed',
                    'gemini_file_id': file_id,
                    'done': True
                }
            else:
                return {
                    'status': 'uploading',
                    'done': False
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
        Wait for an operation to complete
        
        Args:
            operation_id: The operation ID to wait for
            max_wait_seconds: Maximum time to wait (default 5 minutes)
            poll_interval: Time between status checks (default 5 seconds)
        
        Returns:
            Final operation status dict
        """
        elapsed = 0
        while elapsed < max_wait_seconds:
            result = self.check_operation_status(operation_id)
            
            if result.get('done') or result.get('status') == 'failed':
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
