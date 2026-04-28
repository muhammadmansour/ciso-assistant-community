import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { a as urlParamModelVerboseName, g as getModelInfo } from './crud-Dl9mduNa.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { b7 as successfullyrevokedobject2, b8 as successfullyvalidatedobject2, b9 as successfullyrejectedobject2, aJ as successfullyduplicateobject2 } from './_index-CqZWReca.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError, m as message } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-DRSM8X9N.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import { l as loadDetail } from './load-y7adB23o.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';
import './access-control-DaLcieub.js';

const load = async (event) => {
  const modelInfo = getModelInfo(event.params.model);
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  if (event.params.model === "applied-controls") {
    const appliedControlSchema = modelSchema(event.params.model);
    const appliedControl = data.data;
    const initialDataDuplicate = {
      name: appliedControl.name,
      description: appliedControl.description
    };
    const appliedControlDuplicateForm = await superValidate(
      initialDataDuplicate,
      zod(appliedControlSchema),
      {
        errors: false
      }
    );
    data.duplicateForm = appliedControlDuplicateForm;
  }
  return data;
};
const actions = {
  create: async (event) => {
    const redirectToWrittenObject = Boolean(event.params.model === "perimeters");
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject });
  },
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  duplicate: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return;
    const schema = modelSchema(event.params.model + "_duplicate");
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/${event.params.model}/${event.params.id}/duplicate/`;
    if (!form.valid) {
      console.error(form.errors);
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    const modelVerboseName = urlParamModelVerboseName(event.params.model);
    setFlash(
      {
        type: "success",
        message: successfullyduplicateobject2({
          object: safeTranslate(modelVerboseName).toLowerCase()
        })
      },
      event
    );
    return { form };
  },
  reject: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const rejectForm = await superValidate(formData, zod(schema));
    const urlmodel = rejectForm.data.urlmodel;
    const id = rejectForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/reject/`;
    if (!rejectForm.valid) {
      return fail(400, { form: rejectForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.non_field_errors) {
        setError(rejectForm, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form: rejectForm });
    }
    const model = urlParamModelVerboseName(params.model);
    return message(
      rejectForm,
      successfullyrejectedobject2({
        object: safeTranslate(model).toLowerCase()
      })
    );
  },
  submit: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const submitForm = await superValidate(formData, zod(schema));
    const urlmodel = submitForm.data.urlmodel;
    const id = submitForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/submit/`;
    if (!submitForm.valid) {
      return fail(400, { form: submitForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.non_field_errors) {
        setError(submitForm, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form: submitForm });
    }
    const model = urlParamModelVerboseName(params.model);
    return message(
      submitForm,
      successfullyvalidatedobject2({
        object: safeTranslate(model).toLowerCase()
      })
    );
  },
  draft: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const draftForm = await superValidate(formData, zod(schema));
    const urlmodel = draftForm.data.urlmodel;
    const id = draftForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/draft/`;
    if (!draftForm.valid) {
      return fail(400, { form: draftForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.non_field_errors) {
        setError(draftForm, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form: draftForm });
    }
    const model = urlParamModelVerboseName(params.model);
    return message(
      draftForm,
      successfullyvalidatedobject2({
        object: safeTranslate(model).toLowerCase()
      })
    );
  },
  accept: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const acceptForm = await superValidate(formData, zod(schema));
    const urlmodel = acceptForm.data.urlmodel;
    const id = acceptForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/accept/`;
    if (!acceptForm.valid) {
      return fail(400, { form: acceptForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.non_field_errors) {
        setError(acceptForm, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form: acceptForm });
    }
    const model = urlParamModelVerboseName(params.model);
    return message(
      acceptForm,
      successfullyvalidatedobject2({
        object: safeTranslate(model).toLowerCase()
      })
    );
  },
  revoke: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const revokeForm = await superValidate(formData, zod(schema));
    const urlmodel = revokeForm.data.urlmodel;
    const id = revokeForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/revoke/`;
    if (!revokeForm.valid) {
      return fail(400, { form: revokeForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.non_field_errors) {
        setError(revokeForm, "non_field_errors", response.non_field_errors);
      }
      return fail(400, { form: revokeForm });
    }
    const model = urlParamModelVerboseName(params.model);
    return message(
      revokeForm,
      successfullyrevokedobject2({
        object: safeTranslate(model).toLowerCase()
      })
    );
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 133;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DYRO1e6O.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/133.DDnkVWdG.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/5Rek7w37.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DYFB3whk.js","_app/immutable/chunks/CumOB_G-.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/D4Xh5k1E.js","_app/immutable/chunks/BmMs8hfm.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/iVp7HJnO.js","_app/immutable/chunks/BBE2L2kR.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Bn1B7sWx.js","_app/immutable/chunks/JkyNnoux.js","_app/immutable/chunks/Bisu60EG.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/FLsuLDXF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CwIIuQae.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/D9RZlKqy.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/6Cxm2iQL.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DvHR2hVB.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BHendfPR.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/Uz9Gfgi2.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/CUK1Az36.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BpARUPJY.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/umhFkAQm.js","_app/immutable/chunks/CIPTfslo.js","_app/immutable/chunks/CKMhcJUh.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DaKiHdC1.js","_app/immutable/chunks/n66UJIcb.js","_app/immutable/chunks/C5s17Fo-.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/DgxtAu4M.js","_app/immutable/chunks/BcWYpVoJ.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=133-BJEiWioR.js.map
