import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { w as webhookEndpointSchema } from './schemas-BwimqDbp.js';
import { O as successfullyupdatedobject2, aP as webhookendpoint1 } from './_index-DiaVtc2Z.js';
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

const index = 126;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CKXqCUmD.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/webhooks/endpoints/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/126.DPq8Zayx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/CUPkHRlk.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/XLE57W8F.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=126-RS1--rS2.js.map
