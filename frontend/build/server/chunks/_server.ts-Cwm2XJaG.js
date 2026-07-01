import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch: kitFetch, params, url }) => {
  const qs = url.searchParams.get("disposition") === "attachment" ? "?disposition=attachment" : "";
  const endpoint = `${BASE_API_URL}/evidences/${params.id}/attachment/${qs}`;
  let attachmentResponse;
  try {
    attachmentResponse = await kitFetch(endpoint);
  } catch (err) {
    console.error("Attachment fetch error:", err);
    throw error(500, "Failed to fetch attachment");
  }
  if (!attachmentResponse.ok) {
    try {
      return new Response(await attachmentResponse.text(), {
        status: attachmentResponse.status,
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });
    } catch {
      throw error(attachmentResponse.status, "Attachment not available");
    }
  }
  const body = attachmentResponse.body;
  if (!body) {
    throw error(500, "Attachment has no response body");
  }
  const outHeaders = new Headers();
  const ct = attachmentResponse.headers.get("Content-Type") || "application/octet-stream";
  outHeaders.set("Content-Type", ct);
  const disposition = attachmentResponse.headers.get("Content-Disposition");
  if (disposition) {
    outHeaders.set("Content-Disposition", disposition);
  }
  const length = attachmentResponse.headers.get("Content-Length");
  if (length) {
    outHeaders.set("Content-Length", length);
  }
  return new Response(body, {
    status: attachmentResponse.status,
    headers: outHeaders
  });
};

export { GET };
//# sourceMappingURL=_server.ts-Cwm2XJaG.js.map
