import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { aw as myprofile1 } from './_index-DZs3gE-i.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-gb3MqsOz.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/+page.server.ts";
const imports = ["_app/immutable/nodes/90.fFSakkP-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CZxxuQXT.js","_app/immutable/chunks/CVPAKgDb.js","_app/immutable/chunks/DvxHSXZr.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/I45z91Uz.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/BppZ2EeA.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/Cau80cIz.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=90-CzFwusSI.js.map
