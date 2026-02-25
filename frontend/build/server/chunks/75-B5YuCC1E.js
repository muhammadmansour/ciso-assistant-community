import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const load = (async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/requirement-mapping-sets/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: "Visualize applied mapping data as a graph" };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 75;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D1IRxmiC.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/mapping/+page.server.ts";
const imports = ["_app/immutable/nodes/75.DXaH53k2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BUZMx5XX.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/IOhIIUSe.js","_app/immutable/chunks/DpLD00Kj.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/BlS_83n9.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=75-B5YuCC1E.js.map
