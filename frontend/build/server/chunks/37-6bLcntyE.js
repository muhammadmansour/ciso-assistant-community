import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-BYUDhxEY.js')).default;
const server_id = "src/routes/(app)/(internal)/assets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/37.Dve-qgpd.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/BZduEgBl.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DX1P9kZX.js","_app/immutable/chunks/C2mU7KV0.js","_app/immutable/chunks/n18PuKtG.js","_app/immutable/chunks/4Lm9pDcu.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/KjelKKpX.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=37-6bLcntyE.js.map
