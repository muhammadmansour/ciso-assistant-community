import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params, url }) => {
  const endpoint = `${BASE_API_URL}/compliance-assessments/${params.id}/action-plan/${url.searchParams ? "?" + url.searchParams.toString() : ""}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-DYW3Zu9l.js.map
