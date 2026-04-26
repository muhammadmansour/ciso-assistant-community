import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "incidents";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/pdf/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the PDF file");
  }
  const fileName = `incident-${params.id}.pdf`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-CgNEDVqp.js.map
