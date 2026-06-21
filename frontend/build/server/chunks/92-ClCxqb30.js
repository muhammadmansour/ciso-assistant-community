import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/license/`;
  const res = await fetch(endpoint);
  const license = await res.json();
  return { license };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 92;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CBtbjBUT.js')).default;
const server_id = "src/routes/(app)/(internal)/license-management/+page.server.ts";
const imports = ["_app/immutable/nodes/92.BoHsf-vW.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=92-ClCxqb30.js.map
