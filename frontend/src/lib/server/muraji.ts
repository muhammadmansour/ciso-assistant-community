/**
 * Muraji API endpoint URLs (server-only). Override per environment via env vars.
 *
 * Set `MURAJI_API_BASE_URL` to retarget every endpoint, or override individual
 * URLs (`MURAJI_ANALYSIS_API_URL`, etc.) when needed.
 */

const MURAJI_API_BASE_URL = (
	process.env.MURAJI_API_BASE_URL ?? 'https://muraji-api.wathbah.dev'
).replace(/\/$/, '');

function murajiEndpoint(envKey: string, path: string): string {
	return process.env[envKey] ?? `${MURAJI_API_BASE_URL}${path}`;
}

export const MURAJI_ANALYSIS_API_URL = murajiEndpoint(
	'MURAJI_ANALYSIS_API_URL',
	'/api/audit/analyze'
);
export const MURAJI_LIBRARIES_API_URL = murajiEndpoint(
	'MURAJI_LIBRARIES_API_URL',
	'/api/libraries'
);
export const MURAJI_ENTITY_EXTRACTION_API_URL = murajiEndpoint(
	'MURAJI_ENTITY_EXTRACTION_API_URL',
	'/api/entity-extraction/extract'
);
