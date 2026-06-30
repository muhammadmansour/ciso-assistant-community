<script lang="ts">
	import DetailView from '$lib/components/DetailView/DetailView.svelte';
	import ModelTable from '$lib/components/ModelTable/ModelTable.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import { getListViewFields } from '$lib/utils/table';
	import type { TableSource } from '$lib/components/ModelTable/types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const showOccurrencesTab = $derived(data.showOccurrencesTab);

	let group = $state(data.showOccurrencesTab ? 'task-nodes' : 'risk');

	function buildTableSource(urlModel: string): TableSource {
		const fields = getListViewFields({
			key: urlModel,
			featureFlags: page.data?.featureflags ?? {}
		});
		const headData: Record<string, string> = fields.body.reduce((obj, key, index) => {
			obj[key] = index < fields.head.length ? fields.head[index] : key;
			return obj;
		}, {});
		return { head: headData, body: [], meta: [] };
	}

	const riskScenariosTable = $derived(buildTableSource('risk-scenarios'));
	const findingsTable = $derived(buildTableSource('findings'));

	const riskScenarioFields = $derived(
		getListViewFields({
			key: 'risk-scenarios',
			featureFlags: page.data?.featureflags ?? {}
		}).body.filter((field) => field !== 'risk_assessment')
	);

	const findingFields = $derived(
		getListViewFields({
			key: 'findings',
			featureFlags: page.data?.featureflags ?? {}
		}).body.filter((field) => field !== 'findings_assessment')
	);

	const occurrencesModel = $derived(data.relatedModels?.['task-nodes']);
</script>

<DetailView
	{data}
	displayModelTable={false}
	exclude={[
		...(data.data.is_recurrent
			? ['observation', 'status']
			: ['last_occurrence_status', 'next_occurrence']),
		'source_object_id'
	]}
/>

<div class="wgrc-card mt-6">
		<Tabs
			value={group}
			onValueChange={(e) => (group = e.value)}
			listJustify="justify-center"
			listClasses="flex flex-wrap"
		>
			{#snippet list()}
				{#if showOccurrencesTab}
					<Tabs.Control value="task-nodes">
						{safeTranslate('taskNodes')}
						{#if occurrencesModel?.table.body.length > 0}
							<span class="badge preset-tonal-secondary">{occurrencesModel.table.body.length}</span>
						{/if}
					</Tabs.Control>
				{/if}
				<Tabs.Control value="risk">
					{m.risk()}
				</Tabs.Control>
				<Tabs.Control value="related-findings">
					{m.relatedFindings()}
				</Tabs.Control>
			{/snippet}
			{#snippet content()}
				{#if showOccurrencesTab && occurrencesModel}
					<Tabs.Panel value="task-nodes">
						<div class="flex flex-row justify-between px-4 py-2">
							<h4 class="font-semibold lowercase capitalize-first my-auto">
								{safeTranslate('associated-taskNodes')}
							</h4>
						</div>
						{@const field = data.model.reverseForeignKeyFields?.find(
							(item) => item.urlModel === 'task-nodes'
						)}
						{#if field && occurrencesModel.table}
							<ModelTable
								baseEndpoint="/task-nodes?task_template={page.params.id}"
								source={occurrencesModel.table}
								disableCreate={occurrencesModel.disableCreate}
								disableEdit={occurrencesModel.disableEdit}
								disableDelete={occurrencesModel.disableDelete}
								deleteForm={occurrencesModel.deleteForm}
								URLModel="task-nodes"
								fields={getListViewFields({
									key: 'task-nodes',
									featureFlags: page.data?.featureflags ?? {}
								}).body.filter((v) => v !== field.field)}
								defaultFilters={field.defaultFilters || {}}
							/>
						{/if}
					</Tabs.Panel>
				{/if}
				<Tabs.Panel value="risk">
						<div class="flex flex-col px-4 py-2">
							<div class="flex flex-row justify-between py-2">
								<h4 class="font-semibold lowercase capitalize-first my-auto">
									{m.riskScenarios()}
								</h4>
							</div>
							{#if data.riskScenariosEndpoint}
								<ModelTable
									URLModel="risk-scenarios"
									source={riskScenariosTable}
									baseEndpoint={data.riskScenariosEndpoint}
									fields={riskScenarioFields}
									search={true}
									rowsPerPage={true}
									disableCreate={true}
								/>
							{:else}
								<p class="text-gray-500 text-center py-6">{m.taskRiskEmptyHint()}</p>
							{/if}
						</div>
					</Tabs.Panel>
				<Tabs.Panel value="related-findings">
						<div class="flex flex-col px-4 py-2">
							<div class="flex flex-row justify-between py-2">
								<h4 class="font-semibold lowercase capitalize-first my-auto">
									{m.findings()}
								</h4>
							</div>
							{#if data.findingsEndpoint}
								<ModelTable
									URLModel="findings"
									source={findingsTable}
									baseEndpoint={data.findingsEndpoint}
									fields={findingFields}
									search={true}
									rowsPerPage={true}
									disableCreate={true}
								/>
							{:else}
								<p class="text-gray-500 text-center py-6">{m.taskFindingsEmptyHint()}</p>
							{/if}
						</div>
					</Tabs.Panel>
			{/snippet}
		</Tabs>
</div>
