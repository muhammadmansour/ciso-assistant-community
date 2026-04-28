import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { aE as recap } from './_index-CqZWReca.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ locals, fetch }) => {
  const perimeters = await fetch(`${BASE_API_URL}/perimeters/`).then((res) => res.json()).then(async (perimeters2) => {
    if (perimeters2 && Array.isArray(perimeters2.results)) {
      const perimeterPromises = perimeters2.results.map(async (perimeter) => {
        try {
          const complianceAssessmentsResponse = await fetch(
            `${BASE_API_URL}/compliance-assessments/?perimeter=${perimeter.id}`
          );
          const complianceAssessmentsData = await complianceAssessmentsResponse.json();
          if (complianceAssessmentsData && Array.isArray(complianceAssessmentsData.results)) {
            const updatedAssessmentsPromises = complianceAssessmentsData.results.map(
              async (complianceAssessment) => {
                try {
                  const [donutDataResponse, globalScoreResponse] = await Promise.all([
                    fetch(
                      `${BASE_API_URL}/compliance-assessments/${complianceAssessment.id}/donut_data/`
                    ),
                    fetch(
                      `${BASE_API_URL}/compliance-assessments/${complianceAssessment.id}/global_score/`
                    )
                  ]);
                  const [donutData, globalScoreData] = await Promise.all([
                    donutDataResponse.json(),
                    globalScoreResponse.json()
                  ]);
                  complianceAssessment.donut = donutData;
                  complianceAssessment.globalScore = globalScoreData;
                  return complianceAssessment;
                } catch (error) {
                  console.error("Error fetching data for compliance assessment:", error);
                  throw error;
                }
              }
            );
            const updatedAssessments = await Promise.all(updatedAssessmentsPromises);
            perimeter.compliance_assessments = updatedAssessments;
            return perimeter;
          } else {
            throw new Error("Compliance assessments results not found or not an array");
          }
        } catch (error) {
          console.error("Error fetching compliance assessments:", error);
          throw error;
        }
      });
      return Promise.all(perimeterPromises);
    } else {
      throw new Error("Perimeters results not found or not an array");
    }
  }).catch((error) => {
    console.error("Failed to load perimeters:", error);
    return [];
  });
  if (perimeters) {
    perimeters.forEach((perimeter) => {
      const aggregatedDonutData = {
        values: [],
        total: 0
      };
      perimeter.compliance_assessments.forEach((compliance_assessment) => {
        compliance_assessment.donut.result.values.forEach(
          (donutItem) => {
            const aggregatedItem = aggregatedDonutData.values.find((item) => item.name === donutItem.name);
            if (aggregatedItem) {
              aggregatedItem.value += donutItem.value;
            } else {
              aggregatedDonutData.values.push({ ...donutItem });
            }
          }
        );
      });
      const totalValue = aggregatedDonutData.values.reduce((sum, item) => sum + item.value, 0);
      aggregatedDonutData.values = aggregatedDonutData.values.map((item) => ({
        ...item,
        percentage: totalValue > 0 ? (item.value / totalValue * 100).toFixed(1) : "0"
      }));
      perimeter.overallCompliance = aggregatedDonutData;
    });
  }
  return {
    perimeters,
    user: locals.user,
    title: recap()
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 105;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-bmjMJw3G.js')).default;
const server_id = "src/routes/(app)/(internal)/recap/+page.server.ts";
const imports = ["_app/immutable/nodes/105.Cs59wWPc.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/Bm3pjP9o.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DYFB3whk.js","_app/immutable/chunks/CumOB_G-.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/D4Xh5k1E.js","_app/immutable/chunks/BmMs8hfm.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/C5s17Fo-.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/DgxtAu4M.js","_app/immutable/chunks/BBE2L2kR.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Bn1B7sWx.js","_app/immutable/chunks/JkyNnoux.js","_app/immutable/chunks/Bisu60EG.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/BcWYpVoJ.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Uz9Gfgi2.js","_app/immutable/chunks/DvHR2hVB.js","_app/immutable/chunks/BHendfPR.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/FLsuLDXF.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CKMhcJUh.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=105-Cek1ytJq.js.map
