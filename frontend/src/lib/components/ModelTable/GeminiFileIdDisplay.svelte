<script lang="ts">
	interface Props {
		value: any;
	}

	let { value }: Props = $props();
	
	let geminiFileId = $derived(value?.gemini_file_id || '');
	let uploadStatus = $derived(value?.upload_status || '');
	let isCompleted = $derived(uploadStatus === 'completed');
	let isPending = $derived(uploadStatus === 'pending' || uploadStatus === 'uploading');
	let isFailed = $derived(uploadStatus === 'failed');
</script>

{#if geminiFileId}
	<div class="flex items-center space-x-2">
		{#if isCompleted}
			<span class="badge preset-tonal-success text-xs" title={geminiFileId}>
				<i class="fa-solid fa-check-circle mr-1"></i>
				<span class="font-mono text-xs">{geminiFileId.split('/').pop()?.substring(0, 12)}...</span>
			</span>
		{:else if isPending}
			<span class="badge preset-tonal-warning text-xs">
				<i class="fa-solid fa-spinner fa-spin mr-1"></i>
				Uploading...
			</span>
		{:else if isFailed}
			<span class="badge preset-tonal-error text-xs" title="Upload failed">
				<i class="fa-solid fa-exclamation-triangle mr-1"></i>
				Failed
			</span>
		{/if}
	</div>
{:else}
	<span class="text-gray-400 text-sm">—</span>
{/if}
