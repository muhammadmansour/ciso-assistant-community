import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/word_report/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the Word file");
  }
  const fileName = `audit-exec-summary-${(/* @__PURE__ */ new Date()).toISOString()}.docx`;
  return new Response(res.body, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Transfer-Encoding": "chunked"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-EIYd6bUN.js.map
