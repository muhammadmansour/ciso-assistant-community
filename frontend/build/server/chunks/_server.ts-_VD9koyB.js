import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const POST = async ({ fetch, request }) => {
  const body = await request.text();
  const res = await fetch(`${BASE_API_URL}/policy-collections/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/json"
    }
  });
};

export { POST };
//# sourceMappingURL=_server.ts-_VD9koyB.js.map
