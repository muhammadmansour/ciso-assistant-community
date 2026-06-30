<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import AiAuditAnalysisModal from '$lib/components/Modals/AiAuditAnalysisModal.svelte';
	import ConvertGapToTaskModal, {
		type GapTaskPrefill
	} from '$lib/components/Modals/ConvertGapToTaskModal.svelte';
	import { m } from '$paraglide/messages';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	
	let isAnalyzing = $state(false);
	let aiAnalysisResult: any = $state(null);
	let deletingAnalysisId: string | null = $state(null);

	// Modal state
	let showAnalysisModal = $state(false);
	let selectedAnalysis: any = $state(null);
	let showGapTaskModal = $state(false);
	let gapTaskPrefill: GapTaskPrefill | null = $state(null);

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
</script>

<DetailView {data} exclude={['reference_control', 'category', 'csf_function', 'priority', 'effort', 'control_impact', 'annual_cost_display', 'created_at', 'updated_at', 'ref_id', 'annotation', 'eta', 'expiry_date', 'link', 'progress_field', 'observation', 'security_exceptions', 'filtering_labels', 'sync_mappings']}>
	{#snippet actions()}
		<!-- Start AI Analysis Button -->
		<form
			method="POST"
			action="?/runAiAnalysis"
			use:enhance={() => {
				isAnalyzing = true;
				aiAnalysisResult = null;
				return async ({ result }) => {
					isAnalyzing = false;
					if (result.type === 'success' && result.data?.aiAnalysis) {
						aiAnalysisResult = result.data.aiAnalysis;
					} else if (result.type === 'failure' && result.data?.aiError) {
						aiAnalysisResult = { error: result.data.aiError };
					} else {
						aiAnalysisResult = { error: 'Unexpected response from server' };
					}
					// Refresh the page data (reloads aiAnalyses from server)
					await invalidateAll();
				};
			}}
		>
			<button
				type="submit"
				class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
				disabled={isAnalyzing}
				title="Start AI Analysis on Associated Evidences"
			>
				{#if isAnalyzing}
					<i class="fa-solid fa-spinner fa-spin mr-2"></i>
					<span>Analyzing...</span>
				{:else}
					<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
					<span>Start AI Analysis</span>
				{/if}
			</button>
		</form>
	{/snippet}
</DetailView>

<!-- AI Report Section -->
<div class="card mt-8 bg-white shadow-lg">
	<div class="p-6">
		{#if isAnalyzing}
			<!-- Loading state while analyzing -->
			<div class="text-center py-16">
				<div class="inline-block mb-6">
					<i class="fa-solid fa-spinner fa-spin text-5xl text-[#0A1628]"></i>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-2">Analyzing with Wathbah API...</h3>
				<p class="text-gray-500">This may take a moment. The AI is reviewing your evidences and requirements.</p>
			</div>
		{:else if aiAnalysisResult?.error}
			<!-- Error from current analysis -->
			<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
				<div class="flex items-center gap-2 mb-2">
					<i class="fa-solid fa-circle-exclamation text-red-600"></i>
					<h3 class="font-semibold text-red-800">Latest Analysis Failed</h3>
				</div>
				<p class="text-red-600 text-sm">{aiAnalysisResult.error}</p>
			</div>
		{/if}

		<!-- Past Analyses Table -->
		<div class="mb-4 flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-800">
				<i class="fa-solid fa-brain text-[#0A1628] mr-2"></i>
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
				<div class="inline-block p-6 rounded-full bg-[#0A1628]/10 mb-4">
					<i class="fa-solid fa-brain text-4xl text-[#0A1628]"></i>
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

<AiAuditAnalysisModal
	selectedAnalysis={showAnalysisModal ? selectedAnalysis : null}
	subtitle={data.data.str || data.data.name}
	enableGapToTask={true}
	onClose={closeModal}
	onConvertGap={openConvertGapToTaskModal}
/>

{#if showGapTaskModal && gapTaskPrefill}
	<ConvertGapToTaskModal prefill={gapTaskPrefill} onClose={closeConvertGapToTaskModal} />
{/if}
