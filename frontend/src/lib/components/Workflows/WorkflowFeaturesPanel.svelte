<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { safeTranslate } from '$lib/utils/i18n';

	interface Template {
		id: string;
		name: string;
		description: string;
		category: string;
		tags?: string[];
	}

	interface Props {
		templates?: Template[];
		form?: any;
		aiAvailable?: boolean;
		compact?: boolean;
	}

	let {
		templates = [],
		form = undefined,
		aiAvailable = false,
		compact = false
	}: Props = $props();

	let promptText = $state('');
	let suggesting = $state(false);
	let installing = $state(false);
	let modalOpen = $state(false);

	const EXAMPLE_PROMPT_KEYS = [
		'workflowExamplePromptEvidenceReviewers',
		'workflowExamplePromptEvidenceOwners',
		'workflowExamplePromptAssessmentReview',
		'workflowExamplePromptIncident'
	] as const;

	$effect(() => {
		if (form?.prompt) promptText = form.prompt;
		if (form?.openSuggestModal && form?.promptResult?.matched) {
			modalOpen = true;
		}
	});

	const suggestion = $derived(form?.promptResult);
	const canAdd = $derived(
		Boolean(
			page.data?.user?.permissions && Object.hasOwn(page.data.user.permissions, 'add_workflow')
		)
	);

	function useExamplePrompt(key: string) {
		promptText = safeTranslate(key);
	}

	function closeModal() {
		modalOpen = false;
	}
</script>

