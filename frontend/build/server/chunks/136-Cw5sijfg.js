import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { a as urlParamModelVerboseName, g as getModelInfo } from './crud-CFDLlT9z.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { b7 as successfullyrevokedobject2, b8 as successfullyvalidatedobject2, b9 as successfullyrejectedobject2, aJ as successfullyduplicateobject2 } from './_index-Syqrsmaf.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError, m as message } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-CyUUnsJo.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
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

const index = 136;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-yBbx51Ii.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/136.B-KAJ553.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CVkNG-cO.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CdVwy0PZ.js","_app/immutable/chunks/CKO4dPCJ.js","_app/immutable/chunks/DbIb9Ju9.js","_app/immutable/chunks/BGK2LtGf.js","_app/immutable/chunks/DOkMQwmO.js","_app/immutable/chunks/DYKZopNA.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/xi_3XK1H.js","_app/immutable/chunks/D-XA5c9k.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/BCvTyX3A.js","_app/immutable/chunks/Ff-ubNeT.js","_app/immutable/chunks/DAu9gq5O.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Bz3bW-Y9.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/Dgfvb-A0.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DeVakgPc.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/toNAIyys.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/CmXFA_2q.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CLe9HjSx.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/DVuF4Br3.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/D_r3_-OE.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/BhTiR7qz.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DAPS8NkP.js","_app/immutable/chunks/g7jbKG_1.js","_app/immutable/chunks/CO2fkb7x.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BbdyNs04.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/Cppy65ze.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/0uklFrJB.js","_app/immutable/chunks/Cns5FaTa.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=136-Cw5sijfg.js.map
