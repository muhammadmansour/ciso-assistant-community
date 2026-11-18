<script lang="ts">
	import AutocompleteSelect from '../AutocompleteSelect.svelte';
	import Select from '../Select.svelte';
	import Checkbox from '../Checkbox.svelte';
	import TextField from '../TextField.svelte';
	import NumberField from '../NumberField.svelte';
	import MarkdownField from '../MarkdownField.svelte';
	import Score from '../Score.svelte';
	import type { CacheLock, ModelInfo } from '$lib/utils/types';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { m } from '$paraglide/messages';

	export type ProjectFormSection =
		| 'all'
		| 'overview'
		| 'charter'
		| 'tracking'
		| 'linked'
		| 'people'
		| 'analytics';

	interface Props {
		form: SuperValidated<any>;
		model: ModelInfo;
		cacheLocks?: Record<string, CacheLock>;
		formDataCache?: Record<string, any>;
		initialData?: Record<string, any>;
		object?: any;
		section?: ProjectFormSection;
	}

	let {
		form,
		model,
		cacheLocks = {},
		formDataCache = $bindable({}),
		initialData = {},
		object = {},
		section = 'all'
	}: Props = $props();

	const is = (name: ProjectFormSection) => section === 'all' || section === name;
</script>

{#if is('overview')}
	<TextField
		{form}
		field="ref_id"
		label={m.refId()}
		cacheLock={cacheLocks['ref_id']}
		bind:cachedValue={formDataCache['ref_id']}
	/>

	<TextField
		{form}
		field="ref_link"
		label={m.link()}
		cacheLock={cacheLocks['ref_link']}
		bind:cachedValue={formDataCache['ref_link']}
	/>

	<AutocompleteSelect
		{form}
		optionsEndpoint="folders?content_type=DO&content_type=GL"
		pathField="path"
		field="folder"
		cacheLock={cacheLocks['folder']}
		bind:cachedValue={formDataCache['folder']}
		label={m.domain()}
		hidden={initialData.folder}
	/>

	<Select
		{form}
		options={model.selectOptions?.kind ?? []}
		field="kind"
		label={m.kind()}
		cacheLock={cacheLocks['kind']}
		bind:cachedValue={formDataCache['kind']}
		disableDoubleDash={true}
	/>

	<AutocompleteSelect
		{form}
		optionsEndpoint="terminologies?field_path=project.status&is_visible=true"
		optionsLabelField="translated_name"
		field="status"
		cacheLock={cacheLocks['status']}
		bind:cachedValue={formDataCache['status']}
		nullable={true}
		label={m.status()}
	/>

	<AutocompleteSelect
		{form}
		optionsEndpoint="terminologies?field_path=project.health&is_visible=true"
		optionsLabelField="translated_name"
		field="health"
		cacheLock={cacheLocks['health']}
		bind:cachedValue={formDataCache['health']}
		nullable={true}
		label={m.health()}
	/>

	<Select
		{form}
		options={model.selectOptions?.priority ?? []}
		field="priority"
		label={m.priority()}
		cacheLock={cacheLocks['priority']}
		bind:cachedValue={formDataCache['priority']}
	/>

	{#if section === 'overview' || section === 'all'}
		<Score {form} label={m.progress()} field="progress" fullDonut min_score={0} max_score={100} />
	{/if}

	{#if !object?.id}
		<Checkbox
			{form}
			field="create_collection"
			label={m.createCollection()}
			helpText={m.createCollectionHelpText()}
			cacheLock={cacheLocks['create_collection']}
			bind:cachedValue={formDataCache['create_collection']}
		/>
	{/if}
{/if}

{#if is('people')}
	<AutocompleteSelect
		{form}
		optionsEndpoint="actors?user__is_third_party=False"
		optionsLabelField="str"
		field="owner"
		cacheLock={cacheLocks['owner']}
		bind:cachedValue={formDataCache['owner']}
		nullable={true}
		label={m.projectOwner()}
		helpText={m.projectOwnerHelpText()}
	/>
	<AutocompleteSelect
		{form}
		optionsEndpoint="actors?user__is_third_party=False"
		optionsLabelField="str"
		field="sponsor"
		cacheLock={cacheLocks['sponsor']}
		bind:cachedValue={formDataCache['sponsor']}
		nullable={true}
		label={m.sponsor()}
	/>
	<AutocompleteSelect
		{form}
		optionsEndpoint="projects"
		optionsLabelField="auto"
		optionsSelf={object}
		field="parent_project"
		cacheLock={cacheLocks['parent_project']}
		bind:cachedValue={formDataCache['parent_project']}
		nullable={true}
		label={m.parentProject()}
	/>
{/if}

{#if is('tracking')}
	<TextField
		type="date"
		{form}
		field="start_date"
		label={m.startDate()}
		cacheLock={cacheLocks['start_date']}
		bind:cachedValue={formDataCache['start_date']}
	/>
	<TextField
		type="date"
		{form}
		field="end_date"
		label={m.endDate()}
		cacheLock={cacheLocks['end_date']}
		bind:cachedValue={formDataCache['end_date']}
	/>
	<TextField
		type="date"
		{form}
		field="eta"
		label={m.eta()}
		cacheLock={cacheLocks['eta']}
		bind:cachedValue={formDataCache['eta']}
	/>
	{#if section === 'tracking'}
		<Score {form} label={m.progress()} field="progress" fullDonut min_score={0} max_score={100} />
	{/if}
	<NumberField
		{form}
		field="budget"
		label={m.budget()}
		min={0}
		step={1}
		cacheLock={cacheLocks['budget']}
		bind:cachedValue={formDataCache['budget']}
	/>
	<NumberField
		{form}
		field="actual_cost"
		label={m.actualCost()}
		min={0}
		step={1}
		cacheLock={cacheLocks['actual_cost']}
		bind:cachedValue={formDataCache['actual_cost']}
	/>
	<Select
		{form}
		options={model.selectOptions?.currency ?? []}
		field="currency"
		label={m.currency()}
		cacheLock={cacheLocks['currency']}
		bind:cachedValue={formDataCache['currency']}
	/>
{/if}

{#if section === 'analytics'}
	<Score {form} label={m.progress()} field="progress" fullDonut min_score={0} max_score={100} />
	<NumberField
		{form}
		field="budget"
		label={m.budget()}
		min={0}
		step={1}
		cacheLock={cacheLocks['budget']}
		bind:cachedValue={formDataCache['budget']}
	/>
	<NumberField
		{form}
		field="actual_cost"
		label={m.actualCost()}
		min={0}
		step={1}
		cacheLock={cacheLocks['actual_cost']}
		bind:cachedValue={formDataCache['actual_cost']}
	/>
{/if}

{#if is('charter')}
	<MarkdownField
		{form}
		field="purpose"
		label={m.purpose()}
		cacheLock={cacheLocks['purpose']}
		bind:cachedValue={formDataCache['purpose']}
	/>
	<MarkdownField
		{form}
		field="objectives"
		label={m.objectives()}
		cacheLock={cacheLocks['objectives']}
		bind:cachedValue={formDataCache['objectives']}
	/>
	<MarkdownField
		{form}
		field="success_criteria"
		label={m.successCriteria()}
		cacheLock={cacheLocks['success_criteria']}
		bind:cachedValue={formDataCache['success_criteria']}
	/>
	<MarkdownField
		{form}
		field="business_case"
		label={m.businessCase()}
		cacheLock={cacheLocks['business_case']}
		bind:cachedValue={formDataCache['business_case']}
	/>
	<MarkdownField
		{form}
		field="deliverables"
		label={m.deliverables()}
		cacheLock={cacheLocks['deliverables']}
		bind:cachedValue={formDataCache['deliverables']}
	/>
	<MarkdownField
		{form}
		field="assumptions"
		label={m.assumptions()}
		cacheLock={cacheLocks['assumptions']}
		bind:cachedValue={formDataCache['assumptions']}
	/>
	<MarkdownField
		{form}
		field="constraints"
		label={m.constraints()}
		cacheLock={cacheLocks['constraints']}
		bind:cachedValue={formDataCache['constraints']}
	/>
	<MarkdownField
		{form}
		field="dependencies_note"
		label={m.dependencies()}
		cacheLock={cacheLocks['dependencies_note']}
		bind:cachedValue={formDataCache['dependencies_note']}
	/>
	<MarkdownField
		{form}
		field="exit_criteria"
		label={m.exitCriteria()}
		cacheLock={cacheLocks['exit_criteria']}
		bind:cachedValue={formDataCache['exit_criteria']}
	/>
	<MarkdownField
		{form}
		field="organizational_alignment"
		label={m.organizationalAlignment()}
		cacheLock={cacheLocks['organizational_alignment']}
		bind:cachedValue={formDataCache['organizational_alignment']}
	/>
	<MarkdownField
		{form}
		field="approval_requirements"
		label={m.approvalRequirements()}
		cacheLock={cacheLocks['approval_requirements']}
		bind:cachedValue={formDataCache['approval_requirements']}
	/>
{/if}

{#if is('linked')}
	<AutocompleteSelect
		{form}
		optionsEndpoint="generic-collections"
		optionsLabelField="str"
		field="linked_collection"
		cacheLock={cacheLocks['linked_collection']}
		bind:cachedValue={formDataCache['linked_collection']}
		nullable={true}
		label={m.linkedCollection()}
	/>
	<AutocompleteSelect
		{form}
		multiple
		createFromSelection={true}
		optionsEndpoint="filtering-labels"
		optionsLabelField="label"
		field="filtering_labels"
		helpText={m.labelsHelpText()}
		label={m.filteringLabels()}
		translateOptions={false}
		allowUserOptions="append"
	/>
	<MarkdownField
		{form}
		field="observation"
		label={m.observation()}
		cacheLock={cacheLocks['observation']}
		bind:cachedValue={formDataCache['observation']}
	/>
{/if}
