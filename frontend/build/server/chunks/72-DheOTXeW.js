import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ params, fetch }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/stakeholders/chart_data/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 72;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-n22i4sRa.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/ecosystem/+page.server.ts";
const imports = ["_app/immutable/nodes/72.CXQm7w1I.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/D3ZgDwhJ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=72-DheOTXeW.js.map
