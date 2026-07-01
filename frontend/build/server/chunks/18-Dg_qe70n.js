import { r as redirect } from './index-BWA_9C9m.js';
import './utils-FiC4zhrQ.js';

const load = async ({ locals }) => {
  if (!locals?.featureflags?.outgoing_webhooks) {
    redirect(302, "/settings");
  }
  return {};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/webhooks/+layout.server.ts";
const imports = ["_app/immutable/nodes/18.DsAuMeVr.js","_app/immutable/chunks/Cggp-D0v.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DrNqa-QT.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-Dg_qe70n.js.map
