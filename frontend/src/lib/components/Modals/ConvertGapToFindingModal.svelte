<script lang="ts">
	import AutocompleteSelect from '$lib/components/Forms/AutocompleteSelect.svelte';
	import SuperForm from '$lib/components/Forms/Form.svelte';
	import HiddenInput from '$lib/components/Forms/HiddenInput.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import TextArea from '$lib/components/Forms/TextArea.svelte';
	import Select from '$lib/components/Forms/Select.svelte';
	import { FindingsAssessmentSchema } from '$lib/utils/schemas';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { m } from '$paraglide/messages';
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/utils/LoadingSpinner.svelte';

	export type GapFindingPrefill = {
		name: string;
		description: string;
		observation: string;
		perimeter: string;
		status: string;
		authors: string[];
		evidences: string[];
		evidenceLabels: string[];
	};

	interface Props {
		prefill: GapFindingPrefill;
		onClose: () => void;
		onSuccess?: (findingId: string) => void;
	}

	let { prefill, onClose, onSuccess }: Props = $props();

	let statusOptions: { label: string; value: string }[] = $state([]);

	onMount(async () => {
		try {
			const res = await fetch('/findings-assessments/status');
			if (res.ok) {
				// Endpoint already returns an array of { label, value } options.
				statusOptions = await res.json();
			}
		} catch {
			statusOptions = [];
		}
	});

	const form = defaults(
		{
			name: prefill.name,
			description: prefill.description,
			observation: prefill.observation,
			perimeter: prefill.perimeter,
			status: prefill.status,
			category: '--',
			version: '0.1',
			authors: prefill.authors,
			reviewers: [],
			evidences: prefill.evidences,
			due_date: null
		},
		zod(FindingsAssessmentSchema)
	);

	const _form = superForm(form, {
		dataType: 'json',
		invalidateAll: true,
		validators: zod(FindingsAssessmentSchema),
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
	aria-labelledby="convert-gap-to-finding-title"
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
						<i class="fa-solid fa-clipboard-list text-lg"></i>
					</div>
					<div>
						<h2
							id="convert-gap-to-finding-title"
							class="text-lg font-bold tracking-tight text-gray-900"
						>
							{m.convertGapToFinding()}
						</h2>
						<p class="mt-1 text-sm text-gray-500">
							{m.convertGapToFindingDescription()}
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
			validators={zod(FindingsAssessmentSchema)}
			action="?/createFindingsAssessment"
		>
			{#snippet children({ form })}
				<HiddenInput {form} field="perimeter" />
				<HiddenInput {form} field="category" />
				<HiddenInput {form} field="version" />
				{#each prefill.evidences as evidenceId, index (evidenceId)}
					<input type="hidden" name={`evidences[${index}]`} value={evidenceId} />
				{/each}

				<div class="flex-1 overflow-y-auto px-6 py-5">
					{#if linkedItems.length > 0}
						<div class="mb-5 rounded-xl border border-[#005FA3]/15 bg-[#005FA3]/5 p-4">
							<p class="mb-3 text-xs font-semibold uppercase tracking-wide text-[#005FA3]">
								{m.linkedObjects()}
							</p>
							<div class="space-y-3">
								{#each linkedItems as item (item.label)}
									<div>
										<p class="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
											<i class={item.icon}></i>
											{item.label}
										</p>
										<ul class="space-y-1 pl-6">
											{#each item.values as value (value)}
												<li class="text-sm text-gray-600">{value}</li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</div>
					{/if}
					<div class="space-y-4">
						<TextField {form} field="name" label={m.name()} />
						<TextArea {form} field="description" label={m.description()} rows={3} />
						<TextArea {form} field="observation" label={m.observation()} rows={3} />
						<Select {form} options={statusOptions} field="status" label={m.status()} />
						<AutocompleteSelect
							{form}
							multiple
							optionsEndpoint="actors?user__is_third_party=False"
							optionsLabelField="str"
							optionsInfoFields={{
								fields: [{ field: 'type', translate: true }],
								position: 'prefix'
							}}
							field="authors"
							label={m.authors()}
						/>
						<AutocompleteSelect
							{form}
							multiple
							optionsEndpoint="actors?user__is_third_party=False"
							optionsLabelField="str"
							optionsInfoFields={{
								fields: [{ field: 'type', translate: true }],
								position: 'prefix'
							}}
							field="reviewers"
							label={m.reviewers()}
						/>
						<TextField
							type="date"
							{form}
							field="due_date"
							label={m.dueDate()}
							helpText={m.dueDateHelpText()}
						/>
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
								{m.convertToFinding()}
							{/if}
						</button>
					</div>
				</div>
			{/snippet}
		</SuperForm>
	</div>
</div>
