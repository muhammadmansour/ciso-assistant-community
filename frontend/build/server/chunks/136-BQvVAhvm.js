import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { b8 as xrays1 } from './_index-BQcvYRD4.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const getQualityCheckData = async (fetch) => {
  try {
    const endpoint = `${BASE_API_URL}/perimeters/quality_check/`;
    const res = await fetch(endpoint);
    const json = await res.json();
    return json.results;
  } catch (error) {
    console.error("Failed to fetch quality check data:", error);
    return null;
  }
};
const load = (async ({ fetch }) => {
  return {
    title: xrays1(),
    stream: {
      data: getQualityCheckData(fetch)
    }
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 136;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CDHIl40C.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/+page.server.ts";
const imports = ["_app/immutable/nodes/136.C4fG6X1l.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CGWWUgM5.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/69_IOA4Y.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=136-BQvVAhvm.js.map
