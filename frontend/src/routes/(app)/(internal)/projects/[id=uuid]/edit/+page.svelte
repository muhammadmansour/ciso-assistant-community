<script lang="ts">
	import ModelForm from '$lib/components/Forms/ModelForm.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<ModelForm
	form={data.form}
	object={data.object}
	selectOptions={data.selectOptions}
	model={data.model}
	context="edit"
/>
