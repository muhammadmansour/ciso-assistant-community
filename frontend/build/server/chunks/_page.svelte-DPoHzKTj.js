import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import { L as Logo } from './Logo-CCjdFrZ1.js';
import { F as Form } from './Form-BvVZStO5.js';
import { T as TextField } from './TextField-BQRX5bXK.js';
import { R as ResetPasswordSchema } from './schemas-BwimqDbp.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { vb as resetpasswordhere2, Dm as newpassword1, Qf as confirmnewpassword2, vc as resetpassword1 } from './_index-DiaVtc2Z.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './utils-FiC4zhrQ.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="flex flex-col items-center justify-center min-h-screen bg-slate-200 px-4"><div class="flex flex-col items-center w-full max-w-md space-y-6">`;
  Logo($$payload, {});
  $$payload.out += `<!----> <div class="flex flex-col bg-white p-12 rounded-lg shadow-lg items-center space-y-4 w-full"><div class="bg-primary-300 px-6 py-5 rounded-full text-3xl"><i class="fa-solid fa-key"></i></div> <p class="text-gray-600 text-sm text-center">${escape_html(resetpasswordhere2())}<br/></p> <div class="flex w-full">`;
  {
    let children = function($$payload2, { form }) {
      TextField($$payload2, {
        type: "hidden",
        hidden: true,
        form,
        field: "uidb64",
        label: ""
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        type: "hidden",
        hidden: true,
        form,
        field: "token",
        label: ""
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
      $$payload2.out += `<!----> <p class="pt-3"><button class="btn preset-filled-primary-500 font-semibold w-full" type="submit" data-testid="set-password-btn">${escape_html(resetpassword1())}</button></p>`;
    };
    Form($$payload, {
      action: `${page.url.pathname}${page.url.search}`,
      class: "flex flex-col space-y-3 w-full",
      data: data?.form,
      dataType: "form",
      validators: zod(ResetPasswordSchema),
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DPoHzKTj.js.map
