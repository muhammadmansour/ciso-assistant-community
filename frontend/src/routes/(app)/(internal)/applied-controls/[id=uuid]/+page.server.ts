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

	// Load past AI analyses (safe — won't break page if it fails)
	let aiAnalyses: any[] = [];
	try {
		const analysesResponse = await event.fetch(
			`${BASE_API_URL}/applied-controls/${event.params.id}/ai-analyses/`
		);
		if (analysesResponse.ok) {
			aiAnalyses = await analysesResponse.json();
		}
	} catch (e) {
		console.error('Failed to load AI analyses:', e);
	}

	// Attach requirement assessment options to the evidence related model
	// so the EvidenceForm can show an optional "Evidence to Requirement" dropdown
	if (data.relatedModels?.['evidences']) {
		const raIds: string[] = appliedControl.requirement_assessments ?? [];
		if (Array.isArray(raIds) && raIds.length > 0) {
			try {
				// Fetch each RA to get its display name (str)
				const raOptions = await Promise.all(
					raIds.map(async (raId: string) => {
						const raResp = await event.fetch(
							`${BASE_API_URL}/requirement-assessments/${raId}/`
						);
						if (raResp.ok) {
							const ra = await raResp.json();
							return { label: ra.str || ra.name || raId, value: raId };
						}
						return null;
					})
				);
				const filtered = raOptions.filter(Boolean);
				if (filtered.length > 0) {
					data.relatedModels['evidences'].requirementAssessmentOptions = filtered;
				}
			} catch (e) {
				console.error('Failed to load RA options for evidence form:', e);
			}
		}
	}

	return {
		...data,
		duplicateForm: appliedControlDuplicateForm,
		aiAnalyses
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
	},
	deleteAiAnalysis: async (event) => {
		const formData = await event.request.formData();
		const analysisId = formData.get('analysisId');
		if (!analysisId) {
			return fail(400, { error: 'Missing analysis ID' });
		}

		const response = await event.fetch(
			`${BASE_API_URL}/applied-controls/${event.params.id}/ai-analyses/${analysisId}/delete/`,
			{ method: 'DELETE' }
		);

		if (!response.ok) {
			return fail(response.status, { error: 'Failed to delete analysis' });
		}

		return { deleted: true };
	},
	runAiAnalysis: async (event) => {
		// Call backend which calls Muraji API directly, wait for result
		const response = await event.fetch(
			`${BASE_API_URL}/applied-controls/${event.params.id}/run-ai-analysis/`,
			{ method: 'POST' }
		);

		if (!response.ok) {
			const err = await response.json().catch(() => ({}));
			const message = err.message || `Error ${response.status}`;
			// Surface the alert as a flash toast in addition to the inline error
			// — particularly useful when all evidences failed Gemini indexing.
			setFlash(
				{
					type: err.code === 'all_indexing_failed' ? 'warning' : 'error',
					message
				},
				event
			);
			return fail(response.status, { aiError: message, aiErrorCode: err.code });
		}

		const result = await response.json();
		return { aiAnalysis: result };
	}
};
