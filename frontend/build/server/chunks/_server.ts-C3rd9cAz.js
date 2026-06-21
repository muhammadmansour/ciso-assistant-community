import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/assets/security_objectives/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching security objectives");
  }
  const objectives = await res.json().then((obj) => obj.results);
  return new Response(JSON.stringify(objectives), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-C3rd9cAz.js.map
