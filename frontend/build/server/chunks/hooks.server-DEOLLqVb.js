import { D as DEFAULT_LANGUAGE, B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-D3bRixKV.js';
import { r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import { o as overwriteServerAsyncLocalStorage, e as extractLocaleFromRequest, s as strategy, l as localizeUrl, d as deLocalizeUrl, a as serverAsyncLocalStorage, b as defineCustomServerStrategy } from './runtime-BKo9q3Zd.js';
import './shared-server-BU2DVf8Q.js';
import './_index-B12BAPce.js';
import './utils-FiC4zhrQ.js';

function loadFeatureFlags() {
  const ff = {
    xRays: {},
    incidents: {},
    tasks: {},
    riskAcceptances: {},
    exceptions: {},
    followUp: {},
    ebiosRm: { dependsOn: ["tprm"] },
    scoringAssistant: {},
    vulnerabilities: {},
    compliance: {},
    tprm: {},
    privacy: {},
    experimental: {},
    quantitativeRiskStudies: {}
  };
  return ff;
}
async function paraglideMiddleware(request, resolve, callbacks) {
  if (!serverAsyncLocalStorage) {
    const { AsyncLocalStorage } = await import('async_hooks');
    overwriteServerAsyncLocalStorage(new AsyncLocalStorage());
  } else if (!serverAsyncLocalStorage) {
    overwriteServerAsyncLocalStorage(createMockAsyncLocalStorage());
  }
  const locale = extractLocaleFromRequest(request);
  const origin = new URL(request.url).origin;
  if (request.headers.get("Sec-Fetch-Dest") === "document" && strategy.includes("url")) {
    const localizedUrl = localizeUrl(request.url, { locale });
    if (normalizeURL(localizedUrl.href) !== normalizeURL(request.url)) {
      const headers = {};
      if (strategy.includes("preferredLanguage")) {
        headers["Vary"] = "Accept-Language";
      }
      const response2 = new Response(null, {
        status: 307,
        headers: {
          Location: localizedUrl.href,
          ...headers
        }
      });
      return response2;
    }
  }
  const newRequest = strategy.includes("url") ? new Request(deLocalizeUrl(request.url), request) : (
    // need to create a new request object because some metaframeworks (nextjs!) throw otherwise
    // https://github.com/opral/inlang-paraglide-js/issues/411
    new Request(request)
  );
  const messageCalls = /* @__PURE__ */ new Set();
  const response = await serverAsyncLocalStorage?.run({ locale, origin, messageCalls }, () => resolve({ locale, request: newRequest }));
  return response;
}
function normalizeURL(url) {
  const urlObj = new URL(url);
  urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
  return urlObj.href;
}
function createMockAsyncLocalStorage() {
  let currentStore = void 0;
  return {
    getStore() {
      return currentStore;
    },
    async run(store, callback) {
      currentStore = store;
      try {
        return await callback();
      } finally {
        currentStore = void 0;
      }
    }
  };
}
defineCustomServerStrategy("custom-userPreference", {
  getLocale: () => {
    return void 0;
  }
});
defineCustomServerStrategy("custom-fallback", {
  getLocale: () => {
    return DEFAULT_LANGUAGE;
  }
});
async function ensureCsrfToken(event) {
  let csrfToken = event.cookies.get("csrftoken") || "";
  if (!csrfToken) {
    const response = await fetch(`${BASE_API_URL}/csrf/`, {
      credentials: "include",
      headers: { "content-type": "application/json" }
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
    event.cookies.set("csrftoken", csrfToken, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: true
    });
  }
  return csrfToken;
}
function logoutUser(event) {
  event.cookies.delete("token", {
    path: "/"
  });
  const allauthSessionToken = event.cookies.get("allauth_session_token");
  if (allauthSessionToken) {
    event.cookies.delete("allauth_session_token", { path: "/" });
  }
  redirect(302, `/login?next=${event.url.pathname}`);
}
async function validateUserSession(event) {
  const token = event.cookies.get("token");
  if (!token) return null;
  const allauthSessionToken = event.cookies.get("allauth_session_token");
  if (!allauthSessionToken) logoutUser(event);
  const res = await fetch(`${BASE_API_URL}/iam/current-user/`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`
    }
  });
  if (!res.ok) logoutUser(event);
  return res.json();
}
const handle = async ({ event, resolve }) => paraglideMiddleware(event.request, async ({ request: localizedRequest, locale }) => {
  event.request = localizedRequest;
  event.locals.featureFlags = loadFeatureFlags();
  await ensureCsrfToken(event);
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";
  if (event.locals.user)
    return await resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale).replace("%dir%", dir);
      }
    });
  const errorId = new URL(event.request.url).searchParams.get("error");
  if (errorId) {
    setFlash({ type: "error", message: safeTranslate(errorId) }, event);
    redirect(302, "/login");
  }
  const user = await validateUserSession(event);
  if (user) {
    event.locals.user = user;
    const token = event.cookies.get("token");
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${token}`
    };
    const [generalSettings, featureFlagSettings] = await Promise.all([
      fetch(`${BASE_API_URL}/settings/general/object/`, {
        credentials: "include",
        headers
      }),
      fetch(`${BASE_API_URL}/settings/feature-flags/`, {
        credentials: "include",
        headers
      })
    ]);
    event.locals.settings = await generalSettings.json();
    try {
      event.locals.featureflags = await featureFlagSettings.json();
    } catch (e) {
      console.error("Error fetching feature flags", e);
      event.locals.featureflags = {};
    }
  }
  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace("%lang%", locale).replace("%dir%", dir);
    }
  });
});
const handleFetch = async ({ request, fetch: fetch2, event }) => {
  const unsafeMethods = /* @__PURE__ */ new Set(["POST", "PUT", "PATCH", "DELETE"]);
  const currentLang = event.locals.user?.preferences?.lang || DEFAULT_LANGUAGE;
  if (request.url.startsWith(BASE_API_URL)) {
    const isFileUpload = request.headers.has("Content-Disposition");
    if (!isFileUpload) {
      request.headers.set("Content-Type", "application/json");
    }
    request.headers.set("Accept-Language", currentLang);
    const token = event.cookies.get("token");
    const csrfToken = event.cookies.get("csrftoken");
    if (token) {
      request.headers.append("Authorization", `Token ${token}`);
    }
    if (unsafeMethods.has(request.method) && csrfToken) {
      request.headers.append("X-CSRFToken", csrfToken);
      request.headers.append("Cookie", `csrftoken=${csrfToken}`);
    }
  }
  if (request.url.startsWith(`${BASE_API_URL}/_allauth/app`)) {
    const allauthSessionToken = event.cookies.get("allauth_session_token");
    if (allauthSessionToken) {
      request.headers.append("X-Session-Token", allauthSessionToken);
    }
    const response = await fetch2(request);
    const clonedResponse = response.clone();
    if (clonedResponse.status === 410) logoutUser(event);
    if (clonedResponse.status === 401) {
      const data = await clonedResponse.json();
      const reauthenticationFlows = ["reauthenticate", "mfa_reauthenticate"];
      console.log(data);
      if (
        // User is authenticated, but needs to reauthenticate to perform a sensitive action
        data.meta.is_authenticated && data.data.flows.filter(
          (flow) => reauthenticationFlows.includes(flow.id)
        )
      ) {
        setFlash(
          { type: "warning", message: safeTranslate("reauthenticateForSensitiveAction") },
          event
        );
        logoutUser(event);
      }
    }
    return response;
  }
  return fetch2(request);
};

export { handle, handleFetch };
//# sourceMappingURL=hooks.server-DEOLLqVb.js.map
