import { BASE_API_URL } from '$lib/utils/constants';

import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ fetch, params }) => {
	const URLModel = 'compliance-assessments';
	const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/assessment_pdf/`;

	const res = await fetch(endpoint);
	if (!res.ok) {
		let detail = 'Error fetching the PDF file';
		try {
			const body = await res.text();
			if (body) {
				try {
					const parsed = JSON.parse(body);
					detail = parsed.error || parsed.detail || body;
				} catch {
					detail = body.slice(0, 500);
				}
			}
		} catch {
			/* keep default */
		}
		error(res.status, detail);
	}

	const fileName = `assessment-${params.id}.pdf`;

	return new Response(res.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${fileName}"`
		}
	});
};
