import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, url }) => {
  const riskAssessmentId = url.searchParams.get("risk_assessment");
  const endpoint = `${BASE_API_URL}/risk-scenarios/default_ref_id/?risk_assessment=${riskAssessmentId}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Failed to fetch default ref_id");
  }
  const logo = await res.json();
  return new Response(JSON.stringify(logo), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-DiIQ6y62.js.map
