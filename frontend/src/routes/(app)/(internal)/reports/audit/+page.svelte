<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	interface AssessmentChoice {
		id: string;
		name: string;
		framework: string;
		framework_ref: string;
		folder: string;
	}

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const assessments = $derived((data.assessments ?? []) as AssessmentChoice[]);
	let selectedId = $state((data.assessments?.[0]?.id as string) ?? '');

	const reportSections = [
		{ key: 'summary', label: 'Summary' },
		{ key: 'domains', label: 'Results by domain' },
		{ key: 'findings', label: 'Findings' },
		{ key: 'observations', label: 'Observations' },
		{ key: 'action_plan', label: 'Action plan' }
	];
	let selectedSections = $state<string[]>(reportSections.map((section) => section.key));

	const selected = $derived(assessments.find((item) => item.id === selectedId) ?? null);

	function optionLabel(item: AssessmentChoice) {
		return item.framework_ref ? `${item.framework_ref} — ${item.name}` : item.name;
	}

	function frameworkCaption(item: AssessmentChoice | null) {
		if (!item) return '';
		if (!item.framework) return item.folder;
		if (item.framework_ref && !item.framework.includes(item.framework_ref)) {
			return `${item.framework} ${item.framework_ref}`;
		}
		return item.framework;
	}

	function generate() {
		if (!selectedId || selectedSections.length === 0) return;
		const ordered = reportSections
			.map((section) => section.key)
			.filter((key) => selectedSections.includes(key));
		const params = new URLSearchParams({ assessment: selectedId, sections: ordered.join(',') });
		goto(`/reports/audit/outcome?${params.toString()}`);
	}
</script>

<div class="px-4 py-6 max-w-4xl mx-auto space-y-6">
	<p class="text-sm text-gray-500">
		<a href="/reports" class="hover:text-blue-700">Reports</a> › Audit Report
	</p>

	<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
				<i class="fa-solid fa-clipboard-check"></i>
			</div>
			<div>
				<h1 class="text-xl font-bold text-gray-900">Audit Report</h1>
				<p class="mt-1 text-sm text-gray-500">
					Choose an audit assessment and the sections to include. The PDF and XLSX exports follow
					the same selection.
				</p>
			</div>
		</div>

		{#if assessments.length === 0}
			<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
				No compliance assessment is visible to this account.
			</p>
		{:else}
			<div>
				<label class="block text-sm font-medium text-gray-800" for="audit-assessment">
					Audit assessment <span class="text-red-600">*</span>
				</label>
				<select
					id="audit-assessment"
					class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal"
					bind:value={selectedId}
					required
				>
					{#each assessments as item}
						<option value={item.id}>{optionLabel(item)}</option>
					{/each}
				</select>
				{#if selected}
					<p class="mt-1 text-sm text-gray-500">{frameworkCaption(selected)}</p>
				{/if}
			</div>

			<fieldset class="space-y-2">
				<legend class="text-sm font-medium text-gray-800">Report sections</legend>
				{#each reportSections as section}
					<label class="flex items-center gap-2 text-sm text-gray-800">
						<input type="checkbox" value={section.key} bind:group={selectedSections} />
						{section.label}
					</label>
				{/each}
				{#if selectedSections.length === 0}
					<p class="text-sm text-red-600">Select at least one section.</p>
				{/if}
			</fieldset>
		{/if}

		<div class="flex flex-wrap items-center gap-3">
			<button
				type="button"
				class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
				disabled={!selectedId || selectedSections.length === 0}
				onclick={generate}
			>
				<i class="fa-solid fa-bolt"></i>
				Generate Report
			</button>
			<a
				href="/reports"
				class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
			>
				<i class="fa-solid fa-arrow-left"></i>
				Back
			</a>
		</div>
	</div>
</div>
