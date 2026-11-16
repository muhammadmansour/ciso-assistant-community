<script lang="ts">
	import { m } from '$paraglide/messages';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Gallery lives under Workflows → Features tab.
	onMount(() => {
		goto('/workflows?tab=features', { replaceState: true });
	});
</script>

<p class="text-sm text-surface-500 p-4">{m.redirectingToWorkflowFeatures()}</p>
