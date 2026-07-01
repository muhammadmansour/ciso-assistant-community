import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/visual_analysis/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 59;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D-AlnpBq.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/59.DMi1SQQo.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/BUBgGnxm.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=59-BeOSB5n8.js.map
