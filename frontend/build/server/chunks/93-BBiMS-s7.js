import { g as getModelInfo } from './crud-C1TvVbAO.js';
import { b as defaultWriteFormAction, n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-CfR18Idq.js';
import { l as loadDetail } from './load-DEuKjOXE.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { m as modelSchema } from './schemas-DwUKC0vK.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-D7NdhnXA.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CMphL55V.js';
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
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  const URLModel = "operating-modes";
  const model = getModelInfo(URLModel);
  const detail = await loadDetail({ event, model, id: event.params.id });
  const updateSchema = modelSchema(URLModel);
  const objectEndpoint = `${BASE_API_URL}/${model.endpointUrl}/${event.params.id}/object/`;
  const objectResponse = await event.fetch(objectEndpoint);
  const object = await objectResponse.json();
  const updateForm = await superValidate(object, zod(updateSchema), { errors: false });
  return { ...detail, updateForm, model, object };
};
const actions = {
  create: async (event) => {
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject: false });
  },
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  update: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "operating-modes", action: "edit" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 93;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CeJwQp8D.js')).default;
const server_id = "src/routes/(app)/(internal)/operating-modes/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/93.CeACXyk-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DIcC26A6.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Cutloik7.js","_app/immutable/chunks/DJUALYxg.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/DXxYvcKc.js","_app/immutable/chunks/DAr8lmNi.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/BNzrX3j7.js","_app/immutable/chunks/BOy2Mbul.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BljBstM0.js","_app/immutable/chunks/CXqJwRWy.js","_app/immutable/chunks/BioysWky.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/56bwJ4Jb.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CXUkSZSY.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/JKHi6_e9.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/Cl7GIeU3.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BwPKvNLF.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/D_fj9-71.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/cXncnRiG.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/ChBYInxz.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/BP_3gL5P.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/BfGsPLmp.js","_app/immutable/chunks/CaMAyKNP.js","_app/immutable/chunks/CEUy1qHb.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/MtHulqPh.js","_app/immutable/chunks/BdmqudGw.js","_app/immutable/chunks/BNnCwY0U.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/Bz2RmOUB.js","_app/immutable/chunks/D6-SytI5.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js","_app/immutable/chunks/Da905N2P.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=93-BBiMS-s7.js.map
