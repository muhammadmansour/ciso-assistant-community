import { r as redirect } from './index-BWA_9C9m.js';
import './utils-FiC4zhrQ.js';

const load = async ({ url }) => {
  const queryParams = url.searchParams.has("refresh") ? "?refresh=1" : "";
  redirect(301, `/recap${queryParams}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BVOeF0bZ.js')).default;
const server_id = "src/routes/(app)/+page.server.ts";
const imports = ["_app/immutable/nodes/25.CAG5_cGP.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DIeogL5L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-D7p0ZINp.js.map
