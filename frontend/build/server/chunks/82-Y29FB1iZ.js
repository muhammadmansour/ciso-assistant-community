import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 82;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cqdgu9yi.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/yearly-tasks-review/+page.server.ts";
const imports = ["_app/immutable/nodes/82.C4fndo13.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BXmcmAv2.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/b8SWVt-e.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=82-Y29FB1iZ.js.map
