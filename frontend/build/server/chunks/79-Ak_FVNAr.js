import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 79;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C6-vK3V0.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/yearly-tasks-review/+page.server.ts";
const imports = ["_app/immutable/nodes/79.DML6PlhU.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BTtl3X3J.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/WpeF5x3B.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=79-Ak_FVNAr.js.map
