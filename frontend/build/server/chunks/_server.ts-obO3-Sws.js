import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const ENTITY_EXTRACTION_API_URL = "https://muraji-stage.wathbahs.com/api/entity-extraction/extract";
const MAX_FILE_SIZE_FOR_AI = 50 * 1024 * 1024;
const AI_ANALYSIS_TIMEOUT = 5 * 60 * 1e3;
const POST = async (event) => {
  const evidenceId = event.params.id;
  try {
    const evidenceEndpoint = `${BASE_API_URL}/evidences/${evidenceId}/`;
    const evidenceRes = await event.fetch(evidenceEndpoint);
    if (!evidenceRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch evidence" }), {
        status: evidenceRes.status,
        headers: { "Content-Type": "application/json" }
      });
    }
    const evidence = await evidenceRes.json();
    const attachmentEndpoint = `${BASE_API_URL}/evidences/${evidenceId}/attachment/`;
    const attachmentRes = await event.fetch(attachmentEndpoint);
    if (!attachmentRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch evidence attachment" }),
        {
          status: attachmentRes.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const contentType = attachmentRes.headers.get("content-type") || "application/octet-stream";
    const contentDisposition = attachmentRes.headers.get("content-disposition") || "";
    let filename = evidence.attachment || `evidence_${evidenceId}`;
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch) {
      filename = filenameMatch[1].replace(/['"]/g, "");
    }
    const arrayBuffer = await attachmentRes.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_FILE_SIZE_FOR_AI) {
      return new Response(
        JSON.stringify({
          error: "File too large",
          details: `File size (${Math.round(arrayBuffer.byteLength / 1024 / 1024)}MB) exceeds the maximum allowed size (${Math.round(MAX_FILE_SIZE_FOR_AI / 1024 / 1024)}MB)`
        }),
        {
          status: 413,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    console.log("=== Entity Extraction API Request ===");
    console.log("Evidence ID:", evidenceId);
    console.log("Filename:", filename);
    console.log("MimeType:", contentType);
    console.log("File size:", arrayBuffer.byteLength, "bytes");
    const files = [
      {
        name: filename,
        mimeType: contentType,
        encoding: "base64",
        data: base64Data
      }
    ];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_ANALYSIS_TIMEOUT);
    let aiResponse;
    try {
      aiResponse = await fetch(ENTITY_EXTRACTION_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ files }),
        signal: controller.signal
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === "AbortError") {
        return new Response(
          JSON.stringify({ error: "Entity extraction timed out", details: "The AI analysis took too long. Try with a smaller file." }),
          { status: 504, headers: { "Content-Type": "application/json" } }
        );
      }
      throw fetchError;
    }
    clearTimeout(timeoutId);
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("Entity Extraction API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Entity extraction failed", details: errorText }),
        {
          status: aiResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const responseContentType = aiResponse.headers.get("content-type") || "";
    if (!responseContentType.includes("application/json")) {
      const responseText = await aiResponse.text();
      console.error("Entity Extraction API returned non-JSON response:", responseText.substring(0, 500));
      return new Response(
        JSON.stringify({
          error: "Entity extraction failed",
          details: `API returned non-JSON response (${responseContentType})`
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const analysisResult = await aiResponse.json();
    if (!analysisResult.success) {
      return new Response(
        JSON.stringify({
          error: "Entity extraction failed",
          details: analysisResult.error || "Unknown error"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(JSON.stringify(analysisResult), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Entity extraction error:", error);
    return new Response(
      JSON.stringify({ error: "Entity extraction failed", details: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export { POST };
//# sourceMappingURL=_server.ts-obO3-Sws.js.map
