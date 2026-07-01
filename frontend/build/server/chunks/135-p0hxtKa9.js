import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { b7 as vulnerabilitytreemap1 } from './_index-BQcvYRD4.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch }) => {
  const getTreemapData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/vulnerabilities/treemap_data/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch vulnerability treemap data:", error);
      return [];
    }
  };
  return {
    title: vulnerabilitytreemap1(),
    stream: {
      treemapData: getTreemapData()
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 135;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D9GaKOlv.js')).default;
const server_id = "src/routes/(app)/(internal)/vulnerabilities/treemap/+page.server.ts";
const imports = ["_app/immutable/nodes/135.Cb8OhRCu.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/o6A1UlUU.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B46kGJGo.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=135-p0hxtKa9.js.map
