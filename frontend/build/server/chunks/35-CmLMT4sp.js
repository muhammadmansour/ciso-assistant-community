import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const URLModel = "applied-controls";
  const endpoint = `${BASE_API_URL}/${URLModel}/`;
  const queryParams = new URLSearchParams();
  const searchParams = url.searchParams;
  for (const [key, value] of searchParams.entries()) {
    if (!["backUrl", "backLabel"].includes(key)) {
      queryParams.set(key, value);
    }
  }
  const fullEndpoint = `${endpoint}?${queryParams.toString()}`;
  const response = await fetch(fullEndpoint);
  const appliedControlsData = await response.json();
  const rawBackUrl = searchParams.get("backUrl") || "/applied-controls";
  const backUrl = rawBackUrl.startsWith("/") && !rawBackUrl.startsWith("//") ? rawBackUrl : "/applied-controls";
  const backLabel = searchParams.get("backLabel") || "Applied Controls";
  return {
    URLModel,
    applied_controls: appliedControlsData.results || appliedControlsData,
    backUrl,
    backLabel
  };
});
const actions = {
  updateAppliedControl: async (event) => {
    const data = await event.request.json();
    const value = data;
    const URLModel = "applied-controls";
    const endpoint = `${BASE_API_URL}/${URLModel}/${value.id}/`;
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify(value)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    return { status: res.status, body: await res.json() };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 35;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CJGY1No2.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/35.BcanDdML.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=35-CmLMT4sp.js.map
