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
	let generating = $state(false);
	let confirming = $state(false);
	let discarded = $state(false);

	$effect(() => {
		if (form?.prompt) promptText = form.prompt;
		if (form?.promptResult) discarded = false;
	});

	const promptResult = $derived(discarded ? undefined : form?.promptResult);
	const previewReady = $derived(
		Boolean(promptResult?.matched && promptResult?.document && !promptResult?.installed)
	);
	const canAdd = $derived(
		Boolean(
			page.data?.user?.permissions && Object.hasOwn(page.data.user.permissions, 'add_workflow')
		)
	);

	function discardPreview() {
		discarded = true;
	}
</script>

<div class="flex flex-col gap-8 {compact ? 'p-5' : ''}">
	<!-- Section 1: Create from prompt (Gemini) -->
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
				generating = true;
				discarded = false;
				return async ({ update }) => {
					await update();
					generating = false;
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
			{#if form?.promptError}
				<p class="text-sm text-error-600">{safeTranslate(form.promptError)}</p>
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
					disabled={!promptText.trim() || !canAdd || generating || confirming || !aiAvailable}
					data-testid="generate-from-prompt-button"
				>
					{#if generating}
						<i class="fa-solid fa-spinner fa-spin mr-2"></i>
						{safeTranslate('generatingWorkflow')}
					{:else}
						<i class="fa-solid fa-sparkles mr-2"></i>
						{safeTranslate('generateWorkflowWithAi')}
					{/if}
				</button>
				<span class="text-xs text-surface-500">
					{safeTranslate('poweredByGemini')}
				</span>
			</div>
		</form>

		{#if previewReady}
			<div
				class="mt-5 rounded-xl border border-[#b7d4ef] bg-white p-5 space-y-4"
				data-testid="generated-workflow-preview"
			>
				<div class="flex items-start justify-between gap-3 flex-wrap">
					<div>
						<p class="text-xs uppercase tracking-wide text-[#005FA3] font-medium mb-1">
							{safeTranslate('generatedWorkflowPreview')}
						</p>
						<h4 class="font-semibold text-base text-gray-900">{promptResult.name}</h4>
						{#if promptResult.description}
							<p class="text-sm text-surface-600 mt-1">{promptResult.description}</p>
						{/if}
					</div>
				</div>

				{#if promptResult.summary?.length}
					<ol class="space-y-2 border-t border-surface-100 pt-3">
						{#each promptResult.summary as step, i (step.ref || i)}
							<li class="flex items-start gap-3 text-sm">
								<span
									class="shrink-0 w-6 h-6 rounded-full bg-[#eef5fb] text-[#005FA3] text-xs flex items-center justify-center font-medium"
									>{i + 1}</span
								>
								<div class="min-w-0">
									<p class="font-medium text-surface-800">{step.label || step.ref}</p>
									<p class="text-xs text-surface-500">{step.detail || step.type}</p>
								</div>
							</li>
						{/each}
					</ol>
				{/if}

				<div class="flex flex-wrap items-center gap-3 pt-1">
					<form
						method="POST"
						action="?/confirmGeneratedWorkflow"
						use:enhance={() => {
							confirming = true;
							return async ({ update }) => {
								await update();
								confirming = false;
							};
						}}
					>
						<input type="hidden" name="prompt" value={promptText} />
						<input
							type="hidden"
							name="document"
							value={JSON.stringify(promptResult.document)}
						/>
						<button
							type="submit"
							class="btn bg-[#005FA3] text-white hover:bg-[#004d85] text-sm px-5"
							disabled={!canAdd || confirming || generating}
							data-testid="confirm-generated-workflow-button"
						>
							{#if confirming}
								<i class="fa-solid fa-spinner fa-spin mr-2"></i>
								{safeTranslate('creatingWorkflow')}
							{:else}
								<i class="fa-solid fa-check mr-2"></i>
								{safeTranslate('confirmCreateWorkflow')}
							{/if}
						</button>
					</form>
					<button
						type="button"
						class="btn variant-ghost-surface text-sm"
						onclick={discardPreview}
						disabled={confirming}
					>
						{safeTranslate('discardGeneratedWorkflow')}
					</button>
				</div>
			</div>
		{:else if promptResult && !promptResult.matched}
			<div class="mt-4 rounded-lg border border-surface-200 bg-white p-4 text-sm">
				<p class="text-surface-700">{promptResult.message || safeTranslate('geminiInvalidWorkflow')}</p>
			</div>
		{/if}
	</section>

	<!-- Section 2: Gallery of bundled workflow kits -->
	<section data-testid="workflow-gallery-section">
		<div class="flex items-end justify-between gap-3 mb-4 flex-wrap">
			<div>
				<h3 class="font-semibold text-lg text-gray-900">
					{safeTranslate('workflowGallery')}
				</h3>
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
