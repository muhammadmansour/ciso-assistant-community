import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 103;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DlGK646Q.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/key-metrics/+page.server.ts";
const imports = ["_app/immutable/nodes/103.BFUj3fip.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CiqKwbts.js","_app/immutable/chunks/BQSXIl_l.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/7JscrOa6.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BNMuJmHr.js"];
const stylesheets = ["_app/immutable/assets/103.xX1MIhFN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=103-GBT1C_-7.js.map
