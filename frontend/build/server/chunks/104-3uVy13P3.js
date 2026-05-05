import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './runtime-BKo9q3Zd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { f as fail, s as superValidate, a as setError, m as message } from './superValidate-BmtJFExL.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './crud-Dl9mduNa.js';
import 'marked';
import { q as quickStartSchema } from './schemas-BOdIHh1e.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './index2-9icAqEyj.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './index3-BwfRm5YV.js';
import './stores2-D1NYwn5V.js';
import './i18n-DuIONS9Q.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';

const actions = {
  create: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const form = await superValidate(formData, zod(quickStartSchema));
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const endpoint = `${BASE_API_URL}/quick-start/`;
    const res = await event.fetch(endpoint, requestInitOptions);
    const response = await res.json();
    if (!res.ok) {
      console.error(response);
      if (response.errors) {
        response.errors.forEach((error) => {
          setError(form, error.param, error.code);
        });
      }
      for (const [field, errorMsg] of Object.entries(response)) {
        if (field !== "errors" && typeof errorMsg === "string") {
          setError(form, field, errorMsg);
        }
      }
      return fail(res.status, { form });
    }
    return message(form, {
      redirect: `/compliance-assessments/${response.complianceassessment.id}`
    });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 104;
const server_id = "src/routes/(app)/(internal)/quick-start/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=104-3uVy13P3.js.map
