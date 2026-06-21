import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async (event) => {
  const { id } = event.params;
  const getExecutiveSummary = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/executive-summary/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch executive summary: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch executive summary data:", error);
      return null;
    }
  };
  const getCombinedLec = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/combined-lec/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch combined LEC: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch combined LEC data:", error);
      return null;
    }
  };
  const getAleComparison = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/ale-comparison/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ALE comparison: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch ALE comparison data:", error);
      return null;
    }
  };
  return {
    title: "Executive summary",
    stream: {
      executiveSummary: getExecutiveSummary(),
      combinedLec: getCombinedLec(),
      aleComparison: getAleComparison()
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 108;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BlpZwCW3.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/executive-summary/+page.server.ts";
const imports = ["_app/immutable/nodes/108.CNG5xBP0.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/Cudxu-Rd.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Ce8GddNi.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=108-B-U0uzmb.js.map
