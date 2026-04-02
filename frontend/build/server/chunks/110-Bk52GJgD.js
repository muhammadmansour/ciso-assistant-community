import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/entities/dora_roi_lint/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error loading DORA ROI validation");
  }
  const lintResults = await res.json();
  return {
    lintResults
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 110;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CpaKbR7G.js')).default;
const server_id = "src/routes/(app)/(internal)/reports/dora-roi/+page.server.ts";
const imports = ["_app/immutable/nodes/110.gOJ6JDlo.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=110-Bk52GJgD.js.map
