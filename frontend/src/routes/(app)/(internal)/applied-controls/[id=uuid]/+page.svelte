<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
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

	function getScoreColor(score: number | null): string {
		if (score === null || score === undefined) return 'text-gray-500';
		if (score >= 80) return 'text-green-600';
		if (score >= 50) return 'text-yellow-600';
		return 'text-red-600';
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleString();
	}
</script>

<DetailView {data}>
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
				class="btn bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
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
					<i class="fa-solid fa-spinner fa-spin text-5xl text-purple-500"></i>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 mb-2">Analyzing with Muraji API...</h3>
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
				<i class="fa-solid fa-brain text-purple-600 mr-2"></i>
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
							<th class="text-left px-4 py-3 font-semibold text-gray-600">Compliance</th>
							<th class="text-center px-4 py-3 font-semibold text-gray-600">Score</th>
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
								<td class="px-4 py-3">
									{#if analysis.compliance_status}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(analysis.compliance_status)}">
											{analysis.compliance_status}
										</span>
									{:else}
										<span class="text-gray-400">—</span>
									{/if}
								</td>
								<td class="px-4 py-3 text-center">
									{#if analysis.score !== null && analysis.score !== undefined}
										<span class="font-bold text-lg {getScoreColor(analysis.score)}">
											{analysis.score}
										</span>
										<span class="text-gray-400 text-xs">/100</span>
									{:else}
										<span class="text-gray-400">—</span>
									{/if}
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
				<div class="inline-block p-6 rounded-full bg-purple-100 mb-4">
					<i class="fa-solid fa-brain text-4xl text-purple-600"></i>
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

<!-- Analysis Detail Modal -->
{#if showAnalysisModal}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={closeModal}
		></div>
		
		<!-- Modal Content -->
		<div class="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
			<!-- Modal Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-purple-100 rounded-lg">
						<i class="fa-solid fa-brain text-purple-600 text-lg"></i>
					</div>
					<div>
						<h2 class="text-lg font-bold text-gray-800">AI Analysis Report</h2>
						{#if selectedAnalysis?.created_at}
							<p class="text-sm text-gray-500">{formatDate(selectedAnalysis.created_at)}</p>
						{/if}
					</div>
				</div>
				<button
					class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					onclick={closeModal}
				>
					<i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
				</button>
			</div>
			
			<!-- Modal Body -->
			<div class="overflow-y-auto flex-1 p-6">
				{#if selectedAnalysis?.result}
					<!-- Summary Bar -->
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Score</p>
							<p class="text-2xl font-bold {getScoreColor(selectedAnalysis.score)}">
								{selectedAnalysis.score ?? '—'}
							</p>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Compliance</p>
							<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium {getStatusColor(selectedAnalysis.compliance_status)}">
								{selectedAnalysis.compliance_status || '—'}
							</span>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Files</p>
							<p class="text-2xl font-bold text-gray-800">{selectedAnalysis.gemini_files_count}</p>
						</div>
						<div class="bg-gray-50 rounded-lg p-4 text-center">
							<p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Requirements</p>
							<p class="text-2xl font-bold text-gray-800">{selectedAnalysis.requirements_count}</p>
						</div>
					</div>

					{#if selectedAnalysis.error_message}
						<div class="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
							<p class="text-sm text-red-700">
								<i class="fa-solid fa-triangle-exclamation mr-1"></i>
								{selectedAnalysis.error_message}
							</p>
						</div>
					{/if}

					<!-- Render analysis sections -->
					{#if typeof selectedAnalysis.result === 'object'}
						{#each Object.entries(selectedAnalysis.result) as [sectionKey, sectionValue]}
							<div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
								<div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
									<h4 class="font-semibold text-gray-700 capitalize">
										{sectionKey.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
									</h4>
								</div>
								<div class="p-4">
									{#if typeof sectionValue === 'string'}
										<p class="text-gray-700 whitespace-pre-wrap">{sectionValue}</p>
									{:else if Array.isArray(sectionValue)}
										{#if sectionValue.length === 0}
											<p class="text-gray-400 italic">No items</p>
										{:else}
											<ul class="space-y-2">
												{#each sectionValue as item}
													{#if typeof item === 'string'}
														<li class="flex items-start gap-2">
															<i class="fa-solid fa-circle-check text-green-500 mt-1 text-sm"></i>
															<span class="text-gray-700">{item}</span>
														</li>
													{:else if typeof item === 'object' && item !== null}
														<li class="bg-gray-50 rounded-lg p-3 border border-gray-100">
															{#each Object.entries(item) as [k, v]}
																<div class="mb-1">
																	<span class="font-medium text-gray-600 capitalize">{k.replace(/_/g, ' ')}:</span>
																	<span class="text-gray-700 ml-1">{typeof v === 'object' ? JSON.stringify(v) : v}</span>
																</div>
															{/each}
														</li>
													{:else}
														<li class="text-gray-700">{JSON.stringify(item)}</li>
													{/if}
												{/each}
											</ul>
										{/if}
									{:else if typeof sectionValue === 'object' && sectionValue !== null}
										<div class="space-y-2">
											{#each Object.entries(sectionValue) as [k, v]}
												<div class="flex items-start gap-2">
													<span class="font-medium text-gray-600 capitalize min-w-[140px]">{k.replace(/_/g, ' ')}:</span>
													{#if typeof v === 'string'}
														<span class="text-gray-700">{v}</span>
													{:else}
														<pre class="text-sm text-gray-700 bg-gray-50 rounded p-2 flex-1 overflow-x-auto">{JSON.stringify(v, null, 2)}</pre>
													{/if}
												</div>
											{/each}
										</div>
									{:else}
										<p class="text-gray-700">{JSON.stringify(sectionValue)}</p>
									{/if}
								</div>
							</div>
						{/each}
					{:else}
						<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
							<pre class="whitespace-pre-wrap text-gray-700 text-sm">{JSON.stringify(selectedAnalysis.result, null, 2)}</pre>
						</div>
					{/if}
				{:else}
					<div class="text-center py-12">
						<p class="text-gray-500">No analysis data available.</p>
					</div>
				{/if}
			</div>
			
			<!-- Modal Footer -->
			<div class="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
				<button
					class="btn preset-filled-surface-200-800"
					onclick={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
