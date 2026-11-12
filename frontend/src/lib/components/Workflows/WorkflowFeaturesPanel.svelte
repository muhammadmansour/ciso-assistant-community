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
	let searchQuery = $state('');
	let activeCategory = $state('all');

	const EXAMPLE_PROMPT_KEYS = [
		'workflowExamplePromptEvidenceReviewers',
		'workflowExamplePromptEvidenceOwners',
		'workflowExamplePromptAssessmentReview',
		'workflowExamplePromptIncident'
	] as const;

	const CATEGORY_ICONS: Record<string, string> = {
		evidence: 'fa-file-lines',
		compliance: 'fa-clipboard-check',
		incidents: 'fa-bolt',
		vulnerabilities: 'fa-bug',
		findings: 'fa-magnifying-glass',
		controls: 'fa-shield-halved',
		exceptions: 'fa-unlock-keyhole',
		assets: 'fa-cube'
	};

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

	const categories = $derived(
		[...new Set(templates.map((t) => t.category).filter(Boolean))].sort((a, b) =>
			a.localeCompare(b)
		)
	);

	const filteredTemplates = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		return templates.filter((t) => {
			if (activeCategory !== 'all' && t.category !== activeCategory) return false;
			if (!q) return true;
			const hay = `${t.name} ${t.description} ${t.category} ${(t.tags ?? []).join(' ')}`.toLowerCase();
			return hay.includes(q);
		});
	});

	function useExamplePrompt(key: string) {
		promptText = safeTranslate(key);
	}

	function closeModal() {
		modalOpen = false;
	}

	function categoryIcon(category: string) {
		return CATEGORY_ICONS[category] ?? 'fa-diagram-project';
	}

	function formatCategory(category: string) {
		if (!category) return '';
		return category.replace(/_/g, ' ');
	}
</script>

