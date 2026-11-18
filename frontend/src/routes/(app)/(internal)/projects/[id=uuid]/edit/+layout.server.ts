import { superValidate } from 'sveltekit-superforms';
import type { LayoutServerLoad } from './$types';
import { BASE_API_URL } from '$lib/utils/constants';
import { getModelInfo } from '$lib/utils/crud';
import { modelSchema } from '$lib/utils/schemas';
import { m } from '$paraglide/messages';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const URLModel = 'projects';
	const schema = modelSchema(URLModel);
	const model = getModelInfo(URLModel);
	const objectEndpoint = `${BASE_API_URL}/${model.endpointUrl}/${event.params.id}/object/`;
	const object = await event.fetch(objectEndpoint).then((res) => res.json());
	const form = await superValidate(object, zod(schema), { errors: false });

	const selectOptions: Record<string, { label: string; value: string | number }[]> = {};
	if (model.selectFields) {
		for (const selectField of model.selectFields) {
			const url = `${BASE_API_URL}/${selectField.endpointUrl ?? model.endpointUrl}/${
				selectField.detail ? event.params.id + '/' : ''
			}${selectField.field}/`;
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

	return { form, model, object, selectOptions, URLModel, title: m.edit() };
};
