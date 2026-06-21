import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch, url }) => {
  const now = /* @__PURE__ */ new Date();
  const currentYear = now.getFullYear();
  const startMonth = url.searchParams.get("start_month") || "1";
  const startYear = url.searchParams.get("start_year") || currentYear.toString();
  const endMonth = url.searchParams.get("end_month") || "12";
  const endYear = url.searchParams.get("end_year") || currentYear.toString();
  const folder = url.searchParams.get("folder") || "";
  const params = new URLSearchParams();
  params.append("start_month", startMonth);
  params.append("start_year", startYear);
  params.append("end_month", endMonth);
  params.append("end_year", endYear);
  if (folder) params.append("folder", folder);
  const endpoint = `${BASE_API_URL}/task-templates/yearly_review/?${params.toString()}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const foldersRes = await fetch(`${BASE_API_URL}/folders/`);
  const foldersData = await foldersRes.json();
  const allFolders = foldersData.results || foldersData;
  return {
    folders: data.folders || [],
    allFolders,
    startMonth: parseInt(startMonth),
    startYear: parseInt(startYear),
    endMonth: parseInt(endMonth),
    endYear: parseInt(endYear),
    selectedFolder: folder
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 83;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BVtYImHL.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/yearly-tasks-review/+page.server.ts";
const imports = ["_app/immutable/nodes/83.B-yEO8kU.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=83-DzJNv1ri.js.map
