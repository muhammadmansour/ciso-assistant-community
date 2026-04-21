import { h as handleErrorResponse } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
import { bd as attachmentdeleted1 } from './_index-Syqrsmaf.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-B-ZrD2ao.js';
import './schemas-DxPQoveO.js';
import './helpers-Bm9n0CNG.js';
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
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  return await loadDetail({
    event,
    model: getModelInfo("evidence-revisions"),
    id: event.params.id
  });
};
const actions = {
  deleteAttachment: async (event) => {
    const formData = await event.request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const form = await superValidate(formData, zod(schema));
    const urlmodel = form.data.urlmodel;
    const id = form.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/delete_attachment/`;
    if (!form.valid) {
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    setFlash({ type: "success", message: attachmentdeleted1() }, event);
    return redirect(302, `/${urlmodel}/${id}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 140;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BvLcgKyH.js')).default;
const server_id = "src/routes/(app)/(third-party)/evidence-revisions/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/140.BmGcYGPT.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DEUXZ8QM.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CFQSVRMU.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/Dw1DiVSs.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/Do4lXeSZ.js","_app/immutable/chunks/BlDq-91O.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BCazNoug.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/epMrVhTE.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/Dkd-KlR9.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/C4WPkiBL.js","_app/immutable/chunks/bSb9YpUT.js","_app/immutable/chunks/CHJQfzF4.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B7jerSYn.js","_app/immutable/chunks/DIh_kFsb.js","_app/immutable/chunks/n8hIQ2VI.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/ClqT8Cz6.js","_app/immutable/chunks/g8KyPnx_.js","_app/immutable/chunks/CoGroNn-.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/d0QSDTqO.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CQp2Vfl9.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/BJQ-bTjk.js","_app/immutable/chunks/LACOVsCk.js","_app/immutable/chunks/Cud_L1fS.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DcDfgfhU.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/CL1YE52f.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/BGgFRArE.js","_app/immutable/chunks/DUgNlWuZ.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=140-DvPfsFuo.js.map
