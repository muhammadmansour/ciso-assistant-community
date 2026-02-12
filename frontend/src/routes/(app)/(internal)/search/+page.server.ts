import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const query = url.searchParams.get('q') || '';

	return {
		searchQuery: query,
		title: query ? `Search: ${query}` : 'Search'
	};
}) satisfies PageServerLoad;
