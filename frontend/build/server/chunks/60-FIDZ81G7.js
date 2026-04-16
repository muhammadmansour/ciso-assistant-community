import { l as loadDetail } from './load-2WiqDzE7.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { b as defaultWriteFormAction, d as defaultDeleteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index2-9icAqEyj.js';
import './access-control-DaLcieub.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './i18n-B-ZrD2ao.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  const updateSchema = modelSchema("ebios-rm");
  const updatedModel = getModelInfo("ebios-rm");
  const objectEndpoint = `${BASE_API_URL}/${updatedModel.endpointUrl}/${event.params.id}/object/`;
  const objectResponse = await event.fetch(objectEndpoint);
  const object = await objectResponse.json();
  const updateForm = await superValidate(object, zod(updateSchema), { errors: false });
  const detail = await loadDetail({ event, model: getModelInfo("ebios-rm"), id: event.params.id });
  return { ...detail, updateForm, updatedModel, object };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "assets",
      action: "create"
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "assets" });
  },
  update: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "ebios-rm", action: "edit" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 60;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DnV-LmPv.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-1/ebios-rm-study/+page.server.ts";
const imports = ["_app/immutable/nodes/60.BswWn6HF.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/B2d7Kn0g.js","_app/immutable/chunks/BJgYCOde.js","_app/immutable/chunks/CL1MtWUI.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BBF8pxsr.js","_app/immutable/chunks/CenfJXbu.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/FUON2Tb3.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/coRzUdqH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/DqI8LxJS.js","_app/immutable/chunks/CVry4SXA.js","_app/immutable/chunks/CmwBA6gY.js","_app/immutable/chunks/ZM_KH0ts.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/Dl4VVEB9.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/BvfshpDU.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DkP_2XjV.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/Yrr7u_J7.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/G_-wXQMR.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BbSGlnrT.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/62MrVLfz.js","_app/immutable/chunks/CuECpGv5.js","_app/immutable/chunks/VesEJn6I.js","_app/immutable/chunks/C43KYMUz.js","_app/immutable/chunks/DhtFfOXf.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BQtjeuej.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/DpleUTKn.js","_app/immutable/chunks/BFuJ7Bp7.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/D0pVo7Nv.js","_app/immutable/chunks/DJYJ2Uwe.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=60-FIDZ81G7.js.map
