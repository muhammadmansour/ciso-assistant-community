import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { w as webhookEndpointSchema } from './schemas-DxPQoveO.js';
import { K as successfullyupdatedobject2, aL as webhookendpoint1 } from './_index-Syqrsmaf.js';
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

const index = 123;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BFkvfe3c.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/webhooks/endpoints/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/123.CZyZyFGf.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/Bcvmpxf5.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DjdVUKFv.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CeiJu8BG.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/DEcTr0p1.js","_app/immutable/chunks/BePFwegX.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BDbHoVt3.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/znRd_mFD.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Bm296bj5.js","_app/immutable/chunks/CTghNTP7.js","_app/immutable/chunks/BcwJ3xBb.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BINn-yMN.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/BennqQSB.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/DLw7-9tS.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/fcK6T74i.js","_app/immutable/chunks/DNW_qCUs.js","_app/immutable/chunks/C4dnATnP.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/e80p6tav.js","_app/immutable/chunks/kG-gvrVD.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=123-BVg74NcK.js.map
