import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CfVUlFIX.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/32.5cm7clEH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-BtwZY_4X.js.map
