import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-BM2yv2YY.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/yearly-tasks-review/+page.server.ts";
const imports = ["_app/immutable/nodes/83.B3awKsYx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=83-BHWerYSe.js.map