<div class="flex flex-col gap-6 {compact ? 'p-5 md:p-6' : ''}">
	<!-- Page intro -->
	<header class="flex flex-col gap-1 border-b border-surface-200 pb-4">
		<div class="flex items-center gap-2 flex-wrap">
			<h2 class="text-xl font-semibold text-gray-900 tracking-tight">
				{safeTranslate('workflowTemplates')}
			</h2>
			<span
				class="text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-md bg-[#eef5fb] text-[#005FA3]"
			>
				{templates.length}
				{safeTranslate('templatesCount')}
			</span>
		</div>
		<p class="text-sm text-surface-600 max-w-3xl">
			{safeTranslate('workflowTemplatesHelp')}
		</p>
	</header>

	<!-- Section 1: Suggest from description -->
	<section
		class="rounded-xl border border-[#cfe0f2] bg-[#f7fafc] overflow-hidden"
		data-testid="create-from-prompt-section"
	>
		<div class="flex items-center gap-3 px-5 py-3.5 border-b border-[#d6e4f5] bg-white/70">
			<div
				class="shrink-0 w-9 h-9 rounded-lg bg-[#005FA3] text-white flex items-center justify-center"
			>
				<i class="fa-solid fa-wand-magic-sparkles text-sm"></i>
			</div>
			<div class="min-w-0 grow">
				<div class="flex items-center gap-2 flex-wrap">
					<span
						class="text-[10px] font-semibold uppercase tracking-wider text-[#005FA3] bg-[#eef5fb] px-1.5 py-0.5 rounded"
					>
						1
					</span>
					<h3 class="font-semibold text-base text-gray-900">
						{safeTranslate('createWorkflowFromPrompt')}
					</h3>
				</div>
				<p class="text-xs text-surface-500 mt-0.5 truncate sm:whitespace-normal">
					{safeTranslate('createWorkflowFromPromptHelp')}
				</p>
			</div>
			<span class="hidden sm:inline text-[11px] text-surface-500 shrink-0">
				{safeTranslate('poweredByGemini')}
			</span>
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
			class="p-5 flex flex-col gap-4"
		>
			<input type="hidden" name="use_llm" value="1" />

			<div class="grid gap-4 lg:grid-cols-[1fr_240px]">
				<div class="flex flex-col gap-2">
					<label for="workflow-prompt" class="text-xs font-medium text-surface-600">
						{safeTranslate('promptToTemplate')}
					</label>
					<textarea
						id="workflow-prompt"
						name="prompt"
						rows="4"
						class="textarea w-full text-sm bg-white border-surface-200 focus:border-[#005FA3] min-h-[108px]"
						placeholder={safeTranslate('promptToTemplatePlaceholder')}
						bind:value={promptText}
						required
					></textarea>
				</div>

				<div class="flex flex-col gap-2">
					<p class="text-xs font-medium text-surface-600">
						{safeTranslate('workflowExamplePrompts')}
					</p>
					<div class="flex flex-col gap-1.5">
						{#each EXAMPLE_PROMPT_KEYS as key}
							<button
								type="button"
								class="text-left text-xs px-3 py-2 rounded-lg border border-[#d6e4f5] bg-white text-[#004d85] hover:border-[#005FA3]/50 hover:bg-[#eef5fb] transition-colors leading-snug"
								onclick={() => useExamplePrompt(key)}
								disabled={suggesting}
								data-testid="workflow-example-prompt"
							>
								{safeTranslate(key)}
							</button>
						{/each}
					</div>
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
				<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
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
				<span class="sm:hidden text-[11px] text-surface-500">
					{safeTranslate('poweredByGemini')}
				</span>
			</div>
		</form>
	</section>

	<!-- Section 2: Gallery -->
	<section class="flex flex-col gap-4" data-testid="workflow-gallery-section">
		<div class="flex flex-col gap-3">
			<div class="flex items-end justify-between gap-3 flex-wrap">
				<div>
					<div class="flex items-center gap-2 flex-wrap">
						<span
							class="text-[10px] font-semibold uppercase tracking-wider text-surface-500 bg-surface-100 px-1.5 py-0.5 rounded"
						>
							2
						</span>
						<h3 class="font-semibold text-base text-gray-900">
							{safeTranslate('workflowGallery')}
						</h3>
						<span
							class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
						>
							{safeTranslate('workflowGalleryGuaranteed')}
						</span>
					</div>
					<p class="text-sm text-surface-600 mt-1">
						{safeTranslate('workflowGalleryHelp')}
					</p>
				</div>
			</div>

			{#if templates.length}
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div class="flex flex-wrap gap-1.5">
						<button
							type="button"
							class="text-xs px-2.5 py-1 rounded-md border transition-colors {activeCategory ===
							'all'
								? 'bg-[#005FA3] text-white border-[#005FA3]'
								: 'bg-white text-surface-600 border-surface-200 hover:border-[#005FA3]/40'}"
							onclick={() => (activeCategory = 'all')}
						>
							{safeTranslate('workflowGalleryAllCategories')}
							<span class="opacity-70 ml-1">{templates.length}</span>
						</button>
						{#each categories as category}
							<button
								type="button"
								class="text-xs px-2.5 py-1 rounded-md border capitalize transition-colors {activeCategory ===
								category
									? 'bg-[#005FA3] text-white border-[#005FA3]'
									: 'bg-white text-surface-600 border-surface-200 hover:border-[#005FA3]/40'}"
								onclick={() => (activeCategory = category)}
							>
								{formatCategory(category)}
								<span class="opacity-70 ml-1"
									>{templates.filter((t) => t.category === category).length}</span
								>
							</button>
						{/each}
					</div>
					<label class="relative block w-full sm:w-64 shrink-0">
						<span class="sr-only">{safeTranslate('workflowGallerySearch')}</span>
						<i
							class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 text-xs"
						></i>
						<input
							type="search"
							class="input text-sm pl-8 w-full bg-white"
							placeholder={safeTranslate('workflowGallerySearch')}
							bind:value={searchQuery}
						/>
					</label>
				</div>
			{/if}
		</div>

		{#if !templates?.length}
			<div
				class="rounded-xl border border-dashed border-surface-300 bg-surface-50 p-10 text-center"
			>
				<div
					class="mx-auto mb-3 w-10 h-10 rounded-full bg-surface-100 text-surface-400 flex items-center justify-center"
				>
					<i class="fa-solid fa-box-open"></i>
				</div>
				<p class="text-sm text-surface-600">{safeTranslate('noWorkflowTemplates')}</p>
			</div>
		{:else if !filteredTemplates.length}
			<div
				class="rounded-xl border border-dashed border-surface-300 bg-surface-50 p-8 text-center text-sm text-surface-500"
			>
				{safeTranslate('workflowGalleryNoMatches')}
			</div>
		{:else}
			<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{#each filteredTemplates as template (template.id)}
					<article
						class="group rounded-xl border border-surface-200 bg-white p-4 flex flex-col gap-3 hover:border-[#005FA3]/45 hover:shadow-sm transition-all"
						data-testid="workflow-template-card"
					>
						<div class="flex items-start gap-3">
							<div
								class="w-9 h-9 rounded-lg bg-[#eef5fb] text-[#005FA3] flex items-center justify-center shrink-0 group-hover:bg-[#005FA3] group-hover:text-white transition-colors"
							>
								<i class="fa-solid {categoryIcon(template.category)}"></i>
							</div>
							<div class="min-w-0 grow">
								<div class="flex items-start justify-between gap-2">
									<h4 class="font-semibold text-sm leading-snug text-gray-900">
										{template.name}
									</h4>
								</div>
								<span
									class="inline-block mt-1 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-surface-100 text-surface-600 capitalize"
								>
									{formatCategory(template.category)}
								</span>
							</div>
						</div>

						<p class="text-sm text-surface-600 leading-relaxed line-clamp-3 grow">
							{template.description}
						</p>

						{#if template.tags?.length}
							<div class="flex flex-wrap gap-1 mt-auto">
								{#each template.tags.slice(0, 4) as tag}
									<span
										class="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100"
										>{tag}</span
									>
								{/each}
							</div>
						{/if}
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
		<div class="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
			<div class="px-6 py-4 border-b border-surface-100 bg-[#f7fafc]">
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
			</div>
			<div class="px-6 py-5 space-y-3">
				{#if suggestion.category}
					<span
						class="inline-block text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-surface-100 text-surface-600 capitalize"
						>{formatCategory(suggestion.category)}</span
					>
				{/if}
				{#if suggestion.description}
					<p class="text-sm text-surface-600 leading-relaxed">{suggestion.description}</p>
				{/if}
				{#if suggestion.rationale}
					<p
						class="text-sm text-surface-500 italic border-l-2 border-[#cfe0f2] pl-3 leading-relaxed"
					>
						{suggestion.rationale}
					</p>
				{/if}
				{#if suggestion.tags?.length}
					<div class="flex flex-wrap gap-1">
						{#each suggestion.tags as tag}
							<span
								class="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
								>{tag}</span
							>
						{/each}
					</div>
				{/if}
			</div>
			<div class="px-6 py-4 border-t border-surface-100 flex flex-wrap gap-3 bg-white">
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
