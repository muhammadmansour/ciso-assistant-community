import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { r as redirect, f as fail } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, locals, params, cookies }) => {
  if (locals.user) {
    redirect(302, "/recap");
  }
  cookies.set("token", params.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true
  });
  const allauthSessionEndpoint = `${BASE_API_URL}/iam/session-token/`;
  const allauthSessionResponse = await fetch(allauthSessionEndpoint, { method: "POST" });
  if (!allauthSessionResponse.ok) {
    console.error("Failed to fetch allauth session token");
    return fail(allauthSessionResponse.status);
  }
  const allauthSessionToken = await allauthSessionResponse.json().then((res) => res.token);
  cookies.set("allauth_session_token", allauthSessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true
  });
  redirect(302, "/recap");
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 148;
const server_id = "src/routes/(authentication)/sso/authenticate/[token]/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=148-D3NUFaM0.js.map
