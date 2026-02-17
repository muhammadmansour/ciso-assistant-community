import { BASE_API_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

const AI_API_URL = 'https://muraji-api.wathbahs.com/api/chat';
const MAX_FILE_SIZE_FOR_AI = 50 * 1024 * 1024; // 50MB

interface AppliedControlDetail {
	id: string;
	ref_id: string;
	name: string;
	description: string;
	status: string;
	evidences: Array<{ id: string; str: string; description?: string }>;
}

interface FileWithSource {
	name: string;
	mimeType: string;
	encoding: string;
	data: string;
	description: string;
	size?: number;
	appliedControlId: string;
	appliedControlName: string;
}

export const POST: RequestHandler = async (event) => {
	const requirementAssessmentId = event.params.id;

	try {
		// 1. Fetch the requirement assessment details
		const raEndpoint = `${BASE_API_URL}/requirement-assessments/${requirementAssessmentId}/`;
		const raRes = await event.fetch(raEndpoint);

		if (!raRes.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch requirement assessment' }), {
				status: raRes.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const requirementAssessment = await raRes.json();
		const requirement = requirementAssessment.requirement;
		const appliedControlRefs = requirementAssessment.applied_controls || [];

		console.log('=== AI Analysis: Requirement Assessment ===');
		console.log(`Requirement: ${requirement.ref_id} - ${requirement.name}`);
		console.log(`Applied Controls linked: ${appliedControlRefs.length}`);

		// 2. Fetch full details for each applied control (to get their evidences)
		const appliedControls: AppliedControlDetail[] = [];

		for (const acRef of appliedControlRefs) {
			try {
				const acEndpoint = `${BASE_API_URL}/applied-controls/${acRef.id}/`;
				const acRes = await event.fetch(acEndpoint);
				if (acRes.ok) {
					const ac = await acRes.json();
					appliedControls.push({
						id: ac.id,
						ref_id: ac.ref_id || '',
						name: ac.name || acRef.str || acRef.id,
						description: ac.description || '',
						status: ac.status || '--',
						evidences: ac.evidences || []
					});
					console.log(`  AC "${ac.name}": ${(ac.evidences || []).length} evidences`);
				}
			} catch (err) {
				console.error(`Failed to fetch applied control ${acRef.id}:`, err);
			}
		}

		// 3. For each applied control, fetch its evidence files
		const allFiles: FileWithSource[] = [];

		for (const ac of appliedControls) {
			if (!ac.evidences || ac.evidences.length === 0) continue;

			for (const evidence of ac.evidences) {
				try {
					const attachmentEndpoint = `${BASE_API_URL}/evidences/${evidence.id}/attachment/`;
					const attachmentRes = await event.fetch(attachmentEndpoint);

					if (attachmentRes.ok) {
						const contentType =
							attachmentRes.headers.get('content-type') || 'application/octet-stream';
						const contentDisposition =
							attachmentRes.headers.get('content-disposition') || '';

						let filename = evidence.str || `evidence_${evidence.id}`;
						const filenameMatch = contentDisposition.match(
							/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
						);
						if (filenameMatch) {
							filename = filenameMatch[1].replace(/['"]/g, '');
						}

						const arrayBuffer = await attachmentRes.arrayBuffer();

						if (arrayBuffer.byteLength > MAX_FILE_SIZE_FOR_AI) {
							console.log(
								`  Skipping large file ${filename} (${arrayBuffer.byteLength} bytes)`
							);
							continue;
						}

						const base64Data = Buffer.from(arrayBuffer).toString('base64');
						const isTextFile =
							contentType.startsWith('text/') ||
							contentType === 'application/json' ||
							contentType === 'application/xml';

						allFiles.push({
							name: filename,
							mimeType: contentType,
							encoding: isTextFile ? 'text' : 'base64',
							data: isTextFile
								? Buffer.from(arrayBuffer).toString('utf-8')
								: base64Data,
							description: `[From Applied Control: ${ac.name}] ${evidence.description || evidence.str || filename}`,
							size: arrayBuffer.byteLength,
							appliedControlId: ac.id,
							appliedControlName: ac.name
						});
					}
				} catch (error) {
					console.error(`Failed to fetch evidence ${evidence.id}:`, error);
				}
			}
		}

		console.log(`Total files collected from all applied controls: ${allFiles.length}`);

		// 4. Build context with applied control ↔ evidence mapping
		const context = buildContext(requirementAssessment, requirement, appliedControls, allFiles);

		// 5. Send to Muraji AI API (strip the source metadata from files before sending)
		const filesForApi = allFiles.map(({ appliedControlId, appliedControlName, ...rest }) => rest);

		const aiResponse = await fetch(AI_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ context, files: filesForApi })
		});

		if (!aiResponse.ok) {
			const errorText = await aiResponse.text();
			console.error('AI API error:', errorText);
			return new Response(
				JSON.stringify({ error: 'AI analysis failed', details: errorText }),
				{ status: aiResponse.status, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const analysisResult = await aiResponse.json();

		if (!analysisResult.success) {
			return new Response(
				JSON.stringify({
					error: 'AI analysis failed',
					details: analysisResult.error || 'Unknown error'
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Return AI response + the applied control mapping for the UI
		return new Response(
			JSON.stringify({
				...(typeof analysisResult.response === 'string'
					? { text: analysisResult.response }
					: analysisResult.response),
				_appliedControls: appliedControls.map((ac) => ({
					id: ac.id,
					name: ac.name,
					ref_id: ac.ref_id,
					status: ac.status,
					evidenceCount: ac.evidences.length,
					fileNames: allFiles
						.filter((f) => f.appliedControlId === ac.id)
						.map((f) => f.name)
				}))
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Analysis error:', error);
		return new Response(
			JSON.stringify({ error: 'Analysis failed', details: String(error) }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

function buildContext(
	requirementAssessment: Record<string, any>,
	requirement: Record<string, any>,
	appliedControls: AppliedControlDetail[],
	files: FileWithSource[]
): string {
	const parts: string[] = [];

	// ── Requirement info ──
	parts.push('# AUDIT REQUIREMENT ANALYSIS');
	parts.push('');
	parts.push('## Requirement Information');
	if (requirement.ref_id) parts.push(`**Code:** ${requirement.ref_id}`);
	if (requirement.name) parts.push(`**Title:** ${requirement.name}`);
	parts.push(
		`**Applicability:** ${requirementAssessment.result === 'not_applicable' ? 'Not Applicable' : 'Applicable'}`
	);
	parts.push('');

	if (requirement.description) {
		parts.push('**Description:**');
		parts.push(requirement.description);
		parts.push('');
	}

	if (requirement.annotation) {
		parts.push('**Discussion / Annotation:**');
		parts.push(requirement.annotation);
		parts.push('');
	}

	if (requirement.typical_evidence) {
		parts.push('**Typical Evidence Expected:**');
		parts.push(requirement.typical_evidence);
		parts.push('');
	}

	// ── Current assessment status ──
	parts.push('## Current Assessment Status');
	parts.push(`- Status: ${requirementAssessment.status || 'not set'}`);
	parts.push(`- Result: ${requirementAssessment.result || 'not assessed'}`);
	if (requirementAssessment.observation) {
		parts.push(`- Observation: ${requirementAssessment.observation}`);
	}
	parts.push('');

	// ── Applied controls with their evidences ──
	parts.push('## Applied Controls & Evidence Mapping');
	parts.push('');
	parts.push(
		`This requirement has **${appliedControls.length} applied control(s)** with a total of **${files.length} evidence file(s)**.`
	);
	parts.push('');

	for (const ac of appliedControls) {
		const acFiles = files.filter((f) => f.appliedControlId === ac.id);
		parts.push(`### Applied Control: "${ac.name}" (${ac.ref_id || 'no ref'})`);
		parts.push(`- Status: ${ac.status}`);
		if (ac.description) parts.push(`- Description: ${ac.description}`);
		parts.push(`- Evidence files (${acFiles.length}):`);
		if (acFiles.length > 0) {
			for (const f of acFiles) {
				parts.push(`  - 📄 **${f.name}** (${f.mimeType}, ${formatFileSize(f.size || 0)})`);
			}
		} else {
			parts.push('  - _(no evidence files attached)_');
		}
		parts.push('');
	}

	// ── Instructions for the AI ──
	parts.push('## ANALYSIS INSTRUCTIONS');
	parts.push('');
	parts.push('Please analyze this requirement and the provided evidence files. Your report MUST:');
	parts.push('');
	parts.push(
		'1. **Overall Assessment**: Give an overall compliance status (compliant / partially_compliant / non_compliant / not_assessed) and a score (0-100).'
	);
	parts.push(
		'2. **Requirement Analysis**: Analyze whether the requirement is met based on the evidence provided.'
	);
	parts.push(
		'3. **Per-Applied-Control Breakdown**: For EACH applied control listed above, explain:'
	);
	parts.push('   - What evidence was found in that control\'s files');
	parts.push('   - How that evidence contributes to meeting (or not meeting) the requirement');
	parts.push('   - A compliance verdict for that specific control');
	parts.push(
		'4. **Evidence Attribution**: When citing a finding, ALWAYS specify which evidence file it came from and which applied control that file belongs to.'
	);
	parts.push('5. **Gaps & Recommendations**: Identify any gaps and provide actionable recommendations.');
	parts.push('');
	parts.push(
		'Format the response in clear markdown with headers and sections. Use Arabic if the requirement is in Arabic.'
	);

	return parts.join('\n');
}

function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
