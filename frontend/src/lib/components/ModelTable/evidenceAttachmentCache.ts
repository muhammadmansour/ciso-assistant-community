/**
 * Deduplicate evidence table attachment fetches across list refreshes (e.g. indexing
 * polling) so unchanged files are not re-downloaded on every `/evidences` refetch.
 */

export interface CachedAttachment {
	type: string;
	url: string;
	fileExists: boolean;
}

const MAX_ENTRIES = 48;

const resolved = new Map<string, CachedAttachment>();
const inFlight = new Map<string, Promise<CachedAttachment>>();
const lru: string[] = [];

function touch(key: string) {
	const i = lru.indexOf(key);
	if (i >= 0) lru.splice(i, 1);
	lru.push(key);
	while (lru.length > MAX_ENTRIES) {
		const evict = lru.shift();
		if (!evict) break;
		const entry = resolved.get(evict);
		if (entry) {
			URL.revokeObjectURL(entry.url);
			resolved.delete(evict);
		}
	}
}

function remember(key: string, value: CachedAttachment) {
	const prev = resolved.get(key);
	if (prev && prev.url !== value.url) URL.revokeObjectURL(prev.url);
	resolved.set(key, value);
	touch(key);
}

/**
 * Returns a cached preview for `key`, or runs `loader()` once (shared in-flight per key).
 */
export function loadAttachmentCached(
	key: string,
	loader: () => Promise<CachedAttachment>
): Promise<CachedAttachment> {
	const hit = resolved.get(key);
	if (hit) {
		touch(key);
		return Promise.resolve(hit);
	}

	const pending = inFlight.get(key);
	if (pending) return pending;

	const p = loader()
		.then((v) => {
			// Avoid caching broken/intermittent downloads so retries can succeed after refresh.
			if (v.fileExists) remember(key, v);
			return v;
		})
		.finally(() => {
			inFlight.delete(key);
		});
	inFlight.set(key, p);
	return p;
}
