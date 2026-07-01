const PASSWORD_RESET_LINK_COOKIE = "pwd_reset_ctx";
function persistPasswordResetLinkCookie(event, uidb64, token) {
  const u = uidb64.trim();
  const t = token.trim();
  if (!u || !t) return;
  event.cookies.set(PASSWORD_RESET_LINK_COOKIE, JSON.stringify({ uidb64: u, token: t }), {
    path: "/",
    // Long enough for users who pause between opening the link and submitting the form.
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    secure: event.url.protocol === "https:",
    sameSite: "lax"
  });
}
function clearPasswordResetLinkCookie(event) {
  event.cookies.delete(PASSWORD_RESET_LINK_COOKIE, { path: "/" });
}
function readPasswordResetLinkCookie(event) {
  const raw = event.cookies.get(PASSWORD_RESET_LINK_COOKIE);
  if (!raw) return null;
  try {
    const o = JSON.parse(raw);
    const uidb64 = String(o.uidb64 ?? "").trim();
    const token = String(o.token ?? "").trim();
    if (uidb64 && token) return { uidb64, token };
  } catch {
  }
  return null;
}
function resolveResetUidAndToken(event, fromForm) {
  let urlParams = null;
  try {
    urlParams = new URL(event.request.url).searchParams;
  } catch {
    urlParams = null;
  }
  const urlUid = (urlParams?.get("uidb64") ?? "").trim();
  const urlTok = (urlParams?.get("token") ?? "").trim();
  if (urlUid && urlTok) {
    return { uidb64: urlUid, token: urlTok };
  }
  let uidb64 = (fromForm.uidb64 ?? "").trim();
  let token = (fromForm.token ?? "").trim();
  uidb64 = uidb64 || urlUid;
  token = token || urlTok;
  if (!uidb64 || !token) {
    const referer = event.request.headers.get("referer");
    if (referer) {
      try {
        const u = new URL(referer);
        uidb64 = uidb64 || (u.searchParams.get("uidb64") ?? "").trim();
        token = token || (u.searchParams.get("token") ?? "").trim();
      } catch {
      }
    }
  }
  const cookiePair = readPasswordResetLinkCookie(event);
  if (cookiePair) {
    if (!uidb64) uidb64 = cookiePair.uidb64;
    if (!token) token = cookiePair.token;
    else if (cookiePair.token.length > token.length && token.length > 0 && token === (fromForm.token ?? "").trim()) {
      token = cookiePair.token;
    }
  }
  return { uidb64: uidb64.trim(), token: token.trim() };
}

export { clearPasswordResetLinkCookie as c, persistPasswordResetLinkCookie as p, resolveResetUidAndToken as r };
//# sourceMappingURL=password-reset-token-BZMTLZMl.js.map
