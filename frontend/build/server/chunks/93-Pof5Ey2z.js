import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aw as myprofile1 } from './_index-Syqrsmaf.js';
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

const index = 93;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BDbJXVit.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/+page.server.ts";
const imports = ["_app/immutable/nodes/93.BfcX_Ksr.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B2d7Kn0g.js","_app/immutable/chunks/BJgYCOde.js","_app/immutable/chunks/CL1MtWUI.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BBF8pxsr.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/VesEJn6I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/C43KYMUz.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=93-Pof5Ey2z.js.map
