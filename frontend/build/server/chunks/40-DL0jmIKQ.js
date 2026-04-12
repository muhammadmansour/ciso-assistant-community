import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const hideDomains = url.searchParams.get("hideDomains") === "true";
  const endpoint = `${BASE_API_URL}/assets/graph/?hide_domains=${hideDomains}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, hideDomains };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 40;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DYelUTCo.js')).default;
const server_id = "src/routes/(app)/(internal)/assets/graph/+page.server.ts";
const imports = ["_app/immutable/nodes/40.B-8K1Brr.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/Lppwxe0Q.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/DbS8Mp2N.js","_app/immutable/chunks/BXujJ5-U.js","_app/immutable/chunks/Ba-Cv3Qc.js","_app/immutable/chunks/DhtD2JrC.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BSbYCVpq.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=40-DL0jmIKQ.js.map
