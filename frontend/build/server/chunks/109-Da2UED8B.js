import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-ClgKOszZ.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/key-metrics/+page.server.ts";
const imports = ["_app/immutable/nodes/109.CB1rl7kJ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Ba4v9qbf.js"];
const stylesheets = ["_app/immutable/assets/109.xX1MIhFN.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=109-Da2UED8B.js.map
