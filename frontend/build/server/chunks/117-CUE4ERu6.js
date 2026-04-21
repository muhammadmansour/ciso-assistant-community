import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo, h as headData } from './crud-CFDLlT9z.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { s as setFlash } from './server-C682bpHT.js';
import { a2 as successfullycreatedobject2, e as edit } from './_index-Syqrsmaf.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { b as defaultWriteFormAction } from './actions-CyUUnsJo.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const load = async ({ params, fetch }) => {
  const URLModel = "risk-scenarios";
  const schema = modelSchema(URLModel);
  const baseEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const objectEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/object/`;
  const object = await fetch(objectEndpoint).then((res) => res.json());
  const scenario = await fetch(baseEndpoint).then((res) => res.json());
  const form = await superValidate(object, zod(schema), { errors: false });
  const model = getModelInfo(URLModel);
  const selectFields = model.selectFields;
  const riskMatrix = await fetch(`${BASE_API_URL}/risk-matrices/${object.risk_matrix}/`).then((res) => res.json()).then((res) => JSON.parse(res.json_definition));
  const tables = {};
  await Promise.all(
    ["assets", "applied-controls", "vulnerabilities"].map(async (key) => {
      const keyEndpoint = `${BASE_API_URL}/${key}/?risk_scenarios=${params.id}`;
      const response = await fetch(keyEndpoint);
      if (response.ok) {
        const table = {
          head: headData(key),
          body: [],
          meta: []
        };
        tables[key] = table;
      } else {
        console.error(`Failed to fetch data for ${key}: ${response.statusText}`);
      }
    })
  );
  const selectOptions = {};
  if (selectFields) {
    for (const selectField of selectFields) {
      const url = `${BASE_API_URL}/${URLModel}/${selectField.field}/`;
      const response = await fetch(url);
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
  const probabilityChoicesEndpoint = `${baseEndpoint}probability/`;
  const probabilityChoices = await fetch(probabilityChoicesEndpoint).then((res) => res.json()).then(
    (data) => Object.entries(data).map(([key, value]) => ({
      label: value,
      value: parseInt(key)
    })).sort((a, b) => a.value - b.value)
  );
  const impactChoicesEndpoint = `${baseEndpoint}impact/`;
  const impactChoices = await fetch(impactChoicesEndpoint).then((res) => res.json()).then(
    (data) => Object.entries(data).map(([key, value]) => ({
      label: value,
      value: parseInt(key)
    })).sort((a, b) => a.value - b.value)
  );
  const treatmentChoicesEndpoint = `${BASE_API_URL}/${URLModel}/treatment/`;
  const qualificationChoicesEndpoint = `${BASE_API_URL}/${URLModel}/qualifications/`;
  const [treatmentChoices, qualificationChoices] = await Promise.all(
    [treatmentChoicesEndpoint, qualificationChoicesEndpoint].map(
      (endpoint) => fetch(endpoint).then((res) => res.json()).then(
        (data) => Object.entries(data).map(([key, value]) => ({
          label: value,
          value: key
        }))
      )
    )
  );
  const strengthOfKnowledgeChoicesEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/strength_of_knowledge/`;
  const strengthOfKnowledgeChoices = await fetch(
    strengthOfKnowledgeChoicesEndpoint
  ).then((res) => res.json());
  const measureCreateSchema = modelSchema("applied-controls");
  const initialData = {
    folder: scenario.perimeter.folder.id
  };
  const measureCreateForm = await superValidate(initialData, zod(measureCreateSchema), {
    errors: false
  });
  const measureModel = getModelInfo("applied-controls");
  const measureSelectOptions = {};
  if (measureModel.selectFields) {
    for (const selectField of measureModel.selectFields) {
      const url = `${BASE_API_URL}/applied-controls/${selectField.field}/`;
      const response = await fetch(url);
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
    scenario,
    riskMatrix,
    selectOptions,
    URLModel,
    probabilityChoices,
    impactChoices,
    treatmentChoices,
    qualificationChoices,
    strengthOfKnowledgeChoices,
    tables,
    measureModel,
    measureCreateForm,
    title: edit()
  };
};
const actions = {
  updateRiskScenario: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "risk-scenarios", action: "edit" });
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
      Object.entries(response).forEach(([key, value]) => {
        setError(form, key, safeTranslate(value));
      });
      return fail(400, { form });
    }
    const measure = await res.json();
    const scenarioEndpoint = `${BASE_API_URL}/risk-scenarios/${event.params.id}/`;
    const scenario = await event.fetch(`${scenarioEndpoint}object/`).then((res2) => res2.json());
    const field = event.url.searchParams.get("field") || "applied_controls";
    const measures = [...scenario[field], measure.id];
    const patchRequestInitOptions = {
      method: "PATCH",
      body: JSON.stringify({ [field]: measures })
    };
    const patchRes = await event.fetch(scenarioEndpoint, patchRequestInitOptions);
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
    return { form, newControl: { field, appliedControl: measure.id } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 117;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B-jX_vgZ.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-scenarios/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/117.tEs0mM30.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BvfshpDU.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CL1MtWUI.js","_app/immutable/chunks/CVry4SXA.js","_app/immutable/chunks/DqI8LxJS.js","_app/immutable/chunks/BBF8pxsr.js","_app/immutable/chunks/CmwBA6gY.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/DkP_2XjV.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/Yrr7u_J7.js","_app/immutable/chunks/B2d7Kn0g.js","_app/immutable/chunks/BJgYCOde.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/FUON2Tb3.js","_app/immutable/chunks/coRzUdqH.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CenfJXbu.js","_app/immutable/chunks/ZM_KH0ts.js","_app/immutable/chunks/Dl4VVEB9.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/G_-wXQMR.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/BbSGlnrT.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/62MrVLfz.js","_app/immutable/chunks/CuECpGv5.js","_app/immutable/chunks/VesEJn6I.js","_app/immutable/chunks/C43KYMUz.js","_app/immutable/chunks/DhtFfOXf.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BQtjeuej.js","_app/immutable/chunks/DZ-s9QyG.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=117-CUE4ERu6.js.map
