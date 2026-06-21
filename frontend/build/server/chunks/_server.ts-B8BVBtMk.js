import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/build/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching build info");
  }
  const build = await res.json();
  return new Response(JSON.stringify(build), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-B8BVBtMk.js.map
