import { p as push, a3 as store_set, a as pop, W as ensure_array_like, V as escape_html } from './index2-9icAqEyj.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { uM as requirementsexplorer1, lr as visualizerequirements1, HC as findings, Hz as findingsexplorer1 } from './_index-Syqrsmaf.js';
import './breadcrumbs-Cdf8pK7r.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './runtime-BKo9q3Zd.js';

function Article($$payload, $$props) {
  let { title, desc, link, tags = [] } = $$props;
  $$payload.out += `<article class="hover:animate-background rounded-xl bg-linear-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-size-[400%_400%] hover:shadow-xs hover:[animation-duration:4s]">`;
  Anchor($$payload, {
    href: link,
    children: ($$payload2) => {
      const each_array = ensure_array_like(tags);
      $$payload2.out += `<div class="rounded-[10px] bg-white p-4 pt-20! sm:p-6 h-full"><div class="block text-xs text-gray-500 min-h-10 flex items-end">${escape_html(desc)}</div> <h3 class="mt-0.5 text-lg font-medium text-gray-900">${escape_html(title)}</h3> <div class="mt-4 flex flex-wrap gap-1"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$payload2.out += `<span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">${escape_html(tag)}</span>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></article>`;
}
function _page($$payload, $$props) {
  push();
  store_set(pageTitle, "Experimental");
  $$payload.out += `<div class="bg-white grid grid-cols-2 p-4 gap-4">`;
  Article($$payload, {
    title: requirementsexplorer1(),
    desc: visualizerequirements1(),
    link: "/requirement-assessments",
    tags: ["analysis", "audit"]
  });
  $$payload.out += `<!----> `;
  Article($$payload, {
    title: findings(),
    desc: findingsexplorer1(),
    link: "/findings",
    tags: ["analysis", "findings"]
  });
  $$payload.out += `<!----> `;
  Article($$payload, {
    title: "Batch Creation",
    desc: "Create multiple assets, entities, or feared events at once from a simple text list",
    link: "/experimental/batch-create",
    tags: ["assets", "entities", "ebios-rm", "bulk"]
  });
  $$payload.out += `<!----> `;
  Article($$payload, {
    title: "Yearly Tasks Review",
    desc: "Review all recurrent tasks grouped by folder for yearly planning",
    link: "/experimental/yearly-tasks-review",
    tags: ["tasks", "planning", "review", "PRO"]
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BtvR4inG.js.map
