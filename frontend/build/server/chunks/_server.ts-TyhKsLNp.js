import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { U as URL_MODEL_MAP } from './crud-BiYAuEEm.js';
import { e as error, j as json } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-BNamVw9A.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CnZlshhm.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const GET = async ({ params, fetch }) => {
  const { model, id } = params;
  const modelConfig = URL_MODEL_MAP[model];
  const apiPath = modelConfig?.endpointUrl ?? model;
  const endpoint = `${BASE_API_URL}/${apiPath}/${id}/cascade-info/`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw error(response.status, await response.text());
  }
  return json(await response.json());
};

export { GET };
//# sourceMappingURL=_server.ts-TyhKsLNp.js.map
