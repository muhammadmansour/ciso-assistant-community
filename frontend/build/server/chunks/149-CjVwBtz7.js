import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { e as emailSchema } from './schemas-DxPQoveO.js';
import { bg as waitbeforerequestingresetlink4, bh as resetlinksent2 } from './_index-Syqrsmaf.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import { nanoid } from 'nanoid';
import { z as zod, g as getDefaultExportFromCjs } from './zod-BTgf12zS.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

async function getCsrfToken() {
  try {
    const response = await fetch(`${BASE_API_URL}/csrf/`, {
      credentials: "include"
    }).then((res) => res.json());
    return response.csrfToken;
  } catch (error) {
    console.error(error);
  }
}
await getCsrfToken();
const perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const now = () => perf.now();
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
const isPosIntOrInf = (n) => n === Infinity || isPosInt(n);
class TTLCache {
  constructor({
    max = Infinity,
    ttl,
    updateAgeOnGet = false,
    checkAgeOnGet = false,
    noUpdateTTL = false,
    dispose,
    noDisposeOnSet = false
  } = {}) {
    this.expirations = /* @__PURE__ */ Object.create(null);
    this.data = /* @__PURE__ */ new Map();
    this.expirationMap = /* @__PURE__ */ new Map();
    if (ttl !== void 0 && !isPosIntOrInf(ttl)) {
      throw new TypeError(
        "ttl must be positive integer or Infinity if set"
      );
    }
    if (!isPosIntOrInf(max)) {
      throw new TypeError("max must be positive integer or Infinity");
    }
    this.ttl = ttl;
    this.max = max;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.checkAgeOnGet = !!checkAgeOnGet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDisposeOnSet = !!noDisposeOnSet;
    if (dispose !== void 0) {
      if (typeof dispose !== "function") {
        throw new TypeError("dispose must be function if set");
      }
      this.dispose = dispose;
    }
    this.timer = void 0;
    this.timerExpiration = void 0;
  }
  setTimer(expiration, ttl) {
    if (this.timerExpiration < expiration) {
      return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const t = setTimeout(() => {
      this.timer = void 0;
      this.timerExpiration = void 0;
      this.purgeStale();
      for (const exp in this.expirations) {
        this.setTimer(exp, exp - now());
        break;
      }
    }, ttl);
    if (t.unref) t.unref();
    this.timerExpiration = expiration;
    this.timer = t;
  }
  // hang onto the timer so we can clearTimeout if all items
  // are deleted.  Deno doesn't have Timer.unref(), so it
  // hangs otherwise.
  cancelTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timerExpiration = void 0;
      this.timer = void 0;
    }
  }
  /* istanbul ignore next */
  cancelTimers() {
    process.emitWarning(
      'TTLCache.cancelTimers has been renamed to TTLCache.cancelTimer (no "s"), and will be removed in the next major version update'
    );
    return this.cancelTimer();
  }
  clear() {
    const entries = this.dispose !== TTLCache.prototype.dispose ? [...this] : [];
    this.data.clear();
    this.expirationMap.clear();
    this.cancelTimer();
    this.expirations = /* @__PURE__ */ Object.create(null);
    for (const [key, val] of entries) {
      this.dispose(val, key, "delete");
    }
  }
  setTTL(key, ttl = this.ttl) {
    const current = this.expirationMap.get(key);
    if (current !== void 0) {
      const exp = this.expirations[current];
      if (!exp || exp.length <= 1) {
        delete this.expirations[current];
      } else {
        this.expirations[current] = exp.filter((k) => k !== key);
      }
    }
    if (ttl !== Infinity) {
      const expiration = Math.floor(now() + ttl);
      this.expirationMap.set(key, expiration);
      if (!this.expirations[expiration]) {
        this.expirations[expiration] = [];
        this.setTimer(expiration, ttl);
      }
      this.expirations[expiration].push(key);
    } else {
      this.expirationMap.set(key, Infinity);
    }
  }
  set(key, val, {
    ttl = this.ttl,
    noUpdateTTL = this.noUpdateTTL,
    noDisposeOnSet = this.noDisposeOnSet
  } = {}) {
    if (!isPosIntOrInf(ttl)) {
      throw new TypeError("ttl must be positive integer or Infinity");
    }
    if (this.expirationMap.has(key)) {
      if (!noUpdateTTL) {
        this.setTTL(key, ttl);
      }
      const oldValue = this.data.get(key);
      if (oldValue !== val) {
        this.data.set(key, val);
        if (!noDisposeOnSet) {
          this.dispose(oldValue, key, "set");
        }
      }
    } else {
      this.setTTL(key, ttl);
      this.data.set(key, val);
    }
    while (this.size > this.max) {
      this.purgeToCapacity();
    }
    return this;
  }
  has(key) {
    return this.data.has(key);
  }
  getRemainingTTL(key) {
    const expiration = this.expirationMap.get(key);
    return expiration === Infinity ? expiration : expiration !== void 0 ? Math.max(0, Math.ceil(expiration - now())) : 0;
  }
  get(key, {
    updateAgeOnGet = this.updateAgeOnGet,
    ttl = this.ttl,
    checkAgeOnGet = this.checkAgeOnGet
  } = {}) {
    const val = this.data.get(key);
    if (checkAgeOnGet && this.getRemainingTTL(key) === 0) {
      this.delete(key);
      return void 0;
    }
    if (updateAgeOnGet) {
      this.setTTL(key, ttl);
    }
    return val;
  }
  dispose(_, __) {
  }
  delete(key) {
    const current = this.expirationMap.get(key);
    if (current !== void 0) {
      const value = this.data.get(key);
      this.data.delete(key);
      this.expirationMap.delete(key);
      const exp = this.expirations[current];
      if (exp) {
        if (exp.length <= 1) {
          delete this.expirations[current];
        } else {
          this.expirations[current] = exp.filter((k) => k !== key);
        }
      }
      this.dispose(value, key, "delete");
      if (this.size === 0) {
        this.cancelTimer();
      }
      return true;
    }
    return false;
  }
  purgeToCapacity() {
    for (const exp in this.expirations) {
      const keys = this.expirations[exp];
      if (this.size - keys.length >= this.max) {
        delete this.expirations[exp];
        const entries = [];
        for (const key of keys) {
          entries.push([key, this.data.get(key)]);
          this.data.delete(key);
          this.expirationMap.delete(key);
        }
        for (const [key, val] of entries) {
          this.dispose(val, key, "evict");
        }
      } else {
        const s = this.size - this.max;
        const entries = [];
        for (const key of keys.splice(0, s)) {
          entries.push([key, this.data.get(key)]);
          this.data.delete(key);
          this.expirationMap.delete(key);
        }
        for (const [key, val] of entries) {
          this.dispose(val, key, "evict");
        }
        return;
      }
    }
  }
  get size() {
    return this.data.size;
  }
  purgeStale() {
    const n = Math.ceil(now());
    for (const exp in this.expirations) {
      if (exp === "Infinity" || exp > n) {
        return;
      }
      const keys = [...this.expirations[exp] || []];
      const entries = [];
      delete this.expirations[exp];
      for (const key of keys) {
        entries.push([key, this.data.get(key)]);
        this.data.delete(key);
        this.expirationMap.delete(key);
      }
      for (const [key, val] of entries) {
        this.dispose(val, key, "stale");
      }
    }
    if (this.size === 0) {
      this.cancelTimer();
    }
  }
  *entries() {
    for (const exp in this.expirations) {
      for (const key of this.expirations[exp]) {
        yield [key, this.data.get(key)];
      }
    }
  }
  *keys() {
    for (const exp in this.expirations) {
      for (const key of this.expirations[exp]) {
        yield key;
      }
    }
  }
  *values() {
    for (const exp in this.expirations) {
      for (const key of this.expirations[exp]) {
        yield this.data.get(key);
      }
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
var ttlcache = TTLCache;
const TTLCache$1 = /* @__PURE__ */ getDefaultExportFromCjs(ttlcache);
class IPRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    return event.getClientAddress();
  }
}
class IPUserAgentRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    const ua = event.request.headers.get("user-agent");
    if (!ua)
      return false;
    return event.getClientAddress() + ua;
  }
}
class CookieRateLimiter {
  rate;
  cookieOptions;
  secret;
  requirePreflight;
  cookieId;
  hashFunction;
  constructor(options) {
    this.cookieId = options.name;
    this.secret = options.secret;
    this.rate = options.rate;
    this.requirePreflight = options.preflight;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    this.cookieOptions = {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      ...options.serializeOptions
    };
  }
  async hash(event) {
    const currentId = await this.userIdFromCookie(event.cookies.get(this.cookieId), event);
    return currentId ? currentId : false;
  }
  async preflight(event) {
    const data = event.cookies.get(this.cookieId);
    if (data) {
      const userId2 = await this.userIdFromCookie(data, event);
      if (userId2)
        return userId2;
    }
    const userId = nanoid();
    event.cookies.set(this.cookieId, userId + ";" + await this.hashFunction(this.secret + userId), this.cookieOptions);
    return userId;
  }
  async userIdFromCookie(cookie, event) {
    const empty = () => {
      return this.requirePreflight ? null : this.preflight(event);
    };
    if (!cookie)
      return empty();
    const [userId, secretHash] = cookie.split(";");
    if (!userId || !secretHash)
      return empty();
    if (await this.hashFunction(this.secret + userId) != secretHash) {
      return empty();
    }
    return userId;
  }
}
let defaultHashFunction;
if (globalThis?.crypto?.subtle) {
  defaultHashFunction = _subtleSha256;
}
async function _subtleSha256(str) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
class RateLimiter {
  store;
  plugins;
  onLimited;
  hashFunction;
  cookieLimiter;
  static TTLTime(unit) {
    switch (unit) {
      case "s":
        return 1e3;
      case "m":
        return 6e4;
      case "h":
        return 60 * 6e4;
      case "2s":
        return 2e3;
      case "5s":
        return 5e3;
      case "10s":
        return 1e4;
      case "15s":
        return 15e3;
      case "30s":
        return 3e4;
      case "45s":
        return 45e3;
      case "2m":
        return 2 * 6e4;
      case "5m":
        return 5 * 6e4;
      case "10m":
        return 10 * 6e4;
      case "15m":
        return 15 * 6e4;
      case "30m":
        return 30 * 6e4;
      case "45m":
        return 45 * 6e4;
      case "100ms":
        return 100;
      case "250ms":
        return 250;
      case "500ms":
        return 500;
      case "2h":
        return 2 * 60 * 6e4;
      case "6h":
        return 6 * 60 * 6e4;
      case "12h":
        return 12 * 60 * 6e4;
      case "d":
        return 24 * 60 * 6e4;
      case "ms":
        return 1;
    }
    throw new Error("Invalid unit for TTLTime: " + unit);
  }
  async isLimited(event, extraData) {
    return (await this._isLimited(event, extraData)).limited;
  }
  /**
   * Clear all rate limits.
   */
  async clear() {
    return await this.store.clear();
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<boolean>} true if request is limited, false otherwise
   */
  async _isLimited(event, extraData) {
    let limited = void 0;
    for (const plugin of this.plugins) {
      const rate = plugin.rate;
      const id = await plugin.hash(event, extraData);
      if (id === false) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rejected");
          if (status === true)
            return { limited: false, hash: null, unit: rate[1] };
        }
        return { limited: true, hash: null, unit: rate[1] };
      } else if (id === null) {
        if (limited === void 0)
          limited = true;
        continue;
      } else {
        limited = false;
      }
      if (!id) {
        throw new Error("Empty hash returned from rate limiter " + plugin.constructor.name);
      }
      if (id === true) {
        return { limited: false, hash: null, unit: rate[1] };
      }
      const hash = await this.hashFunction(id);
      const currentRate = await this.store.add(hash, rate[1]);
      if (currentRate > rate[0]) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rate");
          if (status === true)
            return { limited: false, hash, unit: rate[1] };
        }
        return { limited: true, hash, unit: rate[1] };
      }
    }
    return {
      limited: limited ?? false,
      hash: null,
      unit: this.plugins[this.plugins.length - 1].rate[1]
    };
  }
  constructor(options = {}) {
    this.plugins = [...options.plugins ?? []];
    this.onLimited = options.onLimited;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    if (!this.hashFunction) {
      throw new Error("No RateLimiter hash function found. Please set one with the hashFunction option.");
    }
    const IPRates = options.IP ?? options.rates?.IP;
    if (IPRates)
      this.plugins.push(new IPRateLimiter(IPRates));
    const IPUARates = options.IPUA ?? options.rates?.IPUA;
    if (IPUARates)
      this.plugins.push(new IPUserAgentRateLimiter(IPUARates));
    const cookieRates = options.cookie ?? options.rates?.cookie;
    if (cookieRates) {
      this.plugins.push(this.cookieLimiter = new CookieRateLimiter({
        hashFunction: this.hashFunction,
        ...cookieRates
      }));
    }
    if (!this.plugins.length) {
      throw new Error("No plugins set for RateLimiter!");
    }
    this.plugins.sort((a, b) => {
      const diff = RateLimiter.TTLTime(a.rate[1]) - RateLimiter.TTLTime(b.rate[1]);
      return diff == 0 ? a.rate[0] - b.rate[0] : diff;
    });
    const maxTTL = this.plugins.reduce((acc, plugin) => {
      const rate = plugin.rate[1];
      if (rate == "ms") {
        console.warn('RateLimiter: The "ms" unit is not reliable due to OS timing issues.');
      }
      const time = RateLimiter.TTLTime(rate);
      return Math.max(time, acc);
    }, 0);
    this.store = options.store ?? new TTLStore(maxTTL, options.maxItems);
  }
}
class RetryAfterRateLimiter extends RateLimiter {
  retryAfter;
  constructor(options = {}, retryAfterStore) {
    super(options);
    this.retryAfter = retryAfterStore ?? new RetryAfterStore();
  }
  static toSeconds(rateMs) {
    return Math.max(0, Math.floor(rateMs / 1e3));
  }
  static unitToSeconds(unit) {
    return RetryAfterRateLimiter.toSeconds(RateLimiter.TTLTime(unit));
  }
  /**
   * Clear all rate limits.
   */
  async clear() {
    await this.retryAfter.clear();
    return await super.clear();
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<limited: boolean, retryAfter: number>} Rate limit status for the event.
   */
  async check(event, extraData) {
    const result = await this._isLimited(event, extraData);
    if (!result.limited)
      return { limited: false, retryAfter: 0 };
    if (result.hash === null) {
      return {
        limited: true,
        retryAfter: RetryAfterRateLimiter.unitToSeconds(result.unit)
      };
    }
    const retryAfter = RetryAfterRateLimiter.toSeconds(await this.retryAfter.add(result.hash, result.unit) - Date.now());
    return { limited: true, retryAfter };
  }
}
class TTLStore {
  cache;
  constructor(maxTTL, maxItems = Infinity) {
    this.cache = new TTLCache$1({
      ttl: maxTTL,
      max: maxItems,
      noUpdateTTL: true
    });
  }
  async clear() {
    return this.cache.clear();
  }
  async add(hash, unit) {
    const currentRate = this.cache.get(hash) ?? 0;
    return this.set(hash, currentRate + 1, unit);
  }
  set(hash, rate, unit) {
    this.cache.set(hash, rate, { ttl: RateLimiter.TTLTime(unit) });
    return rate;
  }
}
class RetryAfterStore {
  cache;
  constructor(maxItems = Infinity) {
    this.cache = new TTLCache$1({
      max: maxItems,
      noUpdateTTL: true
    });
  }
  async clear() {
    return this.cache.clear();
  }
  async add(hash, unit) {
    const currentRate = this.cache.get(hash);
    if (currentRate)
      return this.cache.get(hash) ?? 0;
    const ttl = RateLimiter.TTLTime(unit);
    const retryAfter = Date.now() + ttl;
    this.cache.set(hash, retryAfter, { ttl });
    return retryAfter;
  }
}
const load = async (event) => {
  if (event.locals.user) {
    redirect(302, "/");
  }
  const form = await superValidate(event.request, zod(emailSchema));
  await limiter.cookieLimiter?.preflight(event);
  return { form };
};
const limiter = new RetryAfterRateLimiter({
  // A rate is defined as [number, unit]
  rates: {
    IP: [10, "h"],
    // IP address limiter
    IPUA: [5, "m"]
    // IP + User Agent limiter
  }
});
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(emailSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const email = form.data.email;
    const status = await limiter.check(event);
    if (status.limited) {
      setFlash(
        {
          type: "error",
          message: waitbeforerequestingresetlink4({ timing: status.retryAfter.toString() })
        },
        event
      );
      redirect(302, "/login");
    }
    const endpoint = `${BASE_API_URL}/iam/password-reset/`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.log(response);
      if (response.error) {
        setFlash({ type: "error", message: safeTranslate(response.error) }, event);
      }
      redirect(302, "/login");
    }
    setFlash(
      {
        type: "success",
        message: resetlinksent2({ email })
      },
      event
    );
    redirect(302, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 149;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cyy4A8Xc.js')).default;
const server_id = "src/routes/(authentication)/password-reset/+page.server.ts";
const imports = ["_app/immutable/nodes/149.D6dNPfGz.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BQtjeuej.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DhtFfOXf.js","_app/immutable/chunks/CVry4SXA.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/DqI8LxJS.js","_app/immutable/chunks/BBF8pxsr.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CL1MtWUI.js","_app/immutable/chunks/CmwBA6gY.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/ZM_KH0ts.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/FUON2Tb3.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/coRzUdqH.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/2XAhqfHk.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=149-CjVwBtz7.js.map
