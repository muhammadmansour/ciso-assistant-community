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

const index = 46;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CulIdG9P.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/46.C2kihqBB.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DRDSBst5.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=46-BCRkW6KB.js.map
