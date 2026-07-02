<script lang="ts">
	import { page } from '$app/state';
	import AiAnalysisProgressModal from './AiAnalysisProgressModal.svelte';
	import {
		activeAiAnalysisJob,
		dismissProgressModal,
		getGoToPageLabel,
		isOnAnalysisPage,
		navigateToAnalysisPage,
		requestViewResults,
		showProgressModalAgain
	} from './aiAnalysisJobs';

	let job = $derived($activeAiAnalysisJob);
	let onAnalysisPage = $derived(job ? isOnAnalysisPage(page.url.pathname, job) : false);
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
	<button
		type="button"
		class="fixed bottom-6 right-6 z-[55] flex max-w-sm items-center gap-3 rounded-2xl border border-[#005FA3]/20 bg-white px-4 py-3 shadow-xl transition-all hover:shadow-2xl"
		onclick={showProgressModalAgain}
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
		<div class="min-w-0 text-left">
			<p class="truncate text-sm font-semibold text-gray-900">
				{#if job.status === 'complete'}
					Analysis ready
				{:else}
					Analyzing in background
				{/if}
			</p>
			<p class="truncate text-xs text-gray-500">{job.entityLabel}</p>
		</div>
		<i class="fa-solid fa-chevron-up text-gray-400 text-sm"></i>
	</button>
{/if}
