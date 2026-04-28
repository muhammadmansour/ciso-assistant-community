import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DTwwxaRN.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/32.NjXhuCAg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Dr5TFleC.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-CgIOd4qj.js.map
