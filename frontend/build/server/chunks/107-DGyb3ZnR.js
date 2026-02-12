import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/entities/dora_roi_lint/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error loading DORA ROI validation");
  }
  const lintResults = await res.json();
  return {
    lintResults
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 107;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DeULVg_N.js')).default;
const server_id = "src/routes/(app)/(internal)/reports/dora-roi/+page.server.ts";
const imports = ["_app/immutable/nodes/107.BtUe8U2f.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/Cekucoq6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=107-DGyb3ZnR.js.map
