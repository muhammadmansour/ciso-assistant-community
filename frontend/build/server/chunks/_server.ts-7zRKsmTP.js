import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "risk-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/action_plan_pdf/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the PDF file");
  }
  const fileName = `AP-${params.id}-${(/* @__PURE__ */ new Date()).toISOString()}.pdf`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "text/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-7zRKsmTP.js.map
