<script lang="ts">
	import type { AnalysisStep } from './aiAnalysisProgress';

	interface Props {
		open: boolean;
		title?: string;
		subtitle?: string;
		steps: AnalysisStep[];
		analysisStep: number;
		analysisPercent: number;
		analysisComplete: boolean;
		onClose?: () => void;
		onViewResults?: () => void;
	}

	let {
		open,
		title = 'AI Analysis',
		subtitle = '',
		steps,
		analysisStep,
		analysisPercent,
		analysisComplete,
		onClose,
		onViewResults
	}: Props = $props();
</script>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onkeydown={(e) => e.key === 'Escape' && analysisComplete && onClose?.()}
	>
		<div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
		<div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
			<div class="px-6 pt-6 pb-2 flex items-start justify-between">
				<div>
					<h3 class="text-lg font-bold text-gray-900">{title}</h3>
					{#if subtitle}
						<p class="text-sm text-gray-500">{subtitle}</p>
					{/if}
				</div>
				{#if analysisComplete}
					<button
						type="button"
						class="text-gray-400 hover:text-gray-600 transition-colors p-1"
						onclick={() => onClose?.()}
					>
						<i class="fa-solid fa-xmark text-lg"></i>
					</button>
				{/if}
			</div>

			<div class="flex justify-center py-6">
				{#if analysisComplete}
					<div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
						<i class="fa-solid fa-circle-check text-green-500 text-3xl"></i>
					</div>
				{:else}
					<div class="w-14 h-14 rounded-full bg-[#005FA3]/10 flex items-center justify-center">
						<svg class="w-8 h-8 text-[#005FA3] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"
								opacity="0.3"
							/>
							<path d="M12 5.5L13.6 9.5L18 9.87L14.67 12.76L15.77 17L12 14.67L8.23 17L9.33 12.76L6 9.87L10.4 9.5L12 5.5Z" />
						</svg>
					</div>
				{/if}
			</div>

			<div class="px-6 pb-4">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-medium text-gray-700">
						{#if analysisComplete}
							Analysis complete
						{:else}
							Analyzing...
						{/if}
					</span>
					<span class="text-sm font-medium text-gray-500">{Math.round(analysisPercent)}%</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
					<div
						class="h-full rounded-full transition-all duration-500 ease-out {analysisComplete
							? 'bg-emerald-500'
							: 'bg-[#005FA3]'}"
						style="width: {analysisPercent}%"
					></div>
				</div>
			</div>

			<div class="px-6 pb-4 space-y-3">
				{#each steps as step, idx}
					{@const isDone = idx < analysisStep || analysisComplete}
					{@const isActive = idx === analysisStep && !analysisComplete}
					<div
						class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
						{isDone ? 'bg-emerald-50' : isActive ? 'bg-[#005FA3]/5' : 'bg-transparent'}"
					>
						{#if isDone}
							<i class="fa-solid fa-check text-emerald-500 text-sm"></i>
						{:else if isActive}
							<i class="fa-solid fa-spinner fa-spin text-[#005FA3] text-sm"></i>
						{:else}
							<i class="fa-regular fa-circle text-gray-300 text-sm"></i>
						{/if}
						<span
							class="text-sm {isDone
								? 'text-emerald-700 font-medium'
								: isActive
									? 'text-[#005FA3] font-medium'
									: 'text-gray-400'}"
						>
							{step.label}
						</span>
					</div>
				{/each}
			</div>

			{#if analysisComplete}
				<div class="px-6 pb-6 space-y-4">
					<div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center">
						<p class="text-sm text-emerald-700 font-medium">
							Analysis completed successfully — results are ready for review
						</p>
					</div>
					<button
						type="button"
						class="w-full btn bg-[#005FA3] hover:bg-[#004d85] text-white font-semibold py-3 rounded-xl transition-colors"
						onclick={() => onViewResults?.()}
					>
						View Results
					</button>
				</div>
			{:else}
				<div class="h-6"></div>
			{/if}
		</div>
	</div>
{/if}
