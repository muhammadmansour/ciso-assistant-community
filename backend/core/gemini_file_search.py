"""
Gemini File Search Integration
Handles uploading evidence files to a Gemini File Search Store for AI analysis.

The store-upload flow returns a durable ``gemini_document_id``
(``fileSearchStores/<store>/documents/<doc>``) that does not expire — this is
the only identifier we keep for an evidence file. Analysis uses Gemini's
grounded ``fileSearch`` tool against these documents.
"""

import os
import tempfile
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

# Conditional chunking for Gemini File Search indexing.
#
# Gemini chunks/embeds/indexes server-side; the only knob we have is the
# ``chunking_config`` passed at upload time. We pick one of two profiles based
# on document length. Small documents are usually structured/clause-based
# (policies, certificates) and benefit from smaller, more precise chunks; large
# documents are usually long-form narrative (reports, manuals) and benefit from
# larger, more coherent chunks.
#
# Routing:
#   * PDFs: route on the real page count (via pypdf) against
#     GEMINI_CHUNK_PAGE_THRESHOLD (default 50 pages).
#   * Everything else (docx/xlsx/csv/txt/images), or a PDF we can't parse, or
#     when pypdf is unavailable: fall back to a file-size proxy against
#     GEMINI_CHUNK_SIZE_THRESHOLD_BYTES (default ~2 MB).
#
# Profiles:
#   * below threshold -> small profile (512 / 100)
#   * at/above        -> large profile (1024 / 150)
#
# All values are env-tunable. Set a *_MAX_TOKENS value to 0 to disable that
# profile and fall back to Gemini's automatic chunking.
# Gemini File Search hard-caps tokens per chunk at 512 (the API returns
# "number of tokens per chunk must be between 0 and 512" otherwise). We clamp to
# this so a misconfigured env can never produce an invalid request again.
GEMINI_MAX_CHUNK_TOKENS_LIMIT = 512

GEMINI_CHUNK_PAGE_THRESHOLD = int(os.getenv('GEMINI_CHUNK_PAGE_THRESHOLD', '50'))
GEMINI_CHUNK_SIZE_THRESHOLD_BYTES = int(os.getenv('GEMINI_CHUNK_SIZE_THRESHOLD_BYTES', '2000000'))

# Document splitting for very large PDFs.
#
# ``chunking_config`` above only controls how the *extracted text* is sliced into
# embedding chunks — it does NOT change how many pages Gemini ingests from a
# single uploaded document. Very large PDFs (hundreds/thousands of pages) can be
# only partially ingested, so deep pages never become retrievable. To guarantee
# full coverage we physically split a large PDF into overlapping page-range
# sub-PDFs and upload each as its own document into the SAME File Search store,
# all tagged with the same evidence_revision_id. Retrieval (metadataFilter) then
# spans every chunk transparently — querying is unchanged.
#
#   * GEMINI_SPLIT_PAGE_LIMIT   max pages per chunk (0 disables splitting)
#   * GEMINI_SPLIT_PAGE_OVERLAP pages duplicated between adjacent chunks so
#                               content that straddles a boundary is never cut
#
# Only PDFs are split (we need a page model); other file types upload whole.
GEMINI_SPLIT_PAGE_LIMIT = int(os.getenv('GEMINI_SPLIT_PAGE_LIMIT', '100'))
GEMINI_SPLIT_PAGE_OVERLAP = int(os.getenv('GEMINI_SPLIT_PAGE_OVERLAP', '10'))
GEMINI_CHUNK_SMALL_MAX_TOKENS = int(os.getenv('GEMINI_CHUNK_SMALL_MAX_TOKENS', '512'))
GEMINI_CHUNK_SMALL_OVERLAP_TOKENS = int(os.getenv('GEMINI_CHUNK_SMALL_OVERLAP_TOKENS', '100'))
# Large profile is also capped at 512 (the API maximum); larger values are
# clamped down in _build_chunking_config.
GEMINI_CHUNK_LARGE_MAX_TOKENS = int(os.getenv('GEMINI_CHUNK_LARGE_MAX_TOKENS', '512'))
GEMINI_CHUNK_LARGE_OVERLAP_TOKENS = int(os.getenv('GEMINI_CHUNK_LARGE_OVERLAP_TOKENS', '150'))

