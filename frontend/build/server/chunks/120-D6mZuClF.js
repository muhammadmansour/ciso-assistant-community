import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { g as getModelInfo, h as headData } from './crud-DA2NQw0x.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { s as setFlash } from './server-C682bpHT.js';
import { a6 as successfullycreatedobject2, e as edit } from './_index-BQcvYRD4.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { b as defaultWriteFormAction } from './actions-DcWiM4jj.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 120;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-mDGsENvc.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-scenarios/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/120.BCDCBuI2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Dd0AG25a.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/Kwq5OM76.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/-P7ZJSWS.js","_app/immutable/chunks/BRBsIFsK.js","_app/immutable/chunks/K3lHh_Jd.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/BbbovJSy.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/j8r7vPVS.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C676ICGK.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=120-D6mZuClF.js.map
