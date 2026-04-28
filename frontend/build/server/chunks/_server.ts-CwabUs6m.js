import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params, url }) => {
  const URLModel = "stored-libraries";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/tree/`;
  const res = await fetch(endpoint);
  if (!res.ok) error(res.status, await res.json());
  const tree = await res.json();
  return new Response(JSON.stringify(tree), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-CwabUs6m.js.map
