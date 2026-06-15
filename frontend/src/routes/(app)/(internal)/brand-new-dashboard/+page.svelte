<script lang="ts">
	import { m } from '$paraglide/messages';
	import { safeTranslate } from '$lib/utils/i18n';
	import type { PageData } from './$types';
	import type { DashboardRiskScenario, LegislativeUpdate } from './+page.server';

	interface Props { data: PageData; }
	let { data }: Props = $props();

	// ─── Legislative Updates helpers ────────────────────────────────────────────
	function impactBadgeClass(level: string): string {
		switch (level) {
			case 'high':     return 'bg-red-50 text-red-700';
			case 'medium':   return 'bg-amber-50 text-amber-700';
			case 'low':      return 'bg-emerald-50 text-emerald-700';
			default:         return 'bg-gray-50 text-gray-600';
		}
	}
	function impactDotClass(level: string): string {
		switch (level) {
			case 'high':   return 'bg-red-500';
			case 'medium': return 'bg-amber-500';
			case 'low':    return 'bg-emerald-500';
			default:       return 'bg-gray-400';
		}
	}
	function statusBadgeClass(status: string): string {
		switch (status) {
			case 'new':               return 'bg-blue-50 text-blue-700';
			case 'under_analysis':    return 'bg-amber-50 text-amber-700';
			case 'pending_review':    return 'bg-orange-50 text-orange-700';
			case 'completed':         return 'bg-emerald-50 text-emerald-700';
			default:                  return 'bg-gray-50 text-gray-600';
		}
	}
	function formatDate(dateStr: string | null | undefined): string {
		if (!dateStr) return '';
		try {
			return new Date(dateStr).toLocaleDateString('ar-SA', {
				year: 'numeric', month: 'short', day: 'numeric'
			});
		} catch { return dateStr; }
	}
	function policyCountLabel(count: number): string {
		if (!count) return '';
		if (count === 1) return 'يؤثر على سياسة واحدة';
		if (count === 2) return 'يؤثر على سياستين';
		return `يؤثر على ${count} سياسات`;
	}

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

	// ─── Max residual by category ──────────────────────────────────────────────
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

	// ─── Compliance donut ──────────────────────────────────────────────────────
	function donutParams(score: number, size = 72, sw = 7) {
		const r    = (size - sw) / 2;
		const circ = 2 * Math.PI * r;
		const fill = (score / 100) * circ;
		const cx   = size / 2;
		const cy   = size / 2;
		const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';
		return { r, circ, fill, cx, cy, color, size, sw };
	}

	function daysUntil(date: string | null | undefined): number | null {
		if (!date) return null;
		const d = new Date(date).getTime();
		if (Number.isNaN(d)) return null;
		return Math.ceil((d - Date.now()) / (1000 * 60 * 60 * 24));
	}
</script>

