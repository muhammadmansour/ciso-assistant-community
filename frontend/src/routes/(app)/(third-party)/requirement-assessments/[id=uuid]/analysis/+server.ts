import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const requirementAssessmentId = event.params.id;

	try {
		// Call the backend endpoint which handles:
		// 1. Gathering applied controls & their evidences
		// 2. Getting/uploading Gemini file IDs
		// 3. Extracting questions from the requirement
		// 4. Sending to Muraji /api/audit/analyze
		// 5. Returning structured response with questionEvaluation
		const endpoint = `${BASE_API_URL}/requirement-assessments/${requirementAssessmentId}/run-ai-analysis/`;

		console.log(`[RA-AI] Calling backend: ${endpoint}`);

		const response = await event.fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error('[RA-AI] Backend error:', response.status, errorData);
			return new Response(
				JSON.stringify({
					error: errorData.message || `Analysis failed (${response.status})`,
					details: errorData.detail || errorData.message || 'Unknown error'
				}),
				{ status: response.status, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const result = await response.json();
		console.log('[RA-AI] Analysis completed, keys:', Object.keys(result));

		return new Response(JSON.stringify(result), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('[RA-AI] Error:', error);
		return new Response(
			JSON.stringify({ error: 'Analysis failed', details: String(error) }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
