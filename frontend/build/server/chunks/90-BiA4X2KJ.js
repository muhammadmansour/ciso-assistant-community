import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { ab as myprofile1 } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-Ywiu93vf.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/+page.server.ts";
const imports = ["_app/immutable/nodes/90.D34vu_j2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=90-BiA4X2KJ.js.map
