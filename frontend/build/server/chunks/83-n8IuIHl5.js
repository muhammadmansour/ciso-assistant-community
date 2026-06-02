import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { l as loadDetail } from './load-y7adB23o.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate, m as message } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import { b as defaultWriteFormAction, n as nestedDeleteFormAction } from './actions-DRSM8X9N.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-DuIONS9Q.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';

const FIELD_MAP = {
  "compliance-assessments": "compliance_assessments",
  "risk-assessments": "risk_assessments",
  "quantitative-risk-studies": "crq_studies",
  "ebios-rm": "ebios_studies",
  "entity-assessments": "entity_assessments",
  "findings-assessments": "findings_assessments",
  evidences: "documents",
  "security-exceptions": "security_exceptions",
  policies: "policies",
  "generic-collections": "dependencies"
};
const load = async (event) => {
  const URLModel = "generic-collections";
  const modelInfo = getModelInfo(URLModel);
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  const objectEndpoint = `${BASE_API_URL}/${modelInfo.endpointUrl || URLModel}/${event.params.id}/object/`;
  const objectResponse = await event.fetch(objectEndpoint);
  const object = await objectResponse.json();
  const updateForms = {};
  const updateSchema = modelSchema(URLModel);
  for (const [urlModel, fieldName] of Object.entries(FIELD_MAP)) {
    const formData = {
      name: object.name,
      description: object.description,
      folder: object.folder,
      ref_id: object.ref_id,
      [fieldName]: object[fieldName] || []
    };
    updateForms[fieldName] = await superValidate(formData, zod(updateSchema), { errors: false });
  }
  return {
    ...data,
    updateForms,
    object
  };
};
const actions = {
  create: async (event) => {
    const formData = await event.request.formData();
    const urlModel = formData.get("urlmodel");
    const genericCollectionId = formData.get("genericcollection");
    formData.delete("genericcollection");
    const schema = modelSchema(urlModel);
    const form = await superValidate(formData, zod(schema));
    if (!form.valid) {
      return message(form, { status: 400 });
    }
    const modelInfo = getModelInfo(urlModel);
    const endpoint = modelInfo.endpointUrl ? `${BASE_API_URL}/${modelInfo.endpointUrl}/` : `${BASE_API_URL}/${urlModel}/`;
    const response = await event.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form.data)
    });
    if (!response.ok) {
      const error = await response.json();
      return message(form, { status: response.status, error });
    }
    const createdObject = await response.json();
    if (createdObject?.id && genericCollectionId) {
      const fieldName = FIELD_MAP[urlModel];
      if (fieldName) {
        const gcEndpoint = `${BASE_API_URL}/pmbok/generic-collections/${genericCollectionId}/object/`;
        const gcResponse = await event.fetch(gcEndpoint);
        const gcData = await gcResponse.json();
        const updatedField = [...gcData[fieldName] || [], createdObject.id];
        await event.fetch(`${BASE_API_URL}/pmbok/generic-collections/${genericCollectionId}/`, {
          method: "PUT",
          body: JSON.stringify({
            ...gcData,
            [fieldName]: updatedField
          })
        });
      }
    }
    return message(form, { object: createdObject });
  },
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  update: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "generic-collections", action: "edit" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 83;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uU-dz_Ph.js')).default;
const server_id = "src/routes/(app)/(internal)/generic-collections/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/83.igzDvIlE.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/-tYdV5ii.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BhEL2seE.js","_app/immutable/chunks/D60C9O1B.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/DCxWm0lK.js","_app/immutable/chunks/DPHQtyJs.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/Dwr4wZVV.js","_app/immutable/chunks/DbbU6VTG.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DfJVBPAp.js","_app/immutable/chunks/Rxart3gn.js","_app/immutable/chunks/CRiXYdiU.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DsdzjnHy.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BK6fI94v.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/BX6nAo1d.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/CClApH9G.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/CuLB3eUc.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DdLxYy2R.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BSlXmw9I.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/JTiRBoea.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BDbwjVsq.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/Xaov5YdE.js","_app/immutable/chunks/Bri6rQyA.js","_app/immutable/chunks/B6xGvAKi.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Bi_fmpDJ.js","_app/immutable/chunks/DFYAaWcd.js","_app/immutable/chunks/DFQVLR12.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CepaMXkl.js","_app/immutable/chunks/DoShNErD.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/CiqknFnA.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=83-n8IuIHl5.js.map
