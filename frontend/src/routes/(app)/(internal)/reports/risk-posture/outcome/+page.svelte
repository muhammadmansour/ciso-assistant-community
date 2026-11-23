<script lang="ts">
	import { m } from '$paraglide/messages';
	import { getLocale } from '$paraglide/runtime';
	import { formatGenerated, label } from '../../report-i18n';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const report = $derived(data.report);
	const summary = $derived(report.summary ?? {});
	const sections = $derived<string[]>(report.sections ?? []);
	const sectionNumbers = $derived<Record<string, number>>(report.section_numbers ?? {});

	const heatmapTitles: Record<string, () => string> = {
		inherent: m.rptInherentRisk,
		current: m.rptCurrentRisk,
		residual: m.rptResidualRisk
	};
	const flagLabels: Record<string, () => string> = {
		no_reduction: m.rptFlagNoReduction,
		twice_average: m.rptFlagTwiceAverage,
		above_tolerance: m.rptFlagAboveTolerance
	};

	function area(name: string) {
		return name === 'Unclassified' ? m.rptUnclassified() : name;
	}

	function objective(name: string) {
		return name === 'No objective' ? m.rptNoObjective() : name;
	}

	function controlType(control: { type: string; category: string; csf_function: string }) {
		const parts = [
			control.category ? label(control.category, '') : '',
			control.csf_function ? label(control.csf_function, '') : ''
		].filter(Boolean);
		return parts.length ? parts.join(' · ') : control.type || '—';
	}

	function downloadHref(format: 'pdf' | 'xlsx' | 'docx') {
		const params = new URLSearchParams({
			format,
			assessment: report.assessment.id,
			sections: sections.join(','),
			lang: getLocale()
		});
		return `/reports/risk-posture/download?${params.toString()}`;
	}
</script>

