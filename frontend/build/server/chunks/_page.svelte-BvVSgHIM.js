import { p as push, W as ensure_array_like, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import './breadcrumbs-B1Us7xd5.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './_index-B12BAPce.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const mapping_sets = data.data.results;
  const each_array = ensure_array_like(mapping_sets);
  $$payload.out += `<div><ul class="list-disc p-4 m-2"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let mset = each_array[$$index];
    $$payload.out += `<li>`;
    Anchor($$payload, {
      href: `/experimental/mapping/${mset.id}`,
      class: "text-md hover:text-purple-700",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(mset.name)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></li>`;
  }
  $$payload.out += `<!--]--></ul></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BvVSgHIM.js.map
