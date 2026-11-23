import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const assessment = url.searchParams.get('assessment');
	const query = assessment ? `?assessment=${encodeURIComponent(assessment)}` : '';
	const endpoint = `${BASE_API_URL}/reports/evidence-coverage/xlsx/${query}`;

	const res = await fetch(endpoint);
	if (!res.ok) {
		error(res.status, 'Could not generate the evidence coverage workbook');
	}

	return new Response(await res.blob(), {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename="evidence-coverage.xlsx"'
		}
	});
};
