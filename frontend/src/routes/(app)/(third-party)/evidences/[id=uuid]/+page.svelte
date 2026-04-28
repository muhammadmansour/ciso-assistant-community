<script lang="ts">
	import ConfirmModal from '$lib/components/Modals/ConfirmModal.svelte';
	import { getModelInfo } from '$lib/utils/crud.js';
	import type { ModalComponent, ModalSettings, ModalStore } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import { m } from '$paraglide/messages';
	import { defaults } from 'sveltekit-superforms';
	import { z } from 'zod';
	import { zod } from 'sveltekit-superforms/adapters';
	import { canPerformAction } from '$lib/utils/access-control';
	import { getModalStore } from '$lib/components/Modals/stores';
	import { Tabs, ProgressRing } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	interface Attachment {
		type: string;
		url: string;
		fileExists: boolean;
	}

	interface EntityExtractionResult {
		success: boolean;
		entities?: Array<{
			text: string;
			type: string;
			category: string;
			confidence: number;
			context: string;
			source: string;
			metadata: Record<string, unknown>;
		}>;
		summary?: {
			totalEntities: number;
			byType: Record<string, number>;
			bySource: Record<string, number>;
		};
		relationships?: Array<{
			entity1: string;
			relation: string;
			entity2: string;
			confidence: number;
		}>;
		keyFindings?: string[];
		documentSummary?: string;
		timestamp?: string;
		aiModel?: string;
		metadata?: {
			timestamp: string;
			filesProcessed: number;
			model: string;
		};
		error?: string;
		details?: string;
	}

	interface AuditAnalysisResult {
		success: boolean;
		overallAssessment?: {
			status: string;
			score: number;
			summary: string;
		};
		requirementEvaluation?: {
			requirementMet: string;
			evidenceAlignment: string;
			specificFindings: string;
		};
		questionEvaluation?: Array<{
			questionNumber: number;
			question: string;
			answered: string;
			evidenceFound: string;
			sourceFile: string;
			confidence: number;
			notes: string;
		}>;
		typicalEvidenceCheck?: Array<{
			evidenceItem: string;
			status: string;
			foundIn: string;
			details: string;
		}>;
		fileAnalysis?: Array<{
			fileName: string;
			contentSummary: string;
			relevantSections: string[];
			coversQuestions: number[];
			coversEvidence: number[];
		}>;
		gaps?: Array<{
			gap: string;
			severity: string;
			impact: string;
			recommendation: string;
		}>;
		strengths?: string[];
		recommendations?: string[];
		timestamp?: string;
		aiModel?: string;
		metadata?: {
			timestamp: string;
			filesProcessed: number;
			questionsEvaluated: number;
			typicalEvidenceChecked: number;
			model: string;
		};
		error?: string;
		details?: string;
	}

	let attachment: Attachment | undefined = $state(undefined);
	
	// Entity Extraction state
	let analysisResult: EntityExtractionResult | null = $state(data.aiAnalysis || null);
	let analysisLoading = $state(false);
	let analysisError: string | null = $state(null);
	let analysisSaving = $state(false);
	let lastAnalyzedAt: string | null = $state(data.aiAnalysisUpdatedAt || null);
	
	// Audit Analysis state
	let auditResult: AuditAnalysisResult | null = $state(data.auditAnalysis || null);
	let auditLoading = $state(false);
	let auditError: string | null = $state(null);
	let auditSaving = $state(false);
	let lastAuditAt: string | null = $state(data.auditAnalysisUpdatedAt || null);
	
	// Questions and typical evidence from linked requirements
	let questions: string[] = $state(data.questions || []);
	let typicalEvidence: string[] = $state(data.typicalEvidence || []);
	let requirementsContext = $state(data.requirementsContext || []);
	let evidenceName: string = $state(data.evidenceName || '');
	let evidenceDescription: string = $state(data.evidenceDescription || '');
	
	let activeTab = $state('preview');

	const modalStore: ModalStore = getModalStore();

	// Save analysis to backend via form action
	async function saveAnalysis(analysis: EntityExtractionResult) {
		analysisSaving = true;
		try {
			const formData = new FormData();
			formData.append('analysis', JSON.stringify(analysis));
			
			const res = await fetch(`?/saveAiAnalysis`, {
				method: 'POST',
				body: formData
			});
			
			if (res.ok) {
				const result = await res.json();
				// Parse the response data from SvelteKit action format
				if (result.data) {
					lastAnalyzedAt = result.data.aiAnalysisUpdatedAt;
				}
				console.log('Analysis saved to database');
			} else {
				console.warn('Failed to save analysis');
			}
		} catch (err) {
			console.warn('Failed to save analysis:', err);
		} finally {
			analysisSaving = false;
		}
	}

	function modalConfirm(id: string, name: string, action: string): void {
		const modalComponent: ModalComponent = {
			ref: ConfirmModal,
			props: {
				_form: defaults(
					{ id, urlmodel: 'evidences' },
					zod(z.object({ id: z.string(), urlmodel: z.string() }))
				),
				schema: zod(z.object({ id: z.string(), urlmodel: z.string() })),
				id: id,
				debug: false,
				URLModel: getModelInfo('evidences').urlModel,
				formAction: action
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			// Data
			title: m.confirmModalTitle(),
			body: `${m.confirmModalMessage()}: ${name}?`
		};
		modalStore.trigger(modal);
	}

	async function runEntityExtraction() {
		analysisLoading = true;
		analysisError = null;

		try {
			const res = await fetch(`./${data.data.id}/analysis`, {
				method: 'POST'
			});

			const result = await res.json();

			if (!res.ok) {
				analysisError = result.error || 'Analysis failed';
				if (result.details) {
					analysisError += `: ${result.details}`;
				}
			} else {
				analysisResult = result;
				// Save to database
				await saveAnalysis(result);
			}
		} catch (err) {
			analysisError = `Failed to run analysis: ${String(err)}`;
		} finally {
			analysisLoading = false;
		}
	}

	// Save audit analysis to backend via form action
	async function saveAuditAnalysis(analysis: AuditAnalysisResult) {
		auditSaving = true;
		try {
			const formData = new FormData();
			formData.append('analysis', JSON.stringify(analysis));
			
			const res = await fetch(`?/saveAuditAnalysis`, {
				method: 'POST',
				body: formData
			});
			
			if (res.ok) {
				const result = await res.json();
				if (result.data) {
					lastAuditAt = result.data.auditAnalysisUpdatedAt;
				}
				console.log('Audit analysis saved to database');
			} else {
				console.warn('Failed to save audit analysis');
			}
		} catch (err) {
			console.warn('Failed to save audit analysis:', err);
		} finally {
			auditSaving = false;
		}
	}

	async function runAuditAnalysis() {
		auditLoading = true;
		auditError = null;

		try {
			const res = await fetch(`./${data.data.id}/audit-analysis`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					questions,
					typicalEvidence,
					requirementsContext,
					evidenceName,
					evidenceDescription
				})
			});

			const result = await res.json();

			if (!res.ok) {
				auditError = result.error || 'Audit analysis failed';
				if (result.details) {
					auditError += `: ${result.details}`;
				}
			} else {
				auditResult = result;
				// Save to database
				await saveAuditAnalysis(result);
			}
		} catch (err) {
			auditError = `Failed to run audit analysis: ${String(err)}`;
		} finally {
			auditLoading = false;
		}
	}

	onMount(async () => {
		const fetchAttachment = async () => {
			const res = await fetch(`./${data.data.id}/attachment`);
			const blob = await res.blob();
			return {
				type: blob.type,
				url: URL.createObjectURL(blob),
				fileExists: res.ok
			};
		};
		attachment = data.data.attachment ? await fetchAttachment() : undefined;
		
		// Check if auto-analysis should run (via URL param from redirect after creation)
		const urlParams = new URLSearchParams(window.location.search);
		const shouldAutoAnalyze = urlParams.get('autoAnalyze') === 'true';
		
		if (shouldAutoAnalyze && attachment?.fileExists) {
			// Remove the autoAnalyze param from URL without reload
			const newUrl = window.location.pathname;
			window.history.replaceState({}, '', newUrl);
			
			// Run both analyses in parallel
			const analysisPromises: Promise<void>[] = [];
			
			// Always run entity extraction if no existing results
			if (!analysisResult) {
				analysisPromises.push(runEntityExtraction());
			}
			
			// Always run audit analysis if no existing results
			if (!auditResult) {
				analysisPromises.push(runAuditAnalysis());
			}
			
			// Set tab to show progress
			activeTab = 'entity-extraction';
			
			// Wait for all analyses to complete
			await Promise.all(analysisPromises);
			
			// Switch to AI Analysis tab after completion
			activeTab = 'ai-analysis';
		}
	});

	const user = page.data.user;

	// Color mapping for entity types
	const entityTypeColors: Record<string, string> = {
		PERSON: 'bg-blue-100 text-blue-800 border-blue-300',
		ORGANIZATION: 'bg-green-100 text-green-800 border-green-300',
		STANDARD: 'bg-purple-100 text-purple-800 border-purple-300',
		CONTROL: 'bg-orange-100 text-orange-800 border-orange-300',
		POLICY: 'bg-pink-100 text-pink-800 border-pink-300',
		LOCATION: 'bg-yellow-100 text-yellow-800 border-yellow-300',
		DATE: 'bg-cyan-100 text-cyan-800 border-cyan-300',
		DEFAULT: 'bg-gray-100 text-gray-800 border-gray-300'
	};

	function getEntityColor(type: string): string {
		return entityTypeColors[type] || entityTypeColors.DEFAULT;
	}
