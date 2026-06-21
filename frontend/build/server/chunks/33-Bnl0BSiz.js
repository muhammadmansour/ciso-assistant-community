import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { a3 as overview } from './_index-DiaVtc2Z.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DM_TyVO9.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/gdpr/+page.server.ts";
const imports = ["_app/immutable/nodes/33.XsUtNdkS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/wu99v29p.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BHmiZ89i.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CS5lPhUA.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=33-Bnl0BSiz.js.map
