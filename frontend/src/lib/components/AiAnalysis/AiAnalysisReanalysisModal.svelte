<script lang="ts">
	interface Props {
		open: boolean;
		prompt: string;
		title?: string;
		subtitle?: string;
		placeholder?: string;
		onClose: () => void;
		onRun: () => void;
	}

	let {
		open,
		prompt = $bindable(''),
		title = 'Re-Analyze',
		subtitle = 'Provide additional instructions for the AI',
		placeholder = 'e.g. Focus more on the gap analysis, consider the attached policies as partial evidence, be stricter on compliance scoring...',
		onClose,
		onRun
	}: Props = $props();
</script>

{#if open}
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center"
		role="dialog"
		aria-modal="true"
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick={onClose}></div>
		<div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
			<div
				class="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white"
			>
				<div class="p-2 bg-amber-100 rounded-lg">
					<i class="fa-solid fa-rotate text-amber-600 text-lg"></i>
				</div>
				<div>
					<h3 class="text-lg font-bold text-gray-800">{title}</h3>
					<p class="text-sm text-gray-500">{subtitle}</p>
				</div>
				<div class="flex-1"></div>
				<button type="button" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" onclick={onClose}>
					<i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
				</button>
			</div>

			<div class="px-6 py-5 space-y-3">
				<label for="reanalysis-prompt" class="block text-sm font-medium text-gray-700">
					Additional Instructions
				</label>
				<textarea
					id="reanalysis-prompt"
					bind:value={prompt}
					class="w-full h-36 px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700
						placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40
						focus:border-amber-500 resize-none transition-all"
					{placeholder}
				></textarea>
				<p class="text-xs text-gray-400">
					These instructions will be appended to the analysis prompt. Leave empty to re-run with
					default settings.
				</p>
			</div>

			<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
				<button type="button" class="btn preset-filled-surface-200-800 transition-all duration-200" onclick={onClose}>
					Cancel
				</button>
				<button
					type="button"
					class="btn bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-semibold transition-all duration-200"
					onclick={onRun}
				>
					<i class="fa-solid fa-play mr-2"></i>
					Run Analysis
				</button>
			</div>
		</div>
	</div>
{/if}
