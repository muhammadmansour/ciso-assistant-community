<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const report = $derived(data.report);
	const summary = $derived(report.summary ?? {});
	const sections = $derived<string[]>(report.sections ?? []);
	const sectionNumbers = $derived<Record<string, number>>(report.section_numbers ?? {});

	function downloadHref(format: 'pdf' | 'xlsx') {
		const params = new URLSearchParams({
			format,
			assessment: report.assessment.id,
			sections: sections.join(',')
		});
		return `/reports/risk-posture/download?${params.toString()}`;
	}
</script>

{#snippet sectionTitle(key: string, icon: string, title: string, note: string)}
	<div class="mb-3">
		<h2 class="text-lg font-semibold text-gray-900">
			<span class="text-blue-600">{sectionNumbers[key]}.</span>
			<i class="{icon} mx-1 text-blue-600"></i>{title}
		</h2>
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
		<span class="block text-xs text-gray-400">{rating.lxi}</span>
	{:else}
		<span class="text-gray-400">—</span>
	{/if}
{/snippet}

<div class="px-4 py-6 space-y-6 max-w-6xl mx-auto">
	<div class="flex items-center justify-between gap-4">
		<p class="text-sm text-gray-500">
			<a href="/reports" class="hover:text-blue-700">Reports</a>
			› <a href="/reports/risk-posture" class="hover:text-blue-700">Risk Posture Report</a>
			› Outcome
		</p>
		<a href="/reports/risk-posture" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left"></i>
			Back
		</a>
	</div>

	{#if !report.assessment}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			No risk assessment is visible to this account.
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="flex items-start gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
						<i class="fa-solid fa-shield-halved"></i>
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-900">{report.assessment.name}</h1>
						<p class="text-sm text-gray-500">
							{report.assessment.risk_matrix} · Generated {report.generated_on}
							<span class="ml-1 rounded border border-blue-200 bg-blue-50 px-1.5 text-xs text-blue-700">data-only report</span>
						</p>
					</div>
				</div>
				<div class="flex flex-wrap gap-2">
					<a href={report.assessment.href} class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
						Open assessment
					</a>
					<a href={downloadHref('xlsx')} class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
						<i class="fa-solid fa-file-excel mr-1.5"></i>XLSX
					</a>
					<a href={downloadHref('pdf')} class="px-3 py-2 rounded-lg bg-[#0A1628] text-sm text-white hover:bg-[#1a2740]">
						<i class="fa-solid fa-file-pdf mr-1.5"></i>PDF
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
				{#each [
					['Perimeter', `${report.assessment.folder}${report.assessment.perimeter ? ` — ${report.assessment.perimeter}` : ''}`],
					['Risk tolerance', report.tolerance?.name ?? 'Not set'],
					['Authors', report.assessment.authors.join(', ') || '—'],
					['Reviewers', report.assessment.reviewers.join(', ') || '—']
				] as item}
					<div>
						<div class="text-xs uppercase tracking-wide text-gray-500">{item[0]}</div>
						<div class="font-medium text-gray-900">{item[1]}</div>
					</div>
				{/each}
			</div>

			<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.posture ?? '—'}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Overall posture</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold {summary.above?.length ? 'text-red-600' : 'text-gray-900'}">{summary.above?.length ?? 0}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Above tolerance</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.avg_inherent ?? '—'} → {summary.avg_current ?? '—'}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Avg score, inherent → current (/{report.max_score})</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.total_control_cost_label}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{summary.control_count} controls · annual cost</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{summary.total_extra_label}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Extra annual spend planned</div>
				</div>
			</div>
		</div>

		{#if sections.includes('summary')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('summary', 'fa-solid fa-chart-simple', 'Executive summary', `Top ${summary.top_count} of ${summary.total_risks} risk scenarios, ranked by current risk level then score. Score = probability × impact on the matrix scales.`)}
				<table class="w-full text-sm">
					<thead class="text-left text-xs uppercase text-gray-500">
						<tr><th class="py-2 pr-3 w-1/4">Headline</th><th class="py-2">Result</th></tr>
					</thead>
					<tbody>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Overall posture</td>
							<td class="py-2">
								{#if summary.posture}
									<strong>{summary.posture}</strong> —
									{summary.band_mix.map((b: { count: number; name: string }) => `${b.count} ${b.name}`).join(', ')}
								{:else}<span class="text-gray-400">No rated risks yet</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Risks above tolerance</td>
							<td class="py-2">
								{#if report.tolerance}
									{summary.above.length}{#if summary.above.length}: {summary.above.map((r: { ref_id: string; name: string }) => `${r.ref_id} ${r.name}`.trim()).join(', ')}{/if}
								{:else}<span class="text-gray-400">Risk tolerance is not set on this assessment</span>{/if}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Highest current risks</td>
							<td class="py-2">{summary.highest ? `${summary.highest_refs.join(', ')} — ${summary.highest.score} (${summary.highest.name})` : '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Highest-exposure areas</td>
							<td class="py-2">{summary.exposure_areas.join('; ') || '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Annual cost of controls</td>
							<td class="py-2">{summary.total_control_cost_label} across {summary.control_count} controls</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Objective with the most spend</td>
							<td class="py-2">{summary.top_objective?.amount ? `${summary.top_objective.name} — ${summary.top_objective.label} (${summary.top_objective.pct}%)` : '—'}</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Least cost-effective spend</td>
							<td class="py-2">
								{summary.least_effective
									? `${summary.least_effective.ref}: ${summary.least_effective.cost_label} for ${summary.least_effective.reduction} points (${summary.least_effective.cost_per_point_label} per point)`
									: '—'}
							</td>
						</tr>
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 font-medium">Extra investment planned</td>
							<td class="py-2">{summary.total_extra_label} a year; total after treatment {summary.after_treatment_label}</td>
						</tr>
					</tbody>
				</table>
			</section>
		{/if}

		{#if sections.includes('scoring')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
				{@render sectionTitle('scoring', 'fa-solid fa-bullseye', 'Context, objectives and scoring method', "Objectives come from the controls that treat the top risks. Scores use the assessment's risk matrix.")}
				{#if report.objectives.length === 0}
					{@render empty('No objectives are linked to the controls of the top risks.')}
				{:else}
					<table class="w-full text-sm">
						<thead class="text-left text-xs uppercase text-gray-500">
							<tr><th class="py-2 pr-3">Objective</th><th class="py-2 pr-3 text-right">Control spend</th><th class="py-2 pr-3 text-right">Share</th><th class="py-2 text-right">Risks above tolerance</th></tr>
						</thead>
						<tbody>
							{#each report.objectives as objective}
								<tr class="border-t border-gray-100">
									<td class="py-2 pr-3 font-medium text-gray-900">{objective.name}</td>
									<td class="py-2 pr-3 text-right">{objective.label}</td>
									<td class="py-2 pr-3 text-right">{objective.pct}%</td>
									<td class="py-2 text-right">{objective.above_count}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				<div class="grid gap-4 md:grid-cols-3">
					{#each [['Probability', report.scales.probability], ['Impact', report.scales.impact]] as [title, scale]}
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
						<h3 class="mb-2 text-sm font-semibold text-gray-900">Risk levels</h3>
						{#each report.scales.levels as item}
							<div class="border-t border-gray-100 py-1.5 text-sm">
								<span class="mr-1.5 inline-block h-3 w-3 rounded-sm align-middle" style="background: {item.color}"></span>
								<span class="font-medium">{item.name}</span>
								{#if item.within_tolerance}<span class="text-xs text-green-700"> · within tolerance</span>{/if}
								{#if item.description}<span class="block text-xs text-gray-500">{item.description}</span>{/if}
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		{#if sections.includes('areas')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('areas', 'fa-solid fa-layer-group', 'High-risk areas', 'Top risks grouped by their first qualification, ranked by highest current level, then tolerance breaches.')}
				{#if report.areas.length === 0}
					{@render empty('No rated risks yet.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr><th class="py-2 pr-3">#</th><th class="py-2 pr-3">Risk area</th><th class="py-2 pr-3">Top risks</th><th class="py-2 pr-3">Highest current</th><th class="py-2 pr-3">Above tolerance</th><th class="py-2 pr-3 text-right">Inherent → current (sum)</th><th class="py-2 text-right">Annual control cost</th></tr>
							</thead>
							<tbody>
								{#each report.areas as area}
									<tr class="border-t border-gray-100">
										<td class="py-2 pr-3 text-gray-500">{area.rank}</td>
										<td class="py-2 pr-3 font-medium text-gray-900">{area.name}</td>
										<td class="py-2 pr-3">{area.risks.join(', ')}</td>
										<td class="py-2 pr-3">{@render level(area.top)}</td>
										<td class="py-2 pr-3">{#if area.above.length}<span class="font-semibold text-red-600">{area.above.length}</span> ({area.above.join(', ')}){:else}0{/if}</td>
										<td class="py-2 pr-3 text-right">{area.inherent_sum} → {area.current_sum}</td>
										<td class="py-2 text-right">{area.cost_label} ({area.cost_pct}%)</td>
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
				{@render sectionTitle('top_risks', 'fa-solid fa-list-ol', 'Top risks', 'Inherent assumes no controls, current reflects controls in place, residual is the target after planned treatment.')}
				{#if report.top_risks.length === 0}
					{@render empty('No rated risks yet.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr><th class="py-2 pr-3">ID</th><th class="py-2 pr-3">Risk</th><th class="py-2 pr-3">Area</th><th class="py-2 pr-3">Inherent</th><th class="py-2 pr-3">Current</th><th class="py-2 pr-3">Residual</th><th class="py-2 pr-3">Status</th><th class="py-2 pr-3">Objectives</th><th class="py-2">Owner</th></tr>
							</thead>
							<tbody>
								{#each report.top_risks as risk}
									<tr class="border-t border-gray-100 align-top">
										<td class="py-2 pr-3"><a href={risk.href} class="font-semibold text-blue-700 hover:underline">{risk.ref_id || '—'}</a></td>
										<td class="py-2 pr-3 text-gray-900">
											{risk.name}
											{#if risk.description}<span class="block text-xs text-gray-500">{risk.description}</span>{/if}
										</td>
										<td class="py-2 pr-3">{risk.area}</td>
										<td class="py-2 pr-3">{@render level(risk.inherent)}</td>
										<td class="py-2 pr-3">{@render level(risk.current)}</td>
										<td class="py-2 pr-3">{@render level(risk.residual)}</td>
										<td class="py-2 pr-3">
											{#if !report.tolerance}<span class="text-gray-400">—</span>
											{:else if risk.above}<span class="font-semibold text-red-600">Above</span>
											{:else}<span class="text-green-700">Within</span>{/if}
										</td>
										<td class="py-2 pr-3">{risk.objectives.join(', ') || '—'}</td>
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
				{@render sectionTitle('heatmaps', 'fa-solid fa-table-cells', 'Inherent, current and residual heatmaps', 'Top risks placed on the risk matrix at each stage.')}
				<div class="grid gap-4 md:grid-cols-3">
					{#each report.heatmaps as heatmap}
						<div class="rounded-lg border border-gray-200 p-3">
							<h3 class="mb-2 text-sm font-semibold text-gray-900">{heatmap.title}</h3>
							<table class="w-full table-fixed border-separate" style="border-spacing: 2px">
								<tbody>
									{#each heatmap.rows as row}
										<tr>
											<td class="w-14 rounded bg-blue-50 px-1 text-center text-[10px] font-semibold text-gray-700" title={row.title}>{row.label}</td>
											{#each row.cells as cell}
												<td class="h-10 rounded text-center text-xs font-semibold" style="background: {cell.color}; color: {cell.text}">{cell.refs.join(', ')}</td>
											{/each}
										</tr>
									{/each}
									<tr>
										<td></td>
										{#each heatmap.columns as column}
											<td class="rounded bg-blue-50 px-1 text-center text-[10px] font-semibold text-gray-700" title={column.title}>{column.label}</td>
										{/each}
									</tr>
								</tbody>
							</table>
							<p class="mt-1 text-center text-xs text-gray-500">Rows: {heatmap.row_axis} · Columns: {heatmap.col_axis}</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		{#if sections.includes('controls')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('controls', 'fa-solid fa-shield', 'Controls in place for the top risks', 'Existing applied controls. Annual cost = run cost + amortised build cost; a control covering several top risks has its cost split evenly.')}
				{#if report.controls.length === 0}
					{@render empty('No existing applied controls are linked to the top risks.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr><th class="py-2 pr-3">ID</th><th class="py-2 pr-3">Control</th><th class="py-2 pr-3">Type</th><th class="py-2 pr-3">Status</th><th class="py-2 pr-3 text-right">Annual cost</th><th class="py-2 pr-3">Risks covered</th><th class="py-2">Objectives</th></tr>
							</thead>
							<tbody>
								{#each report.controls as control}
									<tr class="border-t border-gray-100">
										<td class="py-2 pr-3"><a href={control.href} class="font-semibold text-blue-700 hover:underline">{control.ref_id || '—'}</a></td>
										<td class="py-2 pr-3 text-gray-900">{control.name}</td>
										<td class="py-2 pr-3">{control.type}</td>
										<td class="py-2 pr-3">{control.status_label}</td>
										<td class="py-2 pr-3 text-right">{control.annual_cost_label}</td>
										<td class="py-2 pr-3">{control.risks.map((r: { ref: string; pct: number }) => `${r.ref} ${r.pct}%`).join(', ')}</td>
										<td class="py-2">{control.objectives.join(', ') || '—'}</td>
									</tr>
								{/each}
								<tr class="border-t-2 border-gray-200 font-semibold">
									<td class="py-2 pr-3"></td>
									<td class="py-2 pr-3">Total</td>
									<td></td><td></td>
									<td class="py-2 pr-3 text-right">{summary.total_control_cost_label}</td>
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
				{@render sectionTitle('cost_allocation', 'fa-solid fa-diagram-project', 'How control costs add up to risks and objectives', "Control cost is split across the risks it covers, then across the control's objectives.")}
				{#if report.top_risks.length === 0 || report.controls.length === 0}
					{@render empty('No control costs to allocate.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr>
									<th class="py-2 pr-3">Risk</th>
									<th class="py-2 pr-3">Built from controls</th>
									<th class="py-2 pr-3 text-right">Total</th>
									{#each report.objectives as objective}<th class="py-2 pr-3 text-right">{objective.name}</th>{/each}
								</tr>
							</thead>
							<tbody>
								{#each report.top_risks as risk}
									<tr class="border-t border-gray-100">
										<td class="py-2 pr-3 text-gray-900">{#if risk.ref_id}<span class="font-semibold text-blue-700">{risk.ref_id}</span>{/if} {risk.name}</td>
										<td class="py-2 pr-3 text-xs text-gray-600">{risk.cost_parts.map((p: { ref: string; label: string }) => `${p.ref} ${p.label}`).join('; ') || '—'}</td>
										<td class="py-2 pr-3 text-right font-semibold">{risk.control_cost_label}</td>
										{#each risk.objective_costs as cost}<td class="py-2 pr-3 text-right">{cost.label}</td>{/each}
									</tr>
								{/each}
								<tr class="border-t-2 border-gray-200 font-semibold">
									<td class="py-2 pr-3">Total</td>
									<td></td>
									<td class="py-2 pr-3 text-right">{summary.total_control_cost_label}</td>
									{#each report.objectives as objective}<td class="py-2 pr-3 text-right">{objective.label}</td>{/each}
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		{/if}

		{#if sections.includes('cost_effectiveness')}
			<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{@render sectionTitle('cost_effectiveness', 'fa-solid fa-scale-balanced', 'Cost-effectiveness of control spend', `Cost per point = annual control cost ÷ (inherent score − current score).${summary.average_per_point ? ` Average: ${summary.average_per_point_label} per point.` : ''}`)}
				{#if report.effectiveness.length === 0}
					{@render empty('No costed controls are linked to the top risks.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr><th class="py-2 pr-3">ID</th><th class="py-2 pr-3">Risk</th><th class="py-2 pr-3 text-right">Control cost</th><th class="py-2 pr-3 text-right">Inherent → current</th><th class="py-2 pr-3 text-right">Points reduced</th><th class="py-2 pr-3 text-right">Cost per point</th><th class="py-2">Flags</th></tr>
							</thead>
							<tbody>
								{#each report.effectiveness as item}
									<tr class="border-t border-gray-100">
										<td class="py-2 pr-3"><a href={item.href} class="font-semibold text-blue-700 hover:underline">{item.ref_id || '—'}</a></td>
										<td class="py-2 pr-3 text-gray-900">{item.name}</td>
										<td class="py-2 pr-3 text-right">{item.cost_label}</td>
										<td class="py-2 pr-3 text-right">{item.inherent ?? '—'} → {item.current ?? '—'}</td>
										<td class="py-2 pr-3 text-right">{item.reduction ?? '—'}</td>
										<td class="py-2 pr-3 text-right">{item.cost_per_point_label}</td>
										<td class="py-2">
											{#each item.flags as flag}
												<span class="mr-1 mb-1 inline-block rounded bg-amber-50 px-1.5 text-xs text-amber-800">{flag}</span>
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
				{@render sectionTitle('treatment', 'fa-solid fa-list-check', 'Treatment plan', `${report.tolerance ? 'Top risks above tolerance, with their planned applied controls.' : 'Top risks with planned applied controls (no risk tolerance set).'} Extra annual cost: ${summary.total_extra_label}.`)}
				{#if report.treatment.length === 0}
					{@render empty(report.tolerance ? 'No top risk is above tolerance.' : 'No planned treatment controls on the top risks.')}
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="text-left text-xs uppercase text-gray-500">
								<tr><th class="py-2 pr-3">Risk</th><th class="py-2 pr-3">Current</th><th class="py-2 pr-3">Treatment</th><th class="py-2 pr-3 text-right">Extra annual cost</th><th class="py-2 pr-3">Target residual</th><th class="py-2 pr-3">Owner</th><th class="py-2">Target date</th></tr>
							</thead>
							<tbody>
								{#each report.treatment as item}
									<tr class="border-t border-gray-100 align-top">
										<td class="py-2 pr-3 text-gray-900"><a href={item.href} class="font-semibold text-blue-700 hover:underline">{item.ref_id || item.name}</a>{#if item.ref_id} {item.name}{/if}</td>
										<td class="py-2 pr-3">{@render level(item.current)}</td>
										<td class="py-2 pr-3">
											<span class="font-medium">{item.treatment_label}</span>
											{#each item.controls as control}
												<a href={control.href} class="block text-xs text-gray-600 hover:underline">{control.ref_id ? `${control.ref_id} · ` : ''}{control.name} [{control.status_label}]</a>
											{:else}<span class="block text-xs text-gray-400">No planned controls</span>{/each}
										</td>
										<td class="py-2 pr-3 text-right">{item.extra_cost_label}</td>
										<td class="py-2 pr-3">
											{@render level(item.residual)}
											{#if item.residual_above}<span class="block text-xs font-semibold text-red-600">Still above tolerance</span>{/if}
										</td>
										<td class="py-2 pr-3">{item.owners.join(', ') || '—'}</td>
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
