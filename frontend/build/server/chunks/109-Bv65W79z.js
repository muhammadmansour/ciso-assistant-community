import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async (event) => {
  const { id } = event.params;
  const getKeyMetrics = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/key-metrics/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch key metrics: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch key metrics data:", error);
      return null;
    }
  };
  return {
    stream: {
      keyMetrics: getKeyMetrics()
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 109;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CW0WhP4t.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/key-metrics/+page.server.ts";
const imports = ["_app/immutable/nodes/109.B-Xd8X__.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Zs2aTo-p.js"];
const stylesheets = ["_app/immutable/assets/109.xX1MIhFN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=109-Bv65W79z.js.map
