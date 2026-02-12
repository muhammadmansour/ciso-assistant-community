import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, setHeaders, params }) => {
  const endpoint = `${BASE_API_URL}/evidence-revisions/${params.id}/attachment/`;
  try {
    const attachmentResponse = await fetch(endpoint);
    if (!attachmentResponse.ok) {
      throw new Error(`Fetch failed with status ${attachmentResponse.status}`);
    }
    const contentType = attachmentResponse.headers.get("Content-Type") || "application/octet-stream";
    const contentDisposition = attachmentResponse.headers.get("Content-Disposition");
    if (!contentDisposition) {
      throw new Error("Missing Content-Disposition header");
    }
    const fileName = contentDisposition.split("filename=")[1]?.replace(/"/g, "").trim();
    if (!fileName) {
      throw new Error("Invalid filename in Content-Disposition");
    }
    if (!attachmentResponse.body) {
      throw new Error("No response body");
    }
    const reader = attachmentResponse.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          }).catch((err) => {
            console.error("Stream reading error:", err);
            controller.error(err);
          });
        }
        push();
      },
      cancel() {
        reader.cancel().catch(() => {
        });
      }
    });
    setHeaders({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`
    });
    return new Response(stream, {
      status: attachmentResponse.status
    });
  } catch (err) {
    console.error("Attachment fetch error:", err);
    return error(500, "Failed to fetch attachment");
  }
};

export { GET };
//# sourceMappingURL=_server.ts-C2MDtpTg.js.map
