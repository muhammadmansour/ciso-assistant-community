import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const FORMATS = {
	pdf: { type: 'application/pdf', filename: 'audit-report.pdf' },
	xlsx: {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		filename: 'audit-report.xlsx'
	}
} as const;

export const GET: RequestHandler = async ({ fetch, url }) => {
	const format = url.searchParams.get('format') === 'xlsx' ? 'xlsx' : 'pdf';
	const assessment = url.searchParams.get('assessment');
	const query = assessment ? `?assessment=${encodeURIComponent(assessment)}` : '';

	const res = await fetch(`${BASE_API_URL}/reports/audit/${format}/${query}`);
	if (!res.ok) {
		error(res.status, `Could not generate the audit report (${format.toUpperCase()})`);
	}

	return new Response(await res.blob(), {
		headers: {
			'Content-Type': FORMATS[format].type,
			'Content-Disposition': `attachment; filename="${FORMATS[format].filename}"`
		}
	});
};