</script>

<DetailView {data} />

{#if data.data.attachment}
	<div class="card mt-8 bg-white shadow-lg">
		<Tabs
			value={activeTab}
			onValueChange={(e) => (activeTab = e.value)}
			listJustify="justify-center"
			listClasses="flex flex-wrap border-b"
		>
			{#snippet list()}
				<Tabs.Control value="preview">
					<i class="fa-solid fa-eye mr-2"></i>
					{m.preview ? m.preview() : 'Preview'}
				</Tabs.Control>
				<!--
					Hidden per request: Entity Extraction tab.
					Re-enable by removing the {#if false} guard below.
				-->
				{#if false}
					<Tabs.Control value="entity-extraction">
						<i class="fa-solid fa-tags mr-2"></i>
						Entity Extraction
					</Tabs.Control>
				{/if}
				<Tabs.Control value="ai-analysis">
					<i class="fa-solid fa-brain mr-2"></i>
					AI Analysis
				</Tabs.Control>
			{/snippet}

			{#snippet content()}
				<!-- Preview Tab -->
				<Tabs.Panel value="preview">
					<div class="p-6 space-y-4">
						<div class="flex flex-row justify-end">
							<!--
								Hidden per request: raw attachment URL/path (was rendered as a heading
								above the PDF preview). Re-enable by restoring the <h4> below.
								<h4 class="h4 font-semibold" data-testid="attachment-name-title">
									{data.data.attachment}
								</h4>
							-->
							<div class="space-x-2">
								<Anchor
									href={`./${data.data.id}/attachment`}
									class="btn preset-filled-primary-500 h-fit"
									data-testid="attachment-download-button"
								>
									<i class="fa-solid fa-download mr-2"></i>
									{m.download()}
								</Anchor>
							</div>
						</div>
						{#if attachment}
							{#if attachment.type.startsWith('image')}
								<img src={attachment.url} alt="attachment" />
							{:else if attachment.type === 'application/pdf'}
								<embed src={attachment.url} type="application/pdf" width="100%" height="600px" />
							{:else}
								<div class="flex items-center justify-center space-x-4">
									{#if !attachment.fileExists}
										<p class="text-error-500 font-bold">{m.couldNotFindAttachmentMessage()}</p>
									{:else}
										<p class="font-bold text-sm">{m.NoPreviewMessage()}</p>
									{/if}
								</div>
							{/if}
						{:else}
							<span data-testid="loading-field">
								{m.loading()}...
							</span>
						{/if}
					</div>
				</Tabs.Panel>

				<!-- Entity Extraction Tab -->
				<Tabs.Panel value="entity-extraction">
					<div class="p-6 space-y-6">
						<!-- Header with Run Analysis button -->
						<div class="flex flex-row justify-between items-center">
							<div>
								<h4 class="h4 font-semibold">Entity Extraction</h4>
								<p class="text-sm text-gray-600">
									Extract entities, relationships, and key findings from the document
								</p>
								{#if lastAnalyzedAt}
									<p class="text-xs text-gray-500 mt-1">
										<i class="fa-solid fa-clock mr-1"></i>
										Last analyzed: {new Date(lastAnalyzedAt).toLocaleString()}
									</p>
								{/if}
							</div>
							<div class="flex items-center gap-2">
								{#if analysisSaving}
									<span class="text-sm text-gray-500">
										<i class="fa-solid fa-save mr-1"></i>Saving...
									</span>
								{/if}
								<button
									class="btn preset-filled-primary-500"
									onclick={runEntityExtraction}
									disabled={analysisLoading || analysisSaving}
								>
									{#if analysisLoading}
										<ProgressRing
											value={null}
											size="size-5"
											meterStroke="stroke-white"
											trackStroke="stroke-primary-300"
										/>
										<span class="ml-2">Extracting...</span>
									{:else if analysisResult}
										<i class="fa-solid fa-rotate mr-2"></i>
										Re-run Extraction
									{:else}
										<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
										Run Extraction
									{/if}
								</button>
							</div>
						</div>

						<!-- Error Display -->
						{#if analysisError}
							<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
								<div class="flex items-start gap-3">
									<i class="fa-solid fa-exclamation-circle text-red-500 mt-0.5"></i>
									<div>
										<p class="font-semibold text-red-800">Analysis Failed</p>
										<p class="text-sm text-red-600">{analysisError}</p>
									</div>
								</div>
							</div>
						{/if}

						<!-- Loading State -->
						{#if analysisLoading}
							<div class="flex flex-col items-center justify-center py-16 space-y-4">
								<ProgressRing
									value={null}
									size="size-16"
									meterStroke="stroke-primary-500"
									trackStroke="stroke-gray-200"
								/>
								<p class="text-gray-600">Analyzing document with AI...</p>
								<p class="text-sm text-gray-400">This may take a moment for large files</p>
							</div>
						{/if}

						<!-- Analysis Results -->
						{#if analysisResult && !analysisLoading}
							<div class="space-y-6">
								<!-- Document Summary -->
								{#if analysisResult.documentSummary}
									<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
										<h5 class="font-semibold text-blue-800 mb-2">
											<i class="fa-solid fa-file-lines mr-2"></i>
											Document Summary
										</h5>
										<p class="text-gray-700">{analysisResult.documentSummary}</p>
									</div>
								{/if}

								<!-- Key Findings -->
								{#if analysisResult.keyFindings && analysisResult.keyFindings.length > 0}
									<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
										<h5 class="font-semibold text-green-800 mb-3">
											<i class="fa-solid fa-lightbulb mr-2"></i>
											Key Findings
										</h5>
										<ul class="space-y-2">
											{#each analysisResult.keyFindings as finding}
												<li class="flex items-start gap-2">
													<i class="fa-solid fa-check text-green-600 mt-1"></i>
													<span class="text-gray-700">{finding}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}

								<!-- Summary Stats -->
								{#if analysisResult.summary}
									<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div class="p-4 bg-gray-50 border rounded-lg text-center">
											<p class="text-3xl font-bold text-primary-600">
												{analysisResult.summary.totalEntities}
											</p>
											<p class="text-sm text-gray-600">Total Entities</p>
										</div>
										<div class="p-4 bg-gray-50 border rounded-lg text-center">
											<p class="text-3xl font-bold text-primary-600">
												{Object.keys(analysisResult.summary.byType || {}).length}
											</p>
											<p class="text-sm text-gray-600">Entity Types</p>
										</div>
										<div class="p-4 bg-gray-50 border rounded-lg text-center">
											<p class="text-3xl font-bold text-primary-600">
												{analysisResult.relationships?.length || 0}
											</p>
											<p class="text-sm text-gray-600">Relationships</p>
										</div>
									</div>

									<!-- Entity Type Breakdown -->
									{#if analysisResult.summary.byType && Object.keys(analysisResult.summary.byType).length > 0}
										<div class="p-4 bg-white border rounded-lg">
											<h5 class="font-semibold text-gray-800 mb-3">
												<i class="fa-solid fa-chart-pie mr-2"></i>
												Entities by Type
											</h5>
											<div class="flex flex-wrap gap-2">
												{#each Object.entries(analysisResult.summary.byType) as [type, count]}
													<span
														class="px-3 py-1 rounded-full text-sm font-medium border {getEntityColor(
															type
														)}"
													>
														{type}: {count}
													</span>
												{/each}
											</div>
										</div>
									{/if}
								{/if}

								<!-- Entities List -->
								{#if analysisResult.entities && analysisResult.entities.length > 0}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-tags mr-2"></i>
											Extracted Entities
										</h5>
										<div class="overflow-x-auto">
											<table class="w-full text-sm">
												<thead>
													<tr class="border-b bg-gray-50">
														<th class="text-left p-2">Entity</th>
														<th class="text-left p-2">Type</th>
														<th class="text-left p-2">Category</th>
														<th class="text-left p-2">Confidence</th>
														<th class="text-left p-2">Context</th>
													</tr>
												</thead>
												<tbody>
													{#each analysisResult.entities as entity}
														<tr class="border-b hover:bg-gray-50">
															<td class="p-2 font-medium">{entity.text}</td>
															<td class="p-2">
																<span
																	class="px-2 py-0.5 rounded text-xs font-medium border {getEntityColor(
																		entity.type
																	)}"
																>
																	{entity.type}
																</span>
															</td>
															<td class="p-2 text-gray-600">{entity.category}</td>
															<td class="p-2">
																<span
																	class="px-2 py-0.5 rounded text-xs {entity.confidence >= 0.9
																		? 'bg-green-100 text-green-800'
																		: entity.confidence >= 0.7
																			? 'bg-yellow-100 text-yellow-800'
																			: 'bg-red-100 text-red-800'}"
																>
																	{Math.round(entity.confidence * 100)}%
																</span>
															</td>
															<td class="p-2 text-gray-600 text-xs max-w-xs truncate">
																{entity.context}
															</td>
														</tr>
													{/each}
												</tbody>
											</table>
										</div>
									</div>
								{/if}

								<!-- Relationships -->
								{#if analysisResult.relationships && analysisResult.relationships.length > 0}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-diagram-project mr-2"></i>
											Relationships
										</h5>
										<div class="space-y-2">
											{#each analysisResult.relationships as rel}
												<div
													class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm"
												>
													<span class="font-medium text-primary-700">{rel.entity1}</span>
													<i class="fa-solid fa-arrow-right text-gray-400"></i>
													<span
														class="px-2 py-0.5 bg-gray-200 rounded text-gray-700 italic"
													>
														{rel.relation}
													</span>
													<i class="fa-solid fa-arrow-right text-gray-400"></i>
													<span class="font-medium text-primary-700">{rel.entity2}</span>
													<span class="ml-auto text-xs text-gray-500">
														{Math.round(rel.confidence * 100)}% confidence
													</span>
												</div>
											{/each}
										</div>
									</div>
								{/if}

							</div>
						{/if}

						<!-- Initial State (no analysis yet) -->
						{#if !analysisResult && !analysisLoading && !analysisError}
							<div
								class="flex flex-col items-center justify-center py-16 space-y-4 text-gray-500"
							>
								<i class="fa-solid fa-tags text-6xl text-gray-300"></i>
								<p class="text-lg">No extraction results yet</p>
								<p class="text-sm">
									Click "Run Extraction" to extract entities and insights from this document
								</p>
								<p class="text-xs text-gray-400">
									Results will be saved and available next time you view this evidence
								</p>
							</div>
						{/if}
					</div>
				</Tabs.Panel>

				<!-- AI Analysis Tab -->
				<Tabs.Panel value="ai-analysis">
					<div class="p-6 space-y-6">
						<!-- Header with Run Analysis button -->
						<div class="flex flex-row justify-between items-center">
							<div>
								<h4 class="h4 font-semibold">AI Compliance Analysis</h4>
								<p class="text-sm text-gray-600">
									Analyze evidence against audit questions and typical evidence requirements
								</p>
								{#if lastAuditAt}
									<p class="text-xs text-gray-500 mt-1">
										<i class="fa-solid fa-clock mr-1"></i>
										Last analyzed: {new Date(lastAuditAt).toLocaleString()}
									</p>
								{/if}
							</div>
							<div class="flex items-center gap-2">
								{#if auditSaving}
									<span class="text-sm text-gray-500">
										<i class="fa-solid fa-save mr-1"></i>Saving...
									</span>
								{/if}
								<button
									class="btn preset-filled-primary-500"
									onclick={runAuditAnalysis}
									disabled={auditLoading || auditSaving}
								>
									{#if auditLoading}
										<ProgressRing
											value={null}
											size="size-5"
											meterStroke="stroke-white"
											trackStroke="stroke-primary-300"
										/>
										<span class="ml-2">Analyzing...</span>
									{:else if auditResult}
										<i class="fa-solid fa-rotate mr-2"></i>
										Re-run Analysis
									{:else}
										<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
										Run Analysis
									{/if}
								</button>
							</div>
						</div>

						<!-- Questions and Typical Evidence Context -->
						{#if questions.length > 0 || typicalEvidence.length > 0}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								{#if questions.length > 0}
									<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
										<h5 class="font-semibold text-blue-800 mb-2">
											<i class="fa-solid fa-circle-question mr-2"></i>
											Questions to Analyze ({questions.length})
										</h5>
										<ul class="text-sm text-gray-700 space-y-1">
											{#each questions.slice(0, 5) as q}
												<li class="flex items-start gap-2">
													<i class="fa-solid fa-chevron-right text-blue-400 mt-1 text-xs"></i>
													<span>{q}</span>
												</li>
											{/each}
											{#if questions.length > 5}
												<li class="text-blue-600 text-xs">+{questions.length - 5} more...</li>
											{/if}
										</ul>
									</div>
								{/if}
								{#if typicalEvidence.length > 0}
									<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
										<h5 class="font-semibold text-green-800 mb-2">
											<i class="fa-solid fa-file-circle-check mr-2"></i>
											Typical Evidence ({typicalEvidence.length})
										</h5>
										<ul class="text-sm text-gray-700 space-y-1">
											{#each typicalEvidence.slice(0, 5) as e}
												<li class="flex items-start gap-2">
													<i class="fa-solid fa-chevron-right text-green-400 mt-1 text-xs"></i>
													<span>{e}</span>
												</li>
											{/each}
											{#if typicalEvidence.length > 5}
												<li class="text-green-600 text-xs">+{typicalEvidence.length - 5} more...</li>
											{/if}
										</ul>
									</div>
								{/if}
							</div>
						{/if}

						<!-- Error Display -->
						{#if auditError}
							<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
								<div class="flex items-start gap-3">
									<i class="fa-solid fa-exclamation-circle text-red-500 mt-0.5"></i>
									<div>
										<p class="font-semibold text-red-800">Analysis Failed</p>
										<p class="text-sm text-red-600">{auditError}</p>
									</div>
								</div>
							</div>
						{/if}

						<!-- Loading State -->
						{#if auditLoading}
							<div class="flex flex-col items-center justify-center py-16 space-y-4">
								<ProgressRing
									value={null}
									size="size-16"
									meterStroke="stroke-primary-500"
									trackStroke="stroke-gray-200"
								/>
								<p class="text-gray-600">Analyzing evidence against audit criteria...</p>
								<p class="text-sm text-gray-400">This may take a moment for complex documents</p>
							</div>
						{/if}

						<!-- Audit Analysis Results -->
						{#if auditResult && !auditLoading}
							<div class="space-y-6">
								<!-- Overall Assessment -->
								{#if auditResult.overallAssessment}
									<div class="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg">
										<div class="flex items-center justify-between mb-3">
											<h5 class="font-semibold text-primary-800">
												<i class="fa-solid fa-gauge-high mr-2"></i>
												Overall Assessment
											</h5>
											<div class="flex items-center gap-4">
												<span class="px-3 py-1 rounded-full text-sm font-medium {
													auditResult.overallAssessment.status === 'Compliant' ? 'bg-green-100 text-green-800' :
													auditResult.overallAssessment.status === 'Partially Compliant' ? 'bg-yellow-100 text-yellow-800' :
													'bg-red-100 text-red-800'
												}">
													{auditResult.overallAssessment.status}
												</span>
												<div class="flex items-center gap-2">
													<span class="text-2xl font-bold text-primary-600">
														{auditResult.overallAssessment.score}%
													</span>
												</div>
											</div>
										</div>
										<p class="text-gray-700">{auditResult.overallAssessment.summary}</p>
									</div>
								{/if}

								<!-- Requirement Evaluation -->
								{#if auditResult.requirementEvaluation}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-clipboard-check mr-2"></i>
											Requirement Evaluation
										</h5>
										<div class="space-y-3">
											<div class="flex items-center gap-2">
												<span class="font-medium text-gray-700">Status:</span>
												<span class="px-2 py-0.5 rounded text-sm {
													auditResult.requirementEvaluation.requirementMet === 'full' ? 'bg-green-100 text-green-800' :
													auditResult.requirementEvaluation.requirementMet === 'partial' ? 'bg-yellow-100 text-yellow-800' :
													'bg-red-100 text-red-800'
												}">
													{auditResult.requirementEvaluation.requirementMet === 'full' ? 'Fully Met' :
													 auditResult.requirementEvaluation.requirementMet === 'partial' ? 'Partially Met' : 'Not Met'}
												</span>
											</div>
											<div>
												<p class="font-medium text-gray-700 mb-1">Evidence Alignment:</p>
												<p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">{auditResult.requirementEvaluation.evidenceAlignment}</p>
											</div>
											<div>
												<p class="font-medium text-gray-700 mb-1">Specific Findings:</p>
												<p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">{auditResult.requirementEvaluation.specificFindings}</p>
											</div>
										</div>
									</div>
								{/if}

								<!-- Question Evaluation -->
								{#if auditResult.questionEvaluation && auditResult.questionEvaluation.length > 0}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-clipboard-question mr-2"></i>
											Question Evaluation
										</h5>
										<div class="space-y-3">
											{#each auditResult.questionEvaluation as qa}
												<div class="p-3 bg-gray-50 rounded-lg">
													<div class="flex items-start justify-between mb-2">
														<p class="font-medium text-gray-800">
															<span class="text-primary-600">Q{qa.questionNumber}:</span> {qa.question}
														</p>
														<span class="px-2 py-0.5 rounded text-sm font-medium {
															qa.answered === 'Yes' ? 'bg-green-100 text-green-800' :
															qa.answered === 'Partially' ? 'bg-yellow-100 text-yellow-800' :
															'bg-red-100 text-red-800'
														}">
															{qa.answered}
														</span>
													</div>
													<div class="text-sm text-gray-600 space-y-1">
														<p><span class="font-medium">Evidence:</span> {qa.evidenceFound}</p>
														<p><span class="font-medium">Source:</span> {qa.sourceFile}</p>
														{#if qa.notes}
															<p class="text-gray-500 italic"><i class="fa-solid fa-note-sticky mr-1"></i> {qa.notes}</p>
														{/if}
													</div>
													<div class="flex items-center gap-2 mt-2">
														<span class="text-xs px-2 py-0.5 rounded {
															qa.confidence >= 0.8 ? 'bg-green-100 text-green-700' :
															qa.confidence >= 0.5 ? 'bg-yellow-100 text-yellow-700' :
															'bg-red-100 text-red-700'
														}">
															{Math.round(qa.confidence * 100)}% confidence
														</span>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Typical Evidence Check -->
								{#if auditResult.typicalEvidenceCheck && auditResult.typicalEvidenceCheck.length > 0}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-file-circle-check mr-2"></i>
											Typical Evidence Check
										</h5>
										<div class="overflow-x-auto">
											<table class="w-full text-sm">
												<thead>
													<tr class="border-b bg-gray-50">
														<th class="text-left p-2">Evidence Item</th>
														<th class="text-left p-2">Status</th>
														<th class="text-left p-2">Found In</th>
														<th class="text-left p-2">Details</th>
													</tr>
												</thead>
												<tbody>
													{#each auditResult.typicalEvidenceCheck as item}
														{@const _statusLower = (item.status || '').toLowerCase()}
														{@const _isPartial = _statusLower.includes('partial') || _statusLower.includes('جزئ')}
														{@const _isNotFound = !_isPartial && (_statusLower.includes('غير') || _statusLower.includes('not ') || _statusLower.includes('missing') || _statusLower.includes('absent') || _statusLower.includes('not_found') || _statusLower.includes('notfound'))}
														{@const _isFound = !_isPartial && !_isNotFound && (_statusLower.includes('present') || _statusLower.includes('found') || _statusLower.includes('موجود') || _statusLower.includes('available') || _statusLower.includes('متوفر'))}
														<tr class="border-b hover:bg-gray-50">
															<td class="p-2 font-medium">{item.evidenceItem}</td>
															<td class="p-2">
																<span class="px-2 py-0.5 rounded text-xs {
																	_isFound ? 'bg-green-100 text-green-800' :
																	_isPartial ? 'bg-yellow-100 text-yellow-800' :
																	'bg-red-100 text-red-800'
																}">
																	{item.status}
																</span>
															</td>
															<td class="p-2 text-gray-600">{item.foundIn || '-'}</td>
															<td class="p-2 text-gray-500 text-xs">{item.details || '-'}</td>
														</tr>
													{/each}
												</tbody>
											</table>
										</div>
									</div>
								{/if}

								<!-- File Analysis -->
								{#if auditResult.fileAnalysis && auditResult.fileAnalysis.length > 0}
									<div class="p-4 bg-white border rounded-lg">
										<h5 class="font-semibold text-gray-800 mb-3">
											<i class="fa-solid fa-file-alt mr-2"></i>
											File Analysis
										</h5>
										{#each auditResult.fileAnalysis as file}
											<div class="p-3 bg-gray-50 rounded-lg">
												<p class="font-medium text-gray-800 mb-2">
													<i class="fa-solid fa-file-pdf mr-2 text-red-500"></i>
													{file.fileName}
												</p>
												<p class="text-sm text-gray-600 mb-2">{file.contentSummary}</p>
												{#if file.relevantSections && file.relevantSections.length > 0}
													<div class="text-sm">
														<p class="font-medium text-gray-700 mb-1">Relevant Sections:</p>
														<ul class="list-disc list-inside text-gray-600 space-y-1">
															{#each file.relevantSections as section}
																<li>{section}</li>
															{/each}
														</ul>
													</div>
												{/if}
											</div>
										{/each}
									</div>
								{/if}

								<!-- Gaps -->
								{#if auditResult.gaps && auditResult.gaps.length > 0}
									<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
										<h5 class="font-semibold text-red-800 mb-3">
											<i class="fa-solid fa-triangle-exclamation mr-2"></i>
											Identified Gaps ({auditResult.gaps.length})
										</h5>
										<div class="space-y-3">
											{#each auditResult.gaps as gap}
												<div class="p-3 bg-white rounded-lg border border-red-100">
													<div class="flex items-start justify-between mb-2">
														<p class="font-medium text-gray-800">{gap.gap}</p>
														<span class="text-xs px-2 py-0.5 rounded {
															gap.severity === 'High' ? 'bg-red-200 text-red-800' :
															gap.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
															'bg-gray-200 text-gray-800'
														}">
															{gap.severity}
														</span>
													</div>
													<p class="text-sm text-gray-600 mb-2">{gap.impact}</p>
													<p class="text-sm text-blue-600 bg-blue-50 p-2 rounded">
														<i class="fa-solid fa-lightbulb mr-1"></i>
														{gap.recommendation}
													</p>
												</div>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Strengths -->
								{#if auditResult.strengths && auditResult.strengths.length > 0}
									<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
										<h5 class="font-semibold text-green-800 mb-3">
											<i class="fa-solid fa-circle-check mr-2"></i>
											Strengths ({auditResult.strengths.length})
										</h5>
										<ul class="space-y-2">
											{#each auditResult.strengths as strength}
												<li class="flex items-start gap-2">
													<i class="fa-solid fa-check text-green-600 mt-1"></i>
													<span class="text-gray-700">{strength}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}

								<!-- Recommendations -->
								{#if auditResult.recommendations && auditResult.recommendations.length > 0}
									<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
										<h5 class="font-semibold text-blue-800 mb-3">
											<i class="fa-solid fa-list-check mr-2"></i>
											Recommendations ({auditResult.recommendations.length})
										</h5>
										<ul class="space-y-2">
											{#each auditResult.recommendations as rec, i}
												<li class="flex items-start gap-3 p-2 bg-white rounded">
													<span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium flex items-center justify-center">
														{i + 1}
													</span>
													<span class="text-gray-700">{rec}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						{/if}

						<!-- Initial State (no analysis yet) -->
						{#if !auditResult && !auditLoading && !auditError}
							<div
								class="flex flex-col items-center justify-center py-16 space-y-4 text-gray-500"
							>
								<i class="fa-solid fa-brain text-6xl text-gray-300"></i>
								<p class="text-lg">No analysis results yet</p>
								<p class="text-sm">
									Click "Run Analysis" to analyze this evidence against audit criteria
								</p>
								{#if questions.length === 0 && typicalEvidence.length === 0}
									<p class="text-xs text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
										<i class="fa-solid fa-info-circle mr-1"></i>
										No questions or typical evidence linked. Link this evidence to a requirement assessment for better analysis.
									</p>
								{/if}
							</div>
						{/if}
					</div>
				</Tabs.Panel>
			{/snippet}
		</Tabs>
	</div>
{/if}
