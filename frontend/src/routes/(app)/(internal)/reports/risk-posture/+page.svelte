<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	interface AssessmentChoice {
		id: string;
		name: string;
		ref_id: string;
		folder: string;
		perimeter: string;
		risk_matrix: string;
		scenario_count: number;
	}

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const assessments = $derived((data.assessments ?? []) as AssessmentChoice[]);
	let selectedId = $state((data.assessments?.[0]?.id as string) ?? '');

	const reportSections = [
		{ key: 'summary', label: 'Executive summary' },
		{ key: 'scoring', label: 'Context, objectives and scoring method' },
		{ key: 'areas', label: 'High-risk areas' },
		{ key: 'top_risks', label: 'Top risks' },
		{ key: 'heatmaps', label: 'Inherent, current and residual heatmaps' },
		{ key: 'controls', label: 'Controls in place for the top risks' },
		{ key: 'cost_allocation', label: 'How control costs add up to risks and objectives' },
		{ key: 'cost_effectiveness', label: 'Cost-effectiveness of control spend' },
		{ key: 'treatment', label: 'Treatment plan' }
	];
	let selectedSections = $state<string[]>(reportSections.map((section) => section.key));

	const selected = $derived(assessments.find((item) => item.id === selectedId) ?? null);

	function optionLabel(item: AssessmentChoice) {
		return item.ref_id ? `${item.ref_id} — ${item.name}` : item.name;
	}

	function caption(item: AssessmentChoice | null) {
		if (!item) return '';
		const scope = item.perimeter ? `${item.folder} — ${item.perimeter}` : item.folder;
		return `${scope} · ${item.risk_matrix} · ${item.scenario_count} risk scenarios`;
	}

	function generate() {
		if (!selectedId || selectedSections.length === 0) return;
		const ordered = reportSections
			.map((section) => section.key)
			.filter((key) => selectedSections.includes(key));
		const params = new URLSearchParams({ assessment: selectedId, sections: ordered.join(',') });
		goto(`/reports/risk-posture/outcome?${params.toString()}`);
	}
</script>

<div class="px-4 py-6 max-w-4xl mx-auto space-y-6">
	<p class="text-sm text-gray-500">
		<a href="/reports" class="hover:text-blue-700">Reports</a> › Risk Posture Report
	</p>

	<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
				<i class="fa-solid fa-shield-halved"></i>
			</div>
			<div>
				<h1 class="text-xl font-bold text-gray-900">Risk Posture Report</h1>
				<p class="mt-1 text-sm text-gray-500">
					Choose a risk assessment and the sections to include. The PDF and XLSX exports follow the
					same selection.
				</p>
			</div>
		</div>

		{#if assessments.length === 0}
			<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
				No risk assessment is visible to this account.
			</p>
		{:else}
			<div>
				<label class="block text-sm font-medium text-gray-800" for="risk-assessment">
					Risk assessment <span class="text-red-600">*</span>
				</label>
				<select
					id="risk-assessment"
					class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal"
					bind:value={selectedId}
					required
				>
					{#each assessments as item}
						<option value={item.id}>{optionLabel(item)}</option>
					{/each}
				</select>
				{#if selected}
					<p class="mt-1 text-sm text-gray-500">{caption(selected)}</p>
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
