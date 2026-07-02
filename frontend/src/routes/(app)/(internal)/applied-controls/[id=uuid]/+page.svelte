<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import AiAuditAnalysisModal from '$lib/components/Modals/AiAuditAnalysisModal.svelte';
	import AiAnalysisProgressModal from '$lib/components/AiAnalysis/AiAnalysisProgressModal.svelte';
	import AiAnalysisReanalysisModal from '$lib/components/AiAnalysis/AiAnalysisReanalysisModal.svelte';
	import {
		CONTROL_ANALYSIS_STEPS,
		createProgressTimerCallbacks
	} from '$lib/components/AiAnalysis/aiAnalysisProgress';
	import ConvertGapToTaskModal, {
		type GapTaskPrefill
	} from '$lib/components/Modals/ConvertGapToTaskModal.svelte';
	import { deserialize } from '$app/forms';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let isAnalyzing = $state(false);
	let aiAnalysisResult: any = $state(null);
	let aiAnalysisError: string | null = $state(null);
	let deletingAnalysisId: string | null = $state(null);

	// Modal state
	let showAnalysisModal = $state(false);
	let selectedAnalysis: any = $state(null);
	let showGapTaskModal = $state(false);
	let gapTaskPrefill: GapTaskPrefill | null = $state(null);
	let showProgressModal = $state(false);
	let analysisStep = $state(0);
	let analysisPercent = $state(0);
	let analysisComplete = $state(false);
	let pendingAnalysisResult: any = $state(null);
	let showReanalysisModal = $state(false);
	let reanalysisPrompt = $state('');

	const { startProgressTimer, stopProgressTimer, closeProgressModal } = createProgressTimerCallbacks(
		() => ({ showProgressModal, analysisStep, analysisPercent, analysisComplete }),
		(patch) => {
			if (patch.showProgressModal !== undefined) showProgressModal = patch.showProgressModal;
			if (patch.analysisStep !== undefined) analysisStep = patch.analysisStep;
			if (patch.analysisPercent !== undefined) analysisPercent = patch.analysisPercent;
			if (patch.analysisComplete !== undefined) analysisComplete = patch.analysisComplete;
		}
	);

	function buildGapTaskPrefill(
		idx: number,
		gGap: string | null,
		gRec: string | null
	): GapTaskPrefill {
		const ac = data.data as Record<string, any>;
		const complianceAssessmentIds = new Set<string>();
		const assessmentLabels: string[] = [];
		const assetIds = new Set<string>();
		const assetLabels: string[] = [];

		for (const ra of ac.requirement_assessments ?? []) {
			const ca = ra.compliance_assessment;
			if (ca?.id) {
				complianceAssessmentIds.add(ca.id);
				assessmentLabels.push(ca.str || ca.name || ca.id);
			}
			for (const asset of ca?.assets ?? []) {
				if (asset?.id) {
					assetIds.add(asset.id);
					assetLabels.push(asset.str || asset.name || asset.id);
				}
			}
		}

		const gapText = gGap?.trim() || '';
		const folderId = typeof ac.folder === 'object' ? ac.folder?.id : ac.folder;

		return {
			name: gapText || `Gap ${idx + 1}`,
			description: gapText,
			observation: gRec?.trim() || '',
			folder: folderId,
			source: 'control',
			source_object_id: ac.id,
			applied_controls: [ac.id],
			assets: [...assetIds],
			compliance_assessments: [...complianceAssessmentIds],
			evidences: (ac.evidences ?? []).map((ev: { id: string }) => ev.id),
			appliedControlLabels: [ac.str || ac.name || ac.id],
			assetLabels,
			evidenceLabels: (ac.evidences ?? []).map(
				(ev: { str?: string; name?: string; id: string }) => ev.str || ev.name || ev.id
			),
			assessmentLabel: assessmentLabels[0] || ''
		};
	}

	function openConvertGapToTaskModal(idx: number, gGap: string | null, gRec: string | null) {
		gapTaskPrefill = buildGapTaskPrefill(idx, gGap, gRec);
		showGapTaskModal = true;
	}

	function closeConvertGapToTaskModal() {
		showGapTaskModal = false;
		gapTaskPrefill = null;
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

	function handleViewResults() {
		closeProgressModal();
		if (pendingAnalysisResult) {
			selectedAnalysis = pendingAnalysisResult;
			showAnalysisModal = true;
			pendingAnalysisResult = null;
		}
	}

	async function runAiAnalysis(additionalPrompt?: string) {
		isAnalyzing = true;
		aiAnalysisResult = null;
		aiAnalysisError = null;
		startProgressTimer();

		try {
			const formData = new FormData();
			if (additionalPrompt?.trim()) {
				formData.append('additionalPrompt', additionalPrompt.trim());
			}
			const response = await fetch('?/runAiAnalysis', {
				method: 'POST',
				body: formData
			});
			const text = await response.text();

			let result: any;
			try {
				result = deserialize(text);
			} catch {
				isAnalyzing = false;
				stopProgressTimer(false);
				aiAnalysisError = 'Server returned an unexpected response. The backend may be unreachable.';
				return;
			}

			isAnalyzing = false;

			if (result.type === 'success' && result.data?.aiAnalysis) {
				const aiData = result.data.aiAnalysis;
				const analysisPayload = aiData.ai_analysis ?? aiData;
				pendingAnalysisResult = {
					id: aiData.ai_analysis_id,
					created_at: aiData.ai_analysis_updated_at || new Date().toISOString(),
					status: 'completed',
					score: analysisPayload?.overallAssessment?.score ?? null,
					compliance_status: analysisPayload?.overallAssessment?.status ?? '',
					result: analysisPayload,
					gemini_files_count: aiData.gemini_files_count,
					requirements_count: aiData.requirements_count
				};
				aiAnalysisResult = analysisPayload;
				stopProgressTimer(true);
				await invalidateAll();
			} else if (result.type === 'failure' && result.data?.aiError) {
				aiAnalysisError = result.data.aiError;
				stopProgressTimer(false);
			} else {
				aiAnalysisError = 'Unexpected response from server';
				stopProgressTimer(false);
			}
		} catch (err) {
			isAnalyzing = false;
			stopProgressTimer(false);
			aiAnalysisError = `Failed to run analysis: ${String(err)}`;
		}
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
		await runAiAnalysis(prompt);
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
			{#if isAnalyzing}
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

<AiAnalysisProgressModal
	open={showProgressModal}
	title="Control AI Analysis"
	subtitle={data.data.str || data.data.name}
	steps={CONTROL_ANALYSIS_STEPS}
	{analysisStep}
	{analysisPercent}
	{analysisComplete}
	onClose={closeProgressModal}
	onViewResults={handleViewResults}
/>

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
	enableGapToTask={true}
	enableReanalyze={true}
	reanalyzeDisabled={isAnalyzing}
	onClose={closeModal}
	onConvertGap={openConvertGapToTaskModal}
	onReanalyze={openReanalysisModal}
/>

{#if showGapTaskModal && gapTaskPrefill}
	<ConvertGapToTaskModal prefill={gapTaskPrefill} onClose={closeConvertGapToTaskModal} />
{/if}
