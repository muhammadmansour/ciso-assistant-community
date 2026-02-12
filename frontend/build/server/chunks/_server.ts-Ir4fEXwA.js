import { e as error } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/content-types/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const optionsResponse = await res.json();
  const options = typeof Object.values(optionsResponse)[0] === "string" ? Object.keys(optionsResponse).map((key) => ({
    label: optionsResponse[key],
    value: key
  })) : optionsResponse;
  return new Response(JSON.stringify(options), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-Ir4fEXwA.js.map
