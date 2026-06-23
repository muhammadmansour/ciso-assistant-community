/**
 * Client-side PDF page counter.
 *
 * Used to enforce upload page-count limits before the file leaves the browser.
 * `pdf-lib` is imported dynamically *and only in the browser* so it never
 * lands in the SvelteKit SSR bundle (the Node server has no business loading
 * a 300KB PDF parser, and on stale deploys the package may not even be
 * installed in `node_modules`).
 */
import { browser } from '$app/environment';

export function isPdfFile(file: File): boolean {
	if (file.type === 'application/pdf') return true;
	const name = file.name?.toLowerCase() ?? '';
	return name.endsWith('.pdf');
}

/**
 * Returns the number of pages in a PDF file, or `null` if the page count
 * cannot be determined (server-side render, corrupt file, encrypted PDF,
 * parse error, etc.). Callers should treat `null` as "skip the limit check"
 * rather than block — the backend remains the source of truth.
 */
export async function getPdfPageCount(file: File): Promise<number | null> {
	if (!browser) return null;
	try {
		const { PDFDocument } = await import('pdf-lib');
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
