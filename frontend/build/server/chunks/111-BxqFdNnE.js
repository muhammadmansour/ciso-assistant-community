import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { aI as recap } from './_index-BQcvYRD4.js';
import { f as fetchLegislativeUpdates } from './legislative-updates-uK36BXCi.js';
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
  const policyPosture = await safeJson(
    fetch(`${BASE_API_URL}/policies/posture/`),
    {
      total: 0,
      published_active: 0,
      review_due_90d: 0,
      expired: 0,
      with_open_findings: 0,
      unassigned: 0
    }
  );
  const policyFindings = await safeJson(
    fetch(`${BASE_API_URL}/policies/findings_metrics/`),
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
    policyPosture,
    policyFindings,
    frameworks
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 111;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BKz418iZ.js')).default;
const server_id = "src/routes/(app)/(internal)/recap/+page.server.ts";
const imports = ["_app/immutable/nodes/111.DngR7xQ0.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/ClZdxLcz.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/111.26UJup0f.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=111-BxqFdNnE.js.map
