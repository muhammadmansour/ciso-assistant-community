import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/visual_analysis/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 55;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DNDYfqLd.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/visual/+page.server.ts";
const imports = ["_app/immutable/nodes/55.Cci2Efrw.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BLJYavgM.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Dq7EhTmb.js","_app/immutable/chunks/_5idpxm9.js","_app/immutable/chunks/BTtl3X3J.js","_app/immutable/chunks/WpeF5x3B.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DiXVpoUi.js","_app/immutable/chunks/CpFnAMUI.js","_app/immutable/chunks/CFI1T82Y.js","_app/immutable/chunks/DA9lfzba.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=55-DreAhH4K.js.map
