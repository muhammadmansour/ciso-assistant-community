<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const report = $derived(data.report);

	const severityClass: Record<string, string> = {
		critical: 'bg-red-50 text-red-700 border-red-200',
		high: 'bg-orange-50 text-orange-700 border-orange-200',
		medium: 'bg-amber-50 text-amber-700 border-amber-200',
		low: 'bg-blue-50 text-blue-700 border-blue-200',
		info: 'bg-gray-50 text-gray-600 border-gray-200'
	};
	const statusClass: Record<string, string> = {
		open: 'bg-red-50 text-red-700 border-red-200',
		progress: 'bg-amber-50 text-amber-700 border-amber-200',
		done: 'bg-green-50 text-green-700 border-green-200',
		muted: 'bg-gray-50 text-gray-600 border-gray-200'
	};
	const cardBorder: Record<string, string> = {
		critical: 'border-l-red-600',
		high: 'border-l-orange-500'
	};

	function controlClass(status: string) {
		return status === 'active'
			? 'bg-green-50 text-green-700 border-green-200'
			: 'bg-blue-50 text-blue-700 border-blue-200';
	}

	function ratioClass(ratio: number | null) {
		if (ratio === null || ratio === undefined) return 'text-gray-900';
		if (ratio >= 80) return 'text-green-600';
		if (ratio >= 60) return 'text-amber-600';
		return 'text-red-600';
	}

	function pct(ratio: number | null) {
		return ratio === null || ratio === undefined ? '—' : `${ratio}%`;
	}

	const severityShort = $derived(
		(report.severity_counts ?? [])
			.filter((s: { count: number }) => s.count)
			.map((s: { count: number; short: string }) => `${s.count}${s.short}`)
			.join(' ')
	);

	const sections = $derived<string[]>(report.sections ?? []);
	const sectionNumbers = $derived<Record<string, number>>(report.section_numbers ?? {});

	function downloadHref(format: 'pdf' | 'xlsx') {
		const params = new URLSearchParams({
			format,
			assessment: report.assessment.id,
			sections: sections.join(',')
		});
		return `/reports/audit/download?${params.toString()}`;
	}
</script>

