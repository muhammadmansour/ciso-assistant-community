import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { t as tableSourceMapper, l as listViewFields } from './crud-CUvW5I-u.js';
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
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CMphL55V.js';
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

const index = 118;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BOcvAMKm.js')).default;
const server_id = "src/routes/(app)/(internal)/search/+page.server.ts";
const imports = ["_app/immutable/nodes/118.DfMhxyYb.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CRyXR1_7.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/CAJjCORN.js","_app/immutable/chunks/ng3-XvhC.js","_app/immutable/chunks/BqCfcmu_.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D7UX7pJP.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/I3BpkvBT.js","_app/immutable/chunks/C0MxnyOL.js","_app/immutable/chunks/D-5hzFoF.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Y0uuF1Y2.js","_app/immutable/chunks/DxVupoGb.js","_app/immutable/chunks/D7dzO6Di.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BbEHMOl_.js","_app/immutable/chunks/DsAzGKm3.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/C6vFO4ME.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/Qr19s6a2.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CFlp8yFl.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=118-BSYx1NEI.js.map
