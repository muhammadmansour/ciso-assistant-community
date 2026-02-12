import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const load = (async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/resilience/business-impact-analysis/${params.id}/build-table/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 43;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CSnV985J.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/43.C_fW3ISe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Ck6bKgj5.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=43-CjoiqiJF.js.map
