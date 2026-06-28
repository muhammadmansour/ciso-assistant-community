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
		applied_controls: string[];
		assets: string[];
		compliance_assessments: string[];
		appliedControlLabels: string[];
		assetLabels: string[];
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
			applied_controls: prefill.applied_controls,
			assets: prefill.assets,
			compliance_assessments: prefill.compliance_assessments,
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
</script>

<div
	class="fixed inset-0 z-[1000] flex items-center justify-center p-4"
	role="dialog"
	aria-modal="true"
	aria-labelledby="convert-gap-to-task-title"
>
	<button
		type="button"
		class="absolute inset-0 bg-black/50 backdrop-blur-sm"
		aria-label={m.cancel()}
		onclick={onClose}
	></button>

	<div class="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
		<div class="mb-4 flex items-center justify-between">
			<h2 id="convert-gap-to-task-title" class="text-lg font-bold text-gray-900">
				{m.convertGapToTask()}
			</h2>
			<button
				type="button"
				class="text-gray-400 hover:text-gray-600"
				aria-label={m.cancel()}
				onclick={onClose}
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>

		<div class="mb-4 space-y-3 rounded-lg bg-gray-50 p-4 text-sm">
			<div>
				<span class="font-medium text-gray-500">{m.name()}:</span>
				<p class="mt-0.5 text-gray-900">{prefill.name}</p>
			</div>
			{#if prefill.description}
				<div>
					<span class="font-medium text-gray-500">{m.description()}:</span>
					<p class="mt-0.5 text-gray-800">{prefill.description}</p>
				</div>
			{/if}
			{#if prefill.observation}
				<div>
					<span class="font-medium text-gray-500">{m.observation()}:</span>
					<p class="mt-0.5 text-gray-800">{prefill.observation}</p>
				</div>
			{/if}
			{#if prefill.appliedControlLabels.length > 0}
				<div>
					<span class="font-medium text-gray-500">{m.appliedControls()}:</span>
					<p class="mt-0.5 text-gray-800">{prefill.appliedControlLabels.join(', ')}</p>
				</div>
			{/if}
			{#if prefill.assetLabels.length > 0}
				<div>
					<span class="font-medium text-gray-500">{m.assets()}:</span>
					<p class="mt-0.5 text-gray-800">{prefill.assetLabels.join(', ')}</p>
				</div>
			{/if}
			{#if prefill.assessmentLabel}
				<div>
					<span class="font-medium text-gray-500">{m.complianceAssessments()}:</span>
					<p class="mt-0.5 text-gray-800">{prefill.assessmentLabel}</p>
				</div>
			{/if}
		</div>

		<SuperForm
			class="flex flex-col space-y-4"
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

				<div class="flex gap-3 pt-2">
					<button
						type="button"
						class="btn w-full rounded-lg bg-gray-200 font-semibold text-gray-700 hover:bg-gray-300"
						disabled={$submitting}
						onclick={onClose}
					>
						{m.cancel()}
					</button>
					<button
						type="submit"
						class="btn w-full rounded-lg bg-gradient-to-r from-[#0A1628] to-[#1a2740] font-semibold text-white shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] {$submitting
							? 'cursor-wait opacity-75'
							: ''}"
						disabled={$submitting}
					>
						{#if $submitting}
							{m.loading()} <LoadingSpinner />
						{:else}
							{m.convertToTask()}
						{/if}
					</button>
				</div>
			{/snippet}
		</SuperForm>
	</div>
</div>