{#snippet sectionTitle(key: string, icon: string, title: string, purpose: string, note: string)}
	<div class="mb-3">
		<h2 class="text-lg font-semibold text-gray-900">
			<span class="text-blue-600">{sectionNumbers[key]}.</span>
			<i class="{icon} mx-1 text-blue-600"></i>{title}
		</h2>
		<p class="text-sm text-gray-700">{purpose}</p>
		<p class="text-xs text-gray-500">{note}</p>
	</div>
{/snippet}

{#snippet empty(text: string)}
	<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">{text}</p>
{/snippet}

{#snippet level(rating: any)}
	{#if rating?.rated}
		<span
			class="inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold"
			style="background: {rating.color}; color: {rating.text}">{rating.score} {rating.name}</span
		>
		<bdi dir="ltr" class="block text-xs text-gray-400">{rating.lxi}</bdi>
	{:else}
		<span class="text-gray-400">—</span>
	{/if}
{/snippet}

{#snippet sep()}<span class="inline-block rtl:rotate-180">›</span>{/snippet}

<div class="report-page px-4 py-6 space-y-6 max-w-6xl mx-auto">
	<div class="flex items-center justify-between gap-4">
		<p class="text-sm text-gray-500">
			<a href="/reports" class="hover:text-blue-700">{m.reports()}</a>
			{@render sep()} <a href="/reports/risk-posture" class="hover:text-blue-700">{m.rptRiskPostureReport()}</a>
			{@render sep()} {m.rptOutcome()}
		</p>
		<a href="/reports/risk-posture" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
			{m.back()}
		</a>
	</div>

	{#if !report.assessment}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			{m.rptNoRiskAssessment()}
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="flex items-start gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
						<i class="fa-solid fa-shield-halved"></i>
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-900" dir="auto">{report.assessment.name}</h1>
						<p class="text-sm text-gray-500">
							<bdi>{report.assessment.risk_matrix}</bdi> ·
							{m.rptGenerated({ date: formatGenerated(report.generated_at, report.generated_on) })}
						</p>
					</div>
				</div>
				<div class="flex flex-wrap gap-2">
					<a href={report.assessment.href} class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
						{m.rptOpenAssessment()}
					</a>
					<a href={downloadHref('xlsx')} class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
						<i class="fa-solid fa-file-excel me-1.5"></i>XLSX
					</a>
					<a href={downloadHref('docx')} class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
						<i class="fa-solid fa-file-word me-1.5"></i>Word
					</a>
					<a href={downloadHref('pdf')} class="px-3 py-2 rounded-lg bg-[#0A1628] text-sm text-white hover:bg-[#1a2740]">
						<i class="fa-solid fa-file-pdf me-1.5"></i>PDF
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
				{#each [
					[m.perimeter(), `${report.assessment.folder}${report.assessment.perimeter ? ` — ${report.assessment.perimeter}` : ''}`],
					[m.rptRiskTolerance(), report.tolerance?.name ?? m.rptNotSet()],
					[m.authors(), report.assessment.authors.join(', ') || '—'],
					[m.reviewers(), report.assessment.reviewers.join(', ') || '—']
				] as item}
					<div class="min-w-0">
						<div class="text-xs uppercase tracking-wide text-gray-500">{item[0]}</div>
						<div class="header-value font-medium text-gray-900 truncate" title={item[1]}>{item[1]}</div>
					</div>
				{/each}
			</div>

			<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.posture ?? '—'}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptOverallPosture()}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold {summary.above?.length ? 'text-red-600' : 'text-gray-900'}">{summary.above?.length ?? 0}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptAboveTolerance()}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<bdi dir="ltr" class="block text-2xl font-bold text-gray-900">{summary.avg_inherent ?? '—'} → {summary.avg_current ?? '—'}</bdi>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptAvgScore({ max: report.max_score })}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<bdi dir="ltr" class="block text-2xl font-bold text-gray-900">{summary.total_control_cost_label}</bdi>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptControlsAnnualCost({ count: summary.control_count })}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<bdi dir="ltr" class="block text-2xl font-bold text-gray-900">{summary.total_extra_label}</bdi>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptExtraSpendPlanned()}</div>
				</div>
			</div>
		</div>

		{#if sections.includes('summary')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('summary', 'fa-solid fa-chart-simple', m.rptExecutiveSummary(), m.rptRiskSummaryPurpose(), m.rptExecutiveSummaryNote({ top: summary.top_count, total: summary.total_risks }))}
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3 w-1/4">{m.rptHeadline()}</th><th class="py-2">{m.rptResult()}</th></tr>
					</thead>
					<tbody>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptOverallPosture()}</td>
							<td class="py-2">
								{#if summary.posture}
									<strong>{summary.posture}</strong> —
									{summary.band_mix.map((b: { count: number; name: string }) => `${b.count} ${b.name}`).join(', ')}
								{:else}<span class="text-gray-400">{m.rptNoRatedRisks()}</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptRisksAboveTolerance()}</td>
							<td class="py-2">
								{#if report.tolerance}
									{summary.above.length}{#if summary.above.length}: {summary.above.map((r: { ref_id: string; name: string }) => `${r.ref_id} ${r.name}`.trim()).join(', ')}{/if}
								{:else}<span class="text-gray-400">{m.rptToleranceNotSet()}</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptHighestCurrentRisks()}</td>
							<td class="py-2">{summary.highest ? `${summary.highest_refs.join(', ')} — ${summary.highest.score} (${summary.highest.name})` : '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptHighestExposureAreas()}</td>
							<td class="py-2">{summary.exposure_areas.map(area).join('; ') || '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptAnnualCostOfControls()}</td>
							<td class="py-2">{m.rptCostAcrossControls({ amount: summary.total_control_cost_label, count: summary.control_count })}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptTopObjectiveSpend()}</td>
							<td class="py-2">{summary.top_objective?.amount ? `${objective(summary.top_objective.name)} — ${summary.top_objective.label} (${summary.top_objective.pct}%)` : '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptLeastCostEffective()}</td>
							<td class="py-2">
								{summary.least_effective
									? m.rptLeastEffectiveDetail({
											ref: summary.least_effective.ref,
											cost: summary.least_effective.cost_label,
											points: summary.least_effective.reduction,
											perPoint: summary.least_effective.cost_per_point_label
										})
									: '—'}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptExtraInvestment()}</td>
							<td class="py-2">{m.rptExtraInvestmentDetail({ extra: summary.total_extra_label, total: summary.after_treatment_label })}</td>
						</tr>
					</tbody>
				</table>
			</section>
		{/if}

		{#if sections.includes('scoring')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
				{@render sectionTitle('scoring', 'fa-solid fa-bullseye', m.rptScoringSection(), m.rptScoringPurpose(), m.rptScoringNote())}
				{#if report.objectives.length === 0}
					{@render empty(m.rptNoObjectives())}
				{:else}
					<table class="w-full text-sm">
						<thead class="text-xs uppercase text-gray-500">
							<tr><th class="py-2 pe-3">{m.rptObjective()}</th><th class="py-2 pe-3">{m.rptControlSpend()}</th><th class="py-2 pe-3">{m.rptShare()}</th><th class="py-2">{m.rptRisksAboveTolerance()}</th></tr>
						</thead>
						<tbody>
							{#each report.objectives as item}
								<tr class="border-t border-gray-100">
									<td class="py-2 pe-3 font-medium text-gray-900">{objective(item.name)}</td>
									<td class="py-2 pe-3">{item.label}</td>
									<td class="py-2 pe-3">{item.pct}%</td>
									<td class="py-2">{item.above_count}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				<div class="grid gap-4 md:grid-cols-3">
					{#each [[m.probability(), report.scales.probability], [m.impact(), report.scales.impact]] as [title, scale]}
						<div class="rounded-lg border border-gray-200 p-3">
							<h3 class="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
							{#each scale as item}
								<div class="border-t border-gray-100 py-1.5 text-sm">
									<span class="font-medium">{item.value} · {item.name}</span>
									{#if item.description}<span class="block text-xs text-gray-500">{item.description}</span>{/if}
								</div>
							{/each}
						</div>
					{/each}
					<div class="rounded-lg border border-gray-200 p-3">
						<h3 class="mb-2 text-sm font-semibold text-gray-900">{m.rptRiskLevels()}</h3>
						{#each report.scales.levels as item}
							<div class="border-t border-gray-100 py-1.5 text-sm">
								<span class="me-1.5 inline-block h-3 w-3 rounded-sm align-middle" style="background: {item.color}"></span>
								<span class="font-medium">{item.name}</span>
								{#if item.within_tolerance}<span class="text-xs text-green-700"> · {m.rptWithinTolerance()}</span>{/if}
								{#if item.description}<span class="block text-xs text-gray-500">{item.description}</span>{/if}
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		{#if sections.includes('areas')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('areas', 'fa-solid fa-layer-group', m.rptHighRiskAreas(), m.rptAreasPurpose(), m.rptAreasNote())}
				{#if report.areas.length === 0}
					{@render empty(m.rptNoRatedRisks())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">#</th><th class="py-2 pe-3">{m.rptRiskArea()}</th><th class="py-2 pe-3">{m.rptTopRisks()}</th><th class="py-2 pe-3">{m.rptHighestCurrent()}</th><th class="py-2 pe-3">{m.rptAboveTolerance()}</th><th class="py-2 pe-3">{m.rptInherentCurrentSum()}</th><th class="py-2">{m.rptAnnualControlCost()}</th></tr>
							</thead>
							<tbody>
								{#each report.areas as item}
									<tr class="border-t border-gray-100">
										<td class="py-2 pe-3 text-gray-500">{item.rank}</td>
										<td class="py-2 pe-3 font-medium text-gray-900">{area(item.name)}</td>
										<td class="py-2 pe-3">{item.risks.join(', ')}</td>
										<td class="py-2 pe-3">{@render level(item.top)}</td>
										<td class="py-2 pe-3">{#if item.above.length}<span class="font-semibold text-red-600">{item.above.length}</span> ({item.above.join(', ')}){:else}0{/if}</td>
										<td class="py-2 pe-3"><bdi dir="ltr">{item.inherent_sum} → {item.current_sum}</bdi></td>
										<td class="py-2">{item.cost_label} ({item.cost_pct}%)</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('top_risks')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('top_risks', 'fa-solid fa-list-ol', m.rptTopRisks(), m.rptTopRisksPurpose(), m.rptTopRisksNote())}
				{#if report.top_risks.length === 0}
					{@render empty(m.rptNoRatedRisks())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">ID</th><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptArea()}</th><th class="py-2 pe-3">{m.rptInherentRisk()}</th><th class="py-2 pe-3">{m.rptCurrentRisk()}</th><th class="py-2 pe-3">{m.rptResidualRisk()}</th><th class="py-2 pe-3">{m.status()}</th><th class="py-2 pe-3">{m.objectives()}</th><th class="py-2">{m.owner()}</th></tr>
							</thead>
							<tbody>
								{#each report.top_risks as risk}
									<tr class="border-t border-gray-100 align-top">
										<td class="py-2 pe-3"><a href={risk.href} class="font-semibold text-blue-700 hover:underline">{risk.ref_id || '—'}</a></td>
										<td class="py-2 pe-3 text-gray-900">
											{risk.name}
											{#if risk.description}<span class="block text-xs text-gray-500">{risk.description}</span>{/if}
										</td>
										<td class="py-2 pe-3">{area(risk.area)}</td>
										<td class="py-2 pe-3">{@render level(risk.inherent)}</td>
										<td class="py-2 pe-3">{@render level(risk.current)}</td>
										<td class="py-2 pe-3">{@render level(risk.residual)}</td>
										<td class="py-2 pe-3">
											{#if !report.tolerance}<span class="text-gray-400">—</span>
											{:else if risk.above}<span class="font-semibold text-red-600">{m.rptAbove()}</span>
											{:else}<span class="text-green-700">{m.rptWithin()}</span>{/if}
										</td>
										<td class="py-2 pe-3">{risk.objectives.map(objective).join(', ') || '—'}</td>
										<td class="py-2">{risk.owners.join(', ') || '—'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('heatmaps')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('heatmaps', 'fa-solid fa-table-cells', m.rptHeatmaps(), m.rptHeatmapsPurpose(), m.rptHeatmapsNote())}
				<div class="grid gap-4 md:grid-cols-3">
					{#each report.heatmaps as heatmap}
						<div class="rounded-lg border border-gray-200 p-3">
							<h3 class="mb-2 text-sm font-semibold text-gray-900">{heatmapTitles[heatmap.kind]?.() ?? heatmap.title}</h3>
							<table class="heatmap w-full table-fixed border-separate" style="border-spacing: 2px">
								<tbody>
									{#each heatmap.rows as row}
										<tr>
											<td class="w-14 rounded bg-blue-50 px-1 text-[10px] font-semibold text-gray-700" title={row.title}>{row.label}</td>
											{#each row.cells as cell}
												<td class="h-10 rounded text-xs font-semibold" style="background: {cell.color}; color: {cell.text}">{cell.refs.join(', ')}</td>
											{/each}
										</tr>
									{/each}
									<tr>
										<td></td>
										{#each heatmap.columns as column}
											<td class="rounded bg-blue-50 px-1 text-[10px] font-semibold text-gray-700" title={column.title}>{column.label}</td>
										{/each}
									</tr>
								</tbody>
							</table>
							<p class="mt-1 text-center text-xs text-gray-500">
								{m.rptAxes({ rows: label(heatmap.row_axis_key, heatmap.row_axis), cols: label(heatmap.col_axis_key, heatmap.col_axis) })}
							</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		{#if sections.includes('controls')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('controls', 'fa-solid fa-shield', m.rptControlsInPlace(), m.rptControlsPurpose(), m.rptControlsNote())}
				{#if report.controls.length === 0}
					{@render empty(m.rptNoExistingControls())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">ID</th><th class="py-2 pe-3">{m.control()}</th><th class="py-2 pe-3">{m.type()}</th><th class="py-2 pe-3">{m.status()}</th><th class="py-2 pe-3">{m.rptAnnualCost()}</th><th class="py-2 pe-3">{m.rptRisksCovered()}</th><th class="py-2">{m.objectives()}</th></tr>
							</thead>
							<tbody>
								{#each report.controls as control}
									<tr class="border-t border-gray-100">
										<td class="py-2 pe-3"><a href={control.href} class="font-semibold text-blue-700 hover:underline">{control.ref_id || '—'}</a></td>
										<td class="py-2 pe-3 text-gray-900">{control.name}</td>
										<td class="py-2 pe-3">{controlType(control)}</td>
										<td class="py-2 pe-3">{label(control.status, control.status_label)}</td>
										<td class="py-2 pe-3">{control.annual_cost_label}</td>
										<td class="py-2 pe-3">{control.risks.map((r: { ref: string; pct: number }) => `${r.ref} ${r.pct}%`).join(', ')}</td>
										<td class="py-2">{control.objectives.map(objective).join(', ') || '—'}</td>
									</tr>
								{/each}
								<tr class="border-t-2 border-gray-200 font-semibold">
									<td class="py-2 pe-3"></td>
									<td class="py-2 pe-3">{m.total()}</td>
									<td></td><td></td>
									<td class="py-2 pe-3">{summary.total_control_cost_label}</td>
									<td></td><td></td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('cost_allocation')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('cost_allocation', 'fa-solid fa-diagram-project', m.rptCostAllocation(), m.rptCostAllocationPurpose(), m.rptCostAllocationNote())}
				{#if report.top_risks.length === 0 || report.controls.length === 0}
					{@render empty(m.rptNoControlCosts())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr>
									<th class="py-2 pe-3">{m.risk()}</th>
									<th class="py-2 pe-3">{m.rptBuiltFromControls()}</th>
									<th class="py-2 pe-3">{m.total()}</th>
									{#each report.objectives as item}<th class="py-2 pe-3">{objective(item.name)}</th>{/each}
								</tr>
							</thead>
							<tbody>
								{#each report.top_risks as risk}
									<tr class="border-t border-gray-100">
										<td class="py-2 pe-3 text-gray-900">{#if risk.ref_id}<span class="font-semibold text-blue-700">{risk.ref_id}</span>{/if} {risk.name}</td>
										<td class="py-2 pe-3 text-xs text-gray-600">{risk.cost_parts.map((p: { ref: string; label: string }) => `${p.ref} ${p.label}`).join('; ') || '—'}</td>
										<td class="py-2 pe-3 font-semibold">{risk.control_cost_label}</td>
										{#each risk.objective_costs as cost}<td class="py-2 pe-3">{cost.label}</td>{/each}
									</tr>
								{/each}
								<tr class="border-t-2 border-gray-200 font-semibold">
									<td class="py-2 pe-3">{m.total()}</td>
									<td></td>
									<td class="py-2 pe-3">{summary.total_control_cost_label}</td>
									{#each report.objectives as item}<td class="py-2 pe-3">{item.label}</td>{/each}
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('cost_effectiveness')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('cost_effectiveness', 'fa-solid fa-scale-balanced', m.rptCostEffectiveness(), m.rptCostEffectivenessPurpose(), `${m.rptCostEffectivenessNote()}${summary.average_per_point ? ` ${m.rptAveragePerPoint({ amount: summary.average_per_point_label })}` : ''}`)}
				{#if report.effectiveness.length === 0}
					{@render empty(m.rptNoCostedControls())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">ID</th><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptControlCost()}</th><th class="py-2 pe-3">{m.rptInherentCurrent()}</th><th class="py-2 pe-3">{m.rptPointsReduced()}</th><th class="py-2 pe-3">{m.rptCostPerPoint()}</th><th class="py-2">{m.rptFlags()}</th></tr>
							</thead>
							<tbody>
								{#each report.effectiveness as item}
									<tr class="border-t border-gray-100">
										<td class="py-2 pe-3"><a href={item.href} class="font-semibold text-blue-700 hover:underline">{item.ref_id || '—'}</a></td>
										<td class="py-2 pe-3 text-gray-900">{item.name}</td>
										<td class="py-2 pe-3">{item.cost_label}</td>
										<td class="py-2 pe-3"><bdi dir="ltr">{item.inherent ?? '—'} → {item.current ?? '—'}</bdi></td>
										<td class="py-2 pe-3">{item.reduction ?? '—'}</td>
										<td class="py-2 pe-3">{item.cost_per_point_label}</td>
										<td class="py-2">
											{#each item.flag_keys ?? [] as flag, i}
												<span class="me-1 mb-1 inline-block rounded bg-amber-50 px-1.5 text-xs text-amber-800">{flagLabels[flag]?.() ?? item.flags[i]}</span>
											{:else}<span class="text-gray-400">—</span>{/each}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('treatment')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('treatment', 'fa-solid fa-list-check', m.rptTreatmentPlan(), m.rptTreatmentPurpose(), `${report.tolerance ? m.rptTreatmentNoteAbove() : m.rptTreatmentNoteNoTolerance()} ${m.rptExtraAnnualCostIs({ amount: summary.total_extra_label })}`)}
				{#if report.treatment.length === 0}
					{@render empty(report.tolerance ? m.rptNoTopRiskAbove() : m.rptNoPlannedTreatment())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptCurrentRisk()}</th><th class="py-2 pe-3">{m.treatment()}</th><th class="py-2 pe-3">{m.rptExtraAnnualCost()}</th><th class="py-2 pe-3">{m.rptTargetResidual()}</th><th class="py-2 pe-3">{m.owner()}</th><th class="py-2">{m.rptTargetDate()}</th></tr>
							</thead>
							<tbody>
								{#each report.treatment as item}
									<tr class="border-t border-gray-100 align-top">
										<td class="py-2 pe-3 text-gray-900"><a href={item.href} class="font-semibold text-blue-700 hover:underline">{item.ref_id || item.name}</a>{#if item.ref_id} {item.name}{/if}</td>
										<td class="py-2 pe-3">{@render level(item.current)}</td>
										<td class="py-2 pe-3">
											<span class="font-medium">{label(item.treatment, item.treatment_label)}</span>
											{#each item.controls as control}
												<a href={control.href} class="block text-xs text-gray-600 hover:underline">{control.ref_id ? `${control.ref_id} · ` : ''}{control.name} [{label(control.status, control.status_label)}]</a>
											{:else}<span class="block text-xs text-gray-400">{m.rptNoPlannedControls()}</span>{/each}
										</td>
										<td class="py-2 pe-3">{item.extra_cost_label}</td>
										<td class="py-2 pe-3">
											{@render level(item.residual)}
											{#if item.residual_above}<span class="block text-xs font-semibold text-red-600">{m.rptStillAboveTolerance()}</span>{/if}
										</td>
										<td class="py-2 pe-3">{item.owners.join(', ') || '—'}</td>
										<td class="py-2">{item.target_date ?? '—'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}
	{/if}
</div>

<style>
	/* Each cell takes its direction from its own text, so English data stays readable in Arabic. */
	table th,
	table td,
	.header-value {
		text-align: left;
		unicode-bidi: plaintext;
	}
	:global(html[dir='rtl']) table th,
	:global(html[dir='rtl']) table td,
	:global(html[dir='rtl']) .header-value {
		text-align: right;
	}
	table.heatmap td,
	:global(html[dir='rtl']) table.heatmap td {
		text-align: center;
	}
</style>
