<script lang="ts">
	import Anchor from '$lib/components/Anchor/Anchor.svelte';
	import { m } from '$paraglide/messages';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import type { PageData } from './$types';
	import type { DashboardRiskScenario } from './+page.server';

	interface Props { data: PageData; }
	let { data }: Props = $props();

	// ─── Legislative Updates helpers ─────────────────────────────────────────
	function impactBadgeClass(level: string): string {
		switch (level) {
			case 'high':   return 'bg-red-50 text-red-800 ring-red-200/60';
			case 'medium': return 'bg-amber-50 text-amber-800 ring-amber-200/60';
			case 'low':    return 'bg-emerald-50 text-emerald-800 ring-emerald-200/60';
			default:       return 'bg-slate-50 text-slate-600 ring-slate-200/60';
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
			case 'new':            return 'bg-blue-50 text-blue-800 ring-blue-200/60';
			case 'under_analysis': return 'bg-amber-50 text-amber-800 ring-amber-200/60';
			case 'pending_review': return 'bg-orange-50 text-orange-800 ring-orange-200/60';
			case 'completed':      return 'bg-emerald-50 text-emerald-800 ring-emerald-200/60';
			default:               return 'bg-slate-50 text-slate-600 ring-slate-200/60';
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
	type RiskScope = 'internal' | 'external';
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

	function getProbaImpact(s: DashboardRiskScenario): { p: number; imp: number } {
		const p = (s.residual_proba as { value?: number })?.value ?? -1;
		const imp = (s.residual_impact as { value?: number })?.value ?? -1;
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
		if (count === 0) return '#f1f5f9';
		if (score >= 20) return '#dc2626';
		if (score >= 12) return '#ea580c';
		if (score >= 6)  return '#f59e0b';
		if (score >= 2)  return '#22c55e';
		return '#86efac';
	}
	function cellFg(count: number, score: number): string {
		if (count === 0) return '#94a3b8';
		return score >= 7 ? '#fff' : '#1e293b';
	}
	function cellStyle(count: number, score: number): string {
		const shadow = count > 0 ? 'box-shadow: 0 2px 8px rgba(15,23,42,0.12);' : '';
		return `background-color: ${cellBg(count, score)}; color: ${cellFg(count, score)}; ${shadow}`;
	}

	const heatmapCellScenarios = $derived.by(() => {
		const grid: DashboardRiskScenario[][] = Array.from({ length: MATRIX }, () =>
			Array.from({ length: MATRIX }, () => [])
		);
		for (const s of scopedScenarios) {
			const { p, imp } = getProbaImpact(s);
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
			const { p, imp } = getProbaImpact(s);
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
		if (score >= 15) return 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm shadow-red-200';
		if (score >= 7)  return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shadow-amber-200';
		return 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm shadow-emerald-200';
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
		if (score >= 80) return 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 shadow-sm shadow-emerald-200/80';
		if (score >= 60) return 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 shadow-sm shadow-amber-200/80';
		return 'bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 shadow-sm shadow-red-200/80';
	}

	// ─── Policy governance posture (5-row panel) ──────────────────────────────
	// Each row is computed server-side from native AppliedControl fields
	// (see PolicyViewSet.posture in backend/core/views.py) and click-throughs
	// to /policies with a matching filter so the user lands on the exact
	// subset.
	const postureRows = $derived.by(() => {
		const p = data.policyPosture;
		const todayISO = new Date().toISOString().split('T')[0];
		const in90 = new Date();
		in90.setDate(in90.getDate() + 90);
		const in90ISO = in90.toISOString().split('T')[0];
		return [
			{
				key: 'published_active',
				label: m.policyRowPublishedActive(),
				count: p.published_active,
				href: '/policies?is_published=true&status=active',
				accent: 'border-l-emerald-500',
				dot:    'bg-emerald-500'
			},
			{
				key: 'review_due_90d',
				label: m.policyRowReviewDue90d(),
				count: p.review_due_90d,
				href: `/policies?expiry_date__gte=${todayISO}&expiry_date__lte=${in90ISO}`,
				accent: 'border-l-amber-500',
				dot:    'bg-amber-500'
			},
			{
				key: 'expired',
				label: m.policyRowExpired(),
				count: p.expired,
				href: `/policies?expiry_date__lt=${todayISO}`,
				accent: 'border-l-red-500',
				dot:    'bg-red-500'
			},
			{
				key: 'with_open_findings',
				label: m.policyRowOpenFindings(),
				count: p.with_open_findings,
				href: '/policies?has_open_findings=true',
				accent: 'border-l-rose-500',
				dot:    'bg-rose-500'
			},
			{
				key: 'unassigned',
				label: m.policyRowUnassigned(),
				count: p.unassigned,
				href: '/policies?is_assigned=false',
				accent: 'border-l-slate-400',
				dot:    'bg-slate-400'
			}
		];
	});

	// ─── Policies by open findings (horizontal bars) ──────────────────────────
	const policyFindingsRows = $derived(
		(data.policyFindings ?? [])
			.filter((r) => r.count > 0)
			.sort((a, b) => b.count - a.count)
			.slice(0, 8)
	);

	const maxPolicyFindingsCount = $derived(
		policyFindingsRows.reduce((max, r) => Math.max(max, r.count), 0) || 1
	);

	function policyFindingsBarColor(count: number): string {
		if (count >= 5) return 'bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 shadow-sm shadow-red-200/80';
		if (count >= 2) return 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm shadow-amber-200/80';
		return 'bg-gradient-to-r from-orange-400 to-amber-300 shadow-sm shadow-orange-200/60';
	}

	// ─── Compliance donut ─────────────────────────────────────────────────────
	function donutParams(score: number, size = 72, sw = 7) {
		const r    = (size - sw) / 2;
		const circ = 2 * Math.PI * r;
		const fill = (score / 100) * circ;
		const cx   = size / 2;
		const cy   = size / 2;
		const color = score >= 75 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
		const colorEnd = score >= 75 ? '#059669' : score >= 50 ? '#ea580c' : '#e11d48';
		return { r, circ, fill, cx, cy, color, colorEnd, size, sw };
	}

	function frameworkAccentClass(score: number): string {
		if (score >= 75) return 'border-t-emerald-500';
		if (score >= 50) return 'border-t-amber-500';
		return 'border-t-rose-500';
	}

	function categoryRowAccent(score: number): string {
		if (score >= 15) return 'border-l-red-500';
		if (score >= 7) return 'border-l-amber-500';
		return 'border-l-emerald-500';
	}

	function daysUntil(date: string | null | undefined): number | null {
		if (!date) return null;
		const d = new Date(date).getTime();
		if (Number.isNaN(d)) return null;
		return Math.ceil((d - Date.now()) / (1000 * 60 * 60 * 24));
	}
</script>

<div class="brand-dashboard font-cairo space-y-6 p-5 md:p-6" dir="ltr">

	<!-- ══════════════════ Legislative Updates — unified list ══════════════════ -->
	<div class="dashboard-card">
		<div class="dashboard-card-header flex items-center justify-between px-5 py-4">
			<h2 class="dashboard-title-lg flex items-center gap-2.5">
				<span class="dashboard-icon-badge bg-blue-100 text-blue-600"><i class="fa-solid fa-scale-balanced text-sm"></i></span>
				{m.latestUpdates()}
			</h2>
			<a href="/legislative-updates"
				class="dashboard-link text-sm font-semibold flex items-center gap-1.5">
				{m.viewAllUpdates()}
				<i class="fa-solid fa-chevron-right text-xs"></i>
			</a>
		</div>

		{#if data.legislative.items.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-slate-400">
				<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
					<i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
				</div>
				<p class="text-sm font-medium">لا توجد مستجدات</p>
			</div>
		{:else}
			<div class="divide-y divide-slate-100/80">
				{#each data.legislative.items.slice(0, 5) as item (item.id)}
					<a href="/legislative-updates/{item.id}"
						class="dashboard-list-row flex items-center gap-4 px-5 py-5 group">
						<!-- Content: source · date · title · description -->
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 mb-1.5">
								{#if item.source}
									<span class="text-sm text-slate-400 font-medium">({item.source})</span>
								{/if}
								{#if item.published_at}
									<span class="text-sm text-slate-400 font-medium">{formatDate(item.published_at)}</span>
								{/if}
							</div>
							<p class="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-700 transition-colors tracking-tight">
								{item.title}
							</p>
							{#if item.description}
								<p class="text-sm text-slate-500 mt-1.5 line-clamp-1 leading-relaxed">{item.description}</p>
							{/if}
						</div>
						<!-- Badges: status · impact · link -->
						<div class="flex items-center gap-2.5 shrink-0">
							{#if item.status}
								<span class="dashboard-badge text-sm px-3 py-1.5 rounded-lg font-semibold ring-1 ring-inset {statusBadgeClass(item.status)}">
									{item.status_label || item.status}
								</span>
							{/if}
							{#if item.impact_level}
								<span class="dashboard-badge text-sm px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ring-1 ring-inset {impactBadgeClass(item.impact_level)}">
									<span class="w-2 h-2 rounded-full {impactDotClass(item.impact_level)} shadow-sm"></span>
									{item.impact_label || item.impact_level}
								</span>
							{/if}
							<i class="fa-solid fa-arrow-up-right-from-square text-sm text-slate-300 group-hover:text-blue-500 transition-colors ml-1"></i>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ══════════════════ Framework Score Cards (4 donuts) ════════════════════ -->
	{#if data.frameworks.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
			{#each data.frameworks.slice(0, 4) as fwk, i}
				{@const dp   = donutParams(fwk.progress, 96, 8)}
				{@const days = daysUntil(fwk.due_date)}
				<a href="/compliance-assessments"
					class="dashboard-card dashboard-card-hover border-t-4 {frameworkAccentClass(fwk.progress)} p-5 min-h-[148px] text-left block">
					<div class="flex items-start justify-between gap-3">
						<div class="flex-1 min-w-0">
							<h4 class="text-base font-bold text-slate-900 truncate tracking-tight">{fwk.name}</h4>
							<p class="text-sm text-slate-500 mt-1 font-medium tabular-nums">
								{fwk.assessmentsCount}
								{fwk.assessmentsCount === 1 ? m.assessmentSingular() : m.assessmentPlural()}
							</p>
							<div class="flex items-center gap-1.5 mt-2">
								<i class="fa-solid fa-arrow-trend-up text-xs text-emerald-500"></i>
								<span class="text-xs text-emerald-600 font-semibold">+0% مقارنة بالشهر الماضي</span>
							</div>
							{#if days !== null && days >= 0}
								<div class="mt-2.5">
									<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
										{days <= 14 ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'}">
										<i class="fa-regular fa-calendar text-[10px]"></i>
										{m.auditInDays({ count: days })}
									</span>
								</div>
							{/if}
						</div>
						<svg width={dp.size} height={dp.size} viewBox="0 0 {dp.size} {dp.size}" class="shrink-0 drop-shadow-sm">
							<defs>
								<linearGradient id="donutGrad-{i}" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color={dp.color} />
									<stop offset="100%" stop-color={dp.colorEnd} />
								</linearGradient>
							</defs>
							<circle cx={dp.cx} cy={dp.cy} r={dp.r} fill="none" stroke="#e2e8f0" stroke-width={dp.sw} />
							<circle cx={dp.cx} cy={dp.cy} r={dp.r} fill="none" stroke="url(#donutGrad-{i})"
								stroke-width={dp.sw} stroke-dasharray="{dp.fill} {dp.circ}"
								stroke-linecap="round" transform="rotate(-90 {dp.cx} {dp.cy})" />
							<text x={dp.cx} y={dp.cy + 1} text-anchor="middle" dominant-baseline="central"
								font-size="17" font-weight="800" fill="#0f172a" font-family="Cairo, sans-serif">{fwk.progress}%</text>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- ══════════════════ Heatmap — full width ════════════════════════════════ -->
	<div class="dashboard-card">
		<div class="dashboard-card-header flex items-center justify-between px-5 py-4 gap-3 flex-wrap">
			<h3 class="dashboard-title flex items-center gap-2.5">
				<span class="dashboard-icon-badge bg-violet-100 text-violet-600"><i class="fa-solid fa-table-cells text-xs"></i></span>
				{m.riskMap()}
			</h3>
			<div class="flex items-center gap-3 flex-wrap">
				<div class="dashboard-toggle-group flex rounded-xl border border-slate-200/80 overflow-hidden shadow-sm">
					<button type="button" onclick={() => (riskScope = 'internal')}
						class="px-3.5 py-2 text-xs font-bold transition-all
							{riskScope === 'internal' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner' : 'bg-white text-slate-500 hover:bg-slate-50'}">
						{m.internal()}
					</button>
					<button type="button" onclick={() => (riskScope = 'external')}
						class="px-3.5 py-2 text-xs font-bold transition-all
							{riskScope === 'external' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner' : 'bg-white text-slate-500 hover:bg-slate-50'}">
						{m.external()}
					</button>
				</div>
				<div class="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-50 ring-1 ring-slate-100">
					<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
						<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span>
						{m.low()}
						<span class="font-extrabold text-slate-900 tabular-nums">{riskLevelCounts.low}</span>
					</span>
					<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
						<span class="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm"></span>
						{m.medium()}
						<span class="font-extrabold text-slate-900 tabular-nums">{riskLevelCounts.medium}</span>
					</span>
					<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
						<span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></span>
						{m.high()}
						<span class="font-extrabold text-slate-900 tabular-nums">{riskLevelCounts.high}</span>
					</span>
				</div>
			</div>
		</div>

		{#if totalRisks === 0}
			<div class="flex flex-col items-center justify-center py-12 text-slate-400">
				<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
					<i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
				</div>
				<p class="text-sm font-medium">{m.noRiskScenarios()}</p>
			</div>
		{:else}
			<div class="p-4" dir="ltr">
				<div class="flex">
					<div class="flex flex-col gap-0.5 mr-1.5">
						{#each [5, 4, 3, 2, 1] as l}
							<div class="h-10 flex items-center justify-center">
								<span class="text-[10px] font-bold text-slate-400 w-3 text-center tabular-nums">{l}</span>
							</div>
						{/each}
					</div>
					<div class="flex-1">
						<div class="grid grid-cols-5 gap-1.5">
							{#each [5, 4, 3, 2, 1] as l}
								{#each [1, 2, 3, 4, 5] as imp}
									{@const count = heatmapGrid[l - 1][imp - 1]}
									{@const scenarios = heatmapCellScenarios[l - 1][imp - 1]}
									{@const score = l * imp}
									{@const cellClass =
										'h-12 rounded-lg flex items-center justify-center text-sm font-extrabold tabular-nums transition-all duration-200'}
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
						<div class="flex justify-between mt-2 px-1">
							{#each [1, 2, 3, 4, 5] as i}
								<span class="text-[10px] font-bold text-slate-400 tabular-nums">{i}</span>
							{/each}
						</div>
						<div class="text-center mt-1">
							<span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{m.impactISO()}</span>
						</div>
					</div>
				</div>
				<p class="text-[10px] font-semibold text-slate-400 mt-2 uppercase tracking-wider">{m.likelihood()}</p>
			</div>
		{/if}
	</div>

	<!-- ══════════════════ Highest residual risk by category — full width ═══════ -->
	<div class="dashboard-card">
		<div class="dashboard-card-header px-5 py-4">
			<h3 class="dashboard-title flex items-center gap-2.5">
				<span class="dashboard-icon-badge bg-orange-100 text-orange-600"><i class="fa-solid fa-layer-group text-xs"></i></span>
				{m.highestResidualRiskByCategory()}
			</h3>
		</div>
		{#if categoryRiskMax.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-slate-400">
				<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
					<i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
				</div>
				<p class="text-sm font-medium">{m.noQualificationsYet()}</p>
			</div>
		{:else}
			<div class="divide-y divide-slate-100/80">
				{#each categoryRiskMax as cat}
					<div class="flex items-center justify-between px-5 py-4 border-l-4 {categoryRowAccent(cat.maxResidual)} hover:bg-blue-50/40 transition-colors">
						<span class="text-sm font-bold text-slate-800 flex-1 truncate tracking-tight">{cat.category}</span>
						<div class="flex items-center gap-3 shrink-0">
							<span class="text-xs font-medium text-slate-400 tabular-nums">مقابل {cat.maxInherent}</span>
							<span class="inline-flex items-center justify-center min-w-[40px] h-9 rounded-lg text-sm font-extrabold px-3 tabular-nums {severityStyle(cat.maxResidual)}">
								{cat.maxResidual}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ══════════════════ Policy governance posture (left) + TPRM (right) ═══════ -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

		<!-- Policy governance posture (replaces the old "Policy violations by policy" card) -->
		<div class="dashboard-card">
			<div class="dashboard-card-header px-5 py-4">
				<h3 class="dashboard-title flex items-center gap-2.5">
					<span class="dashboard-icon-badge bg-indigo-100 text-indigo-600"><i class="fa-solid fa-shield-check text-xs"></i></span>
					{m.policyGovernancePosture()}
					<span class="ml-auto text-xs font-medium text-slate-400 tabular-nums">
						{data.policyPosture.total}
					</span>
				</h3>
			</div>
			{#if data.policyPosture.total === 0}
				<div class="flex flex-col items-center justify-center py-12 text-slate-400">
					<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
						<i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
					</div>
					<p class="text-sm font-medium">{m.policyPostureNoPolicies()}</p>
				</div>
			{:else}
				<div class="divide-y divide-slate-100/80">
					{#each postureRows as row (row.key)}
						<a href={row.href}
							class="dashboard-list-row flex items-center justify-between px-5 py-3.5 border-l-4 {row.accent} group">
							<span class="flex items-center gap-2.5 text-sm font-semibold text-slate-700 tracking-tight">
								<span class="w-2 h-2 rounded-full {row.dot} shadow-sm"></span>
								{row.label}
							</span>
							<span class="flex items-center gap-2.5 shrink-0">
								<span class="text-sm font-extrabold text-slate-900 tabular-nums">{row.count}</span>
								<i class="fa-solid fa-chevron-right text-[10px] text-slate-300 group-hover:text-blue-500 transition-colors"></i>
							</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>

		<!-- TPRM -->
		<div class="dashboard-card">
			<div class="dashboard-card-header px-5 py-4">
				<h3 class="dashboard-title flex items-center gap-2.5">
					<span class="dashboard-icon-badge bg-teal-100 text-teal-600"><i class="fa-solid fa-building-shield text-xs"></i></span>
					{m.thirdPartyAssessmentResults()}
				</h3>
			</div>
			{#if tprmRows.length === 0}
				<div class="flex flex-col items-center justify-center py-12 text-slate-400">
					<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
						<i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
					</div>
					<p class="text-sm font-medium">{m.noEntityAssessments()}</p>
				</div>
			{:else}
				<div class="px-5 py-5 space-y-5">
					{#each tprmRows as row}
						<div>
							<div class="flex items-center justify-between mb-2.5">
								<span class="text-sm font-bold text-slate-800 truncate flex-1 tracking-tight">{row.provider}</span>
								<div class="flex items-center gap-2.5 shrink-0 ml-3">
									{#if row.due_date}
										<span class="text-xs font-medium text-slate-400">{formatDate(row.due_date)}</span>
									{/if}
									<span class="text-sm font-extrabold tabular-nums {row.score >= 80 ? 'text-emerald-600' : row.score >= 60 ? 'text-amber-600' : 'text-red-600'}">
										{row.score}%
									</span>
								</div>
							</div>
							<div class="dashboard-progress-track h-3.5 rounded-full overflow-hidden" dir="ltr">
								<div class="h-full rounded-full transition-all duration-500 {tprmBarColor(row.score)}"
									style:width="{row.score}%"></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ══════════════════ Policies by open findings — full width bar chart ═════ -->
	<!-- Replaces the old "Compliance trend (6 months)" card.
	     Same horizontal-bar component as the TPRM card, bound to per-policy
	     open-findings counts from /api/policies/findings_metrics/. -->
	<div class="dashboard-card">
		<div class="dashboard-card-header px-5 py-4">
			<h3 class="dashboard-title flex items-center gap-2.5">
				<span class="dashboard-icon-badge bg-rose-100 text-rose-600"><i class="fa-solid fa-bug text-xs"></i></span>
				{m.policiesByOpenFindings()}
			</h3>
		</div>
		{#if policyFindingsRows.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-slate-400">
				<div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
					<i class="fa-solid fa-circle-check text-2xl text-emerald-300"></i>
				</div>
				<p class="text-sm font-medium">{m.policiesByOpenFindingsEmpty()}</p>
			</div>
		{:else}
			<div class="px-5 py-5 space-y-5">
				{#each policyFindingsRows as row (row.policy_id)}
					<a href="/policies/{row.policy_id}" class="block group">
						<div class="flex items-center justify-between mb-2.5">
							<span class="text-sm font-bold text-slate-800 truncate flex-1 tracking-tight group-hover:text-blue-700 transition-colors">
								{row.name}
							</span>
							<span class="text-sm font-extrabold text-rose-600 shrink-0 ml-3 tabular-nums">{row.count}</span>
						</div>
						<div class="dashboard-progress-track h-3.5 rounded-full overflow-hidden" dir="ltr">
							<div
								class="h-full rounded-full transition-all duration-500 {policyFindingsBarColor(row.count)}"
								style:width="{(row.count / maxPolicyFindingsCount) * 100}%"
							></div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>

</div>

<style>
	.brand-dashboard {
		background: linear-gradient(165deg, #f8fafc 0%, #f1f5f9 45%, #eef2ff 100%);
		min-height: 100%;
		font-family: 'Cairo', sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.brand-dashboard :global(svg text) {
		font-family: 'Cairo', sans-serif;
	}

	.dashboard-card {
		background: #ffffff;
		border-radius: 1rem;
		border: 1px solid rgba(226, 232, 240, 0.9);
		overflow: hidden;
		box-shadow:
			0 1px 2px rgba(15, 23, 42, 0.04),
			0 4px 16px rgba(15, 23, 42, 0.06);
	}

	.dashboard-card-hover {
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.dashboard-card-hover:hover {
		transform: translateY(-2px);
		box-shadow:
			0 4px 8px rgba(15, 23, 42, 0.06),
			0 12px 28px rgba(37, 99, 235, 0.1);
	}

	.dashboard-card-header {
		border-bottom: 1px solid rgba(226, 232, 240, 0.8);
		background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
	}

	.dashboard-title-lg {
		font-size: 1.125rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: -0.02em;
	}

	.dashboard-title {
		font-size: 0.9375rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: -0.015em;
	}

	.dashboard-icon-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.625rem;
		flex-shrink: 0;
	}

	.dashboard-link {
		color: #2563eb;
		transition: color 0.15s ease;
	}

	.dashboard-link:hover {
		color: #1d4ed8;
	}

	.dashboard-list-row {
		transition: background-color 0.15s ease;
	}

	.dashboard-list-row:hover {
		background: linear-gradient(90deg, rgba(239, 246, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.dashboard-badge {
		white-space: nowrap;
	}

	.dashboard-progress-track {
		background: linear-gradient(180deg, #e2e8f0 0%, #f1f5f9 100%);
		box-shadow: inset 0 1px 3px rgba(15, 23, 42, 0.08);
	}

	.dashboard-trend-chart {
		display: block;
	}

	:global(.brand-dashboard .dashboard-toggle-group button) {
		border: none;
		cursor: pointer;
	}
</style>
