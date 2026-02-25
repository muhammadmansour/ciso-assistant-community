import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const load = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/resilience/asset-assessments/${params.id}/dependency-graph/`;
  const res = await fetch(endpoint);
  const graphData = await res.json();
  return {
    graphData
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cl1l_9-g.js')).default;
const server_id = "src/routes/(app)/(internal)/asset-assessments/[id=uuid]/dependencies/+page.server.ts";
const imports = ["_app/immutable/nodes/36.CDasH35X.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Cc701ZM5.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DS7N4xG4.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/36.BlnyDAbU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-CkSvHWET.js.map
