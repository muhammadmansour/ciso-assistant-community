import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { n as nestedDeleteFormAction } from './actions-CyUUnsJo.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-DxPQoveO.js';
import './string-BMZjP7XX.js';
import './superValidate-BmtJFExL.js';
import './index-BWA_9C9m.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';
import './server-C682bpHT.js';

const load = async (event) => {
  const detailData = await loadDetail({
    event,
    model: getModelInfo("strategic-scenarios"),
    id: event.params.id
  });
  const attackPathsResponse = await event.fetch(
    `${BASE_API_URL}/ebios-rm/attack-paths/?strategic_scenario=${event.params.id}`
  );
  const attackPathsData = attackPathsResponse.ok ? await attackPathsResponse.json() : { results: [] };
  const focusedFearedEvent = detailData.data.focused_feared_event;
  const fearedEventsIds = focusedFearedEvent ? [focusedFearedEvent.id] : detailData.data.feared_events?.map((fe) => fe.id) || [];
  const fearedEventsData = [];
  if (fearedEventsIds.length > 0) {
    for (const feId of fearedEventsIds) {
      const feResponse = await event.fetch(`${BASE_API_URL}/ebios-rm/feared-events/${feId}/`);
      if (feResponse.ok) {
        fearedEventsData.push(await feResponse.json());
      }
    }
  }
  return {
    ...detailData,
    attackPaths: attackPathsData.results || [],
    fearedEventsWithAssets: fearedEventsData,
    isFocusedOnFearedEvent: !!focusedFearedEvent
  };
};
const actions = {
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 126;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-n62RETj_.js')).default;
const server_id = "src/routes/(app)/(internal)/strategic-scenarios/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/126.BUDm4lNt.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/CSnKSvpf.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/G1TSsRS0.js","_app/immutable/chunks/jLGvEFfk.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/6DdwpPu7.js","_app/immutable/chunks/hNQJxmIa.js","_app/immutable/chunks/CWqDUYCZ.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/DvypVQTF.js","_app/immutable/chunks/C1Av9eK7.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/RUegAlyn.js","_app/immutable/chunks/B2uwPNtE.js","_app/immutable/chunks/BHWq1_kx.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/B8mbPAmK.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/-5iaCzCy.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DgolYVi2.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/C6-SvHKR.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/jBfvTNCt.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BgAO3hZG.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/BH2Jr0az.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/Dka4TfVj.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CtHqGYBK.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/Ba9ppyKn.js","_app/immutable/chunks/gfSVmNt7.js","_app/immutable/chunks/C9yvPz1L.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/euVcTVGJ.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/BhypJILY.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/Nisa6kzK.js","_app/immutable/chunks/CMTxFHqT.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js","_app/immutable/chunks/Br8doqtw.js","_app/immutable/chunks/UDnCXAjM.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/39.BlnyDAbU.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=126-BTNi0QB1.js.map
