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

const index = 69;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-dJ6bo3I_.js')).default;
const server_id = "src/routes/(app)/(internal)/entities/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/69.BDa2hBbO.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/D_xBlPgV.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BgAO3hZG.js","_app/immutable/chunks/RUegAlyn.js","_app/immutable/chunks/6DdwpPu7.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=69-DBNYaFqB.js.map
