/**
 * Server-only helpers for the legislative-updates upstream feed.
 *
 * Endpoint is hit server-side so failures stay out of the browser console
 * and the host can be overridden per environment via the
 * `LEGISLATIVE_UPDATES_API_URL` env var.
 *
 * The upstream is currently public (no token). If we ever switch to the
 * gated `/api/ai-tools/pipeline-runs` endpoint, this is the only place that
 * needs auth wiring.
 */

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

type ExtractedResponse = {
	success: boolean;
	total: number;
	limit: number;
	offset: number;
	count: number;
	items: LegislativeUpdate[];
};

export const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	'https://grc-admin.wathbah.dev/api/legislative-updates/extracted';

export async function fetchLegislativeUpdates(
	fetchFn: typeof fetch
): Promise<{ items: LegislativeUpdate[]; upstreamError: boolean }> {
	try {
		const res = await fetchFn(LEGISLATIVE_UPDATES_API_URL);
		if (!res.ok) {
			console.error(
				`[legislative-updates] upstream returned ${res.status} ${res.statusText}`
			);
			return { items: [], upstreamError: true };
		}
		const payload = (await res.json()) as ExtractedResponse;
		const items = Array.isArray(payload?.items) ? payload.items : [];
		return { items, upstreamError: false };
	} catch (err) {
		console.error('[legislative-updates] upstream fetch failed', err);
		return { items: [], upstreamError: true };
	}
}

export async function fetchLegislativeUpdateById(
	fetchFn: typeof fetch,
	id: string
): Promise<{ item: LegislativeUpdate | null; upstreamError: boolean }> {
	const { items, upstreamError } = await fetchLegislativeUpdates(fetchFn);
	if (upstreamError) return { item: null, upstreamError: true };
	const item = items.find((i) => i.id === id) ?? null;
	return { item, upstreamError: false };
}
