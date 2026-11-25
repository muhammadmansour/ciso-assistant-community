<script lang="ts">
	import { m } from '$paraglide/messages';
	import { getLocale } from '$paraglide/runtime';
	import { formatGenerated, isEnglish, label } from '../../report-i18n';
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
		current: m.rptHeatmapCurrent,
		residual: m.rptHeatmapResidual
	};
	const tagLabels: Record<string, () => string> = {
		twice_average: m.rptTagTwiceAverage,
		no_reduction: m.rptTagNoReduction,
		no_costed_control: m.rptTagNoCostedControl
	};
	const treatmentStyles: Record<string, string> = {
		mitigate: 'bg-blue-100 text-blue-700',
		transfer: 'bg-sky-100 text-sky-700',
		accept: 'bg-amber-100 text-amber-800',
		avoid: 'bg-green-100 text-green-700',
		open: 'bg-red-100 text-red-700'
	};
	const statusStyles: Record<string, string> = {
		active: 'bg-green-100 text-green-700',
		in_progress: 'bg-amber-100 text-amber-800',
		on_hold: 'bg-red-100 text-red-700'
	};

	/** Treatment keys translate to past tense ("Mitigated"); English keeps the backend's verb. */
	function choice(key: string, fallback: string) {
		return isEnglish() ? fallback : label(key, fallback);
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

	const settingsHref = $derived(
		`/reports/risk-posture?${new URLSearchParams({ assessment: report.assessment?.id ?? '' }).toString()}`
	);
</script>

{#snippet sectionTitle(key: string, icon: string, title: string, purpose: string)}
	<div class="mb-1">
		<h2 class="text-lg font-semibold text-gray-900">
			<span class="text-blue-600">{sectionNumbers[key]}.</span>
			<i class="{icon} mx-1 text-blue-600"></i>{title}
		</h2>
		<p class="mt-1 text-sm text-gray-700">{purpose}</p>
	</div>
{/snippet}

{#snippet note(text: string)}
	<p class="mb-3 text-xs text-gray-500">{text}</p>
{/snippet}

{#snippet formula(text: string)}
	<code dir="ltr" class="whitespace-nowrap rounded border border-gray-200 bg-gray-50 px-1 py-0.5 font-mono text-[11px] text-gray-700">{text}</code>
{/snippet}

{#snippet empty(text: string)}
	<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">{text}</p>
{/snippet}

{#snippet band(name: string, color: string, text: string)}
	<span class="inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold" style="background: {color}; color: {text}">{name}</span>
{/snippet}

{#snippet rating(value: any)}
	{#if value?.rated}
		<span class="whitespace-nowrap"><span class="font-bold text-gray-900">{value.score}</span> {@render band(value.name, value.color, value.text)}</span>
		<bdi dir="ltr" class="block text-xs text-gray-400">{value.lxi}</bdi>
	{:else}
		<span class="text-gray-400">—</span>
	{/if}
{/snippet}

{#snippet treatmentPill(key: string, text: string)}
	<span class="inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium {treatmentStyles[key] ?? 'bg-gray-100 text-gray-600'}">{choice(key, text)}</span>
{/snippet}

{#snippet statusPill(key: string, text: string)}
	<span class="inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium {statusStyles[key] ?? 'bg-gray-100 text-gray-600'}">{label(key, text)}</span>
{/snippet}

{#snippet chip(text: string)}
	<span class="me-1 mb-1 inline-block whitespace-nowrap rounded border border-gray-300 bg-white px-1.5 text-[11px] font-semibold text-gray-700">{text}</span>
{/snippet}

{#snippet riskRef(href: string, refId: string)}
	<a {href} class="whitespace-nowrap font-bold text-gray-900 hover:text-blue-700 hover:underline">{refId || '—'}</a>
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
						<h1 class="flex flex-wrap items-center gap-2 text-xl font-bold text-gray-900">
							<span dir="auto">{report.assessment.name}</span>
							{#if report.assessment.version}
								<span class="rounded border border-violet-200 bg-violet-50 px-1.5 text-xs font-semibold text-violet-700">v{report.assessment.version}</span>
							{/if}
						</h1>
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

			<div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
				{#each [
					[m.perimeter(), `${report.assessment.folder}${report.assessment.perimeter ? ` — ${report.assessment.perimeter}` : ''}`],
					[m.riskMatrix(), report.assessment.risk_matrix],
					[m.status(), report.assessment.status_key ? label(report.assessment.status_key, report.assessment.status) : '—'],
					[m.authors(), report.assessment.authors.join(', ') || '—'],
					[m.rptScenarios(), String(report.assessment.scenario_count)]
				] as item}
					<div class="min-w-0">
						<div class="text-xs uppercase tracking-wide text-gray-500">{item[0]}</div>
						<div class="header-value font-medium text-gray-900 truncate" title={item[1]}>{item[1]}</div>
					</div>
				{/each}
			</div>

			<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold {summary.residual_high ? 'text-red-600' : 'text-gray-900'}">{summary.residual_high}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">
						{m.rptResidualTopBands({ first: summary.top_band_names?.[0] ?? '', second: summary.top_band_names?.[1] ?? '' })}
					</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<bdi dir="ltr" class="block text-2xl font-bold text-gray-900">{summary.avg_current ?? '—'} → {summary.avg_residual ?? '—'}</bdi>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptAvgScore({ max: report.max_score })}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.highest_residual?.score ?? '—'}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">
						{m.rptHighestResidual()}{#if summary.highest_residual} · {summary.highest_residual.risks.map((r: { ref: string }) => r.ref).join(', ')}{/if}
					</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<bdi dir="ltr" class="block text-2xl font-bold text-gray-900">{summary.total_cost_compact}</bdi>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptControlsAnnualCost({ count: summary.control_count })}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.mitigate_count} · {summary.accept_count}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptMitigateAccept()}</div>
				</div>
			</div>
		</div>

		{#if sections.includes('summary')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('summary', 'fa-solid fa-chart-simple', m.rptExecutiveSummary(), m.rptRiskSummaryPurpose())}
				<p class="mb-3 text-xs text-gray-500">
					{m.rptSummaryNoteScore()} {@render formula('(probability index + 1) × (impact index + 1)')}; {m.rptSummaryNoteBand()}
				</p>
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3 w-1/4">{m.rptHeadline()}</th><th class="py-2">{m.rptResult()}</th></tr>
					</thead>
					<tbody>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptResidualByBand()}</td>
							<td class="py-2">
								<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
									{#each summary.residual_bands as item}
										<span class="whitespace-nowrap">{@render band(item.name, item.color, item.text)} <strong>{item.count}</strong></span>
									{/each}
								</span>
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptAvgCurrentResidual()}</td>
							<td class="py-2">
								<bdi dir="ltr" class="font-semibold">{summary.avg_current ?? '—'} → {summary.avg_residual ?? '—'}</bdi> / {report.max_score}
								{@render formula(m.rptMeanOfRatedScores())}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptHighestResidualRisks()}</td>
							<td class="py-2">
								{#if summary.highest_residual}
									{#each summary.highest_residual.risks as risk, i}
										{#if risk.ref_id}<span class="font-semibold">{risk.ref_id}</span>{/if} {risk.name}{i < summary.highest_residual.risks.length - 1 ? '; ' : ''}
									{/each}
									— <strong>{summary.highest_residual.score}</strong>
									{@render band(summary.highest_residual.rating.name, summary.highest_residual.rating.color, summary.highest_residual.rating.text)}
									<bdi dir="ltr" class="text-xs text-gray-400">({summary.highest_residual.rating.lxi})</bdi>
								{:else}<span class="text-gray-400">{m.rptNoRatedRisks()}</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptAnnualCostOfControls()}</td>
							<td class="py-2">
								<strong>{m.rptCostAcrossControls({ amount: summary.total_cost_label, count: summary.control_count })}</strong>
								{@render formula(`Σ annual_cost, ${m.rptEachControlOnce()}`)}
								{#if summary.uncosted_count}<span class="text-gray-400"> · {m.rptWithoutCostExcluded({ count: summary.uncosted_count })}</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pe-3 font-medium">{m.rptTreatmentSplit()}</td>
							<td class="py-2">
								<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
									{#each summary.treatment_split as item}
										<span class="whitespace-nowrap">{@render treatmentPill(item.key, item.label)} <strong>{item.count}</strong></span>
									{:else}—{/each}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		{/if}

		{#if sections.includes('scoring')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
				<div>
					{@render sectionTitle('scoring', 'fa-solid fa-bullseye', m.rptScoringSection(), m.rptScoringPurpose())}
					<p class="text-xs text-gray-500">
						{m.rptScoringNoteMatrix({ matrix: report.assessment.risk_matrix, size: report.matrix_size })}
						{m.rptScoringNote()}
					</p>
				</div>
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3 w-1/5">{m.rptBand()}</th><th class="py-2 pe-3 w-1/5">{m.rptScoreRange()}</th><th class="py-2">{m.rptMeaning()}</th></tr>
					</thead>
					<tbody>
						{#each report.scales.bands as item}
							<tr class="border-t border-gray-100">
								<td class="py-2 pe-3">{@render band(item.name, item.color, item.text)}</td>
								<td class="py-2 pe-3"><bdi dir="ltr">{item.range}</bdi></td>
								<td class="py-2 text-gray-700">{item.description || '—'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div class="grid gap-4 md:grid-cols-2">
					{#each [[m.probability(), report.scales.probability], [m.impact(), report.scales.impact]] as [title, scale]}
						<div>
							<h3 class="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
							<table class="w-full text-sm">
								<tbody>
									{#each scale as item}
										<tr class="border-t border-gray-100">
											<td class="py-1.5 pe-3 w-8 font-semibold">{item.value}</td>
											<td class="py-1.5 pe-3 font-medium text-gray-900">{item.name}</td>
											<td class="py-1.5 text-xs text-gray-500">{item.description || '—'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		{#if sections.includes('heatmaps')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('heatmaps', 'fa-solid fa-table-cells', m.rptHeatmaps(), m.rptHeatmapsPurpose())}
				{@render note(m.rptHeatmapsNote())}
				<div class="grid gap-6 md:grid-cols-2">
					{#each report.heatmaps as heatmap}
						<div>
							<h3 class="mb-2 text-sm font-semibold text-gray-900">{heatmapTitles[heatmap.kind]?.() ?? heatmap.title}</h3>
							<table class="heatmap w-full table-fixed border-separate" style="border-spacing: 3px">
								<tbody>
									{#each heatmap.rows as row}
										<tr>
											<td class="w-24 px-1 text-[11px] text-gray-600">{row.label}</td>
											{#each row.cells as cell}
												<td class="h-14 rounded p-1" style="background: {cell.color}">
													{#each cell.refs as ref}{@render chip(ref)}{/each}
												</td>
											{/each}
										</tr>
									{/each}
									<tr>
										<td></td>
										{#each heatmap.columns as column}
											<td class="px-1 text-[11px] text-gray-600">{column.label}</td>
										{/each}
									</tr>
								</tbody>
							</table>
						</div>
					{/each}
				</div>
				<p class="mt-2 text-xs text-gray-500">
					{m.rptAxes({
						rows: label(report.heatmaps[0]?.row_axis_key, report.heatmaps[0]?.row_axis),
						cols: label(report.heatmaps[0]?.col_axis_key, report.heatmaps[0]?.col_axis)
					})}
				</p>
			</section>
		{/if}

		{#if sections.includes('top_risks')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('top_risks', 'fa-solid fa-list-ol', m.rptTopRisks(), m.rptTopRisksPurpose())}
				{@render note(m.rptTopRisksNote())}
				{#if report.top_risks.length === 0}
					{@render empty(m.rptNoScenarios())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">{m.rptRef()}</th><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptCurrent()}</th><th class="py-2 pe-3">{m.rptResidual()}</th><th class="py-2 pe-3">{m.treatment()}</th><th class="py-2 pe-3">{m.rptOwner()}</th><th class="py-2">{m.rptControls()}</th></tr>
							</thead>
							<tbody>
								{#each report.top_risks as risk}
									<tr class="border-t border-gray-100 align-top">
										<td class="py-2 pe-3">{@render riskRef(risk.href, risk.ref_id)}</td>
										<td class="py-2 pe-3 text-gray-900">
											<span class="font-medium">{risk.name}</span>
											{#if risk.description}<span class="block text-xs text-gray-500">{risk.description}</span>{/if}
										</td>
										<td class="py-2 pe-3">{@render rating(risk.current)}</td>
										<td class="py-2 pe-3">{@render rating(risk.residual)}</td>
										<td class="py-2 pe-3">{@render treatmentPill(risk.treatment, risk.treatment_label)}</td>
										<td class="py-2 pe-3">{risk.owners.join(', ') || '—'}</td>
										<td class="py-2 text-center">{risk.control_count}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('controls')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('controls', 'fa-solid fa-shield', m.rptControlsCosts(), m.rptControlsPurpose())}
				{@render note(`${m.rptControlsNote()}${summary.uncosted_count ? ` ${m.rptControlsUncosted({ count: summary.uncosted_count })}` : ''}`)}
				{#if report.controls.length === 0}
					{@render empty(m.rptNoLinkedControls())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">{m.control()}</th><th class="py-2 pe-3">{m.category()}</th><th class="py-2 pe-3">{m.csfFunction()}</th><th class="py-2 pe-3">{m.status()}</th><th class="py-2 pe-3 num">{m.rptAnnualCost()}</th><th class="py-2">{m.rptCovers()}</th></tr>
							</thead>
							<tbody>
								{#each report.controls as control}
									<tr class="border-t border-gray-100">
										<td class="py-2 pe-3"><a href={control.href} class="font-medium text-gray-900 hover:text-blue-700 hover:underline">{control.name}</a></td>
										<td class="py-2 pe-3">{label(control.category, control.category_label)}</td>
										<td class="py-2 pe-3">{label(control.csf_function, control.csf_function_label)}</td>
										<td class="py-2 pe-3">{@render statusPill(control.status, control.status_label)}</td>
										<td class="py-2 pe-3 num"><bdi dir="ltr">{control.annual_cost_label}</bdi></td>
										<td class="py-2">{#each control.covers as ref}{@render chip(ref)}{/each}</td>
									</tr>
								{/each}
								<tr class="border-t-2 border-gray-200 font-semibold">
									<td class="py-2 pe-3">{m.total()}</td>
									<td></td><td></td><td></td>
									<td class="py-2 pe-3 num"><bdi dir="ltr">{summary.total_cost_label}</bdi></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('cost_effectiveness')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('cost_effectiveness', 'fa-solid fa-scale-balanced', m.rptCostEffectiveness(), m.rptCostEffectivenessPurpose())}
				<p class="mb-3 text-xs text-gray-500">
					{@render formula('alloc(s) = Σ cost(c) ÷ scenarios(c)')} · {@render formula('points(s) = current − residual')} · {@render formula('cost per point = alloc ÷ points')}
					{#if report.average_per_point}· {m.rptAverageAcross({ amount: report.average_per_point_label })}{/if}
				</p>
				<p class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">{m.rptEstimateCallout()}</p>
				{#if report.effectiveness.length === 0}
					{@render empty(m.rptNoRatedToCompare())}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-xs uppercase text-gray-500">
								<tr><th class="py-2 pe-3">{m.rptRef()}</th><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3 num">{m.rptAllocatedCost()}</th><th class="py-2 pe-3 num">{m.rptPointsReduced()}</th><th class="py-2 w-1/3">{m.rptCostPerPoint()}</th></tr>
							</thead>
							<tbody>
								{#each report.effectiveness as item}
									{@const hot = item.tag === 'twice_average'}
									<tr class="border-t border-gray-100 {hot ? 'bg-red-50' : ''}">
										<td class="py-2 pe-3">{@render riskRef(item.href, item.ref_id)}</td>
										<td class="py-2 pe-3 text-gray-900">{item.name}</td>
										<td class="py-2 pe-3 num"><bdi dir="ltr">{item.allocated_label}</bdi></td>
										<td class="py-2 pe-3 num"><bdi dir="ltr">{item.current} → {item.residual}{#if item.points >= 0} = <strong>{item.points}</strong>{/if}</bdi></td>
										<td class="py-2">
											{#if item.tag === 'risk_increased'}
												<span class="whitespace-nowrap rounded bg-red-100 px-1.5 text-xs text-red-700">{m.rptTagRiskIncreased({ increase: -item.points })}</span>
											{:else if item.cost_per_point}
												<span class="flex items-center gap-2">
													<span class="h-2 shrink-0 rounded-sm {hot ? 'bg-red-500' : 'bg-blue-300'}" style="width: {item.bar_pct * 0.55}%"></span>
													<bdi dir="ltr" class="font-semibold whitespace-nowrap">{item.cost_per_point_label}</bdi>
													{#if hot}<span class="whitespace-nowrap rounded bg-red-100 px-1.5 text-xs text-red-700">{tagLabels[item.tag]()}</span>{/if}
												</span>
											{:else}
												<span class="rounded bg-gray-100 px-1.5 text-xs text-gray-600">{tagLabels[item.tag]?.() ?? item.tag_label}</span>
											{/if}
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
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
				<div>
					{@render sectionTitle('treatment', 'fa-solid fa-list-check', m.rptTreatmentPlan(), m.rptTreatmentPurpose())}
					<p class="text-xs text-gray-500">
						{m.rptTreatmentNote()}
						{#if report.treatment.unplanned_count}{m.rptUnplannedCount({ count: report.treatment.unplanned_count })}{/if}
					</p>
				</div>
				<div>
					<h3 class="mb-2 text-sm font-semibold text-gray-900">
						{m.rptMitigatePlanned()}
						<span class="font-normal text-gray-500">· {m.rptExtraAnnualCostOf({ amount: report.treatment.extra_cost_label })}</span>
					</h3>
					{#if report.treatment.planned.length === 0}
						{@render empty(m.rptNoPlannedOnMitigate())}
					{:else}
						<div class="overflow-x-auto">
							<table class="w-full text-sm">
								<thead class="text-xs uppercase text-gray-500">
									<tr><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptCurrent()}</th><th class="py-2 pe-3">{m.rptPlannedControl()}</th><th class="py-2 pe-3">{m.status()}</th><th class="py-2 pe-3 num">{m.rptAnnualCost()}</th><th class="py-2 pe-3">{m.eta()}</th><th class="py-2 pe-3">{m.rptTargetResidual()}</th><th class="py-2">{m.rptOwner()}</th></tr>
								</thead>
								<tbody>
									{#each report.treatment.planned as item}
										<tr class="border-t border-gray-100 align-top">
											<td class="py-2 pe-3 text-gray-900">{@render riskRef(item.risk_href, item.risk_ref_id)} {item.risk_name}</td>
											<td class="py-2 pe-3">{@render rating(item.current)}</td>
											<td class="py-2 pe-3"><a href={item.control_href} class="hover:text-blue-700 hover:underline">{item.control_name}</a></td>
											<td class="py-2 pe-3">{@render statusPill(item.status, item.status_label)}</td>
											<td class="py-2 pe-3 num"><bdi dir="ltr">{item.annual_cost_label}</bdi></td>
											<td class="py-2 pe-3"><bdi dir="ltr" class="whitespace-nowrap">{item.eta ?? '—'}</bdi></td>
											<td class="py-2 pe-3">{@render rating(item.residual)}</td>
											<td class="py-2">{item.owners.join(', ') || '—'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				</div>
				<div>
					<h3 class="mb-2 text-sm font-semibold text-gray-900">{m.rptAcceptedRisks()}</h3>
					{#if report.treatment.accepted.length === 0}
						{@render empty(m.rptNoAcceptedScenarios())}
					{:else}
						<div class="overflow-x-auto">
							<table class="w-full text-sm">
								<thead class="text-xs uppercase text-gray-500">
									<tr><th class="py-2 pe-3">{m.risk()}</th><th class="py-2 pe-3">{m.rptResidual()}</th><th class="py-2 pe-3">{m.rptOwner()}</th><th class="py-2">{m.rptJustificationAsWritten()}</th></tr>
								</thead>
								<tbody>
									{#each report.treatment.accepted as item}
										<tr class="border-t border-gray-100 align-top">
											<td class="py-2 pe-3 text-gray-900">{@render riskRef(item.href, item.ref_id)} {item.name}</td>
											<td class="py-2 pe-3">{@render rating(item.residual)}</td>
											<td class="py-2 pe-3">{item.owners.join(', ') || '—'}</td>
											<td class="py-2 text-gray-700" dir="auto">{item.justification || '—'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				</div>
			</section>
		{/if}

		<div class="flex flex-wrap gap-3">
			<a href={settingsHref} class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
				<i class="fa-solid fa-sliders"></i>
				{m.rptReportSettings()}
			</a>
			<a href="/reports" class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
				<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
				{m.rptBackToReports()}
			</a>
		</div>
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
	table th.num,
	table td.num {
		text-align: right;
	}
	:global(html[dir='rtl']) table th.num,
	:global(html[dir='rtl']) table td.num {
		text-align: left;
	}
	table.heatmap td,
	:global(html[dir='rtl']) table.heatmap td {
		text-align: center;
	}
</style>
