<script lang="ts">
	import { m } from '$paraglide/messages';

	interface Props {
		cell: string | null | undefined;
		meta: Record<string, unknown>;
	}

	let { cell, meta }: Props = $props();

	let status = $derived((cell ?? '').toString().toLowerCase());
	let errorMessage = $derived((meta?.indexing_error as string) || '');
</script>

{#if status === 'completed'}
	<span class="badge preset-tonal-success text-xs" title={m.evidenceIndexingSuccess()}>
		<i class="fa-solid fa-check-circle mr-1"></i>
		{m.indexingCompleted()}
	</span>
{:else if status === 'pending' || status === 'uploading'}
	<span class="badge preset-tonal-warning text-xs" title={m.indexingInProgress()}>
		<i class="fa-solid fa-spinner fa-spin mr-1"></i>
		{m.indexingInProgress()}
	</span>
{:else if status === 'failed'}
	<span
		class="badge preset-tonal-error text-xs"
		title={errorMessage || m.evidenceIndexingFailed()}
	>
		<i class="fa-solid fa-exclamation-triangle mr-1"></i>
		{m.indexingFailed()}
	</span>
{:else if status === 'not_started'}
	<span class="badge preset-tonal-surface text-xs" title={m.indexingNotStarted()}>
		<i class="fa-regular fa-circle mr-1"></i>
		{m.indexingNotStarted()}
	</span>
{:else}
	<span class="text-gray-400 text-sm">—</span>
{/if}
