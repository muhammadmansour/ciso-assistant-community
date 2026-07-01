import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/resilience/business-impact-analysis/${params.id}/build-table/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 47;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BRcM3lyI.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/47.D9RdkRmV.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yOLtTbA6.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=47-kHZ-Arc2.js.map
