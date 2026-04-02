import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { F as Form } from './Form-DhMvl6-W.js';
import { T as TextField } from './TextField-DcYrBXVU.js';
import { C as ChangePasswordSchema } from './schemas-DxPQoveO.js';
import { QS as changepasswordtext2, AZ as oldpassword1, Cs as newpassword1, OZ as confirmnewpassword2, bp as cancel, QT as changepassword1 } from './_index-Syqrsmaf.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './utils-FiC4zhrQ.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-B-ZrD2ao.js';
import './runtime-BKo9q3Zd.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="flex w-full h-full items-center justify-center"><div class="flex flex-col bg-white p-12 w-2/5 rounded-lg shadow-lg items-center space-y-4"><div class="bg-primary-300 px-6 py-5 rounded-full text-3xl"><i class="fa-solid fa-key"></i></div> <p class="text-gray-600 text-sm text-center">${escape_html(changepasswordtext2())}.</p> <div class="flex w-full">`;
  {
    let children = function($$payload2, { form }) {
      TextField($$payload2, {
        type: "password",
        form,
        field: "old_password",
        label: oldpassword1()
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        type: "password",
        form,
        field: "new_password",
        label: newpassword1()
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        type: "password",
        form,
        field: "confirm_new_password",
        label: confirmnewpassword2()
      });
      $$payload2.out += `<!----> <div class="flex flex-row space-x-2 pt-3"><a class="btn bg-gray-400 text-white font-semibold w-full" href="/my-profile" data-testid="cancel-button" type="button">${escape_html(cancel())}</a> <button class="btn preset-filled-primary-500 font-semibold w-full" type="submit" data-testid="save-button">${escape_html(changepassword1())}</button></div>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-3 w-full",
      data: data?.form,
      dataType: "form",
      validators: zod(ChangePasswordSchema),
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-8kx_IrtF.js.map
