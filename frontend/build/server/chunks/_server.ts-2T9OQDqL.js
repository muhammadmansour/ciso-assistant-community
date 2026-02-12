import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "risk-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/action_plan_excel/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the Excel file");
  }
  const fileName = `AP-${params.id}-${(/* @__PURE__ */ new Date()).toISOString()}.xlsx`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-2T9OQDqL.js.map
