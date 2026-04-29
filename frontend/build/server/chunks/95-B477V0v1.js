import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo, l as listViewFields } from './crud-Dl9mduNa.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-DRSM8X9N.js';
import { l as loadDetail } from './load-y7adB23o.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
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
import './i18n-DuIONS9Q.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-5y-ookeO.js';
import './string-BMZjP7XX.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './superValidate-BmtJFExL.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';

const load = async (event) => {
  const URLModel = "operational-scenarios";
  const model = getModelInfo(URLModel);
  const detail = await loadDetail({ event, model, id: event.params.id });
  const headData = listViewFields[URLModel].body.reduce(
    (obj, key, index) => {
      obj[key] = listViewFields[URLModel].head[index];
      return obj;
    },
    {}
  );
  const table = {
    head: headData,
    body: [],
    meta: []
  };
  const likelihoodChoicesEndpoint = `${BASE_API_URL}/ebios-rm/studies/${detail.data.ebios_rm_study.id}/likelihood/`;
  const likelihoodChoicesResponse = await event.fetch(likelihoodChoicesEndpoint);
  if (likelihoodChoicesResponse.ok) {
    detail.relatedModels["operating-modes"].selectOptions["likelihood"] = await likelihoodChoicesResponse.json().then(
      (data) => Object.entries(data).map(([key, value]) => ({
        label: value,
        value: parseInt(key)
      }))
    );
  } else {
    console.error(`Failed to fetch data for likelihood: ${likelihoodChoicesResponse.statusText}`);
  }
  return { ...detail, table };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "operating-modes",
      action: "create"
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "operating-modes" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 95;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C9IbO3qN.js')).default;
const server_id = "src/routes/(app)/(internal)/operational-scenarios/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/95.CHD86cnY.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BhEL2seE.js","_app/immutable/chunks/D60C9O1B.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DFQVLR12.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CepaMXkl.js","_app/immutable/chunks/DbbU6VTG.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DfJVBPAp.js","_app/immutable/chunks/Rxart3gn.js","_app/immutable/chunks/CRiXYdiU.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DoShNErD.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DCxWm0lK.js","_app/immutable/chunks/DPHQtyJs.js","_app/immutable/chunks/BSlXmw9I.js","_app/immutable/chunks/CuLB3eUc.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DdLxYy2R.js","_app/immutable/chunks/DsdzjnHy.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B6xGvAKi.js","_app/immutable/chunks/BK6fI94v.js","_app/immutable/chunks/BX6nAo1d.js","_app/immutable/chunks/CClApH9G.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/JTiRBoea.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BDbwjVsq.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/Xaov5YdE.js","_app/immutable/chunks/Bri6rQyA.js","_app/immutable/chunks/Bi_fmpDJ.js","_app/immutable/chunks/DFYAaWcd.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=95-B477V0v1.js.map
