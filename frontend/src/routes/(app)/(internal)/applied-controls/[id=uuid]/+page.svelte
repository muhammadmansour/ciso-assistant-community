<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import AiAuditAnalysisModal from '$lib/components/Modals/AiAuditAnalysisModal.svelte';
	import AiAnalysisReanalysisModal from '$lib/components/AiAnalysis/AiAnalysisReanalysisModal.svelte';
	import {
		activeAiAnalysisJob,
		acknowledgeReportOpened,
		startAiAnalysisJob
	} from '$lib/components/AiAnalysis/aiAnalysisJobs';
	import ConvertGapToFindingModal, {
		type GapFindingPrefill
	} from '$lib/components/Modals/ConvertGapToFindingModal.svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let isAnalyzing = $state(false);
	let isRetrying = $state(false);
	let retryAttempt = $state(1);
	let retryMaxAttempts = $state(3);
	let aiAnalysisResult: any = $state(null);
	let aiAnalysisError: string | null = $state(null);
	let deletingAnalysisId: string | null = $state(null);

	// Modal state
	let showAnalysisModal = $state(false);
	let selectedAnalysis: any = $state(null);
	let showGapFindingModal = $state(false);
	let gapFindingPrefill: GapFindingPrefill | null = $state(null);
	let showReanalysisModal = $state(false);
	let reanalysisPrompt = $state('');

	const entityId = $derived(data.data.id);

	$effect(() => {
		const job = $activeAiAnalysisJob;
		if (!job || job.entityId !== entityId) {
			isAnalyzing = false;
			isRetrying = false;
			return;
		}

		isAnalyzing = job.status === 'running';
		isRetrying = job.status === 'running' && job.retrying;
		retryAttempt = job.attempt;
		retryMaxAttempts = job.maxAttempts;

		if (job.status === 'error' && job.error) {
			aiAnalysisError = job.error;
		}

		if (job.status === 'complete' && job.pendingResult) {
			aiAnalysisResult = job.pendingResult.result;
		}

		if (job.openReportOnPage && job.pendingResult) {
			selectedAnalysis = job.pendingResult;
			showAnalysisModal = true;
			acknowledgeReportOpened();
		}
	});

	function buildGapFindingPrefill(
		idx: number,
		gGap: string | null,
		gRec: string | null
	): GapFindingPrefill {
		const ac = data.data as Record<string, any>;
		const gapText = gGap?.trim() || '';
		let perimeterId = '';

		for (const ra of ac.requirement_assessments ?? []) {
			const perimeter = ra.compliance_assessment?.perimeter;
			if (perimeter) {
				perimeterId = typeof perimeter === 'object' ? (perimeter.id ?? '') : perimeter;
				break;
			}
		}

		const evidences = (ac.evidences ?? []).map((ev: { id: string }) => ev.id);
		const evidenceLabels = (ac.evidences ?? []).map(
			(ev: { str?: string; name?: string; id: string }) => ev.str || ev.name || ev.id
		);

		return {
			name: gapText || `Gap ${idx + 1}`,
			description: gapText,
			observation: gRec?.trim() || '',
			perimeter: perimeterId,
			status: 'planned',
			authors: data.userActorId ? [data.userActorId] : [],
			evidences,
			evidenceLabels,
			source: 'control',
			source_object_id: ac.id
		};
	}

	function openConvertGapToFindingModal(idx: number, gGap: string | null, gRec: string | null) {
		gapFindingPrefill = buildGapFindingPrefill(idx, gGap, gRec);
		showGapFindingModal = true;
	}

	function closeConvertGapToFindingModal() {
		showGapFindingModal = false;
		gapFindingPrefill = null;
	}

	function openAnalysisDetail(analysis: any) {
		selectedAnalysis = analysis;
		showAnalysisModal = true;
	}

	function closeModal() {
		showAnalysisModal = false;
		selectedAnalysis = null;
	}

	function getStatusColor(status: string): string {
		switch (status?.toLowerCase()) {
			case 'compliant': return 'text-green-700 bg-green-100';
			case 'partially compliant': return 'text-yellow-700 bg-yellow-100';
			case 'non-compliant': return 'text-red-700 bg-red-100';
			case 'insufficient evidence': return 'text-orange-700 bg-orange-100';
			case 'failed': return 'text-red-700 bg-red-100';
			case 'completed': return 'text-green-700 bg-green-100';
			default: return 'text-gray-700 bg-gray-100';
		}
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleString();
	}

	function runAiAnalysis(additionalPrompt?: string) {
		aiAnalysisError = null;
		startAiAnalysisJob({
			entityType: 'control',
			entityId: data.data.id,
			entityLabel: data.data.str || data.data.name,
			additionalPrompt
		});
	}

	function openReanalysisModal() {
		reanalysisPrompt = '';
		showReanalysisModal = true;
	}

	async function handleReanalysisRun() {
		showReanalysisModal = false;
		showAnalysisModal = false;
		selectedAnalysis = null;
		const prompt = reanalysisPrompt;
		reanalysisPrompt = '';
		runAiAnalysis(prompt);
	}
</script>

