import { p as push, W as ensure_array_like, S as attr_class, V as escape_html, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';
import { F as Form } from './Form-BvVZStO5.js';
import { T as TextField } from './TextField-BQRX5bXK.js';
import { l as loginSchema } from './schemas-BwimqDbp.js';
import './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './utils-FiC4zhrQ.js';
import './_index-DiaVtc2Z.js';
import './runtime-BKo9q3Zd.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const adminFeatures = [
    {
      icon: "fa-solid fa-microscope",
      title: "Audit Studio",
      desc: "Build context sessions with requirements and queries"
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "Prompt Management",
      desc: "Configure and tune AI prompt templates"
    },
    {
      icon: "fa-solid fa-folder-tree",
      title: "File Collections",
      desc: "Manage evidence stores and file indexing"
    },
    {
      icon: "fa-solid fa-sliders",
      title: "System Config",
      desc: "Global settings, integrations, and API keys"
    }
  ];
  let activeIndex = 0;
  let loading = false;
  const each_array = ensure_array_like(adminFeatures);
  const each_array_1 = ensure_array_like(adminFeatures);
  $$payload.out += `<div class="min-h-screen flex flex-col lg:flex-row"><div class="hidden lg:flex lg:w-[55%] bg-[#0A1628] relative overflow-hidden items-center justify-center"><div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0077CC]/5 -translate-y-1/3 translate-x-1/4"></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00A3E0]/5 translate-y-1/3 -translate-x-1/4"></div> <div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#0077CC]/[0.03] -translate-x-1/2 -translate-y-1/2"></div> <div class="relative z-10 w-full px-12"><div class="flex flex-col items-center text-center"><div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] mb-6"><i class="fa-solid fa-gear text-[#00A3E0] text-xs"></i> <span class="text-white/90 text-xs font-semibold uppercase tracking-widest">Admin Console</span></div> <div class="text-5xl font-extrabold tracking-tight mb-1"><span class="text-[#0077CC]">W</span><span class="text-white">athbahGRC</span></div> <h2 class="text-2xl font-bold text-white mb-4">Admin</h2> <p class="text-gray-400 text-base leading-relaxed max-w-md mb-10">Manage audit sessions, AI prompts, file collections, and system configuration.</p> <div class="w-full max-w-2xl"><div class="relative h-14 overflow-hidden"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let feature = each_array[i];
    $$payload.out += `<div${attr_class(`absolute inset-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 ease-out ${stringify(i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}`)}><div class="w-9 h-9 rounded-lg bg-[#0077CC]/15 flex items-center justify-center flex-shrink-0"><i${attr_class(`${stringify(feature.icon)} text-[#00A3E0] text-[18px]`)}></i></div> <span class="text-white text-sm font-semibold whitespace-nowrap">${escape_html(feature.title)}</span> <span class="w-px h-4 bg-white/10 flex-shrink-0"></span> <span class="text-gray-400 text-sm whitespace-nowrap">${escape_html(feature.desc)}</span></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex items-center justify-center gap-2 mt-5"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    each_array_1[i];
    $$payload.out += `<button${attr_class(`h-1.5 rounded-full transition-all duration-300 ${stringify(i === activeIndex ? "w-6 bg-[#00A3E0]" : "w-1.5 bg-white/20 hover:bg-white/30")}`)}${attr("aria-label", `Feature ${stringify(i + 1)}`)}></button>`;
  }
  $$payload.out += `<!--]--></div></div></div></div></div> <div class="flex-1 bg-gray-50 flex flex-col px-6 py-6"><div class="mb-8"><a href="/login" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"><i class="fa-solid fa-arrow-left text-xs"></i> Back to WathbahGRC</a></div> <div class="flex-1 flex items-center justify-center"><div class="w-full max-w-[420px]"><div class="lg:hidden flex items-center gap-3 mb-10"><div class="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center font-bold text-white text-lg">W</div> <span class="font-semibold text-xl text-[#0A1628] tracking-tight">WathbahGRC Admin</span></div> <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"><div class="flex flex-col w-full space-y-5"><div class="flex items-center gap-3"><div class="w-11 h-11 bg-gradient-to-br from-[#0A1628] to-[#1a2740] rounded-xl flex items-center justify-center shadow-lg"><i class="fa-solid fa-gear text-white text-lg"></i></div> <div><h3 class="text-xl font-bold text-gray-900">Admin Sign In</h3> <p class="text-gray-400 text-xs">Enter your administrator credentials to continue</p></div></div> <div class="w-full">`;
  {
    let children = function($$payload2, { form: formInstance }) {
      $$payload2.out += `<div><label for="admin-email" class="block text-sm font-semibold text-gray-700 mb-1.5">Admin Email</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10"><i class="fa-solid fa-envelope text-gray-400 text-sm"></i></div> <div class="admin-field-wrapper">`;
      TextField($$payload2, {
        type: "email",
        form: formInstance,
        field: "username",
        label: ""
      });
      $$payload2.out += `<!----></div></div></div> <div><label for="admin-password" class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10"><i class="fa-solid fa-lock text-gray-400 text-sm"></i></div> <div class="admin-field-wrapper">`;
      TextField($$payload2, {
        type: "password",
        form: formInstance,
        field: "password",
        label: ""
      });
      $$payload2.out += `<!----></div></div></div> <button class="btn w-full bg-[#0A1628] text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-[#1a2740] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" type="submit"${attr("disabled", loading, true)}>`;
      if (loading) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"></circle><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="opacity-75"></path></svg> Signing in...`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `Sign in to Admin`;
      }
      $$payload2.out += `<!--]--></button>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-4",
      data: data?.form,
      dataType: "form",
      validators: zod(loginSchema),
      taintedMessage: null,
      action: "?/login",
      onSubmit: ({ cancel, formElement }) => {
        loading = true;
        cancel();
        formElement.submit();
      },
      children,
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div></div></div> <p class="text-center text-xs text-gray-400 mt-6">Protected by enterprise-grade security</p> <div class="mt-8 flex flex-col items-center gap-1.5"><span class="text-gray-400 text-xs">Powered by</span> <a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer"><img src="/wathba_logo_full.png" alt="Wathbah" class="h-10 hover:opacity-90 transition-opacity"/></a></div></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-f3tC5mhp.js.map
