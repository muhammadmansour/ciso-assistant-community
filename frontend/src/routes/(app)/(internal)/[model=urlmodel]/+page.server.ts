import { defaultDeleteFormAction, defaultWriteFormAction } from '$lib/utils/actions';
import { BASE_API_URL } from '$lib/utils/constants';
import {
	getModelInfo,
	urlParamModelForeignKeyFields,
	urlParamModelSelectFields
} from '$lib/utils/crud';
import { modelSchema } from '$lib/utils/schemas';
import type { ModelInfo } from '$lib/utils/types';
import { type Actions } from '@sveltejs/kit';
import { fail, superValidate, withFiles, setError, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { m } from '$paraglide/messages';
import { safeTranslate } from '$lib/utils/i18n';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const schema = z.object({ id: z.string().uuid() });
	const deleteForm = await superValidate(zod(schema));
	const URLModel = params.model!;
	const createSchema = modelSchema(params.model!);
	const createForm = await superValidate(zod(createSchema));
	const model: ModelInfo = getModelInfo(params.model!);
	const selectFields = urlParamModelSelectFields(params.model);

	const selectOptions: Record<string, any> = {};

	for (const selectField of selectFields) {
		if (selectField.detail) continue;
		const url = model.endpointUrl
			? `${BASE_API_URL}/${model.endpointUrl}/${selectField.field}/`
			: `${BASE_API_URL}/${params.model}/${selectField.field}/`;
		const response = await fetch(url);
		if (response.ok) {
			selectOptions[selectField.field] = await response.json().then((data) =>
				Object.entries(data).map(([key, value]) => ({
					label: value,
					value: selectField.valueType === 'number' ? parseInt(key) : key
				}))
			);
		} else {
			console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
		}
	}

	model['selectOptions'] = selectOptions;

	if (model.urlModel === 'folders') {
		const folderImportForm = await superValidate(zod(modelSchema('folders-import')), {
			errors: false
		});
		model['folderImportForm'] = folderImportForm;
		model['folderImportModel'] = { urlModel: 'folders-import' };
	}

	return { createForm, deleteForm, model, URLModel };
};

