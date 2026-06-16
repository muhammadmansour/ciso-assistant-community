<script lang="ts">
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { m } from '$paraglide/messages';
	import { getLocale } from '$paraglide/runtime';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import type { PageData } from './$types';
	import type { DashboardRiskScenario } from './+page.server';

	interface Props { data: PageData; }
	let { data }: Props = $props();

	// ─── Legislative Updates helpers ─────────────────────────────────────────
	function impactBadgeClass(level: string): string {
		switch (level) {
			case 'high':   return 'bg-red-50 text-red-700';
			case 'medium': return 'bg-amber-50 text-amber-700';
			case 'low':    return 'bg-emerald-50 text-emerald-700';
			default:       return 'bg-gray-50 text-gray-600';
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
			case 'new':            return 'bg-blue-50 text-blue-700';
			case 'under_analysis': return 'bg-amber-50 text-amber-700';
			case 'pending_review': return 'bg-orange-50 text-orange-700';
			case 'completed':      return 'bg-emerald-50 text-emerald-700';
			default:               return 'bg-gray-50 text-gray-600';
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

	// ─── Risk heatmap ─────────────────────────────────────────────────────────
	type RiskView = 'residual' | 'inherent' | 'current';
	type RiskScope = 'internal' | 'external';
	let riskView = $state<RiskView>('residual');
	let riskScope = $state<RiskScope>('internal');
	const MATRIX = 5;

	function isExternalScenario(s: DashboardRiskScenario): boolean {
		for (const q of s.qualifications ?? []) {
			const name = typeof q === 'string' ? q : ((q as { str?: string })?.str ?? '');
			if (/third.?party|external|vendor|supplier|outsourc|خارج|طرف\s*ثالث|مورد/i.test(name)) {
				return true;
			}
		}
		return !!(s.name && /third.?party|external|vendor|supplier|outsourc|خارج|طرف\s*ثالث|مورد/i.test(s.name));
	}

	const scopedScenarios = $derived.by(() => {
		const all = data.scenarios as DashboardRiskScenario[];
		return riskScope === 'external'
			? all.filter(isExternalScenario)
			: all.filter((s) => !isExternalScenario(s));
	});

	function getProbaImpact(s: DashboardRiskScenario, view: RiskView): { p: number; imp: number } {
		let p = -1;
		let imp = -1;
		if (view === 'current') {
			p = (s.current_proba as { value?: number })?.value ?? -1;
			imp = (s.current_impact as { value?: number })?.value ?? -1;
		} else if (view === 'residual') {
			p = (s.residual_proba as { value?: number })?.value ?? -1;
			imp = (s.residual_impact as { value?: number })?.value ?? -1;
		} else {
			p = (s.inherent_proba as { value?: number })?.value ?? -1;
			imp = (s.inherent_impact as { value?: number })?.value ?? -1;
		}
		return { p, imp };
	}

	function scoreBucket(p: number, imp: number): 'low' | 'medium' | 'high' | null {
		if (p < 0 || imp < 0) return null;
		const score = (p + 1) * (imp + 1);
		if (score >= 12) return 'high';
		if (score >= 6) return 'medium';
		return 'low';
	}

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
	function cellStyle(count: number, score: number): string {
		return `background-color: ${cellBg(count, score)}; color: ${cellFg(count, score)};`;
	}

	const heatmapCellScenarios = $derived.by(() => {
		const grid: DashboardRiskScenario[][] = Array.from({ length: MATRIX }, () =>
			Array.from({ length: MATRIX }, () => [])
		);
		for (const s of scopedScenarios) {
			const { p, imp } = getProbaImpact(s, riskView);
			if (p >= 0 && imp >= 0 && p < MATRIX && imp < MATRIX) grid[p][imp].push(s);
		}
		return grid;
	});

	const heatmapGrid = $derived.by(() =>
		heatmapCellScenarios.map((row) => row.map((cell) => cell.length))
	);

	const totalRisks = $derived(scopedScenarios.length);

	const riskLevelCounts = $derived.by(() => {
		const counts = { low: 0, medium: 0, high: 0 };
		for (const s of scopedScenarios) {
			const { p, imp } = getProbaImpact(s, riskView);
			const bucket = scoreBucket(p, imp);
			if (bucket) counts[bucket]++;
		}
		return counts;
	});

	// ─── Max residual by category ─────────────────────────────────────────────
	type CategoryMax = { category: string; maxResidual: number; maxInherent: number };

	const categoryRiskMax = $derived.by((): CategoryMax[] => {
		const map = new Map<string, { maxResidual: number; maxInherent: number }>();
		for (const s of data.scenarios as DashboardRiskScenario[]) {
			const rv  = (s.residual_level as any)?.value ?? -1;
			const iv  = (s.inherent_level as any)?.value ?? -1;
			const rScore = rv >= 0 ? (rv + 1) * 5 : 0;
			const iScore = iv >= 0 ? (iv + 1) * 5 : 0;
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

	// ─── TPRM ─────────────────────────────────────────────────────────────────
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

	// ─── Compliance trend chart ───────────────────────────────────────────────
	const ARABIC_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
	                       'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

	function monthLabel(key: string): string {
		const idx = parseInt(key.split('-')[1], 10) - 1;
		return ARABIC_MONTHS[idx] ?? key;
	}

	function trendNum(n: number): string {
		return n.toLocaleString(getLocale().startsWith('ar') ? 'ar-EG' : undefined);
	}

	function buildLinePath(pts: {x:number;y:number}[]): string {
		if (!pts.length) return '';
		let d = `M ${pts[0].x} ${pts[0].y}`;
		for (let i = 1; i < pts.length; i++) {
			const p = pts[i-1], c = pts[i], cx = (p.x + c.x) / 2;
			d += ` C ${cx} ${p.y},${cx} ${c.y},${c.x} ${c.y}`;
		}
		return d;
	}

	function buildAreaPath(pts: {x:number;y:number}[], maxY: number): string {
		if (!pts.length) return '';
		return buildLinePath(pts) + ` L ${pts[pts.length-1].x} ${maxY} L ${pts[0].x} ${maxY} Z`;
	}

	const PL = 20, PR = 8, PT = 14, PB = 28;
	const VW = 500, VH = 120;
	const CW = VW - PL - PR;
	const CH = VH - PT - PB;

	const trendPoints = $derived.by(() => {
		const trend = data.complianceTrend ?? [];
		const n = trend.length;
		return trend.map((d, i) => ({
			label: monthLabel(d.month),
			value: d.value,
			x: PL + (n <= 1 ? CW / 2 : (i / (n - 1)) * CW),
			y: PT + (d.value !== null ? (1 - d.value / 100) * CH : CH)
		}));
	});

	const hasAnyTrendData = $derived(
		(data.complianceTrend ?? []).some(p => p.value !== null)
	);

	// ─── Compliance donut ─────────────────────────────────────────────────────
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

<div class="space-y-5 p-5" dir="ltr">

	<!-- ══════════════════ Legislative Updates — unified list ══════════════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
			<h2 class="text-base font-semibold text-gray-900">{m.latestUpdates()}</h2>
			<a href="/legislative-updates"
				class="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
				{m.viewAllUpdates()}
				<i class="fa-solid fa-chevron-right text-xs"></i>
			</a>
		</div>

		{#if data.legislative.items.length === 0}
			<div class="flex flex-col items-center justify-center py-10 text-gray-400">
				<i class="fa-solid fa-inbox text-2xl mb-2"></i>
				<p class="text-sm">لا توجد مستجدات</p>
			</div>
		{:else}
			<div class="divide-y divide-gray-100">
				{#each data.legislative.items.slice(0, 5) as item (item.id)}
					<a href="/legislative-updates/{item.id}"
						class="flex items-center gap-4 px-5 py-5 hover:bg-gray-50/70 transition-colors group">
						<!-- Content: source · date · title · description -->
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 mb-1.5">
								{#if item.source}
									<span class="text-sm text-gray-400 font-medium">({item.source})</span>
								{/if}
								{#if item.published_at}
									<span class="text-sm text-gray-400">{formatDate(item.published_at)}</span>
								{/if}
							</div>
							<p class="text-base font-semibold text-gray-900 leading-snug line-clamp-1 group-hover:text-blue-700 transition-colors">
								{item.title}
							</p>
							{#if item.description}
								<p class="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
							{/if}
						</div>
						<!-- Badges: status · impact · link -->
						<div class="flex items-center gap-2.5 shrink-0">
							{#if item.status}
								<span class="text-sm px-3 py-1.5 rounded font-medium {statusBadgeClass(item.status)}">
									{item.status_label || item.status}
								</span>
							{/if}
							{#if item.impact_level}
								<span class="text-sm px-3 py-1.5 rounded font-medium flex items-center gap-1.5 {impactBadgeClass(item.impact_level)}">
									<span class="w-2 h-2 rounded-full {impactDotClass(item.impact_level)}"></span>
									{item.impact_label || item.impact_level}
								</span>
							{/if}
							<i class="fa-solid fa-arrow-up-right-from-square text-sm text-gray-300 group-hover:text-blue-500 transition-colors ml-1"></i>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ══════════════════ Framework Score Cards (4 donuts) ════════════════════ -->
	{#if data.frameworks.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
			{#each data.frameworks.slice(0, 4) as fwk}
				{@const dp   = donutParams(fwk.progress, 96, 8)}
				{@const days = daysUntil(fwk.due_date)}
				<a href="/compliance-assessments"
					class="bg-white rounded-xl border border-gray-200 p-5 min-h-[140px] text-left hover:shadow-sm transition-all block">
					<div class="flex items-start justify-between gap-3">
						<div class="flex-1 min-w-0">
							<h4 class="text-base font-semibold text-gray-900 truncate">{fwk.name}</h4>
							<p class="text-sm text-gray-400 mt-1">
								{fwk.assessmentsCount}
								{fwk.assessmentsCount === 1 ? m.assessmentSingular() : m.assessmentPlural()}
							</p>
							<div class="flex items-center gap-1.5 mt-1.5">
								<i class="fa-solid fa-arrow-trend-up text-xs text-emerald-500"></i>
								<span class="text-sm text-emerald-600 font-medium">+0% مقارنة بالشهر الماضي</span>
							</div>
							{#if days !== null && days >= 0}
								<div class="mt-2">
									<span class="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full
										{days <= 14 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}">
										<i class="fa-regular fa-calendar text-xs"></i>
										{m.auditInDays({ count: days })}
									</span>
								</div>
							{/if}
						</div>
						<svg width={dp.size} height={dp.size} viewBox="0 0 {dp.size} {dp.size}" class="shrink-0">
							<circle cx={dp.cx} cy={dp.cy} r={dp.r} fill="none" stroke="#f3f4f6" stroke-width={dp.sw} />
							<circle cx={dp.cx} cy={dp.cy} r={dp.r} fill="none" stroke={dp.color}
								stroke-width={dp.sw} stroke-dasharray="{dp.fill} {dp.circ}"
								stroke-linecap="round" transform="rotate(-90 {dp.cx} {dp.cy})" />
							<text x={dp.cx} y={dp.cy + 1} text-anchor="middle" dominant-baseline="central"
								font-size="16" font-weight="700" fill="#111827">{fwk.progress}%</text>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- ══════════════════ Heatmap — full width ════════════════════════════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
			<h3 class="text-sm font-semibold text-gray-900">{m.riskMap()}</h3>
			<div class="flex items-center gap-3 flex-wrap">
				<div class="flex rounded-lg border border-gray-200 overflow-hidden">
					<button type="button" onclick={() => (riskScope = 'internal')}
						class="px-3 py-1.5 text-xs font-medium transition-colors
							{riskScope === 'internal' ? 'bg-[#0077CC] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}">
						{m.internal()}
					</button>
					<button type="button" onclick={() => (riskScope = 'external')}
						class="px-3 py-1.5 text-xs font-medium transition-colors
							{riskScope === 'external' ? 'bg-[#0077CC] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}">
						{m.external()}
					</button>
				</div>
				<div class="flex items-center gap-2.5">
					<span class="inline-flex items-center gap-1.5 text-xs text-gray-600">
						<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
						{m.low()}
						<span class="font-bold text-gray-900 tabular-nums">{riskLevelCounts.low}</span>
					</span>
					<span class="inline-flex items-center gap-1.5 text-xs text-gray-600">
						<span class="w-2 h-2 rounded-full bg-amber-400"></span>
						{m.medium()}
						<span class="font-bold text-gray-900 tabular-nums">{riskLevelCounts.medium}</span>
					</span>
					<span class="inline-flex items-center gap-1.5 text-xs text-gray-600">
						<span class="w-2 h-2 rounded-full bg-red-500"></span>
						{m.high()}
						<span class="font-bold text-gray-900 tabular-nums">{riskLevelCounts.high}</span>
					</span>
				</div>
				<div class="flex rounded-lg border border-gray-200 overflow-hidden">
					{#each (['inherent', 'residual', 'current'] as RiskView[]) as v}
						<button type="button" onclick={() => (riskView = v)}
							class="px-2.5 py-1 text-[10px] font-medium transition-colors
								{riskView === v ? 'bg-[#0A1628] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}">
							{v === 'inherent' ? m.inherent() : v === 'residual' ? m.residual() : m.current()}
						</button>
					{/each}
				</div>
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
									{@const scenarios = heatmapCellScenarios[l - 1][imp - 1]}
									{@const score = l * imp}
									{@const cellClass =
										'h-12 rounded flex items-center justify-center text-sm font-bold transition-shadow'}
									{#if count === 1}
										<Anchor
											href="/risk-scenarios/{scenarios[0].id}"
											class="{cellClass} cursor-pointer hover:ring-2 hover:ring-blue-400/70"
											style={cellStyle(count, score)}
										>
											{count}
										</Anchor>
									{:else if count > 1}
										<Popover
											triggerBase="w-full"
											positioning={{ placement: 'top' }}
											arrow
										>
											{#snippet trigger()}
												<button
													type="button"
													class="{cellClass} w-full cursor-pointer hover:ring-2 hover:ring-blue-400/70"
													style={cellStyle(count, score)}
												>
													{count}
												</button>
											{/snippet}
											{#snippet content()}
												<div class="card bg-white border border-gray-200 shadow-lg p-3 min-w-[10rem]">
													{#each scenarios as scenario (scenario.id)}
														<Anchor
															href="/risk-scenarios/{scenario.id}"
															class="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-50 rounded"
														>
															{scenario.ref_id ?? scenario.name ?? scenario.id}
														</Anchor>
													{/each}
												</div>
											{/snippet}
										</Popover>
									{:else}
										<div class={cellClass} style={cellStyle(count, score)}></div>
									{/if}
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

	<!-- ══════════════════ Highest residual risk by category — full width ═══════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="px-5 py-4 border-b border-gray-100">
			<h3 class="text-sm font-semibold text-gray-900">{m.highestResidualRiskByCategory()}</h3>
		</div>
		{#if categoryRiskMax.length === 0}
			<div class="flex flex-col items-center justify-center py-10 text-gray-400">
				<i class="fa-solid fa-inbox text-2xl mb-2"></i>
				<p class="text-xs">{m.noQualificationsYet()}</p>
			</div>
		{:else}
			<div class="divide-y divide-gray-100">
				{#each categoryRiskMax as cat}
					<div class="flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors">
						<span class="text-sm font-medium text-gray-800 flex-1 truncate">{cat.category}</span>
						<div class="flex items-center gap-3 shrink-0">
							<span class="text-xs text-gray-400">مقابل {cat.maxInherent}</span>
							<span class="inline-flex items-center justify-center min-w-[36px] h-8 rounded text-sm font-bold px-2.5 {severityStyle(cat.maxResidual)}">
								{cat.maxResidual}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ══════════════════ Policy violations (left) + TPRM (right) ══════════════ -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

		<!-- Policy violations -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-5 py-4 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.policyViolationsByPolicy()}</h3>
			</div>
			<div class="flex flex-col items-center justify-center py-12 text-gray-400">
				<i class="fa-solid fa-inbox text-2xl mb-2"></i>
				<p class="text-xs">{m.policyViolationsComingSoon()}</p>
			</div>
		</div>

		<!-- TPRM -->
		<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div class="px-5 py-4 border-b border-gray-100">
				<h3 class="text-sm font-semibold text-gray-900">{m.thirdPartyAssessmentResults()}</h3>
			</div>
			{#if tprmRows.length === 0}
				<div class="flex flex-col items-center justify-center py-12 text-gray-400">
					<i class="fa-solid fa-inbox text-2xl mb-2"></i>
					<p class="text-xs">{m.noEntityAssessments()}</p>
				</div>
			{:else}
				<div class="px-5 py-4 space-y-5">
					{#each tprmRows as row}
						<div>
							<div class="flex items-center justify-between mb-2">
								<span class="text-sm font-semibold text-gray-800 truncate flex-1">{row.provider}</span>
								<div class="flex items-center gap-2.5 shrink-0 ml-3">
									{#if row.due_date}
										<span class="text-xs text-gray-400">{formatDate(row.due_date)}</span>
									{/if}
									<span class="text-sm font-bold {row.score >= 80 ? 'text-emerald-600' : row.score >= 60 ? 'text-amber-600' : 'text-red-600'}">
										{row.score}%
									</span>
								</div>
							</div>
							<div class="h-3 bg-gray-100 rounded-full overflow-hidden" dir="ltr">
								<div class="h-full rounded-full transition-all duration-500 {tprmBarColor(row.score)}"
									style:width="{row.score}%"></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ══════════════════ Compliance Trend — 6-month SVG area chart ═══════════ -->
	<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
			<h3 class="text-sm font-semibold text-gray-900">{m.complianceTrend6Months()}</h3>
			<div class="flex items-center gap-4 text-[11px] text-gray-500">
				<span class="flex items-center gap-1.5">
					<span class="w-4 h-0.5 rounded bg-blue-500 inline-block"></span>
					{m.averageCompliance()}
				</span>
				{#if (data.counters.exceptions ?? 0) > 0}
					<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium text-[10px]">
						<i class="fa-solid fa-triangle-exclamation text-[9px]"></i>
						{m.activeExceptionsCount({ count: data.counters.exceptions ?? 0 })}
					</span>
				{/if}
			</div>
		</div>

		{#if !hasAnyTrendData}
			<div class="flex flex-col items-center justify-center py-10 text-gray-400">
				<i class="fa-solid fa-chart-line text-2xl mb-2"></i>
				<p class="text-xs">{m.trendNoDataAutoCollect()}</p>
			</div>
		{:else}
			<div class="px-2 pt-3 pb-2" dir="ltr">
				<svg viewBox="0 0 {VW} {VH}" class="w-full" style="height:150px"
					role="img" aria-label={m.complianceTrendChartAria()}>
					<defs>
						<linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#3b82f6" stop-opacity="0.20"/>
							<stop offset="100%" stop-color="#3b82f6" stop-opacity="0.01"/>
						</linearGradient>
					</defs>

					<!-- Grid lines -->
					{#each [0, 25, 50, 75, 100] as pct}
						{@const gy = PT + (1 - pct / 100) * CH}
						<line x1={PL} y1={gy} x2={VW - PR} y2={gy}
							stroke="#f3f4f6" stroke-width="1"/>
						<text x={PL - 4} y={gy + 3.5} text-anchor="end"
							font-size="7.5" fill="#9ca3af">{trendNum(pct)}</text>
					{/each}

					<!-- Area fill -->
					<path d={buildAreaPath(trendPoints.filter(p => p.value !== null), PT + CH)}
						fill="url(#trendGrad)"/>

					<!-- Line -->
					<path d={buildLinePath(trendPoints.filter(p => p.value !== null))}
						fill="none" stroke="#3b82f6" stroke-width="2.5"
						stroke-linecap="round" stroke-linejoin="round"/>

					<!-- Dots + value labels -->
					{#each trendPoints as pt}
						{#if pt.value !== null}
							<circle cx={pt.x} cy={pt.y} r="4.5"
								fill="#fff" stroke="#3b82f6" stroke-width="2"/>
							<text x={pt.x} y={pt.y - 8}
								text-anchor="middle" font-size="8.5" fill="#3b82f6" font-weight="700">
								{trendNum(pt.value)}٪
							</text>
						{/if}
					{/each}

					<!-- X-axis month labels -->
					{#each trendPoints as pt}
						<text x={pt.x} y={PT + CH + 18}
							text-anchor="middle" font-size="9" fill="#6b7280">
							{pt.label}
						</text>
					{/each}
				</svg>
			</div>
		{/if}
	</div>

</div>
