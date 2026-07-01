import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
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

const index = 113;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CpaKbR7G.js')).default;
const server_id = "src/routes/(app)/(internal)/reports/dora-roi/+page.server.ts";
const imports = ["_app/immutable/nodes/113.CgnUnTd8.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=113-PC9QfQ5K.js.map
