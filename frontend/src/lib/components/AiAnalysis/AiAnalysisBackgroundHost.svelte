<script lang="ts">
	import { page } from '$app/state';
	import AiAnalysisProgressModal from './AiAnalysisProgressModal.svelte';
	import {
		activeAiAnalysisJob,
		dismissAnalysisIndicator,
		dismissProgressModal,
		getGoToPageLabel,
		isOnAnalysisPage,
		navigateToAnalysisPage,
		requestViewResults,
		showProgressModalAgain
	} from './aiAnalysisJobs';

	let job = $derived($activeAiAnalysisJob);
	let onAnalysisPage = $derived(job ? isOnAnalysisPage(page.url.pathname, job) : false);
	let indicatorBottomClass = $derived(
		onAnalysisPage && job?.entityType === 'requirement' ? 'bottom-24' : 'bottom-6'
	);

	function handleIndicatorClick() {
		showProgressModalAgain();
	}
</script>

{#if job?.showProgressModal}
	<AiAnalysisProgressModal
		open={true}
		title={job.progressTitle}
		subtitle={job.entityLabel}
		steps={job.steps}
		analysisStep={job.analysisStep}
		analysisPercent={job.analysisPercent}
		analysisComplete={job.analysisComplete}
		runningInBackground={job.status === 'running'}
		showGoToPage={!onAnalysisPage}
		goToPageLabel={job ? getGoToPageLabel(job.entityType) : undefined}
		onClose={dismissProgressModal}
		onRunInBackground={dismissProgressModal}
		onGoToPage={navigateToAnalysisPage}
		onViewResults={requestViewResults}
	/>
{/if}

{#if job && !job.showProgressModal && (job.status === 'running' || (job.status === 'complete' && job.pendingResult))}
	{@const isLoading = job.status === 'running'}
	<div class="ai-analysis-indicator fixed right-6 z-[55] {indicatorBottomClass} {isLoading ? 'ai-analysis-indicator--loading' : ''}">
		<div
			class="ai-analysis-indicator__inner flex max-w-sm items-center gap-3 rounded-2xl bg-white py-3 pl-4 pr-2 shadow-xl {isLoading
				? ''
				: 'border border-[#005FA3]/20'}"
		>
			<button
				type="button"
				class="flex min-w-0 flex-1 items-center gap-3 text-left transition-opacity hover:opacity-80"
				onclick={handleIndicatorClick}
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full {job.status === 'complete'
						? 'bg-emerald-100'
						: 'ai-analysis-indicator__icon'}"
				>
					{#if job.status === 'complete'}
						<i class="fa-solid fa-circle-check text-emerald-500"></i>
					{:else}
						<i class="fa-solid fa-spinner fa-spin ai-analysis-indicator__spinner"></i>
					{/if}
				</div>
				<div class="min-w-0">
					<p class="truncate text-sm font-semibold text-gray-900">
						{#if job.status === 'complete'}
							Analysis ready
						{:else}
							Analyzing in background
						{/if}
					</p>
					<p class="truncate text-xs text-gray-500">{job.entityLabel}</p>
				</div>
				<i class="fa-solid fa-chevron-up shrink-0 text-gray-400 text-sm"></i>
			</button>
			<button
				type="button"
				class="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				title="Dismiss"
				aria-label="Dismiss analysis notification"
				onclick={dismissAnalysisIndicator}
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
	</div>
{/if}

<style>
	.ai-analysis-indicator {
		padding: 2px;
		border-radius: 1rem;
	}

	.ai-analysis-indicator--loading {
		overflow: hidden;
		animation: ai-indicator-glow-pulse 2.4s ease-in-out infinite;
	}

	.ai-analysis-indicator--loading::before {
		content: '';
		position: absolute;
		inset: -140%;
		background: conic-gradient(
			from 0deg,
			#06b6d4 0deg,
			#0ea5e9 45deg,
			#005fa3 90deg,
			#1d53da 135deg,
			#6366f1 180deg,
			#8b5cf6 225deg,
			#22d3ee 270deg,
			#38bdf8 315deg,
			#06b6d4 360deg
		);
		animation: ai-indicator-border-spin 3s linear infinite;
	}

	.ai-analysis-indicator--loading::after {
		content: '';
		position: absolute;
		inset: 2px;
		border-radius: calc(1rem - 2px);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(240, 249, 255, 0.96) 45%,
			rgba(245, 243, 255, 0.96) 100%
		);
		backdrop-filter: blur(10px);
	}

	.ai-analysis-indicator__inner {
		position: relative;
		z-index: 1;
	}

	.ai-analysis-indicator__icon {
		background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 45%, #ede9fe 100%);
		box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.12);
	}

	.ai-analysis-indicator__spinner {
		color: #6366f1;
	}

	@keyframes ai-indicator-border-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes ai-indicator-glow-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba(14, 165, 233, 0.45))
				drop-shadow(0 0 16px rgba(99, 102, 241, 0.28))
				drop-shadow(0 0 24px rgba(139, 92, 246, 0.16));
		}
		33% {
			filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))
				drop-shadow(0 0 18px rgba(29, 83, 218, 0.32))
				drop-shadow(0 0 26px rgba(56, 189, 248, 0.2));
		}
		66% {
			filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.5))
				drop-shadow(0 0 20px rgba(139, 92, 246, 0.34))
				drop-shadow(0 0 28px rgba(14, 165, 233, 0.22));
		}
	}
</style>
