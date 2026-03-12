import { g as getModelInfo } from './crud-BJ_TECqM.js';
import { l as loadDetail, a as loadValidationFlowFormData } from './load-Cwc3ScS1.js';
import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './utils-FiC4zhrQ.js';
import { n as nestedDeleteFormAction } from './actions-BkARH3Iu.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DZs3gE-i.js';
import './runtime-B_ICGJZJ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-MfjzxjGF.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-QFT6TgyO.js';
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
    model: getModelInfo("business-impact-analysis"),
    id: event.params.id
  });
  const metricsData = await event.fetch(`${BASE_API_URL}/resilience/business-impact-analysis/${event.params.id}/metrics/`).then((res) => res.json());
  const { validationFlowForm, validationFlowModel } = await loadValidationFlowFormData({
    event,
    folderId: detailData.data.folder?.id || detailData.data.folder,
    targetField: "business_impact_analysis",
    targetIds: [event.params.id]
  });
  return {
    ...detailData,
    metrics: metricsData,
    validationFlowForm,
    validationFlowModel
  };
};
const actions = {
  delete: async (event) => {
    console.log("delete");
    return nestedDeleteFormAction({ event });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 40;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-wrmPqL9I.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/40.BAoiff44.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CuPblLYp.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DutDFo5s.js","_app/immutable/chunks/DYotTY_m.js","_app/immutable/chunks/B38VhOn4.js","_app/immutable/chunks/CyuO_K9h.js","_app/immutable/chunks/Cfkg7lxO.js","_app/immutable/chunks/DoPwhYM4.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/Dm-jTGab.js","_app/immutable/chunks/RZeClddz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/dKQsoG8S.js","_app/immutable/chunks/dzzbPx5I.js","_app/immutable/chunks/BXiyLsbQ.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DvSY28v2.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/5ZTKQjLk.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CWLGM_yx.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/DZmwvm-B.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/Cv4G-QpO.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/A2ruJfxM.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/ukgCg5ra.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DekCYVt1.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/pfsGfmwB.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/DIRO_7cb.js","_app/immutable/chunks/DQuhOwy3.js","_app/immutable/chunks/C8ZQAtcg.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/bMfKl0Bu.js","_app/immutable/chunks/hqNPRCvp.js","_app/immutable/chunks/B7sVGc0s.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/C5ITapJd.js","_app/immutable/chunks/ATWBsLVi.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js","_app/immutable/chunks/DjEdAIl1.js","_app/immutable/chunks/BSEA1keB.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=40-rfkJVU3G.js.map
