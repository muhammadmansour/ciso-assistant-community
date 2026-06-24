/**
 * Server-only helpers for the legislative-updates upstream feed.
 *
 * Upstream is the GRC-admin "pipeline legislative-updates" API at
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-legislative-updates
 *   GET https://grc-admin.wathbah.dev/api/ai-tools/pipeline-legislative-updates/<id>
 *
 * These endpoints are public — no auth header is required. URLs can be
 * overridden per-environment via `LEGISLATIVE_UPDATES_API_URL` /
 * `LEGISLATIVE_UPDATE_DETAIL_API_URL`.
 *
 * The legacy `/pipeline-runs` shape (raw pipeline-execution records that we
 * used to massage client-side) is intentionally NOT supported anymore — the
 * new endpoint already ships a curated, policy-first envelope.
 */

import type { RequestEvent } from '@sveltejs/kit';

// --- Pipeline-stage subtypes (mirrors the /pipeline-legislative-updates/<id> shape) ---

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
	change_type?: 'add' | 'modify' | 'remove' | 'strengthen' | string;
};

export type PipelineSeverity = 'critical' | 'high' | 'medium' | 'low' | 'none' | string;

// One regulation-point hit on a single policy, as nested inside
// `impacts_by_policy[*].matched_points`.
export type PipelineMatchedPoint = {
	point_id: string;
	point_text: string;
	impact_summary: string;
	severity: PipelineSeverity;
	severity_label?: string;
	severity_reasoning?: string;
	requires_amendment: boolean;
	similarity_score?: number;
	amendments?: PipelineImpactAmendment[];
	compliance_gap?: string;
	is_affected?: boolean;
};

// Top-level entry in the policy-first `impacts_by_policy` list.
export type PipelinePolicyImpactBundle = {
	policy_id: string;
	policy_title: string;
	is_affected: boolean;
	impact_level?: string;
	impact_label?: string;
	worst_severity?: PipelineSeverity;
	worst_severity_label?: string;
	requires_amendment: boolean;
	matched_points_count: number;
	affected_points_count: number;
	matched_points: PipelineMatchedPoint[];
};

// Legacy regulation-point-first shape — still shipped by the API for
// debugging / back-compat, but the UI no longer renders from it.
export type PipelinePolicyImpactLegacy = {
	policy_id: string;
	policy_title: string;
	similarity_score?: number;
	impact_summary: string;
	severity: PipelineSeverity;
	severity_reasoning?: string;
	requires_amendment: boolean;
	amendments?: PipelineImpactAmendment[];
	compliance_gap?: string;
};

export type PipelineImpactForPoint = {
	point_id: string;
	point_text: string;
	impacts: PipelinePolicyImpactLegacy[];
};

export type PipelineBlock = {
	stage_reached?: string;
	f1_relevance?: PipelineRelevance;
	key_changes?: PipelineKeyChange[];
	f3_matches?: PipelineMatchesForPoint[];
	// Policy-first reshape — what the Impact analysis tab renders from.
	impacts_by_policy?: PipelinePolicyImpactBundle[];
	// Regulation-point-first — kept for reference, NOT rendered.
	impact_analysis?: PipelineImpactForPoint[];
	policy_count_indexed?: number;
};

export type LegislativeUpdateMetadata = Record<string, unknown> & {
	stage_reached?: string;
	policy_count_indexed?: number;
	f1_confidence?: number;
	derived_from?: Record<string, string>;
	// Legacy paths kept for back-compat with the older /extracted mirror,
	// which exposed coarse string-shaped summaries directly on metadata.
	key_changes?: string[] | null;
	summary?: string | null;
	impact_analysis?: string | null;
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
	// Total policies F4 inspected (including non-affected ones). Used for the
	// "Analysed N policies" sublabel under the Affected policies tile.
	analyzed_policies_count?: number;
	analyzed_policy_ids?: string[];
	tags: string[];
	language: string;
	metadata: LegislativeUpdateMetadata;
	created_at: string;
	updated_at: string;
	// Rich AI-pipeline payload. Optional because list rows may ship a
	// leaner version without f3_matches / impacts_by_policy.
	pipeline?: PipelineBlock;
};

export type UpstreamStatus = 'ok' | 'unauthorized' | 'error';

export const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	'https://grc-admin.wathbah.dev/api/ai-tools/pipeline-legislative-updates';

export const LEGISLATIVE_UPDATE_DETAIL_API_URL =
	process.env.LEGISLATIVE_UPDATE_DETAIL_API_URL ?? LEGISLATIVE_UPDATES_API_URL;

/**
 * The new endpoint always returns `{ items: [...] }`. We still accept a
 * raw array and the `data`/`results` keys so a temporary upstream change
 * doesn't blank out the page silently.
 */
function extractItems(payload: unknown): LegislativeUpdate[] {
	let raw: unknown[] = [];
	if (Array.isArray(payload)) raw = payload;
	else if (payload && typeof payload === 'object') {
		const p = payload as Record<string, unknown>;
		if (Array.isArray(p.items)) raw = p.items;
		else if (Array.isArray(p.data)) raw = p.data;
		else if (Array.isArray(p.results)) raw = p.results;
	}
	return raw.filter((i): i is LegislativeUpdate => isLegislativeUpdate(i));
}

function extractItem(payload: unknown): LegislativeUpdate | null {
	if (!payload || typeof payload !== 'object') return null;
	const p = payload as Record<string, unknown>;
	let raw: unknown = null;
	if (p.item && typeof p.item === 'object') raw = p.item;
	else if (p.data && typeof p.data === 'object' && !Array.isArray(p.data)) raw = p.data;
	else if (typeof p.id === 'string') raw = p;
	return isLegislativeUpdate(raw) ? raw : null;
}

function isLegislativeUpdate(raw: unknown): raw is LegislativeUpdate {
	if (!raw || typeof raw !== 'object') return false;
	const r = raw as Record<string, unknown>;
	return typeof r.id === 'string' && !!r.id;
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
