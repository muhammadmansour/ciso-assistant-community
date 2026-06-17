import type { PageServerLoad } from './$types';
import { BASE_API_URL } from '$lib/utils/constants';
import { m } from '$paraglide/messages';
import {
	fetchLegislativeUpdates,
	type LegislativeUpdate
} from '$lib/server/legislative-updates';

export type { LegislativeUpdate };

/**
 * Risk-scenario row used by the Brand-new Dashboard heatmap.
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

export type PolicyViolationMetric = {
	policy_id: string;
	name: string;
	count: number;
};

export type ComplianceFrameworkSummary = {
	id?: string;
	name: string;
	progress: number;
	score?: number | null;
	due_date?: string | null;
	assessmentsCount: number;
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

	const legislative = await fetchLegislativeUpdates(fetch, event).catch(() => ({
		items: [] as LegislativeUpdate[],
		upstreamStatus: 'error' as const
	}));

	const riskLevels = await safeJson<{
		results: {
			current: Array<{ name: string; value: number; color: string }>;
			residual: Array<{ name: string; value: number; color: string }>;
			inherent?: Array<{ name: string; value: number; color: string }>;
		};
	}>(fetch(`${BASE_API_URL}/risk-scenarios/count_per_level/`), {
		results: { current: [], residual: [] }
	});

	const scenarios = await safeJson<{ results: DashboardRiskScenario[]; count?: number }>(
		fetch(`${BASE_API_URL}/risk-scenarios/?page_size=1000`),
		{ results: [] }
	);

	const qualificationsRaw = await safeJson<{
		results: { labels: string[]; values: number[] };
	}>(fetch(`${BASE_API_URL}/risk-scenarios/qualifications_count/`), {
		results: { labels: [], values: [] }
	});
	const qualifications = qualificationsRaw.results ?? { labels: [], values: [] };

	const tprmMetrics = await safeJson<EntityAssessmentMetric[]>(
		fetch(`${BASE_API_URL}/entity-assessments/metrics/`),
		[]
	);

	const policyViolations = await safeJson<PolicyViolationMetric[]>(
		fetch(`${BASE_API_URL}/policy-violations/metrics/`),
		[]
	);

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

	const trendSamples = await safeJson<{
		results: Array<{ date: string; metrics: Record<string, number> }>;
	}>(
		fetch(`${BASE_API_URL}/metrology/builtin-metric-samples/?model=complianceassessment&page_size=1000`),
		{ results: [] }
	);

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

	return {
		title: m.recap(),
		legislative: {
			items: (legislative.items ?? []).slice(0, 5),
			upstreamError: legislative.upstreamStatus === 'error',
			upstreamUnauthorized: legislative.upstreamStatus === 'unauthorized'
		},
		riskLevels: riskLevels.results,
		scenarios: scenarios.results ?? [],
		qualifications,
		tprmMetrics,
		policyViolations,
		frameworks,
		counters: counters.results ?? {},
		complianceTrend
	};
};
