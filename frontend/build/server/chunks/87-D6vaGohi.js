import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { a9 as librarysuccessfullyupdated2 } from './_index-DEXNURl5.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, params, url }) => {
  const endpoint = `/loaded-libraries/${params.id}`;
  const queryParams = url.searchParams.toString();
  const library = await fetch(`${endpoint}?${queryParams}`).then((res) => res.json());
  return {
    tree: fetch(`${endpoint}/tree?${queryParams}`).then((res) => res.json()) ?? {},
    library,
    title: library.name
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const actions = {
  update: async (event) => {
    const action = new URL(event.request.url).searchParams.get("action");
    const endpoint = `${BASE_API_URL}/loaded-libraries/${event.params.id}/update` + (action ? `?action=${action}` : "");
    const res = await event.fetch(endpoint);
    const result = await res.json();
    if (!res.ok) {
      if (result.error === "score_change_detected") {
        return fail(409, {
          error: "score_change_detected",
          choices: result.strategies
        });
      }
      setFlash(
        {
          type: "error",
          message: safeTranslate(result.error)
        },
        event
      );
    } else {
      setFlash(
        {
          type: "success",
          message: librarysuccessfullyupdated2()
        },
        event
      );
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 87;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7K1nNvgw.js')).default;
const universal_id = "src/routes/(app)/(internal)/loaded-libraries/[id=uuid]/+page.ts";
const server_id = "src/routes/(app)/(internal)/loaded-libraries/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/87.B8hTuJKx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CbJYQrkZ.js","_app/immutable/chunks/CgllljJC.js","_app/immutable/chunks/CIsSnnMM.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=87-D6vaGohi.js.map
