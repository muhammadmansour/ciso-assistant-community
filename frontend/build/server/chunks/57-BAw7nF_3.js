import { l as loadDetail } from './load-y7adB23o.js';
import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { b as defaultWriteFormAction, d as defaultDeleteFormAction } from './actions-DRSM8X9N.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
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
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './i18n-DuIONS9Q.js';
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

const index = 57;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D3Da-8WO.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-1/ebios-rm-study/+page.server.ts";
const imports = ["_app/immutable/nodes/57.DeKBxDYY.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/DYFB3whk.js","_app/immutable/chunks/CumOB_G-.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/CwIIuQae.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/FLsuLDXF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BBE2L2kR.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Bn1B7sWx.js","_app/immutable/chunks/JkyNnoux.js","_app/immutable/chunks/Bisu60EG.js","_app/immutable/chunks/D9RZlKqy.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/6Cxm2iQL.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DvHR2hVB.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BHendfPR.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/Uz9Gfgi2.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/CUK1Az36.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BpARUPJY.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/umhFkAQm.js","_app/immutable/chunks/CIPTfslo.js","_app/immutable/chunks/D4Xh5k1E.js","_app/immutable/chunks/BmMs8hfm.js","_app/immutable/chunks/CKMhcJUh.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DaKiHdC1.js","_app/immutable/chunks/n66UJIcb.js","_app/immutable/chunks/ixsRAkqs.js","_app/immutable/chunks/C5s17Fo-.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/DgxtAu4M.js","_app/immutable/chunks/BcWYpVoJ.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=57-BAw7nF_3.js.map
