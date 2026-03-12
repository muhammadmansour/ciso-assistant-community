import './utils-FiC4zhrQ.js';

const cookieName = "flash";
const flashCookieOptions = {
  path: "/",
  maxAge: 120,
  httpOnly: false,
  sameSite: "strict"
};
function loadFlash(cb) {
  return async (event) => {
    const flash = _loadFlash(event).flash;
    const loadFunction = await cb(event);
    return { flash, ...loadFunction };
  };
}
function _loadFlash(event) {
  const dataString = event.cookies.get(cookieName);
  if (!dataString) {
    return { [cookieName]: void 0 };
  }
  let data = void 0;
  if (dataString) {
    const setFetchDest = event.request.headers.get("sec-fetch-dest");
    const accept = event.request.headers.get("accept");
    if (event.isDataRequest || setFetchDest == "empty" || accept == "*/*" || accept?.includes("application/json")) ;
    else {
      event.cookies.delete(cookieName, { path: flashCookieOptions.path });
    }
    try {
      data = JSON.parse(dataString);
    } catch (e) {
    }
  }
  return {
    [cookieName]: data
  };
}
function setFlash(message, event) {
  const cookies = "cookies" in event ? event.cookies : event;
  cookies.set(cookieName, JSON.stringify(message), {
    ...flashCookieOptions,
    path: flashCookieOptions.path
  });
}

export { loadFlash as l, setFlash as s };
//# sourceMappingURL=server-C682bpHT.js.map
