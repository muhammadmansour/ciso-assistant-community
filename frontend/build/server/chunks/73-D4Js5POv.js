import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/applied-controls/get_controls_info/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 73;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B0ExKpKG.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/73.BcFwdOFW.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/Cc701ZM5.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DS7N4xG4.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/C1FmrZbK.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=73-D4Js5POv.js.map