# Resumable uploads of large files can be torn down by a transient 503/network
# blip; the SDK then retries the dead session and gets a 400 "Upload has already
# been terminated". We retry the *whole* upload (a fresh session each time) with
# exponential backoff to ride over these.
GEMINI_UPLOAD_MAX_RETRIES = int(os.getenv('GEMINI_UPLOAD_MAX_RETRIES', '3'))
GEMINI_UPLOAD_RETRY_BASE_DELAY_SECONDS = float(
    os.getenv('GEMINI_UPLOAD_RETRY_BASE_DELAY_SECONDS', '5')
)

# Substrings (lowercased) that mark an upload error as transient/retryable.
# Deliberately excludes generic "bad request"/"invalid" so genuine validation
# errors fail fast instead of being retried.
_TRANSIENT_UPLOAD_ERROR_MARKERS = (
    'upload has already been terminated',
    'terminated',
    '503',
    'service unavailable',
    'unavailable',
    'internal server error',
    'internal error',
    '429',
    'too many requests',
    'resource exhausted',
    'rate limit',
    'deadline',
    'timeout',
    'timed out',
    'connection reset',
    'connection aborted',
    'broken pipe',
    'eof occurred',
)


def _is_transient_upload_error(exc) -> bool:
    """True when an upload error looks transient and worth retrying."""
    msg = str(exc).lower()
    return any(marker in msg for marker in _TRANSIENT_UPLOAD_ERROR_MARKERS)


def _count_pdf_pages(file_path: str) -> Optional[int]:
    """Return the PDF page count, or ``None`` when it can't be determined.

    Returns ``None`` (so the caller falls back to the file-size proxy) when the
    file is not a PDF, ``pypdf`` is not installed, the PDF is encrypted/corrupt,
    or any parse error occurs. Never raises.
    """
    try:
        with open(file_path, 'rb') as fh:
            header = fh.read(5)
    except OSError as exc:
        logger.warning(
            "Could not read file header for page count; using file-size proxy",
            file_path=file_path,
            error=str(exc),
        )
        return None

    # Detect PDFs by magic bytes rather than extension — the upload tempfile may
    # not carry a reliable suffix, and we never want to mis-parse a non-PDF.
    if not header.startswith(b'%PDF'):
        return None

    try:
        from pypdf import PdfReader
    except ImportError:
        logger.info(
            "pypdf not installed; using file-size proxy for chunking. "
            "Install pypdf to route PDFs by page count."
        )
        return None

    try:
        reader = PdfReader(file_path)
        page_count = len(reader.pages)
    except Exception as exc:  # noqa: BLE001 — never fail an upload over page counting
        logger.warning(
            "Could not read PDF page count; using file-size proxy",
            file_path=file_path,
            error=str(exc),
        )
        return None

    return page_count if page_count > 0 else None


