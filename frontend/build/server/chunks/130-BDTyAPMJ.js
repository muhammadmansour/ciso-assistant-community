import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { b4 as xrays1 } from './_index-CqZWReca.js';
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

const index = 130;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BcJqk-o5.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/+page.server.ts";
const imports = ["_app/immutable/nodes/130.CtlvE-ak.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/D4Xh5k1E.js","_app/immutable/chunks/BmMs8hfm.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=130-BDTyAPMJ.js.map
