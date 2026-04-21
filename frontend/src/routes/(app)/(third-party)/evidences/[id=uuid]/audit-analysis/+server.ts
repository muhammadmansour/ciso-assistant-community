import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BASE_API_URL } from '$lib/utils/constants';

const AUDIT_ANALYSIS_API_URL = 'https://muraji-api.wathbah.dev/api/audit/analyze';

export const POST: RequestHandler = async ({ params, request, fetch }) => {
	const evidenceId = params.id;
	
	try {
		// Get the questions, typical evidence, and context from request body
		const requestData = await request.json();
		const { 
			questions = [], 
			typicalEvidence = [],
			requirementsContext = [],
			evidenceName = '',
			evidenceDescription = ''
		} = requestData;

		// First, fetch the evidence file from backend
		console.log('=== Audit Analysis API Request ===');
		console.log('Evidence ID:', evidenceId);
		console.log('Evidence Name:', evidenceName);
		
		const evidenceRes = await fetch(`${BASE_API_URL}/evidences/${evidenceId}/`);
		if (!evidenceRes.ok) {
			throw error(404, 'Evidence not found');
		}
		
		const evidenceData = await evidenceRes.json();
		const attachmentName = evidenceData.attachment;
		
		if (!attachmentName) {
			return json({ error: 'No attachment found for this evidence' }, { status: 400 });
		}
		
		// Fetch the actual file
		const fileRes = await fetch(`${BASE_API_URL}/evidences/${evidenceId}/attachment/`);
		if (!fileRes.ok) {
			throw error(404, 'Attachment file not found');
		}
		
		const fileBlob = await fileRes.blob();
		const fileBuffer = await fileBlob.arrayBuffer();
		const base64Data = Buffer.from(fileBuffer).toString('base64');
		
		// Determine MIME type
		const mimeType = fileBlob.type || 'application/octet-stream';
		
		console.log('Filename:', attachmentName);
		console.log('MimeType:', mimeType);
		console.log('File size:', fileBuffer.byteLength, 'bytes');
		console.log('Questions count:', questions.length);
		console.log('Typical evidence count:', typicalEvidence.length);
		console.log('Requirements context count:', requirementsContext.length);

		// Build context string from requirements
		const contextParts: string[] = [];
		
		if (evidenceName) {
			contextParts.push(`Evidence: ${evidenceName}`);
		}
		if (evidenceDescription) {
			contextParts.push(`Description: ${evidenceDescription}`);
		}
		
		// Add requirements context
		if (requirementsContext.length > 0) {
			const reqContextStr = requirementsContext.map((req: {
				ref_id: string;
				name: string;
				description: string;
				provider: string;
				framework: string;
				framework_provider: string;
			}) => {
				const parts = [];
				if (req.framework) parts.push(`Framework: ${req.framework}`);
				if (req.framework_provider || req.provider) parts.push(`Provider: ${req.framework_provider || req.provider}`);
				if (req.ref_id) parts.push(`Requirement: ${req.ref_id}`);
				if (req.name) parts.push(`Name: ${req.name}`);
				if (req.description) parts.push(`Description: ${req.description}`);
				return parts.join(', ');
			}).join('\n');
			contextParts.push(`\nLinked Requirements:\n${reqContextStr}`);
		}

		// Prepare the request to Muraji API
		const auditRequest = {
			files: [
				{
					name: attachmentName,
					mimeType: mimeType,
					encoding: 'base64',
					data: base64Data
				}
			],
			questions: questions,
			typicalEvidence: typicalEvidence,
			options: {
				context: contextParts.join('\n') || 'Compliance audit analysis'
			}
		};

		// Call the Muraji audit analysis API with extended timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 minutes timeout

		const analysisRes = await fetch(AUDIT_ANALYSIS_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(auditRequest),
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		// Check if we got a valid JSON response
		const contentType = analysisRes.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			const textResponse = await analysisRes.text();
			console.error('Audit Analysis API error:', textResponse);
			return json(
				{
					error: 'Audit Analysis Failed',
					message: textResponse.substring(0, 500),
					details: 'The audit analysis service returned an invalid response.'
				},
				{ status: 502 }
			);
		}

		if (!analysisRes.ok) {
			const errorData = await analysisRes.json();
			console.error('Audit Analysis API error:', errorData);
			return json(
				{
					error: 'Audit Analysis Failed',
					message: errorData.message || errorData.error || 'Unknown error',
					details: errorData.details || 'The audit analysis service encountered an error.'
				},
				{ status: analysisRes.status }
			);
		}

		const analysisResult = await analysisRes.json();
		console.log('Audit analysis completed successfully');
		
		return json(analysisResult);

	} catch (err) {
		console.error('Audit analysis error:', err);
		
		if (err instanceof Error && err.name === 'AbortError') {
			return json(
				{
					error: 'Timeout',
					message: 'Audit analysis request timed out after 5 minutes',
					details: 'The document may be too large or complex. Try with a smaller file.'
				},
				{ status: 504 }
			);
		}
		
		return json(
			{
				error: 'Internal Error',
				message: String(err),
				details: 'An unexpected error occurred during audit analysis.'
			},
			{ status: 500 }
		);
	}
};
