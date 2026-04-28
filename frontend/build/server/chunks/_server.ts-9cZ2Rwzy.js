import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const POST = async (event) => {
  const requestInitOptions = {
    method: "POST"
  };
  const endpoint = `${BASE_API_URL}/risk-assessments/${event.params.id}/sync-to-actions/`;
  const res = await event.fetch(endpoint, requestInitOptions);
  if (!res.ok) {
    const response = await res.json();
    console.error(response);
    return new Response(JSON.stringify(response), {
      status: res.status,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  return new Response(JSON.stringify(await res.json()), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { POST };
//# sourceMappingURL=_server.ts-9cZ2Rwzy.js.map
