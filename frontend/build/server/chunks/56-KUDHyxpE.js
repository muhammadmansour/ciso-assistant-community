import { b as defaultWriteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo, b as urlParamModelSelectFields } from './crud-CFDLlT9z.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail, s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType, n as numberType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './i18n-B-ZrD2ao.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch, parent }) => {
  const URLModel = "ebios-rm";
  const model = getModelInfo(URLModel);
  const endpoint = model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/${params.id}/` : `${BASE_API_URL}/${model.urlModel}/${params.id}/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  await parent();
  const initialData = {
    risk_matrix: data.risk_matrix.id,
    ebios_rm_study: params.id
  };
  const createSchema = modelSchema("risk-assessments");
  const createRiskAnalysisForm = await superValidate(initialData, zod(createSchema), {
    errors: false
  });
  const riskModel = getModelInfo("risk-assessments");
  const selectFields = urlParamModelSelectFields(riskModel.urlModel);
  const selectOptions = {};
  for (const selectField of selectFields) {
    if (selectField.detail) continue;
    const url = riskModel.endpointUrl ? `${BASE_API_URL}/${riskModel.endpointUrl}/${selectField.field}/` : `${BASE_API_URL}/${riskModel.urlModel}/${selectField.field}/`;
    const response = await fetch(url);
    if (response.ok) {
      selectOptions[selectField.field] = await response.json().then(
        (data2) => Object.entries(data2).map(([key, value]) => ({
          label: value,
          value: selectField.valueType === "number" ? parseInt(key) : key
        }))
      );
    } else {
      console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
    }
  }
  riskModel["selectOptions"] = selectOptions;
  return { createRiskAnalysisForm, riskModel };
};
const actions = {
  create: async (event) => {
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify({
        status: "done",
        step: 1,
        workshop: 5
      })
    };
    const endpoint = `${BASE_API_URL}/ebios-rm/studies/${event.params.id}/workshop/5/step/1/`;
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.text();
      console.error(response);
    }
    return defaultWriteFormAction({
      event,
      urlModel: "risk-assessments",
      action: "create",
      redirectToWrittenObject: true
    });
  },
  changeStepState: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = objectType({
      workshop: numberType(),
      step: numberType(),
      status: stringType()
    });
    const form = await superValidate(formData, zod(schema));
    const workshop = formData.get("workshop");
    const step = formData.get("step");
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify(form.data)
    };
    const endpoint = `${BASE_API_URL}/ebios-rm/studies/${event.params.id}/workshop/${workshop}/step/${step}/`;
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.text();
      console.error(response);
      return fail(400, { form });
    }
    return { success: true, form };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 56;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DQcxrAaG.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/56.Dt_rHoRS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DM6hxPHh.js","_app/immutable/chunks/DXF9TMZi.js","_app/immutable/chunks/b8SWVt-e.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BXmcmAv2.js","_app/immutable/chunks/C17Bq3Gq.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DP6h8Wu-.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/DNtCAAxP.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/DS-6KAjI.js","_app/immutable/chunks/Dp_Tn0TE.js","_app/immutable/chunks/BNe8ndVh.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/C0GJTWy1.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/q4_xLabf.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/nmAmutaD.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BvIKfiWz.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/DuNvfXXg.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/CUfmHW78.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/DkuvJ9Pa.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/ApzRCKRk.js","_app/immutable/chunks/DJSLwow5.js","_app/immutable/chunks/D7zECSAN.js","_app/immutable/chunks/CspyEU5O.js","_app/immutable/chunks/CUl5Hafe.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/TKeEwWBW.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/DbavOtMe.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/Card.CatA3_8h.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=56-KUDHyxpE.js.map
