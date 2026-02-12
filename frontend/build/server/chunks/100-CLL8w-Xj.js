import { g as getModelInfo } from './crud-a52dcxCi.js';
import { l as loadDetail } from './load-JUAUX7rj.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './utils-FiC4zhrQ.js';
import { n as nestedDeleteFormAction } from './actions-k5zPah0t.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-BcDBvyDd.js';
import './string-BMZjP7XX.js';
import './superValidate-jp4VH0Pt.js';
import './index-BWA_9C9m.js';
import './zod-CkM6Syoc.js';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';
import './server-C682bpHT.js';

const load = async (event) => {
  const detailData = await loadDetail({
    event,
    model: getModelInfo("quantitative-risk-studies"),
    id: event.params.id
  });
  let combinedAleData = null;
  try {
    const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${event.params.id}/combined-ale/`;
    const response = await event.fetch(url);
    if (response.ok) {
      combinedAleData = await response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch combined ALE data:", error);
  }
  let combinedLecData = null;
  try {
    const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${event.params.id}/combined-lec/`;
    const response = await event.fetch(url);
    if (response.ok) {
      combinedLecData = await response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch combined LEC data:", error);
  }
  let aleComparisonData = null;
  try {
    const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${event.params.id}/ale-comparison/`;
    const response = await event.fetch(url);
    if (response.ok) {
      aleComparisonData = await response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch ALE comparison data:", error);
  }
  return {
    ...detailData,
    combinedAle: combinedAleData,
    combinedLec: combinedLecData,
    aleComparison: aleComparisonData
  };
};
const actions = {
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  retriggerAllSimulations: async (event) => {
    const endpoint = `${BASE_API_URL}/crq/quantitative-risk-studies/${event.params.id}/retrigger-all-simulations/`;
    const res = await event.fetch(endpoint, {
      method: "POST"
    });
    if (!res.ok) {
      const response = await res.json();
      console.error("Error response:", response);
      return {
        error: true,
        message: response
      };
    }
    const result = await res.json();
    return {
      success: true,
      message: { simulationsComplete: true, results: result }
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 100;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BZgxJWHd.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/100.Dm53cyhW.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DMrd2D_c.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cc9NI9e2.js","_app/immutable/chunks/Bsj4-EOi.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CIYsOFIh.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/Dne1jDS_.js","_app/immutable/chunks/DtgjVkkk.js","_app/immutable/chunks/BMJr_BuD.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=100-CLL8w-Xj.js.map
