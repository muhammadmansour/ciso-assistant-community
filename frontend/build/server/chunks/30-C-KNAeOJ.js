import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { G as overview } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const load = (async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/privacy/processings/agg_metrics/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: overview() };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-UUamWkE7.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/gdpr/+page.server.ts";
const imports = ["_app/immutable/nodes/30.DASXTdPy.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/BX_Kx2Mx.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/D6pAJlGz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DrxIzGi7.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-C-KNAeOJ.js.map
