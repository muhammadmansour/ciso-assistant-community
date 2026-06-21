import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
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

const index = 49;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-9N5dNTBC.js')).default;
const server_id = "src/routes/(app)/(internal)/calendar/[year]/[month]/+page.server.ts";
const imports = ["_app/immutable/nodes/49.BPhTnYiA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=49-C_qyNmYT.js.map
