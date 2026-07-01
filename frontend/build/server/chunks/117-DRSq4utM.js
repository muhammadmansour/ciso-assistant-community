import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { f as fail } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ params, fetch }) => {
  return {};
};
const actions = {
  default: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const data = JSON.parse(formData.get("data"));
    try {
      const response = await fetch(
        `${BASE_API_URL}/risk-assessments/${params.id}/convert_to_quantitative/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return fail(response.status, {
          error: error.detail || "Conversion failed",
          data
        });
      }
      const result = await response.json();
      return {
        success: true,
        quantitative_risk_study_id: result.quantitative_risk_study_id,
        scenarios_converted: result.scenarios_converted,
        scenarios_skipped: result.scenarios_skipped,
        message: result.message
      };
    } catch (error) {
      console.error("Conversion error:", error);
      return fail(500, {
        error: "An unexpected error occurred during conversion",
        data
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 117;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BxabukDP.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/convert-to-quantitative/+page.server.ts";
const imports = ["_app/immutable/nodes/117.DWHqQLZq.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CGQZIbVf.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=117-DRSq4utM.js.map