<div class="space-y-5 p-5" dir="rtl">

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- Header                                                         -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div>
		<h1 class="text-xl font-bold text-gray-900">{m.brandNewDashboard()}</h1>
		<p class="text-sm text-gray-500 mt-0.5">{m.executiveView()}</p>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- المستجدات الأخيرة — Legislative Updates (unified list)        -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<!-- Section header -->
		<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
			<h2 class="text-sm font-semibold text-gray-900">{m.latestUpdates()}</h2>
			<a
				href="/legislative-updates"
				class="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
			>
				{m.viewAllUpdates()}
				<i class="fa-solid fa-chevron-left text-[10px]"></i>
			</a>
		</div>

		{#if data.legislative.items.length === 0}
			<div class="flex flex-col items-center justify-center py-10 text-gray-400">
				<i class="fa-solid fa-inbox text-2xl mb-2"></i>
				<p class="text-xs">{m.noUpdatesYet?.() ?? 'لا توجد مستجدات'}</p>
			</div>
		{:else}
			<div class="divide-y divide-gray-100">
				{#each data.legislative.items.slice(0, 5) as item (item.id)}
					<a
						href="/legislative-updates/{item.id}"
						class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/70 transition-colors group"
					>
						<!-- RIGHT side: meta + title + description -->
						<div class="flex-1 min-w-0">
							<!-- Source · date -->
							<div class="flex items-center gap-2 mb-1 flex-wrap">
								{#if item.source}
									<span class="text-[10px] text-gray-400 font-medium">({item.source})</span>
								{/if}
								{#if item.published_at}
									<span class="text-[10px] text-gray-400">
										{formatDate(item.published_at)}
									</span>
								{/if}
							</div>
							<!-- Title -->
							<p class="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1 group-hover:text-blue-700 transition-colors">
								{item.title}
							</p>
							<!-- Description -->
							{#if item.description}
								<p class="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
									{item.description}
								</p>
							{/if}
						</div>

						<!-- LEFT side: badges + arrow -->
						<div class="flex items-center gap-1.5 shrink-0">
							{#if item.status}
								<span class="text-[10px] px-2 py-0.5 rounded font-medium {statusBadgeClass(item.status)}">
									{item.status_label || item.status}
								</span>
							{/if}
							{#if item.impact_level}
								<span class="text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 {impactBadgeClass(item.impact_level)}">
									<span class="w-1.5 h-1.5 rounded-full {impactDotClass(item.impact_level)}"></span>
									{item.impact_label || item.impact_level}
								</span>
							{/if}
							<i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-300 group-hover:text-blue-500 transition-colors mr-1"></i>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- Framework Score Cards (4 donuts)                               -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	{#if data.frameworks.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			{#each data.frameworks.slice(0, 4) as fwk}
				{@const dp   = donutParams(fwk.progress, 72, 7)}
				{@const days = daysUntil(fwk.due_date)}
				<a
					href="/compliance-assessments"
					class="bg-white rounded-xl border border-gray-200 p-4 text-right hover:shadow-sm transition-all block"
				>
					<div class="flex items-start justify-between gap-2">
						<div class="flex-1 min-w-0">
							<h4 class="text-xs font-semibold text-gray-900 truncate">{fwk.name}</h4>
							<p class="text-[10px] text-gray-400 mt-0.5">
								{fwk.assessmentsCount}
								{fwk.assessmentsCount === 1 ? m.assessmentSingular() : m.assessmentPlural()}
							</p>
							<!-- Delta placeholder -->
							<div class="flex items-center gap-1 mt-1">
								<i class="fa-solid fa-arrow-trend-up text-[9px] text-emerald-500"></i>
								<span class="text-[10px] text-emerald-600 font-medium">+0% مقارنة بالشهر الماضي</span>
							</div>
							{#if days !== null && days >= 0}
								<div class="mt-1.5">
									<span class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full
										{days <= 14 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}">
										<i class="fa-regular fa-calendar text-[9px]"></i>
										{m.auditInDays({ count: days })}
									</span>
								</div>
							{/if}
						</div>
						<!-- Donut SVG -->
						<svg width={dp.size} height={dp.size} viewBox="0 0 {dp.size} {dp.size}" class="shrink-0">
							<circle cx={dp.cx} cy={dp.cy} r={dp.r}
								fill="none" stroke="#f3f4f6" stroke-width={dp.sw} />
							<circle cx={dp.cx} cy={dp.cy} r={dp.r}
								fill="none" stroke={dp.color} stroke-width={dp.sw}
								stroke-dasharray="{dp.fill} {dp.circ}"
								stroke-linecap="round"
								transform="rotate(-90 {dp.cx} {dp.cy})" />
							<text x={dp.cx} y={dp.cy + 1}
								text-anchor="middle" dominant-baseline="central"
								font-size="13" font-weight="700" fill="#111827"
							>{fwk.progress}%</text>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- Heatmap — full width                                          -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
			<h3 class="text-sm font-semibold text-gray-900">{m.riskMap()}</h3>
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
					<div class="flex flex-col gap-0.5 mr-1.5">
						{#each [5, 4, 3, 2, 1] as l}
							<div class="h-10 flex items-center justify-center">
								<span class="text-[10px] text-gray-400 w-3 text-center">{l}</span>
							</div>
						{/each}
					</div>
					<div class="flex-1">
						<div class="grid grid-cols-5 gap-1">
							{#each [5, 4, 3, 2, 1] as l}
								{#each [1, 2, 3, 4, 5] as imp}
									{@const count = heatmapGrid[l - 1][imp - 1]}
									{@const score = l * imp}
									<div
										class="h-12 rounded flex items-center justify-center text-sm font-bold"
										style:background-color={cellBg(count, score)}
										style:color={cellFg(count, score)}
									>
										{count > 0 ? count : ''}
									</div>
								{/each}
							{/each}
						</div>
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
				<p class="text-[9px] text-gray-400 mt-1">{m.likelihood()}</p>
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- Category (right 1/3 vertical list)  +  Bottom row (2 cols)   -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

		<!-- Category — right col (1/3), vertical list -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-4 py-3 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.highestResidualRiskByCategory()}</h3>
			</div>
			{#if categoryRiskMax.length === 0}
				<div class="flex flex-col items-center justify-center py-8 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">{m.noQualificationsYet()}</p>
				</div>
			{:else}
				<div class="divide-y divide-gray-50">
					{#each categoryRiskMax as cat}
						<div class="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50/60 transition-colors">
							<!-- Category name — start (right in RTL) -->
							<span class="text-xs font-medium text-gray-800 flex-1 truncate">{cat.category}</span>
							<!-- vs inherent + score badge — end (left in RTL) -->
							<div class="flex items-center gap-2 shrink-0">
								<span class="text-[10px] text-gray-400">مقابل {cat.maxInherent}</span>
								<span class="inline-flex items-center justify-center min-w-[28px] h-6 rounded text-xs font-bold px-1.5 {severityStyle(cat.maxResidual)}">
									{cat.maxResidual}
								</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- TPRM + Policy violations in remaining 2/3 -->
		<div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

			<!-- TPRM — CENTER (first in DOM = right in RTL) -->
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
					<div class="p-4 space-y-2.5">
						{#each tprmRows as row}
							<div>
								<!-- Provider name (right) · date + % (left) -->
								<div class="flex items-center justify-between mb-1.5">
									<span class="text-xs font-semibold text-gray-800 truncate flex-1">{row.provider}</span>
									<div class="flex items-center gap-1.5 shrink-0 mr-3">
										{#if row.due_date}
											<span class="text-[10px] text-gray-400">{formatDate(row.due_date)}</span>
										{/if}
										<span class="text-xs font-bold
											{row.score >= 80 ? 'text-emerald-600' : row.score >= 60 ? 'text-amber-600' : 'text-red-600'}">
											{row.score}%
										</span>
									</div>
								</div>
								<!-- Progress bar -->
								<div class="h-2 bg-gray-100 rounded-full overflow-hidden" dir="ltr">
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

			<!-- Policy violations — LEFT (second in DOM = left in RTL) -->
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
	</div>

</div>
