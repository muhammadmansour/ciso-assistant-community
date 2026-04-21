import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate, m as message } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import { b as defaultWriteFormAction, n as nestedDeleteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
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

const index = 86;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-H2w2VpaM.js')).default;
const server_id = "src/routes/(app)/(internal)/generic-collections/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/86.Uqgo_NfF.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/n8hIQ2VI.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/bSb9YpUT.js","_app/immutable/chunks/CHJQfzF4.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/B7jerSYn.js","_app/immutable/chunks/DIh_kFsb.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/DEUXZ8QM.js","_app/immutable/chunks/CFQSVRMU.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/Dw1DiVSs.js","_app/immutable/chunks/Do4lXeSZ.js","_app/immutable/chunks/BlDq-91O.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/BCazNoug.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/ClqT8Cz6.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/g8KyPnx_.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CoGroNn-.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/epMrVhTE.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/Dkd-KlR9.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/C4WPkiBL.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/d0QSDTqO.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CQp2Vfl9.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/BJQ-bTjk.js","_app/immutable/chunks/LACOVsCk.js","_app/immutable/chunks/Cud_L1fS.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DcDfgfhU.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/CL1YE52f.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/BGgFRArE.js","_app/immutable/chunks/DUgNlWuZ.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js","_app/immutable/chunks/4rDFKEHB.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=86-WVel_imR.js.map
