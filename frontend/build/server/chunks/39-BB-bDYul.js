import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/resilience/asset-assessments/${params.id}/dependency-graph/`;
  const res = await fetch(endpoint);
  const graphData = await res.json();
  return {
    graphData
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 39;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DpApPIhT.js')).default;
const server_id = "src/routes/(app)/(internal)/asset-assessments/[id=uuid]/dependencies/+page.server.ts";
const imports = ["_app/immutable/nodes/39.BRcriL0H.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/Dj-3zXYs.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/wu99v29p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/39.BlnyDAbU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-BB-bDYul.js.map
