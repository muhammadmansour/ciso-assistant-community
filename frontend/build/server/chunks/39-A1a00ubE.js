import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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

const index = 39;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CiJghQ4K.js')).default;
const server_id = "src/routes/(app)/(internal)/asset-assessments/[id=uuid]/dependencies/+page.server.ts";
const imports = ["_app/immutable/nodes/39.CdPonTGA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/Br8doqtw.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/UDnCXAjM.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/39.BlnyDAbU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-A1a00ubE.js.map
