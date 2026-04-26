import './exports-CA5lG8jS.js';
import { w as writable } from './index-CRjgakYW.js';
import './state.svelte-B6YM-9h0.js';

function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
function invalidateAll() {
  {
    throw new Error("Cannot call invalidateAll() on the server");
  }
}
async function preloadData(href) {
  {
    throw new Error("Cannot call preloadData(...) on the server");
  }
}
function pushState(url, state) {
  {
    throw new Error("Cannot call pushState(...) on the server");
  }
}
async function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}

export { applyAction as a, pushState as b, goto as g, invalidateAll as i, preloadData as p, stores as s };
//# sourceMappingURL=client2-CItqzqlw.js.map
