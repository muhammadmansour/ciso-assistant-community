import { a as UUID_LIST_REGEX, B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import { _ as composer } from './_index-D7NdhnXA.js';
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

const index = 29;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CAiY1blP.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/composer/+page.server.ts";
const imports = ["_app/immutable/nodes/29.CHo5EG9A.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/J4JWj6XM.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DKOrSS1J.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=29-DEuHUntK.js.map
