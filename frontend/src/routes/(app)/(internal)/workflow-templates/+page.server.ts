import { BASE_API_URL } from '$lib/utils/constants';
import { m } from '$paraglide/messages';
import { safeTranslate } from '$lib/utils/i18n';
import { fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${BASE_API_URL}/workflows/workflows/templates/`);
	const payload = response.ok ? await response.json().catch(() => ({ results: [] })) : { results: [] };
	return {
		templates: payload.results ?? []
	};
};

export const actions: Actions = {
	install: async (event) => {
		const formData = await event.request.formData();
		const templateId = String(formData.get('template_id') || '');
		if (!templateId) {
			return fail(400, { error: 'missingTemplate' });
		}
		const response = await event.fetch(
			`${BASE_API_URL}/workflows/workflows/templates/${encodeURIComponent(templateId)}/install/`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({})
			}
		);
		const res = await response.json().catch(() => ({}));
		if (!response.ok) {
			setFlash(
				{
					type: 'error',
					message: res.error ? safeTranslate(res.error) : m.workflowImportFailed()
				},
				event
			);
			return fail(response.status, { error: res.error });
		}
		setFlash(
			{
				type: 'success',
				message: m.workflowImported({ name: res.name || templateId })
			},
			event
		);
		redirect(302, `/workflows/${res.id}`);
	},
	prompt: async (event) => {
		const formData = await event.request.formData();
		const prompt = String(formData.get('prompt') || '').trim();
		const install = formData.get('install') === '1';
		if (!prompt) {
			return fail(400, { promptError: 'promptRequired', prompt });
		}
		const response = await event.fetch(`${BASE_API_URL}/workflows/workflows/prompt-to-template/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt, install })
		});
		const res = await response.json().catch(() => ({}));
		if (!response.ok) {
			setFlash(
				{
					type: 'error',
					message: res.error ? safeTranslate(res.error) : m.workflowImportFailed()
				},
				event
			);
			return fail(response.status, { promptError: res.error, prompt });
		}
		if (install && res.id) {
			setFlash(
				{
					type: 'success',
					message: m.workflowImported({ name: res.name || prompt })
				},
				event
			);
			redirect(302, `/workflows/${res.id}`);
		}
		return { promptResult: res, prompt };
	}
};
