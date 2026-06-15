<script lang="ts">
	import { m } from '$paraglide/messages';
	import { safeTranslate } from '$lib/utils/i18n';
	import type { PageData } from './$types';
	import type { DashboardRiskScenario, LegislativeUpdate } from './+page.server';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// ─── Risk heatmap ──────────────────────────────────────────────────────────
	type RiskView = 'residual' | 'inherent' | 'current';
	let riskView = $state<RiskView>('residual');

	const MATRIX = 5;

	function cellBg(count: number, score: number): string {
		if (count === 0) return '#F9FAFB';
		if (score >= 20) return '#ef4444';
		if (score >= 12) return '#f97316';
		if (score >= 6)  return '#fbbf24';
		if (score >= 2)  return '#86efac';
		return '#bbf7d0';
	}
	function cellFg(count: number, score: number): string {
		if (count === 0) return '#9CA3AF';
		return score >= 7 ? '#fff' : '#374151';
	}

	const heatmapGrid = $derived.by(() => {
		const grid: number[][] = Array.from({ length: MATRIX }, () => Array(MATRIX).fill(0));
		for (const s of data.scenarios as DashboardRiskScenario[]) {
			let p = -1, imp = -1;
			if (riskView === 'current') {
				p   = (s.current_proba  as any)?.value ?? -1;
				imp = (s.current_impact as any)?.value ?? -1;
			} else if (riskView === 'residual') {
				p   = (s.residual_proba  as any)?.value ?? -1;
				imp = (s.residual_impact as any)?.value ?? -1;
			} else {
				p   = (s.inherent_proba  as any)?.value ?? -1;
				imp = (s.inherent_impact as any)?.value ?? -1;
			}
			if (p >= 0 && imp >= 0 && p < MATRIX && imp < MATRIX) grid[p][imp]++;
		}
		return grid;
	});

	const totalRisks = $derived((data.scenarios as DashboardRiskScenario[]).length);

	// ─── Max residual risk by category ─────────────────────────────────────────
	type CategoryMax = { category: string; maxResidual: number; maxInherent: number };

	const categoryRiskMax = $derived.by((): CategoryMax[] => {
		const map = new Map<string, { maxResidual: number; maxInherent: number }>();
		for (const s of data.scenarios as DashboardRiskScenario[]) {
			const rv  = (s.residual_level as any)?.value ?? -1;
			const iv  = (s.inherent_level as any)?.value ?? -1;
			const rScore = rv  >= 0 ? (rv  + 1) * 5 : 0;
			const iScore = iv  >= 0 ? (iv  + 1) * 5 : 0;
			for (const q of (s.qualifications ?? [])) {
				const name = typeof q === 'string' ? q : ((q as any)?.str ?? '');
				if (!name) continue;
				const cur = map.get(name) ?? { maxResidual: 0, maxInherent: 0 };
				cur.maxResidual = Math.max(cur.maxResidual, rScore);
				cur.maxInherent = Math.max(cur.maxInherent, iScore);
				map.set(name, cur);
			}
		}
		return Array.from(map.entries())
			.map(([category, v]) => ({ category, ...v }))
			.sort((a, b) => b.maxResidual - a.maxResidual);
	});

	function severityStyle(score: number): string {
		if (score >= 15) return 'bg-red-100 text-red-700';
		if (score >= 7)  return 'bg-amber-100 text-amber-700';
		return 'bg-emerald-100 text-emerald-700';
	}

	// ─── TPRM ──────────────────────────────────────────────────────────────────
	const tprmRows = $derived(
		(data.tprmMetrics ?? [])
			.map((r) => ({
				...r,
				score: typeof r.review_progress === 'number' ? r.review_progress
				     : typeof r.completion       === 'number' ? r.completion : 0
			}))
			.sort((a, b) => b.score - a.score)
			.slice(0, 8)
	);

	function tprmBarColor(score: number): string {
		if (score >= 80) return 'bg-emerald-500';
		if (score >= 60) return 'bg-amber-500';
		return 'bg-red-500';
	}

	// ─── Helpers ───────────────────────────────────────────────────────────────
	function daysUntil(date: string | null | undefined): number | null {
		if (!date) return null;
		const d = new Date(date).getTime();
		if (Number.isNaN(d)) return null;
		return Math.ceil((d - Date.now()) / (1000 * 60 * 60 * 24));
	}

	// ─── Compliance donut params ────────────────────────────────────────────────
	function donutParams(score: number, size = 72, sw = 7) {
		const r    = (size - sw) / 2;
		const circ = 2 * Math.PI * r;
		const fill = (score / 100) * circ;
		const cx   = size / 2;
		const cy   = size / 2;
		const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';
		return { r, circ, fill, cx, cy, color, size, sw };
	}

	// ─── Glance bar ─────────────────────────────────────────────────────────────
	const ratedCount = $derived(
		(data.riskLevels?.current ?? []).reduce((s, l) => s + (l.value ?? 0), 0)
	);
