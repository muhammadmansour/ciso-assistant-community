import { defaultDeleteFormAction, defaultWriteFormAction } from '$lib/utils/actions';
import { BASE_API_URL } from '$lib/utils/constants';
import { MURAJI_LIBRARIES_API_URL } from '$lib/server/muraji';
import {
	getModelInfo,
	urlParamModelForeignKeyFields,
	urlParamModelSelectFields
} from '$lib/utils/crud';
import { modelSchema, WorkflowImportSchema } from '$lib/utils/schemas';
import type { ModelInfo } from '$lib/utils/types';
import { type Actions, redirect } from '@sveltejs/kit';
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

	let workflowTemplates: any[] = [];
	if (model.urlModel === 'workflows') {
		model['workflowImportForm'] = await superValidate(zod(WorkflowImportSchema), {
			errors: false
		});
		const templatesResponse = await fetch(`${BASE_API_URL}/workflows/workflows/templates/`);
		if (templatesResponse.ok) {
			const payload = await templatesResponse.json().catch(() => ({ results: [] }));
			workflowTemplates = payload.results ?? [];
		}
	}

	return { createForm, deleteForm, model, URLModel, workflowTemplates };
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
		const MURAJI_API_URL = MURAJI_LIBRARIES_API_URL;
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
	},
	importWorkflow: async (event) => {
		const formData = await event.request.formData();
		if (!formData) return fail(400, { error: 'No form data' });

		const form = await superValidate(formData, zod(WorkflowImportSchema));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const { file } = Object.fromEntries(formData) as { file: File };
		if (!(file instanceof File) || file.size <= 0) {
			setFlash({ type: 'error', message: m.workflowImportFailed() }, event);
			setError(form, 'file', m.workflowImportFailed());
			return fail(400, withFiles({ form }));
		}

		const body = new FormData();
		body.append('file', file, file.name);
		if (form.data.folder) body.append('folder', form.data.folder);
		if (form.data.secrets) body.append('secrets', form.data.secrets);

		const response = await event.fetch(`${BASE_API_URL}/workflows/workflows/import-yaml/`, {
			method: 'POST',
			// Marker so hooks.server does not rewrite this FormData request to
			// application/json (which would strip the uploaded file).
			headers: {
				'Content-Disposition': `attachment; filename="${encodeURIComponent(file.name)}"`
			},
			body
		});
		// A non-JSON error body (proxy HTML page) must not crash the action.
		const res = await response.json().catch(() => ({}));

		if (!response.ok) {
			const errorMessage = res.error || res.detail;
			setFlash(
				{
					type: 'error',
					message: errorMessage ? safeTranslate(errorMessage) : m.workflowImportFailed()
				},
				event
			);
			return fail(response.status, withFiles({ form }));
		}

		const warnings: string[] = res.warnings ?? [];
		setFlash(
			{
				type: warnings.length ? 'warning' : 'success',
				message: warnings.length
					? `${m.workflowImportedWithWarnings({ name: res.name })}\n${warnings.join('\n')}`
					: m.workflowImported({ name: res.name }),
				timeout: warnings.length ? 20000 : 5000
			},
			event
		);
		redirect(302, `/workflows/${res.id}`);
	},
	installTemplate: async (event) => {
		if (event.params.model !== 'workflows') {
			return fail(400, { error: 'invalidModel' });
		}
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
	promptTemplate: async (event) => {
		if (event.params.model !== 'workflows') {
			return fail(400, { error: 'invalidModel' });
		}
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
