import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const AI_API_URL = "https://muraji-api.wathbahs.com/api/chat";
const MAX_FILE_SIZE_FOR_AI = 50 * 1024 * 1024;
const POST = async (event) => {
  const requirementAssessmentId = event.params.id;
  try {
    const raEndpoint = `${BASE_API_URL}/requirement-assessments/${requirementAssessmentId}/`;
    const raRes = await event.fetch(raEndpoint);
    if (!raRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch requirement assessment" }), {
        status: raRes.status,
        headers: { "Content-Type": "application/json" }
      });
    }
    const requirementAssessment = await raRes.json();
    const requirement = requirementAssessment.requirement;
    const context = buildContext(requirementAssessment, requirement);
    const files = await fetchEvidenceFiles(event, requirementAssessment.evidences);
    console.log("=== Muraji API Request ===");
    console.log("Context length:", context.length);
    console.log("Evidences count:", requirementAssessment.evidences?.length || 0);
    console.log("Files included:", files.length);
    console.log(`Max file size for AI: ${MAX_FILE_SIZE_FOR_AI} bytes (${Math.round(MAX_FILE_SIZE_FOR_AI / 1024)}KB)`);
    files.forEach((f, i) => {
      console.log(`  File ${i + 1}: ${f.name} (${f.mimeType}, ${f.size} bytes, encoding: ${f.encoding})`);
    });
    const aiResponse = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        context,
        files
      })
    });
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed", details: errorText }),
        {
          status: aiResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const analysisResult = await aiResponse.json();
    if (!analysisResult.success) {
      return new Response(
        JSON.stringify({ error: "AI analysis failed", details: analysisResult.error || "Unknown error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(JSON.stringify(analysisResult.response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: "Analysis failed", details: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
function buildContext(requirementAssessment, requirement) {
  const parts = [];
  parts.push("**AUDIT ITEM INFORMATION:**");
  parts.push("");
  if (requirement.ref_id) {
    parts.push(`Code: ${requirement.ref_id}`);
  }
  if (requirement.name) {
    parts.push(`Title: ${requirement.name}`);
  }
  parts.push(`Applicability: ${requirementAssessment.result === "not_applicable" ? "Not Applicable" : "Applicable"}`);
  parts.push("");
  if (requirement.description) {
    parts.push("**Description:**");
    parts.push(requirement.description);
    parts.push("");
  }
  if (requirement.annotation) {
    parts.push("**Discussion:**");
    parts.push(requirement.annotation);
    parts.push("");
  }
  if (requirement.typical_evidence) {
    parts.push("**Typical Evidence:**");
    parts.push(requirement.typical_evidence);
    parts.push("");
  }
  parts.push("**Current Assessment:**");
  parts.push(`Status: ${requirementAssessment.status || "not set"}`);
  parts.push(`Result: ${requirementAssessment.result || "not assessed"}`);
  if (requirementAssessment.observation) {
    parts.push("");
    parts.push("**Observation:**");
    parts.push(requirementAssessment.observation);
  }
  if (requirementAssessment.applied_controls?.length > 0) {
    parts.push("");
    parts.push(`**Applied Controls (${requirementAssessment.applied_controls.length}):**`);
    requirementAssessment.applied_controls.forEach((control) => {
      parts.push(`- ${control.str || control.name || control.id}`);
    });
  }
  return parts.join("\n");
}
async function fetchEvidenceFiles(event, evidences) {
  const files = [];
  if (!evidences || evidences.length === 0) {
    return files;
  }
  for (const evidence of evidences) {
    try {
      const attachmentEndpoint = `${BASE_API_URL}/evidences/${evidence.id}/attachment/`;
      const attachmentRes = await event.fetch(attachmentEndpoint);
      if (attachmentRes.ok) {
        const contentType = attachmentRes.headers.get("content-type") || "application/octet-stream";
        const contentDisposition = attachmentRes.headers.get("content-disposition") || "";
        let filename = evidence.str || `evidence_${evidence.id}`;
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch) {
          filename = filenameMatch[1].replace(/['"]/g, "");
        }
        const arrayBuffer = await attachmentRes.arrayBuffer();
        if (arrayBuffer.byteLength > MAX_FILE_SIZE_FOR_AI) {
          console.log(`Skipping large file ${filename} (${arrayBuffer.byteLength} bytes > ${MAX_FILE_SIZE_FOR_AI} limit)`);
          continue;
        }
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const isTextFile = contentType.startsWith("text/") || contentType === "application/json" || contentType === "application/xml";
        files.push({
          name: filename,
          mimeType: contentType,
          encoding: isTextFile ? "text" : "base64",
          data: isTextFile ? Buffer.from(arrayBuffer).toString("utf-8") : base64Data,
          description: evidence.description || evidence.str || filename,
          size: arrayBuffer.byteLength
        });
      }
    } catch (error) {
      console.error(`Failed to fetch evidence ${evidence.id}:`, error);
    }
  }
  return files;
}

export { POST };
//# sourceMappingURL=_server.ts-0gJtyW_h.js.map
