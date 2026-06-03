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
	let raw: unknown[] = [];
	if (Array.isArray(payload)) raw = payload;
	else if (payload && typeof payload === 'object') {
		const p = payload as Record<string, unknown>;
		if (Array.isArray(p.items)) raw = p.items;
		else if (Array.isArray(p.data)) raw = p.data;
		else if (Array.isArray(p.results)) raw = p.results;
	}
	return raw.map(normalizeLegislativeUpdate).filter((i): i is LegislativeUpdate => i !== null);
}

function extractItem(payload: unknown): LegislativeUpdate | null {
	if (!payload || typeof payload !== 'object') return null;
	const p = payload as Record<string, unknown>;
	let raw: unknown = null;
	if (p.item && typeof p.item === 'object') raw = p.item;
	else if (p.data && typeof p.data === 'object' && !Array.isArray(p.data)) raw = p.data;
	else if (typeof p.id === 'string') raw = p;
	return raw ? normalizeLegislativeUpdate(raw) : null;
}

// ---------------------------------------------------------------------------
// Adapter: legacy `pipeline-run` shape -> curated LegislativeUpdate.
//
// While the GRC-admin team migrates /api/ai-tools/pipeline-runs to the new
// envelope with flat title/source/status/impact_level + nested pipeline.*,
// the live upstream still returns raw pipeline-execution records:
//   { id, org_context, regulation_snippet, regulation_text, policy_count,
//     stage_reached, result: { f1_relevance, f2_summary, f3_matches,
//     f4_impacts, policy_count_indexed }, created_at }
//
// We feature-detect: when an item already has title+status+impact_level
// it's the new shape and we pass it through untouched. Otherwise we synthesise
// the missing display fields from the pipeline result so the UI renders
// something meaningful instead of blank cards full of UUIDs.
// ---------------------------------------------------------------------------

type LegacyPipelineRun = {
	id: string;
	org_context?: string;
	regulation_snippet?: string;
	regulation_text?: string;
	policy_count?: number;
	stage_reached?: string;
	created_at?: string;
	updated_at?: string;
	result?: {
		stage_reached?: string;
		f1_relevance?: PipelineRelevance;
		f2_summary?: { policy_points?: PipelineKeyChange[] };
		f3_matches?: PipelineMatchesForPoint[];
		f4_impacts?: PipelineImpactForPoint[];
		policy_count_indexed?: number;
	};
};

function normalizeLegislativeUpdate(raw: unknown): LegislativeUpdate | null {
	if (!raw || typeof raw !== 'object') return null;
	const r = raw as Record<string, unknown>;
	if (typeof r.id !== 'string' || !r.id) return null;

	// New shape: title + status + impact_level are all curated. Trust it.
	if (
		typeof r.title === 'string' &&
		r.title &&
		typeof r.status === 'string' &&
		typeof r.impact_level === 'string'
	) {
		return raw as LegislativeUpdate;
	}

	// Otherwise synthesise from the legacy pipeline-run fields.
	return synthesizeFromLegacy(raw as LegacyPipelineRun);
}

