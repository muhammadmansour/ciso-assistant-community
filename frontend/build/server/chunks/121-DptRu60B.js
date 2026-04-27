import { r as redirect } from './index-BWA_9C9m.js';
import { b as defaultWriteFormAction } from './actions-E8ioG7Dd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, f as fail, a as setError } from './superValidate-BmtJFExL.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-7XzjN-Wp.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import { a2 as successfullycreatedobject2, r as riskacceptancestatedoesntallowedit5, e as edit } from './_index-CqZWReca.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './utils-FiC4zhrQ.js';
import './i18n-DuIONS9Q.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
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

const index = 121;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BsitSHG2.js')).default;
const server_id = "src/routes/(app)/(internal)/stakeholders/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/121.DFVCg9qG.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/lUffIcPU.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/aZy3C1lL.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Cg79WYI3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QaaLfru0.js","_app/immutable/chunks/XJAwOsbJ.js","_app/immutable/chunks/Bglazh2S.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DqOcdrQH.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/Des4Ju3o.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BuX6WnKy.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BsIcXRUC.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/BkZ8p-97.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/CxOQ_ZR3.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/CsZeqhtT.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/M7kfo-Pj.js","_app/immutable/chunks/BZJncwRI.js","_app/immutable/chunks/BPxbLiAc.js","_app/immutable/chunks/zlp6oXm8.js","_app/immutable/chunks/BX9gk6VB.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/5vTlhyT_.js","_app/immutable/chunks/8B-0MpLl.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=121-DptRu60B.js.map
