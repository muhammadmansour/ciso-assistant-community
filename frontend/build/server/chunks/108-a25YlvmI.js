import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { al as inspect } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/requirement-mapping-sets/graph-data`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: inspect() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 108;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B9NhvOnc.js')).default;
const server_id = "src/routes/(app)/(internal)/requirement-mapping-sets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/108.CaDU2DEc.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/TAzWUKfz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/CLwmy1uM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=108-a25YlvmI.js.map