<DetailView {data} exclude={['reference_control', 'category', 'csf_function', 'priority', 'effort', 'control_impact', 'annual_cost_display', 'created_at', 'updated_at', 'ref_id', 'annotation', 'eta', 'expiry_date', 'link', 'progress_field', 'observation', 'security_exceptions', 'filtering_labels', 'sync_mappings']}>
	{#snippet actions()}
		<button
			type="button"
			class="btn bg-gradient-to-r from-[#005FA3] to-[#004d85] text-white hover:from-[#004d85] hover:to-[#003d6b] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
			disabled={isAnalyzing}
			title="Start AI Analysis on Associated Evidences"
			onclick={() => runAiAnalysis()}
		>
			{#if isRetrying}
				<i class="fa-solid fa-rotate-right fa-spin mr-2"></i>
				<span>Retrying ({retryAttempt}/{retryMaxAttempts})…</span>
			{:else if isAnalyzing}
				<i class="fa-solid fa-spinner fa-spin mr-2"></i>
				<span>Analyzing...</span>
			{:else}
				<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
				<span>Start AI Analysis</span>
			{/if}
		</button>
	{/snippet}
</DetailView>

<!-- AI Report Section -->
<div class="card mt-8 bg-white shadow-lg">
	<div class="p-6">
		{#if aiAnalysisError}
			<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
				<div class="flex items-center gap-2 mb-2">
					<i class="fa-solid fa-circle-exclamation text-red-600"></i>
					<h3 class="font-semibold text-red-800">Latest Analysis Failed</h3>
				</div>
				<p class="text-red-600 text-sm">{aiAnalysisError}</p>
			</div>
		{/if}

		<!-- Past Analyses Table -->
		<div class="mb-4 flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-800">
				<i class="fa-solid fa-brain text-[#005FA3] mr-2"></i>
				AI Analysis History
			</h3>
			<span class="text-sm text-gray-500">
				{data.aiAnalyses?.length || 0} analysis(es)
			</span>
		</div>

		{#if data.aiAnalyses?.length > 0}
			<div class="overflow-x-auto border border-gray-200 rounded-lg">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
							<th class="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
							<th class="text-center px-4 py-3 font-semibold text-gray-600">Files</th>
							<th class="text-center px-4 py-3 font-semibold text-gray-600">Requirements</th>
							<th class="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.aiAnalyses as analysis}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-4 py-3 text-gray-700">
									{formatDate(analysis.created_at)}
								</td>
								<td class="px-4 py-3">
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(analysis.status)}">
										{#if analysis.status === 'completed'}
											<i class="fa-solid fa-circle-check mr-1"></i>
										{:else}
											<i class="fa-solid fa-circle-xmark mr-1"></i>
										{/if}
										{analysis.status}
									</span>
								</td>
								<td class="px-4 py-3 text-center text-gray-600">
									{analysis.gemini_files_count}
								</td>
								<td class="px-4 py-3 text-center text-gray-600">
									{analysis.requirements_count}
								</td>
								<td class="px-4 py-3 text-center">
									<div class="flex items-center justify-center gap-1">
										<button
											class="btn btn-sm preset-tonal-primary"
											onclick={() => openAnalysisDetail(analysis)}
											title="View full analysis"
										>
											<i class="fa-solid fa-eye mr-1"></i>
											View
										</button>
										<form
											method="POST"
											action="?/deleteAiAnalysis"
											use:enhance={() => {
												if (!confirm('Are you sure you want to delete this analysis?')) {
													return ({ cancel }) => cancel();
												}
												deletingAnalysisId = analysis.id;
												return async ({ result }) => {
													deletingAnalysisId = null;
													if (result.type === 'success') {
														await invalidateAll();
													}
												};
											}}
										>
											<input type="hidden" name="analysisId" value={analysis.id} />
											<button
												type="submit"
												class="btn btn-sm preset-tonal-error"
												title="Delete analysis"
												disabled={deletingAnalysisId === analysis.id}
											>
												{#if deletingAnalysisId === analysis.id}
													<i class="fa-solid fa-spinner fa-spin"></i>
												{:else}
													<i class="fa-solid fa-trash"></i>
												{/if}
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<!-- No analyses yet -->
			<div class="text-center py-12">
				<div class="inline-block p-6 rounded-full bg-[#005FA3]/10 mb-4">
					<i class="fa-solid fa-brain text-4xl text-[#005FA3]"></i>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-2">No AI Analyses Yet</h3>
				<p class="text-gray-600 mb-6">
					Click the "Start AI Analysis" button above to analyze all associated evidence files.
				</p>
				<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
					<p class="text-sm text-blue-800">
						<i class="fa-solid fa-info-circle mr-2"></i>
						Each analysis will be saved here for future reference.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<AiAnalysisReanalysisModal
	open={showReanalysisModal}
	bind:prompt={reanalysisPrompt}
	title="Re-Analyze Control"
	subtitle="Provide additional instructions for the control assessment"
	onClose={() => (showReanalysisModal = false)}
	onRun={handleReanalysisRun}
/>

<AiAuditAnalysisModal
	selectedAnalysis={showAnalysisModal ? selectedAnalysis : null}
	subtitle={data.data.str || data.data.name}
	enableGapToFinding={true}
	enableReanalyze={true}
	reanalyzeDisabled={isAnalyzing}
	onClose={closeModal}
	onConvertGap={openConvertGapToFindingModal}
	onReanalyze={openReanalysisModal}
/>

{#if showGapFindingModal && gapFindingPrefill}
	<ConvertGapToFindingModal prefill={gapFindingPrefill} onClose={closeConvertGapToFindingModal} />
{/if}
