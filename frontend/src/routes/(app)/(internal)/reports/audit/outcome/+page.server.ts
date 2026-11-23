import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const params = new URLSearchParams();
	for (const key of ['assessment', 'sections']) {
		const value = url.searchParams.get(key);
		if (value) params.set(key, value);
	}
	const query = params.size ? `?${params.toString()}` : '';
	const res = await fetch(`${BASE_API_URL}/reports/audit/${query}`);
	if (!res.ok) {
		error(res.status, 'Could not load the audit report');
	}
	return { report: await res.json() };
};
