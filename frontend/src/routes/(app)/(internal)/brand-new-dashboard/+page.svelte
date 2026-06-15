<script lang="ts">
	import { safeTranslate } from '$lib/utils/i18n';
	import { m } from '$paraglide/messages';
	import type { PageData } from './$types';
	import type { DashboardRiskScenario, LegislativeUpdate } from './+page.server';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// --- Risk heatmap (proba × impact) ----------------------------------------
	// We render a 5×5 grid (standard ISO 27005 default). Scenarios with an
	// unrated proba/impact (value < 0) are skipped — they would land in a
	// "not rated" bucket that we don't show on the matrix.
	type RiskView = 'current' | 'residual' | 'inherent';
	let riskView = $state<RiskView>('current');
	let heatmapExpanded = $state(false);

	const matrixSize = 5;

	const probaLabels: Record<number, string> = {
		0: m.veryLow(),
		1: m.low(),
		2: m.medium(),
		3: m.high(),
		4: m.veryHigh()
	};

	const impactLabels: Record<number, string> = {
		0: m.veryLow(),
		1: m.low(),
		2: m.medium(),
		3: m.high(),
		4: m.veryHigh()
	};

	// Default colour gradient when the scenario doesn't carry a hex on its level —
	// matches the "very low → very high" feel of the screenshots.
	const levelGradient = ['#E5F5E1', '#A8E6A2', '#FFD980', '#FFA552', '#E74C3C'];

	function bucketLevel(proba: number, impact: number): number {
		// Heuristic for default 5×5 — picks a level from the cell coordinates.
		const sum = proba + impact;
		if (sum <= 1) return 0;
		if (sum <= 3) return 1;
		if (sum <= 5) return 2;
		if (sum <= 6) return 3;
		return 4;
	}

	function buildMatrix(view: RiskView): { count: number; level: number }[][] {
		const grid: { count: number; level: number }[][] = Array.from(
			{ length: matrixSize },
			(_, p) =>
				Array.from({ length: matrixSize }, (_, i) => ({
					count: 0,
					level: bucketLevel(p, i)
				}))
		);

		const probaKey = `${view}_proba` as const;
		const impactKey = `${view}_impact` as const;

		for (const s of data.scenarios as DashboardRiskScenario[]) {
			const p = (s as any)[probaKey]?.value ?? -1;
			const i = (s as any)[impactKey]?.value ?? -1;
			if (p < 0 || i < 0) continue;
			if (p >= matrixSize || i >= matrixSize) continue;
			grid[p][i].count += 1;
		}
		return grid;
	}

	const matrix = $derived(buildMatrix(riskView));

	const totalRisks = $derived(
		(data.scenarios as DashboardRiskScenario[]).length
	);

	// Aggregate risk-level summary for the legend ("19 risks", level breakdown).
	// We append an "unrated" bucket manually so the user can see their scenarios
	// even before likelihood/impact has been scored.
	const levelSummary = $derived.by(() => {
		const list: Array<{ name: string; value: number; color: string }> =
			riskView === 'current'
				? (data.riskLevels?.current ?? [])
				: riskView === 'residual'
					? (data.riskLevels?.residual ?? [])
					: (data.riskLevels?.inherent ?? data.riskLevels?.current ?? []);

		const rated = list.reduce((s, r) => s + (r.value ?? 0), 0);
		const unrated = totalRisks - rated;
		if (unrated > 0) {
			return [
				...list,
				{ name: m.notRated(), value: unrated, color: '#D1D5DB' }
			];
		}
		return list;
	});

	// --- Highest residual risk by category (qualifications) -------------------
	type CategoryRow = { name: string; current: number; residual: number };

	const categoryBars: CategoryRow[] = $derived.by(() => {
		const labels = data.qualifications?.labels ?? [];
		const values = data.qualifications?.values ?? [];

		// Per-category residual count: walk scenarios once, increment for each
		// qualification name attached to the scenario when its residual_level is
		// rated.
		const residualCounts = new Map<string, number>();
		for (const s of data.scenarios as DashboardRiskScenario[]) {
			const lvl = (s.residual_level as any)?.value;
			if (typeof lvl !== 'number' || lvl < 0) continue;
			for (const q of s.qualifications ?? []) {
				const qname = typeof q === 'string' ? q : (q?.str ?? '');
				if (!qname) continue;
				residualCounts.set(qname, (residualCounts.get(qname) ?? 0) + 1);
			}
		}

		return labels
			.map((name, idx) => ({
				name,
				current: values[idx] ?? 0,
				residual: residualCounts.get(name) ?? 0
			}))
			.sort((a, b) => b.current - a.current)
			.slice(0, 6);
	});

	const maxCategory = $derived(
		Math.max(1, ...categoryBars.map((c) => Math.max(c.current, c.residual)))
	);

	// --- Latest updates -------------------------------------------------------
	const latest: LegislativeUpdate[] = $derived(data.legislative.items ?? []);

	function impactText(item: LegislativeUpdate): string {
		const level = item.impact_level ?? '';
		if (!level) return item.impact_label ?? '';
		const key = `impact${level.charAt(0).toUpperCase() + level.slice(1)}`;
		const translated = safeTranslate(key);
		return translated && translated !== key ? translated : item.impact_label || level;
	}

	function statusText(item: LegislativeUpdate): string {
		const status = item.status ?? '';
		if (!status) return item.status_label ?? '';
		const key = `status${status
			.split('_')
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join('')}`;
		const translated = safeTranslate(key);
		return translated && translated !== key ? translated : item.status_label || status;
	}

	function impactClasses(level: string): string {
		switch (level) {
			case 'high':
			case 'critical':
				return 'bg-red-100 text-red-700 border-red-200';
			case 'medium':
				return 'bg-amber-100 text-amber-700 border-amber-200';
			case 'low':
				return 'bg-green-100 text-green-700 border-green-200';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-200';
		}
	}

	function statusClasses(status: string): string {
		switch (status) {
			case 'new':
				return 'bg-emerald-100 text-emerald-700';
			case 'under_analysis':
				return 'bg-orange-100 text-orange-700';
			case 'completed':
				return 'bg-blue-100 text-blue-700';
			case 'awaiting_approval':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}

	function formatDate(iso: string | null): string {
		if (!iso) return '';
		try {
			return new Date(iso).toLocaleDateString('ar-EG', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return iso;
		}
	}

	// --- Compliance gauges ----------------------------------------------------
	function gaugeColor(progress: number): string {
		if (progress >= 80) return '#10B981';
		if (progress >= 60) return '#F59E0B';
		return '#EF4444';
	}

	function progressDelta(_p: number): string {
		// We do not have month-over-month deltas yet (would need
		// BuiltinMetricSample history). Surface "—" instead of fake numbers.
		return '—';
	}

	function daysUntil(date: string | null | undefined): number | null {
		if (!date) return null;
		const d = new Date(date).getTime();
		if (Number.isNaN(d)) return null;
		const diff = d - Date.now();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	}

	// --- Third-party assessment results --------------------------------------
	const tprmRows = $derived(
		(data.tprmMetrics ?? [])
			.map((row) => ({
				...row,
				score:
					typeof row.review_progress === 'number'
						? row.review_progress
						: typeof row.completion === 'number'
							? row.completion
							: 0
			}))
			.sort((a, b) => b.score - a.score)
			.slice(0, 8)
	);

	function vendorBarColor(score: number): string {
		if (score >= 80) return 'bg-emerald-500';
		if (score >= 60) return 'bg-amber-500';
		return 'bg-orange-500';
	}
</script>

<div class="space-y-4" dir="rtl">
	<!-- ============================================================ -->
	<!-- Top row: Latest updates                                       -->
	<!-- ============================================================ -->
	<section class="wgrc-card !p-5">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-base font-semibold text-gray-900">{m.latestUpdates()}</h2>
			<a
				href="/legislative-updates"
				class="text-xs text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
			>
				{m.viewAllUpdates()}
				<i class="fa-solid fa-arrow-left text-[10px]"></i>
			</a>
		</div>

		{#if data.legislative.upstreamUnauthorized}
			<p class="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
				{m.legislativeUpdatesAuthRequired()}
			</p>
		{:else if data.legislative.upstreamError}
			<p class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
				{m.failedToLoadLegislativeUpdates()}
			</p>
		{:else if latest.length === 0}
			<p class="text-sm text-gray-500 py-4 text-center">{m.noLegislativeUpdates()}</p>
		{:else}
			<ul class="divide-y divide-gray-100">
				{#each latest as item (item.id)}
					<li>
						<a
							href={`/legislative-updates/${encodeURIComponent(item.id)}`}
							class="flex items-start justify-between gap-4 py-3 group hover:bg-gray-50/60 -mx-2 px-2 rounded-lg transition-colors"
						>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2 mb-1">
									{#if item.source}
										<span class="wgrc-badge bg-red-50 text-red-700 border border-red-100">
											{item.source}
										</span>
									{/if}
									{#if item.published_at}
										<span class="text-xs text-gray-400">{formatDate(item.published_at)}</span>
									{/if}
								</div>
								<p
									class="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors"
									title={item.title}
								>
									{item.title}
								</p>
							</div>
							<div class="flex items-center gap-2 shrink-0">
								{#if item.status}
									<span class="wgrc-badge {statusClasses(item.status)}">
										{statusText(item)}
									</span>
								{/if}
								{#if item.impact_level}
									<span
										class="wgrc-badge border {impactClasses(item.impact_level)}"
									>
										{impactText(item)}
									</span>
								{/if}
								{#if item.external_url}
									<i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-400"></i>
								{/if}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<!-- ============================================================ -->
	<!-- Compliance gauges row                                         -->
	<!-- ============================================================ -->
	<section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		{#if data.frameworks.length === 0}
			<div class="wgrc-card !p-6 col-span-full text-center">
				<i class="fa-solid fa-certificate text-3xl text-gray-300 mb-2"></i>
				<p class="text-sm text-gray-500">{m.noComplianceAssessments()}</p>
				<a
					href="/compliance-assessments"
					class="text-xs text-blue-600 hover:underline mt-1 inline-block"
				>
					{m.createComplianceAssessment()}
				</a>
			</div>
		{:else}
			{#each data.frameworks as fwk}
				{@const days = daysUntil(fwk.due_date)}
				<div class="wgrc-card !p-5">
					<div class="flex items-center gap-3">
						<!-- Circular progress ring -->
						<div class="relative w-20 h-20 shrink-0">
							<svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
								<circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" stroke-width="10" />
								<circle
									cx="50"
									cy="50"
									r="42"
									fill="none"
									stroke={gaugeColor(fwk.progress)}
									stroke-width="10"
									stroke-linecap="round"
									stroke-dasharray={2 * Math.PI * 42}
									stroke-dashoffset={2 * Math.PI * 42 * (1 - fwk.progress / 100)}
								/>
							</svg>
							<div
								class="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-900"
							>
								{fwk.progress}%
							</div>
						</div>

						<div class="min-w-0 flex-1">
							<p
								class="text-sm font-semibold text-gray-900 truncate"
								title={fwk.name}
							>
								{fwk.name}
							</p>
							<p class="text-xs text-gray-500 mt-0.5">
								{fwk.assessmentsCount}
								{fwk.assessmentsCount === 1 ? m.assessmentSingular() : m.assessmentPlural()}
							</p>
							<p class="text-[11px] text-gray-400 mt-1">
								{m.monthDelta()}: {progressDelta(fwk.progress)}
							</p>
							{#if days !== null && days >= 0}
								<p class="text-[11px] text-amber-600 mt-0.5">
									<i class="fa-regular fa-calendar text-[10px]"></i>
									{m.auditInDays({ count: days })}
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</section>

	<!-- ============================================================ -->
	<!-- Risk heatmap (collapsible, compact by default)               -->
	<!-- ============================================================ -->
	<section class="wgrc-card !p-0 overflow-hidden">
		<!-- ── Header (always visible) ── -->
		<div class="flex items-center justify-between px-5 py-3">
			<!-- Left: title + subtitle -->
			<div class="flex items-center gap-3 min-w-0">
				<div class="min-w-0">
					<h2 class="text-base font-semibold text-gray-900 leading-tight">{m.riskMap()}</h2>
					<p class="text-xs text-gray-500">{m.totalRisksLabel({ count: totalRisks })}</p>
				</div>

				<!-- Inline level pills (compact summary) -->
				{#if levelSummary.length > 0}
					<div class="hidden sm:flex items-center gap-2 flex-wrap">
						{#each levelSummary as lvl}
							<span class="inline-flex items-center gap-1 text-xs text-gray-600">
								<span
									class="w-2 h-2 rounded-full shrink-0"
									style:background-color={lvl.color || '#9CA3AF'}
								></span>
								<span class="tabular-nums font-semibold text-gray-800">{lvl.value}</span>
								<span class="text-gray-400">{safeTranslate(lvl.name)}</span>
							</span>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Right: view toggle + expand button -->
			<div class="flex items-center gap-2 shrink-0">
				<!-- Current / Residual / Inherent toggle -->
				<div class="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs">
					<button
						type="button"
						class="px-2.5 py-1 rounded-md transition-all {riskView === 'current'
							? 'bg-white shadow-sm text-gray-900 font-medium'
							: 'text-gray-500 hover:text-gray-700'}"
						onclick={() => (riskView = 'current')}
					>
						{m.current()}
					</button>
					<button
						type="button"
						class="px-2.5 py-1 rounded-md transition-all {riskView === 'residual'
							? 'bg-white shadow-sm text-gray-900 font-medium'
							: 'text-gray-500 hover:text-gray-700'}"
						onclick={() => (riskView = 'residual')}
					>
						{m.residual()}
					</button>
					{#if data.riskLevels?.inherent}
						<button
							type="button"
							class="px-2.5 py-1 rounded-md transition-all {riskView === 'inherent'
								? 'bg-white shadow-sm text-gray-900 font-medium'
								: 'text-gray-500 hover:text-gray-700'}"
							onclick={() => (riskView = 'inherent')}
						>
							{m.inherent()}
						</button>
					{/if}
				</div>

				<!-- Expand / collapse chevron -->
				<button
					type="button"
					onclick={() => (heatmapExpanded = !heatmapExpanded)}
					class="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1 bg-gray-50 hover:bg-gray-100 transition-all"
					aria-label={heatmapExpanded ? m.collapse() : m.expand()}
				>
					<i class="fa-solid {heatmapExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
					<span class="hidden sm:inline">{heatmapExpanded ? m.collapse() : m.expand()}</span>
				</button>
			</div>
		</div>

		<!-- ── Expanded body ── -->
		{#if heatmapExpanded}
			<div class="border-t border-gray-100 px-5 pb-5 pt-4">
				{#if totalRisks > 0 && matrix.every((row) => row.every((c) => c.count === 0))}
					<div class="mb-4 flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
						<i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 shrink-0"></i>
						<div class="min-w-0">
							<p class="text-sm font-medium text-amber-800">{m.scenariosNotScored({ count: totalRisks })}</p>
							<p class="text-xs text-amber-700/80 mt-0.5">{m.scenariosNotScoredHint()}</p>
							<a
								href="/risk-scenarios"
								class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:underline mt-1"
							>
								{m.scoreNow()}
								<i class="fa-solid fa-arrow-left text-[10px]"></i>
							</a>
						</div>
					</div>
				{/if}

				<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<!-- Heatmap grid -->
					<div class="lg:col-span-2">
						<div class="flex">
							<!-- Y-axis label -->
							<div
								class="flex items-center justify-center text-xs text-gray-500 font-medium pr-2"
								style="writing-mode: vertical-rl; transform: rotate(180deg);"
							>
								{m.likelihood()}
							</div>

							<div class="flex-1">
								<div
									class="grid gap-1"
									style="grid-template-columns: auto repeat({matrixSize}, minmax(0, 1fr));"
								>
									{#each Array.from({ length: matrixSize }) as _, p (p)}
										{@const probaIdx = matrixSize - 1 - p}
										<div class="flex items-center justify-end pr-2 text-[10px] text-gray-500">
											{probaLabels[probaIdx]}
										</div>
										{#each Array.from({ length: matrixSize }) as _, i (i)}
											{@const cell = matrix[probaIdx][i]}
											<div
												class="aspect-square flex items-center justify-center rounded-md text-xs font-semibold transition-transform hover:scale-105"
												style:background-color={cell.count > 0 ? levelGradient[cell.level] : '#F9FAFB'}
												style:color={cell.count > 0 && cell.level >= 3 ? '#fff' : '#374151'}
											>
												{cell.count > 0 ? cell.count : ''}
											</div>
										{/each}
									{/each}
									<div></div>
									{#each Array.from({ length: matrixSize }) as _, i (i)}
										<div class="text-[10px] text-gray-500 text-center pt-1">
											{impactLabels[i]}
										</div>
									{/each}
								</div>
								<div class="text-xs text-gray-500 font-medium text-center mt-2">{m.impactISO()}</div>
							</div>
						</div>
					</div>

					<!-- Level legend (expanded detail) -->
					<div class="space-y-2">
						<p class="text-xs text-gray-500 font-medium mb-2">{m.byLevel()}</p>
						{#if levelSummary.length === 0}
							<p class="text-xs text-gray-400 italic">{m.noRiskScenarios()}</p>
						{:else}
							{#each levelSummary as lvl}
								<div class="flex items-center justify-between text-sm">
									<span class="inline-flex items-center gap-2">
										<span class="w-3 h-3 rounded-full" style:background-color={lvl.color || '#9CA3AF'}></span>
										<span class="text-gray-700">{safeTranslate(lvl.name)}</span>
									</span>
									<span class="font-semibold text-gray-900 tabular-nums">{lvl.value}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- ============================================================ -->
	<!-- Mid row: Highest risk by category + Policy violations         -->
	<!-- ============================================================ -->
	<section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
		<!-- Highest residual risk by category -->
		<div class="wgrc-card !p-5">
			<h2 class="text-base font-semibold text-gray-900 mb-4">{m.highestResidualRiskByCategory()}</h2>
			{#if categoryBars.length === 0}
				<p class="text-sm text-gray-400 italic py-6 text-center">
					{m.noQualificationsYet()}
				</p>
			{:else}
				<div class="space-y-3">
					{#each categoryBars as cat}
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-gray-700">{safeTranslate(cat.name)}</span>
								<span class="text-gray-500 text-xs tabular-nums">
									{cat.residual} / {cat.current}
								</span>
							</div>
							<div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
								<!-- Total / current as light bar -->
								<div
									class="absolute inset-y-0 right-0 bg-gray-300 rounded-full"
									style:width="{(cat.current / maxCategory) * 100}%"
								></div>
								<!-- Residual as overlay -->
								<div
									class="absolute inset-y-0 right-0 bg-rose-500 rounded-full"
									style:width="{(cat.residual / maxCategory) * 100}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
				<div class="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs">
					<span class="inline-flex items-center gap-1.5 text-gray-500">
						<span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
						{m.residual()}
					</span>
					<span class="inline-flex items-center gap-1.5 text-gray-500">
						<span class="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
						{m.current()}
					</span>
				</div>
			{/if}
		</div>

		<!-- Policy violations — placeholder (no dedicated violation events model yet) -->
		<div class="wgrc-card !p-5">
			<h2 class="text-base font-semibold text-gray-900 mb-4">{m.policyViolationsByPolicy()}</h2>
			<div class="flex flex-col items-center justify-center py-8 text-center">
				<i class="fa-solid fa-file-shield text-3xl text-gray-300 mb-3"></i>
				<p class="text-sm text-gray-500 mb-1">{m.policyViolationsComingSoon()}</p>
				<p class="text-xs text-gray-400 max-w-xs">{m.policyViolationsExplain()}</p>
			</div>
		</div>
	</section>

	<!-- ============================================================ -->
	<!-- Third-party results + Compliance trend                        -->
	<!-- ============================================================ -->
	<section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
		<!-- TPRM -->
		<div class="wgrc-card !p-5">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-base font-semibold text-gray-900">{m.thirdPartyAssessmentResults()}</h2>
				<a
					href="/analytics/tprm"
					class="text-xs text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
				>
					{m.viewAll()}
					<i class="fa-solid fa-arrow-left text-[10px]"></i>
				</a>
			</div>
			{#if tprmRows.length === 0}
				<p class="text-sm text-gray-400 italic py-6 text-center">{m.noEntityAssessments()}</p>
			{:else}
				<ul class="space-y-3">
					{#each tprmRows as row}
						<li>
							<div class="flex items-center justify-between text-sm mb-1">
								<span
									class="text-gray-700 truncate max-w-[60%]"
									title={row.provider}
								>
									{row.provider}
								</span>
								<span class="text-xs text-gray-500">
									<span class="font-semibold text-gray-900">{row.score}%</span>
									{#if row.last_update}
										<span class="text-gray-400"> · {row.last_update}</span>
									{/if}
								</span>
							</div>
							<div class="h-2 bg-gray-100 rounded-full overflow-hidden">
								<div
									class="h-full {vendorBarColor(row.score)} rounded-full transition-all duration-500"
									style:width="{Math.min(100, Math.max(0, row.score))}%"
								></div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- Compliance trend — placeholder (BuiltinMetricSample-derived) -->
		<div class="wgrc-card !p-5">
			<h2 class="text-base font-semibold text-gray-900 mb-4">{m.complianceTrend6Months()}</h2>
			<div class="flex flex-col items-center justify-center py-8 text-center">
				<i class="fa-solid fa-chart-line text-3xl text-gray-300 mb-3"></i>
				<p class="text-sm text-gray-500 mb-1">{m.trendComingSoon()}</p>
				<p class="text-xs text-gray-400 max-w-xs">{m.trendExplain()}</p>
			</div>
			<div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-4">
				<div class="text-center">
					<p class="text-xs text-gray-500">{m.activeExceptions()}</p>
					<p class="text-2xl font-bold text-gray-900 mt-1">
						{data.counters?.exceptions ?? 0}
					</p>
				</div>
				<div class="text-center">
					<p class="text-xs text-gray-500">{m.policiesCount()}</p>
					<p class="text-2xl font-bold text-gray-900 mt-1">
						{data.counters?.policies ?? 0}
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
