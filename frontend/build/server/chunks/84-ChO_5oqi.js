import { g as getModelInfo } from './crud-BJ_TECqM.js';
import './utils-FiC4zhrQ.js';
import { a as nestedWriteFormAction, n as nestedDeleteFormAction, b as defaultWriteFormAction } from './actions-BkARH3Iu.js';
import { m as modelSchema } from './schemas-QFT6TgyO.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { l as loadDetail } from './load-Cwc3ScS1.js';
import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DZs3gE-i.js';
import './runtime-B_ICGJZJ.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-MfjzxjGF.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './app-Ci0UE2-c.js';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';

const load = async (event) => {
  const modelInfo = getModelInfo("incidents");
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  const timelineSchema = modelSchema("timeline-entries");
  const currentDate = /* @__PURE__ */ new Date();
  const formattedDateTime = currentDate.toISOString();
  const timelineForm = await superValidate(
    {
      incident: data.data.id,
      folder: data.data.folder.id,
      timestamp: formattedDateTime
    },
    zod(timelineSchema),
    { errors: false }
  );
  if (!data.relatedModels["timeline-entries"]) {
    data.relatedModels["timeline-entries"] = {};
  }
  data.relatedModels["timeline-entries"].createForm = timelineForm;
  const evidenceModel = getModelInfo("evidences");
  const evidenceCreateSchema = modelSchema("evidences");
  const evidenceCreateForm = await superValidate(
    { folder: data.data.folder.id },
    zod(evidenceCreateSchema),
    { errors: false }
  );
  async function fetchJson(url) {
    const res = await event.fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}: ${res.statusText}`);
      return null;
    }
    return res.json();
  }
  const evidenceSelectOptions = {};
  if (evidenceModel.selectFields) {
    await Promise.all(
      evidenceModel.selectFields.map(async (selectField) => {
        const url = `${BASE_API_URL}/evidences/${selectField.field}/`;
        const data2 = await fetchJson(url);
        if (data2) {
          evidenceSelectOptions[selectField.field] = Object.entries(data2).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }));
        }
      })
    );
  }
  evidenceModel.selectOptions = evidenceSelectOptions;
  data["evidenceModel"] = evidenceModel;
  data["evidenceCreateForm"] = evidenceCreateForm;
  return data;
};
const actions = {
  create: async (event) => {
    const redirectToWrittenObject = Boolean(event.params.model === "perimeters");
    return defaultWriteFormAction({
      event,
      urlModel: "timeline-entries",
      action: "create",
      redirectToWrittenObject
    });
  },
  delete: async (event) => {
    console.log("delete");
    return nestedDeleteFormAction({ event });
  },
  createEvidence: async (event) => {
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject: false });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 84;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-WeltrYvL.js')).default;
const server_id = "src/routes/(app)/(internal)/incidents/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/84.wG29Pmyp.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DTwbpzVX.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BHLmlRYN.js","_app/immutable/chunks/ZsCMuETm.js","_app/immutable/chunks/zapE1iAe.js","_app/immutable/chunks/DpHB2XBH.js","_app/immutable/chunks/DmFawp5s.js","_app/immutable/chunks/Ct7MAyXU.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/sJ_vtApT.js","_app/immutable/chunks/Br4_de63.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DGYMovtU.js","_app/immutable/chunks/CHoarrqc.js","_app/immutable/chunks/EKaN1WfC.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/CTCWosux.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/B0dbd_SC.js","_app/immutable/chunks/Qpqjqn02.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/_LHTEM1-.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BDveHrs8.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/dZ3d2j4m.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/Cu4Gnd5D.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DhsGNB-l.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/DpGKrRW5.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/CSZOe4pX.js","_app/immutable/chunks/u3IkIIpo.js","_app/immutable/chunks/B2ADjPh9.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/4eNwiUv6.js","_app/immutable/chunks/hqNPRCvp.js","_app/immutable/chunks/DQULDWxS.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/vnCTACr7.js","_app/immutable/chunks/C89Qma3L.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=84-ChO_5oqi.js.map
