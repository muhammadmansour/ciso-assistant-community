import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { aw as myprofile1 } from './_index-D7NdhnXA.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch, locals }) => {
  const res = await fetch(`${BASE_API_URL}/users/${locals.user.id}/`, { credentials: "include" }).then((r) => r.json()).catch((e) => {
    console.error("Error fetching user data:", e);
    return null;
  });
  return {
    currentUser: res,
    title: myprofile1()
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 90;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CnYRMyWI.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/+page.server.ts";
const imports = ["_app/immutable/nodes/90.Dnd_PZMa.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CAJjCORN.js","_app/immutable/chunks/ng3-XvhC.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/DxVupoGb.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/D7dzO6Di.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=90-CXT7jUE4.js.map
