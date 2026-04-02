import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { a0 as tprmoverview1 } from './_index-B12BAPce.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/entity-assessments/metrics/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: tprmoverview1() };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 34;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CKkDVmd6.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/tprm/+page.server.ts";
const imports = ["_app/immutable/nodes/34.DFYYVFLF.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = ["_app/immutable/assets/34.DDTk0M_q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=34-CayUDYUY.js.map
