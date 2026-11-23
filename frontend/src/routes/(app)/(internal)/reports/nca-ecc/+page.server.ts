import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(`${BASE_API_URL}/reports/nca-ecc-readiness/`);
	if (!res.ok) {
		error(res.status, 'Could not load the NCA ECC readiness report');
	}
	return { report: await res.json() };
};
