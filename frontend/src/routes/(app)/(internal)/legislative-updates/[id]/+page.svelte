<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import type { LegislativeUpdate } from '$lib/server/legislative-updates';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const item: LegislativeUpdate | null = $derived(data.item ?? null);

	type TabKey = 'summary' | 'impact' | 'tasks';
	let activeTab = $state<TabKey>('summary');

	function statusText(it: LegislativeUpdate): string {
		const key = `status${it.status
			.split('_')
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join('')}`;
		const translated = safeTranslate(key);
		return translated && translated !== key ? translated : it.status_label || it.status;
	}

	function impactText(it: LegislativeUpdate): string {
		const key = `impact${it.impact_level.charAt(0).toUpperCase() + it.impact_level.slice(1)}`;
		const translated = safeTranslate(key);
		return translated && translated !== key ? translated : it.impact_label || it.impact_level;
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

	function formatDate(iso: string | null | undefined): string {
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

	// Key changes are an optional structured field on metadata. When absent
	// we synthesise a single bullet from the description so the panel never
	// looks empty for the common case where the upstream only ships prose.
	const keyChanges = $derived.by((): string[] => {
		if (!item) return [];
		const raw = item.metadata?.key_changes;
		if (Array.isArray(raw) && raw.length) {
			return raw.filter((s): s is string => typeof s === 'string' && s.trim().length > 0);
		}
		return [];
	});
</script>

{#if !item}
	<div class="wgrc-card text-center py-14">
		{#if data.upstreamUnauthorized}
			<i class="fa-solid fa-lock text-3xl text-amber-400 mb-3"></i>
			<p class="text-sm text-gray-600 mb-4">{m.legislativeUpdatesAuthRequired()}</p>
			<div class="flex items-center justify-center gap-3">
				<a
					href="/legislative-updates"
					class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-secondary"
				>
					<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
					{m.backToLegislativeUpdates()}
				</a>
				<a
					href="https://grc-admin.wathbah.dev/login"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"
				>
					<i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
					{m.signInToGrcAdmin()}
				</a>
			</div>
		{:else}
			<i class="fa-solid fa-triangle-exclamation text-3xl text-amber-400 mb-3"></i>
			<p class="text-sm text-gray-600 mb-4">
				{data.upstreamError ? m.failedToLoadLegislativeUpdates() : m.legislativeUpdateNotFound()}
			</p>
			<a
				href="/legislative-updates"
				class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"
			>
				<i class="fa-solid fa-arrow-left rtl:rotate-180"></i>
				{m.backToLegislativeUpdates()}
			</a>
		{/if}
	</div>
{:else}
	<!-- Back link -->
	<a
		href="/legislative-updates"
		class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-4 group"
	>
		<i class="fa-solid fa-arrow-left text-xs rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"></i>
		{m.backToLegislativeUpdates()}
	</a>

	<!-- Header card -->
	<section class="wgrc-card !p-6 mb-4">
		<div class="flex flex-wrap items-center gap-2 mb-3">
			{#if item.source}
				<span class="wgrc-badge bg-red-100 text-red-700">{item.source}</span>
			{/if}
			<span
				class="wgrc-badge border {impactClasses(item.impact_level)} inline-flex items-center gap-1.5"
			>
				<span class="w-2 h-2 rounded-full {impactDotClass(item.impact_level)}"></span>
				{impactText(item)}
			</span>
			<span class="wgrc-badge {statusClasses(item.status)}">
				{statusText(item)}
			</span>
		</div>

		<h2 class="text-2xl font-bold text-gray-900 leading-snug mb-3">{item.title}</h2>

		<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
			{#if item.published_at}
				<span class="inline-flex items-center gap-1.5">
					<i class="fa-regular fa-calendar"></i>
					{m.publishedOn()}: {formatDate(item.published_at)}
				</span>
			{/if}
			{#if item.external_url}
				<a
					href={item.external_url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"
				>
					<i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
					{m.viewOriginalSource()}
				</a>
			{/if}
		</div>
	</section>

	<!-- Tabs -->
	<div class="wgrc-card !p-0 mb-4 overflow-hidden">
		<div class="flex border-b border-gray-100 px-2" role="tablist">
			{#each [
				{ key: 'summary' as TabKey, label: m.updateSummary(), icon: 'fa-file-lines' },
				{ key: 'impact' as TabKey, label: m.impactAnalysis(), icon: 'fa-chart-line' },
				{ key: 'tasks' as TabKey, label: m.tasks(), icon: 'fa-list-check' }
			] as tab}
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === tab.key}
					onclick={() => (activeTab = tab.key)}
					class="px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors inline-flex items-center gap-2 {activeTab === tab.key
						? 'border-blue-600 text-blue-700'
						: 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'}"
				>
					<i class="fa-solid {tab.icon} text-xs"></i>
					{tab.label}
				</button>
			{/each}
		</div>
	</div>

	{#if activeTab === 'summary'}
		<!-- AI Summary -->
		<section class="wgrc-card !p-6 mb-4">
			<div class="flex items-center gap-2 mb-3">
				<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600">
					<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
				</span>
				<h3 class="text-sm font-semibold text-blue-700">{m.aiSummary()}</h3>
			</div>
			<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.description}</p>
		</section>

		<!-- Key changes -->
		<section class="wgrc-card !p-6 mb-4">
			<div class="flex items-center gap-2 mb-4">
				<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50 text-amber-600">
					<i class="fa-solid fa-list-ul text-xs"></i>
				</span>
				<h3 class="text-sm font-semibold text-amber-700">{m.keyChanges()}</h3>
			</div>
			{#if keyChanges.length}
				<ul class="space-y-2.5">
					{#each keyChanges as change}
						<li class="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
							<span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
							<span>{change}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-sm text-gray-400 italic">{m.noKeyChangesAvailable()}</p>
			{/if}

			{#if item.tags?.length}
				<div class="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
					{#each item.tags as tag}
						<span
							class="inline-block px-2 py-0.5 rounded-md bg-gray-50 text-xs text-gray-500 border border-gray-100"
						>
							#{tag}
						</span>
					{/each}
				</div>
			{/if}
		</section>
	{:else if activeTab === 'impact'}
		<section class="wgrc-card !p-6">
			<div class="flex items-center gap-2 mb-4">
				<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-purple-50 text-purple-600">
					<i class="fa-solid fa-chart-line text-xs"></i>
				</span>
				<h3 class="text-sm font-semibold text-purple-700">{m.impactAnalysis()}</h3>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
				<div class="rounded-lg border border-gray-100 bg-gray-50/60 p-4">
					<p class="text-xs text-gray-500 mb-1">{m.affectedPolicies()}</p>
					<p class="text-2xl font-semibold text-gray-900">{item.affected_policies_count}</p>
				</div>
				<div class="rounded-lg border border-gray-100 bg-gray-50/60 p-4">
					<p class="text-xs text-gray-500 mb-1">{m.impact()}</p>
					<p class="text-2xl font-semibold text-gray-900">{impactText(item)}</p>
				</div>
			</div>

			{#if item.metadata?.impact_analysis}
				<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
					{item.metadata.impact_analysis}
				</p>
			{:else}
				<p class="text-sm text-gray-400 italic">{m.impactAnalysisComingSoon()}</p>
			{/if}
		</section>
	{:else}
		<section class="wgrc-card !p-6 text-center">
			<i class="fa-solid fa-list-check text-3xl text-gray-300 mb-3"></i>
			<p class="text-sm text-gray-500">{m.tasksComingSoon()}</p>
		</section>
	{/if}
{/if}
