import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { w as webhookEndpointSchema } from './schemas-5y-ookeO.js';
import { L as successfullyupdatedobject2, aL as webhookendpoint1 } from './_index-CqZWReca.js';
import { r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, f as fail } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  const endpoint = `${BASE_API_URL}/webhooks/endpoints/${event.params.id}/`;
  const response = await event.fetch(endpoint);
  if (!response.ok) {
    console.error("Failed to fetch webhook endpoint:", await response.text());
    redirect(302, "/settings");
  }
  const webhookEndpoint = await response.json();
  const form = await superValidate(webhookEndpoint, zod(webhookEndpointSchema), { errors: false });
  return { webhookEndpoint, title: webhookEndpoint.name, form };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(webhookEndpointSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/webhooks/endpoints/${event.params.id}/`;
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify(form.data)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.text();
      console.error(response);
      if (response.error) {
        setFlash({ type: "error", message: safeTranslate(response.error) }, event);
        return fail(res.status, { form });
      }
    }
    setFlash(
      {
        type: "success",
        message: successfullyupdatedobject2({ object: webhookendpoint1() })
      },
      event
    );
    redirect(302, "/settings");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 120;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CPno14Ho.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/webhooks/endpoints/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/120.BFU-tYMt.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Dsu8Tylj.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/g_h12XRE.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/_5idpxm9.js","_app/immutable/chunks/BTtl3X3J.js","_app/immutable/chunks/WpeF5x3B.js","_app/immutable/chunks/eISZ6dvQ.js","_app/immutable/chunks/GX3nOdza.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Dw5vgcA8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/BYXxglA9.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DvPuu-n_.js","_app/immutable/chunks/DeptTlK1.js","_app/immutable/chunks/BkBp096Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/BIoiSDcM.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/Dq7EhTmb.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/C2397wU4.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/CIgI_RhK.js","_app/immutable/chunks/DiXVpoUi.js","_app/immutable/chunks/CpFnAMUI.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DA9lfzba.js","_app/immutable/chunks/BfbFVIuQ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=120-B0iMSwYy.js.map
