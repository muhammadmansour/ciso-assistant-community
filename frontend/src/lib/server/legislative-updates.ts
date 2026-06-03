/**
 * Server-only helpers for the legislative-updates upstream feed.
 *
 * Upstream is the GRC-admin "AI pipeline runs" API at
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs/<id>
 *
 * The endpoint accepts the same Knox token the CISO Assistant backend
 * uses (`Authorization: Token <token>`). We pull it out of the `token`
 * cookie set on login (see hooks.server.ts) and forward it on every
 * upstream call. Cookie/`Authorization` headers from the incoming
 * request are forwarded too, as a belt-and-braces fallback for any
 * session cookie scoped to a shared parent domain.
 *
 * A static API key (`LEGISLATIVE_UPDATES_API_KEY`) is also supported
 * for service-to-service calls when there's no logged-in user.
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
 * Auth schemes we'll try in order when calling the upstream. The first
 * one that doesn't get a 401/403 wins. Most CISO-token-aware services
 * accept `Token <t>` (Knox/DRF style), but some gateways expect
 * `Bearer <t>` or send the raw value via `X-API-Key`.
 *
 * Override with `LEGISLATIVE_UPDATES_AUTH_SCHEME=Token|Bearer|X-API-Key`
 * to pin a single scheme and skip the auto-retry.
 */
const PINNED_SCHEME = (process.env.LEGISLATIVE_UPDATES_AUTH_SCHEME ?? '').trim();
const SCHEMES_TO_TRY: Array<'Token' | 'Bearer' | 'X-API-Key'> = PINNED_SCHEME
	? [PINNED_SCHEME as 'Token' | 'Bearer' | 'X-API-Key']
	: ['Token', 'Bearer', 'X-API-Key'];

/**
 * Find the token to use for upstream auth. Priority:
 *   1. The incoming request's Authorization header (a gateway can
 *      transparently override this).
 *   2. The user's Knox `token` cookie set by CISO Assistant on login.
 *   3. The service-to-service `LEGISLATIVE_UPDATES_API_KEY` env.
 */
function resolveUpstreamToken(event: RequestEvent | undefined): {
	token: string | null;
	source: string;
	pinnedHeader?: { name: string; value: string };
} {
	const incomingAuth = event?.request.headers.get('authorization');
	if (incomingAuth) {
		// Don't second-guess a value the caller already shaped — just pass it on.
		return {
			token: null,
			source: 'incoming-authorization',
			pinnedHeader: { name: 'authorization', value: incomingAuth }
		};
	}
	const knoxToken = event?.cookies.get('token');
	if (knoxToken) return { token: knoxToken, source: 'ciso-cookie' };
	if (API_KEY) return { token: API_KEY, source: 'env-api-key' };
	return { token: null, source: 'none' };
}

function buildHeadersForScheme(
	event: RequestEvent | undefined,
	scheme: 'Token' | 'Bearer' | 'X-API-Key' | null,
	token: string | null,
	pinnedHeader?: { name: string; value: string }
): Record<string, string> {
	const headers: Record<string, string> = { accept: 'application/json' };
	const cookie = event?.request.headers.get('cookie');
	if (cookie) headers.cookie = cookie;

	if (pinnedHeader) {
		headers[pinnedHeader.name] = pinnedHeader.value;
		return headers;
	}
	if (!token || !scheme) return headers;
	if (scheme === 'X-API-Key') headers['x-api-key'] = token;
	else headers.authorization = `${scheme} ${token}`;
	return headers;
}

/**
 * Fire one or more requests to the upstream, retrying with the next
 * auth scheme on 401/403 until one succeeds. Returns the final
 * Response and the scheme that "won" (or the last one tried on
 * persistent failure).
 */
async function authedFetch(
	fetchFn: typeof fetch,
	url: string,
	event: RequestEvent | undefined,
	label: string
): Promise<{ res: Response; schemeUsed: string }> {
	const { token, source, pinnedHeader } = resolveUpstreamToken(event);
	// When the caller pinned an Authorization header, we don't iterate.
	if (pinnedHeader) {
		const res = await fetchFn(url, {
			headers: buildHeadersForScheme(event, null, null, pinnedHeader)
		});
		console.log(
			`[legislative-updates] ${label} -> ${res.status} (auth=incoming-header, source=${source})`
		);
		return { res, schemeUsed: 'incoming' };
	}
	if (!token) {
		const res = await fetchFn(url, { headers: buildHeadersForScheme(event, null, null) });
		console.log(`[legislative-updates] ${label} -> ${res.status} (auth=none, source=${source})`);
		return { res, schemeUsed: 'none' };
	}

	let lastRes: Response | null = null;
	let lastScheme = '';
	for (const scheme of SCHEMES_TO_TRY) {
		const res = await fetchFn(url, {
			headers: buildHeadersForScheme(event, scheme, token)
		});
		lastRes = res;
		lastScheme = scheme;
		console.log(
			`[legislative-updates] ${label} -> ${res.status} (scheme=${scheme}, source=${source}, token=${token.slice(0, 4)}…${token.slice(-4)})`
		);
		if (res.status !== 401 && res.status !== 403) {
			return { res, schemeUsed: scheme };
		}
		// 401/403 — fall through and try the next scheme. The body of the
		// rejected response will be GC'd; we don't drain it here because
		// the outer caller may still want to read the *last* response's
		// body for a diagnostic preview.
	}
	return { res: lastRes!, schemeUsed: lastScheme };
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
		const { res } = await authedFetch(fetchFn, LEGISLATIVE_UPDATES_API_URL, event, 'list');
		if (res.status === 401 || res.status === 403) {
			const body = await safeBodyPreview(res);
			console.warn(`[legislative-updates] list got ${res.status}; upstream said: ${body}`);
			return { items: [], upstreamStatus: 'unauthorized' };
		}
		if (!res.ok) {
			const body = await safeBodyPreview(res);
			console.error(
				`[legislative-updates] list upstream returned ${res.status} ${res.statusText}; body: ${body}`
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
		const { res } = await authedFetch(fetchFn, detailUrl, event, `detail[${id}]`);
		if (res.status === 404) {
			return { item: null, upstreamStatus: 'ok' };
		}
		if (res.status === 401 || res.status === 403) {
			const body = await safeBodyPreview(res);
			console.warn(`[legislative-updates] detail got ${res.status}; upstream said: ${body}`);
			return { item: null, upstreamStatus: 'unauthorized' };
		}
		if (!res.ok) {
			const body = await safeBodyPreview(res);
			console.error(
				`[legislative-updates] detail upstream returned ${res.status} ${res.statusText} for ${id}; body: ${body}`
			);
			return { item: null, upstreamStatus: 'error' };
		}
		const payload = (await res.json()) as unknown;
		return { item: extractItem(payload), upstreamStatus: 'ok' };
	} catch (err) {
		console.error('[legislative-updates] detail upstream fetch failed', err);
		const { items, upstreamStatus } = await fetchLegislativeUpdates(fetchFn, event);
		if (upstreamStatus !== 'ok') return { item: null, upstreamStatus };
		return { item: items.find((i) => i.id === id) ?? null, upstreamStatus: 'ok' };
	}
}

async function safeBodyPreview(res: Response, max = 200): Promise<string> {
	try {
		const text = await res.text();
		return text.length > max ? `${text.slice(0, max)}…` : text;
	} catch {
		return '<no body>';
	}
}
