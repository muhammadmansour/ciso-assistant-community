import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-D4x7MPoL.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/43.c9SfjIjx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DdoX7z_B.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=43-CRDSkcea.js.map
