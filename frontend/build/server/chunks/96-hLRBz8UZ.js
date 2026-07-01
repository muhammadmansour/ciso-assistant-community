import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { aA as myprofile1 } from './_index-BQcvYRD4.js';
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

const index = 96;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CIC1GvUO.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/+page.server.ts";
const imports = ["_app/immutable/nodes/96.BkT3T4Ld.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=96-hLRBz8UZ.js.map
