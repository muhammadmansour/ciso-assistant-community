import { e as error } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-C1TvVbAO.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-D7NdhnXA.js';
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
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CMphL55V.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const GET = async ({ fetch, params }) => {
  const model = getModelInfo(params.model);
  const endpoint = `${BASE_API_URL}/${model.endpointUrl ?? params.model}/${params.filter}/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const optionsResponse = await res.json();
  const options = typeof Object.values(optionsResponse)[0] === "string" ? Object.keys(optionsResponse).map((key) => ({
    label: optionsResponse[key],
    value: key
  })) : optionsResponse;
  return new Response(JSON.stringify(options), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-C1CMyh6f.js.map
