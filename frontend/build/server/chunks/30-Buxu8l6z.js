import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { $ as overview } from './_index-BNamVw9A.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-CkBEZqQK.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/gdpr/+page.server.ts";
const imports = ["_app/immutable/nodes/30.DZzEYwvG.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DS7N4xG4.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/c8xVlhkz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/C4bMywKL.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-Buxu8l6z.js.map
