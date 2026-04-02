import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aG as inspect } from './_index-Syqrsmaf.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const includeEnclaves = url.searchParams.get("include_enclaves") === "true";
  const endpoint = `${BASE_API_URL}/folders/org_tree/?include_enclaves=${includeEnclaves ? "true" : "false"}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: inspect(), includeEnclaves };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 134;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BcudlWwz.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/inspect/+page.server.ts";
const imports = ["_app/immutable/nodes/134.DvTQbvml.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/DPc86hvl.js","_app/immutable/chunks/DfMerXkE.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=134-D2I8TVMd.js.map
