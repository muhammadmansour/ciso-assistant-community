/**
 * GRC Admin URLs (server-only). Override per environment via env vars.
 *
 * Browser-visible links should use `wathbahAdminConsoleUrl` from `(app)/+layout.server.ts`.
 */

const DEFAULT_GRC_ADMIN_BASE = 'https://grc-admin.wathbah.dev';

export function getGrcAdminBaseUrl(): string {
	const fromEnv =
		process.env.WATHBAH_ADMIN_CONSOLE_URL ??
		process.env.PUBLIC_WATHBAH_ADMIN_CONSOLE_URL;
	const raw =
		typeof fromEnv === 'string' && fromEnv.trim().length > 0
			? fromEnv.trim()
			: DEFAULT_GRC_ADMIN_BASE;
	return raw.replace(/\/$/, '');
}

export function getWathbahAdminConsoleUrl(): string {
	return `${getGrcAdminBaseUrl()}/`;
}

/** @deprecated Prefer `getGrcAdminBaseUrl()` — evaluated once at module load. */
export const GRC_ADMIN_BASE_URL = getGrcAdminBaseUrl();

export const LEGISLATIVE_UPDATES_API_URL =
	process.env.LEGISLATIVE_UPDATES_API_URL ??
	`${getGrcAdminBaseUrl()}/api/ai-tools/pipeline-legislative-updates`;

export const LEGISLATIVE_UPDATE_DETAIL_API_URL =
	process.env.LEGISLATIVE_UPDATE_DETAIL_API_URL ?? LEGISLATIVE_UPDATES_API_URL;
