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
from typing import Optional, Dict, Any, List

logger = structlog.get_logger(__name__)


def _iso_or_none(value):
    if value is None:
        return None
    if hasattr(value, "isoformat"):
        try:
            return value.isoformat()
        except Exception:
            return str(value)
    return str(value)


# Gemini API configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
GEMINI_FILE_SEARCH_STORE_NAME = os.getenv('GEMINI_FILE_SEARCH_STORE_NAME', '')
GEMINI_ENABLED = bool(GEMINI_API_KEY)  # Only API key is required for files.upload()

# HTTP timeout for the Gemini SDK in milliseconds. The SDK's default (~90s)
# tears down large resumable uploads with "Upload has already been terminated"
# before a >10MB file finishes streaming, so we raise it well past anything we
# expect a single upload/index request to take. Operators can tune this via
# the GEMINI_HTTP_TIMEOUT_MS env var without touching code.
GEMINI_HTTP_TIMEOUT_MS = int(os.getenv('GEMINI_HTTP_TIMEOUT_MS', '600000'))

# How long the worker polls the Gemini long-running indexing operation before
# giving up with "Indexing did not complete within …". Large PDFs or API
# backpressure often exceed minutes; tune via GEMINI_INDEX_MAX_WAIT_SECONDS on
# the host (must include the Huey worker process — see start-pm2.sh).
GEMINI_INDEX_MAX_WAIT_SECONDS = int(os.getenv('GEMINI_INDEX_MAX_WAIT_SECONDS', '1800'))


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
            from google.genai.types import HttpOptions

            self.client = genai.Client(
                api_key=GEMINI_API_KEY,
                http_options=HttpOptions(timeout=GEMINI_HTTP_TIMEOUT_MS),
            )
            self.store_name = GEMINI_FILE_SEARCH_STORE_NAME or None
            logger.info(
                "Gemini client initialized",
                store_name=self.store_name,
                http_timeout_ms=GEMINI_HTTP_TIMEOUT_MS,
            )
        except ImportError:
            logger.error("google-genai package not installed. Install with: pip install google-genai")
            raise
    
    def upload_to_store_and_wait(
        self,
        file_path: str,
        display_name: str,
        custom_metadata: Optional[Dict[str, Any]] = None,
        max_wait_seconds: int = GEMINI_INDEX_MAX_WAIT_SECONDS,
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


def list_gemini_file_search_stores_metadata(
    *,
    include_document_counts: bool = True,
    max_stores: int = 200,
) -> List[Dict[str, Any]]:
    """Return File Search stores from the Gemini developer API (live), not from GRC.

    Used for UIs that let users pick a store/collection to chat against grounded
    documents. ``display_name`` and ``name`` come from ``client.file_search_stores.list()``.
    Document counts use ``file_search_stores.documents.list(parent=store.name)``.
    """
    if not GEMINI_API_KEY:
        return []

    try:
        from google import genai
        from google.genai.types import HttpOptions

        client = genai.Client(
            api_key=GEMINI_API_KEY,
            http_options=HttpOptions(timeout=GEMINI_HTTP_TIMEOUT_MS),
        )
    except Exception as exc:
        logger.error("list_gemini_file_search_stores_metadata: failed to init client", error=str(exc))
        return []

    out: List[Dict[str, Any]] = []
    try:
        n_stores = 0
        for store in client.file_search_stores.list():
            n_stores += 1
            if n_stores > max_stores:
                logger.warning(
                    "list_gemini_file_search_stores_metadata: max_stores cap reached",
                    max_stores=max_stores,
                )
                break

            name = getattr(store, "name", None) or ""
            display_name = getattr(store, "display_name", None) or ""
            create_time = getattr(store, "create_time", None)
            update_time = getattr(store, "update_time", None)

            file_count: Optional[int] = None
            if include_document_counts and name:
                try:
                    file_count = 0
                    for _doc in client.file_search_stores.documents.list(parent=name):
                        file_count += 1
                except Exception as doc_exc:
                    logger.warning(
                        "Could not list documents for store",
                        store=name,
                        error=str(doc_exc),
                    )
                    file_count = None

            out.append(
                {
                    "name": name,
                    "display_name": display_name,
                    "title": display_name or name,
                    "file_count": file_count,
                    "create_time": _iso_or_none(create_time),
                    "update_time": _iso_or_none(update_time),
                }
            )
    except Exception as exc:
        logger.error("list_gemini_file_search_stores_metadata failed", error=str(exc))
        raise

    return out


def get_gemini_client() -> Optional[GeminiFileSearchClient]:
    """Get a configured Gemini client, or None if not configured"""
    if not GEMINI_ENABLED:
        return None
    
    try:
        return GeminiFileSearchClient()
    except Exception as e:
        logger.error("Failed to initialize Gemini client", error=str(e))
        return None


def get_genai_raw_client():
    """Return ``google.genai.Client`` when ``GEMINI_API_KEY`` is set, else ``None``."""
    if not GEMINI_API_KEY:
        return None
    try:
        from google import genai
        from google.genai.types import HttpOptions

        return genai.Client(
            api_key=GEMINI_API_KEY,
            http_options=HttpOptions(timeout=GEMINI_HTTP_TIMEOUT_MS),
        )
    except Exception as exc:
        logger.error("Failed to create raw GenAI client", error=str(exc))
        return None


def _format_bytes(num: Optional[int]) -> str:
    if num is None:
        return "--"
    n = float(num)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n < 1024.0 or unit == "TB":
            if unit == "B":
                return f"{int(n)} B"
            return f"{n:.1f} {unit}"
        n /= 1024.0
    return f"{n:.1f} TB"


def _doc_file_kind(display_name: str, mime: str) -> str:
    lower = (display_name or "").lower()
    if lower.endswith(".pdf"):
        return "pdf"
    if lower.endswith(".docx"):
        return "docx"
    if lower.endswith(".doc"):
        return "doc"
    if mime and "pdf" in mime:
        return "pdf"
    if mime and "word" in mime:
        return "docx"
    return "file"


def list_policy_collections_from_gemini() -> list:
    """List File Search stores and documents from Gemini (FloatingPolicyWidget schema)."""
    client = get_genai_raw_client()
    if not client:
        raise ValueError("GEMINI_API_KEY is not configured")

    out = []
    try:
        for store in client.file_search_stores.list():
            name = getattr(store, "name", "") or ""
            display = getattr(store, "display_name", None) or name
            if not name:
                continue

            files = []
            try:
                for doc in client.file_search_stores.documents.list(parent=name):
                    dname = getattr(doc, "name", "") or ""
                    disp = getattr(doc, "display_name", None) or dname.rsplit("/", maxsplit=1)[-1] or dname
                    mime = getattr(doc, "mime_type", None) or getattr(doc, "mimeType", None) or ""
                    size_raw = getattr(doc, "size_bytes", None)
                    if not isinstance(size_raw, int):
                        size_raw = None
                    updated = (
                        getattr(doc, "update_time", None)
                        or getattr(doc, "updateTime", None)
                        or getattr(doc, "create_time", None)
                        or getattr(doc, "createTime", None)
                    )
                    ts = ""
                    if updated is not None:
                        ts = str(updated)
                        if hasattr(updated, "isoformat"):
                            ts = updated.isoformat()

                    files.append(
                        {
                            "id": dname,
                            "name": disp,
                            "type": _doc_file_kind(str(disp), str(mime)),
                            "mimeType": str(mime) if mime else "application/octet-stream",
                            "size": _format_bytes(size_raw if isinstance(size_raw, int) else None),
                            "uploadedAt": ts or "--",
                        }
                    )
            except Exception as doc_exc:
                logger.warning(
                    "list documents for store failed",
                    store=name,
                    error=str(doc_exc),
                )

            updated_store = (
                getattr(store, "update_time", None)
                or getattr(store, "updateTime", None)
                or getattr(store, "create_time", None)
                or getattr(store, "createTime", None)
            )
            last_updated = ""
            if updated_store is not None:
                last_updated = (
                    updated_store.isoformat()
                    if hasattr(updated_store, "isoformat")
                    else str(updated_store)
                )

            out.append(
                {
                    "id": name,
                    "name": display,
                    "description": getattr(store, "description", None) or "",
                    "storeId": name,
                    "status": getattr(store, "state", None) or "ACTIVE",
                    "files": files,
                    "fileCount": len(files),
                    "lastUpdated": last_updated,
                }
            )
    except Exception as exc:
        logger.error("list file_search_stores failed", error=str(exc))
        raise

    return out


def policy_chat_with_file_search_stores(
    store_names: List[str],
    contents: List[Any],
) -> Dict[str, Any]:
    """Run a Gemini turn with File Search over the given stores.

    ``contents`` is a list of ``google.genai.types.Content`` (full conversation).
    """
    client = get_genai_raw_client()
    if not client:
        raise ValueError("GEMINI_API_KEY is not configured")
    if not store_names:
        raise ValueError("At least one file search store is required")
    if not contents:
        raise ValueError("contents must not be empty")

    from google.genai import types

    model = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=types.GenerateContentConfig(
            tools=[
                types.Tool(
                    file_search=types.FileSearch(
                        file_search_store_names=list(store_names),
                    )
                )
            ]
        ),
    )

    text = getattr(response, "text", None) or ""
    if not text and getattr(response, "candidates", None):
        try:
            parts = response.candidates[0].content.parts
            text = "".join(getattr(p, "text", "") or "" for p in parts)
        except (IndexError, AttributeError, TypeError):
            text = ""

    sources = []
    try:
        gm = getattr(response, "grounding_metadata", None)
        chunks = getattr(gm, "grounding_chunks", None) if gm else None
        if chunks:
            for ch in chunks:
                web = getattr(ch, "web", None)
                title = getattr(web, "title", None) if web else None
                uri = getattr(web, "uri", None) if web else None
                if title or uri:
                    sources.append(
                        {"title": title or "Source", "uri": uri or "#"}
                    )
        ctx = getattr(gm, "retrieval_metadata", None) if gm else None
        docs = getattr(ctx, "grounding_file_metadata", None) if ctx else None
        if docs:
            for d in docs:
                t = getattr(d, "display_name", None) or getattr(d, "uri", None)
                u = getattr(d, "uri", None) or "#"
                if t:
                    sources.append({"title": str(t), "uri": str(u)})
    except Exception:
        pass

    return {
        "text": text.strip() or "No response from model.",
        "sources": sources[:20],
    }
