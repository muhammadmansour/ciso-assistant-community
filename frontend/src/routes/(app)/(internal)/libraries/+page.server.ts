import { BASE_API_URL } from '$lib/utils/constants';

import { defaultDeleteFormAction } from '$lib/utils/actions';
import { safeTranslate } from '$lib/utils/i18n';
import { LibraryUploadSchema } from '$lib/utils/schemas';
import { listViewFields } from '$lib/utils/table';
import { m } from '$paraglide/messages';
import { fail, type Actions } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	// Sort by created_at descending so newest libraries appear first
	const storedLibrariesEndpoint = `${BASE_API_URL}/stored-libraries/?ordering=-created_at`;
	const storedLibrariesResponse = await fetch(storedLibrariesEndpoint);
	const storedLibraries = await storedLibrariesResponse.json();

	const prepareRow = (row: Record<string, any>) => {
		row.overview = [
			`Packager: ${row.packager}`,
			`Version: ${row.version}`,
			...Object.entries(row.objects_meta).map(([key, value]) => `${key}: ${value}`)
		];
		row.allowDeleteLibrary = row.allowDeleteLibrary =
			row.reference_count && row.reference_count > 0 ? false : true;
	};

	storedLibraries.results.forEach(prepareRow);

	const makeHeadData = (URLModel) => {
		return listViewFields[URLModel].body.reduce((obj, key, index) => {
			obj[key] = listViewFields[URLModel].head[index];
			return obj;
		}, {});
	};

	const storedLibrariesTable = {
		head: makeHeadData('stored-libraries'),
		meta: { urlmodel: 'stored-libraries', ...storedLibraries },
		body: []
	};

	const schema = z.object({ id: z.string() });
	const deleteForm = await superValidate(zod(schema));
	const uploadForm = await superValidate({}, zod(LibraryUploadSchema), { errors: false });

	return {
		storedLibrariesTable,
		deleteForm,
		uploadForm,
		title: m.libraries()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	upload: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(LibraryUploadSchema));

		if (formData.has('file')) {
			const { file } = Object.fromEntries(formData) as { file: File };
			// Should i check if attachment.size > 0 ?
			const endpoint = `${BASE_API_URL}/stored-libraries/upload/`;
			const req = await event.fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Disposition': `attachment; filename=${file.name}`
				},
				body: file
			});
			if (!req.ok) {
				const response = await req.json();
				console.error(response);

				const translate_error = safeTranslate(response.error);
				const toast_error_message =
					translate_error ?? m.libraryLoadingError() + '(' + response.error + ')';

				setFlash({ type: 'error', message: toast_error_message }, event);
				delete form.data['file']; // This removes a warning: Cannot stringify arbitrary non-POJOs (data..form.data.file)
				return fail(400, { form });
			}
			setFlash({ type: 'success', message: m.librarySuccessfullyLoaded() }, event);
		} else {
			setFlash({ type: 'error', message: m.noLibraryDetected() }, event);
			return fail(400, { form });
		}
	},
	delete: async (event) => {
		return defaultDeleteFormAction({ event, urlModel: 'stored-libraries' });
	},
	fetchMuraji: async (event) => {
		const MURAJI_API_URL = 'https://muraji-api.wathbahs.com/api/libraries';
		
		try {
			// Fetch libraries from Muraji API
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
			
			// Process each library from Muraji
			for (const library of murajiData.data) {
				try {
					// First, try to delete existing library with same URN (to allow update)
					const deleteEndpoint = `${BASE_API_URL}/stored-libraries/${encodeURIComponent(library.urn)}/`;
					const deleteResponse = await event.fetch(deleteEndpoint, { method: 'DELETE' });
					const wasExisting = deleteResponse.ok;
					
					// Convert Muraji format to CISO Assistant YAML format
					const yamlContent = {
						urn: library.urn,
						locale: library.locale || 'en',
						ref_id: library.ref_id,
						name: library.name,
						description: library.description,
						copyright: library.copyright,
						version: library.version,
						provider: library.provider,
						packager: library.packager,
						publication_date: library.publication_date ? library.publication_date.split('T')[0] : null,
						objects: library.content
					};
					
					// Convert to YAML string format
					const yamlLines: string[] = [];
					yamlLines.push(`urn: ${yamlContent.urn}`);
					yamlLines.push(`locale: ${yamlContent.locale}`);
					yamlLines.push(`ref_id: ${yamlContent.ref_id}`);
					yamlLines.push(`name: ${yamlContent.name}`);
					if (yamlContent.description) {
						yamlLines.push(`description: "${yamlContent.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
					}
					if (yamlContent.copyright) {
						yamlLines.push(`copyright: "${yamlContent.copyright}"`);
					}
					yamlLines.push(`version: ${yamlContent.version}`);
					if (yamlContent.publication_date) {
						yamlLines.push(`publication_date: ${yamlContent.publication_date}`);
					}
					if (yamlContent.provider) {
						yamlLines.push(`provider: ${yamlContent.provider}`);
					}
					if (yamlContent.packager) {
						yamlLines.push(`packager: ${yamlContent.packager}`);
					}
					yamlLines.push(`objects:`);
					yamlLines.push(`  framework:`);
					
					const fw = yamlContent.objects?.framework;
					if (fw) {
						yamlLines.push(`    urn: ${fw.urn}`);
						yamlLines.push(`    ref_id: ${fw.ref_id}`);
						yamlLines.push(`    name: ${fw.name}`);
						if (fw.description) {
							yamlLines.push(`    description: "${fw.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
						}
						yamlLines.push(`    requirement_nodes:`);
						
						for (const node of fw.requirement_nodes || []) {
							yamlLines.push(`    - urn: ${node.urn}`);
							yamlLines.push(`      assessable: ${node.assessable}`);
							yamlLines.push(`      depth: ${node.depth}`);
							if (node.parent_urn) {
								yamlLines.push(`      parent_urn: ${node.parent_urn}`);
							}
							if (node.ref_id) {
								yamlLines.push(`      ref_id: "${node.ref_id}"`);
							}
							if (node.name) {
								yamlLines.push(`      name: "${node.name.replace(/"/g, '\\"')}"`);
							}
							if (node.description) {
								yamlLines.push(`      description: "${node.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
							}
						}
					}
					
					const yamlString = yamlLines.join('\n');
					const filename = `${library.ref_id || 'library'}.yaml`;
					const file = new Blob([yamlString], { type: 'application/x-yaml' });
					
					// Upload to CISO Assistant
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
							console.log(`Updated library: ${library.name}`);
						} else {
							successCount++;
							console.log(`Added new library: ${library.name}`);
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
			
			// Show appropriate message
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
				setFlash({ 
					type: 'error', 
					message: `فشل في المزامنة. الأخطاء: ${errorCount}` 
				}, event);
			} else {
				setFlash({ 
					type: 'info', 
					message: 'لا توجد مكتبات للمزامنة' 
				}, event);
			}
			
		} catch (error) {
			console.error('Error fetching from Muraji:', error);
			setFlash({ type: 'error', message: 'خطأ في الاتصال بمراجع API' }, event);
			return fail(500);
		}
	}
};
