import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "risk-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/risk_assessment_csv/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the CSV file");
  }
  const fileName = `RA-${params.id}-${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-DfxxI7zW.js.map
