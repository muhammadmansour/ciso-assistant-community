import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

// The domain picker fetches this same-origin path. The Knox token is httpOnly,
// so the browser cannot call Django directly; handleFetch adds it here.
export const GET: RequestHandler = async ({ fetch, url }) => {
	const res = await fetch(`${BASE_API_URL}/folders/org_tree/${url.search}`);
	return new Response(res.body, {
		status: res.status,
		headers: {
			'Content-Type': res.headers.get('Content-Type') ?? 'application/json'
		}
	});
};
