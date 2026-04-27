import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { e as emailSchema } from './schemas-5y-ookeO.js';
import { T as TextField } from './TextField-6ZKq0gis.js';
import { F as Form } from './Form-BuUIlHHA.js';
import { Hm as forgtpassword1, Jh as enteryouremail2, GZ as gobacktologin3, eS as email, rW as send } from './_index-CqZWReca.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { L as Logo } from './Logo-CCjdFrZ1.js';
import './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './utils-FiC4zhrQ.js';
import './i18n-DuIONS9Q.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './runtime-BKo9q3Zd.js';
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
//# sourceMappingURL=_page.svelte-DRGBv4tr.js.map
