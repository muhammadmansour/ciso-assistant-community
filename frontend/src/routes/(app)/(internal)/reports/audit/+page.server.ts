import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const assessment = url.searchParams.get('assessment');
	const query = assessment ? `?assessment=${encodeURIComponent(assessment)}` : '';
	const res = await fetch(`${BASE_API_URL}/reports/audit/${query}`);
	if (!res.ok) {
		error(res.status, 'Could not load the audit report');
	}
	return { report: await res.json() };
};
