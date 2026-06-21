import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { a as urlParamModelVerboseName, g as getModelInfo } from './crud-DzBk-fdF.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { bb as successfullyrevokedobject2, bc as successfullyvalidatedobject2, bd as successfullyrejectedobject2, aN as successfullyduplicateobject2 } from './_index-DiaVtc2Z.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError, m as message } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-3TqTFyN3.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import { l as loadDetail } from './load-AOnXJHgd.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
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

const index = 139;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BHmz4E1p.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/139.BIc6JTRg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/DriSB2LX.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DU7syaJG.js","_app/immutable/chunks/CjMwYMKi.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/C7f_eY7G.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=139-BnhFsIxg.js.map
