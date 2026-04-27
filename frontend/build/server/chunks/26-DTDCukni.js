import { g as getModelInfo } from './crud-7XzjN-Wp.js';
import { l as loadDetail } from './load-CtL6s2X7.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-DuIONS9Q.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-5y-ookeO.js';
import './string-BMZjP7XX.js';
import './superValidate-BmtJFExL.js';
import './index-BWA_9C9m.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';

const load = async (event) => {
  const modelInfo = getModelInfo("accreditations");
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  return data;
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Loc9ppxX.js')).default;
const server_id = "src/routes/(app)/(internal)/accreditations/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/26.COCUXKLq.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/C43-LlRX.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/BPxbLiAc.js","_app/immutable/chunks/zlp6oXm8.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/DPJRRldR.js","_app/immutable/chunks/Cg79WYI3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QaaLfru0.js","_app/immutable/chunks/XJAwOsbJ.js","_app/immutable/chunks/Bglazh2S.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/aZy3C1lL.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/lUffIcPU.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DqOcdrQH.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/Des4Ju3o.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BuX6WnKy.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BsIcXRUC.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/BkZ8p-97.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/CxOQ_ZR3.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/CsZeqhtT.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/M7kfo-Pj.js","_app/immutable/chunks/BZJncwRI.js","_app/immutable/chunks/BX9gk6VB.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/5vTlhyT_.js","_app/immutable/chunks/8B-0MpLl.js","_app/immutable/chunks/Bsbn1dIn.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/gsEdW9eC.js","_app/immutable/chunks/ETyirvYc.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-DTDCukni.js.map
