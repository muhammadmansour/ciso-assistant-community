import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 102;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DGwmL0SV.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/executive-summary/+page.server.ts";
const imports = ["_app/immutable/nodes/102.yqT1nQeZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/xeI3qsr4.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BPxbLiAc.js","_app/immutable/chunks/zlp6oXm8.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DBgPt7Gi.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=102-QrXt_zOc.js.map
