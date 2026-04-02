import { r as redirect, f as fail } from './index-BWA_9C9m.js';
import { A as ALLAUTH_API_URL } from './constants-QzmVibOJ.js';
import './utils-FiC4zhrQ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const GET = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, `/login?next=/home`);
  }
  redirect(302, "/recap");
};
const POST = async ({ fetch, cookies }) => {
  const requestInitOptions = {
    method: "DELETE"
  };
  const endpoint = `${ALLAUTH_API_URL}/auth/session`;
  const res = await fetch(endpoint, requestInitOptions);
  const response = await res.json();
  if (response.meta.is_authenticated !== false) return fail(400, response.error);
  cookies.delete("token", { path: "/" });
  cookies.delete("allauth_session_token", { path: "/" });
  redirect(302, "/login");
};

export { GET, POST };
//# sourceMappingURL=_server.ts-C0nSiF5F.js.map
