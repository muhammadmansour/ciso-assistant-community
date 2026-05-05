import { BASE_API_URL } from '$lib/utils/constants';
import { safeTranslate } from '$lib/utils/i18n';
import { ResetPasswordSchema } from '$lib/utils/schemas';
import {
	clearPasswordResetLinkCookie,
	persistPasswordResetLinkCookie,
	resolveResetUidAndToken
} from '$lib/utils/password-reset-token';
import { m } from '$paraglide/messages';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Clear any existing session to prevent logged-in user from interfering with password reset
	event.cookies.delete('token', { path: '/' });
	event.cookies.delete('allauth_session_token', { path: '/' });

	const qpUid = event.url.searchParams.get('uidb64') ?? '';
	const qpTok = event.url.searchParams.get('token') ?? '';
	if (qpUid && qpTok) {
		persistPasswordResetLinkCookie(event, qpUid, qpTok);
	}

	const form = await superValidate(
		{
			uidb64: qpUid,
			token: qpTok,
			new_password: '',
			confirm_new_password: ''
		},
		zod(ResetPasswordSchema),
		{ errors: false }
	);

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(ResetPasswordSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { uidb64, token } = resolveResetUidAndToken(event, form.data);
		if (!uidb64 || !token) {
			setFlash(
				{
					type: 'error',
					message:
						'This page must be opened using the full link from your email (including the text after ?).'
				},
				event
			);
			return fail(400, { form });
		}

		const endpoint = `${BASE_API_URL}/iam/password-reset/confirm/`;
		const requestInitOptions: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				...form.data,
				uidb64,
				token
			})
		};

		const res = await event.fetch(endpoint, requestInitOptions);

		if (!res.ok) {
			const response = await res.json();
			console.error('server response:', response);
			if (response.new_password) {
				setError(form, 'new_password', response.new_password);
			}
			if (response.confirm_new_password) {
				setError(form, 'confirm_new_password', response.confirm_new_password);
			}
			if (response.error) {
				setFlash({ type: 'error', message: safeTranslate(response.error) }, event);
				redirect(302, '/login');
			}
			return fail(400, { form });
		}

		clearPasswordResetLinkCookie(event);

		setFlash({ type: 'success', message: m.passwordSuccessfullyReset() }, event);
		redirect(302, '/login');
	}
};
