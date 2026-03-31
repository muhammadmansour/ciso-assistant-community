<script lang="ts">
	import AutocompleteSelect from '../AutocompleteSelect.svelte';
	import TextArea from '$lib/components/Forms/TextArea.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import NumberField from '$lib/components/Forms/NumberField.svelte';
	import LegalIdentifierField from '../LegalIdentifierField.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';

	import Checkbox from '../Checkbox.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ModelInfo, CacheLock } from '$lib/utils/types';
	import { m } from '$paraglide/messages';

	interface Props {
		form: SuperValidated<any>;
		model: ModelInfo;
		cacheLocks?: Record<string, CacheLock>;
		formDataCache?: Record<string, any>;
		initialData?: Record<string, any>;
		object?: any;
	}

	let {
		form,
		model,
		cacheLocks = {},
		formDataCache = $bindable({}),
		initialData = {},
		object = {}
	}: Props = $props();

</script>

<TextField
	{form}
	field="ref_id"
	label={m.refId()}
	cacheLock={cacheLocks['ref_id']}
	bind:cachedValue={formDataCache['ref_id']}
/>
<Checkbox
	{form}
	field="is_active"
	label={m.isActive()}
	cacheLock={cacheLocks['is_active']}
	bind:cachedValue={formDataCache['is_active']}
/>
<AutocompleteSelect
	{form}
	optionsEndpoint="folders?content_type=DO&content_type=GL"
	field="folder"
	pathField="path"
	cacheLock={cacheLocks['folder']}
	bind:cachedValue={formDataCache['folder']}
	label={m.domain()}
	hidden={initialData.folder}
/>
{#if !object.builtin}
	<AutocompleteSelect
		{form}
		optionsEndpoint="terminologies?field_path=entity.relationship"
		field="relationship"
		cacheLock={cacheLocks['relationship']}
		bind:cachedValue={formDataCache['relationship']}
		label={m.relationship()}
		helpText={m.moreOnTerminologiesHelpText()}
		multiple
	/>
{/if}
<LegalIdentifierField
	{form}
	field="legal_identifiers"
	cacheLock={cacheLocks['legal_identifiers']}
	bind:cachedValue={formDataCache['legal_identifiers']}
/>

<Dropdown open={false} style="hover:text-primary-700" icon="fa-solid fa-ellipsis" header={m.more()}>
	<TextArea
		{form}
		field="mission"
		label={m.mission()}
		cacheLock={cacheLocks['mission']}
		bind:cachedValue={formDataCache['mission']}
	/>
	<AutocompleteSelect
		{form}
		optionsEndpoint="entities"
		field="parent_entity"
		optionsSelf={object}
		nullable
		cacheLock={cacheLocks['parent_entity']}
		bind:cachedValue={formDataCache['parent_entity']}
		label={m.parentEntity()}
		helpText={m.parentEntityHelpText()}
	/>
	<AutocompleteSelect
		{form}
		field="country"
		options={model.selectOptions?.country}
		label={m.country()}
		cacheLock={cacheLocks['country']}
		bind:cachedValue={formDataCache['country']}
		nullable
	/>
	<AutocompleteSelect
		{form}
		field="currency"
		options={model.selectOptions?.currency}
		label={m.currency()}
		cacheLock={cacheLocks['currency']}
		bind:cachedValue={formDataCache['currency']}
		nullable
	/>
	<AutocompleteSelect
		{form}
		field="dora_provider_person_type"
		options={model.selectOptions?.dora_provider_person_type}
		label={m.doraProviderPersonType()}
		cacheLock={cacheLocks['dora_provider_person_type']}
		bind:cachedValue={formDataCache['dora_provider_person_type']}
		nullable
	/>
	<TextField
		{form}
		field="reference_link"
		label={m.referenceLink()}
		helpText={m.linkHelpText()}
		cacheLock={cacheLocks['reference_link']}
		bind:cachedValue={formDataCache['reference_link']}
	/>
	<AutocompleteSelect
		multiple
		{form}
		createFromSelection={true}
		optionsEndpoint="filtering-labels"
		optionsLabelField="label"
		field="filtering_labels"
		helpText={m.labelsHelpText()}
		label={m.labels()}
		translateOptions={false}
		allowUserOptions="append"
		cacheLock={cacheLocks['filtering_labels']}
		bind:cachedValue={formDataCache['filtering_labels']}
	/>
</Dropdown>

<Dropdown
	open={false}
	style="hover:text-primary-700"
	icon="fa-solid fa-scale-balanced"
	header={m.doraSpecific()}
>
	<AutocompleteSelect
		{form}
		field="dora_entity_type"
		options={model.selectOptions?.dora_entity_type}
		label={m.doraEntityType()}
		cacheLock={cacheLocks['dora_entity_type']}
		bind:cachedValue={formDataCache['dora_entity_type']}
		nullable
	/>
	<AutocompleteSelect
		{form}
		field="dora_entity_hierarchy"
		options={model.selectOptions?.dora_entity_hierarchy}
		label={m.doraEntityHierarchy()}
		cacheLock={cacheLocks['dora_entity_hierarchy']}
		bind:cachedValue={formDataCache['dora_entity_hierarchy']}
		nullable
	/>
	<NumberField
		{form}
		field="dora_assets_value"
		label={m.doraAssetsValue()}
		cacheLock={cacheLocks['dora_assets_value']}
		bind:cachedValue={formDataCache['dora_assets_value']}
	/>
	<TextField
		{form}
		field="dora_competent_authority"
		label={m.doraCompetentAuthority()}
		cacheLock={cacheLocks['dora_competent_authority']}
		bind:cachedValue={formDataCache['dora_competent_authority']}
	/>
</Dropdown>

