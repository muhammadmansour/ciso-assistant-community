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

	if (!query) {
		return {
			searchQuery: query,
			assessmentsTable: {
				head: buildHead('compliance-assessments'),
				body: [],
				meta: { count: 0, results: [] }
			},
			controlsTable: {
				head: buildHead('applied-controls'),
				body: [],
				meta: { count: 0, results: [] }
			},
			evidenceTable: {
				head: buildHead('evidences'),
				body: [],
				meta: { count: 0, results: [] }
			},
			title: 'Search'
		};
	}

	const searchParam = `search=${encodeURIComponent(query)}`;

	const [assessmentsRes, controlsRes, evidenceRes] = await Promise.all([
		fetch(`${BASE_API_URL}/compliance-assessments/?${searchParam}`),
		fetch(`${BASE_API_URL}/applied-controls/?${searchParam}`),
		fetch(`${BASE_API_URL}/evidences/?${searchParam}`)
	]);

	const assessmentsData = await assessmentsRes.json();
	const controlsData = await controlsRes.json();
	const evidenceData = await evidenceRes.json();

	// Build table sources the same way the regular pages do
	const assessmentsBody = tableSourceMapper(
		assessmentsData.results || [],
		listViewFields['compliance-assessments'].body
	);
	const controlsBody = tableSourceMapper(
		controlsData.results || [],
		listViewFields['applied-controls'].body
	);
	const evidenceBody = tableSourceMapper(
		evidenceData.results || [],
		listViewFields['evidences'].body
	);

	return {
		searchQuery: query,
		assessmentsTable: {
			head: buildHead('compliance-assessments'),
			body: assessmentsBody,
			meta: assessmentsData
		},
		controlsTable: {
			head: buildHead('applied-controls'),
			body: controlsBody,
			meta: controlsData
		},
		evidenceTable: {
			head: buildHead('evidences'),
			body: evidenceBody,
			meta: evidenceData
		},
		title: query ? `Search: ${query}` : 'Search'
	};
}) satisfies PageServerLoad;
