<script lang="ts">
	import { goto } from '$app/navigation';
	import { m } from '$paraglide/messages';
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

	const reportSections = $derived([
		{ key: 'summary', label: m.rptExecutiveSummary() },
		{ key: 'scoring', label: m.rptScoringSection() },
		{ key: 'areas', label: m.rptHighRiskAreas() },
		{ key: 'top_risks', label: m.rptTopRisks() },
		{ key: 'heatmaps', label: m.rptHeatmaps() },
		{ key: 'controls', label: m.rptControlsInPlace() },
		{ key: 'cost_allocation', label: m.rptCostAllocation() },
		{ key: 'cost_effectiveness', label: m.rptCostEffectiveness() },
		{ key: 'treatment', label: m.rptTreatmentPlan() }
	]);
	const sectionKeys = [
		'summary',
		'scoring',
		'areas',
		'top_risks',
		'heatmaps',
		'controls',
		'cost_allocation',
		'cost_effectiveness',
		'treatment'
	];
	let selectedSections = $state<string[]>([...sectionKeys]);

	const selected = $derived(assessments.find((item) => item.id === selectedId) ?? null);

	function optionLabel(item: AssessmentChoice) {
		return item.ref_id ? `${item.ref_id} — ${item.name}` : item.name;
	}

	function caption(item: AssessmentChoice | null) {
		if (!item) return '';
		const scope = item.perimeter ? `${item.folder} — ${item.perimeter}` : item.folder;
		return `${scope} · ${item.risk_matrix} · ${m.rptRiskScenarioCount({ count: item.scenario_count })}`;
	}

	function generate() {
		if (!selectedId || selectedSections.length === 0) return;
		const ordered = sectionKeys.filter((key) => selectedSections.includes(key));
		const params = new URLSearchParams({ assessment: selectedId, sections: ordered.join(',') });
		goto(`/reports/risk-posture/outcome?${params.toString()}`);
	}
</script>

<div class="px-4 py-6 max-w-4xl mx-auto space-y-6">
	<p class="text-sm text-gray-500">
		<a href="/reports" class="hover:text-blue-700">{m.reports()}</a>
		<span class="inline-block rtl:rotate-180">›</span>
		{m.rptRiskPostureReport()}
	</p>

	<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
		<div class="flex items-start gap-3">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
				<i class="fa-solid fa-shield-halved"></i>
			</div>
			<div>
				<h1 class="text-xl font-bold text-gray-900">{m.rptRiskPostureReport()}</h1>
				<p class="mt-1 text-sm text-gray-500">{m.rptRiskSetupIntro()}</p>
			</div>
		</div>

		{#if assessments.length === 0}
			<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
				{m.rptNoRiskAssessment()}
			</p>
		{:else}
			<div>
				<label class="block text-sm font-medium text-gray-800" for="risk-assessment">
					{m.rptRiskAssessment()} <span class="text-red-600">*</span>
				</label>
				<select
					id="risk-assessment"
					class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal"
					bind:value={selectedId}
					required
				>
					{#each assessments as item}
						<option value={item.id} dir="auto">{optionLabel(item)}</option>
					{/each}
				</select>
				{#if selected}
					<p class="mt-1 text-sm text-gray-500">{caption(selected)}</p>
				{/if}
			</div>

			<fieldset class="space-y-2">
				<legend class="text-sm font-medium text-gray-800">{m.rptReportSections()}</legend>
				{#each reportSections as section}
					<label class="flex items-center gap-2 text-sm text-gray-800">
						<input type="checkbox" value={section.key} bind:group={selectedSections} />
						{section.label}
					</label>
				{/each}
				{#if selectedSections.length === 0}
					<p class="text-sm text-red-600">{m.rptSelectOneSection()}</p>
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
				{m.rptGenerateReport()}
			</button>
			<a
				href="/reports"
				class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
			>
				<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
				{m.back()}
			</a>
		</div>
	</div>
</div>
