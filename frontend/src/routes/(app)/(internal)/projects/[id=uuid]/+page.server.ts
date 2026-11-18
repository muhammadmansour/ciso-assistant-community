import { getModelInfo } from '$lib/utils/crud';
import { loadDetail } from '$lib/utils/load';
import { defaultWriteFormAction } from '$lib/utils/actions';
import { BASE_API_URL } from '$lib/utils/constants';
import { modelSchema } from '$lib/utils/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const URLModel = 'projects';
	const model = getModelInfo(URLModel);
	const detail = await loadDetail({
		event,
		model,
		id: event.params.id
	});

	const objectEndpoint = `${BASE_API_URL}/${model.endpointUrl}/${event.params.id}/object/`;
	const object = await event.fetch(objectEndpoint).then((res) => res.json());
	const schema = modelSchema(URLModel);
	const updateForm = await superValidate(object, zod(schema), { errors: false });

	const selectOptions: Record<string, { label: string; value: string | number }[]> = {};
	if (model.selectFields) {
		for (const selectField of model.selectFields) {
			const url = `${BASE_API_URL}/${selectField.endpointUrl ?? model.endpointUrl}/${selectField.field}/`;
			const response = await event.fetch(url);
			if (response.ok) {
				selectOptions[selectField.field] = await response.json().then((data) =>
					Object.entries(data).map(([key, value]) => ({
						label: value as string,
						value: selectField.valueType === 'number' ? parseInt(key) : key
					}))
				);
			}
		}
	}
	model.selectOptions = selectOptions;

	return { ...detail, updateForm, model, object, selectOptions };
};

export const actions: Actions = {
	update: async (event) => {
		return defaultWriteFormAction({
			event,
			urlModel: 'projects',
			action: 'edit',
			doRedirect: false
		});
	}
};
