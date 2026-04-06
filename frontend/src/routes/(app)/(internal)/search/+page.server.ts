import { BASE_API_URL } from '$lib/utils/constants';
import { tableSourceMapper, listViewFields } from '$lib/utils/table';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const query = url.searchParams.get('q') || '';

	// Build head data for each model
	const buildHead = (model: keyof typeof listViewFields) => {
		const fields = listViewFields[model];
		return fields.body.reduce(
			(obj: Record<string, string>, key: string, index: number) => {
				obj[key] = fields.head[index];
				return obj;
			},
			{}
		);
	};

	const emptyTable = (model: keyof typeof listViewFields) => ({
		head: buildHead(model),
		body: [],
		meta: { count: 0, results: [] }
	});

	if (!query) {
		return {
			searchQuery: query,
			searchError: null,
			assessmentsTable: emptyTable('compliance-assessments'),
			controlsTable: emptyTable('applied-controls'),
			evidenceTable: emptyTable('evidences'),
			title: 'Search'
		};
	}

	const searchParam = `search=${encodeURIComponent(query)}`;

	// Helper to safely fetch and parse a search endpoint
	const safeFetch = async (endpoint: string, label: string) => {
		try {
			const res = await fetch(endpoint);
			if (!res.ok) {
				console.error(`[Search] ${label} API returned ${res.status}: ${res.statusText}`);
				return { ok: false, error: `${label}: server returned ${res.status}`, data: null };
			}
			const data = await res.json();
			return { ok: true, error: null, data };
		} catch (err) {
			console.error(`[Search] ${label} fetch failed:`, err);
			return {
				ok: false,
				error: `${label}: ${err instanceof Error ? err.message : 'request failed'}`,
				data: null
			};
		}
	};

	const [assessmentsResult, controlsResult, evidenceResult] = await Promise.all([
		safeFetch(`${BASE_API_URL}/compliance-assessments/?${searchParam}`, 'Assessments'),
		safeFetch(`${BASE_API_URL}/applied-controls/?${searchParam}`, 'Controls'),
		safeFetch(`${BASE_API_URL}/evidences/?${searchParam}`, 'Evidence')
	]);

	// Collect any errors to surface to the user
	const errors = [assessmentsResult, controlsResult, evidenceResult]
		.filter((r) => !r.ok)
		.map((r) => r.error);
	const searchError = errors.length > 0 ? errors.join('; ') : null;

	// Build table sources — use empty data if the fetch failed
	const assessmentsData = assessmentsResult.data;
	const controlsData = controlsResult.data;
	const evidenceData = evidenceResult.data;

	const assessmentsBody = assessmentsData
		? tableSourceMapper(assessmentsData.results || [], listViewFields['compliance-assessments'].body)
		: [];
	const controlsBody = controlsData
		? tableSourceMapper(controlsData.results || [], listViewFields['applied-controls'].body)
		: [];
	const evidenceBody = evidenceData
		? tableSourceMapper(evidenceData.results || [], listViewFields['evidences'].body)
		: [];

	return {
		searchQuery: query,
		searchError,
		assessmentsTable: {
			head: buildHead('compliance-assessments'),
			body: assessmentsBody,
			meta: assessmentsData ?? { count: 0, results: [] }
		},
		controlsTable: {
			head: buildHead('applied-controls'),
			body: controlsBody,
			meta: controlsData ?? { count: 0, results: [] }
		},
		evidenceTable: {
			head: buildHead('evidences'),
			body: evidenceBody,
			meta: evidenceData ?? { count: 0, results: [] }
		},
		title: query ? `Search: ${query}` : 'Search'
	};
}) satisfies PageServerLoad;
