import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { c as composerSchema } from './schemas-BcDBvyDd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-jp4VH0Pt.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import { a as analytics } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
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

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D9GpfSdx.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/+page.server.ts";
const imports = ["_app/immutable/nodes/28.dmQP4SBY.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DrxIzGi7.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/IW0R8PXQ.js","_app/immutable/chunks/C5JD4XlK.js","_app/immutable/chunks/B_qiVcYo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/Dne1jDS_.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css","_app/immutable/assets/Card.CatA3_8h.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-MdJ_pM8Z.js.map
