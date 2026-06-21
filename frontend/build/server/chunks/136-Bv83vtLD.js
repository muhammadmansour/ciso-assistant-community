import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { b8 as xrays1 } from './_index-DiaVtc2Z.js';
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

const index = 136;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cq90qD5z.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/+page.server.ts";
const imports = ["_app/immutable/nodes/136.mOwFyGQm.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/C7f_eY7G.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=136-Bv83vtLD.js.map
