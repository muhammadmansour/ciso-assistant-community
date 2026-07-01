import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params, url }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/operating-modes/${params.id}/build_graph/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const animated = url.searchParams.get("animated") === "true";
  return { data, animated };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 100;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D6drlovS.js')).default;
const server_id = "src/routes/(app)/(internal)/operating-modes/[id=uuid]/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/100.tUkPo1kd.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/h-3-RRtw.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DJX_slGO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/DlxJgXMU.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/C1FmrZbK.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=100-B_Zcb7K7.js.map
