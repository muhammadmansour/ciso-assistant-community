import { defaultWriteFormAction } from '$lib/utils/actions';
import { BASE_API_URL } from '$lib/utils/constants';
import { quickStartSchema } from '$lib/utils/schemas';
import { type Actions } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		if (!formData) {
			return fail(400, { form: null });
		}

		const form = await superValidate(formData, zod(quickStartSchema));

		const requestInitOptions: RequestInit = {
			method: 'POST',
			body: JSON.stringify(form.data)
		};

		const endpoint = `${BASE_API_URL}/quick-start/`;
		const res = await event.fetch(endpoint, requestInitOptions);
		const response = await res.json();

		if (!res.ok) {
			console.error(response);
			if (response.errors) {
				response.errors.forEach((error: { param: string; code: string }) => {
					setError(form, error.param, error.code);
				});
			}
			// Handle field-level validation errors (e.g., {name: "error msg", version: "error msg"})
			for (const [field, errorMsg] of Object.entries(response)) {
				if (field !== 'errors' && typeof errorMsg === 'string') {
					setError(form, field as keyof typeof form.data, errorMsg);
				}
			}
			return fail(res.status, { form });
		}

		return message(form, {
			redirect: `/compliance-assessments/${response.complianceassessment.id}`
		});
	}
};
