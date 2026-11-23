<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const report = data.report;
	let selectedId = $state(report.domains[0]?.id ?? '');
	const domain = $derived(report.domains.find((item) => item.id === selectedId) ?? report.domains[0]);

	const statusLabel: Record<string, string> = {
		covered: 'Implemented',
		documented: 'Policy recorded',
		partial: 'In progress',
		planned: 'Not started',
		gap: 'No record'
	};

	const statusClass: Record<string, string> = {
		covered: 'bg-green-50 text-green-700 border-green-200',
		documented: 'bg-blue-50 text-blue-700 border-blue-200',
		partial: 'bg-amber-50 text-amber-700 border-amber-200',
		planned: 'bg-gray-50 text-gray-600 border-gray-200',
		gap: 'bg-red-50 text-red-700 border-red-200'
	};

	function downloadHref(folderId: string) {
		return `/reports/nca-ecc/download?folder=${encodeURIComponent(folderId)}`;
	}
</script>

<div class="px-4 py-6 space-y-6 max-w-5xl mx-auto">
	<div class="flex items-start justify-between gap-4">
		<div>
			<p class="text-sm text-gray-500">{report.framework.provider} · {report.framework.edition}</p>
			<h1 class="text-3xl font-bold text-gray-900">Essential Cybersecurity Controls</h1>
			<p class="mt-1 text-gray-600" dir="rtl">{report.framework.arabic_name}</p>
		</div>
		<a href="/reports" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 shrink-0">
			<i class="fa-solid fa-arrow-left"></i>
			Back to Reports
		</a>
	</div>

	<p class="text-sm text-gray-600">
		Readiness against the National Cybersecurity Authority controls, using the applied controls and
		documents already stored in each domain. A subdomain stays a gap when nothing in that domain
		matches it. This is not a completed compliance assessment and not an NCA filing.
	</p>

	{#if report.domains.length === 0}
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-600">
			No domain with controls or documents is visible to this account.
		</div>
	{:else if domain}
		<div class="flex flex-wrap items-end justify-between gap-4">
			<label class="block text-sm text-gray-700">
				Domain
				<select
					class="mt-1 block rounded-lg border border-gray-300 bg-white px-3 py-2"
					bind:value={selectedId}
				>
					{#each report.domains as item}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
			</label>
			<a
				href={downloadHref(domain.id)}
				class="px-5 py-2.5 rounded-lg bg-[#0A1628] text-white hover:bg-[#1a2740]"
			>
				<i class="fa-solid fa-download mr-2"></i>
				Download Excel
			</a>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
			{#each [
				['Implemented', domain.summary.covered, 'text-green-700 bg-green-50 border-green-200'],
				['Policy recorded', domain.summary.documented, 'text-blue-700 bg-blue-50 border-blue-200'],
				['In progress', domain.summary.partial, 'text-amber-700 bg-amber-50 border-amber-200'],
				['Not started', domain.summary.planned, 'text-gray-600 bg-gray-50 border-gray-200'],
				['No record', domain.summary.gap, 'text-red-700 bg-red-50 border-red-200']
			] as card}
				<div class="rounded-lg border p-4 text-center {card[2]}">
					<div class="text-2xl font-bold">{card[1]}</div>
					<div class="text-xs mt-1">{card[0]}</div>
				</div>
			{/each}
		</div>

		<p class="text-sm text-gray-500">
			{domain.summary.controls} applied controls and {domain.summary.documents} documents in
			{domain.name}. {domain.summary.unmapped} of them do not map to an ECC subdomain.
		</p>

		{#each domain.sections as section}
			<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
				<h2 class="text-lg font-semibold text-gray-900">
					{section.ref_id}. {section.name}
				</h2>
				{#each section.subdomains as subdomain}
					<div class="rounded-lg border border-gray-100 p-4">
						<div class="flex items-start justify-between gap-3">
							<div>
								<div class="text-sm font-medium text-gray-900">
									{subdomain.ref_id} {subdomain.name}
								</div>
							</div>
							<span class="shrink-0 rounded-full border px-2 py-0.5 text-xs {statusClass[subdomain.status]}">
								{statusLabel[subdomain.status]}
							</span>
						</div>
						{#if subdomain.evidence.length > 0}
							<ul class="mt-3 space-y-1">
								{#each subdomain.evidence as item}
									<li class="text-sm text-gray-700">
										<a href={item.href} class="text-blue-700 hover:underline">{item.name}</a>
										<span class="text-gray-400">
											· {item.kind === 'document' ? 'document' : item.record_status || 'control'}
										</span>
										{#if item.observation}
											<span class="text-gray-500"> — {item.observation}</span>
										{/if}
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		{/each}

		{#if domain.unmapped.length > 0}
			<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 class="text-lg font-semibold text-gray-900 mb-3">Not mapped to ECC</h2>
				<ul class="space-y-1 text-sm text-gray-700">
					{#each domain.unmapped as item}
						<li>
							<a href={item.href} class="text-blue-700 hover:underline">{item.name}</a>
							<span class="text-gray-400">· {item.kind}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/if}
</div>
