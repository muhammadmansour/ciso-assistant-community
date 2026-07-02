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
	<div
		class="fixed bottom-6 right-6 z-[55] flex max-w-sm items-center gap-3 rounded-2xl border border-[#005FA3]/20 bg-white py-3 pl-4 pr-2 shadow-xl"
	>
		<button
			type="button"
			class="flex min-w-0 flex-1 items-center gap-3 text-left transition-opacity hover:opacity-80"
			onclick={handleIndicatorClick}
		>
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full {job.status === 'complete'
					? 'bg-emerald-100'
					: 'bg-[#005FA3]/10'}"
			>
				{#if job.status === 'complete'}
					<i class="fa-solid fa-circle-check text-emerald-500"></i>
				{:else}
					<i class="fa-solid fa-spinner fa-spin text-[#005FA3]"></i>
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
{/if}
