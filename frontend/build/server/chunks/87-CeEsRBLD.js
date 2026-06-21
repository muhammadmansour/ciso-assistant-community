import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { l as loadDetail } from './load-AOnXJHgd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate, m as message } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import { b as defaultWriteFormAction, n as nestedDeleteFormAction } from './actions-3TqTFyN3.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './index2-9icAqEyj.js';
import './_index-DiaVtc2Z.js';
import './runtime-BKo9q3Zd.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 87;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-S7kKBeU4.js')).default;
const server_id = "src/routes/(app)/(internal)/generic-collections/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/87.BzqgZnN9.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/DriSB2LX.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DU7syaJG.js","_app/immutable/chunks/CjMwYMKi.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/C7f_eY7G.js","_app/immutable/chunks/Ctl-V4Xk.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=87-CeEsRBLD.js.map
