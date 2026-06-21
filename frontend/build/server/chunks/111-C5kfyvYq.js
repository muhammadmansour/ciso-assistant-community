import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { aI as recap } from './_index-DiaVtc2Z.js';
import { f as fetchLegislativeUpdates } from './legislative-updates-CXWfP3P1.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

async function safeJson(p, fallback) {
  try {
    const res = await p;
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}
const load = async (event) => {
  const { fetch } = event;
  const legislative = await fetchLegislativeUpdates(fetch).catch(() => ({
    items: [],
    upstreamStatus: "error"
  }));
  const riskLevels = await safeJson(fetch(`${BASE_API_URL}/risk-scenarios/count_per_level/`), {
    results: { current: [], residual: [] }
  });
  const scenarios = await safeJson(
    fetch(`${BASE_API_URL}/risk-scenarios/?page_size=1000`),
    { results: [] }
  );
  const qualificationsRaw = await safeJson(fetch(`${BASE_API_URL}/risk-scenarios/qualifications_count/`), {
    results: { labels: [], values: [] }
  });
  const qualifications = qualificationsRaw.results ?? { labels: [], values: [] };
  const tprmMetrics = await safeJson(
    fetch(`${BASE_API_URL}/entity-assessments/metrics/`),
    []
  );
  const policyViolations = await safeJson(
    fetch(`${BASE_API_URL}/policy-violations/metrics/`),
    []
  );
  const complianceList = await safeJson(fetch(`${BASE_API_URL}/compliance-assessments/?page_size=500`), { results: [] });
  const frameworks = (() => {
    const byFwk = /* @__PURE__ */ new Map();
    for (const a of complianceList.results) {
      const fwkName = typeof a.framework === "string" ? a.framework : a.framework?.str ?? "Framework";
      const fwkId = typeof a.framework === "object" ? a.framework?.id : void 0;
      const cur = byFwk.get(fwkName) ?? { id: fwkId, sum: 0, count: 0, due: null };
      cur.sum += typeof a.progress === "number" ? a.progress : 0;
      cur.count += 1;
      if (a.due_date && (!cur.due || a.due_date < cur.due)) cur.due = a.due_date;
      byFwk.set(fwkName, cur);
    }
    return Array.from(byFwk.entries()).map(([name, v]) => ({
      id: v.id,
      name,
      progress: v.count ? Math.round(v.sum / v.count) : 0,
      assessmentsCount: v.count,
      due_date: v.due ?? null
    })).sort((a, b) => b.assessmentsCount - a.assessmentsCount).slice(0, 4);
  })();
  const counters = await safeJson(fetch(`${BASE_API_URL}/get_counters/`), { results: {} });
  const trendSamples = await safeJson(
    fetch(`${BASE_API_URL}/metrology/builtin-metric-samples/?model=complianceassessment&page_size=1000`),
    { results: [] }
  );
  const trendMap = /* @__PURE__ */ new Map();
  const now = /* @__PURE__ */ new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    trendMap.set(key, { sum: 0, count: 0 });
  }
  for (const s of trendSamples.results) {
    const monthKey = s.date?.substring(0, 7);
    const progress = s.metrics?.progress;
    if (typeof progress === "number" && monthKey && trendMap.has(monthKey)) {
      const cur = trendMap.get(monthKey);
      cur.sum += progress;
      cur.count += 1;
    }
  }
  const complianceTrend = Array.from(trendMap.entries()).map(([month, v]) => ({
    month,
    value: v.count > 0 ? Math.round(v.sum / v.count) : null
  }));
  return {
    title: recap(),
    legislative: {
      items: (legislative.items ?? []).slice(0, 5),
      upstreamError: legislative.upstreamStatus === "error",
      upstreamUnauthorized: legislative.upstreamStatus === "unauthorized"
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 111;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DImFS0UA.js')).default;
const server_id = "src/routes/(app)/(internal)/recap/+page.server.ts";
const imports = ["_app/immutable/nodes/111.Dpnq_Fn3.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/111.26UJup0f.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=111-C5kfyvYq.js.map
