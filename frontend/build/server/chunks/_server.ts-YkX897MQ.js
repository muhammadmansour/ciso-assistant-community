import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const GET = async ({ fetch }) => {
  const res = await fetch(`${BASE_API_URL}/policy-collections/`);
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-YkX897MQ.js.map
