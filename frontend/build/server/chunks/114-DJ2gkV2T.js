import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { g as getModelInfo, h as headData } from './crud-BJ_TECqM.js';
import { m as modelSchema } from './schemas-QFT6TgyO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { s as setFlash } from './server-C682bpHT.js';
import { a2 as successfullycreatedobject2, e as edit } from './_index-DZs3gE-i.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { b as defaultWriteFormAction } from './actions-BkARH3Iu.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './stores-CMqbeBUT.js';
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

const index = 114;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CpF49-W3.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-scenarios/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/114.CbClln3Q.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/BDveHrs8.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/zapE1iAe.js","_app/immutable/chunks/CHoarrqc.js","_app/immutable/chunks/DGYMovtU.js","_app/immutable/chunks/DpHB2XBH.js","_app/immutable/chunks/EKaN1WfC.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/dZ3d2j4m.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/Cu4Gnd5D.js","_app/immutable/chunks/BHLmlRYN.js","_app/immutable/chunks/ZsCMuETm.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/CTCWosux.js","_app/immutable/chunks/Br4_de63.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B0dbd_SC.js","_app/immutable/chunks/Qpqjqn02.js","_app/immutable/chunks/_LHTEM1-.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DhsGNB-l.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/DpGKrRW5.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/CSZOe4pX.js","_app/immutable/chunks/u3IkIIpo.js","_app/immutable/chunks/DmFawp5s.js","_app/immutable/chunks/Ct7MAyXU.js","_app/immutable/chunks/B2ADjPh9.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/4eNwiUv6.js","_app/immutable/chunks/hqNPRCvp.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=114-DJ2gkV2T.js.map
