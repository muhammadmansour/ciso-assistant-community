import { p as push, S as attr_class, V as escape_html, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { oG as type, cu as refid1 } from './_index-BNamVw9A.js';
import { s as safeTranslate } from './i18n-CnZlshhm.js';
import { A as Anchor } from './Anchor-CCjZl5ir.js';
import './runtime-B_ICGJZJ.js';
import './breadcrumbs-DdEobqL1.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const actorType = data.data.type;
  const specific = data.data.specific;
  const getTypeIcon = (type2) => {
    switch (type2) {
      case "user":
        return "fa-solid fa-user";
      case "team":
        return "fa-solid fa-users";
      case "entity":
        return "fa-solid fa-building";
      default:
        return "fa-solid fa-question";
    }
  };
  const getTypeUrl = (type2, id) => {
    switch (type2) {
      case "user":
        return `/users/${id}`;
      case "team":
        return `/teams/${id}`;
      case "entity":
        return `/entities/${id}`;
      default:
        return "#";
    }
  };
  $$payload.out += `<div class="flex flex-col space-y-4"><div class="card shadow-lg bg-white p-6"><div class="flex items-center space-x-4 mb-6"><div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600"><i${attr_class(`${stringify(getTypeIcon(actorType))} text-2xl`)}></i></div> <div><h1 class="text-2xl font-bold text-gray-900">${escape_html(data.data.str)}</h1> <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">${escape_html(safeTranslate(actorType))}</span></div></div> <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-xs"><dl class="-my-3 divide-y divide-gray-100 text-sm"><div class="grid grid-cols-1 gap-1 py-3 px-4 even:bg-surface-50 sm:grid-cols-3 sm:gap-4"><dt class="font-medium text-gray-900">${escape_html(type())}</dt> <dd class="text-gray-700 sm:col-span-2"><span class="inline-flex items-center"><i${attr_class(`${stringify(getTypeIcon(actorType))} mr-2`)}></i> ${escape_html(safeTranslate(actorType))}</span></dd></div> `;
  if (specific) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="grid grid-cols-1 gap-1 py-3 px-4 even:bg-surface-50 sm:grid-cols-3 sm:gap-4"><dt class="font-medium text-gray-900">${escape_html(safeTranslate(actorType))}</dt> <dd class="text-gray-700 sm:col-span-2">`;
    Anchor($$payload, {
      breadcrumbAction: "push",
      href: getTypeUrl(actorType, specific.id),
      class: "anchor",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(specific.str || specific.name || specific.email)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></dd></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-1 gap-1 py-3 px-4 even:bg-surface-50 sm:grid-cols-3 sm:gap-4"><dt class="font-medium text-gray-900">${escape_html(refid1())}</dt> <dd class="text-gray-700 sm:col-span-2 font-mono text-xs">${escape_html(data.data.id)}</dd></div></dl></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-COavKC_3.js.map
