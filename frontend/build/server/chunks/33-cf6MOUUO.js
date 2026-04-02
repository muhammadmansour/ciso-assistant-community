import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { $ as overview } from './_index-B12BAPce.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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

const index = 33;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B0OlOC62.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/gdpr/+page.server.ts";
const imports = ["_app/immutable/nodes/33.BUgx7tUt.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/UDnCXAjM.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/b7Nf_Nez.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/BwlpdCDo.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=33-cf6MOUUO.js.map
