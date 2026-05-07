import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

/** Proxy POST so Knox + CSRF are applied on the server fetch to Django. */
export const POST: RequestHandler = async ({ fetch, request }) => {
	const body = await request.text();
	const res = await fetch(`${BASE_API_URL}/policy-collections/chat/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body
	});
	return new Response(await res.arrayBuffer(), {
		status: res.status,
		headers: {
			'Content-Type': res.headers.get('Content-Type') || 'application/json'
		}
	});
};
