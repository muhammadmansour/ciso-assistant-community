import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const nextMonth = (month) => {
  if (month === 12) {
    return "01";
  }
  return (month + 1).toString().padStart(2, "0");
};
const load = (async ({ fetch, locals, params }) => {
  const appliedControlsEndpoint = `${BASE_API_URL}/applied-controls/?eta__year=${params.year}&eta__month=${params.month}`;
  const riskAcceptancesEndpoint = `${BASE_API_URL}/risk-acceptances/?expiry_date__year=${params.year}&expiry_date__month=${params.month}`;
  const auditsEndpoint = `${BASE_API_URL}/compliance-assessments/?due_date__year=${params.year}&due_date__month=${params.month}`;
  const tasksEndpoint = `${BASE_API_URL}/task-templates/calendar/${params.year}-${params.month.padStart(2, "0")}-01/${nextMonth(parseInt(params.month)) === "01" ? parseInt(params.year) + 1 : params.year}-${nextMonth(parseInt(params.month))}-01`;
  const appliedControlsResponse = await fetch(appliedControlsEndpoint);
  const appliedControls = await appliedControlsResponse.json().then((res) => res.results);
  const riskAcceptancesResponse = await fetch(riskAcceptancesEndpoint);
  const riskAcceptances = await riskAcceptancesResponse.json().then((res) => res.results);
  const auditsResponse = await fetch(auditsEndpoint);
  const audits = await auditsResponse.json().then((res) => res.results);
  const tasksResponse = await fetch(tasksEndpoint);
  const tasks = await tasksResponse.json();
  return {
    appliedControls,
    riskAcceptances,
    audits,
    tasks,
    title: "calendar"
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 45;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-G6OhOUmn.js')).default;
const server_id = "src/routes/(app)/(internal)/calendar/[year]/[month]/+page.server.ts";
const imports = ["_app/immutable/nodes/45.Dzdq3dBS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Deyl9ay-.js","_app/immutable/chunks/-4awm6M-.js","_app/immutable/chunks/D99trX1L.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Cl_oEvk1.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/CBfCH5ws.js","_app/immutable/chunks/C8p4xJpV.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=45-BYZr2sC6.js.map
