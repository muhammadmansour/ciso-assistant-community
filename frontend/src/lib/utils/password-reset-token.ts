import type { RequestEvent } from '@sveltejs/kit';

/**
 * Recover uidb64/token for password-reset / first-connexion.
 * - SvelteKit `use:enhance` POSTs to `form.action`; on first-connexion that is usually the full URL
 *   including `?uidb64=…&token=…`, which is the authoritative source.
 * - Hidden fields can be empty after hydration, or in rare cases corrupted; if we only read the URL
 *   when both hidden fields are missing, a bad non-empty body token would incorrectly win.
 */
export function resolveResetUidAndToken(
	event: RequestEvent,
	fromForm: { uidb64?: string; token?: string }
): { uidb64: string; token: string } {
	let urlParams: URLSearchParams | null = null;
	try {
		urlParams = new URL(event.request.url).searchParams;
	} catch {
		urlParams = null;
	}

	const urlUid = (urlParams?.get('uidb64') ?? '').trim();
	const urlTok = (urlParams?.get('token') ?? '').trim();

	// Prefer a complete pair from the request URL (matches the link the user opened).
	if (urlUid && urlTok) {
		return { uidb64: urlUid, token: urlTok };
	}

	let uidb64 = (fromForm.uidb64 ?? '').trim();
	let token = (fromForm.token ?? '').trim();

	uidb64 = uidb64 || urlUid;
	token = token || urlTok;

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
