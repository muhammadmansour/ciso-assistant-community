import type { PageServerLoad } from './$types';

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
	metadata: Record<string, unknown>;
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

// Public upstream — runs server-side so a failure stays out of the browser
// console and we can keep the host configurable per-environment.
const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	'https://grc-admin.wathbah.dev/api/legislative-updates/extracted';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch(LEGISLATIVE_UPDATES_API_URL);
		if (!res.ok) {
			console.error(
				`[legislative-updates] upstream returned ${res.status} ${res.statusText}`
			);
			return {
				title: 'legislativeUpdates',
				items: [] as LegislativeUpdate[],
				upstreamError: true,
				upstreamUrl: LEGISLATIVE_UPDATES_API_URL
			};
		}
		const payload = (await res.json()) as ExtractedResponse;
		const items = Array.isArray(payload?.items) ? payload.items : [];
		return {
			title: 'legislativeUpdates',
			items,
			upstreamError: false,
			upstreamUrl: LEGISLATIVE_UPDATES_API_URL
		};
	} catch (err) {
		console.error('[legislative-updates] upstream fetch failed', err);
		return {
			title: 'legislativeUpdates',
			items: [] as LegislativeUpdate[],
			upstreamError: true,
			upstreamUrl: LEGISLATIVE_UPDATES_API_URL
		};
	}
};
