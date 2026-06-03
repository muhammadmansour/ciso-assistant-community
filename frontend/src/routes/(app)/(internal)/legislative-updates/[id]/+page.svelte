<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import type {
		LegislativeUpdate,
		PipelineImpactForPoint,
		PipelineKeyChange,
		PipelinePolicyImpact
	} from '$lib/server/legislative-updates';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const item: LegislativeUpdate | null = $derived(data.item ?? null);
	const pipeline = $derived(item?.pipeline ?? null);

	type TabKey = 'summary' | 'impact' | 'tasks';
	let activeTab = $state<TabKey>('summary');

	// ---------- shared label / class helpers ----------
	function statusText(it: LegislativeUpdate): string {
		const key = `status${it.status
			.split('_')
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join('')}`;
		const t = safeTranslate(key);
		return t && t !== key ? t : it.status_label || it.status;
	}

	function impactText(it: LegislativeUpdate): string {
		const key = `impact${it.impact_level.charAt(0).toUpperCase() + it.impact_level.slice(1)}`;
		const t = safeTranslate(key);
		return t && t !== key ? t : it.impact_label || it.impact_level;
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

	// ---------- severity (pipeline-level) ----------
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
			default:
				return 'bg-gray-50 text-gray-600 border-gray-200';
		}
	}

	function formatConfidence(c: number | undefined): string {
		if (typeof c !== 'number') return '';
		const pct = Math.round(c * 100);
		return `${pct}%`;
	}

	function formatSimilarity(s: number | undefined): string {
		if (typeof s !== 'number') return '';
		const pct = Math.round(s * 100);
		return `${pct}%`;
	}

	// ---------- derived data for tabs ----------
	const richKeyChanges: PipelineKeyChange[] = $derived(pipeline?.key_changes ?? []);

	// Legacy fallback when the backend only ships metadata.key_changes: string[]
	const legacyKeyChanges: string[] = $derived.by(() => {
		if (richKeyChanges.length) return [];
		const raw = item?.metadata?.key_changes;
		return Array.isArray(raw) ? raw.filter((s): s is string => typeof s === 'string' && !!s) : [];
	});

	const impactAnalysis: PipelineImpactForPoint[] = $derived(pipeline?.impact_analysis ?? []);

	type DerivedTask = {
		pointId: string;
		pointText: string;
		policyId: string;
		policyTitle: string;
		severity: string;
		impactSummary: string;
		complianceGap?: string;
		amendments: NonNullable<PipelinePolicyImpact['amendments']>;
	};

	const derivedTasks: DerivedTask[] = $derived.by(() => {
		const out: DerivedTask[] = [];
		for (const point of impactAnalysis) {
			for (const imp of point.impacts ?? []) {
				if (!imp.requires_amendment) continue;
				out.push({
					pointId: point.point_id,
					pointText: point.point_text,
					policyId: imp.policy_id,
					policyTitle: imp.policy_title,
					severity: imp.severity,
					impactSummary: imp.impact_summary,
					complianceGap: imp.compliance_gap,
					amendments: imp.amendments ?? []
				});
			}
		}
		return out;
	});

	function severityRank(s: string): number {
		return { critical: 0, high: 1, medium: 2, low: 3, none: 4 }[s] ?? 5;
	}

	const tasksSorted = $derived(
		[...derivedTasks].sort((a, b) => severityRank(a.severity) - severityRank(b.severity))
	);
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
				{ key: 'summary' as TabKey, label: m.updateSummary(), icon: 'fa-file-lines', count: null },
				{ key: 'impact' as TabKey, label: m.impactAnalysis(), icon: 'fa-chart-line', count: impactAnalysis.length || null },
				{ key: 'tasks' as TabKey, label: m.tasks(), icon: 'fa-list-check', count: tasksSorted.length || null }
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
					{#if tab.count}
						<span
							class="ml-1 rtl:ml-0 rtl:mr-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-semibold {activeTab === tab.key
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
		<!-- AI Summary -->
		<section class="wgrc-card !p-6 mb-4">
			<div class="flex items-center justify-between gap-3 mb-3">
				<div class="flex items-center gap-2">
					<span
						class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600"
					>
						<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
					</span>
					<h3 class="text-sm font-semibold text-blue-700">{m.aiSummary()}</h3>
				</div>
				{#if pipeline?.f1_relevance && typeof pipeline.f1_relevance.confidence === 'number'}
					<span class="text-xs text-gray-500">
						{m.aiConfidence()}:
						<span class="font-mono text-gray-700"
							>{formatConfidence(pipeline.f1_relevance.confidence)}</span
						>
					</span>
				{/if}
			</div>

			<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.description}</p>

			{#if pipeline?.f1_relevance?.reasoning && pipeline.f1_relevance.reasoning !== item.description}
				<div class="mt-4 pt-4 border-t border-gray-100">
					<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
						{m.aiRelevanceReasoning()}
					</p>
					<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
						{pipeline.f1_relevance.reasoning}
					</p>
				</div>
			{/if}

			{#if pipeline?.f1_relevance?.relevant_aspects?.length}
				<div class="mt-4">
					<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
						{m.relevantAspects()}
					</p>
					<div class="flex flex-wrap gap-1.5">
						{#each pipeline.f1_relevance.relevant_aspects as aspect}
							<span
								class="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-xs text-blue-700 border border-blue-100"
							>
								{aspect}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</section>

		<!-- Key changes -->
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
				{#if richKeyChanges.length}
					<span
						class="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700"
					>
						{richKeyChanges.length}
					</span>
				{/if}
			</div>

			{#if richKeyChanges.length}
				<ul class="space-y-4">
					{#each richKeyChanges as kc}
						<li class="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors">
							<div class="flex items-start gap-3">
								<span
									class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-gray-900 text-white text-[10px] font-mono font-semibold mt-0.5"
								>
									{kc.id}
								</span>
								<p class="text-sm text-gray-800 leading-relaxed flex-1">{kc.point}</p>
							</div>
							{#if kc.category || kc.source_reference}
								<div
									class="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500"
								>
									{#if kc.category}
										<span class="inline-flex items-center gap-1.5">
											<i class="fa-solid fa-tag text-[10px]"></i>
											{m.category()}: <span class="text-gray-700 font-medium">{kc.category}</span>
										</span>
									{/if}
									{#if kc.source_reference}
										<span class="inline-flex items-center gap-1.5">
											<i class="fa-solid fa-bookmark text-[10px]"></i>
											{m.reference()}: <span class="text-gray-700 font-medium"
												>{kc.source_reference}</span
											>
										</span>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{:else if legacyKeyChanges.length}
				<ul class="space-y-2.5">
					{#each legacyKeyChanges as change}
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
		<!-- Impact stats -->
		<section class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
			<div class="wgrc-card !p-4">
				<p class="text-xs text-gray-500 mb-1">{m.affectedPolicies()}</p>
				<p class="text-2xl font-semibold text-gray-900">{item.affected_policies_count}</p>
			</div>
			<div class="wgrc-card !p-4">
				<p class="text-xs text-gray-500 mb-1">{m.impact()}</p>
				<p class="text-2xl font-semibold text-gray-900">{impactText(item)}</p>
			</div>
			<div class="wgrc-card !p-4">
				<p class="text-xs text-gray-500 mb-1">{m.policiesIndexed()}</p>
				<p class="text-2xl font-semibold text-gray-900">
					{pipeline?.policy_count_indexed ?? '—'}
				</p>
			</div>
		</section>

		{#if impactAnalysis.length}
			<div class="space-y-4">
				{#each impactAnalysis as point, idx (point.point_id)}
					<section class="wgrc-card !p-6">
						<div class="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
							<span
								class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-gray-900 text-white text-[10px] font-mono font-semibold mt-1"
							>
								{point.point_id}
							</span>
							<div class="flex-1 min-w-0">
								<p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
									{m.newRegulationPoint()} {idx + 1}
								</p>
								<p class="text-sm text-gray-800 leading-relaxed">{point.point_text}</p>
							</div>
						</div>

						<div class="flex items-center justify-between mb-3">
							<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
								{m.policyImpacts()}
							</h4>
							<span class="text-xs text-gray-400">{point.impacts?.length ?? 0}</span>
						</div>

						<div class="space-y-3">
							{#each point.impacts ?? [] as imp}
								<details class="group border border-gray-100 rounded-lg overflow-hidden">
									<summary
										class="flex items-center justify-between gap-3 p-3 cursor-pointer hover:bg-gray-50 list-none"
									>
										<div class="flex items-center gap-3 min-w-0 flex-1">
											<i
												class="fa-solid fa-chevron-right text-[10px] text-gray-400 transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:rotate-90"
											></i>
											<span class="font-medium text-sm text-gray-800 truncate" title={imp.policy_title}
												>{imp.policy_title}</span
											>
										</div>
										<div class="flex items-center gap-2 shrink-0">
											{#if typeof imp.similarity_score === 'number'}
												<span class="text-[11px] text-gray-400 font-mono"
													>{formatSimilarity(imp.similarity_score)}</span
												>
											{/if}
											<span
												class="inline-block px-2 py-0.5 rounded-md border text-[11px] font-medium {severityClasses(
													imp.severity
												)}"
											>
												{severityLabel(imp.severity)}
											</span>
											{#if imp.requires_amendment}
												<span
													class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium bg-blue-50 text-blue-700 border-blue-200"
												>
													<i class="fa-solid fa-pen-to-square text-[9px]"></i>
													{m.requiresAmendment()}
												</span>
											{/if}
										</div>
									</summary>
									<div class="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50/40 space-y-3">
										<div>
											<p class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
												{m.impactAnalysis()}
											</p>
											<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
												{imp.impact_summary}
											</p>
										</div>
										{#if imp.severity_reasoning}
											<div>
												<p
													class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1"
												>
													{m.severity()}
												</p>
												<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
													{imp.severity_reasoning}
												</p>
											</div>
										{/if}
										{#if imp.compliance_gap}
											<div>
												<p
													class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1"
												>
													{m.complianceGap()}
												</p>
												<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
													{imp.compliance_gap}
												</p>
											</div>
										{/if}
										{#if imp.amendments?.length}
											<div>
												<p
													class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2"
												>
													{m.proposedAmendments()} ({imp.amendments.length})
												</p>
												<div class="space-y-2">
													{#each imp.amendments as am}
														<div class="bg-white border border-gray-100 rounded-md p-3 text-sm">
															<div class="flex items-center gap-2 mb-2">
																<span
																	class="inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium {changeTypeClasses(
																		am.change_type
																	)}"
																>
																	{changeTypeLabel(am.change_type)}
																</span>
																{#if am.policy_section}
																	<span class="text-xs text-gray-500"
																		>{m.amendmentSection()}:
																		<span class="font-mono text-gray-700">{am.policy_section}</span>
																	</span>
																{/if}
															</div>
															{#if am.current_text_summary}
																<p class="text-xs text-gray-500 mb-0.5">{m.amendmentCurrent()}:</p>
																<p
																	class="text-sm text-gray-600 leading-relaxed mb-2 line-through decoration-gray-300"
																>
																	{am.current_text_summary}
																</p>
															{/if}
															<p class="text-xs text-gray-500 mb-0.5">{m.amendmentRequired()}:</p>
															<p class="text-sm text-gray-800 leading-relaxed">{am.required_change}</p>
														</div>
													{/each}
												</div>
											</div>
										{/if}
									</div>
								</details>
							{/each}
						</div>
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
		{#if tasksSorted.length}
			<section class="wgrc-card !p-4 mb-4 bg-blue-50/30 border-blue-100">
				<p class="text-xs text-blue-700">{m.derivedTasksDescription()}</p>
			</section>
			<div class="space-y-3">
				{#each tasksSorted as task, i (task.policyId + task.pointId)}
					<section class="wgrc-card !p-5">
						<div class="flex items-start justify-between gap-4 mb-3">
							<div class="flex items-start gap-3 flex-1 min-w-0">
								<span
									class="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-mono text-xs font-semibold"
								>
									{i + 1}
								</span>
								<div class="min-w-0 flex-1">
									<p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
										{task.policyTitle}
									</p>
									<p class="text-sm font-medium text-gray-900 leading-snug">{task.pointText}</p>
								</div>
							</div>
							<span
								class="shrink-0 inline-block px-2 py-0.5 rounded-md border text-[11px] font-medium {severityClasses(
									task.severity
								)}"
							>
								{severityLabel(task.severity)}
							</span>
						</div>

						<p class="text-sm text-gray-700 leading-relaxed mb-3">{task.impactSummary}</p>

						{#if task.amendments.length}
							<div class="space-y-2 mt-3 pt-3 border-t border-gray-100">
								{#each task.amendments as am}
									<div class="flex items-start gap-2 text-sm">
										<span
											class="shrink-0 inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium mt-0.5 {changeTypeClasses(
												am.change_type
											)}"
										>
											{changeTypeLabel(am.change_type)}
										</span>
										<div class="min-w-0 flex-1">
											{#if am.policy_section}
												<span class="text-xs text-gray-500 font-mono">{am.policy_section}: </span>
											{/if}
											<span class="text-sm text-gray-800">{am.required_change}</span>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</section>
				{/each}
			</div>
		{:else if impactAnalysis.length}
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
