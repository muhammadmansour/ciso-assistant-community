import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { r as redirect } from './index-BWA_9C9m.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { g as getModelInfo } from './crud-DA2NQw0x.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
import { r as riskacceptancestatedoesntallowedit5 } from './_index-BQcvYRD4.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-Y-FXalQc.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

const load = async (event) => {
  const URLModel = event.params.model;
  const schema = modelSchema(event.params.model);
  const objectEndpoint = `${BASE_API_URL}/${event.params.model}/${event.params.id}/object/`;
  const object = await event.fetch(objectEndpoint).then((res) => res.json());
  if (URLModel === "compliance-assessments" && (!Array.isArray(object.reviewers) || object.reviewers.length === 0) && event.locals.user?.actor_id) {
    object.reviewers = [event.locals.user.actor_id];
  }
  const form = await superValidate(object, zod(schema), { errors: false });
  const model = getModelInfo(event.params.model);
  const selectFields = model.selectFields;
  if (model.urlModel === "risk-acceptances") {
    const riskAcceptance = await event.fetch(`${BASE_API_URL}/${event.params.model}/${event.params.id}/`).then((res) => res.json());
    if (["Accepted", "Rejected", "Revoked"].includes(riskAcceptance.state)) {
      console.log("The state of risk acceptance doesn't allow it to be edited");
      setFlash(
        {
          type: "error",
          message: riskacceptancestatedoesntallowedit5()
        },
        event
      );
      throw redirect(
        302,
        getSecureRedirect(event.url.searchParams.get("next")) || `/${model.urlModel}/${riskAcceptance.id}`
      );
    }
  }
  const selectOptions = {};
  if (selectFields) {
    for (const selectField of selectFields) {
      const url = `${BASE_API_URL}/${event.params.model}/${selectField.detail ? event.params.id + "/" : ""}${selectField.field}/`;
      const response = await event.fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  model.selectOptions = selectOptions;
  return { form, model, object, selectOptions, URLModel };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(third-party)/[model=thirdparty_urlmodels]/[id=uuid]/edit/+layout.server.ts";
const imports = ["_app/immutable/nodes/25.DsAuMeVr.js","_app/immutable/chunks/Cggp-D0v.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DrNqa-QT.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-DE90nzcq.js.map
