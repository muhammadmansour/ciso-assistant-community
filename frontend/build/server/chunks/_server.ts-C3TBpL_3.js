import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/compliance_assessment_csv/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the CSV file");
  }
  const fileName = `audit-${params.id}-${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-C3TBpL_3.js.map
