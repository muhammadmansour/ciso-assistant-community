import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { aL as xrays1 } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const getQualityCheckData = async (fetch) => {
  try {
    const endpoint = `${BASE_API_URL}/perimeters/quality_check/`;
    const res = await fetch(endpoint);
    const json = await res.json();
    return json.results;
  } catch (error) {
    console.error("Failed to fetch quality check data:", error);
    return null;
  }
};
const load = (async ({ fetch }) => {
  return {
    title: xrays1(),
    stream: {
      data: getQualityCheckData(fetch)
    }
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 130;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-q7U9Rz-0.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/+page.server.ts";
const imports = ["_app/immutable/nodes/130.CZQgeSDF.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/Dne1jDS_.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=130-C5MWL9v_.js.map
