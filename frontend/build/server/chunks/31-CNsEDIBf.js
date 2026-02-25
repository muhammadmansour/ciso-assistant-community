import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { a0 as tprmoverview1 } from './_index-BNamVw9A.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

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

const index = 31;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DnwJ8Gal.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/tprm/+page.server.ts";
const imports = ["_app/immutable/nodes/31.C8I8RJmy.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js"];
const stylesheets = ["_app/immutable/assets/31.DDTk0M_q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-CNsEDIBf.js.map
