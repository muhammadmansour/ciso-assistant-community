import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aG as inspect } from './_index-D7NdhnXA.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const includeEnclaves = url.searchParams.get("include_enclaves") === "true";
  const endpoint = `${BASE_API_URL}/folders/org_tree/?include_enclaves=${includeEnclaves ? "true" : "false"}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: inspect(), includeEnclaves };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 131;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CwVlT_Ki.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/inspect/+page.server.ts";
const imports = ["_app/immutable/nodes/131.BfYiV8PN.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=131-7bLSf85S.js.map
