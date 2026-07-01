import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const URLModel = "frameworks";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/excel_template/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the Excel file");
  }
  `framework-${params.id}-.xlsx`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-BILWQ5ib.js.map
