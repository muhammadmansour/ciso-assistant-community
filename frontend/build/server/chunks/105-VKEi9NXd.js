import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { aj as recap } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-Bf4muzlQ.js')).default;
const server_id = "src/routes/(app)/(internal)/recap/+page.server.ts";
const imports = ["_app/immutable/nodes/105.CsLmfS_A.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DrxIzGi7.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=105-VKEi9NXd.js.map
