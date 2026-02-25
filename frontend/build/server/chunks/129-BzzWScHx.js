import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { b3 as vulnerabilitytreemap1 } from './_index-BNamVw9A.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const load = async ({ fetch }) => {
  const getTreemapData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/vulnerabilities/treemap_data/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch vulnerability treemap data:", error);
      return [];
    }
  };
  return {
    title: vulnerabilitytreemap1(),
    stream: {
      treemapData: getTreemapData()
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 129;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cmf-KS4f.js')).default;
const server_id = "src/routes/(app)/(internal)/vulnerabilities/treemap/+page.server.ts";
const imports = ["_app/immutable/nodes/129.Bs5W8S42.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/c8xVlhkz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/q10t23Jn.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=129-BzzWScHx.js.map
