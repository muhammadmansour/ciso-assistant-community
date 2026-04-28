import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { aG as inspect } from './_index-D7NdhnXA.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/requirement-mapping-sets/graph-data`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: inspect() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 108;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cyp2-8FG.js')).default;
const server_id = "src/routes/(app)/(internal)/requirement-mapping-sets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/108.BOc_OkdQ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CVr9M_d1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/C6vFO4ME.js","_app/immutable/chunks/I3BpkvBT.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/D7dzO6Di.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=108-Dutsd0lb.js.map
