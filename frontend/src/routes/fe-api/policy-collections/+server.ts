import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

/** Proxy to Django so Knox `Authorization: Token` is injected via handleFetch (cookie is httpOnly). */
export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch(`${BASE_API_URL}/policy-collections/`);
	return new Response(await res.arrayBuffer(), {
		status: res.status,
		headers: {
			'Content-Type': res.headers.get('Content-Type') || 'application/json'
		}
	});
};
