import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DuzklEvX.js')).default;
const server_id = "src/routes/(app)/(internal)/calendar/[year]/[month]/+page.server.ts";
const imports = ["_app/immutable/nodes/49.DH5xyCBM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=49-B-0n4azl.js.map
