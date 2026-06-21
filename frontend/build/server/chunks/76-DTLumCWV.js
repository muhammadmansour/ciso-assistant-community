import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ params, fetch }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/stakeholders/chart_data/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 76;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-T8iO6SXf.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/ecosystem/+page.server.ts";
const imports = ["_app/immutable/nodes/76.D4jP4rqi.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/D_OoL1YE.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=76-DTLumCWV.js.map
