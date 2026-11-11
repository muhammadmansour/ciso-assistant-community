import { error } from '@sveltejs/kit';

/**
 * error() for a backend error body, keeping its fields (detail, error, ...) for the client.
 */
export function errorFromBody(status: number, body: unknown): never {
	if (body == null || typeof body !== 'object') {
		error(status, typeof body === 'string' ? body : `Error: ${status}`);
	}
	const { message, ...properties } = body as Record<string, unknown>;
	error(status, {
		...properties,
		message: typeof message === 'string' ? message : `Error: ${status}`
	} as App.Error);
}