export const actions: Actions = {
	create: async (event) => {
		const redirectToWrittenObject = Boolean(
			event.params.model === 'entity-assessments' ||
				event.params.model === 'quantitative-risk-hypotheses' ||
				event.params.model === 'quantitative-risk-studies' ||
				event.params.model === 'quantitative-risk-scenarios'
		);
		return defaultWriteFormAction({
			event,
			urlModel: event.params.model!,
			action: 'create',
			redirectToWrittenObject: redirectToWrittenObject
		});
	},
	delete: async (event) => {
		return defaultDeleteFormAction({ event, urlModel: event.params.model! });
	},
	deleteAll: async (event) => {
		const urlModel = event.params.model!;
		const endpoint = `${BASE_API_URL}/${urlModel}/delete-all/`;
		const response = await event.fetch(endpoint, { method: 'DELETE' });
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			setFlash({ type: 'error', message: errorData.message || `Failed to delete all ${urlModel}` }, event);
			return fail(response.status);
		}
		const result = await response.json().catch(() => ({}));
		setFlash({ type: 'success', message: result.message || `All ${urlModel} deleted successfully` }, event);
		return { status: 200 };
	},
	fetchMuraji: async (event) => {
		const MURAJI_API_URL = 'https://muraji-api.wathbahs.com/api/libraries';
		console.log(`[fetchMuraji] syncing libraries from ${MURAJI_API_URL}`);

		try {
			const murajiResponse = await fetch(MURAJI_API_URL);
			
			if (!murajiResponse.ok) {
				console.error('Failed to fetch from Muraji API:', murajiResponse.status);
				setFlash({ type: 'error', message: 'فشل في جلب المكتبات من مراجع' }, event);
				return fail(500);
			}
			
			const murajiData = await murajiResponse.json();
			
			if (!murajiData.success || !murajiData.data || murajiData.data.length === 0) {
				setFlash({ type: 'warning', message: 'لا توجد مكتبات متاحة في مراجع' }, event);
				return;
			}
			
			let successCount = 0;
			let updateCount = 0;
			let errorCount = 0;
			
			for (const library of murajiData.data) {
				try {
					const deleteEndpoint = `${BASE_API_URL}/stored-libraries/${encodeURIComponent(library.urn)}/`;
					const deleteResponse = await event.fetch(deleteEndpoint, { method: 'DELETE' });
					const wasExisting = deleteResponse.ok;
					
					const libraryData: Record<string, any> = {
						urn: library.urn,
						locale: library.locale || 'en',
						ref_id: library.ref_id,
						name: library.name,
						description: library.description || undefined,
						copyright: library.copyright || undefined,
						version: library.version,
						provider: library.provider || undefined,
						packager: library.packager || undefined,
						publication_date: library.publication_date ? library.publication_date.split('T')[0] : undefined,
						objects: library.content
					};

					Object.keys(libraryData).forEach(key => {
						if (libraryData[key] === undefined) delete libraryData[key];
					});

					const jsonString = JSON.stringify(libraryData, null, 2);
					const filename = `${library.ref_id || 'library'}.yaml`;
					const file = new Blob([jsonString], { type: 'application/x-yaml' });
					
					const uploadEndpoint = `${BASE_API_URL}/stored-libraries/upload/`;
					
					const uploadResponse = await event.fetch(uploadEndpoint, {
						method: 'POST',
						headers: {
							'Content-Disposition': `attachment; filename=${filename}`
						},
						body: file
					});
					
					if (uploadResponse.ok) {
						if (wasExisting) {
							updateCount++;
						} else {
							successCount++;
						}
					} else {
						const errorData = await uploadResponse.json().catch(() => ({}));
						console.error(`Failed to upload library ${library.name}:`, errorData);
						errorCount++;
					}
				} catch (libError) {
					console.error(`Error processing library ${library.name}:`, libError);
					errorCount++;
				}
			}
			
			const totalProcessed = successCount + updateCount;
			if (totalProcessed > 0) {
				let message = `تم مزامنة ${totalProcessed} مكتبة من مراجع`;
				if (updateCount > 0 && successCount > 0) {
					message = `تم مزامنة ${totalProcessed} مكتبة (${successCount} جديدة، ${updateCount} محدثة)`;
				} else if (updateCount > 0) {
					message = `تم تحديث ${updateCount} مكتبة من مراجع`;
				} else {
					message = `تم إضافة ${successCount} مكتبة جديدة من مراجع`;
				}
				setFlash({ type: 'success', message }, event);
			} else if (errorCount > 0) {
				setFlash({ type: 'error', message: `فشل في المزامنة. الأخطاء: ${errorCount}` }, event);
			} else {
				setFlash({ type: 'info', message: 'لا توجد مكتبات للمزامنة' }, event);
			}
		} catch (error) {
			console.error('Error fetching from Muraji:', error);
			setFlash({ type: 'error', message: 'خطأ في الاتصال بمراجع API' }, event);
			return fail(500);
		}
	},
	importFolder: async (event) => {
		const formData = await event.request.formData();
		if (!formData) return fail(400, { error: 'No form data' });

		const form = await superValidate(formData, zod(modelSchema('folders-import')));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const { file } = Object.fromEntries(formData) as { file: File };

		const endpoint = `${BASE_API_URL}/folders/import/${form.data.load_missing_libraries ? '?load_missing_libraries=true' : ''}`;

		const response = await event.fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Disposition': `attachment; filename="${file.name}"`,
				'Content-Type': file.type,
				'X-CISOAssistantDomainName': form.data.name
			},
			body: file
		});
		const res = await response.json();

		if (!response.ok && res.missing_libraries) {
			setError(form, 'file', m.missingLibrariesInImport());
			for (let i = 0; i < res.missing_libraries.length; i += 2) {
				const urn = res.missing_libraries[i];
				const version = res.missing_libraries[i + 1];
				setError(form, 'non_field_errors', `${urn} v${version}`);
			}
			return message(form, { status: response.status });
		}

		if (!response.ok) {
			if (res.error) {
				setFlash({ type: 'error', message: safeTranslate(res.error) }, event);
				return withFiles({ form });
			}
			Object.entries(res).forEach(([key, value]) => {
				setError(form, key, safeTranslate(value));
			});
			return fail(400, withFiles({ form }));
		}

		setFlash(
			{
				type: 'success',
				message: m.successfullyImportedFolder()
			},
			event
		);

		return withFiles({ form });
	}
};
