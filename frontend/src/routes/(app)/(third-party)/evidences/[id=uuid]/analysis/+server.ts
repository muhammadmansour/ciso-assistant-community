import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

const ENTITY_EXTRACTION_API_URL = 'http://muraji-dev.wathbahs.com/api/entity-extraction/extract';
// Maximum file size for AI analysis (in bytes)
const MAX_FILE_SIZE_FOR_AI = 50 * 1024 * 1024; // 50MB

export const POST: RequestHandler = async (event) => {
	const evidenceId = event.params.id;

	try {
		// Fetch evidence details
		const evidenceEndpoint = `${BASE_API_URL}/evidences/${evidenceId}/`;
		const evidenceRes = await event.fetch(evidenceEndpoint);

		if (!evidenceRes.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch evidence' }), {
				status: evidenceRes.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const evidence = await evidenceRes.json();

		// Fetch the evidence attachment
		const attachmentEndpoint = `${BASE_API_URL}/evidences/${evidenceId}/attachment/`;
		const attachmentRes = await event.fetch(attachmentEndpoint);

		if (!attachmentRes.ok) {
			return new Response(
				JSON.stringify({ error: 'Failed to fetch evidence attachment' }),
				{
					status: attachmentRes.status,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		const contentType = attachmentRes.headers.get('content-type') || 'application/octet-stream';
		const contentDisposition = attachmentRes.headers.get('content-disposition') || '';

		// Extract filename from content-disposition header
		let filename = evidence.attachment || `evidence_${evidenceId}`;
		const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
		if (filenameMatch) {
			filename = filenameMatch[1].replace(/['"]/g, '');
		}

		// Get the file data as base64
		const arrayBuffer = await attachmentRes.arrayBuffer();

		// Check file size
		if (arrayBuffer.byteLength > MAX_FILE_SIZE_FOR_AI) {
			return new Response(
				JSON.stringify({
					error: 'File too large',
					details: `File size (${Math.round(arrayBuffer.byteLength / 1024 / 1024)}MB) exceeds the maximum allowed size (${Math.round(MAX_FILE_SIZE_FOR_AI / 1024 / 1024)}MB)`
				}),
				{
					status: 413,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		const base64Data = Buffer.from(arrayBuffer).toString('base64');

		// Log what's being sent
		console.log('=== Entity Extraction API Request ===');
		console.log('Evidence ID:', evidenceId);
		console.log('Filename:', filename);
		console.log('MimeType:', contentType);
		console.log('File size:', arrayBuffer.byteLength, 'bytes');

		// Prepare the files array for the API
		const files = [
			{
				name: filename,
				mimeType: contentType,
				encoding: 'base64',
				data: base64Data
			}
		];

		// Call the Entity Extraction API
		const aiResponse = await fetch(ENTITY_EXTRACTION_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ files })
		});

		if (!aiResponse.ok) {
			const errorText = await aiResponse.text();
			console.error('Entity Extraction API error:', errorText);
			return new Response(
				JSON.stringify({ error: 'Entity extraction failed', details: errorText }),
				{
					status: aiResponse.status,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		const analysisResult = await aiResponse.json();

		// Check if API returned success
		if (!analysisResult.success) {
			return new Response(
				JSON.stringify({
					error: 'Entity extraction failed',
					details: analysisResult.error || 'Unknown error'
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Return the analysis result
		return new Response(JSON.stringify(analysisResult), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Entity extraction error:', error);
		return new Response(
			JSON.stringify({ error: 'Entity extraction failed', details: String(error) }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
