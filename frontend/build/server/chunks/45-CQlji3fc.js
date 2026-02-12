import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-C7Yqu35K.js')).default;
const server_id = "src/routes/(app)/(internal)/calendar/[year]/[month]/+page.server.ts";
const imports = ["_app/immutable/nodes/45.DK5FYlKg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=45-CQlji3fc.js.map
