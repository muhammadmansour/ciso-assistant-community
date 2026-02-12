import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

function sanitizeFileName(name) {
  return name.normalize("NFKC").replace(/[\x00-\x1F<>:"/\\|?*\u007F'`’‘“”()\[\]{}]/g, "-").replace(/\s+/g, "-").replace(/\.+$/g, "").replace(/^-+|-+$/g, "").replace(/-+/g, "-").substring(0, 100);
}
function formatDateForFilename(date = /* @__PURE__ */ new Date()) {
  const pad = (n) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}
const GET = async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/export/`;
  const compliance_assessment = await fetch(`${BASE_API_URL}/${URLModel}/${params.id}/`).then(
    (res) => res.json()
  );
  const namePart = `${compliance_assessment.name}-${compliance_assessment.framework.str}`;
  const datePart = formatDateForFilename();
  const sanitizedName = sanitizeFileName(namePart);
  const finalFileName = `${sanitizedName}-${datePart}.zip`;
  const urlEncodedFileName = encodeURIComponent(finalFileName);
  const blobData = await fetch(endpoint).then((res) => {
    if (!res.ok) {
      throw error(400, "Error fetching the ZIP file");
    }
    return res.blob();
  });
  return new Response(blobData, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename*=utf-8''${urlEncodedFileName}; filename="${finalFileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-BTWHb2nQ.js.map
