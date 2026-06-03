/**
 * Server-only helpers for the legislative-updates upstream feed.
 *
 * Upstream is the GRC-admin "AI pipeline runs" API at
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs/<id>
 *
 * The endpoints are public — no auth header is required. URLs can still
 * be overridden per environment via `LEGISLATIVE_UPDATES_API_URL` /
 * `LEGISLATIVE_UPDATE_DETAIL_API_URL` if you ever need to swap hosts.
 */

import type { RequestEvent } from '@sveltejs/kit';

// --- Pipeline-stage subtypes (mirrors the new /api/ai-tools/pipeline-runs/<id> shape) ---

export type PipelineRelevance = {
	is_relevant: boolean;
	confidence: number;
	reasoning: string;
	relevant_aspects: string[];
	document_title?: string;
	document_summary?: string;
	document_source?: string;
	document_published_at?: string;
	document_tags?: string[];
};

export type PipelineKeyChange = {
	id: string;
	point: string;
	source_reference?: string;
	category?: string;
};

export type PipelinePolicyMatch = {
	policy_id: string;
	policy_title: string;
	content_excerpt?: string;
	similarity_score?: number;
};

export type PipelineMatchesForPoint = {
	point_id: string;
	point_text: string;
	matches: PipelinePolicyMatch[];
};

export type PipelineImpactAmendment = {
	policy_section?: string;
	current_text_summary?: string;
	required_change: string;
	change_type?: 'add' | 'modify' | 'remove' | string;
};

export type PipelinePolicyImpact = {
	policy_id: string;
	policy_title: string;
	similarity_score?: number;
	impact_summary: string;
	severity: 'critical' | 'high' | 'medium' | 'low' | 'none' | string;
	severity_reasoning?: string;
	requires_amendment: boolean;
	amendments?: PipelineImpactAmendment[];
	compliance_gap?: string;
};

export type PipelineImpactForPoint = {
	point_id: string;
	point_text: string;
	impacts: PipelinePolicyImpact[];
};

export type PipelineBlock = {
	stage_reached?: string;
	f1_relevance?: PipelineRelevance;
	key_changes?: PipelineKeyChange[];
	f3_matches?: PipelineMatchesForPoint[];
	impact_analysis?: PipelineImpactForPoint[];
	policy_count_indexed?: number;
};

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
		// Legacy paths kept for back-compat with the older /extracted mirror,
		// which exposed coarse string-shaped summaries directly on metadata.
		key_changes?: string[] | null;
		summary?: string | null;
		impact_analysis?: string | null;
	};
	created_at: string;
	updated_at: string;
	// New: the rich AI-pipeline payload added on the detail endpoint. Optional
	// because list rows ship a leaner version without f3_matches/impact_analysis.
	pipeline?: PipelineBlock;
};

export type UpstreamStatus = 'ok' | 'unauthorized' | 'error';

export const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	'https://grc-admin.wathbah.dev/api/ai-tools/pipeline-runs';

export const LEGISLATIVE_UPDATE_DETAIL_API_URL =
	process.env.LEGISLATIVE_UPDATE_DETAIL_API_URL ?? LEGISLATIVE_UPDATES_API_URL;

/**
 * Pipeline-runs may wrap items in {success, items|data|results} or return a
 * raw array. Probe all shapes so we don't lock the loader to one schema.
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
	if (typeof p.id === 'string') return p as unknown as LegislativeUpdate;
	return null;
}

export async function fetchLegislativeUpdates(
	fetchFn: typeof fetch,
	_event?: RequestEvent
): Promise<{ items: LegislativeUpdate[]; upstreamStatus: UpstreamStatus }> {
	try {
		const res = await fetchFn(LEGISLATIVE_UPDATES_API_URL, {
			headers: { accept: 'application/json' }
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
	_event?: RequestEvent
): Promise<{ item: LegislativeUpdate | null; upstreamStatus: UpstreamStatus }> {
	const detailUrl = `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, '')}/${encodeURIComponent(id)}`;
	try {
		const res = await fetchFn(detailUrl, { headers: { accept: 'application/json' } });
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
		// Fall back to the list endpoint so a transient detail failure still
		// renders content when the list is reachable.
		const { items, upstreamStatus } = await fetchLegislativeUpdates(fetchFn);
		if (upstreamStatus !== 'ok') return { item: null, upstreamStatus };
		return { item: items.find((i) => i.id === id) ?? null, upstreamStatus: 'ok' };
	}
}
