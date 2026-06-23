/**
 * Client-side PDF page counter.
 *
 * Used to enforce upload page-count limits before the file leaves the browser.
 * `pdf-lib` parses the document structure without rendering, so it stays fast
 * even on large PDFs. We pass `updateMetadata: false` to skip writing the
 * "Producer/ModDate" entries (not needed here and slightly faster).
 */
import { PDFDocument } from 'pdf-lib';

export function isPdfFile(file: File): boolean {
	if (file.type === 'application/pdf') return true;
	const name = file.name?.toLowerCase() ?? '';
	return name.endsWith('.pdf');
}

/**
 * Returns the number of pages in a PDF file, or `null` if the page count
 * cannot be determined (corrupt file, encrypted PDF, parse error, etc.).
 * Callers should treat `null` as "skip the limit check" rather than block —
 * the backend remains the source of truth.
 */
export async function getPdfPageCount(file: File): Promise<number | null> {
	try {
		const buffer = await file.arrayBuffer();
		const doc = await PDFDocument.load(buffer, {
			updateMetadata: false,
			ignoreEncryption: true
		});
		return doc.getPageCount();
	} catch {
		return null;
	}
}
