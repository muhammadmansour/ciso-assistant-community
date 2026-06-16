import type { PageServerLoad } from './$types';
import { BASE_API_URL } from '$lib/utils/constants';
import {
	fetchLegislativeUpdates,
	type LegislativeUpdate
} from '$lib/server/legislative-updates';

export type { LegislativeUpdate };

/**
 * Risk-scenario row used by the Brand-new Dashboard heatmap.
 *
 * We only need the proba/impact/level coordinates and qualifications,
 * not the full scenario payload, but the list endpoint always serializes
 * everything so we just type the fields we read.
 */
export type DashboardRiskScenario = {
	id: string;
	name?: string;
	ref_id?: string;
	current_proba?: { value?: number; str?: string };
	current_impact?: { value?: number; str?: string };
	current_level?: { value?: number; str?: string; hexcolor?: string };
	residual_proba?: { value?: number; str?: string };
	residual_impact?: { value?: number; str?: string };
	residual_level?: { value?: number; str?: string; hexcolor?: string };
	inherent_proba?: { value?: number; str?: string };
	inherent_impact?: { value?: number; str?: string };
	inherent_level?: { value?: number; str?: string; hexcolor?: string };
	qualifications?: Array<{ id?: string; str?: string } | string>;
};

export type EntityAssessmentMetric = {
	entity_assessment_id: string;
	provider: string;
	baseline?: string;
	due_date?: string;
	last_update?: string;
	conclusion?: string;
	completion?: number;
	review_progress?: number;
};

export type ComplianceFrameworkSummary = {
	id?: string;
	name: string;
	progress: number;
	score?: number | null;
	due_date?: string | null;
	assessmentsCount: number;
};

/** A control row used by the Tasks / Overdue / Upcoming sections. */
export type ControlRow = {
	id: string;
	ref_id: string;
	name: string;
	scope: string;
	eta: string | null;
	daysUntil: number | null;
	status: string;
	owner: string;
};

export type EvidenceStatusBreakdown = {
	missing: number;
	inReview: number;
	expired: number;
	rejected: number;
	total: number;
};

export type ValidationRow = {
	id: string;
	name: string;
	scope: string;
	updated: string | null;
};

async function safeJson<T>(p: Promise<Response>, fallback: T): Promise<T> {
	try {
		const res = await p;
		if (!res.ok) return fallback;
		return (await res.json()) as T;
	} catch {
		return fallback;
	}
}

