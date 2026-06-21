import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { t as tableSourceMapper, l as listViewFields } from './crud-DzBk-fdF.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './_index-DiaVtc2Z.js';
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
import './i18n-CxHbQmwN.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 124;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bz9p9V8D.js')).default;
const server_id = "src/routes/(app)/(internal)/search/+page.server.ts";
const imports = ["_app/immutable/nodes/124.D44j2eEl.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/UJ54l1Kr.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DNQ91mby.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/Bu07lyG3.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/DjBCuBoH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/4PllBcGo.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DmmQ8CLd.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=124-BObl4B3f.js.map
