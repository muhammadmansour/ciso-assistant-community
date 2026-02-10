<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Logo from '$lib/components/Logo/Logo.svelte';
	import FormCard from './FormCard.svelte';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-slate-200 px-4">
	<div class="flex flex-col items-center w-full max-w-md space-y-6">
		<Logo />
		<div class="flex justify-center w-full">
			<FormCard {data} {form} />
		</div>
	</div>
</div>
