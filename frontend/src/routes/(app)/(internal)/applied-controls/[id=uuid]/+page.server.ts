import { BASE_API_URL } from '$lib/utils/constants';
import { getModelInfo } from '$lib/utils/crud';
import { loadDetail } from '$lib/utils/load';
import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { nestedDeleteFormAction, nestedWriteFormAction } from '$lib/utils/actions';
import { modelSchema } from '$lib/utils/schemas';
import { setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async (event) => {
	const modelInfo = getModelInfo('applied-controls');
	const data = await loadDetail({
		event,
		model: modelInfo,
		id: event.params.id
	});

	// Duplicate form for applied control
	const appliedControlSchema = modelSchema('applied-controls');
	const appliedControl = data.data;
	const initialDataDuplicate = {
		name: appliedControl.name,
		description: appliedControl.description
	};

	const appliedControlDuplicateForm = await superValidate(
		initialDataDuplicate,
		zod(appliedControlSchema),
		{
			errors: false
		}
	);

	return {
		...data,
		duplicateForm: appliedControlDuplicateForm
	};
};

export const actions: Actions = {
	create: async (event) => {
		return nestedWriteFormAction({ event, action: 'create', redirectToWrittenObject: false });
	},
	delete: async (event) => {
		return nestedDeleteFormAction({ event });
	},
	duplicate: async (event) => {
		const formData = await event.request.formData();
		const schema = modelSchema('applied-controls_duplicate');
		const form = await superValidate(formData, zod(schema));

		const endpoint = `${BASE_API_URL}/applied-controls/${event.params.id}/duplicate/`;

		if (!form.valid) {
			return fail(400, { form: form });
		}

		const response = await event.fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(form.data)
		});

		if (!response.ok) {
			return fail(400, { form });
		}

		setFlash({ type: 'success', message: 'Applied control duplicated successfully' }, event);
		return { form };
	}
};
