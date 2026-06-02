import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 111;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CzMKKBFs.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/convert-to-quantitative/+page.server.ts";
const imports = ["_app/immutable/nodes/111.B2OSLS8O.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/D60C9O1B.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DHl383Ih.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CRiXYdiU.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=111-Bb5J0h3Y.js.map
