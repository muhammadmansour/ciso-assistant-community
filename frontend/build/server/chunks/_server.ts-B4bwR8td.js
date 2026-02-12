import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const GET = async ({ fetch, request }) => {
  const endpoint = `${BASE_API_URL}/user-preferences/`;
  const req = await fetch(endpoint);
  const status = await req.status;
  const responseData = await req.json();
  return new Response(JSON.stringify(responseData), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const PATCH = async ({ fetch, request }) => {
  const newPreferences = await request.text();
  const requestInitOptions = {
    method: "PATCH",
    body: newPreferences
  };
  const endpoint = `${BASE_API_URL}/user-preferences/`;
  const req = await fetch(endpoint, requestInitOptions);
  const status = await req.status;
  const responseData = await req.text();
  return new Response(responseData, {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET, PATCH };
//# sourceMappingURL=_server.ts-B4bwR8td.js.map
