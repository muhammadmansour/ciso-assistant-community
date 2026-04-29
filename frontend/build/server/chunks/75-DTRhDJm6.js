import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-D7mHKqV8.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/mapping/+page.server.ts";
const imports = ["_app/immutable/nodes/75.DHWL_Gqf.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/DCxWm0lK.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DPHQtyJs.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=75-DTRhDJm6.js.map