<div class="flex flex-col gap-8 {compact ? 'p-5' : ''}">
	<!-- Section 1: Suggest kit from prompt (Muhkam AI) -->
	<section
		class="rounded-xl border border-[#d6e4f5] bg-gradient-to-br from-[#f5f9fc] to-white p-6 shadow-sm"
		data-testid="create-from-prompt-section"
	>
		<div class="flex items-start gap-4 mb-4">
			<div
				class="shrink-0 w-11 h-11 rounded-xl bg-[#005FA3] text-white flex items-center justify-center"
			>
				<i class="fa-solid fa-wand-magic-sparkles text-lg"></i>
			</div>
			<div>
				<h3 class="font-semibold text-lg text-gray-900">
					{safeTranslate('createWorkflowFromPrompt')}
				</h3>
				<p class="text-sm text-surface-600 mt-1 max-w-2xl">
					{safeTranslate('createWorkflowFromPromptHelp')}
				</p>
			</div>
		</div>

		<form
			method="POST"
			action="?/promptTemplate"
			use:enhance={() => {
				suggesting = true;
				return async ({ update }) => {
					await update();
					suggesting = false;
				};
			}}
			class="flex flex-col gap-3"
		>
			<input type="hidden" name="use_llm" value="1" />
			<textarea
				name="prompt"
				rows="4"
				class="textarea w-full text-sm bg-white"
				placeholder={safeTranslate('promptToTemplatePlaceholder')}
				bind:value={promptText}
				required
			></textarea>

			<div class="space-y-2">
				<p class="text-xs font-medium text-surface-500 uppercase tracking-wide">
					{safeTranslate('workflowExamplePrompts')}
				</p>
				<div class="flex flex-wrap gap-2">
					{#each EXAMPLE_PROMPT_KEYS as key}
						<button
							type="button"
							class="text-left text-xs px-3 py-1.5 rounded-lg border border-[#c5daf0] bg-white text-[#004d85] hover:bg-[#eef5fb] transition-colors max-w-full"
							onclick={() => useExamplePrompt(key)}
							disabled={suggesting}
							data-testid="workflow-example-prompt"
						>
							{safeTranslate(key)}
						</button>
					{/each}
				</div>
			</div>

			{#if form?.promptError}
				<p class="text-sm text-error-700 bg-error-50 border border-error-200 rounded-lg px-3 py-2">
					{safeTranslate(form.promptError)}
				</p>
			{/if}
			{#if suggestion && !suggestion.matched}
				<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
					{suggestion.message || safeTranslate('noGalleryKitMatched')}
				</p>
			{/if}
			{#if !aiAvailable}
				<p class="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
					<i class="fa-solid fa-triangle-exclamation mr-1"></i>
					{safeTranslate('geminiNotConfigured')}
				</p>
			{/if}
			<div class="flex flex-wrap items-center gap-3">
				<button
					type="submit"
					class="btn bg-[#005FA3] text-white hover:bg-[#004d85] text-sm px-5"
					disabled={!promptText.trim() || !canAdd || suggesting || !aiAvailable}
					data-testid="suggest-workflow-button"
				>
					{#if suggesting}
						<i class="fa-solid fa-spinner fa-spin mr-2"></i>
						{safeTranslate('suggestingWorkflow')}
					{:else}
						<i class="fa-solid fa-sparkles mr-2"></i>
						{safeTranslate('suggestWorkflow')}
					{/if}
				</button>
				<span class="text-xs text-surface-500">
					{safeTranslate('poweredByGemini')}
				</span>
			</div>
		</form>
	</section>

	<!-- Section 2: Gallery of bundled workflow kits -->
	<section data-testid="workflow-gallery-section">
		<div class="flex items-end justify-between gap-3 mb-4 flex-wrap">
			<div>
				<div class="flex items-center gap-2 flex-wrap">
					<h3 class="font-semibold text-lg text-gray-900">
						{safeTranslate('workflowGallery')}
					</h3>
					<span
						class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100"
					>
						{safeTranslate('workflowGalleryGuaranteed')}
					</span>
				</div>
				<p class="text-sm text-surface-600 mt-1">
					{safeTranslate('workflowGalleryHelp')}
				</p>
			</div>
			<span class="text-xs text-surface-500">
				{templates.length}
				{safeTranslate('templatesCount')}
			</span>
		</div>

		{#if !templates?.length}
			<div
				class="rounded-xl border border-dashed border-surface-300 bg-surface-50 p-8 text-center text-sm text-surface-500"
			>
				{safeTranslate('noWorkflowTemplates')}
			</div>
		{:else}
			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each templates as template (template.id)}
					<article
						class="rounded-xl border border-surface-200 bg-white p-5 shadow-sm flex flex-col gap-3 hover:border-[#005FA3]/40 transition-colors"
						data-testid="workflow-template-card"
					>
						<div class="flex items-start justify-between gap-2">
							<div
								class="w-9 h-9 rounded-lg bg-[#eef5fb] text-[#005FA3] flex items-center justify-center shrink-0"
							>
								<i class="fa-solid fa-diagram-project"></i>
							</div>
							<span
								class="shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-100 text-surface-600"
								>{template.category}</span
							>
						</div>
						<h4 class="font-semibold text-base leading-snug text-gray-900">{template.name}</h4>
						<p class="text-sm text-surface-600 grow">{template.description}</p>
						{#if template.tags?.length}
							<div class="flex flex-wrap gap-1">
								{#each template.tags as tag}
									<span class="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700"
										>{tag}</span
									>
								{/each}
							</div>
						{/if}
						<form method="POST" action="?/installTemplate" use:enhance class="mt-auto pt-1">
							<input type="hidden" name="template_id" value={template.id} />
							<button
								type="submit"
								class="btn w-full bg-[#005FA3] text-white hover:bg-[#004d85] text-sm"
								disabled={!canAdd}
							>
								<i class="fa-solid fa-plus mr-2"></i>
								{safeTranslate('installTemplate')}
							</button>
						</form>
					</article>
				{/each}
			</div>
		{/if}
	</section>
</div>

{#if modalOpen && suggestion?.matched}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
		role="dialog"
		aria-modal="true"
		data-testid="suggested-workflow-modal"
		onclick={(e) => {
			if (e.target === e.currentTarget && !installing) closeModal();
		}}
	>
		<div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
			<div class="flex items-start justify-between gap-3">
				<div>
					<p class="text-xs uppercase tracking-wide text-[#005FA3] font-medium mb-1">
						{safeTranslate('suggestedWorkflowKit')}
					</p>
					<h4 class="font-semibold text-lg text-gray-900">{suggestion.name}</h4>
				</div>
				<button
					type="button"
					class="btn-icon variant-ghost-surface"
					onclick={closeModal}
					aria-label={safeTranslate('close')}
				>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
			{#if suggestion.category}
				<span
					class="inline-block text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-100 text-surface-600"
					>{suggestion.category}</span
				>
			{/if}
			{#if suggestion.description}
				<p class="text-sm text-surface-600">{suggestion.description}</p>
			{/if}
			{#if suggestion.rationale}
				<p class="text-sm text-surface-500 italic">{suggestion.rationale}</p>
			{/if}
			{#if suggestion.tags?.length}
				<div class="flex flex-wrap gap-1">
					{#each suggestion.tags as tag}
						<span class="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{tag}</span>
					{/each}
				</div>
			{/if}
			<div class="flex flex-wrap gap-3 pt-2">
				<form
					method="POST"
					action="?/installSuggestedTemplate"
					use:enhance={() => {
						installing = true;
						return async ({ update }) => {
							await update();
							installing = false;
						};
					}}
					class="grow"
				>
					<input type="hidden" name="template_id" value={suggestion.template_id} />
					<input type="hidden" name="prompt" value={promptText} />
					<button
						type="submit"
						class="btn w-full bg-[#005FA3] text-white hover:bg-[#004d85] text-sm"
						disabled={!canAdd || installing}
						data-testid="install-suggested-workflow-button"
					>
						{#if installing}
							<i class="fa-solid fa-spinner fa-spin mr-2"></i>
							{safeTranslate('installingWorkflow')}
						{:else}
							<i class="fa-solid fa-plus mr-2"></i>
							{safeTranslate('installTemplate')}
						{/if}
					</button>
				</form>
				<button
					type="button"
					class="btn variant-ghost-surface text-sm"
					onclick={closeModal}
					disabled={installing}
				>
					{safeTranslate('cancel')}
				</button>
			</div>
		</div>
	</div>
{/if}
