import { p as push, V as escape_html, a as pop, af as await_block, ag as element, S as attr_class } from './index2-9icAqEyj.js';
import { F as Form } from './Form-B7HJg_JV.js';
import { T as TextField } from './TextField-DpgyqBxf.js';
import { R as ResetPasswordSchema } from './schemas-BcDBvyDd.js';
import { ks as youcansetpasswordhere4, GD as hellothere1, pc as thisiscisoassistant3, kp as yourstreamlined1, AI as onestopshop2, Hi as forcomplianceriskmanagement3, Ce as newpassword1, OM as confirmnewpassword2, aD as setpassword1 } from './_index-DEXNURl5.js';
import './formData-F7m95JiK.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import { L as Logo } from './Logo-CCjdFrZ1.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './utils-FiC4zhrQ.js';
import './i18n-WNCV45cf.js';
import './runtime-BMNt81Gy.js';
import './index-server-D2ILrLnm.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

function Typewriter($$payload, $$props) {
  push();
  let {
    mode = "concurrent",
    interval = 30,
    cursor = true,
    keepCursorOnFinish = false,
    delay = 0,
    showCursorOnDelay = false,
    disabled = false,
    element: element$1 = "div",
    scrambleDuration = mode === "scramble" ? 3e3 : 0,
    scrambleSlowdown = mode === "scramble" ? true : false,
    unwriteInterval = /^loop(Once|Random)?$/.test(mode) ? 30 : 0,
    wordInterval = /^loop(Once|Random)?$/.test(mode) ? 1500 : 0,
    children
  } = $$props;
  let isLoopMode = /^loop(Once|Random)?$/.test(mode);
  let isFiniteCursorMode = ["concurrent", "cascade", "loopOnce"].includes(mode);
  let invalidCursorOnFinish = !isFiniteCursorMode && keepCursorOnFinish;
  let invalidCursorOnDelay = delay < 1 && showCursorOnDelay;
  let invalidLoopProps = !isLoopMode && (unwriteInterval || wordInterval);
  let invalidScrambleProps = mode !== "scramble" && (scrambleDuration || scrambleSlowdown);
  let unnecessaryCursorOnFinish = typeof keepCursorOnFinish === "number" && keepCursorOnFinish < 1;
  const modes = {
    concurrent: () => import('./concurrent-6XVlNl1E.js'),
    cascade: () => import('./cascade-DTQsLOWf.js'),
    loop: () => import('./loop-C4UtxSEn.js'),
    loopOnce: () => import('./loopOnce-6j2HFMc5.js'),
    loopRandom: () => import('./loopRandom-DuvB85Os.js'),
    scramble: () => import('./scramble-DXkbgbmS.js')
  };
  run(() => {
    invalidCursorOnFinish && console.warn("[svelte-typewriter] The prop 'keepCursorOnFinish' is compatible only with finite modes");
  });
  run(() => {
    invalidCursorOnDelay && console.warn("[svelte-typewriter] The prop 'showCursorOnDelay' has no effect if the delay is 0");
  });
  run(() => {
    invalidLoopProps && console.warn("[svelte-typewriter] The props 'unwriteInterval' and 'wordInterval' are only compatible with loop modes");
  });
  run(() => {
    invalidScrambleProps && console.warn("[svelte-typewriter] The props 'scrambleDuration' and 'scrambleSlowdown' are only compatible with scramble mode");
  });
  run(() => {
    unnecessaryCursorOnFinish && console.warn("[svelte-typewriter] The prop 'keepCursorOnFinish' has no effect with values lower than 1");
  });
  let delayPromise = () => new Promise((resolve) => setTimeout(() => resolve(delay), delay));
  $$payload.out += `<noscript class="svelte-1mi9zgz">`;
  children?.($$payload);
  $$payload.out += `<!----></noscript> <!---->`;
  {
    if (disabled) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="typewriter-container svelte-1mi9zgz">`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      await_block(
        $$payload,
        delayPromise(),
        () => {
          if (showCursorOnDelay) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="typewriter-container cursor svelte-1mi9zgz"><p class="typing svelte-1mi9zgz"></p></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        },
        () => {
          await_block($$payload, modes[mode](), () => {
          }, (selectedMode) => {
            element(
              $$payload,
              element$1,
              () => {
                $$payload.out += `${attr_class("typewriter-container svelte-1mi9zgz", void 0, { "cursor": cursor })}`;
              },
              () => {
                children?.($$payload);
                $$payload.out += `<!---->`;
              }
            );
          });
          $$payload.out += `<!--]-->`;
        }
      );
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!---->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="flex flex-col items-center justify-center min-h-screen bg-slate-200 px-4"><div class="flex flex-col items-center w-full max-w-lg space-y-6">`;
  Logo($$payload, {});
  $$payload.out += `<!----> <div id="hellothere" class="flex flex-col justify-center items-center w-full text-gray-900">`;
  Typewriter($$payload, {
    mode: "loopOnce",
    cursor: false,
    interval: 50,
    children: ($$payload2) => {
      $$payload2.out += `<div class="text-2xl unstyled text-center pb-4"><span class="text-2xl text-center">${escape_html(hellothere1())} 👋</span> <span>${escape_html(thisiscisoassistant3())}.</span></div>`;
    }
  });
  $$payload.out += `<!----> `;
  Typewriter($$payload, {
    mode: "cascade",
    cursor: false,
    interval: 45,
    delay: 5e3,
    children: ($$payload2) => {
      $$payload2.out += `<div class="text-2xl unstyled text-center"><span>${escape_html(yourstreamlined1())}</span> <span class="font-black">${escape_html(onestopshop2())}</span> <span>${escape_html(forcomplianceriskmanagement3())}.</span></div>`;
    }
  });
  $$payload.out += `<!----></div> <div class="flex flex-col bg-white p-12 rounded-lg shadow-lg items-center space-y-4 w-full"><div class="bg-primary-300 px-6 py-5 rounded-full text-3xl"><i class="fa-solid fa-key"></i></div> <p class="text-gray-600 text-sm text-center">${escape_html(youcansetpasswordhere4())}<br/></p> <div class="flex w-full">`;
  {
    let children = function($$payload2, { form }) {
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
      $$payload2.out += `<!----> <p class="pt-3"><button class="btn preset-filled-primary-500 font-semibold w-full" type="submit" data-testid="set-password-btn">${escape_html(setpassword1())}</button></p>`;
    };
    Form($$payload, {
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
//# sourceMappingURL=_page.svelte-CrvLCq2X.js.map
