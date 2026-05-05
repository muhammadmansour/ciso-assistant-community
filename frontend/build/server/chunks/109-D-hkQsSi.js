import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { a as urlParamModelVerboseName } from './crud-Dl9mduNa.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { aH as synctoappliedcontrolssuccess4, aI as synctoappliedcontrolserror4, aJ as successfullyduplicateobject2 } from './_index-CqZWReca.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-P7VamcMY.js';
import { m as modelSchema } from './schemas-BOdIHh1e.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, d as booleanType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
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

const actions = {
  create: async (event) => {
    return nestedWriteFormAction({ event, action: "create" });
  },
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  duplicate: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return;
    const schema = modelSchema(formData.get("urlmodel"));
    const urlModel = "risk-assessments";
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/${urlModel}/${event.params.id}/duplicate/`;
    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    const modelVerboseName = urlParamModelVerboseName(urlModel);
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
  syncToActions: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    console.log(formData);
    const schema = objectType({ reset_residual: booleanType().optional() });
    const form = await superValidate(formData, zod(schema));
    const response = await event.fetch(
      `${BASE_API_URL}/risk-assessments/${event.params.id}/sync-to-actions/?dry_run=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form.data)
      }
    );
    if (response.ok) {
      setFlash(
        {
          type: "success",
          message: synctoappliedcontrolssuccess4()
        },
        event
      );
    } else {
      setFlash(
        {
          type: "error",
          message: synctoappliedcontrolserror4()
        },
        event
      );
    }
    const r = response.clone();
    console.log(await r.text());
    console.log(form.data);
    return { form, message: { riskScenarios: await response.json() } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 109;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-GvcG5jLu.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/109.BNTF689i.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/B7RV26bt.js","_app/immutable/chunks/DNDGWuBT.js","_app/immutable/chunks/7JscrOa6.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BQSXIl_l.js","_app/immutable/chunks/apUVwRt6.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/Dz3FlHo-.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/oPYHhhMd.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/CiqKwbts.js","_app/immutable/chunks/GDwHgVuT.js","_app/immutable/chunks/BYo56YeE.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/C9yN_3fR.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/BY6DOg2x.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DvfS3LTB.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Oq0zXgpZ.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/DctZKI0X.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/GVf0BCM3.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/Ba8i0N1B.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/D77tW5ki.js","_app/immutable/chunks/CWxdzvsr.js","_app/immutable/chunks/DgaPM2MU.js","_app/immutable/chunks/Dg3aPyBA.js","_app/immutable/chunks/4hKZUidU.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/D9DGotAo.js","_app/immutable/chunks/DFYAaWcd.js","_app/immutable/chunks/BaTmUfse.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CPE1CRyG.js","_app/immutable/chunks/HTWQRVQ8.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/BcmH83D3.js","_app/immutable/chunks/Scc84oWD.js","_app/immutable/chunks/BgF-VW7a.js","_app/immutable/chunks/Dwst7XXh.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/CYXuC2Fb.js","_app/immutable/chunks/11iUtlu7.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=109-D-hkQsSi.js.map
