import { l as listViewFields } from './crud-BiYAuEEm.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-BNamVw9A.js';
import './runtime-B_ICGJZJ.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
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

const match = ((param) => {
  const filterKeys = /* @__PURE__ */ new Set();
  Object.values(listViewFields).forEach((field) => {
    if ("filters" in field && field.filters) {
      Object.keys(field.filters).forEach((filterKey) => filterKeys.add(filterKey));
    }
  });
  return filterKeys.has(param.toLowerCase().replace(/-/g, "_"));
});

export { match };
//# sourceMappingURL=filters-D40qdu5O.js.map
