import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { c as composerSchema } from './schemas-BwimqDbp.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { a1 as analytics } from './_index-DiaVtc2Z.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';

const load = async ({ locals, fetch }) => {
  const req_applied_control_status = await fetch(`${BASE_API_URL}/applied-controls/per_status/`);
  const applied_control_status = await req_applied_control_status.json();
  const req_task_template_status = await fetch(`${BASE_API_URL}/task-templates/per_status/`);
  const task_template_status = await req_task_template_status.json();
  const riskAssessmentsPerStatus = await fetch(`${BASE_API_URL}/risk-assessments/per_status/`).then((res) => res.json()).then((res) => res.results);
  const complianceAssessmentsPerStatus = await fetch(
    `${BASE_API_URL}/compliance-assessments/per_status/`
  ).then((res) => res.json()).then((res) => res.results);
  const riskScenariosPerStatus = await fetch(`${BASE_API_URL}/risk-scenarios/per_status/`).then((res) => res.json()).then((res) => res.results);
  const usedRiskMatrices = await fetch(`${BASE_API_URL}/risk-matrices/used/`).then((res) => res.json()).then((res) => res.results);
  const usedFrameworks = await fetch(`${BASE_API_URL}/frameworks/used/`).then((res) => res.json()).then((res) => res.results);
  const req_get_risks_count_per_level = await fetch(
    `${BASE_API_URL}/risk-scenarios/count_per_level/`
  );
  const risks_count_per_level = await req_get_risks_count_per_level.json().then((res) => res.results);
  const threats_count = await fetch(`${BASE_API_URL}/threats/threats_count/`).then(
    (res) => res.json()
  );
  const qualifications_count = await fetch(
    `${BASE_API_URL}/risk-scenarios/qualifications_count/`
  ).then((res) => res.json());
  const req_risk_assessments = await fetch(`${BASE_API_URL}/risk-assessments/`);
  const risk_assessments = await req_risk_assessments.json();
  const composerForm = await superValidate(zod(composerSchema));
  const complianceAnalytics = await fetch(`${BASE_API_URL}/compliance-assessments/analytics/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch compliance analytics:", error);
    return {};
  });
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const metricsPromise = fetch(`${BASE_API_URL}/get_metrics/`).then((res) => res.json()).then((data) => data.results).catch((error) => {
    console.error("Failed to fetch or parse metrics:", error);
    return null;
  });
  const countersPromise = fetch(`${BASE_API_URL}/get_counters/`).then((res) => res.json()).then((data) => data.results).catch((error) => {
    console.error("failed to fetch or parse counters:", error);
    return null;
  });
  const combinedAssessmentsStatusPromise = fetch(`${BASE_API_URL}/get_combined_assessments_status/`).then((res) => res.json()).then((data) => data.results).catch((error) => {
    console.error("failed to fetch or parse combined assessments status:", error);
    return null;
  });
  const governanceCalendarDataPromise = fetch(
    `${BASE_API_URL}/get_governance_calendar_data/?year=${currentYear}`
  ).then((res) => res.json()).then((data) => data.results).catch((error) => {
    console.error("Failed to fetch governance calendar data:", error);
    return [];
  });
  const vulnerabilitySankeyDataPromise = fetch(`${BASE_API_URL}/vulnerabilities/sankey_data/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch vulnerability sankey data:", error);
    return [];
  });
  const findingsAssessmentSunburstDataPromise = fetch(
    `${BASE_API_URL}/findings-assessments/sunburst_data/`
  ).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch findings assessment sunburst data:", error);
    return [];
  });
  const detectionPromise = fetch(`${BASE_API_URL}/incidents/detection_breakdown/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch incident detection breakdown:", error);
    return { results: [] };
  });
  const monthlyPromise = fetch(`${BASE_API_URL}/incidents/monthly_metrics/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch monthly incident metrics:", error);
    return { results: { months: [], monthly_counts: [], cumulative_counts: [] } };
  });
  const summaryPromise = fetch(`${BASE_API_URL}/incidents/summary_stats/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch incident summary stats:", error);
    return { results: { total_incidents: 0, incidents_this_month: 0, open_incidents: 0 } };
  });
  const severityPromise = fetch(`${BASE_API_URL}/incidents/severity_breakdown/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch incident severity breakdown:", error);
    return { results: [] };
  });
  const qualificationsPromise = fetch(`${BASE_API_URL}/incidents/qualifications_breakdown/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch incident qualifications breakdown:", error);
    return { results: { labels: [], values: [] } };
  });
  const exceptionSankeyPromise = fetch(`${BASE_API_URL}/security-exceptions/sankey_data/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch security exception Sankey data:", error);
    return { results: { nodes: [], links: [] } };
  });
  const sunburstPromise = fetch(`${BASE_API_URL}/applied-controls/sunburst_data/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch applied controls sunburst data:", error);
    return { results: [] };
  });
  const findingsSankeyPromise = fetch(`${BASE_API_URL}/findings/sankey_data/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch findings Sankey data:", error);
    return { results: { nodes: [], links: [] } };
  });
  const operationsAnalyticsPromise = Promise.all([
    detectionPromise,
    monthlyPromise,
    summaryPromise,
    severityPromise,
    qualificationsPromise,
    exceptionSankeyPromise,
    sunburstPromise,
    findingsSankeyPromise
  ]).then(
    ([
      detectionData,
      monthlyData,
      summaryData,
      severityData,
      qualificationsData,
      exceptionSankeyData,
      sunburstData,
      findingsSankeyData
    ]) => ({
      incident_detection_breakdown: detectionData.results,
      monthly_metrics: monthlyData.results,
      summary_stats: summaryData.results,
      severity_breakdown: severityData.results,
      qualifications_breakdown: qualificationsData.results,
      exception_sankey: exceptionSankeyData.results,
      applied_controls_sunburst: sunburstData.results,
      findings_sankey: findingsSankeyData.results
    })
  ).catch((error) => {
    console.error("Failed to fetch operations analytics:", error);
    return null;
  });
  return {
    composerForm,
    usedRiskMatrices,
    usedFrameworks,
    riskAssessmentsPerStatus,
    complianceAssessmentsPerStatus,
    riskScenariosPerStatus,
    risks_count_per_level,
    threats_count,
    qualifications_count,
    risk_assessments: risk_assessments.results,
    applied_control_status: applied_control_status.results,
    task_template_status: task_template_status.results,
    complianceAnalytics,
    user: locals.user,
    title: analytics(),
    stream: {
      metrics: metricsPromise,
      counters: countersPromise,
      combinedAssessmentsStatus: combinedAssessmentsStatusPromise,
      governanceCalendarData: governanceCalendarDataPromise,
      operationsAnalytics: operationsAnalyticsPromise,
      vulnerabilitySankeyData: vulnerabilitySankeyDataPromise,
      findingsAssessmentSunburstData: findingsAssessmentSunburstDataPromise
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 31;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CwQdZBOU.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/+page.server.ts";
const imports = ["_app/immutable/nodes/31.7c_SeDE_.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Dvzq4jwj.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/LJOxUimU.js","_app/immutable/chunks/BTlHCHS1.js","_app/immutable/chunks/DonAw7w9.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/C7f_eY7G.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css","_app/immutable/assets/Card.CatA3_8h.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-DdEglAIF.js.map
