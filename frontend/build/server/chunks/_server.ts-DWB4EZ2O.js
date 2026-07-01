import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/entities/generate_dora_roi/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error generating DORA ROI file");
  }
  const contentDisposition = res.headers.get("Content-Disposition");
  const fileName = contentDisposition ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") : `DORA_ROI_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.zip`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-DWB4EZ2O.js.map
