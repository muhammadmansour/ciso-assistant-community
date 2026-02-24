import { BASE_API_URL } from '$lib/utils/constants';
import { getModelInfo } from '$lib/utils/crud';
import { modelSchema } from '$lib/utils/schemas';
import type { ModelInfo } from '$lib/utils/types';
import { type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { defaultDeleteFormAction, defaultWriteFormAction } from '$lib/utils/actions';
import { listViewFields } from '$lib/utils/table';
import type { TableSource } from '$lib/components/ModelTable/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const URLModel = 'compliance-assessments';

	const schema = z.object({ id: z.string().uuid() });
	const deleteForm = await superValidate(zod(schema));
	const createSchema = modelSchema(URLModel);
	const createForm = await superValidate(zod(createSchema));
	const model: ModelInfo = getModelInfo(URLModel);

	const selectOptions: Record<string, any> = {};

	if (model.selectFields) {
		for (const selectField of model.selectFields) {
			if (selectField.detail) continue;
			const url = `${BASE_API_URL}/${URLModel}/${selectField.field}/`;
			const response = await fetch(url);
			if (response.ok) {
				selectOptions[selectField.field] = await response.json().then((data: Record<string, any>) =>
					Object.entries(data).map(([key, value]) => ({
						label: value,
						value: selectField.valueType === 'number' ? parseInt(key) : key
					}))
				);
			} else {
				console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
			}
		}
	}

	model['selectOptions'] = selectOptions;

	// Build table source with desired columns
	const headData: Record<string, string> = listViewFields[URLModel].body.reduce(
		(obj: Record<string, string>, key: string, index: number) => {
			obj[key] = listViewFields[URLModel].head[index];
			return obj;
		},
		{} as Record<string, string>
	);

	const table: TableSource = {
		head: headData,
		body: [],
		meta: []
	};

	return { createForm, deleteForm, model, URLModel, table };
};

export const actions: Actions = {
	create: async (event) => {
		return defaultWriteFormAction({
			event,
			urlModel: 'compliance-assessments',
			action: 'create',
			redirectToWrittenObject: true
		});
	},
	delete: async (event) => {
		return defaultDeleteFormAction({ event, urlModel: 'compliance-assessments' });
	}
};
