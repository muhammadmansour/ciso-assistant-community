import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { a3 as overview } from './_index-BQcvYRD4.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DoZlUk-I.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/gdpr/+page.server.ts";
const imports = ["_app/immutable/nodes/33.CE9Tw5m_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/DlxJgXMU.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/o6A1UlUU.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/DGcHpMiH.js"];
const stylesheets = ["_app/immutable/assets/single-container.CAySGR8g.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=33-BSDYkLm0.js.map
