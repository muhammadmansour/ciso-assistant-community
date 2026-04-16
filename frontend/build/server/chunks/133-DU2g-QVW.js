import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { b4 as xrays1 } from './_index-Syqrsmaf.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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

const index = 133;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DdM_CKuP.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/+page.server.ts";
const imports = ["_app/immutable/nodes/133.BOUoi-r_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/DffSj0ub.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/B7jerSYn.js","_app/immutable/chunks/DIh_kFsb.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=133-DU2g-QVW.js.map
