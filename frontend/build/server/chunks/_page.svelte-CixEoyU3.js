import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import { F as Form } from './Form-BvVZStO5.js';
import { T as TextField } from './TextField-BQRX5bXK.js';
import { R as ResetPasswordSchema } from './schemas-BwimqDbp.js';
import { G as Greetings } from './Greetings-DfMLaT9e.js';
import { HW as hellothere1, kP as youcansetpasswordhere4, Dm as newpassword1, Qf as confirmnewpassword2, b0 as setpassword1 } from './_index-DiaVtc2Z.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
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
import './runtime-BKo9q3Zd.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="min-h-screen flex"><div class="hidden lg:flex lg:w-[55%] bg-[#0A1628] flex-col relative overflow-hidden"><div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0077CC]/5 -translate-y-1/3 translate-x-1/4"></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00A3E0]/5 translate-y-1/3 -translate-x-1/4"></div> <div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#0077CC]/[0.03] -translate-x-1/2 -translate-y-1/2"></div> <div class="relative z-10 w-full px-12 flex-1 flex items-center justify-center"><div class="w-full">`;
  Greetings($$payload);
  $$payload.out += `<!----></div></div></div> <div class="flex-1 flex flex-col bg-gray-50 px-6 py-12"><div class="w-full max-w-[420px] mx-auto flex-1 flex items-center"><div class="w-full"><div class="lg:hidden flex items-center gap-3 mb-10"><div class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center font-bold text-white text-lg">W</div> <span class="font-semibold text-xl text-[#0A1628] tracking-tight">WathbahGRC</span></div> <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"><div class="w-16 h-16 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-2xl flex items-center justify-center shadow-lg mb-6"><i class="fa-solid fa-key text-white text-2xl"></i></div> <div class="text-center mb-6"><h3 class="text-2xl font-bold text-gray-900">${escape_html(hellothere1())} 👋</h3> <p class="text-gray-500 text-sm mt-1">${escape_html(youcansetpasswordhere4())}</p></div> <div class="w-full">`;
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
      $$payload2.out += `<!----> <button class="btn w-full bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-semibold py-3 rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200" type="submit" data-testid="set-password-btn">${escape_html(setpassword1())}</button>`;
    };
    Form($$payload, {
      action: `${page.url.pathname}${page.url.search}`,
      class: "flex flex-col space-y-4",
      data: data?.form,
      dataType: "form",
      validators: zod(ResetPasswordSchema),
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div></div> <p class="text-center text-xs text-gray-400 mt-6">Protected by enterprise-grade security</p></div></div> <div class="flex flex-col items-center gap-1.5 pb-2 pt-6"><a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer"><img src="/wathba_logo_full.png" alt="Wathbah" class="h-10 hover:opacity-90 transition-opacity"/></a></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CixEoyU3.js.map
