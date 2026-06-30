<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import type {
		LegislativeUpdate,
		PipelinePolicyImpactBundle,
		PipelineMatchedPoint
	} from '$lib/server/legislative-updates';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const item: LegislativeUpdate | null = $derived(data.item ?? null);
	const pipeline = $derived(item?.pipeline ?? null);

	type TabKey = 'summary' | 'impact' | 'tasks';
	let activeTab = $state<TabKey>('summary');

	// Inline expansion for the policy-first impact rows. Stores the
	// "<policy_id>::<point_id>" of the currently-open regulation-point row.
	let expandedRowKey = $state<string | null>(null);
	function toggleRow(key: string) {
		expandedRowKey = expandedRowKey === key ? null : key;
	}

	// Track which policy cards are collapsed so users can hide all rows on
	// dense pages. Default = expanded for the first policy only — matches the
	// new GRC-admin behaviour where the first impact is visible by default.
	let collapsedPolicies = $state<Record<string, boolean>>({});
	function togglePolicy(policyId: string) {
		collapsedPolicies[policyId] = !collapsedPolicies[policyId];
	}

	// ---------- shared label / class helpers ----------
	function statusText(it: LegislativeUpdate): string {
		const status = it.status ?? '';
		if (!status) return it.status_label ?? '';
		const key = `status${status
			.split('_')
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join('')}`;
		const t = safeTranslate(key);
		return t && t !== key ? t : it.status_label || status;
	}

	function impactText(it: LegislativeUpdate): string {
		const level = it.impact_level ?? '';
		if (!level) return it.impact_label ?? '';
		const key = `impact${level.charAt(0).toUpperCase() + level.slice(1)}`;
		const t = safeTranslate(key);
		return t && t !== key ? t : it.impact_label || level;
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
			case 'critical':
				return 'bg-red-100 text-red-800 border-red-300';
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
			case 'critical':
				return 'bg-red-600';
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

	function impactTextOnlyClass(level: string | null | undefined): string {
		switch (level) {
			case 'critical':
				return 'text-red-700';
			case 'high':
				return 'text-red-600';
			case 'medium':
				return 'text-amber-600';
			case 'low':
				return 'text-green-600';
			default:
				return 'text-gray-600';
		}
	}

	function confidenceBarClass(level: string | null | undefined): string {
		switch (level) {
			case 'critical':
				return 'bg-red-600';
			case 'high':
				return 'bg-red-500';
			case 'medium':
				return 'bg-amber-500';
			case 'low':
				return 'bg-green-500';
			default:
				return 'bg-blue-500';
		}
	}

	// Arabic items render dates as ٥ مارس ٢٠٢٦ via 'ar-EG' (forces Gregorian +
	// Arabic-Indic numerals); 'ar-SA' would switch to Hijri which is wrong for
	// regulator publishing dates.
	function formatDate(iso: string | null | undefined, lang: string | null | undefined): string {
		if (!iso) return '';
		try {
			const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
			return new Date(iso).toLocaleDateString(locale, {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return iso;
		}
	}

	// ---------- severity helpers (pipeline-level) ----------
	function severityLabel(sev: string | undefined | null): string {
		if (!sev) return '';
		const map: Record<string, string> = {
			critical: m.severityCritical(),
			high: m.severityHigh(),
			medium: m.severityMedium(),
			low: m.severityLow(),
			none: m.severityNone()
		};
		return map[sev] ?? sev;
	}

	function severityClasses(sev: string | undefined | null): string {
		switch (sev) {
			case 'critical':
				return 'bg-red-100 text-red-800 border-red-300';
			case 'high':
				return 'bg-red-50 text-red-700 border-red-200';
			case 'medium':
				return 'bg-amber-50 text-amber-700 border-amber-200';
			case 'low':
				return 'bg-green-50 text-green-700 border-green-200';
			case 'none':
			default:
				return 'bg-gray-50 text-gray-600 border-gray-200';
		}
	}

	function changeTypeLabel(t: string | undefined): string {
		switch (t) {
			case 'add':
				return m.amendmentTypeAdd();
			case 'modify':
				return m.amendmentTypeModify();
			case 'remove':
				return m.amendmentTypeRemove();
			case 'strengthen':
				return m.amendmentTypeStrengthen();
			default:
				return t ?? '';
		}
	}

	function changeTypeClasses(t: string | undefined): string {
		switch (t) {
			case 'add':
				return 'bg-emerald-50 text-emerald-700 border-emerald-200';
			case 'modify':
				return 'bg-blue-50 text-blue-700 border-blue-200';
			case 'remove':
				return 'bg-rose-50 text-rose-700 border-rose-200';
			case 'strengthen':
				return 'bg-indigo-50 text-indigo-700 border-indigo-200';
			default:
				return 'bg-gray-50 text-gray-600 border-gray-200';
		}
	}

	// ---------- derived data for tabs ----------
	// Top-level driver for the Impact analysis tab. The API ships this list
	// already sorted (is_affected desc → worst_severity → matched_points_count
	// desc → policy_title asc); we do NOT re-sort it client-side.
	const impactsByPolicy: PipelinePolicyImpactBundle[] = $derived(
		pipeline?.impacts_by_policy ?? []
	);
	const keyChanges = $derived(pipeline?.key_changes ?? []);

	// Plain text bullet list for the Key Changes section. Falls back to legacy
	// metadata.key_changes if the new pipeline shape isn't present.
	const keyChangePoints: { id?: string; text: string }[] = $derived.by(() => {
		if (keyChanges.length) {
			return keyChanges.map((kc) => ({ id: kc.id, text: kc.point }));
		}
		const legacy = item?.metadata?.key_changes;
		if (Array.isArray(legacy)) {
			return legacy
				.filter((s): s is string => typeof s === 'string' && !!s)
				.map((text) => ({ text }));
		}
		return [];
	});

	// Tasks tab — one entry per individual amendment, derived from the new
	// policy-first shape so it stays in sync with the Impact analysis tab.
	type DerivedTask = {
		key: string;
		title: string;
		policyTitle: string;
		severity: string;
		changeType?: string;
		policySection?: string;
	};

	const derivedTasks: DerivedTask[] = $derived.by(() => {
		const out: DerivedTask[] = [];
		for (const policy of impactsByPolicy) {
			for (const pt of policy.matched_points ?? []) {
				if (!pt.requires_amendment) continue;
				const amendments = pt.amendments ?? [];
				if (amendments.length === 0) {
					out.push({
						key: `${policy.policy_id}::${pt.point_id}::summary`,
						title: pt.impact_summary,
						policyTitle: policy.policy_title,
						severity: pt.severity
					});
					continue;
				}
				amendments.forEach((am, i) => {
					out.push({
						key: `${policy.policy_id}::${pt.point_id}::${i}`,
						title: am.required_change,
						policyTitle: policy.policy_title,
						severity: pt.severity,
						changeType: am.change_type,
						policySection: am.policy_section
					});
				});
			}
		}
		// Pre-sorted by API order via outer loop; keep that.
		return out;
	});

	// ---------- impact-analysis stats ----------
	// Prefer metadata.f1_confidence (curated by the new envelope) and fall
	// back to the raw pipeline.f1_relevance.confidence for older runs.
	const confidencePct = $derived.by(() => {
		const c =
			(typeof item?.metadata?.f1_confidence === 'number'
				? item.metadata.f1_confidence
				: undefined) ?? pipeline?.f1_relevance?.confidence;
		return typeof c === 'number' ? Math.round(c * 100) : null;
	});

	// "Policy impacts" tile = RAG corpus size (matches the GRC-admin label).
	// Prefer metadata.policy_count_indexed, fall back to pipeline.policy_count_indexed.
	const policiesIndexedCount = $derived.by(() => {
		const m1 = item?.metadata?.policy_count_indexed;
		if (typeof m1 === 'number') return m1;
		const m2 = pipeline?.policy_count_indexed;
		return typeof m2 === 'number' ? m2 : null;
	});

	const analyzedPoliciesCount = $derived(item?.analyzed_policies_count ?? 0);

	function pointSeverityLabel(pt: PipelineMatchedPoint): string {
		return pt.severity_label || severityLabel(pt.severity);
	}

	function policySeverityLabel(p: PipelinePolicyImpactBundle): string {
		return p.worst_severity_label || severityLabel(p.worst_severity);
	}

	function similarityPct(score: number | undefined | null): number | null {
		if (typeof score !== 'number' || !Number.isFinite(score)) return null;
		return Math.round(score * 100);
	}

	// Header tint for the Severity panel — keeps the panel framed in the
	// severity colour so reviewers can scan many regulation points without
	// re-reading the badge each time.
	function severityHeaderClass(level: string | undefined | null): string {
		switch (level) {
			case 'critical':
				return 'bg-red-50 border-red-100 text-red-700';
			case 'high':
				return 'bg-red-50/70 border-red-100 text-red-700';
			case 'medium':
				return 'bg-amber-50 border-amber-100 text-amber-700';
			case 'low':
				return 'bg-green-50 border-green-100 text-green-700';
			default:
				return 'bg-gray-50 border-gray-100 text-gray-600';
		}
	}

	// Vertical accent stripe (`border-s-4`) on each section card. Stripe colour
	// telegraphs section purpose at a glance — much easier to skim than the
	// previous flat list of headings + paragraphs.
	function sectionAccentClass(kind: 'impact' | 'severity' | 'gap' | 'amendments'): string {
		switch (kind) {
			case 'impact':
				return 'border-blue-400';
			case 'severity':
				return 'border-amber-400';
			case 'gap':
				return 'border-orange-400';
			case 'amendments':
				return 'border-emerald-400';
			default:
				return 'border-gray-300';
		}
	}
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
					href={data.wathbahAdminConsoleUrl}
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
		<i
			class="fa-solid fa-arrow-left text-xs rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
		></i>
		{m.backToLegislativeUpdates()}
	</a>

	<!-- Header card -->
	<section class="wgrc-card !p-6 mb-4">
		<div class="flex flex-wrap items-center gap-2 mb-3">
			{#if item.source}
				<span class="wgrc-badge bg-red-100 text-red-700">{item.source}</span>
			{/if}
			{#if item.impact_level}
				<span
					class="wgrc-badge border {impactClasses(item.impact_level)} inline-flex items-center gap-1.5"
				>
					<span class="w-2 h-2 rounded-full {impactDotClass(item.impact_level)}"></span>
					{impactText(item)}
				</span>
			{/if}
			{#if item.status}
				<span class="wgrc-badge {statusClasses(item.status)}">{statusText(item)}</span>
			{/if}
		</div>

		<h2 class="text-2xl font-bold text-gray-900 leading-snug mb-3">{item.title || item.id}</h2>

		<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
			{#if item.published_at}
				<span class="inline-flex items-center gap-1.5">
					<i class="fa-regular fa-calendar"></i>
					{m.publishedOn()}: {formatDate(item.published_at, item.language)}
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
				{ key: 'summary' as TabKey, label: m.updateSummary(), icon: 'fa-file-lines', count: null },
				{ key: 'impact' as TabKey, label: m.impactAnalysis(), icon: 'fa-chart-line', count: impactsByPolicy.length || null },
				{ key: 'tasks' as TabKey, label: m.tasks(), icon: 'fa-list-check', count: derivedTasks.length || null }
			] as tab}
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === tab.key}
					onclick={() => (activeTab = tab.key)}
					class="px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors inline-flex items-center gap-2 {activeTab ===
					tab.key
						? 'border-blue-600 text-blue-700'
						: 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'}"
				>
					<i class="fa-solid {tab.icon} text-xs"></i>
					{tab.label}
					{#if tab.count}
						<span
							class="ml-1 rtl:ml-0 rtl:mr-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-semibold {activeTab ===
							tab.key
								? 'bg-blue-100 text-blue-700'
								: 'bg-gray-100 text-gray-600'}"
						>
							{tab.count}
						</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	{#if activeTab === 'summary'}
		<!-- AI Summary: simple paragraph, no confidence/reasoning/aspects -->
		<section class="wgrc-card !p-6 mb-4">
			<div class="flex items-center gap-2 mb-3">
				<span
					class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600"
				>
					<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
				</span>
				<h3 class="text-sm font-semibold text-blue-700">{m.aiSummary()}</h3>
			</div>
			{#if item.description}
				<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.description}</p>
			{:else}
				<p class="text-sm text-gray-400 italic">—</p>
			{/if}
		</section>

		<!-- Key Changes: clean bullet list (id/category/reference shown subtly, not as chips) -->
		<section class="wgrc-card !p-6 mb-4">
			<div class="flex items-center justify-between gap-3 mb-4">
				<div class="flex items-center gap-2">
					<span
						class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50 text-amber-600"
					>
						<i class="fa-solid fa-list-ul text-xs"></i>
					</span>
					<h3 class="text-sm font-semibold text-amber-700">{m.keyChanges()}</h3>
				</div>
				{#if keyChangePoints.length}
					<span
						class="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700"
					>
						{keyChangePoints.length}
					</span>
				{/if}
			</div>

			{#if keyChangePoints.length}
				<ul class="space-y-2.5">
					{#each keyChangePoints as kc}
						<li class="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
							<span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
							<span class="flex-1">{kc.text}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-sm text-gray-400 italic">{m.noKeyChangesAvailable()}</p>
			{/if}
		</section>

		<!-- Original document link (only when external_url is present) -->
		{#if item.external_url}
			<section class="wgrc-card !p-5 mb-4">
				<div class="flex items-center gap-2 mb-2">
					<span
						class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-600"
					>
						<i class="fa-solid fa-file-pdf text-xs"></i>
					</span>
					<h3 class="text-sm font-semibold text-gray-700">{m.viewOriginalSource()}</h3>
				</div>
				<a
					href={item.external_url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
				>
					<i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
					{item.external_url}
				</a>
			</section>
		{/if}
	{:else if activeTab === 'impact'}
		<!-- Stat row -->
		<section class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
			<!-- Impact level + AI confidence percentage with progress bar -->
			<div class="wgrc-card !p-4">
				<div class="flex items-center justify-between mb-1">
					<span class="text-xs text-gray-500">{m.impact()}</span>
					{#if item.impact_level}
						<span class="text-xs font-semibold {impactTextOnlyClass(item.impact_level)}">
							{impactText(item)}
						</span>
					{/if}
				</div>
				{#if confidencePct !== null}
					<p class="text-2xl font-bold text-gray-900 mb-2">{confidencePct}%</p>
					<div class="h-2 rounded-full bg-gray-100 overflow-hidden">
						<div
							class="h-full transition-[width] duration-500 {confidenceBarClass(item.impact_level)}"
							style="width: {confidencePct}%"
						></div>
					</div>
					<p class="text-[10px] text-gray-400 mt-1.5">{m.aiConfidence()}</p>
				{:else}
					<p class="text-2xl font-bold text-gray-900">{impactText(item) || '—'}</p>
				{/if}
			</div>

			<!-- Affected policies — matches the top-level cards rendered below -->
			<div class="wgrc-card !p-4">
				<p class="text-xs text-gray-500 mb-1">{m.affectedPolicies()}</p>
				<p class="text-2xl font-bold text-gray-900">{item.affected_policies_count ?? '—'}</p>
				<p class="text-[10px] text-gray-400 mt-1.5">
					{#if analyzedPoliciesCount > 0}
						{m.analysedPoliciesCount({ count: analyzedPoliciesCount })}
					{:else if (item.affected_policies_count ?? 0) === 1}
						{m.affectsPoliciesOne()}
					{:else}
						{m.affectsPoliciesOther({ count: item.affected_policies_count ?? 0 })}
					{/if}
				</p>
			</div>

			<!-- Policy impacts — RAG corpus size (= policies F4 had available) -->
			<div class="wgrc-card !p-4">
				<p class="text-xs text-gray-500 mb-1">{m.policyImpacts()}</p>
				<p class="text-2xl font-bold text-gray-900">{policiesIndexedCount ?? '—'}</p>
				<p class="text-[10px] text-gray-400 mt-1.5">
					{#if policiesIndexedCount !== null}
						{m.policiesIndexed()}
					{/if}
				</p>
			</div>
		</section>

		{#if impactsByPolicy.length}
			<!-- Section heading above the policy list — replaces the per-card eyebrow -->
			<div class="flex items-center justify-between gap-3 mb-3 px-1">
				<h3 class="text-sm font-semibold text-gray-700 inline-flex items-center gap-2">
					<i class="fa-solid fa-file-shield text-blue-600 text-xs"></i>
					{m.affectedPolicies()}
				</h3>
				<span class="text-xs text-gray-500">
					{#if analyzedPoliciesCount > 0}
						{(item.affected_policies_count ?? 0)} / {analyzedPoliciesCount}
					{:else}
						{(item.affected_policies_count ?? 0)}
					{/if}
				</span>
			</div>

			<div class="space-y-4">
				{#each impactsByPolicy as policy (policy.policy_id)}
					{@const isPolicyOpen = !collapsedPolicies[policy.policy_id]}
					{@const policyMuted = !policy.is_affected}
					<section
						class="wgrc-card !p-0 overflow-hidden {policyMuted ? 'opacity-75' : ''}"
					>
						<!-- Policy header (the top-level card) -->
						<button
							type="button"
							onclick={() => togglePolicy(policy.policy_id)}
							class="w-full text-start flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
							aria-expanded={isPolicyOpen}
						>
							<span
								class="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 mt-0.5"
							>
								<i class="fa-solid fa-file-shield text-sm"></i>
							</span>
							<div class="flex-1 min-w-0">
								<p
									class="text-sm font-semibold text-gray-900 leading-snug truncate"
									title={policy.policy_title}
								>
									{policy.policy_title}
								</p>
								<div class="mt-2 flex flex-wrap items-center gap-1.5">
									{#if policyMuted}
										<span
											class="inline-block px-2 py-0.5 rounded-md border text-[11px] font-medium bg-gray-50 text-gray-600 border-gray-200"
										>
											{m.noMaterialImpact()}
										</span>
									{:else if policy.worst_severity}
										<span
											class="inline-block px-2 py-0.5 rounded-md border text-[11px] font-medium {severityClasses(
												policy.worst_severity
											)}"
										>
											{policySeverityLabel(policy)}
										</span>
									{/if}
									{#if policy.requires_amendment}
										<span
											class="inline-block px-2 py-0.5 rounded-md border text-[11px] font-medium bg-amber-50 text-amber-700 border-amber-200"
										>
											<i class="fa-solid fa-pen-to-square text-[9px] mr-1 rtl:mr-0 rtl:ml-1"></i
											>{m.requiresAmendment()}
										</span>
									{/if}
								</div>
							</div>
							<div class="shrink-0 flex items-center gap-3 mt-1">
								<span
									class="inline-flex items-center gap-1 text-xs text-gray-500"
									title={m.matchedPointsCount()}
								>
									<span
										class="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700"
									>
										{m.affectedPointsRatio({
											affected: policy.affected_points_count,
											total: policy.matched_points_count
										})}
									</span>
								</span>
								<i
									class="fa-solid text-[10px] text-gray-400 transition-transform {isPolicyOpen
										? 'fa-chevron-up'
										: 'fa-chevron-down'}"
								></i>
							</div>
						</button>

						{#if isPolicyOpen}
							<!-- Regulation-point rows for this policy -->
							<ul class="divide-y divide-gray-100">
								{#each policy.matched_points ?? [] as pt (pt.point_id)}
									{@const rowKey = `${policy.policy_id}::${pt.point_id}`}
									{@const isOpen = expandedRowKey === rowKey}
									{@const sim = similarityPct(pt.similarity_score)}
									{@const ptMuted = pt.is_affected === false}
									<li>
										<button
											type="button"
											onclick={() => toggleRow(rowKey)}
											class="w-full text-start flex items-start gap-3 px-4 py-3 hover:bg-blue-50/40 transition-colors"
											aria-expanded={isOpen}
										>
											<span
												class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-gray-900 text-white text-[10px] font-mono font-semibold mt-0.5"
											>
												{pt.point_id}
											</span>
											<div class="flex-1 min-w-0">
												<p
													class="text-sm text-gray-800 leading-snug line-clamp-2"
													title={pt.point_text}
												>
													{pt.point_text}
												</p>
												{#if pt.impact_summary}
													<p
														class="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2"
														title={pt.impact_summary}
													>
														{pt.impact_summary}
													</p>
												{/if}
												<div class="mt-2 flex flex-wrap items-center gap-1.5">
													{#if ptMuted}
														<span
															class="inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium bg-gray-50 text-gray-600 border-gray-200"
														>
															{m.noMaterialImpact()}
														</span>
													{:else}
														<span
															class="inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium {severityClasses(
																pt.severity
															)}"
														>
															{pointSeverityLabel(pt)}
														</span>
													{/if}
													{#if pt.requires_amendment}
														<span
															class="inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium bg-amber-50 text-amber-700 border-amber-200"
														>
															<i
																class="fa-solid fa-pen-to-square text-[9px] mr-1 rtl:mr-0 rtl:ml-1"
															></i>{m.requiresAmendment()}
														</span>
													{/if}
													{#if sim !== null}
														<span class="text-[10px] text-gray-400">
															{m.similarityScore()}: {sim}%
														</span>
													{/if}
												</div>
											</div>
											<span
												class="shrink-0 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline ml-2 rtl:ml-0 rtl:mr-2 mt-0.5"
											>
												{m.viewDetails()}
												<i
													class="fa-solid text-[10px] transition-transform {isOpen
														? 'fa-chevron-up'
														: 'fa-chevron-down'}"
												></i>
											</span>
										</button>

										{#if isOpen}
											<div
												class="px-4 pb-5 pt-4 bg-gradient-to-b from-blue-50/40 to-transparent border-t border-gray-100 space-y-3"
											>
												<!-- Impact Analysis panel -->
												<article
													class="rounded-lg bg-white border border-gray-200/80 border-s-4 {sectionAccentClass(
														'impact'
													)} shadow-sm overflow-hidden"
												>
													<header
														class="px-3 py-2 bg-blue-50/60 border-b border-blue-100 flex items-center gap-2"
													>
														<span
															class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-blue-600"
														>
															<i class="fa-solid fa-magnifying-glass-chart text-[11px]"></i>
														</span>
														<h4
															class="text-[11px] font-semibold uppercase tracking-wide text-blue-700"
														>
															{m.impactAnalysis()}
														</h4>
													</header>
													<p
														class="p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line"
													>
														{pt.impact_summary}
													</p>
												</article>

												<!-- Severity reasoning panel — tinted to the severity colour -->
												{#if pt.severity_reasoning}
													<article
														class="rounded-lg bg-white border border-gray-200/80 border-s-4 {sectionAccentClass(
															'severity'
														)} shadow-sm overflow-hidden"
													>
														<header
															class="px-3 py-2 border-b {severityHeaderClass(
																pt.severity
															)} flex items-center justify-between gap-2"
														>
															<div class="flex items-center gap-2">
																<span
																	class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/70"
																>
																	<i class="fa-solid fa-signal text-[11px]"></i>
																</span>
																<h4
																	class="text-[11px] font-semibold uppercase tracking-wide"
																>
																	{m.severity()}
																</h4>
															</div>
															{#if !ptMuted && pt.severity}
																<span
																	class="inline-flex items-center gap-1 text-[11px] font-semibold"
																>
																	<span
																		class="w-1.5 h-1.5 rounded-full {impactDotClass(
																			pt.severity
																		)}"
																	></span>
																	{pointSeverityLabel(pt)}
																</span>
															{/if}
														</header>
														<p
															class="p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line"
														>
															{pt.severity_reasoning}
														</p>
													</article>
												{/if}

												<!-- Compliance gap panel -->
												{#if pt.compliance_gap}
													<article
														class="rounded-lg bg-white border border-orange-200 border-s-4 {sectionAccentClass(
															'gap'
														)} shadow-sm overflow-hidden"
													>
														<header
															class="px-3 py-2 bg-orange-50 border-b border-orange-100 flex items-center gap-2"
														>
															<span
																class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-orange-100 text-orange-600"
															>
																<i class="fa-solid fa-triangle-exclamation text-[11px]"></i>
															</span>
															<h4
																class="text-[11px] font-semibold uppercase tracking-wide text-orange-700"
															>
																{m.complianceGap()}
															</h4>
														</header>
														<p
															class="p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line"
														>
															{pt.compliance_gap}
														</p>
													</article>
												{/if}

												<!-- Proposed amendments panel — current vs required side-by-side -->
												{#if pt.amendments?.length}
													<article
														class="rounded-lg bg-white border border-emerald-200 border-s-4 {sectionAccentClass(
															'amendments'
														)} shadow-sm overflow-hidden"
													>
														<header
															class="px-3 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-2"
														>
															<div class="flex items-center gap-2">
																<span
																	class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-600"
																>
																	<i class="fa-solid fa-pen-to-square text-[11px]"></i>
																</span>
																<h4
																	class="text-[11px] font-semibold uppercase tracking-wide text-emerald-700"
																>
																	{m.proposedAmendments()}
																</h4>
															</div>
															<span
																class="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700"
															>
																{pt.amendments.length}
															</span>
														</header>
														<div class="p-3 space-y-3">
															{#each pt.amendments as am, amIdx}
																<div
																	class="border border-gray-200 rounded-md overflow-hidden"
																>
																	<!-- Amendment meta strip -->
																	<div
																		class="flex items-center justify-between gap-2 px-3 py-1.5 bg-gray-50 border-b border-gray-100"
																	>
																		<div class="flex items-center gap-2 flex-wrap">
																			<span
																				class="inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-medium {changeTypeClasses(
																					am.change_type
																				)}"
																			>
																				{changeTypeLabel(am.change_type)}
																			</span>
																			{#if am.policy_section}
																				<span
																					class="inline-flex items-center gap-1 text-[11px] text-gray-500"
																				>
																					<i
																						class="fa-regular fa-bookmark text-[10px] text-gray-400"
																					></i>
																					{m.amendmentSection()}:
																					<span
																						class="font-mono text-gray-700 bg-white px-1 py-0.5 rounded border border-gray-200"
																						>{am.policy_section}</span
																					>
																				</span>
																			{/if}
																		</div>
																		<span class="text-[10px] text-gray-400 font-mono"
																			>#{amIdx + 1}</span
																		>
																	</div>

																	<!-- Current ↔ Required diff-style columns -->
																	<div
																		class="grid {am.current_text_summary
																			? 'md:grid-cols-2'
																			: ''} divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-gray-100"
																	>
																		{#if am.current_text_summary}
																			<div class="p-3 bg-red-50/30">
																				<p
																					class="text-[10px] font-semibold uppercase tracking-wide text-red-600 mb-1.5 inline-flex items-center gap-1.5"
																				>
																					<i class="fa-solid fa-circle-minus"></i>
																					{m.amendmentCurrent()}
																				</p>
																				<p
																					class="text-sm text-gray-600 leading-relaxed line-through decoration-red-300/70"
																				>
																					{am.current_text_summary}
																				</p>
																			</div>
																		{/if}
																		<div class="p-3 bg-emerald-50/30">
																			<p
																				class="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 mb-1.5 inline-flex items-center gap-1.5"
																			>
																				<i
																					class="fa-solid fa-arrow-right-long rtl:rotate-180"
																				></i>
																				{m.amendmentRequired()}
																			</p>
																			<p class="text-sm text-gray-800 leading-relaxed">
																				{am.required_change}
																			</p>
																		</div>
																	</div>
																</div>
															{/each}
														</div>
													</article>
												{/if}
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						{/if}
					</section>
				{/each}
			</div>
		{:else if item.metadata?.impact_analysis}
			<section class="wgrc-card !p-6">
				<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
					{item.metadata.impact_analysis}
				</p>
			</section>
		{:else}
			<section class="wgrc-card !p-6">
				<p class="text-sm text-gray-400 italic">{m.impactAnalysisComingSoon()}</p>
			</section>
		{/if}
	{:else}
		<!-- Tasks tab: simple timeline -->
		{#if derivedTasks.length}
			<ul class="space-y-2">
				{#each derivedTasks as task (task.key)}
					<li class="wgrc-card !p-4 flex items-start gap-3">
						<span
							class="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600"
						>
							<i class="fa-solid fa-circle-check text-sm"></i>
						</span>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 leading-snug">{task.title}</p>
							<p class="mt-1 text-xs text-gray-500 inline-flex items-center gap-1.5">
								<i class="fa-regular fa-file-lines text-[10px]"></i>
								{task.policyTitle}{#if task.policySection}
									<span class="text-gray-400 mx-1">·</span>
									<span class="font-mono">{task.policySection}</span>
								{/if}
							</p>
						</div>
					</li>
				{/each}
			</ul>
		{:else if impactsByPolicy.length}
			<section class="wgrc-card !p-6 text-center">
				<i class="fa-solid fa-circle-check text-3xl text-emerald-300 mb-3"></i>
				<p class="text-sm text-gray-500">{m.noAmendmentsRequired()}</p>
			</section>
		{:else}
			<section class="wgrc-card !p-6 text-center">
				<i class="fa-solid fa-list-check text-3xl text-gray-300 mb-3"></i>
				<p class="text-sm text-gray-500">{m.tasksComingSoon()}</p>
			</section>
		{/if}
	{/if}
{/if}
