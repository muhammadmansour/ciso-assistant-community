import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const folder = url.searchParams.get('folder');
	const query = folder ? `?folder=${encodeURIComponent(folder)}` : '';
	const endpoint = `${BASE_API_URL}/reports/nca-ecc-readiness/xlsx/${query}`;

	const res = await fetch(endpoint);
	if (!res.ok) {
		error(res.status, 'Could not generate the NCA ECC workbook');
	}

	return new Response(await res.blob(), {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename="nca-ecc-readiness.xlsx"'
		}
	});
};
