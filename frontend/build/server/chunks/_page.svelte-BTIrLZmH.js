import { G as Greetings } from './Greetings-DfMLaT9e.js';
import { p as push, V as escape_html, X as stringify, a as pop, T as attr, M as store_get, S as attr_class, U as clsx, Q as unsubscribe_stores, a3 as store_set, O as copy_payload, P as assign_payload, W as ensure_array_like, Z as attr_style, R as bind_props } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { F as Form } from './Form-D44apvvs.js';
import { T as TextField } from './TextField--8TVvuvT.js';
import { l as loginSchema } from './schemas-Cmsh2Wi5.js';
import { p as page } from './index3-BwfRm5YV.js';
import './constants-B8vm30bZ.js';
import { g as superForm, f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './utils-FiC4zhrQ.js';
import { s as safeTranslate } from './i18n-CnZlshhm.js';
import { m as mfaAuthenticateSchema } from './145-CqYn4kSo.js';
import { Ex as logintoyouraccount3, kM as youneedtologin4, iS as or, Et as loginsso3, JF as entercodegeneratedbyapp4, Dh as mfaauthenticatetitle2, HI as forgtpassword1, Ev as login, Es as loginusingrecoverycode3, f0 as email, Ah as password } from './_index-BNamVw9A.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './helpers-Bm9n0CNG.js';
import './index-BWA_9C9m.js';
import './superValidate-BmtJFExL.js';

function OTPItem($$payload, $$props) {
  push();
  let {
    input = null,
    index,
    value = void 0,
    codes = void 0,
    inputs,
    className,
    num,
    style,
    placeholder
  } = $$props;
  $$payload.out += `<input${attr_class(`${stringify(className)} input w-24 h-24 text-4xl text-center`)}${attr_style(style)}${attr("value", value)}${attr("placeholder", placeholder)}/>`;
  bind_props($$props, { input, value, codes });
  pop();
}
function OTPInput($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    field = "code",
    form,
    numOfInputs = 6,
    separator = "",
    inputClass = "",
    wrapperClass = "",
    separatorClass = "",
    inputStyle = "",
    wrapperStyle = "",
    separatorStyle = "",
    numberOnly = true,
    placeholder = "",
    onlyShowMiddleSeparator = false,
    clearOnError = true
  } = $$props;
  const { value, errors } = formFieldProxy(form, field);
  let codes = [
    ...store_get($$store_subs ??= {}, "$value", value).slice(0, numOfInputs).split(""),
    ...Array(numOfInputs <= store_get($$store_subs ??= {}, "$value", value).length ? 0 : numOfInputs - store_get($$store_subs ??= {}, "$value", value).length).fill("")
  ];
  let inputs = Array(numOfInputs).fill(null);
  function reset() {
    store_set(value, "");
    codes = Array(numOfInputs).fill("");
    inputs[0]?.focus();
  }
  run(() => {
    if (store_get($$store_subs ??= {}, "$errors", errors) && clearOnError) {
      reset();
    }
  });
  let placeholders = placeholder.length < numOfInputs ? [
    ...placeholder.split(""),
    ...Array(numOfInputs - placeholder.length).fill("")
  ] : placeholder.split("");
  run(() => {
    store_set(value, codes.join(""));
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array_1 = ensure_array_like(codes);
    if (store_get($$store_subs ??= {}, "$errors", errors)) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
      $$payload2.out += `<div><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let error = each_array[$$index];
        $$payload2.out += `<p class="text-error-500 text-xs font-medium">${escape_html(safeTranslate(error))}</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div${attr_class(`wrapper ${wrapperClass}`, "svelte-zmx5mm")}${attr_style(wrapperStyle)}><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      each_array_1[i];
      OTPItem($$payload2, {
        num: numberOnly,
        index: i,
        inputs,
        className: inputClass,
        style: inputStyle,
        placeholder: placeholders[i],
        get input() {
          return inputs[i];
        },
        set input($$value) {
          inputs[i] = $$value;
          $$settled = false;
        },
        get value() {
          return codes[i];
        },
        set value($$value) {
          codes[i] = $$value;
          $$settled = false;
        },
        get codes() {
          return codes;
        },
        set codes($$value) {
          codes = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      if (separator && i !== codes.length - 1 && (!onlyShowMiddleSeparator || onlyShowMiddleSeparator && i === codes.length / 2 - 1 && numOfInputs % 2 === 0)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span${attr_class(clsx(separatorClass), "svelte-zmx5mm")}${attr_style(separatorStyle)}>${escape_html(separator)}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function MFAAuthenticateModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  const cBase = "card bg-surface-50 p-4 w-modal shadow-xl space-y-4";
  const cHeader = "text-2xl font-bold";
  const cForm = "p-4 space-y-4 rounded-container";
  let { parent, _form, formAction } = $$props;
  const form = superForm(_form, {
    dataType: "json",
    validators: zod(mfaAuthenticateSchema),
    validationMethod: "onsubmit",
    onUpdated: async ({ form: form2 }) => {
      if (form2.valid && parent && typeof parent.onConfirm === "function") {
        parent.onConfirm();
      }
    }
  });
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)}><header${attr_class(clsx(cHeader))}>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> <article>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body ?? "(body missing)")}</article> <article class="flex flex-col space-y-4 items-center">`;
    {
      let children = function($$payload2, { form: form2 }) {
        {
          $$payload2.out += "<!--[-->";
          OTPInput($$payload2, { form: form2, field: "code" });
        }
        $$payload2.out += `<!--]--> <footer${attr_class(`modal-footer ${stringify(parent.regionFooter)}`)}><button type="button" class="btn hover:underline" data-testid="mfa-authenticate-confirm-button">`;
        {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `${escape_html(loginusingrecoverycode3())}`;
        }
        $$payload2.out += `<!--]--></button> <button class="btn preset-filled-primary-500" data-testid="mfa-authenticate-confirm-button" type="submit">${escape_html(login())}</button></footer>`;
      };
      Form($$payload, {
        dataType: "json",
        action: formAction,
        data: _form,
        _form: form,
        validators: zod(mfaAuthenticateSchema),
        class: `modal-form ${stringify(cForm)}`,
        validationMethod: "onsubmit",
        children,
        $$slots: { default: true }
      });
    }
    $$payload.out += `<!----></article></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function FormCard($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let loading = false;
  const modalStore = getModalStore();
  function modalMFAAuthenticate() {
    const modalComponent = {
      ref: MFAAuthenticateModal,
      props: {
        _form: data.mfaAuthenticateForm,
        formAction: "?/mfaAuthenticate"
      }
    };
    const modal = {
      type: "component",
      component: modalComponent,
      // Data
      title: mfaauthenticatetitle2(),
      body: entercodegeneratedbyapp4()
    };
    modalStore.trigger(modal);
  }
  run(() => {
    if (form) {
      loading = false;
      if (form.mfaFlow) modalMFAAuthenticate();
    }
  });
  $$payload.out += `<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"><div data-testid="login" class="flex flex-col w-full items-center space-y-5"><div class="w-16 h-16 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-2xl flex items-center justify-center shadow-lg"><i class="fa-solid fa-right-to-bracket text-white text-2xl"></i></div> <div class="text-center"><h3 class="text-2xl font-bold text-gray-900">${escape_html(logintoyouraccount3())}</h3> <p class="text-gray-500 text-sm mt-1">${escape_html(youneedtologin4())}</p></div> <div class="w-full">`;
  {
    let children = function($$payload2, { form: form2 }) {
      TextField($$payload2, {
        type: "email",
        form: form2,
        field: "username",
        label: email()
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        type: "password",
        form: form2,
        field: "password",
        label: password()
      });
      $$payload2.out += `<!----> <div class="flex flex-row justify-end"><a href="/password-reset" class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors" data-testid="forgot-password-btn">${escape_html(forgtpassword1())}?</a></div> <button class="btn w-full bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-semibold py-3 rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-testid="login-btn" type="submit"${attr("disabled", loading, true)}>`;
      if (loading) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"></circle><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75"></path></svg>${escape_html(login())}...`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(login())}`;
      }
      $$payload2.out += `<!--]--></button>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-4",
      data: data?.form,
      dataType: "form",
      validators: zod(loginSchema),
      taintedMessage: null,
      action: `?/login&next=${stringify(page.url.searchParams.get("next") || "/")}`,
      onSubmit: ({ cancel, formElement }) => {
        loading = true;
        cancel();
        formElement.submit();
      },
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div> `;
  if (data.SSOInfo.is_enabled) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex items-center justify-center w-full space-x-3"><hr class="flex-1 bg-gray-200 border-0 h-px"/> <span class="text-gray-400 text-sm">${escape_html(or())}</span> <hr class="flex-1 bg-gray-200 border-0 h-px"/></div> <button class="btn w-full bg-[#0A1628] hover:bg-[#1a2740] text-white font-semibold py-3 rounded-lg transition-all duration-200">${escape_html(loginsso3())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  let { data, form } = $$props;
  $$payload.out += `<div class="min-h-screen flex flex-col lg:flex-row"><div class="hidden lg:flex lg:w-[55%] bg-[#0A1628] relative overflow-hidden items-center justify-center"><div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0077CC]/5 -translate-y-1/3 translate-x-1/4"></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00A3E0]/5 translate-y-1/3 -translate-x-1/4"></div> <div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#0077CC]/[0.03] -translate-x-1/2 -translate-y-1/2"></div> <div class="relative z-10 w-full px-12">`;
  Greetings($$payload);
  $$payload.out += `<!----></div></div> <div class="flex-1 bg-gray-50 flex items-center justify-center px-6 py-6"><div class="w-full max-w-[420px]"><div class="lg:hidden flex items-center gap-3 mb-10"><div class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center font-bold text-white text-lg">W</div> <span class="font-semibold text-xl text-[#0A1628] tracking-tight">WathbahGRC</span></div> `;
  FormCard($$payload, { data, form });
  $$payload.out += `<!----> <p class="text-center text-xs text-gray-400 mt-6">Protected by enterprise-grade security</p> <div class="mt-8 flex flex-col items-center gap-1.5"><span class="text-gray-400 text-xs">Powered by</span> <a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer"><img src="/wathba_logo_full.png" alt="Wathbah" class="h-10 hover:opacity-90 transition-opacity"/></a></div></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BTIrLZmH.js.map
