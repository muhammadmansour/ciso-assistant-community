import { getModelInfo } from '$lib/utils/crud';
import { loadDetail } from '$lib/utils/load';
import { type Actions, fail } from '@sveltejs/kit';
import { BASE_API_URL } from '$lib/utils/constants';

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
		}
	} catch (err) {
		console.warn('Failed to load AI analysis:', err);
	}
	
	return {
		...detailData,
		aiAnalysis,
		aiAnalysisUpdatedAt,
		auditAnalysis,
		auditAnalysisUpdatedAt,
		questions,
		typicalEvidence
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
