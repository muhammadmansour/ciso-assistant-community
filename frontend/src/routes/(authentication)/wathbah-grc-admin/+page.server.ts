import { getSecureRedirect } from '$lib/utils/helpers';

import { ALLAUTH_API_URL, BASE_API_URL } from '$lib/utils/constants';
import { loginSchema } from '$lib/utils/schemas';
import type { LoginRequestBody } from '$lib/utils/types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, request, locals }) => {
	// redirect user if already logged in
	if (locals.user) {
		redirect(302, '/admin');
	}

	const form = await superValidate(request, zod(loginSchema));

	return { form, title: 'Muhkam Admin' };
};

export const actions: Actions = {
	login: async ({ request, fetch, cookies, url }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const email = form.data.username;
		const password = form.data.password;

		const login: LoginRequestBody = {
			email,
			password
		};

		const endpoint = `${ALLAUTH_API_URL}/auth/login`;

		const requestInitOptions: RequestInit = {
			method: 'POST',
			body: JSON.stringify(login)
		};

		const res = await fetch(endpoint, requestInitOptions).then((res) => res.json());

		if (res.status !== 200) {
			console.error(res);
			if (res.errors) {
				res.errors.forEach((error: { param: string; code: string }) => {
					setError(form, error.param, error.code);
				});
				return fail(res.status, { form });
			}
			return fail(res.status || 400, { form });
		}

		cookies.set('token', res.meta.access_token, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			secure: true
		});

		cookies.set('allauth_session_token', res.meta.session_token, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			secure: true
		});

		// Redirect to admin dashboard after successful login
		redirect(302, '/admin');
	}
};
