import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/risk-acceptances/waiting/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    console.error(await res.json());
    error(res.status, "Error fetching waiting risk acceptance");
  }
  const riskAcceptances = await res.json();
  return new Response(JSON.stringify(riskAcceptances), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-BhwLSs-A.js.map
