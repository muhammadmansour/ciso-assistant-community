import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { a as urlParamModelVerboseName, g as getModelInfo } from './crud-a52dcxCi.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { aO as successfullyrevokedobject2, aP as successfullyvalidatedobject2, aQ as successfullyrejectedobject2, ao as successfullyduplicateobject2 } from './_index-DEXNURl5.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate, a as setError, m as message } from './superValidate-jp4VH0Pt.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-k5zPah0t.js';
import { m as modelSchema } from './schemas-BcDBvyDd.js';
import { l as loadDetail } from './load-JUAUX7rj.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-D2ILrLnm.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-Cr6OPvHB.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/133.DvxY5UB7.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DMrd2D_c.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cc9NI9e2.js","_app/immutable/chunks/Bsj4-EOi.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CIYsOFIh.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/Dne1jDS_.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=133-BBYFw7Ec.js.map
