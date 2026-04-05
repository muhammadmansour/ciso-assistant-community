import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { g as getModelInfo } from './crud-BJ_TECqM.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { U as UserEditSchema } from './schemas-QFT6TgyO.js';
import { aW as successfullyupdateduser2, e as edit } from './_index-DZs3gE-i.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
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
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch }) => {
  const URLModel = "users";
  const model = getModelInfo(URLModel);
  const objectEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/object/`;
  const object = await fetch(objectEndpoint).then((res) => res.json());
  const schema = UserEditSchema;
  const form = await superValidate(object, zod(schema));
  return { form, model, object, title: edit() };
};
const actions = {
  default: async (event) => {
    const schema = UserEditSchema;
    const endpoint = `${BASE_API_URL}/users/${event.params.id}/`;
    const form = await superValidate(event.request, zod(schema));
    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "PUT",
      body: JSON.stringify(form.data)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      if (response.error) {
        setFlash({ type: "error", message: safeTranslate(response.error) }, event);
        return fail(403, { form });
      }
      if (response.non_field_errors) {
        setError(form, "non_field_errors", response.non_field_errors);
      }
      Object.entries(response).forEach(([key, value]) => {
        setError(form, key, safeTranslate(value));
      });
      return fail(400, { form });
    }
    setFlash(
      { type: "success", message: successfullyupdateduser2({ email: form.data.email }) },
      event
    );
    redirect(
      302,
      getSecureRedirect(event.url.searchParams.get("next")) ?? `/users/${event.params.id}`
    );
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 126;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DuaKQtXT.js')).default;
const server_id = "src/routes/(app)/(internal)/users/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/126.berZTOGu.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/Ce-fgsa6.js","_app/immutable/chunks/1kTZNG77.js","_app/immutable/chunks/4Lm9pDcu.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/n18PuKtG.js","_app/immutable/chunks/CQdwKKGx.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CjzEUlAP.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BzE5Q-bq.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C2mU7KV0.js","_app/immutable/chunks/v0c-4HEf.js","_app/immutable/chunks/D5QIDPln.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/B8TM_TW7.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/BJGCaUkd.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/B-zKsLIX.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DX1P9kZX.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/BlRS6pjX.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/D1h2tXxW.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/Bi5LnzB5.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/DkKKDhwg.js","_app/immutable/chunks/CmPrUjVi.js","_app/immutable/chunks/DyRPdjoK.js","_app/immutable/chunks/KjelKKpX.js","_app/immutable/chunks/DUvkjWI4.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DgxEu-cK.js","_app/immutable/chunks/hqNPRCvp.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=126-BKXsBku-.js.map
