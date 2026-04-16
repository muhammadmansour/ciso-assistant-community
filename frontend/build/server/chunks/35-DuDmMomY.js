import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-hnReBT2b.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/35.Dt72mGoh.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=35-DuDmMomY.js.map
