import { p as push, W as ensure_array_like, V as escape_html, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { Cw as myusergroups2, Sf as builtin, QT as changepassword1, e as edit, aD as settings } from './_index-CqZWReca.js';
import { s as safeTranslate, t as toCamelCase } from './i18n-DuIONS9Q.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './breadcrumbs-D1ratxIQ.js';

function _page($$payload, $$props) {
  push();
  function filterUserData() {
    const filtered = {};
    const filter = ["id", "is_active"];
    const sortedKeys = [
      "last_name",
      "first_name",
      "email",
      "date_joined"
    ];
    sortedKeys.forEach((key) => {
      if (!filter.includes(key) && Object.prototype.hasOwnProperty.call(page.data.user, key)) {
        const str = toCamelCase(key);
        if (key === "date_joined") filtered[str] = new Date(page.data.user[key]).toLocaleString(getLocale());
        else filtered[str] = page.data.user[key];
      }
    });
    return filtered;
  }
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: "user",
    domain: user.root_folder_id
  });
  let { data } = $$props;
  const each_array = ensure_array_like(Object.entries(filterUserData()));
  const each_array_1 = ensure_array_like(data.currentUser.user_groups);
  $$payload.out += `<div class="flex flex-col bg-white card shadow-lg p-4 space-y-4"><div class="flex flex-row items-center justify-between"><h1 class="text-xl font-semibold">${escape_html(data.currentUser.first_name)}
			${escape_html(data.currentUser.last_name)}</h1> <div>`;
  if (user.is_local) {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href: "my-profile/change-password",
      class: "btn preset-filled-primary-500 h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-key mr-2"></i>${escape_html(changepassword1())}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (canEditObject) {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href: `/users/${stringify(data.currentUser.id)}/edit?next=/my-profile`,
      class: "btn preset-filled-primary-500 h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2"></i>${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  Anchor($$payload, {
    href: "my-profile/settings",
    class: "btn preset-filled-primary-500 h-fit",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-sliders mr-2"></i>${escape_html(settings())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div class="flex flex-row w-full space-x-2"><div class="flex flex-col w-1/2 card bg-white p-2 space-y-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [label, value] = each_array[$$index];
    $$payload.out += `<div class="flex flex-col"><p class="font-semibold text-sm">${escape_html(safeTranslate(label))}</p> <p class="text-sm">${escape_html(value)}</p></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-col w-1/2 card bg-white p-2 space-y-4"><h2 class="text-xl mb-1 font-semibold">${escape_html(myusergroups2())}</h2> <div class="overflow-auto space-y-2"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let group = each_array_1[$$index_1];
    $$payload.out += `<div class="flex flex-row items-center">`;
    if (group.builtin) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge preset-tonal-primary mr-2">${escape_html(builtin())}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <p class="font-semibold text-sm">${escape_html(group.str)}</p></div>`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CoNqY9FH.js.map
