<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const report = $derived(data.report);
	let showAll = $state(false);

	const coverageClass: Record<string, string> = {
		proven: 'bg-green-50 text-green-700 border-green-200',
		pending: 'bg-amber-50 text-amber-700 border-amber-200',
		weak: 'bg-orange-50 text-orange-700 border-orange-200',
		none: 'bg-red-50 text-red-700 border-red-200'
	};

	const statusClass: Record<string, string> = {
		approved: 'bg-green-50 text-green-700 border-green-200',
		in_review: 'bg-blue-50 text-blue-700 border-blue-200',
		draft: 'bg-gray-50 text-gray-600 border-gray-200',
		missing: 'bg-orange-50 text-orange-700 border-orange-200',
		rejected: 'bg-red-50 text-red-700 border-red-200',
		expired: 'bg-red-50 text-red-700 border-red-200'
	};

	const flagged = $derived(
		(report.evidence ?? []).filter((item: { issues: string[] }) =>
			item.issues.some((issue: string) => issue !== 'no_owner')
		)
	);
	const visibleRequirements = $derived(
		(report.requirements ?? []).filter(
			(row: { evidence: unknown[]; claimed_without_proof: boolean }) =>
				showAll || row.evidence.length > 0 || row.claimed_without_proof
		)
	);

	function label(value: string) {
		return value.replaceAll('_', ' ');
	}

	function selectAssessment(id: string) {
		goto(`/reports/evidence?assessment=${encodeURIComponent(id)}`);
	}
</script>

<div class="px-4 py-6 space-y-6 max-w-6xl mx-auto">
	<div class="flex items-start justify-between gap-4">
		<div>
			<p class="text-sm text-gray-500">Evidence coverage</p>
			<h1 class="text-3xl font-bold text-gray-900">
				{report.assessment?.name ?? 'Evidence coverage'}
			</h1>
			{#if report.assessment}
				<p class="mt-1 text-gray-600">
					{report.assessment.framework} · {report.assessment.folder}
				</p>
			{/if}
		</div>
		<a href="/reports" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left"></i>
			Back to Reports
		</a>
	</div>

	<p class="text-sm text-gray-600">
		Which requirements of a compliance assessment are backed by evidence, and which evidence needs
		attention before an audit. A requirement counts as proven only when it has approved, unexpired
		evidence with a file or link attached.
	</p>

	{#if !report.assessment}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			No compliance assessment is visible to this account.
		</div>
	{:else}
		<div class="flex flex-wrap items-end justify-between gap-4">
			<label class="block text-sm text-gray-700">
				Assessment
				<select
					class="mt-1 block rounded-lg border border-gray-300 bg-white px-3 py-2"
					value={report.assessment.id}
					onchange={(event) => selectAssessment(event.currentTarget.value)}
				>
					{#each report.assessments as item}
						<option value={item.id}>
							{item.name} · {item.folder} ({item.evidence_count} evidence)
						</option>
					{/each}
				</select>
			</label>
			<div class="flex gap-3">
				<a
					href={report.assessment.href}
					class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
				>
					Open assessment
				</a>
				<a
					href={`/reports/evidence/download?assessment=${encodeURIComponent(report.assessment.id)}`}
					class="px-5 py-2.5 rounded-lg bg-[#0A1628] text-white hover:bg-[#1a2740]"
				>
					<i class="fa-solid fa-download mr-2"></i>
					Download Excel
				</a>
			</div>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
			{#each Object.entries(report.coverage_labels) as [key, text]}
				<div class="rounded-lg border p-4 text-center {coverageClass[key]}">
					<div class="text-2xl font-bold">{report.summary.coverage[key]}</div>
					<div class="text-xs mt-1">{text}</div>
				</div>
			{/each}
		</div>

		<p class="text-sm text-gray-500">
			{report.summary.requirements} assessable requirements, {report.summary.evidence} evidence records.
			{report.summary.unlinked_evidence} evidence records are attached to the assessment but not to a
			requirement.
			{#if report.summary.claimed_without_proof > 0}
				<span class="text-red-700 font-medium">
					{report.summary.claimed_without_proof} requirements are marked compliant without approved proof.
				</span>
			{/if}
		</p>

		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-3">Coverage by level</h2>
			<table class="w-full text-sm">
				<thead class="text-left text-gray-500">
					<tr>
						<th class="py-2 pr-3">Level</th>
						<th class="py-2 pr-3 text-right">Requirements</th>
						{#each Object.values(report.coverage_labels) as text}
							<th class="py-2 pr-3 text-right">{text}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each report.levels as level}
						<tr class="border-t border-gray-100">
							<td class="py-2 pr-3 text-gray-900">{level.ref_id} {level.name}</td>
							<td class="py-2 pr-3 text-right">{level.requirements}</td>
							{#each Object.keys(report.coverage_labels) as key}
								<td class="py-2 pr-3 text-right">{level[key]}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900">Evidence needing attention</h2>
			<p class="text-sm text-gray-500 mb-3">
				{#each Object.entries(report.issue_labels) as [key, text], index}
					{index > 0 ? ' · ' : ''}{text}: {report.summary.issues[key]}
				{/each}
			</p>
			{#if flagged.length === 0}
				<p class="text-sm text-gray-600">No evidence is expired, rejected, missing or without proof.</p>
			{:else}
				<ul class="divide-y divide-gray-100">
					{#each flagged as item}
						<li class="py-2 flex flex-wrap items-center justify-between gap-2 text-sm">
							<div>
								<a href={item.href} class="text-blue-700 hover:underline">{item.name}</a>
								<span class="text-gray-400"> · {item.requirements.join(', ') || 'no requirement'}</span>
								{#if item.expiry_date}
									<span class="text-gray-500"> · expires {item.expiry_date}</span>
								{/if}
							</div>
							<div class="flex flex-wrap gap-1">
								<span class="rounded-full border px-2 py-0.5 text-xs {statusClass[item.status]}">
									{label(item.status)}
								</span>
								{#each item.issues.filter((issue: string) => issue !== 'no_owner' && issue !== item.status) as issue}
									<span class="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
										{report.issue_labels[issue]}
									</span>
								{/each}
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<div class="flex items-center justify-between mb-3">
				<h2 class="text-lg font-semibold text-gray-900">Requirements</h2>
				<label class="text-sm text-gray-600 flex items-center gap-2">
					<input type="checkbox" bind:checked={showAll} />
					Include requirements without evidence
				</label>
			</div>
			<ul class="divide-y divide-gray-100">
				{#each visibleRequirements as row}
					<li class="py-3">
						<div class="flex items-start justify-between gap-3">
							<div class="text-sm">
								<a href={row.href} class="font-medium text-gray-900 hover:underline">
									{row.ref_id} {row.name}
								</a>
								<div class="text-xs text-gray-500">
									{row.group.name} · result: {label(row.result)}
								</div>
							</div>
							<span class="shrink-0 rounded-full border px-2 py-0.5 text-xs {coverageClass[row.coverage]}">
								{report.coverage_labels[row.coverage]}
							</span>
						</div>
						{#if row.evidence.length > 0}
							<ul class="mt-2 space-y-1">
								{#each row.evidence as item}
									<li class="text-sm text-gray-700">
										<a href={item.href} class="text-blue-700 hover:underline">{item.name}</a>
										<span class="text-gray-400"> · {label(item.status)}</span>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
