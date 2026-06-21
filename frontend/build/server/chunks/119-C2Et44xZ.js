import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-DzBk-fdF.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { f as fail, s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, d as booleanType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { s as setFlash } from './server-C682bpHT.js';
import { aL as synctoappliedcontrolssuccess4, aM as synctoappliedcontrolserror4 } from './_index-DiaVtc2Z.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "risk-scenarios";
  const baseEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const objectEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/object/`;
  const object = await fetch(objectEndpoint).then((res) => res.json());
  const scenario = await fetch(baseEndpoint).then((res) => res.json());
  const tables = {};
  await Promise.all(
    ["assets", "threats", "vulnerabilities", "security-exceptions"].map(async (key) => {
      const keyEndpoint = `${BASE_API_URL}/${key}/?risk_scenarios=${params.id}`;
      const response = await fetch(keyEndpoint);
      if (response.ok) {
        const table = {
          head: headData(key),
          body: [],
          meta: []
        };
        tables[key] = table;
      } else {
        console.error(`Failed to fetch data for ${key}: ${response.statusText}`);
      }
    })
  );
  await Promise.all(
    ["risk_scenarios", "risk_scenarios_e"].map(async (key) => {
      const table = {
        head: ["name", "owner", "status", "eta"],
        body: [],
        meta: []
      };
      tables[key] = table;
    })
  );
  const riskMatrix = await fetch(`${BASE_API_URL}/risk-matrices/${object.risk_matrix}/`).then((res) => res.json()).then((res) => JSON.parse(res.json_definition));
  return { scenario, tables, riskMatrix, title: scenario.name };
});
const actions = {
  syncToActions: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = objectType({ reset_residual: booleanType().optional() });
    const form = await superValidate(formData, zod(schema));
    const response = await event.fetch(
      `${BASE_API_URL}/risk-scenarios/${event.params.id}/sync-to-actions/?dry_run=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form.data)
      }
    );
    if (response.ok) {
      setFlash(
        {
          type: "success",
          message: synctoappliedcontrolssuccess4()
        },
        event
      );
    } else {
      setFlash(
        {
          type: "error",
          message: synctoappliedcontrolserror4()
        },
        event
      );
    }
    return { form, message: { appliedControls: await response.json() } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 119;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D7qc9BL0.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-scenarios/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/119.fMsw6Tx-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CjMwYMKi.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/VCgK4Su8.js","_app/immutable/chunks/DU7syaJG.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D8ErAM9e.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=119-C2Et44xZ.js.map
