import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { c as composerSchema } from './schemas-DwUKC0vK.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { a as analytics } from './_index-D7NdhnXA.js';
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

const index = 28;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-cYZCg0cG.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/+page.server.ts";
const imports = ["_app/immutable/nodes/28.JMVieBCG.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/J4JWj6XM.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/BF9nWzJO.js","_app/immutable/chunks/mj0iRK6K.js","_app/immutable/chunks/DKOrSS1J.js","_app/immutable/chunks/CCc6bbmd.js","_app/immutable/chunks/8O_YMVGm.js","_app/immutable/chunks/C-y7m8Xz.js","_app/immutable/chunks/Cl-5TEJQ.js","_app/immutable/chunks/CkOCGQaT.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/D8Gxr-3A.js","_app/immutable/chunks/BDxSJf1Y.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BjA36f5m.js","_app/immutable/chunks/ZaMO6TYE.js","_app/immutable/chunks/akXf4f6w.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DFfMjrxh.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CupZpfII.js","_app/immutable/chunks/BwRFFv-D.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DYe3QhYO.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/R8gvUloL.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B3fg5SyU.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/Card.CatA3_8h.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=28-Da2BRy-b.js.map
