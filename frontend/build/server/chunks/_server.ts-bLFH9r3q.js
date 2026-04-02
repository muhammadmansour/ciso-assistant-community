import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const DELETE = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/integrations/sync-mappings/${params.id}/`;
  const requestInitOptions = {
    method: "DELETE"
  };
  const res = await fetch(endpoint, requestInitOptions);
  if (!res.ok) {
    error(res.status, await res.text());
  }
  return new Response(null, {
    status: 204
  });
};

export { DELETE };
//# sourceMappingURL=_server.ts-bLFH9r3q.js.map