{#snippet sectionTitle(index: string, icon: string, title: string, note: string)}
	<div class="mb-3">
		<h2 class="text-lg font-semibold text-gray-900">
			<span class="text-blue-600">{index}.</span>
			<i class="{icon} mx-1 text-blue-600"></i>{title}
		</h2>
		<p class="text-xs text-gray-500">{note}</p>
	</div>
{/snippet}

{#snippet empty(text: string)}
	<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">{text}</p>
{/snippet}

{#snippet pill(text: string, classes: string)}
	<span class="inline-block whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium {classes}">{text}</span>
{/snippet}

<div class="px-4 py-6 space-y-6 max-w-6xl mx-auto">
	<div class="flex items-center justify-between gap-4">
		<p class="text-sm text-gray-500">
			<a href="/reports" class="hover:text-blue-700">Reports</a>
			› <a href="/reports/audit" class="hover:text-blue-700">Audit Report</a>
			› Outcome
		</p>
		<a href="/reports/audit" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left"></i>
			Back
		</a>
	</div>

	{#if !report.assessment}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			No compliance assessment is visible to this account.
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="flex items-start gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
						<i class="fa-solid fa-clipboard-check"></i>
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-900">
							{#if report.assessment.framework_ref}{report.assessment.framework_ref} — {/if}{report.assessment.name}
						</h1>
						<p class="text-sm text-gray-500">
							{report.assessment.framework} · Generated {report.generated_on}
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
					['Assessment status', `${report.assessment.status || '—'} · ${report.summary.reviewed_pct}% reviewed`],
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
					<div class="text-2xl font-bold {ratioClass(report.summary.ratio)}">{pct(report.summary.ratio)}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Compliance ratio</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{report.summary.assessed}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">
						Controls assessed{#if report.summary.not_assessed} · {report.summary.not_assessed} pending{/if}
					</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">
						{report.summary.compliant} · {report.summary.partially_compliant} · {report.summary.non_compliant} · {report.summary.not_applicable}
					</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">I · PI · NI · N/A</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold {report.findings.length ? 'text-amber-600' : 'text-gray-900'}">{report.findings.length}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Findings{#if severityShort} · {severityShort}{/if}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{report.observations.length}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">Observations</div>
				</div>
			</div>
		</div>

		{#if sections.includes('summary')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.summary), 'fa-solid fa-chart-simple', 'Summary', 'Computed from requirement answers: ratio = (I + 0.5×PI) / assessable, N/A excluded.')}
			<table class="w-full text-sm">
				<thead class="text-left text-xs uppercase text-gray-500">
					<tr><th class="py-2 pr-3 w-1/4">Headline</th><th class="py-2">Result</th></tr>
				</thead>
				<tbody>
					<tr class="border-t border-gray-100">
						<td class="py-2 pr-3 font-medium">Compliance ratio</td>
						<td class="py-2">
							{#if report.summary.ratio !== null}
								<strong>{report.summary.ratio}%</strong>
								<span class="text-gray-500">= ({report.summary.compliant} + 0.5×{report.summary.partially_compliant}) / {report.summary.assessable}</span>
							{:else}
								<span class="text-gray-400">No implemented, partial or non-implemented answers yet</span>
							{/if}
						</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pr-3 font-medium">Controls assessed</td>
						<td class="py-2">
							{report.summary.assessed} ({report.summary.not_applicable} not applicable)
							{#if report.summary.not_assessed}<span class="text-gray-400"> · {report.summary.not_assessed} of {report.summary.total} not assessed yet</span>{/if}
						</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pr-3 font-medium">Strongest domain</td>
						<td class="py-2">{report.summary.strongest ? `${report.summary.strongest.ref_id} ${report.summary.strongest.name} — ${report.summary.strongest.ratio}%` : '—'}</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pr-3 font-medium">Weakest domain</td>
						<td class="py-2">{report.summary.weakest ? `${report.summary.weakest.ref_id} ${report.summary.weakest.name} — ${report.summary.weakest.ratio}%` : '—'}</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pr-3 font-medium">Findings</td>
						<td class="py-2 flex flex-wrap items-center gap-1.5">
							<span>{report.findings.length} —</span>
							{#each report.severity_counts as s}{@render pill(s.label, severityClass[s.key])}{/each}
							<span class="text-gray-500">({report.severity_counts.map((s: { count: number }) => s.count).join(' / ')})</span>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		{/if}

		{#if sections.includes('domains')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.domains), 'fa-solid fa-sitemap', 'Results by domain', 'Requirement answers grouped by top-level framework node. Same ratio formula per group.')}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="text-left text-xs uppercase text-gray-500">
						<tr>
							<th class="py-2 pr-3">Domain</th>
							<th class="py-2 pr-3 text-right">Controls</th>
							<th class="py-2 pr-3 text-right">I</th>
							<th class="py-2 pr-3 text-right">PI</th>
							<th class="py-2 pr-3 text-right">NI</th>
							<th class="py-2 pr-3 text-right">N/A</th>
							<th class="py-2 pr-3 text-right">Ratio</th>
							<th class="py-2">Findings</th>
						</tr>
					</thead>
					<tbody>
						{#each report.domains as domain}
							<tr class="border-t border-gray-100 {report.summary.weakest?.index === domain.index ? 'bg-red-50' : ''}">
								<td class="py-2 pr-3 text-gray-900">
									{domain.ref_id} {domain.name}
									{#if domain.not_assessed}<span class="block text-xs text-gray-400">{domain.not_assessed} not assessed</span>{/if}
								</td>
								<td class="py-2 pr-3 text-right">{domain.assessed}</td>
								<td class="py-2 pr-3 text-right">{domain.compliant}</td>
								<td class="py-2 pr-3 text-right">{domain.partially_compliant}</td>
								<td class="py-2 pr-3 text-right">{domain.non_compliant}</td>
								<td class="py-2 pr-3 text-right">{domain.not_applicable}</td>
								<td class="py-2 pr-3 text-right font-semibold">{pct(domain.ratio)}</td>
								<td class="py-2 text-blue-700">{domain.findings.join(', ') || '—'}</td>
							</tr>
						{/each}
						<tr class="border-t-2 border-gray-200 font-semibold">
							<td class="py-2 pr-3">Total</td>
							<td class="py-2 pr-3 text-right">{report.summary.assessed}</td>
							<td class="py-2 pr-3 text-right">{report.summary.compliant}</td>
							<td class="py-2 pr-3 text-right">{report.summary.partially_compliant}</td>
							<td class="py-2 pr-3 text-right">{report.summary.non_compliant}</td>
							<td class="py-2 pr-3 text-right">{report.summary.not_applicable}</td>
							<td class="py-2 pr-3 text-right">{pct(report.summary.ratio)}</td>
							<td class="py-2">{report.findings.length}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
		{/if}

		{#if sections.includes('findings')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
			{@render sectionTitle(String(sectionNumbers.findings), 'fa-solid fa-triangle-exclamation', 'Findings', "Findings recorded in the follow-up module. Owner and ETA come from each finding's linked applied control.")}
			{#if report.findings.length === 0}
				{@render empty("No findings are linked to this assessment's requirements or applied controls.")}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-left text-xs uppercase text-gray-500">
						<tr><th class="py-2 pr-3">ID</th><th class="py-2 pr-3">Title</th><th class="py-2 pr-3">Severity</th><th class="py-2">Status</th></tr>
					</thead>
					<tbody>
						{#each report.findings as finding}
							<tr class="border-t border-gray-100">
								<td class="py-2 pr-3"><a href={finding.href} class="font-semibold text-blue-700 hover:underline">{finding.code}</a></td>
								<td class="py-2 pr-3 text-gray-900">{finding.name}</td>
								<td class="py-2 pr-3">{@render pill(finding.severity_label, severityClass[finding.severity_key])}</td>
								<td class="py-2">{@render pill(finding.status_label, statusClass[finding.status_tone])}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				{#if report.detailed_findings.length}
					<h3 class="font-semibold text-gray-900">Details — Critical & High</h3>
					<div class="space-y-3">
						{#each report.detailed_findings as finding}
							<div class="rounded-lg border border-gray-200 border-l-4 {cardBorder[finding.severity_key]} p-4">
								<div class="mb-2 flex items-start justify-between gap-3">
									<div class="font-semibold text-gray-900">
										<a href={finding.href} class="text-blue-700 hover:underline">{finding.code}</a>
										{finding.name}
									</div>
									{@render pill(finding.severity_label, severityClass[finding.severity_key])}
								</div>
								<dl class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-1.5 text-sm">
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">Description</dt>
									<dd class="text-gray-800 whitespace-pre-line">{finding.description || '—'}</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">Requirement obs.</dt>
									<dd class="text-gray-700">
										{#each finding.requirements as req, i}
											<a href={req.href} class="hover:underline">{req.ref_id}</a>: {req.observation ? `${req.observation} ` : ''}({req.abbr}){i < finding.requirements.length - 1 ? '; ' : ''}
										{:else}—{/each}
									</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">Applied control</dt>
									<dd>
										{#each finding.controls as control}
											<div class="flex flex-wrap items-center gap-1.5">
												<a href={control.href} class="font-medium text-gray-900 hover:underline">{control.name}</a>
												{@render pill(control.status_label, controlClass(control.status))}
												<span class="text-xs text-gray-500">· owner {control.owners.join(', ') || '—'} · ETA {control.eta ?? '—'}</span>
											</div>
										{:else}<span class="text-gray-400">None linked</span>{/each}
									</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">Evidence</dt>
									<dd>
										{#if finding.evidence.length}
											{#each finding.evidence as name}<span class="mr-3 inline-flex items-center gap-1 text-blue-700"><i class="fa-regular fa-file"></i>{name}</span>{/each}
										{:else}<span class="text-gray-400">None attached</span>{/if}
									</dd>
								</dl>
							</div>
						{/each}
					</div>
				{/if}
			{/if}
		</section>
		{/if}

		{#if sections.includes('observations')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.observations), 'fa-solid fa-eye', 'Observations', "Requirement answers marked Partially implemented with no linked finding; text is the requirement's observation field, verbatim.")}
			{#if report.observations.length === 0}
				{@render empty('No partially implemented requirements without a finding.')}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-left text-xs uppercase text-gray-500">
						<tr><th class="py-2 pr-3 w-20">ID</th><th class="py-2 pr-3 w-28">Ref</th><th class="py-2">Observation</th></tr>
					</thead>
					<tbody>
						{#each report.observations as observation}
							<tr class="border-t border-gray-100">
								<td class="py-2 pr-3 text-gray-500">{observation.code}</td>
								<td class="py-2 pr-3"><a href={observation.href} class="hover:underline">{observation.ref_id}</a></td>
								<td class="py-2 text-gray-900">{observation.observation || 'No observation recorded'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</section>
		{/if}

		{#if sections.includes('action_plan')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.action_plan), 'fa-solid fa-list-check', 'Action plan', "All non-active applied controls linked to this assessment's findings, sorted by ETA.")}
			{#if report.action_plan.length === 0}
				{@render empty('No pending applied controls are linked to the findings.')}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-left text-xs uppercase text-gray-500">
						<tr><th class="py-2 pr-3">Applied control</th><th class="py-2 pr-3">Linked findings</th><th class="py-2 pr-3">Owner</th><th class="py-2 pr-3">ETA</th><th class="py-2">Status</th></tr>
					</thead>
					<tbody>
						{#each report.action_plan as control}
							<tr class="border-t border-gray-100">
								<td class="py-2 pr-3"><a href={control.href} class="text-gray-900 hover:underline">{control.name}</a></td>
								<td class="py-2 pr-3 font-semibold text-blue-700">{control.findings.join(', ')}</td>
								<td class="py-2 pr-3">{control.owners.join(', ') || '—'}</td>
								<td class="py-2 pr-3">{control.eta ?? '—'}</td>
								<td class="py-2">{@render pill(control.status_label, controlClass(control.status))}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</section>
		{/if}
	{/if}
</div>
