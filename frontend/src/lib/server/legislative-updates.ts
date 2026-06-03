/**
 * Server-only helpers for the legislative-updates upstream feed.
 *
 * Upstream is the GRC-admin "AI pipeline runs" API at
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs/<id>
 *
 * The endpoint requires the same auth as the rest of the GRC-admin app
 * (cookie/token from a successful GRC-admin login). To make that work
 * without a dedicated machine credential, we forward the incoming
 * browser request's `cookie` and `Authorization` headers to the upstream.
 * This relies on the GRC-admin session cookie being scoped to a parent
 * domain that the SvelteKit app also serves under (e.g. `.wathbah.dev`).
 *
 * If that isn't viable in your environment, set
 *   LEGISLATIVE_UPDATES_API_KEY=<token>
 * and the helper will send `Authorization: Bearer <token>` instead.
 */

import type { RequestEvent } from '@sveltejs/kit';

export type LegislativeUpdate = {
	id: string;
	title: string;
	description: string;
	source: string | null;
	source_id: string | null;
	internal_source_id: string | null;
	external_url: string | null;
	published_at: string | null;
	status: string;
	status_label: string;
	impact_level: string;
	impact_label: string;
	affected_policies_count: number;
	affected_policy_ids: string[];
	tags: string[];
	language: string;
	metadata: Record<string, unknown> & {
		key_changes?: string[] | null;
		summary?: string | null;
		impact_analysis?: string | null;
		tasks?: Array<{ id?: string; title?: string; status?: string }> | null;
	};
	created_at: string;
	updated_at: string;
};

export type UpstreamStatus = 'ok' | 'unauthorized' | 'error';

export const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	'https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs';

export const LEGISLATIVE_UPDATE_DETAIL_API_URL =
	process.env.LEGISLATIVE_UPDATE_DETAIL_API_URL ?? LEGISLATIVE_UPDATES_API_URL;

const API_KEY = process.env.LEGISLATIVE_UPDATES_API_KEY ?? '';

/**
 * Build the headers we send upstream. We forward the user's `cookie` and
 * `Authorization` headers so the upstream sees the same session the
 * browser already has. A static API key from env wins only if the user
 * isn't sending their own Authorization (so an admin token doesn't
 * override a logged-in user's identity).
 */
function buildUpstreamHeaders(event: RequestEvent | undefined): Record<string, string> {
	const headers: Record<string, string> = { accept: 'application/json' };
	const incoming = event?.request.headers;
	const cookie = incoming?.get('cookie');
	if (cookie) headers.cookie = cookie;
	const auth = incoming?.get('authorization');
	if (auth) headers.authorization = auth;
	if (!headers.authorization && API_KEY) {
		headers.authorization = `Bearer ${API_KEY}`;
	}
	return headers;
}

/**
 * Pipeline-runs may wrap items in {success, items|data} or return a raw
 * array. Probe both shapes so we don't lock the loader to one schema.
 */
function extractItems(payload: unknown): LegislativeUpdate[] {
	if (Array.isArray(payload)) return payload as LegislativeUpdate[];
	if (payload && typeof payload === 'object') {
		const p = payload as Record<string, unknown>;
		if (Array.isArray(p.items)) return p.items as LegislativeUpdate[];
		if (Array.isArray(p.data)) return p.data as LegislativeUpdate[];
		if (Array.isArray(p.results)) return p.results as LegislativeUpdate[];
	}
	return [];
}

function extractItem(payload: unknown): LegislativeUpdate | null {
	if (!payload || typeof payload !== 'object') return null;
	const p = payload as Record<string, unknown>;
	if (p.item && typeof p.item === 'object') return p.item as LegislativeUpdate;
	if (p.data && typeof p.data === 'object' && !Array.isArray(p.data))
		return p.data as LegislativeUpdate;
	// Some APIs return the bare resource at the top level.
	if (typeof p.id === 'string') return p as unknown as LegislativeUpdate;
	return null;
}

export async function fetchLegislativeUpdates(
	fetchFn: typeof fetch,
	event?: RequestEvent
): Promise<{ items: LegislativeUpdate[]; upstreamStatus: UpstreamStatus }> {
	try {
		const res = await fetchFn(LEGISLATIVE_UPDATES_API_URL, {
			headers: buildUpstreamHeaders(event)
		});
		if (res.status === 401 || res.status === 403) {
			return { items: [], upstreamStatus: 'unauthorized' };
		}
		if (!res.ok) {
			console.error(
				`[legislative-updates] list upstream returned ${res.status} ${res.statusText}`
			);
			return { items: [], upstreamStatus: 'error' };
		}
		const payload = (await res.json()) as unknown;
		return { items: extractItems(payload), upstreamStatus: 'ok' };
	} catch (err) {
		console.error('[legislative-updates] list upstream fetch failed', err);
		return { items: [], upstreamStatus: 'error' };
	}
}

export async function fetchLegislativeUpdateById(
	fetchFn: typeof fetch,
	id: string,
	event?: RequestEvent
): Promise<{ item: LegislativeUpdate | null; upstreamStatus: UpstreamStatus }> {
	const detailUrl = `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, '')}/${encodeURIComponent(id)}`;
	try {
		const res = await fetchFn(detailUrl, { headers: buildUpstreamHeaders(event) });
		if (res.status === 404) {
			return { item: null, upstreamStatus: 'ok' };
		}
		if (res.status === 401 || res.status === 403) {
			return { item: null, upstreamStatus: 'unauthorized' };
		}
		if (!res.ok) {
			console.error(
				`[legislative-updates] detail upstream returned ${res.status} ${res.statusText} for ${id}`
			);
			return { item: null, upstreamStatus: 'error' };
		}
		const payload = (await res.json()) as unknown;
		return { item: extractItem(payload), upstreamStatus: 'ok' };
	} catch (err) {
		console.error('[legislative-updates] detail upstream fetch failed', err);
		// Last-ditch: try the list endpoint and filter so a transient detail
		// failure still renders content when the list is reachable.
		const { items, upstreamStatus } = await fetchLegislativeUpdates(fetchFn, event);
		if (upstreamStatus !== 'ok') return { item: null, upstreamStatus };
		return { item: items.find((i) => i.id === id) ?? null, upstreamStatus: 'ok' };
	}
}
