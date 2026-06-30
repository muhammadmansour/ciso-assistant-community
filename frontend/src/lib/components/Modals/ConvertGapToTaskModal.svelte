<script lang="ts">
	import AutocompleteSelect from '$lib/components/Forms/AutocompleteSelect.svelte';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import HiddenInput from '$lib/components/Forms/HiddenInput.svelte';
	import { TaskTemplateSchema } from '$lib/utils/schemas';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { m } from '$paraglide/messages';
	import LoadingSpinner from '$lib/components/utils/LoadingSpinner.svelte';

	export type GapTaskPrefill = {
		name: string;
		description: string;
		observation: string;
		folder: string;
		source: 'requirement' | 'control' | 'evidence';
		source_object_id: string;
		applied_controls: string[];
		assets: string[];
		compliance_assessments: string[];
		evidences: string[];
		appliedControlLabels: string[];
		assetLabels: string[];
		evidenceLabels: string[];
		assessmentLabel: string;
	};

	interface Props {
		prefill: GapTaskPrefill;
		onClose: () => void;
		onSuccess?: (taskId: string) => void;
	}

	let { prefill, onClose, onSuccess }: Props = $props();

	const form = defaults(
		{
			name: prefill.name,
			description: prefill.description,
			observation: prefill.observation,
			folder: prefill.folder,
			source: prefill.source,
			source_object_id: prefill.source_object_id,
			applied_controls: prefill.applied_controls,
			assets: prefill.assets,
			compliance_assessments: prefill.compliance_assessments,
			evidences: prefill.evidences,
			assigned_to: [],
			is_recurrent: false,
			enabled: true,
			status: 'pending'
		},
		zod(TaskTemplateSchema)
	);

	const _form = superForm(form, {
		dataType: 'json',
		invalidateAll: true,
		validators: zod(TaskTemplateSchema),
		taintedMessage: m.taintedFormMessage(),
		onUpdated: ({ form: updatedForm }) => {
			if (updatedForm.valid) {
				onSuccess?.(updatedForm.message?.object?.id);
				onClose();
			}
		}
	});

	const { submitting } = _form;

	const linkedItems = $derived([
		...(prefill.appliedControlLabels.length > 0
			? [
					{
						icon: 'fa-solid fa-shield-halved',
						label: m.appliedControls(),
						values: prefill.appliedControlLabels
					}
				]
			: []),
		...(prefill.assetLabels.length > 0
			? [
					{
						icon: 'fa-solid fa-gem',
						label: m.assets(),
						values: prefill.assetLabels
					}
				]
			: []),
		...(prefill.assessmentLabel
			? [
					{
						icon: 'fa-solid fa-clipboard-check',
						label: m.complianceAssessments(),
						values: [prefill.assessmentLabel]
					}
				]
			: []),
		...(prefill.evidenceLabels.length > 0
			? [
					{
						icon: 'fa-solid fa-file-lines',
						label: m.evidences(),
						values: prefill.evidenceLabels
					}
				]
			: [])
	]);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
	role="dialog"
	aria-modal="true"
	aria-labelledby="convert-gap-to-task-title"
	onkeydown={(e) => e.key === 'Escape' && !$submitting && onClose()}