function synthesizeFromLegacy(p: LegacyPipelineRun): LegislativeUpdate {
	const f1 = p.result?.f1_relevance;
	const snippet = (p.regulation_snippet ?? '').trim();
	const reasoning = f1?.reasoning ?? '';
	const stage = (p.stage_reached ?? p.result?.stage_reached ?? '').toLowerCase();
	const confidence = f1?.confidence;
	const impacts = p.result?.f4_impacts ?? [];
	const matches = p.result?.f3_matches ?? [];

	// Prefer the curated f1.document_* fields the AI extractor now emits.
	// Fall back to regex-from-snippet for legacy runs that pre-date that schema
	// so they still render something instead of a bare UUID.
	const f1Title = (f1?.document_title ?? '').trim();
	const f1Source = (f1?.document_source ?? '').trim();
	const f1Summary = (f1?.document_summary ?? '').trim();
	const f1PublishedAt = (f1?.document_published_at ?? '').trim();
	const f1Tags = f1?.document_tags?.filter((t) => typeof t === 'string' && t.trim().length > 0);

	const synthTitle = f1Title || synthTitleFromText(snippet) || `Pipeline run ${p.id.slice(0, 12)}…`;
	const synthDescription = (
		f1Summary || (reasoning && reasoning.length > 20 ? reasoning : snippet)
	).slice(0, 600);
	// We DO NOT fall back to org_context for source. That field is the reader
	// organisation, not a regulator/publisher; using it here would mis-label
	// every internal-policy run with the org's own name. Leave it null when F1
	// can't extract a real publisher so the UI just hides the badge.
	const synthSource = f1Source || null;
	const synthPublishedAt = f1PublishedAt || (p.created_at ? p.created_at.slice(0, 10) : null);
	const synthStatus = stageToStatus(stage);
	const synthImpactLevel = deriveImpact(confidence, impacts);
	const tags = (f1Tags && f1Tags.length > 0 ? f1Tags : (f1?.relevant_aspects ?? [])).slice(0, 8);
	const language = looksArabic(synthTitle || synthDescription || snippet || reasoning)
		? 'ar'
		: 'en';

	const requiredAmendmentPolicyIds = new Set<string>();
	for (const point of impacts) {
		for (const imp of point.impacts ?? []) {
			if (imp.requires_amendment && imp.policy_id) {
				requiredAmendmentPolicyIds.add(imp.policy_id);
			}
		}
	}
	const affectedIds = Array.from(requiredAmendmentPolicyIds);
	const affectedCount =
		affectedIds.length || p.result?.policy_count_indexed || p.policy_count || 0;

	const pipeline: PipelineBlock = {
		stage_reached: stage || undefined,
		f1_relevance: f1,
		key_changes: p.result?.f2_summary?.policy_points ?? [],
		f3_matches: matches,
		impact_analysis: impacts,
		policy_count_indexed: p.result?.policy_count_indexed
	};

	return {
		id: p.id,
		title: synthTitle,
		description: synthDescription,
		source: synthSource,
		source_id: null,
		internal_source_id: null,
		external_url: '',
		published_at: synthPublishedAt,
		status: synthStatus,
		status_label: '',
		impact_level: synthImpactLevel,
		impact_label: '',
		affected_policies_count: affectedCount,
		affected_policy_ids: affectedIds,
		tags,
		language,
		metadata: {
			synthesized: true,
			synthesized_from: f1Title || f1Summary ? 'f1_document_fields' : 'regulation_snippet',
			stage_reached: stage || undefined,
			policy_count_indexed: p.result?.policy_count_indexed,
			policy_count_input: p.policy_count,
			regulation_chars: p.regulation_text?.length
		} as LegislativeUpdate['metadata'],
		created_at: p.created_at ?? '',
		updated_at: p.updated_at ?? p.created_at ?? '',
		pipeline
	};
}

function synthTitleFromText(text: string): string {
	if (!text) return '';
	// Strip leading numbering ("1. ", "1) ", "•", "-")
	const stripped = text.replace(/^\s*(?:\d+[.)]\s+|[•\-]\s+)/, '').trim();
	// Cut at first real sentence break or newline. Don't split on em-dashes —
	// they're frequently used as title separators inside legislation headings
	// (e.g. "Purpose — Policy Purpose and Regulatory Mandate").
	const sentenceEnd = stripped.search(/[.!?؟।]\s|\n/);
	const cut = sentenceEnd > 0 && sentenceEnd <= 140 ? stripped.slice(0, sentenceEnd) : stripped;
	const trimmed = cut.length > 120 ? cut.slice(0, 117).trimEnd() + '…' : cut;
	return trimmed;
}

function stageToStatus(stage: string): string {
	switch (stage) {
		case 'f4':
			return 'completed';
		case 'f2':
		case 'f3':
			return 'under_analysis';
		case 'f1':
		case '':
			return 'new';
		default:
			return 'under_analysis';
	}
}

function deriveImpact(
	confidence: number | undefined,
	impacts: PipelineImpactForPoint[]
): string {
	// Prefer the highest amendment severity across impacts; fall back to
	// F1 relevance confidence when no impacts have been analysed yet.
	let best = 4;
	const rank: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3, none: 4 };
	for (const point of impacts) {
		for (const imp of point.impacts ?? []) {
			if (!imp.requires_amendment) continue;
			const r = rank[imp.severity ?? ''] ?? 4;
			if (r < best) best = r;
		}
	}
	if (best === 0 || best === 1) return 'high';
	if (best === 2) return 'medium';
	if (best === 3) return 'low';
	if (typeof confidence === 'number') {
		if (confidence >= 0.8) return 'high';
		if (confidence >= 0.5) return 'medium';
		return 'low';
	}
	return 'medium';
}

function looksArabic(text: string): boolean {
	if (!text) return false;
	// Hits any Arabic codepoint in the first ~200 chars.
	return /[\u0600-\u06FF]/.test(text.slice(0, 200));
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
