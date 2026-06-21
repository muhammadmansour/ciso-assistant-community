import { a as UUID_LIST_REGEX, B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { e as error } from './index-BWA_9C9m.js';
import { a2 as composer } from './_index-DiaVtc2Z.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, url }) => {
  const params = url.searchParams;
  if (!params.has("risk_assessment")) {
    error(400, "No risk_assessment found in the URL !");
  }
  const risk_assessment_string = params.get("risk_assessment");
  if (risk_assessment_string && !UUID_LIST_REGEX.test(risk_assessment_string)) {
    error(400, "Invalid risk_assessment UUID list");
  }
  const req = await fetch(
    `${BASE_API_URL}/composer_data/?risk_assessment=${risk_assessment_string}`
  );
  const resp = await req.json();
  if (resp.error) {
    error(req.status, resp.error);
  }
  return { ...resp.result, title: composer() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BCY-scvQ.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/composer/+page.server.ts";
const imports = ["_app/immutable/nodes/32.D6zZto9w.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CS5lPhUA.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/LJOxUimU.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-ttw_L5Po.js.map
