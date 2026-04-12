import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aE as recap } from './_index-Syqrsmaf.js';
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

const index = 108;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C03GZ8rZ.js')).default;
const server_id = "src/routes/(app)/(internal)/recap/+page.server.ts";
const imports = ["_app/immutable/nodes/108.gnHHtpy1.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DP2-kJHy.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/Dk11K9yj.js","_app/immutable/chunks/BEJnMdRT.js","_app/immutable/chunks/DhtD2JrC.js","_app/immutable/chunks/Ba-Cv3Qc.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DffSj0ub.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BGKdB4WI.js","_app/immutable/chunks/BSbYCVpq.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/s3RIZRuh.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/CAeNsoDu.js","_app/immutable/chunks/B-VWsbvK.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/BXujJ5-U.js","_app/immutable/chunks/DVFUldjp.js","_app/immutable/chunks/Bh5SWhc2.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Bn1w2F2-.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/FaQtFqmn.js","_app/immutable/chunks/5PQrJApZ.js","_app/immutable/chunks/DbS8Mp2N.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C5JnEjnE.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C1wuS5n_.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=108--oJPWAoH.js.map
