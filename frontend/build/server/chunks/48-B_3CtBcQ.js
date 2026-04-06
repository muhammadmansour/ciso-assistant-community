import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 48;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cjha9V16.js')).default;
const server_id = "src/routes/(app)/(internal)/calendar/[year]/[month]/+page.server.ts";
const imports = ["_app/immutable/nodes/48.BMKq5cOv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DM6hxPHh.js","_app/immutable/chunks/DXF9TMZi.js","_app/immutable/chunks/b8SWVt-e.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BXmcmAv2.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/D7zECSAN.js","_app/immutable/chunks/CspyEU5O.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=48-B_3CtBcQ.js.map
