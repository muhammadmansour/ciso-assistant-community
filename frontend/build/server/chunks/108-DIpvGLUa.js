import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async (event) => {
  const { id } = event.params;
  const getExecutiveSummary = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/executive-summary/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch executive summary: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch executive summary data:", error);
      return null;
    }
  };
  const getCombinedLec = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/combined-lec/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch combined LEC: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch combined LEC data:", error);
      return null;
    }
  };
  const getAleComparison = async () => {
    try {
      const url = `${BASE_API_URL}/crq/quantitative-risk-studies/${id}/ale-comparison/`;
      const response = await event.fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ALE comparison: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch ALE comparison data:", error);
      return null;
    }
  };
  return {
    title: "Executive summary",
    stream: {
      executiveSummary: getExecutiveSummary(),
      combinedLec: getCombinedLec(),
      aleComparison: getAleComparison()
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 108;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BB6hbu4M.js')).default;
const server_id = "src/routes/(app)/(internal)/quantitative-risk-studies/[id=uuid]/executive-summary/+page.server.ts";
const imports = ["_app/immutable/nodes/108.Bn_rwzlD.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/BSr4rzyq.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuuGk-mn.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=108-DIpvGLUa.js.map
