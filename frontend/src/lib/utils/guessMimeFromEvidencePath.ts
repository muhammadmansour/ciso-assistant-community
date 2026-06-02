/** Guess MIME type from evidence `attachment` string (often a storage URL or path with extension). */
const EXT_MAP: Record<string, string> = {
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.bmp': 'image/bmp',
	'.svg': 'image/svg+xml',
	'.tif': 'image/tiff',
	'.tiff': 'image/tiff'
};

export function guessMimeFromEvidenceField(raw: string | null | undefined): string {
	if (!raw) return 'application/octet-stream';
	let path = raw.trim();
	try {
		path = new URL(path, 'https://_/').pathname;
	} catch {
		/* use raw */
	}
	const base = path.split('/').pop() || path;
	const dot = base.lastIndexOf('.');
	const ext = dot >= 0 ? base.slice(dot).toLowerCase() : '';
	return EXT_MAP[ext] || 'application/octet-stream';
}

export function normalizedMime(ct: string | null | undefined): string {
	if (!ct) return 'application/octet-stream';
	const main = ct.split(';')[0].trim().toLowerCase();
	return main || 'application/octet-stream';
}
