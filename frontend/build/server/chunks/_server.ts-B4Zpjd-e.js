import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { U as URL_MODEL_MAP } from './crud-a52dcxCi.js';
import { e as error } from './index-BWA_9C9m.js';
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
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
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
//# sourceMappingURL=_server.ts-B4Zpjd-e.js.map
