import { r as redirect } from './index-BWA_9C9m.js';
import { b as defaultWriteFormAction } from './actions-3TqTFyN3.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, f as fail, a as setError } from './superValidate-BmtJFExL.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import { a6 as successfullycreatedobject2, r as riskacceptancestatedoesntallowedit5, e as edit } from './_index-DiaVtc2Z.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './utils-FiC4zhrQ.js';
import './i18n-CxHbQmwN.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

const load = async (event) => {
  const URLModel = "stakeholders";
  const schema = modelSchema(URLModel);
  const model = getModelInfo(URLModel);
  const stakeholderEndpoint = `${BASE_API_URL}/ebios-rm/stakeholders/${event.params.id}/`;
  const stakeholder = await event.fetch(stakeholderEndpoint).then((res) => res.json());
  const object = await event.fetch(`${stakeholderEndpoint}object/`).then((res) => res.json());
  const form = await superValidate(object, zod(schema), { errors: false });
  const selectFields = model.selectFields;
  if (model.urlModel === "risk-acceptances") {
    const riskAcceptance = await event.fetch(`${BASE_API_URL}/${URLModel}/${event.params.id}/`).then((res) => res.json());
    if (["Accepted", "Rejected", "Revoked"].includes(riskAcceptance.state)) {
      console.log("The state of risk acceptance doesn't allow it to be edited");
      setFlash(
        {
          type: "error",
          message: riskacceptancestatedoesntallowedit5()
        },
        event
      );
      throw redirect(
        302,
        getSecureRedirect(event.url.searchParams.get("next")) || `/${model.urlModel}/${riskAcceptance.id}`
      );
    }
  }
  const selectOptions = {};
  if (selectFields) {
    for (const selectField of selectFields) {
      const url = `${BASE_API_URL}/${model.endpointUrl ?? URLModel}/${selectField.detail ? event.params.id + "/" : ""}${selectField.field}/`;
      const response = await event.fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  model.selectOptions = selectOptions;
  const measureCreateSchema = modelSchema("applied-controls");
  const initialData = {
    folder: stakeholder.folder.id
  };
  const measureCreateForm = await superValidate(initialData, zod(measureCreateSchema), {
    errors: false
  });
  const measureModel = getModelInfo("applied-controls");
  const measureSelectOptions = {};
  if (measureModel.selectFields) {
    for (const selectField of measureModel.selectFields) {
      const url = `${BASE_API_URL}/applied-controls/${selectField.field}/`;
      const response = await event.fetch(url);
      if (response.ok) {
        measureSelectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  measureModel.selectOptions = measureSelectOptions;
  return {
    form,
    model,
    object,
    selectOptions,
    URLModel,
    measureCreateForm,
    measureModel,
    title: edit()
  };
};
const actions = {
  updateStakeholder: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "stakeholders", action: "edit" });
  },
  createAppliedControl: async (event) => {
    const URLModel = "applied-controls";
    const schema = modelSchema(URLModel);
    const model = getModelInfo(URLModel);
    const endpoint = `${BASE_API_URL}/${URLModel}/`;
    const form = await superValidate(event.request, zod(schema));
    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      if (response.non_field_errors) {
        setError(form, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form });
    }
    const measure = await res.json();
    const stakeholderEndpoint = `${BASE_API_URL}/ebios-rm/stakeholders/${event.params.id}/`;
    const stakeholder = await event.fetch(`${stakeholderEndpoint}object/`).then((res2) => res2.json());
    const measures = [...stakeholder.applied_controls, measure.id];
    const patchRequestInitOptions = {
      method: "PATCH",
      body: JSON.stringify({ applied_controls: measures })
    };
    const patchRes = await event.fetch(stakeholderEndpoint, patchRequestInitOptions);
    if (!patchRes.ok) {
      const response = await patchRes.json();
      console.error("server response:", response);
      if (response.non_field_errors) {
        setError(form, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form });
    }
    setFlash(
      {
        type: "success",
        message: successfullycreatedobject2({ object: model.verboseName.toLowerCase() })
      },
      event
    );
    return { form };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 127;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B1fuwoGC.js')).default;
const server_id = "src/routes/(app)/(internal)/stakeholders/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/127.D24Rps_J.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/CQ6GKnZn.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DVwtFNnP.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/DDdh9g1Y.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/DjBCuBoH.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/4PllBcGo.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/xTkX8pvu.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/4XQSSWM9.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/BeLFEG_F.js","_app/immutable/chunks/CsQxgAcg.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CNFco8Jp.js","_app/immutable/chunks/B5eY5Twp.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=127-Bh85e42i.js.map
