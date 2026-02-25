import { h as handleErrorResponse } from './actions-BK5Saojd.js';
import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { g as getModelInfo } from './crud-BiYAuEEm.js';
import { l as loadDetail } from './load-x0TO8eGF.js';
import { bd as attachmentdeleted1 } from './_index-BNamVw9A.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-CnZlshhm.js';
import './schemas-Cmsh2Wi5.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
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

const index = 137;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D5Orj8wT.js')).default;
const server_id = "src/routes/(app)/(third-party)/evidence-revisions/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/137.CU_7e6Ld.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/D8dsk05A.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DoixOjwk.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QHYRbtIP.js","_app/immutable/chunks/DpLD00Kj.js","_app/immutable/chunks/BlS_83n9.js","_app/immutable/chunks/8YoL4k_b.js","_app/immutable/chunks/DYSo-yqh.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/BcWVh4YE.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CrWtGZiU.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DXJhH5pC.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/Ds8o4w_v.js","_app/immutable/chunks/B1AfR19T.js","_app/immutable/chunks/YAPe4s4R.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BUZMx5XX.js","_app/immutable/chunks/IOhIIUSe.js","_app/immutable/chunks/DiZmzRIK.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/BNXh80kN.js","_app/immutable/chunks/Cr-E4oOt.js","_app/immutable/chunks/GOt3p-cs.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/CC0BJQFD.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/B2yR55bE.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/tSYDcqMs.js","_app/immutable/chunks/BlssHQ_q.js","_app/immutable/chunks/C7wQRpjV.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B6c3wZRu.js","_app/immutable/chunks/BrIubyaZ.js","_app/immutable/chunks/KRStrMEQ.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/BNMxauoG.js","_app/immutable/chunks/Cc_RxET-.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=137-DbBlUD2z.js.map
