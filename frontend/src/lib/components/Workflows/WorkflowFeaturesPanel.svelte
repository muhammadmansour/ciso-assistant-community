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
		compact?: boolean;
	}

	let { templates = [], form = undefined, compact = false }: Props = $props();

	let promptText = $state('');
	$effect(() => {
		if (form?.prompt) promptText = form.prompt;
	});

	const promptResult = $derived(form?.promptResult);
</script>

<div class="flex flex-col space-y-6 {compact ? 'p-4' : ''}">
	{#if !compact}
		<div>
			<h2 class="font-bold text-xl" data-testid="workflow-features-title">
				{safeTranslate('features')}
			</h2>
			<p class="text-sm text-surface-600 mt-1 max-w-2xl">
				{safeTranslate('workflowTemplatesHelp')}
			</p>
		</div>
	{/if}

	<section class="card p-5 border border-surface-200 shadow-sm bg-white">
		<h3 class="font-semibold text-lg mb-2">{safeTranslate('promptToTemplate')}</h3>
		<p class="text-sm text-surface-600 mb-4">{safeTranslate('promptToTemplateHelp')}</p>
		<form method="POST" action="?/promptTemplate" use:enhance class="flex flex-col gap-3">
			<textarea
				name="prompt"
				rows="3"
				class="textarea w-full text-sm"
				placeholder={safeTranslate('promptToTemplatePlaceholder')}
				bind:value={promptText}
				required
			></textarea>
			{#if form?.promptError}
				<p class="text-sm text-error-600">{safeTranslate(form.promptError)}</p>
			{/if}
			<div class="flex flex-wrap gap-2">
				<button
					type="submit"
					class="btn bg-[#005FA3] text-white hover:bg-[#004d85] text-sm"
					name="install"
					value="0"
				>
					<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
					{safeTranslate('suggestTemplate')}
				</button>
				<button
					type="submit"
					class="btn variant-filled-secondary text-sm"
					name="install"
					value="1"
					disabled={!promptText.trim()}
				>
					<i class="fa-solid fa-file-import mr-2"></i>
					{safeTranslate('installFromPrompt')}
				</button>
			</div>
		</form>

		{#if promptResult}
			<div class="mt-4 rounded-lg border border-surface-200 bg-surface-50 p-4 text-sm space-y-2">
				{#if promptResult.matched}
					<p class="font-medium text-surface-800">
						{promptResult.name}
						<span class="ml-2 text-xs uppercase tracking-wide text-surface-500"
							>{promptResult.source}</span
						>
					</p>
					<p class="text-surface-600">{promptResult.description}</p>
					{#if promptResult.rationale}
						<p class="text-surface-500 italic">{promptResult.rationale}</p>
					{/if}
					<form method="POST" action="?/installTemplate" use:enhance>
						<input type="hidden" name="template_id" value={promptResult.template_id} />
						<button
							type="submit"
							class="btn bg-[#005FA3] text-white hover:bg-[#004d85] text-sm mt-2"
						>
							{safeTranslate('installTemplate')}
						</button>
					</form>
				{:else}
					<p class="text-surface-700">{promptResult.message}</p>
				{/if}
			</div>
		{/if}
	</section>

	<section>
		<h3 class="font-semibold text-lg mb-3">{safeTranslate('templateGallery')}</h3>
		{#if !templates?.length}
			<p class="text-sm text-surface-500">{safeTranslate('noWorkflowTemplates')}</p>
		{:else}
			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each templates as template (template.id)}
					<article
						class="card border border-surface-200 bg-white p-4 shadow-sm flex flex-col gap-3"
						data-testid="workflow-template-card"
					>
						<div class="flex items-start justify-between gap-2">
							<h4 class="font-semibold text-base leading-snug">{template.name}</h4>
							<span
								class="shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-surface-100 text-surface-600"
								>{template.category}</span
							>
						</div>
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
						<form method="POST" action="?/installTemplate" use:enhance class="mt-auto">
							<input type="hidden" name="template_id" value={template.id} />
							<button
								type="submit"
								class="btn w-full bg-[#005FA3] text-white hover:bg-[#004d85] text-sm"
								disabled={!page.data?.user?.permissions ||
									!Object.hasOwn(page.data.user.permissions, 'add_workflow')}
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
