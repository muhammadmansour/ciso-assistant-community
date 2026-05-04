import type { RequestEvent } from '@sveltejs/kit';

/**
 * Recover uidb64/token for password-reset / first-connexion.
 * SvelteKit enhanced forms may POST without the query string; hidden fields can be empty after hydration.
 */
export function resolveResetUidAndToken(
	event: RequestEvent,
	fromForm: { uidb64?: string; token?: string }
): { uidb64: string; token: string } {
	let uidb64 = (fromForm.uidb64 ?? '').trim();
	let token = (fromForm.token ?? '').trim();

	if (!uidb64 || !token) {
		try {
			const u = new URL(event.request.url);
			uidb64 = uidb64 || (u.searchParams.get('uidb64') ?? '').trim();
			token = token || (u.searchParams.get('token') ?? '').trim();
		} catch {
			/* ignore */
		}
	}

	if (!uidb64 || !token) {
		const referer = event.request.headers.get('referer');
		if (referer) {
			try {
				const u = new URL(referer);
				uidb64 = uidb64 || (u.searchParams.get('uidb64') ?? '').trim();
				token = token || (u.searchParams.get('token') ?? '').trim();
			} catch {
				/* ignore */
			}
		}
	}

	return { uidb64, token };
}
