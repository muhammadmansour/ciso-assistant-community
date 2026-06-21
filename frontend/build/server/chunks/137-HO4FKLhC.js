import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { aK as inspect } from './_index-DiaVtc2Z.js';
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

const index = 137;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D0h9Dwib.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/inspect/+page.server.ts";
const imports = ["_app/immutable/nodes/137.koVeOP2o.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=137-HO4FKLhC.js.map
