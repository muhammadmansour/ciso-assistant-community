import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { a4 as tprmoverview1 } from './_index-BQcvYRD4.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DGr2kBUo.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/tprm/+page.server.ts";
const imports = ["_app/immutable/nodes/34.Blo1EB96.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/34.DDTk0M_q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=34-BZ_ipOcd.js.map
