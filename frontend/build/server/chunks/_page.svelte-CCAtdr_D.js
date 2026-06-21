import { p as push, V as escape_html, a as pop, T as attr } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import { F as Form } from './Form-BvVZStO5.js';
import { T as TextField } from './TextField-BQRX5bXK.js';
import { a as SetPasswordSchema } from './schemas-BwimqDbp.js';
import { kQ as youcansetnewpassword4, og as userwillbedisconnected3, Dm as newpassword1, Qf as confirmnewpassword2, b0 as setpassword1 } from './_index-DiaVtc2Z.js';
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
  function getUUID() {
    const matches = page.url.pathname.split("/");
    return matches ? matches[2] : null;
  }
  $$payload.out += `<div class="flex w-full h-full items-center justify-center"><div class="flex flex-col bg-white p-12 w-2/5 rounded-lg shadow-lg items-center space-y-4"><div class="bg-primary-300 px-6 py-5 rounded-full text-3xl"><i class="fa-solid fa-key"></i></div> <p class="text-gray-600 text-sm text-center">${escape_html(youcansetnewpassword4())}.<br/> ${escape_html(userwillbedisconnected3())}.</p> <div class="flex w-full">`;
  {
    let children = function($$payload2, { form }) {
      $$payload2.out += `<input class="input" type="hidden" name="user"${attr("value", getUUID())}/> `;
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
      $$payload2.out += `<!----> <p class="pt-3"><button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="save-button" type="submit">${escape_html(setpassword1())}</button></p>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-3 w-full",
      data: data?.form,
      dataType: "form",
      validators: zod(SetPasswordSchema),
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CCAtdr_D.js.map
