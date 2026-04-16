import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 106;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-TMqT64nv.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/key-metrics/+page.server.ts";
const imports = ["_app/immutable/nodes/106.DYDdylSE.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CeiJu8BG.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/ym4Iat4u.js"];
const stylesheets = ["_app/immutable/assets/106.xX1MIhFN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=106-DTKPrm4k.js.map
