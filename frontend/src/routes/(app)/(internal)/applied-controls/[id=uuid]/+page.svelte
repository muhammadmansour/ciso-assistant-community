<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import { Tabs, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	
	let activeTab = $state('details');
	let isAnalyzing = $state(false);
	let aiAnalysisResult: any = $state(null);

	async function runAnalysis() {
		isAnalyzing = true;
		activeTab = 'ai-report';
		try {
			const res = await fetch(`/api/applied-controls/${data.data.id}/run-ai-analysis/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				aiAnalysisResult = await res.json();
			} else {
				const err = await res.json().catch(() => ({}));
				aiAnalysisResult = { error: err.message || `Muraji API error (${res.status})` };
			}
		} catch (e: any) {
			aiAnalysisResult = { error: e.message || 'Failed to reach server' };
		} finally {
			isAnalyzing = false;
		}
	}
</script>

<DetailView {data}>
	{#snippet actions()}
		<!-- Start AI Analysis Button -->
		<button
			type="button"
			onclick={runAnalysis}
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
	{/snippet}
</DetailView>

<!-- Tabs Section -->
<div class="card mt-8 bg-white shadow-lg">
	<Tabs
		value={activeTab}
		onValueChange={(e) => (activeTab = e.value)}
		listJustify="justify-start"
		listClasses="flex flex-wrap border-b"
	>
		{#snippet list()}
			<!-- Evidences Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'evidences')}
				<Tabs.Control value="evidences">
					<i class="fa-solid fa-file-lines mr-2"></i>
					{m.evidences ? m.evidences() : 'Evidences'}
					{#if data.foreignKeys?.evidences}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys.evidences.length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}
			
			<!-- Tasks Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'task-nodes')}
				<Tabs.Control value="tasks">
					<i class="fa-solid fa-tasks mr-2"></i>
					{m.tasks ? m.tasks() : 'Tasks'}
					{#if data.foreignKeys?.['task-nodes']}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys['task-nodes'].length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}
			
			<!-- Requirement Assessments Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'requirement-assessments')}
				<Tabs.Control value="requirements">
					<i class="fa-solid fa-list-check mr-2"></i>
					{m.requirementAssessments ? m.requirementAssessments() : 'Requirements'}
					{#if data.foreignKeys?.['requirement-assessments']}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys['requirement-assessments'].length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}
			
			<!-- Risk Scenarios Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'risk-scenarios')}
				<Tabs.Control value="risks">
					<i class="fa-solid fa-triangle-exclamation mr-2"></i>
					{m.riskScenarios ? m.riskScenarios() : 'Risk Scenarios'}
					{#if data.foreignKeys?.['risk-scenarios']}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys['risk-scenarios'].length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}
			
			<!-- Findings Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'findings')}
				<Tabs.Control value="findings">
					<i class="fa-solid fa-magnifying-glass mr-2"></i>
					{m.findings ? m.findings() : 'Findings'}
					{#if data.foreignKeys?.findings}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys.findings.length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}
			
			<!-- Assets Tab -->
			{#if data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'assets')}
				<Tabs.Control value="assets">
					<i class="fa-solid fa-cube mr-2"></i>
					{m.assets ? m.assets() : 'Assets'}
					{#if data.foreignKeys?.assets}
						<span class="badge preset-tonal-primary ml-2">
							{data.foreignKeys.assets.length}
						</span>
					{/if}
				</Tabs.Control>
			{/if}

			<!-- AI Report Tab -->
			<Tabs.Control value="ai-report">
				<i class="fa-solid fa-brain mr-2"></i>
				AI Report
			</Tabs.Control>
		{/snippet}

		{#snippet content()}
			<!-- Evidences Tab Content -->
			{#if activeTab === 'evidences'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'evidences')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.evidences}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'evidences',
									results: data.foreignKeys.evidences,
									count: data.foreignKeys.evidences.length
								}
							}}
							URLModel="evidences"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No evidences associated</p>
					{/if}
				</div>
			{/if}

			<!-- Tasks Tab Content -->
			{#if activeTab === 'tasks'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'task-nodes')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.['task-nodes']}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'task-nodes',
									results: data.foreignKeys['task-nodes'],
									count: data.foreignKeys['task-nodes'].length
								}
							}}
							URLModel="task-nodes"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No tasks associated</p>
					{/if}
				</div>
			{/if}

			<!-- Requirement Assessments Tab Content -->
			{#if activeTab === 'requirements'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'requirement-assessments')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.['requirement-assessments']}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'requirement-assessments',
									results: data.foreignKeys['requirement-assessments'],
									count: data.foreignKeys['requirement-assessments'].length
								}
							}}
							URLModel="requirement-assessments"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No requirement assessments associated</p>
					{/if}
				</div>
			{/if}

			<!-- Risk Scenarios Tab Content -->
			{#if activeTab === 'risks'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'risk-scenarios')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.['risk-scenarios']}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'risk-scenarios',
									results: data.foreignKeys['risk-scenarios'],
									count: data.foreignKeys['risk-scenarios'].length
								}
							}}
							URLModel="risk-scenarios"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No risk scenarios associated</p>
					{/if}
				</div>
			{/if}

			<!-- Findings Tab Content -->
			{#if activeTab === 'findings'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'findings')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.findings}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'findings',
									results: data.foreignKeys.findings,
									count: data.foreignKeys.findings.length
								}
							}}
							URLModel="findings"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No findings associated</p>
					{/if}
				</div>
			{/if}

			<!-- Assets Tab Content -->
			{#if activeTab === 'assets'}
				{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'assets')}
				<div class="p-4">
					{#if reverseForeignKey && data.foreignKeys?.assets}
						<ModelTable
							source={{
								head: {},
								body: [],
								meta: {
									urlmodel: 'assets',
									results: data.foreignKeys.assets,
									count: data.foreignKeys.assets.length
								}
							}}
							URLModel="assets"
						/>
					{:else}
						<p class="text-gray-500 text-center py-8">No assets associated</p>
					{/if}
				</div>
			{/if}

			<!-- AI Report Tab Content -->
			{#if activeTab === 'ai-report'}
				<div class="p-6">
					{#if isAnalyzing}
						<!-- Loading state while polling -->
						<div class="text-center py-16">
							<div class="inline-block mb-6">
								<i class="fa-solid fa-spinner fa-spin text-5xl text-purple-500"></i>
							</div>
							<h3 class="text-xl font-semibold text-gray-800 mb-2">Analyzing with Muraji API...</h3>
							<p class="text-gray-500">This may take a moment. The AI is reviewing your evidences and requirements.</p>
						</div>
					{:else if aiAnalysisResult?.error}
						<!-- Error state -->
						<div class="text-center py-12">
							<div class="inline-block p-6 rounded-full bg-red-100 mb-4">
								<i class="fa-solid fa-circle-exclamation text-4xl text-red-600"></i>
							</div>
							<h3 class="text-xl font-semibold text-gray-800 mb-2">Analysis Failed</h3>
							<p class="text-red-600 mb-4">{aiAnalysisResult.error}</p>
							<p class="text-gray-500 text-sm">Click "Start AI Analysis" to try again.</p>
						</div>
					{:else if aiAnalysisResult?.ai_analysis}
						<!-- Analysis Results -->
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-semibold text-gray-800">
								<i class="fa-solid fa-brain text-purple-600 mr-2"></i>
								AI Analysis Report
							</h3>
							{#if aiAnalysisResult.ai_analysis_updated_at}
								<span class="text-sm text-gray-500">
									Last updated: {new Date(aiAnalysisResult.ai_analysis_updated_at).toLocaleString()}
								</span>
							{/if}
						</div>

						<!-- Render analysis sections dynamically -->
						{#if typeof aiAnalysisResult.ai_analysis === 'object'}
							{#each Object.entries(aiAnalysisResult.ai_analysis) as [sectionKey, sectionValue]}
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
							<!-- Raw text result -->
							<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
								<pre class="whitespace-pre-wrap text-gray-700 text-sm">{JSON.stringify(aiAnalysisResult.ai_analysis, null, 2)}</pre>
							</div>
						{/if}
					{:else}
						<!-- No analysis yet - show placeholder -->
						<div class="text-center py-12">
							<div class="inline-block p-6 rounded-full bg-purple-100 mb-4">
								<i class="fa-solid fa-brain text-4xl text-purple-600"></i>
							</div>
							<h3 class="text-xl font-semibold text-gray-800 mb-2">AI Analysis via Muraji API</h3>
							<p class="text-gray-600 mb-6">
								Click the "Start AI Analysis" button above to analyze all associated evidence files.
							</p>
							{#if aiAnalysisResult?.evidence_count === 0}
								<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
									<p class="text-sm text-yellow-800">
										<i class="fa-solid fa-triangle-exclamation mr-2"></i>
										No evidences are associated with this control. Please add evidences first.
									</p>
								</div>
							{:else}
								<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
									<p class="text-sm text-blue-800">
										<i class="fa-solid fa-info-circle mr-2"></i>
										{aiAnalysisResult?.evidence_count || 0} evidence(s) will be analyzed along with requirement questions and typical evidence.
									</p>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		{/snippet}
	</Tabs>
</div>
