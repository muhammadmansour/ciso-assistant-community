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
		critical: 'border-s-red-600',
		high: 'border-s-orange-500'
	};

	const resultAbbr: Record<string, () => string> = {
		compliant: m.rptAbbrCompliant,
		partially_compliant: m.rptAbbrPartial,
		non_compliant: m.rptAbbrNonCompliant,
		not_applicable: m.rptAbbrNotApplicable
	};

	function abbr(result: string) {
		return resultAbbr[result]?.() ?? '—';
	}

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

	function domainLine(domain: { ref_id: string; name: string; ratio: number } | null) {
		return domain ? `${domain.ref_id} ${domain.name} — ${domain.ratio}%`.trim() : '—';
	}

	const severityShort = $derived(
		(report.severity_counts ?? [])
			.filter((s: { count: number }) => s.count)
			.map((s: { count: number; short: string; key: string }) =>
				isEnglish() ? `${s.count}${s.short}` : `${s.count} ${label(s.key, s.short)}`
			)
			.join(' ')
	);

	const sections = $derived<string[]>(report.sections ?? []);
	const sectionNumbers = $derived<Record<string, number>>(report.section_numbers ?? {});

	function downloadHref(format: 'pdf' | 'xlsx' | 'docx') {
		const params = new URLSearchParams({
			format,
			assessment: report.assessment.id,
			sections: sections.join(','),
			lang: getLocale()
		});
		return `/reports/audit/download?${params.toString()}`;
	}
</script>

