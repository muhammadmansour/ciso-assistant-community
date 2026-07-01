import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { a as urlParamModelVerboseName } from './crud-DA2NQw0x.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { aL as synctoappliedcontrolssuccess4, aM as synctoappliedcontrolserror4, aN as successfullyduplicateobject2 } from './_index-BQcvYRD4.js';
import { h as handleErrorResponse, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-DcWiM4jj.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
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

const index = 115;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D4vIqSMg.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/115.CDttKmYd.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/Dd0AG25a.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/Kwq5OM76.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/-P7ZJSWS.js","_app/immutable/chunks/BRBsIFsK.js","_app/immutable/chunks/K3lHh_Jd.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/BbbovJSy.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/j8r7vPVS.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C676ICGK.js","_app/immutable/chunks/Cu890w6c.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/S614vnmE.js","_app/immutable/chunks/Dh8-nY5L.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/D7rIMxhD.js","_app/immutable/chunks/DxcoP9sf.js","_app/immutable/chunks/DXgqwX3s.js","_app/immutable/chunks/DJRuxKFP.js","_app/immutable/chunks/Ch1PJ8CC.js","_app/immutable/chunks/Bb8MV1Ez.js","_app/immutable/chunks/CXGSs9RM.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=115-B8nlW8mS.js.map
