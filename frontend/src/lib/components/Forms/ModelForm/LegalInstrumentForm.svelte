<script lang="ts">
	import Select from '../Select.svelte';
	import AutocompleteSelect from '../AutocompleteSelect.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import TextArea from '$lib/components/Forms/TextArea.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ModelInfo, CacheLock } from '$lib/utils/types';
	import { m } from '$paraglide/messages';

	interface Props {
		form: SuperValidated<any>;
		model: ModelInfo;
		cacheLocks?: Record<string, CacheLock>;
		formDataCache?: Record<string, any>;
		initialData?: Record<string, any>;
	}

	let {
		form,
		model,
		cacheLocks = {},
		formDataCache = $bindable({}),
		initialData = {}
	}: Props = $props();
</script>

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
<TextField
	{form}
	field="ref_id"
	label={m.legalReferenceNumber()}
	cacheLock={cacheLocks['ref_id']}
	bind:cachedValue={formDataCache['ref_id']}
/>
<TextField
	{form}
	field="issuing_authority"
	label={m.issuingAuthority()}
	cacheLock={cacheLocks['issuing_authority']}
	bind:cachedValue={formDataCache['issuing_authority']}
/>
<Select
	{form}
	disableDoubleDash
	field="status"
	label={m.status()}
	options={model.selectOptions?.['status']}
	cacheLock={cacheLocks['status']}
	bind:cachedValue={formDataCache['status']}
/>
<TextField
	type="date"
	{form}
	field="issue_date"
	label={m.issueDate()}
	cacheLock={cacheLocks['issue_date']}
	bind:cachedValue={formDataCache['issue_date']}
/>
<TextField
	type="date"
	{form}
	field="effective_date"
	label={m.effectiveDate()}
	cacheLock={cacheLocks['effective_date']}
	bind:cachedValue={formDataCache['effective_date']}
/>
<TextField
	{form}
	field="link"
	label={m.link()}
	cacheLock={cacheLocks['link']}
	bind:cachedValue={formDataCache['link']}
/>
<TextArea
	{form}
	field="annotation"
	label={m.annotation()}
	cacheLock={cacheLocks['annotation']}
	bind:cachedValue={formDataCache['annotation']}
/>
<AutocompleteSelect
	multiple
	{form}
	createFromSelection={true}
	optionsEndpoint="filtering-labels"
	optionsLabelField="label"
	field="filtering_labels"
	translateOptions={false}
	helpText={m.labelsHelpText()}
	label={m.labels()}
	allowUserOptions="append"
/>
