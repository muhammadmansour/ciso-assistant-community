import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { c as composerSchema } from './schemas-DWhEPmW4.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { Z as analytics } from './_index-B12BAPce.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CC0ZjwsB.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/+page.server.ts";
const imports = ["_app/immutable/nodes/31.CNFAcsoH.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BwlpdCDo.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/CM1u5Zf1.js","_app/immutable/chunks/ps1aO-Aq.js","_app/immutable/chunks/BBeVvlwP.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/BC0dUqy6.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/Bwzqz9Gt.js","_app/immutable/chunks/DiXxokeg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CbkoIhbq.js","_app/immutable/chunks/ByGmc6od.js","_app/immutable/chunks/eCSK0cWp.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/BKebV0sf.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/0JDwt3lD.js","_app/immutable/chunks/BoGN8GaE.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/B0Bm_D1r.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/DtcMLj97.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C9m63fBF.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/Card.CatA3_8h.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-BxOobBIz.js.map
