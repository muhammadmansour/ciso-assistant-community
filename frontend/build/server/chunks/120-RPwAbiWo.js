import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { w as webhookEndpointSchema } from './schemas-DwUKC0vK.js';
import { L as successfullyupdatedobject2, aL as webhookendpoint1 } from './_index-D7NdhnXA.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-eZ65je-b.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/webhooks/endpoints/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/120.Dv5az__I.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/R8gvUloL.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/BDxSJf1Y.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BjA36f5m.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/ZaMO6TYE.js","_app/immutable/chunks/akXf4f6w.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/kPOY5a4k.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/D-2uz2sc.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B3fg5SyU.js","_app/immutable/chunks/CA7kDHvJ.js","_app/immutable/chunks/DM-zsmsQ.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/C6I1HWd6.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/DYe3QhYO.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BwRFFv-D.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/CupZpfII.js","_app/immutable/chunks/BF9nWzJO.js","_app/immutable/chunks/mj0iRK6K.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/C-y7m8Xz.js","_app/immutable/chunks/rem04sBf.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=120-RPwAbiWo.js.map
