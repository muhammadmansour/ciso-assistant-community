import { getModelInfo } from '$lib/utils/crud';
import { loadDetail } from '$lib/utils/load';
import { type Actions, fail } from '@sveltejs/kit';
import { BASE_API_URL } from '$lib/utils/constants';
import { handleErrorResponse } from '$lib/utils/actions';
import { modelSchema } from '$lib/utils/schemas';
import { setFlash } from 'sveltekit-flash-message/server';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { m } from '$paraglide/messages';

import type { PageServerLoad } from './$types';
import { nestedDeleteFormAction } from '$lib/utils/actions';

export const load: PageServerLoad = async (event) => {
	const detailData = await loadDetail({ event, model: getModelInfo('evidences'), id: event.params.id });
	
	// Load stored AI analysis (entity extraction)
	let aiAnalysis = null;
	let aiAnalysisUpdatedAt = null;
	
	// Load stored audit analysis
	let auditAnalysis = null;
	let auditAnalysisUpdatedAt = null;
	
	// Load questions and typical evidence from linked requirement assessments
	let questions: string[] = [];
	let typicalEvidence: string[] = [];
	let requirementsContext: Array<{
		ref_id: string;
		name: string;
		description: string;
		provider: string;
		framework: string;
		framework_provider: string;
	}> = [];
	let evidenceName = '';
	let evidenceDescription = '';
	
	try {
		const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/ai-analysis/`);
		if (res.ok) {
			const data = await res.json();
			aiAnalysis = data.ai_analysis;
			aiAnalysisUpdatedAt = data.ai_analysis_updated_at;
			auditAnalysis = data.audit_analysis;
			auditAnalysisUpdatedAt = data.audit_analysis_updated_at;
			questions = data.questions || [];
			typicalEvidence = data.typical_evidence || [];
			requirementsContext = data.requirements_context || [];
			evidenceName = data.evidence_name || '';
			evidenceDescription = data.evidence_description || '';
		}
	} catch (err) {
		console.warn('Failed to load AI analysis:', err);
	}

	let aiAnalyses: any[] = [];
	try {
		const analysesResponse = await event.fetch(
			`${BASE_API_URL}/evidences/${event.params.id}/ai-analyses/`
		);
		if (analysesResponse.ok) {
			aiAnalyses = await analysesResponse.json();
		}
	} catch (err) {
		console.warn('Failed to load evidence AI analyses:', err);
	}
	
	return {
		...detailData,
		aiAnalysis,
		aiAnalysisUpdatedAt,
		auditAnalysis,
		auditAnalysisUpdatedAt,
		questions,
		typicalEvidence,
		requirementsContext,
		evidenceName,
		evidenceDescription,
		aiAnalyses
	};
};

export const actions: Actions = {
	delete: async (event) => {
		return nestedDeleteFormAction({ event });
	},

	saveAiAnalysis: async (event) => {
		const formData = await event.request.formData();
		const analysisJson = formData.get('analysis') as string;

		if (!analysisJson) {
			return fail(400, { error: 'Analysis data is required' });
		}

		try {
			const analysis = JSON.parse(analysisJson);

			const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/ai-analysis/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ analysis })
			});

			if (!res.ok) {
				const error = await res.text();
				return fail(res.status, { error });
			}

			const result = await res.json();
			return { success: true, aiAnalysisUpdatedAt: result.ai_analysis_updated_at };
		} catch (err) {
			return fail(500, { error: String(err) });
		}
	},

	runAuditAnalysis: async (event) => {
		const response = await event.fetch(
			`${BASE_API_URL}/evidences/${event.params.id}/run-ai-analysis/`,
			{ method: 'POST' }
		);

		if (!response.ok) {
			const err = await response.json().catch(() => ({}));
			const messageText = err.message || err.detail || `Error ${response.status}`;
			return fail(response.status, { auditError: messageText });
		}

		const result = await response.json();
		return { aiAnalysis: result };
	},

	deleteAiAnalysis: async (event) => {
		const formData = await event.request.formData();
		const analysisId = formData.get('analysisId');
		if (!analysisId) {
			return fail(400, { error: 'Missing analysis ID' });
		}

		const response = await event.fetch(
			`${BASE_API_URL}/evidences/${event.params.id}/ai-analyses/${analysisId}/delete/`,
			{ method: 'DELETE' }
		);

		if (!response.ok) {
			return fail(response.status, { error: 'Failed to delete analysis' });
		}

		return { deleted: true };
	},

	createTaskFromGap: async (event) => {
		const schema = modelSchema('task-templates');
		const contentType = event.request.headers.get('content-type') ?? '';
		const form = contentType.includes('application/json')
			? await superValidate(await event.request.json(), zod(schema))
			: await superValidate(await event.request.formData(), zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await event.fetch(`${BASE_API_URL}/task-templates/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form.data)
		});

		if (!response.ok) return handleErrorResponse({ event, response, form });

		const writtenObject = await response.json();
		setFlash(
			{
				type: 'success',
				message: m.successfullyCreatedObject({ object: m.taskTemplate() })
			},
			event
		);
		return message(form, { object: writtenObject });
	},

	saveAuditAnalysis: async (event) => {
		const formData = await event.request.formData();
		const analysisJson = formData.get('analysis') as string;
		
		if (!analysisJson) {
			return fail(400, { error: 'Analysis data is required' });
		}
		
		try {
			const analysis = JSON.parse(analysisJson);
			
			const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/audit-analysis/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ analysis })
			});
			
			if (!res.ok) {
				const error = await res.text();
				return fail(res.status, { error });
			}
			
			const result = await res.json();
			return { success: true, auditAnalysisUpdatedAt: result.audit_analysis_updated_at };
		} catch (err) {
			return fail(500, { error: String(err) });
		}
	}
};
