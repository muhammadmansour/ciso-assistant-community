import { e as error } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { g as getModelInfo } from './crud-a52dcxCi.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const PATCH = async ({ fetch, params, request }) => {
  const model = getModelInfo(params.model);
  const endpoint = `${BASE_API_URL}/${model.endpointUrl ?? params.model}/${params.id}/`;
  const body = await request.json();
  const payload = {};
  payload[params.field] = body[params.field];
  const res = await fetch(endpoint, { method: "PATCH", body: JSON.stringify(payload) });
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const GET = async ({ fetch, params, url }) => {
  const model = getModelInfo(params.model);
  const endpoint = `${BASE_API_URL}/${model.endpointUrl ?? params.model}/${params.id}/${params.field}/${url.search || ""}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET, PATCH };
//# sourceMappingURL=_server.ts-DyHmUjq2.js.map
