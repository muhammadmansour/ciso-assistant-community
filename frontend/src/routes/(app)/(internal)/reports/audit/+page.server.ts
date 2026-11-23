import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { m } from '$paraglide/messages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(`${BASE_API_URL}/reports/audit/?choices=1`);
	if (!res.ok) {
		error(res.status, 'Could not load audit assessments');
	}
	const body = await res.json();
	return { assessments: body.assessments ?? [], title: m.rptAuditReport() };
};