export const load: PageServerLoad = async (event) => {
	const { fetch } = event;

	// 1) Latest updates — external pipeline feed (real data, "Yes")
	const legislative = await fetchLegislativeUpdates(fetch, event).catch(() => ({
		items: [] as LegislativeUpdate[],
		upstreamStatus: 'error' as const
	}));

	// 2) Risk levels (current / residual / inherent) — count_per_level
	const riskLevels = await safeJson<{
		results: {
			current: Array<{ name: string; value: number; color: string }>;
			residual: Array<{ name: string; value: number; color: string }>;
			inherent?: Array<{ name: string; value: number; color: string }>;
		};
	}>(fetch(`${BASE_API_URL}/risk-scenarios/count_per_level/`), {
		results: { current: [], residual: [] }
	});

	// 3) All viewable risk scenarios — used for the heatmap and top-risk bar chart.
	const scenarios = await safeJson<{ results: DashboardRiskScenario[]; count?: number }>(
		fetch(`${BASE_API_URL}/risk-scenarios/?page_size=1000`),
		{ results: [] }
	);

	// 4) Risk qualifications grouped by name — drives the "highest risk by category"
	//    bar list. The endpoint wraps the payload in `results`.
	const qualificationsRaw = await safeJson<{
		results: { labels: string[]; values: number[] };
	}>(fetch(`${BASE_API_URL}/risk-scenarios/qualifications_count/`), {
		results: { labels: [], values: [] }
	});
	const qualifications = qualificationsRaw.results ?? { labels: [], values: [] };

	// 5) Third-party (TPRM) entity assessment results
	const tprmMetrics = await safeJson<EntityAssessmentMetric[]>(
		fetch(`${BASE_API_URL}/entity-assessments/metrics/`),
		[]
	);

	// 6) Compliance gauges — pull all viewable assessments and reduce to per-framework averages.
	const complianceList = await safeJson<{
		results: Array<{
			id: string;
			name: string;
			framework: { id?: string; str?: string } | string;
			progress?: number;
			due_date?: string | null;
		}>;
	}>(fetch(`${BASE_API_URL}/compliance-assessments/?page_size=500`), { results: [] });

	const frameworks: ComplianceFrameworkSummary[] = (() => {
		const byFwk = new Map<
			string,
			{ id?: string; sum: number; count: number; due?: string | null }
		>();
		for (const a of complianceList.results) {
			const fwkName =
				typeof a.framework === 'string'
					? a.framework
					: (a.framework?.str ?? 'Framework');
			const fwkId = typeof a.framework === 'object' ? a.framework?.id : undefined;
			const cur = byFwk.get(fwkName) ?? { id: fwkId, sum: 0, count: 0, due: null };
			cur.sum += typeof a.progress === 'number' ? a.progress : 0;
			cur.count += 1;
			if (a.due_date && (!cur.due || a.due_date < cur.due)) cur.due = a.due_date;
			byFwk.set(fwkName, cur);
		}
		return Array.from(byFwk.entries())
			.map(([name, v]) => ({
				id: v.id,
				name,
				progress: v.count ? Math.round(v.sum / v.count) : 0,
				assessmentsCount: v.count,
				due_date: v.due ?? null
			}))
			.sort((a, b) => b.assessmentsCount - a.assessmentsCount)
			.slice(0, 4);
	})();

	// 7) Counters — drives the header total cards (security exceptions, policies, etc.)
	const counters = await safeJson<{
		results: {
			domains?: number;
			frameworks?: number;
			applied_controls?: number;
			policies?: number;
			exceptions?: number;
			risk_acceptances?: number;
		};
	}>(fetch(`${BASE_API_URL}/get_counters/`), { results: {} });

	// 8) Compliance trend — 6-month monthly average of progress from BuiltinMetricSample
	const trendSamples = await safeJson<{
		results: Array<{ date: string; metrics: Record<string, number> }>;
	}>(
		fetch(`${BASE_API_URL}/metrology/builtin-metric-samples/?model=complianceassessment&page_size=1000`),
		{ results: [] }
	);

	// Build a map of the last 6 calendar months (including current)
	const trendMap = new Map<string, { sum: number; count: number }>();
	const now = new Date();
	for (let i = 5; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
		trendMap.set(key, { sum: 0, count: 0 });
	}
	for (const s of trendSamples.results) {
		const monthKey = s.date?.substring(0, 7);
		const progress = s.metrics?.progress;
		if (typeof progress === 'number' && monthKey && trendMap.has(monthKey)) {
			const cur = trendMap.get(monthKey)!;
			cur.sum += progress;
			cur.count += 1;
		}
	}
	const complianceTrend = Array.from(trendMap.entries()).map(([month, v]) => ({
		month,
		value: v.count > 0 ? Math.round(v.sum / v.count) : null
	}));

	// 9) Applied controls "todo" — controls with an ETA in the near term (excludes
	//    active). Drives My Tasks, Overdue controls, and Upcoming deadlines.
	type RawControl = {
		id: string;
		name?: string;
		ref_id?: string;
		eta?: string | null;
		status?: string;
		csf_function?: string;
		category?: string;
		folder?: { str?: string } | string;
		owner?: Array<{ str?: string }>;
	};
	const todoRaw = await safeJson<{ results: RawControl[] }>(
		fetch(`${BASE_API_URL}/applied-controls/todo/`),
		{ results: [] }
	);

	const MS_DAY = 1000 * 60 * 60 * 24;
	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);

	const controlRows: ControlRow[] = (todoRaw.results ?? []).map((c) => {
		const scope =
			(c.csf_function && c.csf_function !== '--' ? c.csf_function : '') ||
			(typeof c.folder === 'object' ? (c.folder?.str ?? '') : (c.folder ?? '')) ||
			(c.category ?? '');
		const owner = (c.owner ?? []).map((o) => o?.str).filter(Boolean).join(', ');
		let daysUntil: number | null = null;
		if (c.eta) {
			const eta = new Date(c.eta);
			if (!Number.isNaN(eta.getTime())) {
				eta.setHours(0, 0, 0, 0);
				daysUntil = Math.round((eta.getTime() - startOfToday.getTime()) / MS_DAY);
			}
		}
		return {
			id: c.id,
			ref_id: c.ref_id ?? '',
			name: c.name ?? '',
			scope: scope || '—',
			eta: c.eta ?? null,
			daysUntil,
			status: c.status ?? '',
			owner: owner || '—'
		};
	});

	const overdueControls = controlRows
		.filter((c) => c.daysUntil !== null && c.daysUntil < 0)
		.sort((a, b) => (a.daysUntil ?? 0) - (b.daysUntil ?? 0));

	const upcomingDeadlines = controlRows
		.filter((c) => c.daysUntil !== null && c.daysUntil >= 0 && c.daysUntil <= 14)
		.sort((a, b) => (a.daysUntil ?? 0) - (b.daysUntil ?? 0));

	const tasks = controlRows.slice(0, 8);

	// 10) Evidence status breakdown — counts per status. in_review is fetched with
	//     items so it can double as the "validations" (awaiting review) list.
	async function evidenceCount(status: string): Promise<number> {
		const r = await safeJson<{ count?: number }>(
			fetch(`${BASE_API_URL}/evidences/?status=${status}&page_size=1`),
			{ count: 0 }
		);
		return r.count ?? 0;
	}

	type RawEvidence = {
		id: string;
		name?: string;
		folder?: { str?: string } | string;
		updated_at?: string;
	};
	const inReviewRes = await safeJson<{ count?: number; results: RawEvidence[] }>(
		fetch(`${BASE_API_URL}/evidences/?status=in_review&page_size=8`),
		{ count: 0, results: [] }
	);
	const [missingCount, expiredCount, rejectedCount] = await Promise.all([
		evidenceCount('missing'),
		evidenceCount('expired'),
		evidenceCount('rejected')
	]);

	const inReviewCount = inReviewRes.count ?? 0;
	const evidenceStatus: EvidenceStatusBreakdown = {
		missing: missingCount,
		inReview: inReviewCount,
		expired: expiredCount,
		rejected: rejectedCount,
		total: missingCount + inReviewCount + expiredCount + rejectedCount
	};

	const validations: ValidationRow[] = (inReviewRes.results ?? []).map((e) => ({
		id: e.id,
		name: e.name ?? '',
		scope: typeof e.folder === 'object' ? (e.folder?.str ?? '') : (e.folder ?? ''),
		updated: e.updated_at ?? null
	}));

	return {
		title: null,
		legislative: {
			items: (legislative.items ?? []).slice(0, 5),
			upstreamError: legislative.upstreamStatus === 'error',
			upstreamUnauthorized: legislative.upstreamStatus === 'unauthorized'
		},
		riskLevels: riskLevels.results,
		scenarios: scenarios.results ?? [],
		qualifications,
		tprmMetrics,
		frameworks,
		counters: counters.results ?? {},
		complianceTrend,
		tasks,
		validations,
		overdueControls,
		upcomingDeadlines,
		evidenceStatus
	};
};
