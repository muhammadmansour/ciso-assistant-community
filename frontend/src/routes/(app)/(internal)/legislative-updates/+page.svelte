<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import type { LegislativeUpdate } from './+page.server';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const items: LegislativeUpdate[] = $derived(data.items ?? []);

	// Filter state
	let fromDate = $state('');
	let toDate = $state('');
	let statusFilter = $state('all');
	let impactFilter = $state('all');
	let sourceFilter = $state('all');

	const allSources = $derived(
		Array.from(new Set(items.map((i) => i.source).filter((s): s is string => !!s)))
	);
	const allStatuses = $derived(
		Array.from(new Set(items.map((i) => i.status).filter((s): s is string => !!s)))
	);
	const allImpacts = $derived(
		Array.from(new Set(items.map((i) => i.impact_level).filter((s): s is string => !!s)))
	);

	const filtered: LegislativeUpdate[] = $derived(
		items.filter((item) => {
			if (statusFilter !== 'all' && item.status !== statusFilter) return false;
			if (impactFilter !== 'all' && item.impact_level !== impactFilter) return false;
			if (sourceFilter !== 'all' && item.source !== sourceFilter) return false;
			if (item.published_at) {
				if (fromDate && item.published_at < fromDate) return false;
				if (toDate && item.published_at > toDate) return false;
			}
			return true;
		})
	);

	function clearFilters() {
		fromDate = '';
		toDate = '';
		statusFilter = 'all';
		impactFilter = 'all';
		sourceFilter = 'all';
	}

	// Localized status / impact labels (fall back to upstream label if i18n key missing).
	function statusText(item: LegislativeUpdate): string {
		const key = `status${item.status
			.split('_')
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join('')}`;
		const translated = safeTranslate(key);
		return translated && translated !== key ? translated : item.status_label || item.status;
	}

	function impactText(item: LegislativeUpdate): string {
		const key = `impact${item.impact_level.charAt(0).toUpperCase() + item.impact_level.slice(1)}`;
		const translated = safeTranslate(key);
		return translated && translated !== key
			? translated
			: item.impact_label || item.impact_level;
	}

	function statusClasses(status: string): string {
		switch (status) {
			case 'new':
				return 'bg-emerald-100 text-emerald-700';
			case 'under_analysis':
				return 'bg-orange-100 text-orange-700';
			case 'completed':
				return 'bg-blue-100 text-blue-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}

	function impactClasses(level: string): string {
		switch (level) {
			case 'high':
				return 'bg-red-50 text-red-700 border-red-200';
			case 'medium':
				return 'bg-amber-50 text-amber-700 border-amber-200';
			case 'low':
				return 'bg-green-50 text-green-700 border-green-200';
			default:
				return 'bg-gray-50 text-gray-700 border-gray-200';
		}
	}

	function impactDotClass(level: string): string {
		switch (level) {
			case 'high':
				return 'bg-red-500';
			case 'medium':
				return 'bg-amber-500';
			case 'low':
				return 'bg-green-500';
			default:
				return 'bg-gray-400';
		}
	}

	function formatDate(iso: string | null): string {
		if (!iso) return '';
		try {
			return new Date(iso).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return iso;
		}
	}

	function affectedPoliciesLabel(n: number): string {
		if (n <= 0) return m.affectsPoliciesNone();
		if (n === 1) return m.affectsPoliciesOne();
		return m.affectsPoliciesOther({ count: n });
	}
</script>

<!-- Subtitle + monitoring settings -->
<div class="flex flex-wrap items-start justify-between gap-3 mb-4">
	<p class="text-sm text-gray-500 max-w-3xl">
		{m.legislativeUpdatesDescription()}
	</p>
	<button
		type="button"
		class="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm"
	>
		<i class="fa-solid fa-gear text-xs"></i>
		{m.monitoringSettings()}
	</button>
</div>

<!-- Filter bar -->
<div class="wgrc-card mb-4 !p-4">
	<div class="flex flex-wrap items-end gap-3">
		<div class="flex flex-col">
			<label for="from-date" class="text-xs text-gray-500 mb-1">{m.fromDate()}</label>
			<input
				id="from-date"
				type="date"
				bind:value={fromDate}
				class="wgrc-input !py-1.5 !px-2 text-sm w-40"
			/>
		</div>
		<div class="flex flex-col">
			<label for="to-date" class="text-xs text-gray-500 mb-1">{m.toDate()}</label>
			<input
				id="to-date"
				type="date"
				bind:value={toDate}
				class="wgrc-input !py-1.5 !px-2 text-sm w-40"
			/>
		</div>

		<div class="flex flex-col">
			<label for="status-filter" class="text-xs text-gray-500 mb-1">{m.status()}</label>
			<select id="status-filter" bind:value={statusFilter} class="wgrc-input !py-1.5 !px-2 text-sm w-44">
				<option value="all">{m.allStatuses()}</option>
				{#each allStatuses as st}
					<option value={st}>{statusText({ status: st, status_label: st } as LegislativeUpdate)}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col">
			<label for="impact-filter" class="text-xs text-gray-500 mb-1">{m.impact()}</label>
			<select id="impact-filter" bind:value={impactFilter} class="wgrc-input !py-1.5 !px-2 text-sm w-44">
				<option value="all">{m.allImpactLevels()}</option>
				{#each allImpacts as lvl}
					<option value={lvl}>{impactText({ impact_level: lvl, impact_label: lvl } as LegislativeUpdate)}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col">
			<label for="source-filter" class="text-xs text-gray-500 mb-1">{m.source()}</label>
			<select id="source-filter" bind:value={sourceFilter} class="wgrc-input !py-1.5 !px-2 text-sm w-52">
				<option value="all">{m.allSources()}</option>
				{#each allSources as src}
					<option value={src}>{src}</option>
				{/each}
			</select>
		</div>

		<div class="flex items-center gap-2 ml-auto">
			<button
				type="button"
				class="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
				onclick={clearFilters}
			>
				<i class="fa-solid fa-rotate-left text-xs"></i>
				{m.clearFilters()}
			</button>
			<button
				type="button"
				class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"
			>
				<i class="fa-solid fa-filter text-xs"></i>
				{m.filter()}
			</button>
		</div>
	</div>
</div>

{#if data.upstreamError}
	<div class="wgrc-card !p-4 mb-4 border-red-200 bg-red-50/40">
		<div class="flex items-start gap-3">
			<i class="fa-solid fa-triangle-exclamation text-red-500 mt-0.5"></i>
			<div>
				<p class="text-sm font-medium text-red-700">{m.failedToLoadLegislativeUpdates()}</p>
				<p class="text-xs text-red-500/80 mt-1 font-mono break-all">{data.upstreamUrl}</p>
			</div>
		</div>
	</div>
{/if}

{#if filtered.length === 0 && !data.upstreamError}
	<div class="wgrc-card text-center py-12">
		<i class="fa-solid fa-inbox text-3xl text-gray-300 mb-3"></i>
		<p class="text-sm text-gray-500">{m.noLegislativeUpdates()}</p>
	</div>
{:else}
	<div class="space-y-3">
		{#each filtered as item (item.id)}
			<article class="wgrc-card !p-5 hover:shadow-md transition-shadow">
				<div class="flex items-start justify-between gap-4">
					<div class="flex-1 min-w-0">
						<h3 class="text-base font-semibold text-gray-900 mb-1 truncate" title={item.title}>
							{item.title}
						</h3>
						<p class="text-sm text-gray-600 line-clamp-2">{item.description}</p>
					</div>

					<div class="flex flex-wrap items-center gap-2 shrink-0">
						<span class="wgrc-badge {statusClasses(item.status)}">
							{statusText(item)}
						</span>
						<span class="wgrc-badge border {impactClasses(item.impact_level)} inline-flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full {impactDotClass(item.impact_level)}"></span>
							{impactText(item)}
						</span>
						{#if item.source}
							<span class="wgrc-badge bg-gray-100 text-gray-700">{item.source}</span>
						{/if}
					</div>
				</div>

				{#if item.tags?.length}
					<div class="mt-3 flex flex-wrap gap-1.5">
						{#each item.tags as tag}
							<span class="inline-block px-2 py-0.5 rounded-md bg-gray-50 text-xs text-gray-500 border border-gray-100">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}

				<div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
					<div class="flex flex-wrap items-center gap-4">
						{#if item.published_at}
							<span class="inline-flex items-center gap-1.5">
								<i class="fa-regular fa-calendar"></i>
								{formatDate(item.published_at)}
							</span>
						{/if}
						{#if item.source}
							<span class="inline-flex items-center gap-1.5">
								<i class="fa-solid fa-folder-open"></i>
								{m.source()}: {item.source}
							</span>
						{/if}
						<span class="inline-flex items-center gap-1.5">
							<i class="fa-solid fa-file-shield"></i>
							{affectedPoliciesLabel(item.affected_policies_count)}
						</span>
					</div>

					<div class="flex items-center gap-3">
						{#if item.external_url}
							<a
								href={item.external_url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"
							>
								<i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
								{m.source()}
							</a>
						{/if}
						<a
							href={`/legislative-updates/${encodeURIComponent(item.id)}`}
							class="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800 hover:underline"
						>
							{m.viewDetails()}
							<i class="fa-solid fa-arrow-right text-[10px]"></i>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
{/if}