def _build_chunking_config(file_path: str) -> Optional[Dict[str, Any]]:
    """Pick a Gemini ``chunking_config`` based on the document's length.

    For PDFs we route on the real page count (``pypdf``) against
    ``GEMINI_CHUNK_PAGE_THRESHOLD``. For everything else — or when a PDF can't be
    parsed / ``pypdf`` is missing — we fall back to a file-size proxy against
    ``GEMINI_CHUNK_SIZE_THRESHOLD_BYTES``. Returns the
    ``{'white_space_config': {...}}`` mapping expected by
    ``upload_to_file_search_store``, or ``None`` when the selected profile's
    ``max_tokens`` is ``0``/unset (falls back to Gemini's automatic chunking).
    Never raises — on any error it returns ``None`` so the upload proceeds with
    default chunking.
    """
    page_count = _count_pdf_pages(file_path)

    if page_count is not None:
        is_large = page_count >= GEMINI_CHUNK_PAGE_THRESHOLD
        basis = {"routed_by": "pages", "page_count": page_count, "page_threshold": GEMINI_CHUNK_PAGE_THRESHOLD}
    else:
        try:
            size_bytes = os.path.getsize(file_path)
        except OSError as exc:
            logger.warning(
                "Could not stat file for chunking config; using Gemini default chunking",
                file_path=file_path,
                error=str(exc),
            )
            return None
        is_large = size_bytes >= GEMINI_CHUNK_SIZE_THRESHOLD_BYTES
        basis = {"routed_by": "size", "size_bytes": size_bytes, "threshold_bytes": GEMINI_CHUNK_SIZE_THRESHOLD_BYTES}

    if is_large:
        profile = "large"
        max_tokens = GEMINI_CHUNK_LARGE_MAX_TOKENS
        overlap_tokens = GEMINI_CHUNK_LARGE_OVERLAP_TOKENS
    else:
        profile = "small"
        max_tokens = GEMINI_CHUNK_SMALL_MAX_TOKENS
        overlap_tokens = GEMINI_CHUNK_SMALL_OVERLAP_TOKENS

    if not max_tokens or max_tokens <= 0:
        logger.info(
            "Chunking profile disabled; using Gemini automatic chunking",
            profile=profile,
            **basis,
        )
        return None

    # Gemini File Search rejects max_tokens_per_chunk > 512 with a 400. Clamp so
    # an over-large env value degrades gracefully instead of failing the upload.
    if max_tokens > GEMINI_MAX_CHUNK_TOKENS_LIMIT:
        logger.warning(
            "max_tokens_per_chunk exceeds Gemini limit; clamping",
            profile=profile,
            requested=max_tokens,
            clamped_to=GEMINI_MAX_CHUNK_TOKENS_LIMIT,
        )
        max_tokens = GEMINI_MAX_CHUNK_TOKENS_LIMIT

    # Overlap must be strictly smaller than the window; clamp defensively so a
    # misconfigured env can't produce an invalid request.
    if overlap_tokens < 0:
        overlap_tokens = 0
    if overlap_tokens >= max_tokens:
        overlap_tokens = max(0, max_tokens // 5)

    logger.info(
        "Selected Gemini chunking profile",
        profile=profile,
        max_tokens_per_chunk=max_tokens,
        max_overlap_tokens=overlap_tokens,
        **basis,
    )
    return {
        'white_space_config': {
            'max_tokens_per_chunk': max_tokens,
            'max_overlap_tokens': overlap_tokens,
        }
    }


def _split_pdf_into_page_ranges(
    file_path: str,
    page_limit: int,
    overlap: int,
) -> List[Dict[str, Any]]:
    """Split a PDF into overlapping page-range temp files.

    Returns a list of ``{'path', 'start_page', 'end_page', 'index'}`` (page
    numbers 1-indexed, inclusive). Returns an empty list — so the caller uploads
    the file whole — when splitting is not applicable: ``page_limit`` <= 0, the
    file is not a PDF, ``pypdf`` is missing, the page count is within the limit,
    or any error occurs. Never raises.

    The caller owns the returned temp files and must delete them.
    """
    if page_limit <= 0:
        return []

    page_count = _count_pdf_pages(file_path)
    if not page_count or page_count <= page_limit:
        return []

    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        logger.info(
            "pypdf not installed; cannot split large PDF, uploading whole. "
            "Install pypdf to enable page-range splitting."
        )
        return []

    if overlap < 0:
        overlap = 0
    if overlap >= page_limit:
        # Overlap must leave forward progress; clamp to a fifth of the window.
        overlap = max(0, page_limit // 5)
    step = page_limit - overlap
    if step <= 0:
        step = page_limit

    chunks: List[Dict[str, Any]] = []
    try:
        reader = PdfReader(file_path)
        n = len(reader.pages)
        start = 0
        idx = 0
        while start < n:
            end = min(start + page_limit, n)
            writer = PdfWriter()
            for p in range(start, end):
                writer.add_page(reader.pages[p])
            tmp = tempfile.NamedTemporaryFile(
                prefix='gemini-pdf-chunk-', suffix='.pdf', delete=False
            )
            tmp_path = tmp.name
            tmp.close()
            with open(tmp_path, 'wb') as fh:
                writer.write(fh)
            chunks.append({
                'path': tmp_path,
                'start_page': start + 1,
                'end_page': end,
                'index': idx,
            })
            idx += 1
            if end >= n:
                break
            start += step
    except Exception as exc:  # noqa: BLE001 — never fail an upload over splitting
        logger.warning(
            "Failed to split PDF into page ranges; will upload whole file",
            file_path=file_path,
            error=str(exc),
        )
        for c in chunks:
            try:
                os.unlink(c['path'])
            except OSError:
                pass
        return []

    return chunks


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

        chunking_config = _build_chunking_config(file_path)
        if chunking_config:
            upload_config['chunking_config'] = chunking_config

        # Retry the whole upload on transient failures. Each attempt opens a
        # *fresh* upload session — critical because the SDK can't recover a
        # session torn down mid-stream by a 503 (it retries the dead session and
        # gets a 400 "Upload has already been terminated"). Larger files take
        # longer to stream and are far more exposed to such transient blips.
        operation = None
        for attempt in range(1, GEMINI_UPLOAD_MAX_RETRIES + 1):
            try:
                logger.info(
                    "Uploading file to Gemini File Search Store",
                    file_path=file_path,
                    display_name=display_name,
                    store_name=self.store_name,
                    custom_metadata_keys=[m.get('key') for m in encoded_metadata] if encoded_metadata else [],
                    chunking_config=chunking_config,
                    attempt=attempt,
                    max_attempts=GEMINI_UPLOAD_MAX_RETRIES,
                )
                operation = self._upload_to_file_search_store(file_path, upload_config)
                break
            except Exception as e:
                transient = _is_transient_upload_error(e)
                if attempt < GEMINI_UPLOAD_MAX_RETRIES and transient:
                    delay = GEMINI_UPLOAD_RETRY_BASE_DELAY_SECONDS * (2 ** (attempt - 1))
                    logger.warning(
                        "Transient error uploading to Gemini File Search Store; "
                        "retrying with a fresh session",
                        attempt=attempt,
                        max_attempts=GEMINI_UPLOAD_MAX_RETRIES,
                        retry_in_seconds=delay,
                        error=str(e),
                    )
                    time.sleep(delay)
                    continue
                logger.error(
                    "Failed to upload file to Gemini File Search Store",
                    error=str(e),
                    file_path=file_path,
                    attempt=attempt,
                    transient=transient,
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

    def upload_evidence_file_and_wait(
        self,
        file_path: str,
        display_name: str,
        custom_metadata: Optional[Dict[str, Any]] = None,
        max_wait_seconds: int = GEMINI_INDEX_MAX_WAIT_SECONDS,
        poll_interval: int = 3,
    ) -> Dict[str, Any]:
        """Upload a file, splitting very large PDFs into overlapping page chunks.

        A large PDF is split into overlapping page-range sub-PDFs; each is
        uploaded as its own document into the **same** store, all carrying the
        **same** ``custom_metadata`` (notably ``evidence_revision_id``). Retrieval
        via ``metadataFilter`` therefore spans every chunk — the split is purely
        an upload-time detail, querying is unchanged. Non-PDFs and small PDFs are
        uploaded whole (identical to ``upload_to_store_and_wait``).

        Returns an aggregate dict:
            * status: 'completed' (all chunks indexed) | 'failed' | 'timeout'
            * gemini_document_ids: list of durable document names
            * gemini_document_id: first durable name (backward compat)
            * gemini_store_id: the store name
            * chunk_count: number of chunks (1 = uploaded whole)
            * documents: per-chunk [{page_range, index, status, gemini_document_id}]
            * operation_id / error: as applicable
        """
        chunks = _split_pdf_into_page_ranges(
            file_path, GEMINI_SPLIT_PAGE_LIMIT, GEMINI_SPLIT_PAGE_OVERLAP
        )

        # No split needed → single whole-file upload (unchanged behaviour), but
        # normalize the result to the aggregate shape.
        if not chunks:
            result = self.upload_to_store_and_wait(
                file_path, display_name, custom_metadata,
                max_wait_seconds, poll_interval,
            )
            doc_id = (
                result.get('gemini_document_id', '')
                if result.get('status') == 'completed' else ''
            )
            result['chunk_count'] = 1 if doc_id else 0
            result['gemini_document_ids'] = [doc_id] if doc_id else []
            return result

        logger.info(
            "Splitting large PDF for File Search upload",
            file_path=file_path,
            total_chunks=len(chunks),
            page_limit=GEMINI_SPLIT_PAGE_LIMIT,
            page_overlap=GEMINI_SPLIT_PAGE_OVERLAP,
        )

        documents: List[Dict[str, Any]] = []
        doc_ids: List[str] = []
        failed: Optional[Dict[str, Any]] = None
        try:
            for c in chunks:
                page_range = f"{c['start_page']}-{c['end_page']}"
                chunk_meta = dict(custom_metadata or {})
                chunk_meta['chunk_index'] = str(c['index'])
                chunk_meta['page_range'] = page_range
                chunk_display = f"{display_name} [pages {page_range}]"

                res = self.upload_to_store_and_wait(
                    c['path'], chunk_display, chunk_meta,
                    max_wait_seconds, poll_interval,
                )
                documents.append({
                    'page_range': page_range,
                    'index': c['index'],
                    'status': res.get('status'),
                    'gemini_document_id': res.get('gemini_document_id', ''),
                })
                if res.get('status') == 'completed' and res.get('gemini_document_id'):
                    doc_ids.append(res['gemini_document_id'])
                else:
                    failed = res
                    break  # stop on first failing chunk
        finally:
            for c in chunks:
                try:
                    os.unlink(c['path'])
                except OSError:
                    pass

        if failed is not None:
            # Roll back the chunks that DID index so a retry starts clean and we
            # never leave a half-indexed document set behind.
            if doc_ids:
                self.delete_store_documents(doc_ids)
            failed_range = documents[-1]['page_range'] if documents else '?'
            return {
                'status': failed.get('status', 'failed'),
                'gemini_document_ids': [],
                'gemini_document_id': '',
                'gemini_store_id': self.store_name,
                'chunk_count': len(chunks),
                'documents': documents,
                'error': (
                    f"chunk {len(doc_ids) + 1}/{len(chunks)} (pages {failed_range}) "
                    f"failed: {failed.get('error', 'unknown error')}"
                ),
            }

        logger.info(
            "Large PDF fully indexed across chunks",
            store_name=self.store_name,
            chunk_count=len(chunks),
            document_count=len(doc_ids),
        )
        return {
            'status': 'completed',
            'gemini_document_ids': doc_ids,
            'gemini_document_id': doc_ids[0] if doc_ids else '',
            'gemini_store_id': self.store_name,
            'chunk_count': len(chunks),
            'documents': documents,
        }

    def _upload_to_file_search_store(self, file_path: str, upload_config: Dict[str, Any]):
        """One upload attempt, with graceful fallback for older SDKs.

        Older google-genai versions may not accept ``custom_metadata`` or
        ``chunking_config`` in the upload config (raising ``TypeError``). We drop
        whichever key the SDK complained about and retry once within this single
        attempt, so the upload still succeeds. ``upload_config`` is mutated in
        place so dropped keys stay dropped on subsequent transient retries.
        """
        try:
            return self.client.file_search_stores.upload_to_file_search_store(
                file=file_path,
                file_search_store_name=self.store_name,
                config=upload_config,
            )
        except TypeError as e:
            err_str = str(e)
            dropped = []
            if 'custom_metadata' in upload_config and 'custom_metadata' in err_str:
                upload_config.pop('custom_metadata', None)
                dropped.append('custom_metadata')
            if 'chunking_config' in upload_config and 'chunking_config' in err_str:
                upload_config.pop('chunking_config', None)
                dropped.append('chunking_config')

            if not dropped:
                raise

            logger.warning(
                "google-genai SDK rejected upload config keys; retrying without them. "
                "Upgrade google-genai to enable these features.",
                dropped_keys=dropped,
                error=err_str,
            )
            return self.client.file_search_stores.upload_to_file_search_store(
                file=file_path,
                file_search_store_name=self.store_name,
                config=upload_config,
            )

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

    def delete_store_documents(self, document_names: List[str]) -> int:
        """Best-effort deletion of several File Search Store documents.

        Returns the count successfully deleted. Used to clean up every chunk of a
        split upload (e.g. on revision delete or to roll back a partial upload).
        """
        deleted = 0
        for name in document_names or []:
            if self.delete_store_document(name):
                deleted += 1
        return deleted


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
