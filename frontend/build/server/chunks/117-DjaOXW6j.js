import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { aK as scoringassistant1 } from './_index-BNamVw9A.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const load = async ({ fetch }) => {
  const req = await fetch(`${BASE_API_URL}/risk-matrices/`);
  const req_data = await req.json();
  const risk_matrices = req_data.results.map(
    (risk_matrix) => ({
      ...JSON.parse(risk_matrix.json_definition),
      name: risk_matrix.name
    })
  );
  return {
    risk_matrices,
    title: scoringassistant1()
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 117;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CC4EaRJE.js')).default;
const server_id = "src/routes/(app)/(internal)/scoring-assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/117.D_WgmFVM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=117-DjaOXW6j.js.map
