import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const hideDomains = url.searchParams.get("hideDomains") === "true";
  const endpoint = `${BASE_API_URL}/assets/graph/?hide_domains=${hideDomains}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, hideDomains };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 37;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CnwHqjet.js')).default;
const server_id = "src/routes/(app)/(internal)/assets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/37.DpSTtaNT.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CVr9M_d1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/C6vFO4ME.js","_app/immutable/chunks/I3BpkvBT.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/D7dzO6Di.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=37-P_YS1wRq.js.map
