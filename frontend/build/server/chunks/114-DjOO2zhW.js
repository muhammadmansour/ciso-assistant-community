import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 114;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BW7wjkHL.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/convert-to-quantitative/+page.server.ts";
const imports = ["_app/immutable/nodes/114.BatW4zvr.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/C4dnATnP.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/DGKGIsrC.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BePFwegX.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=114-DjOO2zhW.js.map
