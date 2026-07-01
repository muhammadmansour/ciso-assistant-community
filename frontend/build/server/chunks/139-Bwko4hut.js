import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { a as urlParamModelVerboseName, g as getModelInfo } from './crud-DA2NQw0x.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { bb as successfullyrevokedobject2, bc as successfullyvalidatedobject2, bd as successfullyrejectedobject2, aN as successfullyduplicateobject2 } from './_index-BQcvYRD4.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError, m as message } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-DcWiM4jj.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
import { l as loadDetail } from './load-Dnmys82m.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-kKl3LETH.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/139.CXPbwAWC.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/8uOR9ZNu.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Ch1PJ8CC.js","_app/immutable/chunks/DXgqwX3s.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/Dd0AG25a.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/Kwq5OM76.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/-P7ZJSWS.js","_app/immutable/chunks/BRBsIFsK.js","_app/immutable/chunks/K3lHh_Jd.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/BbbovJSy.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/j8r7vPVS.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C676ICGK.js","_app/immutable/chunks/Cu890w6c.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/S614vnmE.js","_app/immutable/chunks/Dh8-nY5L.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CGWWUgM5.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=139-Bwko4hut.js.map
