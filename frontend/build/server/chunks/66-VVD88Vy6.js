import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/entities/graph/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error loading entities graph data");
  }
  const data = await res.json();
  return {
    data
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 66;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D7e8RCw-.js')).default;
const server_id = "src/routes/(app)/(internal)/entities/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/66.iBBdYCDx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BjoUa3vd.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D_fj9-71.js","_app/immutable/chunks/BljBstM0.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DWYV-l9u.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=66-VVD88Vy6.js.map
