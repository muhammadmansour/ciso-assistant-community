import { BASE_API_URL } from '$lib/utils/constants';
import type { PageServerLoad } from './$types';
import { m } from '$paraglide/messages';

export const load = (async ({ parent, fetch }) => {
	const { user } = await parent();

	const complianceAnalytics = await fetch(`${BASE_API_URL}/compliance-assessments/analytics/`)
		.then((res) => res.json())
		.catch((error) => {
			console.error('Failed to fetch compliance analytics:', error);
			return {};
		});

	return { user, complianceAnalytics, title: m.home() };
}) satisfies PageServerLoad;
