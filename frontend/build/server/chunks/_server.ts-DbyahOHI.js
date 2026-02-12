import { e as error, j as json } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const AUDIT_ANALYSIS_API_URL = "https://muraji-api.wathbahs.com/api/audit/analyze";
const POST = async ({ params, request, fetch }) => {
  const evidenceId = params.id;
  try {
    const requestData = await request.json();
    const {
      questions = [],
      typicalEvidence = [],
      requirementsContext = [],
      evidenceName = "",
      evidenceDescription = ""
    } = requestData;
    console.log("=== Audit Analysis API Request ===");
    console.log("Evidence ID:", evidenceId);
    console.log("Evidence Name:", evidenceName);
    const evidenceRes = await fetch(`${BASE_API_URL}/evidences/${evidenceId}/`);
    if (!evidenceRes.ok) {
      throw error(404, "Evidence not found");
    }
    const evidenceData = await evidenceRes.json();
    const attachmentName = evidenceData.attachment;
    if (!attachmentName) {
      return json({ error: "No attachment found for this evidence" }, { status: 400 });
    }
    const fileRes = await fetch(`${BASE_API_URL}/evidences/${evidenceId}/attachment/`);
    if (!fileRes.ok) {
      throw error(404, "Attachment file not found");
    }
    const fileBlob = await fileRes.blob();
    const fileBuffer = await fileBlob.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const mimeType = fileBlob.type || "application/octet-stream";
    console.log("Filename:", attachmentName);
    console.log("MimeType:", mimeType);
    console.log("File size:", fileBuffer.byteLength, "bytes");
    console.log("Questions count:", questions.length);
    console.log("Typical evidence count:", typicalEvidence.length);
    console.log("Requirements context count:", requirementsContext.length);
    const contextParts = [];
    if (evidenceName) {
      contextParts.push(`Evidence: ${evidenceName}`);
    }
    if (evidenceDescription) {
      contextParts.push(`Description: ${evidenceDescription}`);
    }
    if (requirementsContext.length > 0) {
      const reqContextStr = requirementsContext.map((req) => {
        const parts = [];
        if (req.framework) parts.push(`Framework: ${req.framework}`);
        if (req.framework_provider || req.provider) parts.push(`Provider: ${req.framework_provider || req.provider}`);
        if (req.ref_id) parts.push(`Requirement: ${req.ref_id}`);
        if (req.name) parts.push(`Name: ${req.name}`);
        if (req.description) parts.push(`Description: ${req.description}`);
        return parts.join(", ");
      }).join("\n");
      contextParts.push(`
Linked Requirements:
${reqContextStr}`);
    }
    const auditRequest = {
      files: [
        {
          name: attachmentName,
          mimeType,
          encoding: "base64",
          data: base64Data
        }
      ],
      questions,
      typicalEvidence,
      options: {
        context: contextParts.join("\n") || "Compliance audit analysis"
      }
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1e3);
    const analysisRes = await fetch(AUDIT_ANALYSIS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(auditRequest),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const contentType = analysisRes.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const textResponse = await analysisRes.text();
      console.error("Audit Analysis API error:", textResponse);
      return json(
        {
          error: "Audit Analysis Failed",
          message: textResponse.substring(0, 500),
          details: "The audit analysis service returned an invalid response."
        },
        { status: 502 }
      );
    }
    if (!analysisRes.ok) {
      const errorData = await analysisRes.json();
      console.error("Audit Analysis API error:", errorData);
      return json(
        {
          error: "Audit Analysis Failed",
          message: errorData.message || errorData.error || "Unknown error",
          details: errorData.details || "The audit analysis service encountered an error."
        },
        { status: analysisRes.status }
      );
    }
    const analysisResult = await analysisRes.json();
    console.log("Audit analysis completed successfully");
    return json(analysisResult);
  } catch (err) {
    console.error("Audit analysis error:", err);
    if (err instanceof Error && err.name === "AbortError") {
      return json(
        {
          error: "Timeout",
          message: "Audit analysis request timed out after 5 minutes",
          details: "The document may be too large or complex. Try with a smaller file."
        },
        { status: 504 }
      );
    }
    return json(
      {
        error: "Internal Error",
        message: String(err),
        details: "An unexpected error occurred during audit analysis."
      },
      { status: 500 }
    );
  }
};

export { POST };
//# sourceMappingURL=_server.ts-DbyahOHI.js.map
