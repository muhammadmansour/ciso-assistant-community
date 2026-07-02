<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		subtitle?: string;
		expanded?: boolean;
		onClose: () => void;
		onToggleExpand?: () => void;
		body: Snippet;
		footer?: Snippet;
	}

	let {
		open,
		title = 'AI Analysis Report',
		subtitle = '',
		expanded = false,
		onClose,
		onToggleExpand,
		body,
		footer
	}: Props = $props();
</script>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick={onClose}></div>

		<div
			class="relative bg-white shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
			class:rounded-xl={!expanded}
			class:w-full={expanded}
			class:h-full={expanded}
			class:max-w-4xl={!expanded}
			class:max-h-[90vh]={!expanded}
			class:inset-0={expanded}
			class:absolute={expanded}
			style={expanded ? 'max-width:100%;max-height:100%;border-radius:0;' : 'width:95vw;'}
		>
			<div
				class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#005FA3]/5 to-white shrink-0"
			>
				<div class="flex items-center gap-3">
					<div class="p-2 bg-[#005FA3]/10 rounded-lg">
						<i class="fa-solid fa-brain text-[#005FA3] text-lg"></i>
					</div>
					<div>
						<h2 class="text-lg font-bold text-gray-800">{title}</h2>
						{#if subtitle}
							<p class="text-sm text-gray-500">{subtitle}</p>
						{/if}
					</div>
				</div>
				<div class="flex items-center gap-1">
					{#if onToggleExpand}
						<button
							type="button"
							class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							onclick={onToggleExpand}
							title={expanded ? 'Restore size' : 'Expand fullscreen'}
						>
							<i class="fa-solid {expanded ? 'fa-compress' : 'fa-expand'} text-gray-500 text-lg"></i>
						</button>
					{/if}
					<button type="button" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" onclick={onClose}>
						<i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
					</button>
				</div>
			</div>

			<div class="overflow-y-auto flex-1 p-6">
				{@render body()}
			</div>

			{#if footer}
				<div class="flex items-center gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
					{@render footer()}
				</div>
			{:else}
				<div class="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
					<button type="button" class="btn preset-filled-surface-200-800" onclick={onClose}>Close</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
