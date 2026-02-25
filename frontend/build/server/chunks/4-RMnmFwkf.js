import { r as redirect } from './index-BWA_9C9m.js';
import { l as loadFlash } from './server-C682bpHT.js';
import './utils-FiC4zhrQ.js';

const load = loadFlash(async ({ locals }) => {
  if (locals.user.is_third_party) {
    redirect(302, `/compliance-assessments`);
  }
  return { user: locals.user };
});

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(internal)/+layout.server.ts";
const imports = ["_app/immutable/nodes/4.DZPoDZpG.js","_app/immutable/chunks/GWrdd0wS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Ck4BDG7B.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-RMnmFwkf.js.map
