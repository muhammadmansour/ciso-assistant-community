import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ params, fetch }) => {
  const studyId = params.id;
  const endpoint = `${BASE_API_URL}/ebios-rm/studies/${studyId}/export-xlsx/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the XLSX file");
  }
  const fileName = `ebios-rm-study-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-gKyMqEQQ.js.map
