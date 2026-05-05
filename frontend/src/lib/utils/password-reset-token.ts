import type { RequestEvent } from '@sveltejs/kit';

/** Short-lived backup when POST loses query string (seen with some Firefox / form-enhance setups). */
export const PASSWORD_RESET_LINK_COOKIE = 'pwd_reset_ctx';

export function persistPasswordResetLinkCookie(
	event: RequestEvent,
	uidb64: string,
	token: string
): void {
	const u = uidb64.trim();
	const t = token.trim();
	if (!u || !t) return;
	event.cookies.set(PASSWORD_RESET_LINK_COOKIE, JSON.stringify({ uidb64: u, token: t }), {
		path: '/',
		maxAge: 60 * 60,
		httpOnly: true,
		secure: event.url.protocol === 'https:',
		sameSite: 'lax'
	});
}

export function clearPasswordResetLinkCookie(event: RequestEvent): void {
	event.cookies.delete(PASSWORD_RESET_LINK_COOKIE, { path: '/' });
}

function readPasswordResetLinkCookie(event: RequestEvent): { uidb64: string; token: string } | null {
	const raw = event.cookies.get(PASSWORD_RESET_LINK_COOKIE);
	if (!raw) return null;
	try {
		const o = JSON.parse(raw) as { uidb64?: unknown; token?: unknown };
		const uidb64 = String(o.uidb64 ?? '').trim();
		const token = String(o.token ?? '').trim();
		if (uidb64 && token) return { uidb64, token };
	} catch {
		/* ignore */
	}
	return null;
}

/**
 * Recover uidb64/token for password-reset / first-connexion.
 * - Prefer a complete pair from the POST URL (matches the link the user opened).
 * - Then form body, URL fragments, Referer.
 * - Finally an httpOnly cookie set on GET so submit still works if the POST URL drops ?uidb64=&token= (Firefox / strict Referrer-Policy edge cases).
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

	if (!uidb64 || !token) {
		const fromCookie = readPasswordResetLinkCookie(event);
		if (fromCookie) {
			if (!uidb64) uidb64 = fromCookie.uidb64;
			if (!token) token = fromCookie.token;
		}
	}

	return { uidb64, token };
}
