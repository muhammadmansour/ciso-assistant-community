import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { H as tprmoverview1 } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-Cf4dVlPI.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/tprm/+page.server.ts";
const imports = ["_app/immutable/nodes/31.Dgb7DR9s.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js"];
const stylesheets = ["_app/immutable/assets/31.DDTk0M_q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=31-CgT8OKMQ.js.map
