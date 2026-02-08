<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import { Tabs, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import { m } from '$paraglide/messages';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	
	let activeTab = $state('details');
	let isAnalyzing = $state(false);
</script>

<DetailView {data}>
	{#snippet actions()}
		<!-- Start AI Analysis Button -->
		<form 
			method="POST" 
			action="?/runAiAnalysis"
			use:enhance={() => {
				isAnalyzing = true;
				return async ({ result, update }) => {
					isAnalyzing = false;
					await update();
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'evidences')}
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'task-nodes')}
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'requirement-assessments')}
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'risk-scenarios')}
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'findings')}
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
				<div class="p-4">
					{@const reverseForeignKey = data.model.reverseForeignKeyFields?.find(f => f.urlModel === 'assets')}
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
					<div class="text-center py-12">
						<div class="inline-block p-6 rounded-full bg-purple-100 mb-4">
							<i class="fa-solid fa-brain text-4xl text-purple-600"></i>
						</div>
						<h3 class="text-xl font-semibold text-gray-800 mb-2">AI Analysis via Muraji API</h3>
						<p class="text-gray-600 mb-6">
							Click the "Start AI Analysis" button above to analyze all associated evidence files using Gemini File Search.
						</p>
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
							<p class="text-sm text-blue-800">
								<i class="fa-solid fa-info-circle mr-2"></i>
								The analysis will use Gemini File Search IDs along with requirement questions and typical evidence to provide comprehensive compliance insights.
							</p>
						</div>
					</div>
				</div>
			{/if}
		{/snippet}
	</Tabs>
</div>