>
	<button
		type="button"
		class="absolute inset-0 bg-[#0A1628]/55 backdrop-blur-sm"
		aria-label={m.cancel()}
		onclick={onClose}
	></button>

	<div
		class="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_24px_80px_rgba(10,22,40,0.28)]"
	>
		<div
			class="shrink-0 border-b border-orange-100 bg-gradient-to-r from-orange-50 via-white to-[#005FA3]/5 px-6 py-5"
		>
			<div class="flex items-start justify-between gap-4">
				<div class="flex items-start gap-3">
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700 shadow-sm"
					>
						<i class="fa-solid fa-list-check text-lg"></i>
					</div>
					<div>
						<h2 id="convert-gap-to-task-title" class="text-lg font-bold tracking-tight text-gray-900">
							{m.convertGapToTask()}
						</h2>
						<p class="mt-1 text-sm text-gray-500">
							{m.convertGapToTaskDescription()}
						</p>
					</div>
				</div>
				<button
					type="button"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
					aria-label={m.cancel()}
					disabled={$submitting}
					onclick={onClose}
				>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>

		<SuperForm
			class="flex min-h-0 flex-1 flex-col"
			dataType="json"
			data={form}
			{_form}
			validators={zod(TaskTemplateSchema)}
			action="?/createTaskFromGap"
		>
			{#snippet children({ form })}
				<HiddenInput {form} field="name" />
				<HiddenInput {form} field="description" />
				<HiddenInput {form} field="observation" />
				<HiddenInput {form} field="folder" />
				<HiddenInput {form} field="source" />
				<HiddenInput {form} field="source_object_id" />
				<HiddenInput {form} field="status" />
				<HiddenInput {form} field="enabled" />
				<HiddenInput {form} field="is_recurrent" />
				{#each prefill.applied_controls as controlId, index (controlId)}
					<input type="hidden" name={`applied_controls[${index}]`} value={controlId} />
				{/each}
				{#each prefill.assets as assetId, index (assetId)}
					<input type="hidden" name={`assets[${index}]`} value={assetId} />
				{/each}
				{#each prefill.compliance_assessments as assessmentId, index (assessmentId)}
					<input type="hidden" name={`compliance_assessments[${index}]`} value={assessmentId} />
				{/each}
				{#each prefill.evidences as evidenceId, index (evidenceId)}
					<input type="hidden" name={`evidences[${index}]`} value={evidenceId} />
				{/each}

				<div class="flex-1 overflow-y-auto px-6 py-5">
					<div class="space-y-4">
						<section
							class="overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50/80 to-white"
						>
							<div class="border-b border-orange-100 px-4 py-2.5">
								<div class="flex items-center gap-2 text-sm font-semibold text-orange-800">
									<i class="fa-solid fa-triangle-exclamation"></i>
									<span>{m.gapDetails()}</span>
								</div>
							</div>
							<div class="space-y-3 px-4 py-4">
								<div>
									<p class="text-xs font-semibold uppercase tracking-wide text-orange-700/80">
										{m.name()}
									</p>
									<p class="mt-1 text-sm font-medium leading-relaxed text-gray-900">
										{prefill.name}
									</p>
								</div>
								{#if prefill.description}
									<div>
										<p class="text-xs font-semibold uppercase tracking-wide text-orange-700/80">
											{m.description()}
										</p>
										<p class="mt-1 text-sm leading-relaxed text-gray-800">
											{prefill.description}
										</p>
									</div>
								{/if}
							</div>
						</section>

						{#if prefill.observation}
							<section class="rounded-xl border border-[#005FA3]/15 bg-[#005FA3]/5 px-4 py-4">
								<div class="mb-2 flex items-center gap-2 text-sm font-semibold text-[#005FA3]">
									<i class="fa-solid fa-lightbulb"></i>
									<span>{m.observation()}</span>
								</div>
								<p class="text-sm leading-relaxed text-gray-800">{prefill.observation}</p>
							</section>
						{/if}

						{#if linkedItems.length > 0}
							<section class="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
								<p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
									{m.linkedObjects()}
								</p>
								<div class="space-y-3">
									{#each linkedItems as item}
										<div class="rounded-lg border border-white bg-white px-3 py-3 shadow-sm">
											<div class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
												<i class="{item.icon} text-[#005FA3]"></i>
												<span>{item.label}</span>
											</div>
											<div class="flex flex-wrap gap-2">
												{#each item.values as value}
													<span
														class="inline-flex max-w-full items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
													>
														{value}
													</span>
												{/each}
											</div>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						<section class="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
							<div class="mb-3 flex items-center gap-2">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A1628]/5 text-[#0A1628]"
								>
									<i class="fa-solid fa-user-check text-sm"></i>
								</div>
								<div>
									<p class="text-sm font-semibold text-gray-900">{m.assignTaskOwner()}</p>
									<p class="text-xs text-gray-500">{m.assignTaskOwnerHelp()}</p>
								</div>
							</div>

							<AutocompleteSelect
								{form}
								multiple
								mandatory
								optionsEndpoint="actors?user__is_third_party=False"
								optionsLabelField="str"
								optionsInfoFields={{
									fields: [{ field: 'type', translate: true }],
									position: 'prefix'
								}}
								field="assigned_to"
								label={m.assignedTo()}
							/>
						</section>
					</div>
				</div>

				<div class="shrink-0 border-t border-gray-200 bg-gray-50/90 px-6 py-4">
					<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						<button
							type="button"
							class="btn rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
							disabled={$submitting}
							onclick={onClose}
						>
							{m.cancel()}
						</button>
						<button
							type="submit"
							class="btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A1628] to-[#1a2740] px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:from-[#1a2740] hover:to-[#2a3a66] {$submitting
								? 'cursor-wait opacity-75'
								: ''}"
							disabled={$submitting}
						>
							{#if $submitting}
								{m.loading()}
								<LoadingSpinner />
							{:else}
								<i class="fa-solid fa-arrow-right-long text-sm"></i>
								{m.convertToTask()}
							{/if}
						</button>
					</div>
				</div>
			{/snippet}
		</SuperForm>
	</div>
</div>
