import { BASE_API_URL } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Remove unsafe characters and normalize the filename (but keep Unicode letters)
function sanitizeFileName(name: string): string {
	return name
		.normalize('NFKC') // Normalize Unicode
		.replace(/[\x00-\x1F<>:"/\\|?*\u007F'`’‘“”()\[\]{}]/g, '-') // Remove dangerous characters
		.replace(/\s+/g, '-') // Replace whitespace with dash
		.replace(/\.+$/g, '') // Remove trailing dots
		.replace(/^-+|-+$/g, '') // Trim leading/trailing dashes
		.replace(/-+/g, '-') // Collapse multiple dashes
		.substring(0, 100); // Truncate to avoid overly long names
}

// Format date as YYYY-MM-DD_HH-MM-SS (safe and readable)
function formatDateForFilename(date: Date = new Date()): string {
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}

export const GET: RequestHandler = async ({ fetch, params }) => {
	const URLModel = 'compliance-assessments';
	const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/export/`;

	// Fetch the compliance assessment details
	const compliance_assessment = await fetch(`${BASE_API_URL}/${URLModel}/${params.id}/`).then(
		(res) => res.json()
	);

	// Build and sanitize the filename
	const namePart = `${compliance_assessment.name}-${compliance_assessment.framework.str}`;
	const datePart = formatDateForFilename(); // e.g. 2025-06-26_16-45-12
	const sanitizedName = sanitizeFileName(namePart);
	const finalFileName = `${sanitizedName}-${datePart}.zip`;
	const urlEncodedFileName = encodeURIComponent(finalFileName);
	// HTTP headers are Latin-1 only; non-ASCII names live in filename* above
	const asciiFileName = finalFileName
		.replace(/[^\x20-\x7E]|"/g, '')
		.replace(/-+/g, '-')
		.replace(/^-/, '');

	// Fetch the ZIP blob
	const res = await fetch(endpoint);
	if (!res.ok) {
		let detail = '';
		try {
			const body = await res.json();
			detail = body?.error || body?.detail || '';
		} catch {
			// non-JSON error body
		}
		throw error(res.status, `Error fetching the ZIP file${detail ? `: ${detail}` : ''}`);
	}
	const blobData = await res.blob();

	// Return the file with proper headers
	return new Response(blobData, {
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': `attachment; filename*=utf-8''${urlEncodedFileName}; filename="${asciiFileName}"`
		}
	});
};
