import { p as push, M as store_get, S as attr_class, V as escape_html, X as stringify, U as clsx, T as attr, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import { bp as cancel, kH as submit } from './_index-BNamVw9A.js';
import { S as SuperDebug } from './Form-D44apvvs.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';

function DeleteConfirmModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  const cBase = "card bg-white p-6 w-modal space-y-6 rounded-2xl border border-gray-100 shadow-2xl";
  const cHeader = "text-xl font-bold text-gray-900";
  const cForm = "space-y-4";
  let {
    parent,
    _form,
    URLModel,
    formAction = "?/delete",
    invalidateAll = true,
    id,
    debug = false
  } = $$props;
  const { form, enhance } = superForm(_form, { invalidateAll });
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)} role="dialog" aria-modal="true" aria-labelledby="modal-title"><header id="modal-title"${attr_class(clsx(cHeader))} data-testid="modal-title">${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> <article>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body ?? "(body missing)")}</article> `;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-sm text-gray-500">Loading...</div>`;
    }
    $$payload.out += `<!--]--> <form method="POST"${attr("action", formAction)}${attr_class(`modal-form ${stringify(cForm)}`)}><footer class="flex gap-3 justify-end pt-4 border-t border-gray-200"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" data-testid="delete-cancel-button">${escape_html(cancel())}</button> <input type="hidden" name="urlmodel"${attr("value", URLModel)}/> <input type="hidden" name="id"${attr("value", id)}/> <button class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-sm transition-all" data-testid="delete-confirm-button" type="submit">${escape_html(submit())}</button></footer></form> `;
    if (debug === true) {
      $$payload.out += "<!--[-->";
      SuperDebug($$payload, {
        data: store_get($$store_subs ??= {}, "$form", form)
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { DeleteConfirmModal as D };
//# sourceMappingURL=DeleteConfirmModal-D06m6CiP.js.map
