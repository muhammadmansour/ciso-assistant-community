import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';

function _error($$payload, $$props) {
  push();
  $$payload.out += `<div class="container svelte-g6cueq"><h1 class="status svelte-g6cueq">Error ${escape_html(page.status)}</h1> <p class="message svelte-g6cueq">${escape_html(page.error?.message)}</p></div>`;
  pop();
}

export { _error as default };
//# sourceMappingURL=_error.svelte-BVD6ZRYe.js.map
