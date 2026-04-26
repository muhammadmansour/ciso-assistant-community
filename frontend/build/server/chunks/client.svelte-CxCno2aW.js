import { w as writable, g as get$1 } from './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';

const defaultOptions = {
  clearArray: false,
  clearOnNavigate: true,
  clearAfterMs: 0,
  flashCookieOptions: {
    path: "/",
    maxAge: 120,
    httpOnly: false,
    sameSite: "strict"
  }
};
class FlashMessage {
  options;
  _message;
  get message() {
    return this._message;
  }
  _flashTimeout = 0;
  get flashTimeout() {
    return this._flashTimeout;
  }
  constructor(message, options) {
    this.options = options ?? defaultOptions;
    this._message = {
      subscribe: message.subscribe,
      set: (value, options2) => message.update(($message) => this.update($message, value, options2?.concatenateArray ?? false)),
      update: (updater, options2) => message.update(($message) => this.update($message, updater($message), options2?.concatenateArray ?? false))
    };
  }
  update(current, newData, concatenateArray = false) {
    if (this._flashTimeout)
      clearTimeout(this.flashTimeout);
    if (concatenateArray && Array.isArray(newData)) {
      if (Array.isArray(current)) {
        if (current.length > 0 && newData.length > 0 && current[current.length - 1] === newData[newData.length - 1]) {
          return current;
        } else {
          return current.concat(newData);
        }
      }
    }
    return newData;
  }
}
function get(page) {
  return "subscribe" in page ? get$1(page) : page;
}
function _initFlash(page, options) {
  {
    return new FlashMessage(writable(get(page).data.flash));
  }
}
function getFlash(page, options) {
  return _initFlash(page).message;
}

export { getFlash as g };
//# sourceMappingURL=client.svelte-CxCno2aW.js.map
