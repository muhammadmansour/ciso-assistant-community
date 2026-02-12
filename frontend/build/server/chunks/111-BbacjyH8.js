import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { f as fail } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-y5NrtXLL.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/convert-to-quantitative/+page.server.ts";
const imports = ["_app/immutable/nodes/111.C0-EyL-3.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/BMJr_BuD.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CnM3RobZ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=111-BbacjyH8.js.map
