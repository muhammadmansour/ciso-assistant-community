import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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

const index = 86;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CBtbjBUT.js')).default;
const server_id = "src/routes/(app)/(internal)/license-management/+page.server.ts";
const imports = ["_app/immutable/nodes/86.HLwzoWee.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=86-DbPwCdCv.js.map
