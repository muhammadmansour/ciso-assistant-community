import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { e as emailSchema } from './schemas-Cmsh2Wi5.js';
import { T as TextField } from './TextField--8TVvuvT.js';
import { F as Form } from './Form-D44apvvs.js';
import { HI as forgtpassword1, JD as enteryouremail2, Hj as gobacktologin3, f0 as email, s0 as send } from './_index-BNamVw9A.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { L as Logo } from './Logo-CCjdFrZ1.js';
import './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './utils-FiC4zhrQ.js';
import './i18n-CnZlshhm.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './runtime-B_ICGJZJ.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="flex flex-col items-center justify-center min-h-screen bg-slate-200 px-4"><div class="flex flex-col items-center w-full max-w-md space-y-6">`;
  Logo($$payload, {});
  $$payload.out += `<!----> <div class="w-full p-6 shadow-lg rounded-lg bg-white"><div id="password_reset" class="flex flex-col items-center space-y-4"><div class="bg-primary-300 px-6 py-5 rounded-full text-3xl"><i class="fa-solid fa-lock"></i></div> <h3 class="font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">${escape_html(forgtpassword1())}</h3> <p class="text-center text-gray-600 text-sm">${escape_html(enteryouremail2())}.</p> <div>`;
  {
    let children = function($$payload2, { form }) {
      TextField($$payload2, {
        type: "email",
        form,
        field: "email",
        label: email()
      });
      $$payload2.out += `<!----> <p class="pt-3"><button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="send-btn" type="submit">${escape_html(send())}</button></p>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-3",
      data: data?.form,
      dataType: "form",
      validators: zod(emailSchema),
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div> <a href="/login" class="flex items-center space-x-2 text-primary-800 hover:text-primary-600"><i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktologin3())}</p></a></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-7eUnWpP4.js.map
