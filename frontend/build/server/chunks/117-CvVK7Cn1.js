import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-6VeOnXtx.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/convert-to-quantitative/+page.server.ts";
const imports = ["_app/immutable/nodes/117.BL_12Msw.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/DUErPd7H.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Bzd_jF-N.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=117-CvVK7Cn1.js.map
