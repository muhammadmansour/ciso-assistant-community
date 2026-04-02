import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/action_plan_xlsx/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the action plan XLSX file");
  }
  const fileName = `action-plan-${params.id}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-DEtmSYaL.js.map