{#snippet sectionTitle(index: string, icon: string, title: string, purpose: string, note: string)}
	<div class="mb-3">
		<h2 class="text-lg font-semibold text-gray-900">
			<span class="text-blue-600">{index}.</span>
			<i class="{icon} mx-1 text-blue-600"></i>{title}
		</h2>
		<p class="text-sm text-gray-700">{purpose}</p>
		<p class="text-xs text-gray-500">{note}</p>
	</div>
{/snippet}

{#snippet empty(text: string)}
	<p class="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">{text}</p>
{/snippet}

{#snippet pill(text: string, classes: string)}
	<span class="inline-block whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium {classes}">{text}</span>
{/snippet}

{#snippet sep()}<span class="inline-block rtl:rotate-180">›</span>{/snippet}

<div class="report-page px-4 py-6 space-y-6 max-w-6xl mx-auto">
	<div class="flex items-center justify-between gap-4">
		<p class="text-sm text-gray-500">
			<a href="/reports" class="hover:text-blue-700">{m.reports()}</a>
			{@render sep()} <a href="/reports/audit" class="hover:text-blue-700">{m.rptAuditReport()}</a>
			{@render sep()} {m.rptOutcome()}
		</p>
		<a href="/reports/audit" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
			{m.back()}
		</a>
	</div>

	{#if !report.assessment}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			{m.rptNoComplianceAssessment()}
		</div>
	{:else}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="flex items-start gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
						<i class="fa-solid fa-clipboard-check"></i>
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-900" dir="auto">
							{#if report.assessment.framework_ref}{report.assessment.framework_ref} — {/if}{report.assessment.name}
						</h1>
						<p class="text-sm text-gray-500">
							<bdi>{report.assessment.framework}</bdi> ·
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
					[m.rptAssessmentStatus(), `${label(report.assessment.status_key, report.assessment.status || '—')} · ${m.rptReviewedPct({ pct: report.summary.reviewed_pct })}`],
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
					<div class="text-2xl font-bold {ratioClass(report.summary.ratio)}">{pct(report.summary.ratio)}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptComplianceRatio()}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{report.summary.assessed}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">
						{m.rptControlsAssessed()}{#if report.summary.not_assessed} · {m.rptPending({ count: report.summary.not_assessed })}{/if}
					</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">
						{report.summary.compliant} · {report.summary.partially_compliant} · {report.summary.non_compliant} · {report.summary.not_applicable}
					</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">
						{m.rptAbbrCompliant()} · {m.rptAbbrPartial()} · {m.rptAbbrNonCompliant()} · {m.rptAbbrNotApplicable()}
					</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold {report.findings.length ? 'text-amber-600' : 'text-gray-900'}">{report.findings.length}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.findings()}{#if severityShort} · {severityShort}{/if}</div>
				</div>
				<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div class="text-2xl font-bold text-gray-900">{report.observations.length}</div>
					<div class="text-xs uppercase tracking-wide text-gray-500 mt-1">{m.rptObservations()}</div>
				</div>
			</div>
		</div>

		{#if sections.includes('summary')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.summary), 'fa-solid fa-chart-simple', m.summary(), m.rptSummaryPurpose(), m.rptSummaryNote())}
			<table class="w-full text-sm">
				<thead class="text-xs uppercase text-gray-500">
					<tr><th class="py-2 pe-3 w-1/4">{m.rptHeadline()}</th><th class="py-2">{m.rptResult()}</th></tr>
				</thead>
				<tbody>
					<tr class="border-t border-gray-100">
						<td class="py-2 pe-3 font-medium">{m.rptComplianceRatio()}</td>
						<td class="py-2">
							{#if report.summary.ratio !== null}
								<strong>{report.summary.ratio}%</strong>
								<bdi dir="ltr" class="text-gray-500">= ({report.summary.compliant} + 0.5×{report.summary.partially_compliant}) / {report.summary.assessable}</bdi>
							{:else}
								<span class="text-gray-400">{m.rptNoAnswersYet()}</span>
							{/if}
						</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pe-3 font-medium">{m.rptControlsAssessed()}</td>
						<td class="py-2">
							{m.rptAssessedDetail({ assessed: report.summary.assessed, na: report.summary.not_applicable })}
							{#if report.summary.not_assessed}<span class="text-gray-400"> · {m.rptNotAssessedYet({ count: report.summary.not_assessed, total: report.summary.total })}</span>{/if}
						</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pe-3 font-medium">{m.rptStrongestDomain()}</td>
						<td class="py-2">{domainLine(report.summary.strongest)}</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pe-3 font-medium">{m.rptWeakestDomain()}</td>
						<td class="py-2">{domainLine(report.summary.weakest)}</td>
					</tr>
					<tr class="border-t border-gray-100">
						<td class="py-2 pe-3 font-medium">{m.findings()}</td>
						<td class="py-2 flex flex-wrap items-center gap-1.5">
							<span>{report.findings.length} —</span>
							{#each report.severity_counts as s}{@render pill(label(s.key, s.label), severityClass[s.key])}{/each}
							<bdi dir="ltr" class="text-gray-500">({report.severity_counts.map((s: { count: number }) => s.count).join(' / ')})</bdi>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		{/if}

		{#if sections.includes('domains')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.domains), 'fa-solid fa-sitemap', m.rptResultsByDomain(), m.rptDomainsPurpose(), m.rptDomainsNote())}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr>
							<th class="py-2 pe-3">{m.domain()}</th>
							<th class="py-2 pe-3">{m.rptControls()}</th>
							<th class="py-2 pe-3">{m.rptAbbrCompliant()}</th>
							<th class="py-2 pe-3">{m.rptAbbrPartial()}</th>
							<th class="py-2 pe-3">{m.rptAbbrNonCompliant()}</th>
							<th class="py-2 pe-3">{m.rptAbbrNotApplicable()}</th>
							<th class="py-2 pe-3">{m.rptRatio()}</th>
							<th class="py-2">{m.findings()}</th>
						</tr>
					</thead>
					<tbody>
						{#each report.domains as domain}
							<tr class="border-t border-gray-100 {report.summary.weakest?.index === domain.index ? 'bg-red-50' : ''}">
								<td class="py-2 pe-3 text-gray-900">
									{domain.ref_id} {domain.name}
									{#if domain.not_assessed}<span class="block text-xs text-gray-400">{m.rptNotAssessedCount({ count: domain.not_assessed })}</span>{/if}
								</td>
								<td class="py-2 pe-3">{domain.assessed}</td>
								<td class="py-2 pe-3">{domain.compliant}</td>
								<td class="py-2 pe-3">{domain.partially_compliant}</td>
								<td class="py-2 pe-3">{domain.non_compliant}</td>
								<td class="py-2 pe-3">{domain.not_applicable}</td>
								<td class="py-2 pe-3 font-semibold">{pct(domain.ratio)}</td>
								<td class="py-2 text-blue-700">{domain.findings.join(', ') || '—'}</td>
							</tr>
						{/each}
						<tr class="border-t-2 border-gray-200 font-semibold">
							<td class="py-2 pe-3">{m.total()}</td>
							<td class="py-2 pe-3">{report.summary.assessed}</td>
							<td class="py-2 pe-3">{report.summary.compliant}</td>
							<td class="py-2 pe-3">{report.summary.partially_compliant}</td>
							<td class="py-2 pe-3">{report.summary.non_compliant}</td>
							<td class="py-2 pe-3">{report.summary.not_applicable}</td>
							<td class="py-2 pe-3">{pct(report.summary.ratio)}</td>
							<td class="py-2">{report.findings.length}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
		{/if}

		{#if sections.includes('findings')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
			{@render sectionTitle(String(sectionNumbers.findings), 'fa-solid fa-triangle-exclamation', m.findings(), m.rptFindingsPurpose(), m.rptFindingsNote())}
			{#if report.findings.length === 0}
				{@render empty(m.rptNoFindings())}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3">ID</th><th class="py-2 pe-3">{m.rptTitle()}</th><th class="py-2 pe-3">{m.severity()}</th><th class="py-2">{m.status()}</th></tr>
					</thead>
					<tbody>
						{#each report.findings as finding}
							<tr class="border-t border-gray-100">
								<td class="py-2 pe-3"><a href={finding.href} class="font-semibold text-blue-700 hover:underline">{finding.code}</a></td>
								<td class="py-2 pe-3 text-gray-900">{finding.name}</td>
								<td class="py-2 pe-3">{@render pill(label(finding.severity_key, finding.severity_label), severityClass[finding.severity_key])}</td>
								<td class="py-2">{@render pill(label(finding.status, finding.status_label), statusClass[finding.status_tone])}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				{#if report.detailed_findings.length}
					<h3 class="font-semibold text-gray-900">{m.rptDetailsCriticalHigh()}</h3>
					<div class="space-y-3">
						{#each report.detailed_findings as finding}
							<div class="rounded-lg border border-gray-200 border-s-4 {cardBorder[finding.severity_key]} p-4">
								<div class="mb-2 flex items-start justify-between gap-3">
									<div class="font-semibold text-gray-900" dir="auto">
										<a href={finding.href} class="text-blue-700 hover:underline">{finding.code}</a>
										{finding.name}
									</div>
									{@render pill(label(finding.severity_key, finding.severity_label), severityClass[finding.severity_key])}
								</div>
								<dl class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-1.5 text-sm">
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">{m.description()}</dt>
									<dd class="text-gray-800 whitespace-pre-line" dir="auto">{finding.description || '—'}</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">{m.rptRequirementObs()}</dt>
									<dd class="text-gray-700" dir="auto">
										{#each finding.requirements as req, i}
											<a href={req.href} class="hover:underline">{req.ref_id}</a>: {req.observation ? `${req.observation} ` : ''}({abbr(req.result)}){i < finding.requirements.length - 1 ? '; ' : ''}
										{:else}—{/each}
									</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">{m.rptAppliedControl()}</dt>
									<dd>
										{#each finding.controls as control}
											<div class="flex flex-wrap items-center gap-1.5">
												<a href={control.href} class="font-medium text-gray-900 hover:underline" dir="auto">{control.name}</a>
												{@render pill(label(control.status, control.status_label), controlClass(control.status))}
												<span class="text-xs text-gray-500">· {m.rptOwnerEta({ owners: control.owners.join(', ') || '—', eta: control.eta ?? '—' })}</span>
											</div>
										{:else}<span class="text-gray-400">{m.rptNoneLinked()}</span>{/each}
									</dd>
									<dt class="text-xs uppercase tracking-wide text-gray-500 pt-0.5">{m.evidence()}</dt>
									<dd>
										{#if finding.evidence.length}
											{#each finding.evidence as name}<span class="me-3 inline-flex items-center gap-1 text-blue-700" dir="auto"><i class="fa-regular fa-file"></i>{name}</span>{/each}
										{:else}<span class="text-gray-400">{m.rptNoneAttached()}</span>{/if}
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
			{@render sectionTitle(String(sectionNumbers.observations), 'fa-solid fa-eye', m.rptObservations(), m.rptObservationsPurpose(), m.rptObservationsNote())}
			{#if report.observations.length === 0}
				{@render empty(m.rptNoObservations())}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3 w-28">ID</th><th class="py-2">{m.rptObservation()}</th></tr>
					</thead>
					<tbody>
						{#each report.observations as observation}
							<tr class="border-t border-gray-100">
								<td class="py-2 pe-3"><a href={observation.href} class="hover:underline">{observation.ref_id}</a></td>
								<td class="py-2 text-gray-900">{observation.observation || m.rptNoObservationRecorded()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</section>
		{/if}

		{#if sections.includes('action_plan')}
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			{@render sectionTitle(String(sectionNumbers.action_plan), 'fa-solid fa-list-check', m.actionPlan(), m.rptActionPlanPurpose(), m.rptActionPlanNote())}
			{#if report.action_plan.length === 0}
				{@render empty(m.rptNoPendingControls())}
			{:else}
				<table class="w-full text-sm">
					<thead class="text-xs uppercase text-gray-500">
						<tr><th class="py-2 pe-3">{m.rptAppliedControl()}</th><th class="py-2 pe-3">{m.rptLinkedFindings()}</th><th class="py-2 pe-3">{m.owner()}</th><th class="py-2 pe-3">{m.eta()}</th><th class="py-2">{m.status()}</th></tr>
					</thead>
					<tbody>
						{#each report.action_plan as control}
							<tr class="border-t border-gray-100">
								<td class="py-2 pe-3"><a href={control.href} class="text-gray-900 hover:underline">{control.name}</a></td>
								<td class="py-2 pe-3 font-semibold text-blue-700">{control.findings.join(', ')}</td>
								<td class="py-2 pe-3">{control.owners.join(', ') || '—'}</td>
								<td class="py-2 pe-3">{control.eta ?? '—'}</td>
								<td class="py-2">{@render pill(label(control.status, control.status_label), controlClass(control.status))}</td>
							</tr>
						{/each}
					</tbody>
				</table>
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
</style>
