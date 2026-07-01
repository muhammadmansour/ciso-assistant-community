import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { U as URL_MODEL_MAP } from './crud-DA2NQw0x.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './_index-BQcvYRD4.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BpCge2eg.js';
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
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

const GET = async ({ params, fetch }) => {
  const URLModel = params.model;
  const endpointUrl = URL_MODEL_MAP[URLModel]?.endpointUrl || URLModel;
  const endpoint = `${BASE_API_URL}/${endpointUrl}/export_csv/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the CSV file");
  }
  const fileName = `${URLModel}-${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-CbmIZ4OP.js.map