</script>

<div class="space-y-5 p-5" dir="rtl">

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Header                                                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-xl font-bold text-gray-900">{m.brandNewDashboard()}</h1>
			<p class="text-sm text-gray-500 mt-0.5">{m.executiveView()}</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Legislative Updates                                          -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
			<h2 class="text-sm font-semibold text-gray-900">{m.latestUpdates()}</h2>
			<a href="/legislative-updates" class="text-xs text-blue-600 hover:underline">
				{m.viewAllUpdates()}
			</a>
		</div>
		{#if data.legislative.items.length === 0}
			<div class="flex flex-col items-center justify-center py-8 text-gray-400">
				<i class="fa-solid fa-inbox text-xl mb-2"></i>
				<p class="text-xs">{m.noQualificationsYet()}</p>
			</div>
		{:else}
			<div class="divide-y divide-gray-50">
				{#each data.legislative.items.slice(0, 3) as item (item.id ?? item.title)}
					<div class="flex items-start gap-3 px-4 py-3">
						<span class="wgrc-badge bg-blue-50 text-blue-700 shrink-0 mt-0.5 text-[10px]">
							{item.source ?? 'GRC'}
						</span>
						<div class="min-w-0 flex-1">
							<p class="text-sm font-medium text-gray-900 truncate">{item.title}</p>
							{#if item.summary}
								<p class="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.summary}</p>
							{/if}
						</div>
						{#if item.date}
							<span class="text-[10px] text-gray-400 shrink-0">{item.date}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Glance Bar                                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		<!-- Total risk scenarios -->
		<div class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all">
			<div class="text-[32px] leading-none font-bold text-gray-900">{totalRisks}</div>
			<div class="text-xs text-gray-500 mt-1.5">{m.totalRisksGlance()}</div>
		</div>
		<!-- Active exceptions -->
		<div class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all
			{(data.counters.exceptions ?? 0) > 0 ? 'ring-1 ring-red-200' : ''}">
			<div class="text-[32px] leading-none font-bold
				{(data.counters.exceptions ?? 0) > 0 ? 'text-red-600' : 'text-gray-900'}">
				{data.counters.exceptions ?? 0}
			</div>
			<div class="text-xs text-gray-500 mt-1.5">{m.activeExceptions()}</div>
		</div>
		<!-- Policies -->
		<div class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all">
			<div class="text-[32px] leading-none font-bold text-gray-900">{data.counters.policies ?? 0}</div>
			<div class="text-xs text-gray-500 mt-1.5">{m.policiesCount()}</div>
		</div>
		<!-- Frameworks -->
		<div class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all">
			<div class="text-[32px] leading-none font-bold text-gray-900">{data.counters.frameworks ?? 0}</div>
			<div class="text-xs text-gray-500 mt-1.5">{m.frameworksCount()}</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Framework Score Cards (4 donuts)                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	{#if data.frameworks.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			{#each data.frameworks.slice(0, 4) as fwk}
				{@const dp = donutParams(fwk.progress)}
				{@const days = daysUntil(fwk.due_date)}
				<a
					href="/compliance-assessments"
					class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all block"
				>
					<div class="flex items-start justify-between gap-2">
						<div class="flex-1 min-w-0">
							<h4 class="text-xs font-semibold text-gray-900 truncate">{fwk.name}</h4>
							<div class="flex items-center gap-1 mt-1">
								<span class="text-[10px] font-medium text-gray-500">
									{fwk.assessmentsCount}
									{fwk.assessmentsCount === 1 ? m.assessmentSingular() : m.assessmentPlural()}
								</span>
							</div>
							{#if days !== null && days >= 0}
								<div class="mt-1.5">
									<span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full
										{days <= 14 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}">
										<i class="fa-regular fa-calendar text-[9px]"></i>
										{m.auditInDays({ count: days })}
									</span>
								</div>
							{/if}
						</div>
						<!-- Donut -->
						<svg width={dp.size} height={dp.size} viewBox="0 0 {dp.size} {dp.size}" class="shrink-0">
							<circle cx={dp.cx} cy={dp.cy} r={dp.r} fill="none" stroke="#f3f4f6" stroke-width={dp.sw} />
							<circle
								cx={dp.cx} cy={dp.cy} r={dp.r}
								fill="none"
								stroke={dp.color}
								stroke-width={dp.sw}
								stroke-dasharray="{dp.fill} {dp.circ}"
								stroke-linecap="round"
								transform="rotate(-90 {dp.cx} {dp.cy})"
							/>
							<text
								x={dp.cx} y={dp.cy + 1}
								text-anchor="middle"
								dominant-baseline="central"
								font-size="13"
								font-weight="700"
								fill="#111827"
							>{fwk.progress}%</text>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Heatmap (2/3)  +  Max residual by category (1/3)            -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

		<!-- Compact heatmap -->
		<div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.riskMap()}</h3>
				<!-- toggle -->
				<div class="flex rounded-lg border border-gray-200 overflow-hidden">
					{#each (['inherent', 'residual', 'current'] as RiskView[]) as v}
						<button
							type="button"
							onclick={() => (riskView = v)}
							class="px-2.5 py-1 text-[10px] font-medium transition-colors
								{riskView === v ? 'bg-[#0A1628] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}"
						>
							{v === 'inherent' ? m.inherent() : v === 'residual' ? m.residual() : m.current()}
						</button>
					{/each}
				</div>
			</div>

			{#if totalRisks === 0}
				<div class="flex flex-col items-center justify-center py-10 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">{m.noRiskScenarios()}</p>
				</div>
			{:else}
				<div class="p-4" dir="ltr">
					<div class="flex">
						<!-- Y-axis numbers -->
						<div class="flex flex-col gap-0.5 mr-1.5">
							{#each [5, 4, 3, 2, 1] as l}
								<div class="h-10 flex items-center justify-center">
									<span class="text-[10px] text-gray-400 w-3 text-center">{l}</span>
								</div>
							{/each}
						</div>
						<!-- Grid cells -->
						<div class="flex-1">
							<div class="grid grid-cols-5 gap-0.5">
								{#each [5, 4, 3, 2, 1] as l}
									{#each [1, 2, 3, 4, 5] as imp}
										{@const count = heatmapGrid[l - 1][imp - 1]}
										{@const score = l * imp}
										<div
											class="h-10 rounded flex items-center justify-center text-xs font-bold"
											style:background-color={cellBg(count, score)}
											style:color={cellFg(count, score)}
										>
											{count > 0 ? count : ''}
										</div>
									{/each}
								{/each}
							</div>
							<!-- X-axis labels -->
							<div class="flex justify-between mt-1.5 px-1">
								{#each [1, 2, 3, 4, 5] as i}
									<span class="text-[10px] text-gray-400">{i}</span>
								{/each}
							</div>
							<div class="text-center mt-0.5">
								<span class="text-[9px] text-gray-400">{m.impactISO()}</span>
							</div>
						</div>
					</div>
					<!-- Y-axis label bottom-left -->
					<p class="text-[9px] text-gray-400 mt-1">{m.likelihood()}</p>
				</div>
			{/if}
		</div>

		<!-- Max residual by category -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.highestResidualRiskByCategory()}</h3>
			</div>
			{#if categoryRiskMax.length === 0}
				<div class="flex flex-col items-center justify-center py-10 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">{m.noQualificationsYet()}</p>
				</div>
			{:else}
				<div class="divide-y divide-gray-50">
					{#each categoryRiskMax as cat}
						<div class="flex items-center gap-3 px-4 py-2.5">
							<span class="text-xs font-medium text-gray-700 flex-1 truncate">{cat.category}</span>
							<span class="text-[10px] text-gray-400">vs {cat.maxInherent}</span>
							<span class="text-xs font-bold px-2 py-0.5 rounded {severityStyle(cat.maxResidual)}">
								{cat.maxResidual}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Third-party scores  +  Policy violations                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

		<!-- TPRM -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.thirdPartyAssessmentResults()}</h3>
			</div>
			{#if tprmRows.length === 0}
				<div class="flex flex-col items-center justify-center py-10 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">{m.noEntityAssessments()}</p>
				</div>
			{:else}
				<div class="p-4 space-y-3">
					{#each tprmRows as row}
						<div>
							<div class="flex items-center justify-between mb-1">
								<span class="text-xs font-medium text-gray-700 truncate flex-1">{row.provider}</span>
								<span class="text-xs font-semibold text-gray-900 ml-2 shrink-0">{row.score}%</span>
							</div>
							<div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
								<div
									class="h-full rounded-full transition-all duration-500 {tprmBarColor(row.score)}"
									style:width="{row.score}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Policy violations -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.policyViolationsByPolicy()}</h3>
			</div>
			<div class="flex flex-col items-center justify-center py-10 text-gray-400">
				<i class="fa-solid fa-inbox text-2xl mb-2"></i>
				<p class="text-xs">{m.policyViolationsComingSoon()}</p>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- Compliance Trend (6 months)                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
			<h3 class="text-sm font-semibold text-gray-900">{m.complianceTrend6Months()}</h3>
			<div class="flex items-center gap-4 text-[10px] text-gray-500">
				<span>
					{m.activeExceptions()}:
					<strong class="text-gray-700">{data.counters.exceptions ?? 0}</strong>
				</span>
			</div>
		</div>
		<div class="flex flex-col items-center justify-center py-10 text-gray-400">
			<i class="fa-solid fa-chart-line text-2xl mb-2"></i>
			<p class="text-xs">{m.trendComingSoon()}</p>
		</div>
	</section>

</div>
