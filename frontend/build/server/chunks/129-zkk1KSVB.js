import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { aK as vulnerabilitytreemap1 } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-0dZ6dvI8.js')).default;
const server_id = "src/routes/(app)/(internal)/vulnerabilities/treemap/+page.server.ts";
const imports = ["_app/immutable/nodes/129.F49Q0-_H.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/D6pAJlGz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CmxaeTNq.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=129-zkk1KSVB.js.map
