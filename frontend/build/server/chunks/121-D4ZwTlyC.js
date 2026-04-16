import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { t as tableSourceMapper, l as listViewFields } from './crud-CFDLlT9z.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
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
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const load = (async ({ url, fetch }) => {
  const query = url.searchParams.get("q") || "";
  const buildHead = (model) => {
    const fields = listViewFields[model];
    return fields.body.reduce(
      (obj, key, index) => {
        obj[key] = fields.head[index];
        return obj;
      },
      {}
    );
  };
  const emptyTable = (model) => ({
    head: buildHead(model),
    body: [],
    meta: { count: 0, results: [] }
  });
  if (!query) {
    return {
      searchQuery: query,
      searchError: null,
      assessmentsTable: emptyTable("compliance-assessments"),
      controlsTable: emptyTable("applied-controls"),
      evidenceTable: emptyTable("evidences"),
      title: "Search"
    };
  }
  const searchParam = `search=${encodeURIComponent(query)}`;
  const safeFetch = async (endpoint, label) => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        console.error(`[Search] ${label} API returned ${res.status}: ${res.statusText}`);
        return { ok: false, error: `${label}: server returned ${res.status}`, data: null };
      }
      const data = await res.json();
      return { ok: true, error: null, data };
    } catch (err) {
      console.error(`[Search] ${label} fetch failed:`, err);
      return {
        ok: false,
        error: `${label}: ${err instanceof Error ? err.message : "request failed"}`,
        data: null
      };
    }
  };
  const [assessmentsResult, controlsResult, evidenceResult] = await Promise.all([
    safeFetch(`${BASE_API_URL}/compliance-assessments/?${searchParam}`, "Assessments"),
    safeFetch(`${BASE_API_URL}/applied-controls/?${searchParam}`, "Controls"),
    safeFetch(`${BASE_API_URL}/evidences/?${searchParam}`, "Evidence")
  ]);
  const errors = [assessmentsResult, controlsResult, evidenceResult].filter((r) => !r.ok).map((r) => r.error);
  const searchError = errors.length > 0 ? errors.join("; ") : null;
  const assessmentsData = assessmentsResult.data;
  const controlsData = controlsResult.data;
  const evidenceData = evidenceResult.data;
  const assessmentsBody = assessmentsData ? tableSourceMapper(assessmentsData.results || [], listViewFields["compliance-assessments"].body) : [];
  const controlsBody = controlsData ? tableSourceMapper(controlsData.results || [], listViewFields["applied-controls"].body) : [];
  const evidenceBody = evidenceData ? tableSourceMapper(evidenceData.results || [], listViewFields["evidences"].body) : [];
  return {
    searchQuery: query,
    searchError,
    assessmentsTable: {
      head: buildHead("compliance-assessments"),
      body: assessmentsBody,
      meta: assessmentsData ?? { count: 0, results: [] }
    },
    controlsTable: {
      head: buildHead("applied-controls"),
      body: controlsBody,
      meta: controlsData ?? { count: 0, results: [] }
    },
    evidenceTable: {
      head: buildHead("evidences"),
      body: evidenceBody,
      meta: evidenceData ?? { count: 0, results: [] }
    },
    title: query ? `Search: ${query}` : "Search"
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 121;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BGrYE5Wb.js')).default;
const server_id = "src/routes/(app)/(internal)/search/+page.server.ts";
const imports = ["_app/immutable/nodes/121.BX5Gg3I-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/BhypJILY.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/6DdwpPu7.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/G1TSsRS0.js","_app/immutable/chunks/jLGvEFfk.js","_app/immutable/chunks/Nisa6kzK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/C1Av9eK7.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/RUegAlyn.js","_app/immutable/chunks/B2uwPNtE.js","_app/immutable/chunks/BHWq1_kx.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/CMTxFHqT.js","_app/immutable/chunks/hNQJxmIa.js","_app/immutable/chunks/CWqDUYCZ.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BH2Jr0az.js","_app/immutable/chunks/jBfvTNCt.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BgAO3hZG.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/B8mbPAmK.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C9yvPz1L.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=121-D4ZwTlyC.js.map
