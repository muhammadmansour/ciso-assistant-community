import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { aK as inspect } from './_index-BQcvYRD4.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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

const index = 114;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DgIZ9Yw1.js')).default;
const server_id = "src/routes/(app)/(internal)/requirement-mapping-sets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/114.CaFunfEx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BUBgGnxm.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/BjcWLFaf.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=114-D_QKiFNB.js.map
