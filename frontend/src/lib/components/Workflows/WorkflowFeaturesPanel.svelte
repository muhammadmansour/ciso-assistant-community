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

	const EXAMPLE_PROMPT_KEYS = [
		'workflowExamplePromptEvidenceReviewers',
		'workflowExamplePromptEvidenceOwners',
		'workflowExamplePromptAssessmentReview',
		'workflowExamplePromptIncident'
	] as const;

	const CAPABILITY_CAN_KEYS = [
		'workflowCapabilityCanEmail',
		'workflowCapabilityCanTriggers',
		'workflowCapabilityCanRead',
		'workflowCapabilityCanWrite',
		'workflowCapabilityCanHttp',
		'workflowCapabilityCanAi',
		'workflowCapabilityCanBranch'
	] as const;

	$effect(() => {
		if (form?.prompt) promptText = form.prompt;
	});

	const canAdd = $derived(
		Boolean(
			page.data?.user?.permissions && Object.hasOwn(page.data.user.permissions, 'add_workflow')
		)
	);

	function useExamplePrompt(key: string) {
		promptText = safeTranslate(key);
	}

	function promptErrorMessage(code: string | undefined) {
		if (!code) return '';
		if (code === 'geminiInvalidWorkflow') {
			return safeTranslate('geminiInvalidWorkflowHelp');
		}
		return safeTranslate(code);
	}

	const promptErrorDetails = $derived(
		Array.isArray(form?.promptErrorDetails) ? form.promptErrorDetails : []
	);
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

		<div
			class="mb-4 rounded-lg border border-[#d6e4f5] bg-white/80 p-4 space-y-3"
			data-testid="workflow-capabilities"
		>
			<p class="text-sm font-medium text-gray-900">{safeTranslate('workflowCapabilitiesTitle')}</p>
			<p class="text-sm text-surface-600">{safeTranslate('workflowCapabilitiesHelp')}</p>
			<div class="flex flex-wrap gap-2">
				{#each CAPABILITY_CAN_KEYS as key}
					<span
						class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
					>
						<i class="fa-solid fa-check text-[10px]"></i>
						{safeTranslate(key)}
					</span>
				{/each}
			</div>
			<p class="text-xs text-surface-500">{safeTranslate('workflowCapabilitiesBuilderNote')}</p>
		</div>

		<form
			method="POST"
			action="?/promptTemplate"
			use:enhance={() => {
				generating = true;
				return async ({ update }) => {
					await update();
					generating = false;
				};
			}}
			class="flex flex-col gap-3"
		>
			<input type="hidden" name="use_llm" value="1" />
			<input type="hidden" name="install" value="1" />
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
							disabled={generating}
							data-testid="workflow-example-prompt"
						>
							{safeTranslate(key)}
						</button>
					{/each}
				</div>
			</div>

			{#if form?.promptError}
				<div
					class="text-sm text-error-700 bg-error-50 border border-error-200 rounded-lg px-3 py-2 space-y-1"
				>
					<p>{promptErrorMessage(form.promptError)}</p>
					{#if promptErrorDetails.length}
						<ul class="list-disc ps-5 text-xs text-error-600">
							{#each promptErrorDetails.slice(0, 3) as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					{/if}
				</div>
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
					disabled={!promptText.trim() || !canAdd || generating || !aiAvailable}
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
