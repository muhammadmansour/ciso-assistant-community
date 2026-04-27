import { M as store_get, N as getContext, O as copy_payload, P as assign_payload, Q as unsubscribe_stores, R as bind_props, a as pop, S as attr_class, T as attr, U as clsx, V as escape_html, W as ensure_array_like, X as stringify, Y as spread_props, p as push, Z as attr_style, _ as spread_attributes, $ as source, a0 as render_effect, f as set, n as noop$1, a1 as deferred, g as get$2, a2 as hasContext, s as setContext, a3 as store_set, a4 as derived, a5 as clsx$1, a6 as props_id, a7 as run$1, a8 as ATTACHMENT_KEY } from './index2-9icAqEyj.js';
import { r as run, o as on } from './legacy-server-DMdb6ZTL.js';
import { D as updatethislibrary2, E as couldnotfindattachmentmessage4, F as nopreviewmessage3, G as loading, H as libraryoverview1, I as suggestedparentheses1, J as deselect, K as select, L as successfullyupdatedobject2, M as errorupdatingobject2, N as changestatus1, O as changeimpact1, P as changeeffort1, Q as changecsffunction2, R as changepriority1, S as changeattackstage2, T as appliedcontrol1, U as evidence, V as tasknode1, W as elementaryaction1 } from './_index-CqZWReca.js';
import { L as LOCALE_DISPLAY_MAP } from './constants-QzmVibOJ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './index3-BwfRm5YV.js';
import './stores-D-WMoATo.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { o as onDestroy, t as tick } from './index-server-DEEfjxiI.js';
import { a as getSearchTarget, n as normalizeSearchString } from './helpers-Bm9n0CNG.js';
import { h as html } from './html-FW6Ia4bL.js';
import { g as getFlash } from './client.svelte-CxCno2aW.js';
import { p as page$1 } from './stores3-psVfZSQ7.js';
import { computePosition, offset, shift, flip, size, arrow, hide, limitShift } from '@floating-ui/dom';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';

function createAttachmentKey() {
  return Symbol(ATTACHMENT_KEY);
}
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop$1()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
function EvidenceFilePreview($$payload, $$props) {
  push();
  let { cell, meta } = $$props;
  let attachment = void 0;
  run(() => {
    {
      attachment = void 0;
    }
  });
  function displayPreview($$payload2) {
    $$payload2.out += `<div role="button" tabindex="0"${attr_class(clsx("relative cursor-zoom-in"))}>`;
    if (attachment.type.startsWith("image")) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<img${attr("src", attachment.url)} alt="attachment"${attr_class(`h-24 object-contain ${stringify("")}`)}/>`;
    } else if (attachment.type === "application/pdf") {
      $$payload2.out += "<!--[1-->";
      {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="absolute w-full h-full top-0 left-0"></div>`;
      }
      $$payload2.out += `<!--]--> <embed${attr("src", attachment.url)} type="application/pdf"${attr_class(`h-24 object-contain ${stringify("")}`)}/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  if (cell) {
    $$payload.out += "<!--[-->";
    if (attachment) {
      $$payload.out += "<!--[-->";
      if (attachment.type.startsWith("image") || attachment.type === "application/pdf") {
        $$payload.out += "<!--[-->";
        displayPreview($$payload);
      } else if (!attachment.fileExists) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<p class="text-error-500 font-bold">${escape_html(couldnotfindattachmentmessage4())}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<p>${escape_html(nopreviewmessage3())}</p>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span data-testid="loading-field">${escape_html(loading())}...</span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function GeminiFileIdDisplay($$payload, $$props) {
  push();
  let { value } = $$props;
  let geminiFileId = value?.gemini_file_id || "";
  let uploadStatus = value?.upload_status || "";
  let isCompleted = uploadStatus === "completed";
  let isPending = uploadStatus === "pending" || uploadStatus === "uploading";
  let isFailed = uploadStatus === "failed";
  if (geminiFileId) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex items-center space-x-2">`;
    if (isCompleted) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge preset-tonal-success text-xs"${attr("title", geminiFileId)}><i class="fa-solid fa-check-circle mr-1"></i> <span class="font-mono text-xs">${escape_html(geminiFileId.split("/").pop()?.substring(0, 12))}...</span></span>`;
    } else if (isPending) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge preset-tonal-warning text-xs"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Uploading...</span>`;
    } else if (isFailed) {
      $$payload.out += "<!--[2-->";
      $$payload.out += `<span class="badge preset-tonal-error text-xs" title="Upload failed"><i class="fa-solid fa-exclamation-triangle mr-1"></i> Failed</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="text-gray-400 text-sm">—</span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function LanguageDisplay($$payload, $$props) {
  push();
  let { cell, $$slots, $$events, ...rest } = $$props;
  let display = cell.map((lang) => LOCALE_DISPLAY_MAP[lang]);
  const each_array = ensure_array_like(display);
  $$payload.out += `<span${spread_attributes({ ...rest }, null)}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let lang = each_array[$$index];
    $$payload.out += `<p>${escape_html(lang)}</p>`;
  }
  $$payload.out += `<!--]--></span>`;
  pop();
}
function LibraryActions($$payload, $$props) {
  push();
  let { meta, actionsURLModel } = $$props;
  let library = meta;
  getModalStore();
  if (actionsURLModel === "stored-libraries" && Object.hasOwn(library, "is_loaded") && !library.is_loaded) {
    $$payload.out += "<!--[-->";
    if (page.data.user.is_admin) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="hover:text-primary-500"><form method="post"${attr("action", `/stored-libraries/${stringify(library.id)}?/load`)}><button type="submit" data-testid="tablerow-import-button" id="tablerow-import-button" aria-label="Load library"><i class="fa-solid fa-file-import"></i></button></form></span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->  `;
  if (actionsURLModel === "stored-libraries" && library.is_update) {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="hover:text-primary-500"><form method="post"${attr("action", `/loaded-libraries/${stringify(library.loaded_library)}?/update`)}><button${attr("title", updatethislibrary2())}${attr("aria-label", updatethislibrary2())}><i class="fa-solid fa-circle-up text-success-700-300 hover:text-success-600-400"></i></button></form></span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (page.data.user.is_admin && library.is_loaded && library.reference_count === 0) {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="hover:text-primary-500"><form method="post"${attr("action", `/stored-libraries/${stringify(library.id)}?/unload`)}><button type="submit" data-testid="tablerow-unload-button" class="hover:text-red-500" aria-label="Unload library"><i class="fa-solid fa-file-circle-minus"></i></button></form></span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function UserGroupNameDisplay($$payload, $$props) {
  push();
  let { cell, meta } = $$props;
  let fullPath = "";
  $$payload.out += `<span>${escape_html(fullPath)} - ${escape_html(safeTranslate(cell.role))}</span>`;
  pop();
}
function LecChartPreview($$payload, $$props) {
  push();
  let { cell, meta } = $$props;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="h-24 w-32 min-w-[128px] flex items-center justify-center text-gray-500 text-xs bg-gray-50 rounded">No simulation</div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function CircleSpinner($$payload, $$props) {
  let {
    color = `cornflowerblue`,
    duration = `1.5s`,
    size: size2 = `1em`
  } = $$props;
  $$payload.out += `<div${attr_style(`--duration: ${stringify(duration)}`, {
    "border-color": `${stringify(color)} transparent ${stringify(color)} ${stringify(color)}`,
    width: size2,
    height: size2
  })} class="svelte-66wdl1"></div>`;
}
const SvelteMap = globalThis.Map;
function createSubscriber(_) {
  return () => {
  };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
class Spring {
  #stiffness = source(0.15);
  #damping = source(0.8);
  #precision = source(0.01);
  #current;
  #target;
  #last_value = (
    /** @type {T} */
    void 0
  );
  #last_time = 0;
  #inverse_mass = 1;
  #momentum = 0;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /** @type {ReturnType<typeof deferred> | null} */
  #deferred = null;
  /**
   * @param {T} value
   * @param {SpringOpts} [options]
   */
  constructor(value, options = {}) {
    this.#current = source(value);
    this.#target = source(value);
    if (typeof options.stiffness === "number") this.#stiffness.v = clamp(options.stiffness, 0, 1);
    if (typeof options.damping === "number") this.#damping.v = clamp(options.damping, 0, 1);
    if (typeof options.precision === "number") this.#precision.v = options.precision;
  }
  /**
   * Create a spring whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Spring } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const spring = Spring.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {SpringOpts} [options]
   */
  static of(fn, options) {
    const spring = new Spring(fn(), options);
    render_effect(() => {
      spring.set(fn());
    });
    return spring;
  }
  /** @param {T} value */
  #update(value) {
    set(this.#target, value);
    this.#current.v ??= value;
    this.#last_value ??= this.#current.v;
    if (!this.#task) {
      this.#last_time = raf.now();
      var inv_mass_recovery_rate = 1e3 / (this.#momentum * 60);
      this.#task ??= loop((now2) => {
        this.#inverse_mass = Math.min(this.#inverse_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - this.#last_time, 1e3 / 30);
        const ctx = {
          inv_mass: this.#inverse_mass,
          opts: {
            stiffness: this.#stiffness.v,
            damping: this.#damping.v,
            precision: this.#precision.v
          },
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        var next = tick_spring(ctx, this.#last_value, this.#current.v, this.#target.v);
        this.#last_value = this.#current.v;
        this.#last_time = now2;
        set(this.#current, next);
        if (ctx.settled) {
          this.#task = null;
        }
        return !ctx.settled;
      });
    }
    return this.#task.promise;
  }
  /**
   * Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.
   *
   * If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.
   *
   * If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
   * the specified number of milliseconds. This is useful for things like 'fling' gestures.
   *
   * @param {T} value
   * @param {SpringUpdateOpts} [options]
   */
  set(value, options) {
    this.#deferred?.reject(new Error("Aborted"));
    if (options?.instant || this.#current.v === void 0) {
      this.#task?.abort();
      this.#task = null;
      set(this.#current, set(this.#target, value));
      this.#last_value = value;
      return Promise.resolve();
    }
    if (options?.preserveMomentum) {
      this.#inverse_mass = 0;
      this.#momentum = options.preserveMomentum;
    }
    var d = this.#deferred = deferred();
    d.promise.catch(noop$1);
    this.#update(value).then(() => {
      if (d !== this.#deferred) return;
      d.resolve(void 0);
    });
    return d.promise;
  }
  get current() {
    return get$2(this.#current);
  }
  get damping() {
    return get$2(this.#damping);
  }
  set damping(v) {
    set(this.#damping, clamp(v, 0, 1));
  }
  get precision() {
    return get$2(this.#precision);
  }
  set precision(v) {
    set(this.#precision, v);
  }
  get stiffness() {
    return get$2(this.#stiffness);
  }
  set stiffness(v) {
    set(this.#stiffness, clamp(v, 0, 1));
  }
  get target() {
    return get$2(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function Wiggle($$payload, $$props) {
  push();
  let {
    wiggle = false,
    angle = 0,
    scale = 1,
    dx = 0,
    dy = 0,
    duration = 200,
    stiffness = 0.05,
    damping = 0.1,
    children
  } = $$props;
  const store = Spring.of(() => wiggle ? { scale, angle, dx, dy } : { angle: 0, scale: 1, dx: 0, dy: 0 }, { stiffness, damping });
  $$payload.out += `<span${attr_style("", {
    transform: `rotate(${stringify(store.current.angle)}deg) scale(${stringify(store.current.scale)}) translate(${stringify(store.current.dx)}px, ${stringify(store.current.dy)}px)`
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></span>`;
  bind_props($$props, { wiggle });
  pop();
}
function ChevronExpand($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      fill: "currentColor",
      viewBox: "0 0 16 16"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>`;
}
function Cross($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      viewBox: "0 0 24 24",
      fill: "currentColor"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>`;
}
function Disabled($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      viewBox: "0 0 24 24",
      fill: "currentColor"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm-4.906-3.68L18.32 7.094A8 8 0 0 1 7.094 18.32ZM5.68 16.906A8 8 0 0 1 16.906 5.68L5.68 16.906Z"></path></svg>`;
}
const get_label = (opt) => {
  if (opt instanceof Object) {
    if (opt.label === void 0) {
      console.error(`MultiSelect option ${JSON.stringify(opt)} is an object but has no label key`);
    }
    return opt.label;
  }
  return `${opt}`;
};
function get_style(option, key = null) {
  let css_str = ``;
  if (![`selected`, `option`, null].includes(key)) {
    console.error(`MultiSelect: Invalid key=${key} for get_style`);
  }
  if (typeof option == `object` && option.style) {
    if (typeof option.style == `string`) {
      css_str = option.style;
    }
    if (typeof option.style == `object`) {
      if (key && key in option.style)
        return option.style[key] ?? ``;
      else {
        console.error(`Invalid style object for option=${JSON.stringify(option)}`);
      }
    }
  }
  if (css_str.trim() && !css_str.trim().endsWith(`;`))
    css_str += `;`;
  return css_str;
}
function MultiSelect($$payload, $$props) {
  push();
  let {
    activeIndex = null,
    activeOption = null,
    createOptionMsg = `Create this option...`,
    allowUserOptions = false,
    allowEmpty = false,
    autocomplete = `off`,
    autoScroll = true,
    breakpoint = 800,
    defaultDisabledTitle = `This option is disabled`,
    disabled = false,
    disabledInputTitle = `This input is disabled`,
    duplicateOptionMsg = `This option is already selected`,
    duplicates = false,
    key = (opt) => `${get_label(opt)}`.toLowerCase(),
    filterFunc = (opt, searchText2) => {
      if (!searchText2) return true;
      return `${get_label(opt)}`.toLowerCase().includes(searchText2.toLowerCase());
    },
    closeDropdownOnSelect = `desktop`,
    form_input = null,
    highlightMatches = true,
    id = null,
    input = null,
    inputClass = ``,
    inputStyle = null,
    inputmode = null,
    invalid = false,
    liActiveOptionClass = ``,
    liActiveUserMsgClass = ``,
    liOptionClass = ``,
    liOptionStyle = null,
    liSelectedClass = ``,
    liSelectedStyle = null,
    liUserMsgClass = ``,
    loading: loading2 = false,
    matchingOptions = [],
    maxOptions = void 0,
    maxSelect = null,
    maxSelectMsg = (current, max) => max > 1 ? `${current}/${max}` : ``,
    maxSelectMsgClass = ``,
    name = null,
    noMatchingOptionsMsg = `No matching options`,
    open = false,
    options = void 0,
    outerDiv = null,
    outerDivClass = ``,
    parseLabelsAsHtml = false,
    pattern = null,
    placeholder = null,
    removeAllTitle = `Remove all`,
    removeBtnTitle = `Remove`,
    minSelect = null,
    required = false,
    resetFilterOnAdd = true,
    searchText = ``,
    selected = options?.filter((opt) => opt instanceof Object && opt?.preselected).slice(0, maxSelect ?? void 0) ?? [],
    sortSelected = false,
    selectedOptionsDraggable = !sortSelected,
    style = null,
    ulOptionsClass = ``,
    ulSelectedClass = ``,
    ulSelectedStyle = null,
    ulOptionsStyle = null,
    value = null,
    expandIcon,
    selectedItem,
    children,
    removeIcon,
    afterInput,
    spinner,
    disabledIcon,
    option,
    userMsg,
    onblur,
    onclick,
    onfocus,
    onkeydown,
    onkeyup,
    onmousedown,
    onmouseenter,
    onmouseleave,
    ontouchcancel,
    ontouchend,
    ontouchmove,
    ontouchstart,
    onadd,
    oncreate,
    onremove,
    onremoveAll,
    onchange,
    onopen,
    onclose,
    portal: portal_params = {},
    $$slots,
    $$events,
    ...rest
  } = $$props;
  let wiggle = false;
  if (!(options?.length > 0)) {
    if (allowUserOptions || loading2 || disabled || allowEmpty) {
      options = [];
    } else {
      console.error(`MultiSelect received no options`);
    }
  }
  if (maxSelect !== null && maxSelect < 1) {
    console.error(`MultiSelect's maxSelect must be null or positive integer, got ${maxSelect}`);
  }
  if (!Array.isArray(selected)) {
    console.error(`MultiSelect's selected prop should always be an array, got ${selected}`);
  }
  if (maxSelect && typeof required === `number` && required > maxSelect) {
    console.error(`MultiSelect maxSelect=${maxSelect} < required=${required}, makes it impossible for users to submit a valid form`);
  }
  if (parseLabelsAsHtml && allowUserOptions) {
    console.warn(`Don't combine parseLabelsAsHtml and allowUserOptions. It's susceptible to XSS attacks!`);
  }
  if (sortSelected && selectedOptionsDraggable) {
    console.warn(`MultiSelect's sortSelected and selectedOptionsDraggable should not be combined as any user re-orderings of selected options will be undone by sortSelected on component re-renders.`);
  }
  if (allowUserOptions && !createOptionMsg && createOptionMsg !== null) {
    console.error(`MultiSelect has allowUserOptions=${allowUserOptions} but createOptionMsg=${createOptionMsg} is falsy. This prevents the "Add option" <span> from showing up, resulting in a confusing user experience.`);
  }
  if (maxOptions && (typeof maxOptions != `number` || maxOptions < 0 || maxOptions % 1 != 0)) {
    console.error(`MultiSelect's maxOptions must be undefined or a positive integer, got ${maxOptions}`);
  }
  let option_msg_is_active = false;
  if (activeIndex !== null && !matchingOptions[activeIndex]) {
    throw `Run time error, activeIndex=${activeIndex} is out of bounds, matchingOptions.length=${matchingOptions.length}`;
  }
  let is_selected = (label) => selected.map(get_label).includes(label);
  let drag_idx = null;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(selected);
    $$payload2.out += `<div${attr_class(`multiselect ${stringify(outerDivClass)} ${stringify(rest.class ?? ``)}`, "svelte-1taxil8", {
      "disabled": disabled,
      "single": maxSelect === 1,
      "open": open,
      "invalid": invalid
    })}${attr("title", disabled ? disabledInputTitle : null)}${attr("data-id", id)} role="searchbox" tabindex="-1"${attr_style(style)}><input${attr("name", name)}${attr("required", Boolean(required), true)}${attr("value", selected.length >= Number(required) ? JSON.stringify(selected) : null)} tabindex="-1" aria-hidden="true" aria-label="ignore this, used only to prevent form submission if select is required but empty" class="form-control svelte-1taxil8"/> `;
    if (expandIcon) {
      $$payload2.out += "<!--[-->";
      expandIcon($$payload2, { open });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      ChevronExpand($$payload2, {
        width: "15px",
        style: "min-width: 1em; padding: 0 1pt; cursor: pointer;"
      });
    }
    $$payload2.out += `<!--]--> <ul${attr_class(`selected ${stringify(ulSelectedClass)}`, "svelte-1taxil8")} aria-label="selected options"${attr_style(ulSelectedStyle)}><!--[-->`;
    for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
      let option2 = each_array[idx];
      const selectedOptionStyle = [
        get_style(option2, `selected`),
        liSelectedStyle
      ].filter(Boolean).join(` `) || null;
      $$payload2.out += `<li${attr_class(clsx(liSelectedClass), "svelte-1taxil8", { "active": drag_idx === idx })} role="option" aria-selected="true"${attr("draggable", selectedOptionsDraggable && !disabled && selected.length > 1)}${attr_style(selectedOptionStyle)}>`;
      if (selectedItem) {
        $$payload2.out += "<!--[-->";
        selectedItem($$payload2, { option: option2, idx });
        $$payload2.out += `<!---->`;
      } else if (children) {
        $$payload2.out += "<!--[1-->";
        children($$payload2, { option: option2, idx });
        $$payload2.out += `<!---->`;
      } else if (parseLabelsAsHtml) {
        $$payload2.out += "<!--[2-->";
        $$payload2.out += `${html(get_label(option2))}`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(get_label(option2))}`;
      }
      $$payload2.out += `<!--]--> `;
      if (!disabled && (minSelect === null || selected.length > minSelect)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button type="button"${attr("title", `${stringify(removeBtnTitle)} ${stringify(get_label(option2))}`)} class="remove svelte-1taxil8">`;
        if (removeIcon) {
          $$payload2.out += "<!--[-->";
          removeIcon($$payload2);
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          Cross($$payload2, { width: "15px" });
        }
        $$payload2.out += `<!--]--></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]--> <input${spread_attributes(
      {
        class: clsx(inputClass),
        style: inputStyle,
        value: searchText,
        id,
        disabled,
        autocomplete,
        inputmode,
        pattern,
        placeholder: selected.length == 0 ? placeholder : null,
        "aria-invalid": invalid ? `true` : null,
        ...rest
      },
      "svelte-1taxil8"
    )}/> `;
    afterInput?.($$payload2, {
      selected,
      disabled,
      invalid,
      id,
      placeholder,
      open,
      required
    });
    $$payload2.out += `<!----></ul> `;
    if (loading2) {
      $$payload2.out += "<!--[-->";
      if (spinner) {
        $$payload2.out += "<!--[-->";
        spinner($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        CircleSpinner($$payload2, {});
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (disabled) {
      $$payload2.out += "<!--[-->";
      if (disabledIcon) {
        $$payload2.out += "<!--[-->";
        disabledIcon($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        Disabled($$payload2, {
          width: "14pt",
          style: "margin: 0 2pt;",
          "data-name": "disabled-icon"
        });
      }
      $$payload2.out += `<!--]-->`;
    } else if (selected.length > 0) {
      $$payload2.out += "<!--[1-->";
      if (maxSelect && (maxSelect > 1 || maxSelectMsg)) {
        $$payload2.out += "<!--[-->";
        Wiggle($$payload2, {
          angle: 20,
          get wiggle() {
            return wiggle;
          },
          set wiggle($$value) {
            wiggle = $$value;
            $$settled = false;
          },
          children: ($$payload3) => {
            $$payload3.out += `<span${attr_class(`max-select-msg ${stringify(maxSelectMsgClass)}`, "svelte-1taxil8")}>${escape_html(maxSelectMsg?.(selected.length, maxSelect))}</span>`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (maxSelect !== 1 && selected.length > 1) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button type="button" class="remove remove-all svelte-1taxil8"${attr("title", removeAllTitle)}>`;
        if (removeIcon) {
          $$payload2.out += "<!--[-->";
          removeIcon($$payload2);
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          Cross($$payload2, { width: "15px" });
        }
        $$payload2.out += `<!--]--></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (searchText && noMatchingOptionsMsg || options?.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(matchingOptions.slice(0, Math.max(0, maxOptions ?? 0) || Infinity));
      $$payload2.out += `<ul${attr_class(`options ${stringify(ulOptionsClass)}`, "svelte-1taxil8", { "hidden": !open })} role="listbox"${attr("aria-multiselectable", maxSelect === null || maxSelect > 1)}${attr("aria-expanded", open)}${attr("aria-disabled", disabled ? `true` : null)}${attr_style(ulOptionsStyle)}><!--[-->`;
      for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
        let optionItem = each_array_1[idx];
        const {
          label,
          disabled: disabled2 = null,
          title = null,
          selectedTitle = null,
          disabledTitle = defaultDisabledTitle
        } = optionItem instanceof Object ? optionItem : { label: optionItem };
        const active = activeIndex === idx;
        const optionStyle = [
          get_style(optionItem, `option`),
          liOptionStyle
        ].filter(Boolean).join(` `) || null;
        $$payload2.out += `<li${attr("title", disabled2 ? disabledTitle : is_selected(label) && selectedTitle || title)}${attr_class(`${stringify(liOptionClass)} ${stringify(active ? liActiveOptionClass : ``)}`, "svelte-1taxil8", {
          "selected": is_selected(label),
          "active": active,
          "disabled": disabled2
        })} role="option" aria-selected="false"${attr_style(optionStyle)}>`;
        if (option) {
          $$payload2.out += "<!--[-->";
          option($$payload2, { option: optionItem, idx });
          $$payload2.out += `<!---->`;
        } else if (children) {
          $$payload2.out += "<!--[1-->";
          children($$payload2, { option: optionItem, idx });
          $$payload2.out += `<!---->`;
        } else if (parseLabelsAsHtml) {
          $$payload2.out += "<!--[2-->";
          $$payload2.out += `${html(get_label(optionItem))}`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `${escape_html(get_label(optionItem))}`;
        }
        $$payload2.out += `<!--]--></li>`;
      }
      $$payload2.out += `<!--]--> `;
      if (searchText) {
        $$payload2.out += "<!--[-->";
        const text_input_is_duplicate = selected.map(get_label).includes(searchText);
        const is_dupe = !duplicates && text_input_is_duplicate && `dupe`;
        const can_create = Boolean(allowUserOptions && createOptionMsg) && `create`;
        const no_match = Boolean(matchingOptions?.length == 0 && noMatchingOptionsMsg) && `no-match`;
        const msgType = is_dupe || can_create || no_match;
        if (msgType) {
          $$payload2.out += "<!--[-->";
          const msg = {
            dupe: duplicateOptionMsg,
            create: createOptionMsg,
            "no-match": noMatchingOptionsMsg
          }[msgType];
          $$payload2.out += `<li${attr("title", msgType === `create` ? createOptionMsg : msgType === `dupe` ? duplicateOptionMsg : ``)} role="option" aria-selected="false"${attr_class(`user-msg ${stringify(liUserMsgClass)} ${stringify(``)}`, "svelte-1taxil8", { "active": option_msg_is_active })}${attr_style("", {
            cursor: {
              dupe: `not-allowed`,
              create: `pointer`,
              "no-match": `default`
            }[msgType]
          })}>`;
          if (userMsg) {
            $$payload2.out += "<!--[-->";
            userMsg($$payload2, { searchText, msgType, msg });
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `${escape_html(msg)}`;
          }
          $$payload2.out += `<!--]--></li>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></ul>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    activeIndex,
    activeOption,
    form_input,
    input,
    invalid,
    matchingOptions,
    open,
    options,
    outerDiv,
    searchText,
    selected,
    value
  });
  pop();
}
function scroll_into_view_if_needed_polyfill(element, centerIfNeeded = true) {
  const observer = new IntersectionObserver(([entry], obs) => {
    const ratio = entry.intersectionRatio;
    if (ratio < 1) {
      const place = ratio <= 0 && centerIfNeeded ? `center` : `nearest`;
      element.scrollIntoView({
        block: place,
        inline: place
      });
    }
    obs.disconnect();
  });
  observer.observe(element);
  return observer;
}
if (typeof Element !== `undefined` && !Element.prototype?.scrollIntoViewIfNeeded && typeof IntersectionObserver !== `undefined`) {
  Element.prototype.scrollIntoViewIfNeeded = function scrollIntoViewIfNeeded() {
    scroll_into_view_if_needed_polyfill(this);
  };
}
function AutocompleteSelect($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    fieldContext = "form-input",
    label = void 0,
    baseClass = "",
    field,
    valuePath = field,
    helpText = void 0,
    form,
    resetForm = false,
    multiple = false,
    nullable = false,
    mandatory = false,
    disabled = false,
    hidden = false,
    translateOptions = true,
    options = [],
    optionsEndpoint = "",
    optionsDetailedUrlParameters = [],
    optionsLabelField = "name",
    optionsValueField = "id",
    browserCache = "default",
    optionsExtraFields = [],
    optionsInfoFields = {
      fields: [],
      position: "suffix",
      separator: " ",
      classes: "text-surface-500"
    },
    additionalMultiselectOptions = {},
    pathField = "",
    optionsSuggestions = [],
    optionsSelf = null,
    optionsSelfSelect = false,
    allowUserOptions = false,
    onChange = () => {
    },
    includeAllOptionFields = false,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    cachedValue = void 0,
    cachedOptions = void 0,
    mount = () => null,
    optionSnippet = void 0,
    placeholder = ""
  } = $$props;
  if (translateOptions) {
    options = options.map((option) => {
      return {
        ...option,
        translatedLabel: safeTranslate(option.label) !== option.label ? safeTranslate(option.label) : safeTranslate(option.value) !== option.value ? safeTranslate(option.value) : option.label
      };
    });
  }
  let _disabled = disabled;
  const { value, errors, constraints } = formFieldProxy(form, valuePath);
  let selected = [];
  let selectedValues = selected.map((item) => item.value || item.label || item);
  let isInternalUpdate = false;
  let optionsLoaded = Boolean(options.length);
  resetForm ? void 0 : store_get($$store_subs ??= {}, "$value", value);
  const default_value = nullable ? null : selectedValues[0];
  const multiSelectOptions = {
    minSelect: store_get($$store_subs ??= {}, "$constraints", constraints) && store_get($$store_subs ??= {}, "$constraints", constraints).required === true ? 1 : 0,
    maxSelect: multiple ? void 0 : 1,
    liSelectedClass: multiple ? "!chip !preset-filled" : "!bg-transparent",
    inputClass: "focus:ring-0! focus:outline-hidden!",
    outerDivClass: "!input !bg-surface-100 !px-2 !flex",
    closeDropdownOnSelect: !multiple,
    ...additionalMultiselectOptions
  };
  const updateMissingConstraint = getContext("updateMissingConstraint");
  async function handleSelectChange() {
    if (allowUserOptions && selectedValues.length > 0) {
      for (const val of selectedValues) {
        if (!options.some((opt) => opt.value === val)) {
          const newOption = { label: val, value: val };
          options = [...options, newOption];
        }
      }
    }
    await onChange(store_get($$store_subs ??= {}, "$value", value));
  }
  function arraysEqual(arr1, arr2) {
    const normalize = (val) => {
      if (typeof val === "string") return [val];
      return val ?? [];
    };
    const a1 = normalize(arr1);
    const a2 = normalize(arr2);
    if (a1.length !== a2.length) return false;
    const set1 = new Set(a1);
    const set2 = new Set(a2);
    for (const value2 of set1) {
      if (!set2.has(value2)) return false;
    }
    return true;
  }
  run(() => {
    options.reduce(
      (acc, option) => {
        acc[option.value] = option;
        return acc;
      },
      {}
    );
  });
  run(() => {
    cachedValue = selected.map((option) => option.value);
    cachedOptions = selected;
  });
  run(() => {
    if (!isInternalUpdate && optionsLoaded && !arraysEqual(selectedValues, store_get($$store_subs ??= {}, "$value", value))) {
      isInternalUpdate = true;
      store_set(value, multiple ? selectedValues : selectedValues[0] ?? default_value);
      handleSelectChange();
      isInternalUpdate = false;
    }
  });
  run(() => {
    _disabled = disabled || Boolean(selected.length && options.length === 1 && store_get($$store_subs ??= {}, "$constraints", constraints)?.required);
  });
  onDestroy(() => {
    if (updateMissingConstraint) {
      updateMissingConstraint(field, false);
    }
  });
  const searchTargetMap = new Map(options.map((opt) => [opt, getSearchTarget(opt)]));
  const fastFilter = (opt, searchText) => {
    if (!searchText) {
      return true;
    }
    const target = searchTargetMap.get(opt) || "";
    const normalizedSearch = normalizeSearchString(searchText);
    const searchTerms = normalizedSearch.split(" ").filter(Boolean);
    if (searchTerms.length === 0) {
      return true;
    }
    return searchTerms.every((term) => target.includes(term));
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(clsx(baseClass))}${attr("hidden", hidden, true)}>`;
    if (label !== void 0) {
      $$payload2.out += "<!--[-->";
      if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required || mandatory) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)} <span class="text-red-500">*</span></label>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label>`;
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors)._errors) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors)._errors);
      $$payload2.out += `<div><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let error = each_array[$$index];
        $$payload2.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors).length > 0) {
      $$payload2.out += "<!--[1-->";
      const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
      $$payload2.out += `<div><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let error = each_array_1[$$index_1];
        $$payload2.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="control overflow-x-clip flex items-center space-x-2"${attr("data-testid", `${stringify(fieldContext)}-${stringify(field.replaceAll("_", "-"))}`)}>`;
    if (Array.isArray(store_get($$store_subs ??= {}, "$value", value))) {
      $$payload2.out += "<!--[-->";
      const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$value", value));
      $$payload2.out += `<!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let val = each_array_2[$$index_2];
        $$payload2.out += `<input type="hidden"${attr("name", field)}${attr("value", val)}/>`;
      }
      $$payload2.out += `<!--]-->`;
    } else if (store_get($$store_subs ??= {}, "$value", value)) {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `<input type="hidden"${attr("name", field)}${attr("value", store_get($$store_subs ??= {}, "$value", value))}/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      let option = function($$payload3, { option: option2 }) {
        if (optionSnippet) {
          $$payload3.out += "<!--[-->";
          optionSnippet?.($$payload3, option2);
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          if (option2.infoString?.position === "prefix") {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span${attr_class(`text-xs ${stringify(option2.infoString.classes)}`)}>${escape_html(option2.infoString.string)}</span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (option2.path) {
            $$payload3.out += "<!--[-->";
            const each_array_3 = ensure_array_like(option2.path);
            $$payload3.out += `<span><!--[-->`;
            for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
              let item = each_array_3[$$index_3];
              $$payload3.out += `<span class="text-surface-500 font-light">${escape_html(item)} / </span>`;
            }
            $$payload3.out += `<!--]--></span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (translateOptions && option2) {
            $$payload3.out += "<!--[-->";
            if (field === "ro_to_couple") {
              $$payload3.out += "<!--[-->";
              const [firstPart, ...restParts] = option2.label.split(" - ");
              $$payload3.out += `${escape_html(safeTranslate(firstPart))} - ${escape_html(restParts.join(" - "))}`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `${escape_html(option2.translatedLabel)}`;
            }
            $$payload3.out += `<!--]-->`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `${escape_html(option2.label || option2)}`;
          }
          $$payload3.out += `<!--]--> `;
          if (option2.infoString?.position === "suffix") {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span${attr_class(`text-xs ${stringify(option2.infoString.classes)}`)}>${escape_html(option2.infoString.string)}</span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (option2.suggested) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span class="text-sm text-surface-500">${escape_html(suggestedparentheses1())}</span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      }, selectedItem = function($$payload3, { option: option2 }) {
        if (option2.infoString?.position === "prefix") {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<span class="text-xs text-surface-500"> ${escape_html(option2.infoString.string)}</span>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (option2.path) {
          $$payload3.out += "<!--[-->";
          const each_array_4 = ensure_array_like(option2.path);
          $$payload3.out += `<span><!--[-->`;
          for (let idx = 0, $$length = each_array_4.length; idx < $$length; idx++) {
            let item = each_array_4[idx];
            $$payload3.out += `<span class="text-xs font-light">${escape_html(item)} `;
            if (idx < option2.path.length - 1) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += ` /`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> </span>`;
          }
          $$payload3.out += `<!--]--></span>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (translateOptions && option2) {
          $$payload3.out += "<!--[-->";
          if (field === "ro_to_couple") {
            $$payload3.out += "<!--[-->";
            const [firstPart, ...restParts] = option2.label.split(" - ");
            $$payload3.out += `${escape_html(safeTranslate(firstPart))} - ${escape_html(restParts.join(" - "))}`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `${escape_html(option2.translatedLabel)}`;
          }
          $$payload3.out += `<!--]-->`;
        } else {
          $$payload3.out += "<!--[!-->";
          $$payload3.out += `${escape_html(option2.label || option2)}`;
        }
        $$payload3.out += `<!--]--> `;
        if (option2.infoString?.position === "suffix") {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<span class="text-xs text-surface-500"> ${escape_html(option2.infoString.string)}</span>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (option2.suggested) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<span class="text-sm text-surface-500">${escape_html(suggestedparentheses1())}</span>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      };
      MultiSelect($$payload2, spread_props([
        { options },
        multiSelectOptions,
        {
          disabled: _disabled,
          allowEmpty: true,
          allowUserOptions,
          duplicates: false,
          key: JSON.stringify,
          filterFunc: fastFilter,
          placeholder,
          get selected() {
            return selected;
          },
          set selected($$value) {
            selected = $$value;
            $$settled = false;
          },
          option,
          selectedItem,
          $$slots: { option: true, selectedItem: true }
        }
      ]));
    }
    $$payload2.out += `<!----> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (helpText) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p class="text-sm text-gray-500 whitespace-pre-line">${escape_html(helpText)}</p>`;
    } else {
      $$payload2.out += "<!--[!-->";
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
  bind_props($$props, { cachedValue, cachedOptions });
  pop();
}
function isFunction$1(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const CLASS_VALUE_PRIMITIVE_TYPES = ["string", "number", "bigint", "boolean"];
function isClassValue(value) {
  if (value === null || value === void 0)
    return true;
  if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value))
    return true;
  if (Array.isArray(value))
    return value.every((item) => isClassValue(item));
  if (typeof value === "object") {
    if (Object.getPrototypeOf(value) !== Object.prototype)
      return false;
    return true;
  }
  return false;
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function boxWith(getter, setter) {
  const derived2 = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived2;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return isBox(value) && isWritableSymbol in value;
}
function boxFrom(value) {
  if (isBox(value)) return value;
  if (isFunction$1(value)) return boxWith(value);
  return simpleBox(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key, b]) => {
      if (!isBox(b)) {
        return Object.assign(acc, { [key]: b });
      }
      if (isWritableBox(b)) {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          },
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
function simpleBox(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
  return function(e) {
    for (const handler of handlers) {
      if (!handler)
        continue;
      if (e.defaultPrevented)
        return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        handler.current?.call(this, e);
      }
    }
  };
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
function index(style, options) {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style) return [];
  options = options || {};
  var lineno = 1;
  var column = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  function position() {
    var start = { line: lineno, column };
    return function(node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column };
    this.source = options.source;
  }
  Position.prototype.content = style;
  function error(msg) {
    var err = new Error(
      options.source + ":" + lineno + ":" + column + ": " + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;
    if (options.silent) ;
    else {
      throw err;
    }
  }
  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }
  function whitespace() {
    match(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }
  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
    var i = 2;
    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }
    i += 2;
    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error("End of comment missing");
    }
    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos = position();
    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment();
    if (!match(COLON_REGEX)) return error("property missing ':'");
    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace();
  return declarations();
}
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
function StyleToObject(style, iterator) {
  let styleObject = null;
  if (!style || typeof style !== "string") {
    return styleObject;
  }
  const declarations = index(style);
  const hasIterator = typeof iterator === "function";
  declarations.forEach((declaration) => {
    if (declaration.type !== "declaration") {
      return;
    }
    const { property, value } = declaration;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      styleObject = styleObject || {};
      styleObject[property] = value;
    }
  });
  return styleObject;
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char))
    return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str)
    return "";
  return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css)
    return {};
  const styleObj = {};
  function iterator(name, value) {
    if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  StyleToObject(css, iterator);
  return styleObj;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const EVENT_LIST = [
  "onabort",
  "onanimationcancel",
  "onanimationend",
  "onanimationiteration",
  "onanimationstart",
  "onauxclick",
  "onbeforeinput",
  "onbeforetoggle",
  "onblur",
  "oncancel",
  "oncanplay",
  "oncanplaythrough",
  "onchange",
  "onclick",
  "onclose",
  "oncompositionend",
  "oncompositionstart",
  "oncompositionupdate",
  "oncontextlost",
  "oncontextmenu",
  "oncontextrestored",
  "oncopy",
  "oncuechange",
  "oncut",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "ondurationchange",
  "onemptied",
  "onended",
  "onerror",
  "onfocus",
  "onfocusin",
  "onfocusout",
  "onformdata",
  "ongotpointercapture",
  "oninput",
  "oninvalid",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onload",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onlostpointercapture",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onpaste",
  "onpause",
  "onplay",
  "onplaying",
  "onpointercancel",
  "onpointerdown",
  "onpointerenter",
  "onpointerleave",
  "onpointermove",
  "onpointerout",
  "onpointerover",
  "onpointerup",
  "onprogress",
  "onratechange",
  "onreset",
  "onresize",
  "onscroll",
  "onscrollend",
  "onsecuritypolicyviolation",
  "onseeked",
  "onseeking",
  "onselect",
  "onselectionchange",
  "onselectstart",
  "onslotchange",
  "onstalled",
  "onsubmit",
  "onsuspend",
  "ontimeupdate",
  "ontoggle",
  "ontouchcancel",
  "ontouchend",
  "ontouchmove",
  "ontouchstart",
  "ontransitioncancel",
  "ontransitionend",
  "ontransitionrun",
  "ontransitionstart",
  "onvolumechange",
  "onwaiting",
  "onwebkitanimationend",
  "onwebkitanimationiteration",
  "onwebkitanimationstart",
  "onwebkittransitionend",
  "onwheel"
];
const EVENT_LIST_SET = new Set(EVENT_LIST);
function isEventHandler(key) {
  return EVENT_LIST_SET.has(key);
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    if (!props)
      continue;
    for (const key of Object.keys(props)) {
      const a = result[key];
      const b = props[key];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
        const aHandler = a;
        const bHandler = b;
        result[key] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key] = executeCallbacks(a, b);
      } else if (key === "class") {
        const aIsClassValue = isClassValue(a);
        const bIsClassValue = isClassValue(b);
        if (aIsClassValue && bIsClassValue) {
          result[key] = clsx$1(a, b);
        } else if (aIsClassValue) {
          result[key] = clsx$1(a);
        } else if (bIsClassValue) {
          result[key] = clsx$1(b);
        }
      } else if (key === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key] = a;
        } else if (bIsObject) {
          result[key] = b;
        } else if (aIsString) {
          result[key] = a;
        } else if (bIsString) {
          result[key] = b;
        }
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
    for (const key of Object.getOwnPropertySymbols(props)) {
      const a = result[key];
      const b = props[key];
      result[key] = b !== void 0 ? b : a;
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden === false) {
    result.hidden = void 0;
    delete result.hidden;
  }
  if (result.disabled === false) {
    result.disabled = void 0;
    delete result.disabled;
  }
  return result;
}
const defaultWindow = void 0;
function getActiveElement$1(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement$1(this.#document);
  }
}
new ActiveElement();
function isFunction(value) {
  return typeof value === "function";
}
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function get$1(value) {
  if (isFunction(value)) {
    return value();
  }
  return value;
}
class ElementSize {
  // no need to use `$state` here since we are using createSubscriber
  #size = { width: 0, height: 0 };
  #observed = false;
  #options;
  #node;
  #window;
  // we use a derived here to extract the width so that if the width doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #width = derived(() => {
    this.#subscribe()?.();
    return this.getSize().width;
  });
  // we use a derived here to extract the height so that if the height doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #height = derived(() => {
    this.#subscribe()?.();
    return this.getSize().height;
  });
  // we need to use a derived here because the class will be created before the node is bound to the ref
  #subscribe = derived(() => {
    const node$ = get$1(this.#node);
    if (!node$) return;
    return createSubscriber();
  });
  constructor(node, options = { box: "border-box" }) {
    this.#window = options.window ?? defaultWindow;
    this.#options = options;
    this.#node = node;
    this.#size = { width: 0, height: 0 };
  }
  calculateSize() {
    const element = get$1(this.#node);
    if (!element || !this.#window) {
      return;
    }
    const offsetWidth = element.offsetWidth;
    const offsetHeight = element.offsetHeight;
    if (this.#options.box === "border-box") {
      return { width: offsetWidth, height: offsetHeight };
    }
    const style = this.#window.getComputedStyle(element);
    const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const contentWidth = offsetWidth - paddingWidth - borderWidth;
    const contentHeight = offsetHeight - paddingHeight - borderHeight;
    return { width: contentWidth, height: contentHeight };
  }
  getSize() {
    return this.#observed ? this.#size : this.calculateSize() ?? this.#size;
  }
  get current() {
    this.#subscribe()?.();
    return this.getSize();
  }
  get width() {
    return this.#width();
  }
  get height() {
    return this.#height();
  }
}
function afterSleep(ms, cb) {
  return setTimeout(cb, ms);
}
function afterTick(fn) {
  tick().then(fn);
}
const ELEMENT_NODE = 1;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement$1(node) {
  return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
function isDocument(node) {
  return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
  return isObject(node) && node.constructor?.name === "VisualViewport";
}
function isNode(node) {
  return isObject(node) && node.nodeType !== void 0;
}
function isShadowRoot(node) {
  return isNode(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function contains(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement$1(parent) || !isHTMLElement$1(child))
    return false;
  const rootNode = child.getRootNode?.();
  if (parent === child)
    return true;
  if (parent.contains(child))
    return true;
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next)
        return true;
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getDocument(node) {
  if (isDocument(node))
    return node;
  if (isWindow(node))
    return node.document;
  return node?.ownerDocument ?? document;
}
function getWindow(node) {
  if (isShadowRoot(node))
    return getWindow(node.host);
  if (isDocument(node))
    return node.defaultView ?? window;
  if (isHTMLElement$1(node))
    return node.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
class DOMContext {
  element;
  #root = derived(() => {
    if (!this.element.current) return document;
    const rootNode = this.element.current.getRootNode() ?? document;
    return rootNode;
  });
  get root() {
    return this.#root();
  }
  set root($$value) {
    return this.#root($$value);
  }
  constructor(element) {
    if (typeof element === "function") {
      this.element = boxWith(element);
    } else {
      this.element = element;
    }
  }
  getDocument = () => {
    return getDocument(this.root);
  };
  getWindow = () => {
    return this.getDocument().defaultView ?? window;
  };
  getActiveElement = () => {
    return getActiveElement(this.root);
  };
  isActiveElement = (node) => {
    return node === this.getActiveElement();
  };
  getElementById(id) {
    return this.root.getElementById(id);
  }
  querySelector = (selector) => {
    if (!this.root) return null;
    return this.root.querySelector(selector);
  };
  querySelectorAll = (selector) => {
    if (!this.root) return [];
    return this.root.querySelectorAll(selector);
  };
  setTimeout = (callback, delay) => {
    return this.getWindow().setTimeout(callback, delay);
  };
  clearTimeout = (timeoutId) => {
    return this.getWindow().clearTimeout(timeoutId);
  };
}
function attachRef(ref, onChange) {
  return {
    [createAttachmentKey()]: (node) => {
      if (isBox(ref)) {
        ref.current = node;
        run$1(() => onChange?.(node));
        return () => {
          if ("isConnected" in node && node.isConnected)
            return;
          ref.current = null;
          onChange?.(null);
        };
      }
      ref(node);
      run$1(() => onChange?.(node));
      return () => {
        if ("isConnected" in node && node.isConnected)
          return;
        ref(null);
        onChange?.(null);
      };
    }
  };
}
function boolToStr(condition) {
  return condition ? "true" : "false";
}
function boolToEmptyStrOrUndef(condition) {
  return condition ? "" : void 0;
}
function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
class BitsAttrs {
  #variant;
  #prefix;
  attrs;
  constructor(config) {
    this.#variant = config.getVariant ? config.getVariant() : null;
    this.#prefix = this.#variant ? `data-${this.#variant}-` : `data-${config.component}-`;
    this.getAttr = this.getAttr.bind(this);
    this.selector = this.selector.bind(this);
    this.attrs = Object.fromEntries(config.parts.map((part) => [part, this.getAttr(part)]));
  }
  getAttr(part, variantOverride) {
    if (variantOverride)
      return `data-${variantOverride}-${part}`;
    return `${this.#prefix}${part}`;
  }
  selector(part, variantOverride) {
    return `[${this.getAttr(part, variantOverride)}]`;
  }
}
function createBitsAttrs(config) {
  const bitsAttrs = new BitsAttrs(config);
  return {
    ...bitsAttrs.attrs,
    selector: bitsAttrs.selector,
    getAttr: bitsAttrs.getAttr
  };
}
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const HOME = "Home";
const PAGE_DOWN = "PageDown";
const PAGE_UP = "PageUp";
const SPACE = " ";
const TAB = "Tab";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
const isBrowser = typeof document !== "undefined";
const isIOS = getIsIOS();
function getIsIOS() {
  return isBrowser && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
  window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isElement(element) {
  return element instanceof Element;
}
function isElementOrSVGElement(element) {
  return element instanceof Element || element instanceof SVGElement;
}
function isNotNull(value) {
  return value !== null;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
class RovingFocusGroup {
  #opts;
  #currentTabStopId = box(null);
  constructor(opts) {
    this.#opts = opts;
  }
  getCandidateNodes() {
    return [];
  }
  focusFirstCandidate() {
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    items[0]?.focus();
  }
  handleKeydown(node, e, both = false) {
    const rootNode = this.#opts.rootNode.current;
    if (!rootNode || !node)
      return;
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, this.#opts.orientation.current);
    const loop2 = this.#opts.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0)
      return;
    e.preventDefault();
    if (itemIndex < 0 && loop2) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop2) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus)
      return;
    itemToFocus.focus();
    this.#currentTabStopId.current = itemToFocus.id;
    this.#opts.onCandidateFocus?.(itemToFocus);
    return itemToFocus;
  }
  getTabIndex(node) {
    const items = this.getCandidateNodes();
    const anyActive = this.#currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      this.#currentTabStopId.current = node.id;
      return 0;
    } else if (node?.id === this.#currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  setCurrentTabStopId(id) {
    this.#currentTabStopId.current = id;
  }
  focusCurrentTabStop() {
    const currentTabStopId = this.#currentTabStopId.current;
    if (!currentTabStopId)
      return;
    const currentTabStop = this.#opts.rootNode.current?.querySelector(`#${currentTabStopId}`);
    if (!currentTabStop || !isHTMLElement(currentTabStop))
      return;
    currentTabStop.focus();
  }
}
class AnimationsComplete {
  #opts;
  #currentFrame = null;
  constructor(opts) {
    this.#opts = opts;
  }
  #cleanup() {
    if (!this.#currentFrame)
      return;
    window.cancelAnimationFrame(this.#currentFrame);
    this.#currentFrame = null;
  }
  run(fn) {
    this.#cleanup();
    const node = this.#opts.ref.current;
    if (!node)
      return;
    if (typeof node.getAnimations !== "function") {
      this.#executeCallback(fn);
      return;
    }
    this.#currentFrame = window.requestAnimationFrame(() => {
      const animations = node.getAnimations();
      if (animations.length === 0) {
        this.#executeCallback(fn);
        return;
      }
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        this.#executeCallback(fn);
      });
    });
  }
  #executeCallback(fn) {
    const execute = () => {
      fn();
    };
    if (this.#opts.afterTick) {
      afterTick(execute);
    } else {
      execute();
    }
  }
}
class PresenceManager {
  #opts;
  #enabled;
  #afterAnimations;
  #shouldRender = false;
  constructor(opts) {
    this.#opts = opts;
    this.#shouldRender = opts.open.current;
    this.#enabled = opts.enabled ?? true;
    this.#afterAnimations = new AnimationsComplete({
      ref: this.#opts.ref,
      afterTick: this.#opts.open
    });
    watch(() => this.#opts.open.current, (isOpen) => {
      if (isOpen) this.#shouldRender = true;
      if (!this.#enabled) return;
      this.#afterAnimations.run(() => {
        if (isOpen === this.#opts.open.current) {
          if (!this.#opts.open.current) {
            this.#shouldRender = false;
          }
          this.#opts.onComplete?.();
        }
      });
    });
  }
  get shouldRender() {
    return this.#shouldRender;
  }
}
function noop() {
}
function createId(prefixOrUid, uid) {
  return `bits-${prefixOrUid}`;
}
class CustomEventDispatcher {
  eventName;
  options;
  constructor(eventName, options = { bubbles: true, cancelable: true }) {
    this.eventName = eventName;
    this.options = options;
  }
  createEvent(detail) {
    return new CustomEvent(this.eventName, {
      ...this.options,
      detail
    });
  }
  dispatch(element, detail) {
    const event = this.createEvent(detail);
    element.dispatchEvent(event);
    return event;
  }
  listen(element, callback, options) {
    const handler = (event) => {
      callback(event);
    };
    return on(element, this.eventName, handler, options);
  }
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
function isClickTrulyOutside(event, contentNode) {
  const { clientX, clientY } = event;
  const rect = contentNode.getBoundingClientRect();
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
const SELECTION_KEYS = [ENTER, SPACE];
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [ARROW_LEFT],
  rtl: [ARROW_RIGHT]
};
function isMouseEvent(event) {
  return event.pointerType === "mouse";
}
function focus(element, { select: select2 = false } = {}) {
  if (!element || !element.focus)
    return;
  const doc = getDocument(element);
  if (doc.activeElement === element)
    return;
  const previouslyFocusedElement = doc.activeElement;
  element.focus({ preventScroll: true });
  if (element !== previouslyFocusedElement && isSelectableInput(element) && select2) {
    element.select();
  }
}
function focusFirst(candidates, { select: select2 = false } = {}, getActiveElement2) {
  const previouslyFocusedElement = getActiveElement2();
  for (const candidate of candidates) {
    focus(candidate, { select: select2 });
    if (getActiveElement2() !== previouslyFocusedElement)
      return true;
  }
}
let isUsingKeyboard = false;
class IsUsingKeyboard {
  static _refs = 0;
  // Reference counting to avoid multiple listeners.
  static _cleanup;
  constructor() {
  }
  get current() {
    return isUsingKeyboard;
  }
  set current(value) {
    isUsingKeyboard = value;
  }
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function getTabbableOptions() {
  return {
    getShadowRoot: true,
    displayCheck: (
      // JSDOM does not support the `tabbable` library. To solve this we can
      // check if `ResizeObserver` is a real function (not polyfilled), which
      // determines if the current environment is JSDOM-like.
      typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
    )
  };
}
function getTabbableFrom(currentNode, direction) {
  if (!isTabbable(currentNode, getTabbableOptions())) {
    return getTabbableFromFocusable(currentNode, direction);
  }
  const doc = getDocument(currentNode);
  const allTabbable = tabbable(doc.body, getTabbableOptions());
  if (direction === "prev")
    allTabbable.reverse();
  const activeIndex = allTabbable.indexOf(currentNode);
  if (activeIndex === -1)
    return doc.body;
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getTabbableFromFocusable(currentNode, direction) {
  const doc = getDocument(currentNode);
  if (!isFocusable(currentNode, getTabbableOptions()))
    return doc.body;
  const allFocusable = focusable(doc.body, getTabbableOptions());
  if (direction === "prev")
    allFocusable.reverse();
  const activeIndex = allFocusable.indexOf(currentNode);
  if (activeIndex === -1)
    return doc.body;
  const nextFocusableElements = allFocusable.slice(activeIndex + 1);
  return nextFocusableElements.find((node) => isTabbable(node, getTabbableOptions())) ?? doc.body;
}
function getNextMatch(values, search, currentMatch) {
  const lowerSearch = search.toLowerCase();
  if (lowerSearch.endsWith(" ")) {
    const searchWithoutSpace = lowerSearch.slice(0, -1);
    const matchesWithoutSpace = values.filter((value) => value.toLowerCase().startsWith(searchWithoutSpace));
    if (matchesWithoutSpace.length <= 1) {
      return getNextMatch(values, searchWithoutSpace, currentMatch);
    }
    const currentMatchLowercase = currentMatch?.toLowerCase();
    if (currentMatchLowercase && currentMatchLowercase.startsWith(searchWithoutSpace) && currentMatchLowercase.charAt(searchWithoutSpace.length) === " " && search.trim() === searchWithoutSpace) {
      return currentMatch;
    }
    const spacedMatches = values.filter((value) => value.toLowerCase().startsWith(lowerSearch));
    if (spacedMatches.length > 0) {
      const currentMatchIndex2 = currentMatch ? values.indexOf(currentMatch) : -1;
      let wrappedMatches = wrapArray(spacedMatches, Math.max(currentMatchIndex2, 0));
      const nextMatch2 = wrappedMatches.find((match) => match !== currentMatch);
      return nextMatch2 || currentMatch;
    }
  }
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const normalizedLowerSearch = normalizedSearch.toLowerCase();
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value?.toLowerCase().startsWith(normalizedLowerSearch));
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
const defaultOptions = { afterMs: 1e4, onChange: noop };
function boxAutoReset(defaultValue, options) {
  const { afterMs, onChange, getWindow: getWindow2 } = { ...defaultOptions, ...options };
  let timeout = null;
  let value = defaultValue;
  function resetAfter() {
    return getWindow2().setTimeout(
      () => {
        value = defaultValue;
        onChange?.(defaultValue);
      },
      afterMs
    );
  }
  return boxWith(() => value, (v) => {
    value = v;
    onChange?.(v);
    if (timeout) getWindow2().clearTimeout(timeout);
    timeout = resetAfter();
  });
}
class DOMTypeahead {
  #opts;
  #search;
  #onMatch = derived(() => {
    if (this.#opts.onMatch) return this.#opts.onMatch;
    return (node) => node.focus();
  });
  #getCurrentItem = derived(() => {
    if (this.#opts.getCurrentItem) return this.#opts.getCurrentItem;
    return this.#opts.getActiveElement;
  });
  constructor(opts) {
    this.#opts = opts;
    this.#search = boxAutoReset("", { afterMs: 1e3, getWindow: opts.getWindow });
    this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
    this.resetTypeahead = this.resetTypeahead.bind(this);
  }
  handleTypeaheadSearch(key, candidates) {
    if (!candidates.length) return;
    this.#search.current = this.#search.current + key;
    const currentItem = this.#getCurrentItem()();
    const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
    const values = candidates.map((item) => item.textContent?.trim() ?? "");
    const nextMatch = getNextMatch(values, this.#search.current, currentMatch);
    const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
    if (newItem) this.#onMatch()(newItem);
    return newItem;
  }
  resetTypeahead() {
    this.#search.current = "";
  }
  get search() {
    return this.#search.current;
  }
}
class GraceArea {
  #opts;
  #enabled;
  #isPointerInTransit;
  #pointerGraceArea = null;
  constructor(opts) {
    this.#opts = opts;
    this.#enabled = derived(() => this.#opts.enabled());
    this.#isPointerInTransit = boxAutoReset(false, {
      afterMs: opts.transitTimeout ?? 300,
      onChange: (value) => {
        if (!this.#enabled()) return;
        this.#opts.setIsPointerInTransit?.(value);
      },
      getWindow: () => getWindow(this.#opts.triggerNode())
    });
    watch(
      [
        opts.triggerNode,
        opts.contentNode,
        opts.enabled
      ],
      ([triggerNode, contentNode, enabled]) => {
        if (!triggerNode || !contentNode || !enabled) return;
        const handleTriggerLeave = (e) => {
          this.#createGraceArea(e, contentNode);
        };
        const handleContentLeave = (e) => {
          this.#createGraceArea(e, triggerNode);
        };
        return executeCallbacks(on(triggerNode, "pointerleave", handleTriggerLeave), on(contentNode, "pointerleave", handleContentLeave));
      }
    );
    watch(() => this.#pointerGraceArea, () => {
      const handleTrackPointerGrace = (e) => {
        if (!this.#pointerGraceArea) return;
        const target = e.target;
        if (!isElement(target)) return;
        const pointerPosition = { x: e.clientX, y: e.clientY };
        const hasEnteredTarget = opts.triggerNode()?.contains(target) || opts.contentNode()?.contains(target);
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, this.#pointerGraceArea);
        if (hasEnteredTarget) {
          this.#removeGraceArea();
        } else if (isPointerOutsideGraceArea) {
          this.#removeGraceArea();
          opts.onPointerExit();
        }
      };
      const doc = getDocument(opts.triggerNode() ?? opts.contentNode());
      if (!doc) return;
      return on(doc, "pointermove", handleTrackPointerGrace);
    });
  }
  #removeGraceArea() {
    this.#pointerGraceArea = null;
    this.#isPointerInTransit.current = false;
  }
  #createGraceArea(e, hoverTarget) {
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget)) return;
    const exitPoint = { x: e.clientX, y: e.clientY };
    const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
    const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
    const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
    const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
    this.#pointerGraceArea = graceArea;
    this.#isPointerInTransit.current = true;
  }
}
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const tipPadding = padding * 1.5;
  switch (exitSide) {
    case "top":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        },
        { x: exitPoint.x, y: exitPoint.y - tipPadding },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        }
      ];
    case "bottom":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x, y: exitPoint.y + tipPadding },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        }
      ];
    case "left":
      return [
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x - tipPadding, y: exitPoint.y },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        }
      ];
    case "right":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x + tipPadding, y: exitPoint.y },
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        }
      ];
  }
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
  else return upperHull.concat(lowerHull);
}
const CONTEXT_MENU_TRIGGER_ATTR = "data-context-menu-trigger";
const CONTEXT_MENU_CONTENT_ATTR = "data-context-menu-content";
const MenuRootContext = new Context("Menu.Root");
const MenuMenuContext = new Context("Menu.Root | Menu.Sub");
const MenuContentContext = new Context("Menu.Content");
const MenuOpenEvent = new CustomEventDispatcher("bitsmenuopen", { bubbles: false, cancelable: true });
const menuAttrs = createBitsAttrs({
  component: "menu",
  parts: [
    "trigger",
    "content",
    "sub-trigger",
    "item",
    "group",
    "group-heading",
    "checkbox-group",
    "checkbox-item",
    "radio-group",
    "radio-item",
    "separator",
    "sub-content",
    "arrow"
  ]
});
class MenuRootState {
  static create(opts) {
    const root = new MenuRootState(opts);
    return MenuRootContext.set(root);
  }
  opts;
  isUsingKeyboard = new IsUsingKeyboard();
  ignoreCloseAutoFocus = false;
  isPointerInTransit = false;
  constructor(opts) {
    this.opts = opts;
  }
  getBitsAttr = (part) => {
    return menuAttrs.getAttr(part, this.opts.variant.current);
  };
}
class MenuMenuState {
  static create(opts, root) {
    return MenuMenuContext.set(new MenuMenuState(opts, root, null));
  }
  opts;
  root;
  parentMenu;
  contentId = boxWith(() => "");
  contentNode = null;
  contentPresence;
  triggerNode = null;
  constructor(opts, root, parentMenu) {
    this.opts = opts;
    this.root = root;
    this.parentMenu = parentMenu;
    this.contentPresence = new PresenceManager({
      ref: boxWith(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
    if (parentMenu) {
      watch(() => parentMenu.opts.open.current, () => {
        if (parentMenu.opts.open.current) return;
        this.opts.open.current = false;
      });
    }
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  onOpen() {
    this.opts.open.current = true;
  }
  onClose() {
    this.opts.open.current = false;
  }
}
class MenuContentState {
  static create(opts) {
    return MenuContentContext.set(new MenuContentState(opts, MenuMenuContext.get()));
  }
  opts;
  parentMenu;
  rovingFocusGroup;
  domContext;
  attachment;
  search = "";
  #timer = 0;
  #handleTypeaheadSearch;
  mounted = false;
  #isSub;
  constructor(opts, parentMenu) {
    this.opts = opts;
    this.parentMenu = parentMenu;
    this.domContext = new DOMContext(opts.ref);
    this.attachment = attachRef(this.opts.ref, (v) => {
      if (this.parentMenu.contentNode !== v) {
        this.parentMenu.contentNode = v;
      }
    });
    parentMenu.contentId = opts.id;
    this.#isSub = opts.isSub ?? false;
    this.onkeydown = this.onkeydown.bind(this);
    this.onblur = this.onblur.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.handleInteractOutside = this.handleInteractOutside.bind(this);
    new GraceArea({
      contentNode: () => this.parentMenu.contentNode,
      triggerNode: () => this.parentMenu.triggerNode,
      enabled: () => this.parentMenu.opts.open.current && Boolean(this.parentMenu.triggerNode?.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))),
      onPointerExit: () => {
        this.parentMenu.opts.open.current = false;
      },
      setIsPointerInTransit: (value) => {
        this.parentMenu.root.isPointerInTransit = value;
      }
    });
    this.#handleTypeaheadSearch = new DOMTypeahead({
      getActiveElement: () => this.domContext.getActiveElement(),
      getWindow: () => this.domContext.getWindow()
    }).handleTypeaheadSearch;
    this.rovingFocusGroup = new RovingFocusGroup({
      rootNode: boxWith(() => this.parentMenu.contentNode),
      candidateAttr: this.parentMenu.root.getBitsAttr("item"),
      loop: this.opts.loop,
      orientation: boxWith(() => "vertical")
    });
    watch(() => this.parentMenu.contentNode, (contentNode) => {
      if (!contentNode) return;
      const handler = () => {
        afterTick(() => {
          if (!this.parentMenu.root.isUsingKeyboard.current) return;
          this.rovingFocusGroup.focusFirstCandidate();
        });
      };
      return MenuOpenEvent.listen(contentNode, handler);
    });
  }
  #getCandidateNodes() {
    const node = this.parentMenu.contentNode;
    if (!node) return [];
    const candidates = Array.from(node.querySelectorAll(`[${this.parentMenu.root.getBitsAttr("item")}]:not([data-disabled])`));
    return candidates;
  }
  #isPointerMovingToSubmenu() {
    return this.parentMenu.root.isPointerInTransit;
  }
  onCloseAutoFocus = (e) => {
    this.opts.onCloseAutoFocus.current?.(e);
    if (e.defaultPrevented || this.#isSub) return;
    if (this.parentMenu.triggerNode && isTabbable(this.parentMenu.triggerNode)) {
      e.preventDefault();
      this.parentMenu.triggerNode.focus();
    }
  };
  handleTabKeyDown(e) {
    let rootMenu = this.parentMenu;
    while (rootMenu.parentMenu !== null) {
      rootMenu = rootMenu.parentMenu;
    }
    if (!rootMenu.triggerNode) return;
    e.preventDefault();
    const nodeToFocus = getTabbableFrom(rootMenu.triggerNode, e.shiftKey ? "prev" : "next");
    if (nodeToFocus) {
      this.parentMenu.root.ignoreCloseAutoFocus = true;
      rootMenu.onClose();
      afterTick(() => {
        nodeToFocus.focus();
        afterTick(() => {
          this.parentMenu.root.ignoreCloseAutoFocus = false;
        });
      });
    } else {
      this.domContext.getDocument().body.focus();
    }
  }
  onkeydown(e) {
    if (e.defaultPrevented) return;
    if (e.key === TAB) {
      this.handleTabKeyDown(e);
      return;
    }
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(target) || !isHTMLElement(currentTarget)) return;
    const isKeydownInside = target.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current;
    const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
    const isCharacterKey = e.key.length === 1;
    const kbdFocusedEl = this.rovingFocusGroup.handleKeydown(target, e);
    if (kbdFocusedEl) return;
    if (e.code === "Space") return;
    const candidateNodes = this.#getCandidateNodes();
    if (isKeydownInside) {
      if (!isModifierKey && isCharacterKey) {
        this.#handleTypeaheadSearch(e.key, candidateNodes);
      }
    }
    if (e.target?.id !== this.parentMenu.contentId.current) return;
    if (!FIRST_LAST_KEYS.includes(e.key)) return;
    e.preventDefault();
    if (LAST_KEYS.includes(e.key)) {
      candidateNodes.reverse();
    }
    focusFirst(candidateNodes, { select: false }, () => this.domContext.getActiveElement());
  }
  onblur(e) {
    if (!isElement(e.currentTarget)) return;
    if (!isElement(e.target)) return;
    if (!e.currentTarget.contains?.(e.target)) {
      this.domContext.getWindow().clearTimeout(this.#timer);
      this.search = "";
    }
  }
  onfocus(_) {
    if (!this.parentMenu.root.isUsingKeyboard.current) return;
    afterTick(() => this.rovingFocusGroup.focusFirstCandidate());
  }
  onItemEnter() {
    return this.#isPointerMovingToSubmenu();
  }
  onItemLeave(e) {
    if (e.currentTarget.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))) return;
    if (this.#isPointerMovingToSubmenu() || this.parentMenu.root.isUsingKeyboard.current) return;
    const contentNode = this.parentMenu.contentNode;
    contentNode?.focus();
    this.rovingFocusGroup.setCurrentTabStopId("");
  }
  onTriggerLeave() {
    if (this.#isPointerMovingToSubmenu()) return true;
    return false;
  }
  handleInteractOutside(e) {
    if (!isElementOrSVGElement(e.target)) return;
    const triggerId = this.parentMenu.triggerNode?.id;
    if (e.target.id === triggerId) {
      e.preventDefault();
      return;
    }
    if (e.target.closest(`#${triggerId}`)) {
      e.preventDefault();
    }
  }
  get shouldRender() {
    return this.parentMenu.contentPresence.shouldRender;
  }
  #snippetProps = derived(() => ({ open: this.parentMenu.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "menu",
    "aria-orientation": "vertical",
    [this.parentMenu.root.getBitsAttr("content")]: "",
    "data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
    onkeydown: this.onkeydown,
    onblur: this.onblur,
    onfocus: this.onfocus,
    dir: this.parentMenu.root.opts.dir.current,
    style: { pointerEvents: "auto" },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onCloseAutoFocus: (e) => this.onCloseAutoFocus(e)
  };
}
class MenuItemSharedState {
  opts;
  content;
  attachment;
  #isFocused = false;
  constructor(opts, content) {
    this.opts = opts;
    this.content = content;
    this.attachment = attachRef(this.opts.ref);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.onblur = this.onblur.bind(this);
  }
  onpointermove(e) {
    if (e.defaultPrevented) return;
    if (!isMouseEvent(e)) return;
    if (this.opts.disabled.current) {
      this.content.onItemLeave(e);
    } else {
      const defaultPrevented = this.content.onItemEnter();
      if (defaultPrevented) return;
      const item = e.currentTarget;
      if (!isHTMLElement(item)) return;
      item.focus();
    }
  }
  onpointerleave(e) {
    if (e.defaultPrevented) return;
    if (!isMouseEvent(e)) return;
    this.content.onItemLeave(e);
  }
  onfocus(e) {
    afterTick(() => {
      if (e.defaultPrevented || this.opts.disabled.current) return;
      this.#isFocused = true;
    });
  }
  onblur(e) {
    afterTick(() => {
      if (e.defaultPrevented) return;
      this.#isFocused = false;
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    role: "menuitem",
    "aria-disabled": boolToStr(this.opts.disabled.current),
    "data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
    "data-highlighted": this.#isFocused ? "" : void 0,
    [this.content.parentMenu.root.getBitsAttr("item")]: "",
    //
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave,
    onfocus: this.onfocus,
    onblur: this.onblur,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuItemState {
  static create(opts) {
    const item = new MenuItemSharedState(opts, MenuContentContext.get());
    return new MenuItemState(opts, item);
  }
  opts;
  item;
  root;
  #isPointerDown = false;
  constructor(opts, item) {
    this.opts = opts;
    this.item = item;
    this.root = item.content.parentMenu.root;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  #handleSelect() {
    if (this.item.opts.disabled.current) return;
    const selectEvent = new CustomEvent("menuitemselect", { bubbles: true, cancelable: true });
    this.opts.onSelect.current(selectEvent);
    if (selectEvent.defaultPrevented) {
      this.item.content.parentMenu.root.isUsingKeyboard.current = false;
      return;
    }
    if (this.opts.closeOnSelect.current) {
      this.item.content.parentMenu.root.opts.onClose();
    }
  }
  onkeydown(e) {
    const isTypingAhead = this.item.content.search !== "";
    if (this.item.opts.disabled.current || isTypingAhead && e.key === SPACE) return;
    if (SELECTION_KEYS.includes(e.key)) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget.click();
      e.preventDefault();
    }
  }
  onclick(_) {
    if (this.item.opts.disabled.current) return;
    this.#handleSelect();
  }
  onpointerup(e) {
    if (e.defaultPrevented) return;
    if (!this.#isPointerDown) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget?.click();
    }
  }
  onpointerdown(_) {
    this.#isPointerDown = true;
  }
  #props = derived(() => mergeProps(this.item.props, {
    onclick: this.onclick,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuSubTriggerState {
  static create(opts) {
    const content = MenuContentContext.get();
    const item = new MenuItemSharedState(opts, content);
    const submenu = MenuMenuContext.get();
    return new MenuSubTriggerState(opts, item, content, submenu);
  }
  opts;
  item;
  content;
  submenu;
  attachment;
  #openTimer = null;
  constructor(opts, item, content, submenu) {
    this.opts = opts;
    this.item = item;
    this.content = content;
    this.submenu = submenu;
    this.attachment = attachRef(this.opts.ref, (v) => this.submenu.triggerNode = v);
    this.onpointerleave = this.onpointerleave.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
  }
  #clearOpenTimer() {
    if (this.#openTimer === null) return;
    this.content.domContext.getWindow().clearTimeout(this.#openTimer);
    this.#openTimer = null;
  }
  onpointermove(e) {
    if (!isMouseEvent(e)) return;
    if (!this.item.opts.disabled.current && !this.submenu.opts.open.current && !this.#openTimer && !this.content.parentMenu.root.isPointerInTransit) {
      this.#openTimer = this.content.domContext.setTimeout(
        () => {
          this.submenu.onOpen();
          this.#clearOpenTimer();
        },
        this.opts.openDelay.current
      );
    }
  }
  onpointerleave(e) {
    if (!isMouseEvent(e)) return;
    this.#clearOpenTimer();
  }
  onkeydown(e) {
    const isTypingAhead = this.content.search !== "";
    if (this.item.opts.disabled.current || isTypingAhead && e.key === SPACE) return;
    if (SUB_OPEN_KEYS[this.submenu.root.opts.dir.current].includes(e.key)) {
      e.currentTarget.click();
      e.preventDefault();
    }
  }
  onclick(e) {
    if (this.item.opts.disabled.current) return;
    if (!isHTMLElement(e.currentTarget)) return;
    e.currentTarget.focus();
    const selectEvent = new CustomEvent("menusubtriggerselect", { bubbles: true, cancelable: true });
    this.opts.onSelect.current(selectEvent);
    if (!this.submenu.opts.open.current) {
      this.submenu.onOpen();
      afterTick(() => {
        const contentNode = this.submenu.contentNode;
        if (!contentNode) return;
        MenuOpenEvent.dispatch(contentNode);
      });
    }
  }
  #props = derived(() => mergeProps(
    {
      "aria-haspopup": "menu",
      "aria-expanded": boolToStr(this.submenu.opts.open.current),
      "data-state": getDataOpenClosed(this.submenu.opts.open.current),
      "aria-controls": this.submenu.opts.open.current ? this.submenu.contentId.current : void 0,
      [this.submenu.root.getBitsAttr("sub-trigger")]: "",
      onclick: this.onclick,
      onpointermove: this.onpointermove,
      onpointerleave: this.onpointerleave,
      onkeydown: this.onkeydown,
      ...this.attachment
    },
    this.item.props
  ));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuSeparatorState {
  static create(opts) {
    return new MenuSeparatorState(opts, MenuRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "group",
    [this.root.getBitsAttr("separator")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ContextMenuTriggerState {
  static create(opts) {
    return new ContextMenuTriggerState(opts, MenuMenuContext.get());
  }
  opts;
  parentMenu;
  attachment;
  #point = { x: 0, y: 0 };
  virtualElement = simpleBox({
    getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...this.#point })
  });
  #longPressTimer = null;
  constructor(opts, parentMenu) {
    this.opts = opts;
    this.parentMenu = parentMenu;
    this.attachment = attachRef(this.opts.ref, (v) => this.parentMenu.triggerNode = v);
    this.oncontextmenu = this.oncontextmenu.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointercancel = this.onpointercancel.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    watch(() => this.#point, (point) => {
      this.virtualElement.current = {
        getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...point })
      };
    });
    watch(() => this.opts.disabled.current, (isDisabled) => {
      if (isDisabled) {
        this.#clearLongPressTimer();
      }
    });
  }
  #clearLongPressTimer() {
    if (this.#longPressTimer === null) return;
    getWindow(this.opts.ref.current).clearTimeout(this.#longPressTimer);
  }
  #handleOpen(e) {
    this.#point = { x: e.clientX, y: e.clientY };
    this.parentMenu.onOpen();
  }
  oncontextmenu(e) {
    if (e.defaultPrevented || this.opts.disabled.current) return;
    this.#clearLongPressTimer();
    this.#handleOpen(e);
    e.preventDefault();
    this.parentMenu.contentNode?.focus();
  }
  onpointerdown(e) {
    if (this.opts.disabled.current || isMouseEvent(e)) return;
    this.#clearLongPressTimer();
    this.#longPressTimer = getWindow(this.opts.ref.current).setTimeout(() => this.#handleOpen(e), 700);
  }
  onpointermove(e) {
    if (this.opts.disabled.current || isMouseEvent(e)) return;
    this.#clearLongPressTimer();
  }
  onpointercancel(e) {
    if (this.opts.disabled.current || isMouseEvent(e)) return;
    this.#clearLongPressTimer();
  }
  onpointerup(e) {
    if (this.opts.disabled.current || isMouseEvent(e)) return;
    this.#clearLongPressTimer();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    disabled: this.opts.disabled.current,
    "data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
    "data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
    [CONTEXT_MENU_TRIGGER_ATTR]: "",
    tabindex: -1,
    //
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointercancel: this.onpointercancel,
    onpointerup: this.onpointerup,
    oncontextmenu: this.oncontextmenu,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class MenuSubmenuState {
  static create(opts) {
    const menu = MenuMenuContext.get();
    return MenuMenuContext.set(new MenuMenuState(opts, menu.root, menu));
  }
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  static create(opts) {
    return new DismissibleLayerState(opts);
  }
  opts;
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  #isFocusInsideDOMTree = false;
  #documentObj = void 0;
  #onFocusOutside;
  #unsubClickListener = noop;
  constructor(opts) {
    this.opts = opts;
    this.#behaviorType = opts.interactOutsideBehavior;
    this.#interactOutsideProp = opts.onInteractOutside;
    this.#onFocusOutside = opts.onFocusOutside;
    let unsubEvents = noop;
    const cleanup = () => {
      this.#resetState();
      globalThis.bitsDismissableLayers.delete(this);
      this.#handleInteractOutside.destroy();
      unsubEvents();
    };
    watch(
      [
        () => this.opts.enabled.current,
        () => this.opts.ref.current
      ],
      () => {
        if (!this.opts.enabled.current || !this.opts.ref.current) return;
        afterSleep(1, () => {
          if (!this.opts.ref.current) return;
          globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
          unsubEvents();
          unsubEvents = this.#addEventListeners();
        });
        return cleanup;
      }
    );
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.opts.ref.current) return;
    afterTick(() => {
      if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
      * CAPTURE INTERACTION START
      * mark interaction-start event as intercepted.
      * mark responsible layer during interaction start
      * to avoid checking if is responsible layer during interaction end
      * when a new floating element may have been opened.
      */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }),
      /**
      * BUBBLE INTERACTION START
      * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
      * to avoid prematurely checking if other events were intercepted.
      */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
      /**
      * HANDLE FOCUS OUTSIDE
      */
      on(this.#documentObj, "focusin", this.#handleFocus)
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce(
    (e) => {
      if (!this.opts.ref.current) {
        this.#unsubClickListener();
        return;
      }
      const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
      if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
        this.#unsubClickListener();
        return;
      }
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(event);
      }
      if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
        this.#unsubClickListener();
        return;
      }
      if (e.pointerType === "touch") {
        this.#unsubClickListener();
        this.#unsubClickListener = on(this.#documentObj, "click", this.#handleDismiss, { once: true });
      } else {
        this.#interactOutsideProp.current(event);
      }
    },
    10
  );
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.opts.ref.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.opts.ref.current) return false;
    return isOrContainsTarget(this.opts.ref.current, target);
  };
  #resetState = debounce(
    () => {
      for (const eventType in this.#interceptedEvents) {
        this.#interceptedEvents[eventType] = false;
      }
      this.#isResponsibleLayer = false;
    },
    20
  );
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture
  };
}
function getTopMostDismissableLayer(layersArr = [...globalThis.bitsDismissableLayers]) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostDismissableLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
  const target = e.target;
  if (!isElementOrSVGElement(target)) return false;
  const targetIsContextMenuTrigger = Boolean(target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`));
  if ("button" in e && e.button > 0 && !targetIsContextMenuTrigger) return false;
  if ("button" in e && e.button === 0 && targetIsContextMenuTrigger) return true;
  const nodeIsContextMenu = Boolean(node.closest(`[${CONTEXT_MENU_CONTENT_ATTR}]`));
  if (targetIsContextMenuTrigger && nodeIsContextMenu) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false,
    ref
  } = $$props;
  const dismissibleLayerState = DismissibleLayerState.create({
    id: boxWith(() => id),
    interactOutsideBehavior: boxWith(() => interactOutsideBehavior),
    onInteractOutside: boxWith(() => onInteractOutside),
    enabled: boxWith(() => enabled),
    onFocusOutside: boxWith(() => onFocusOutside),
    isValidEvent: boxWith(() => isValidEvent2),
    ref
  });
  children?.($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  static create(opts) {
    return new EscapeLayerState(opts);
  }
  opts;
  domContext;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(this.opts.ref);
    let unsubEvents = noop;
    watch(() => opts.enabled.current, (enabled) => {
      if (enabled) {
        globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
        unsubEvents = this.#addEventListener();
      }
      return () => {
        unsubEvents();
        globalThis.bitsEscapeLayers.delete(this);
      };
    });
  }
  #addEventListener = () => {
    return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.opts.escapeKeydownBehavior.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
    this.opts.onEscapeKeydown.current(clonedEvent);
  };
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled,
    ref
  } = $$props;
  EscapeLayerState.create({
    escapeKeydownBehavior: boxWith(() => escapeKeydownBehavior),
    onEscapeKeydown: boxWith(() => onEscapeKeydown),
    enabled: boxWith(() => enabled),
    ref
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
class FocusScopeManager {
  static instance;
  #scopeStack = simpleBox([]);
  #focusHistory = /* @__PURE__ */ new WeakMap();
  #preFocusHistory = /* @__PURE__ */ new WeakMap();
  static getInstance() {
    if (!this.instance) {
      this.instance = new FocusScopeManager();
    }
    return this.instance;
  }
  register(scope) {
    const current = this.getActive();
    if (current && current !== scope) {
      current.pause();
    }
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      this.#preFocusHistory.set(scope, activeElement);
    }
    this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
    this.#scopeStack.current.unshift(scope);
  }
  unregister(scope) {
    this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
    const next = this.getActive();
    if (next) {
      next.resume();
    }
  }
  getActive() {
    return this.#scopeStack.current[0];
  }
  setFocusMemory(scope, element) {
    this.#focusHistory.set(scope, element);
  }
  getFocusMemory(scope) {
    return this.#focusHistory.get(scope);
  }
  isActiveScope(scope) {
    return this.getActive() === scope;
  }
  setPreFocusMemory(scope, element) {
    this.#preFocusHistory.set(scope, element);
  }
  getPreFocusMemory(scope) {
    return this.#preFocusHistory.get(scope);
  }
  clearPreFocusMemory(scope) {
    this.#preFocusHistory.delete(scope);
  }
}
class FocusScope {
  #paused = false;
  #container = null;
  #manager = FocusScopeManager.getInstance();
  #cleanupFns = [];
  #opts;
  constructor(opts) {
    this.#opts = opts;
  }
  get paused() {
    return this.#paused;
  }
  pause() {
    this.#paused = true;
  }
  resume() {
    this.#paused = false;
  }
  #cleanup() {
    for (const fn of this.#cleanupFns) {
      fn();
    }
    this.#cleanupFns = [];
  }
  mount(container) {
    if (this.#container) {
      this.unmount();
    }
    this.#container = container;
    this.#manager.register(this);
    this.#setupEventListeners();
    this.#handleOpenAutoFocus();
  }
  unmount() {
    if (!this.#container) return;
    this.#cleanup();
    this.#handleCloseAutoFocus();
    this.#manager.unregister(this);
    this.#manager.clearPreFocusMemory(this);
    this.#container = null;
  }
  #handleOpenAutoFocus() {
    if (!this.#container) return;
    const event = new CustomEvent("focusScope.onOpenAutoFocus", { bubbles: false, cancelable: true });
    this.#opts.onOpenAutoFocus.current(event);
    if (!event.defaultPrevented) {
      requestAnimationFrame(() => {
        if (!this.#container) return;
        const firstTabbable = this.#getFirstTabbable();
        if (firstTabbable) {
          firstTabbable.focus();
          this.#manager.setFocusMemory(this, firstTabbable);
        } else {
          this.#container.focus();
        }
      });
    }
  }
  #handleCloseAutoFocus() {
    const event = new CustomEvent("focusScope.onCloseAutoFocus", { bubbles: false, cancelable: true });
    this.#opts.onCloseAutoFocus.current?.(event);
    if (!event.defaultPrevented) {
      const preFocusedElement = this.#manager.getPreFocusMemory(this);
      if (preFocusedElement && document.contains(preFocusedElement)) {
        try {
          preFocusedElement.focus();
        } catch {
          document.body.focus();
        }
      }
    }
  }
  #setupEventListeners() {
    if (!this.#container || !this.#opts.trap.current) return;
    const container = this.#container;
    const doc = container.ownerDocument;
    const handleFocus = (e) => {
      if (this.#paused || !this.#manager.isActiveScope(this)) return;
      const target = e.target;
      if (!target) return;
      const isInside = container.contains(target);
      if (isInside) {
        this.#manager.setFocusMemory(this, target);
      } else {
        const lastFocused = this.#manager.getFocusMemory(this);
        if (lastFocused && container.contains(lastFocused) && isFocusable(lastFocused)) {
          e.preventDefault();
          lastFocused.focus();
        } else {
          const firstTabbable = this.#getFirstTabbable();
          const firstFocusable = this.#getAllFocusables()[0];
          (firstTabbable || firstFocusable || container).focus();
        }
      }
    };
    const handleKeydown = (e) => {
      if (!this.#opts.loop || this.#paused || e.key !== "Tab") return;
      if (!this.#manager.isActiveScope(this)) return;
      const tabbables = this.#getTabbables();
      if (tabbables.length < 2) return;
      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];
      if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    this.#cleanupFns.push(on(doc, "focusin", handleFocus, { capture: true }), on(container, "keydown", handleKeydown));
    const observer = new MutationObserver(() => {
      const lastFocused = this.#manager.getFocusMemory(this);
      if (lastFocused && !container.contains(lastFocused)) {
        const firstTabbable = this.#getFirstTabbable();
        const firstFocusable = this.#getAllFocusables()[0];
        const elementToFocus = firstTabbable || firstFocusable;
        if (elementToFocus) {
          elementToFocus.focus();
          this.#manager.setFocusMemory(this, elementToFocus);
        } else {
          container.focus();
        }
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    this.#cleanupFns.push(() => observer.disconnect());
  }
  #getTabbables() {
    if (!this.#container) return [];
    return tabbable(this.#container, { includeContainer: false, getShadowRoot: true });
  }
  #getFirstTabbable() {
    const tabbables = this.#getTabbables();
    return tabbables[0] || null;
  }
  #getAllFocusables() {
    if (!this.#container) return [];
    return focusable(this.#container, { includeContainer: false, getShadowRoot: true });
  }
  static use(opts) {
    let scope = null;
    watch(
      [
        () => opts.ref.current,
        () => opts.enabled.current
      ],
      ([ref, enabled]) => {
        if (ref && enabled) {
          if (!scope) {
            scope = new FocusScope(opts);
          }
          scope.mount(ref);
        } else if (scope) {
          scope.unmount();
          scope = null;
        }
      }
    );
    return {
      get props() {
        return { tabindex: -1 };
      }
    };
  }
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    enabled = false,
    trapFocus = false,
    loop: loop2 = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    ref
  } = $$props;
  const focusScopeState = FocusScope.use({
    enabled: boxWith(() => enabled),
    trap: boxWith(() => trapFocus),
    loop: loop2,
    onCloseAutoFocus: boxWith(() => onCloseAutoFocus),
    onOpenAutoFocus: boxWith(() => onOpenAutoFocus),
    ref
  });
  focusScope?.($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  static create(opts) {
    return new TextSelectionLayerState(opts);
  }
  opts;
  domContext;
  #unsubSelectionLock = noop;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(opts.ref);
    let unsubEvents = noop;
    watch(() => this.opts.enabled.current, (isEnabled) => {
      if (isEnabled) {
        globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
        unsubEvents();
        unsubEvents = this.#addEventListeners();
      }
      return () => {
        unsubEvents();
        this.#resetSelectionLock();
        globalThis.bitsTextSelectionLayers.delete(this);
      };
    });
  }
  #addEventListeners() {
    return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
  }
  #pointerdown = (e) => {
    const node = this.opts.ref.current;
    const target = e.target;
    if (!isHTMLElement(node) || !isHTMLElement(target) || !this.opts.enabled.current) return;
    if (!isHighestLayer(this) || !contains(node, target)) return;
    this.opts.onPointerDown.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled,
    ref
  } = $$props;
  TextSelectionLayerState.create({
    id: boxWith(() => id),
    onPointerDown: boxWith(() => onPointerDown),
    onPointerUp: boxWith(() => onPointerUp),
    enabled: boxWith(() => enabled && preventOverflowTextSelection),
    ref
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = "bits") {
  globalThis.bitsIdCounter.current++;
  return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
class SharedState {
  #factory;
  #subscribers = 0;
  #state;
  #scope;
  constructor(factory) {
    this.#factory = factory;
  }
  #dispose() {
    this.#subscribers -= 1;
    if (this.#scope && this.#subscribers <= 0) {
      this.#scope();
      this.#state = void 0;
      this.#scope = void 0;
    }
  }
  get(...args) {
    this.#subscribers += 1;
    if (this.#state === void 0) {
      this.#scope = () => {
      };
    }
    return this.#state;
  }
}
const lockMap = new SvelteMap();
let initialBodyStyle = null;
let cleanupTimeoutId = null;
let isInCleanupTransition = false;
const anyLocked = boxWith(() => {
  for (const value of lockMap.values()) {
    if (value) return true;
  }
  return false;
});
let cleanupScheduledAt = null;
const bodyLockStackCount = new SharedState(() => {
  function resetBodyStyle() {
    return;
  }
  function cancelPendingCleanup() {
    if (cleanupTimeoutId === null) return;
    window.clearTimeout(cleanupTimeoutId);
    cleanupTimeoutId = null;
  }
  function scheduleCleanupIfNoNewLocks(delay, callback) {
    cancelPendingCleanup();
    isInCleanupTransition = true;
    cleanupScheduledAt = Date.now();
    const currentCleanupId = cleanupScheduledAt;
    const cleanupFn = () => {
      cleanupTimeoutId = null;
      if (cleanupScheduledAt !== currentCleanupId) return;
      if (!isAnyLocked(lockMap)) {
        isInCleanupTransition = false;
        callback();
      } else {
        isInCleanupTransition = false;
      }
    };
    const actualDelay = delay === null ? 24 : delay;
    cleanupTimeoutId = window.setTimeout(cleanupFn, actualDelay);
  }
  function ensureInitialStyleCaptured() {
    if (initialBodyStyle === null && lockMap.size === 0 && !isInCleanupTransition) {
      initialBodyStyle = document.body.getAttribute("style");
    }
  }
  watch(() => anyLocked.current, () => {
    if (!anyLocked.current) return;
    ensureInitialStyleCaptured();
    isInCleanupTransition = false;
    const htmlStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const hasStableGutter = htmlStyle.scrollbarGutter?.includes("stable") || bodyStyle.scrollbarGutter?.includes("stable");
    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseInt(bodyStyle.paddingRight ?? "0", 10);
    const config = {
      padding: paddingRight + verticalScrollbarWidth,
      margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
    };
    if (verticalScrollbarWidth > 0 && !hasStableGutter) {
      document.body.style.paddingRight = `${config.padding}px`;
      document.body.style.marginRight = `${config.margin}px`;
      document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
    }
    document.body.style.overflow = "hidden";
    if (isIOS) {
      on(
        document,
        "touchmove",
        (e) => {
          if (e.target !== document.documentElement) return;
          if (e.touches.length > 1) return;
          e.preventDefault();
        },
        { passive: false }
      );
    }
    afterTick(() => {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    });
  });
  return {
    get lockMap() {
      return lockMap;
    },
    resetBodyStyle,
    scheduleCleanupIfNoNewLocks,
    cancelPendingCleanup,
    ensureInitialStyleCaptured
  };
});
class BodyScrollLock {
  #id = useId();
  #initialState;
  #restoreScrollDelay = () => null;
  #countState;
  locked;
  constructor(initialState, restoreScrollDelay = () => null) {
    this.#initialState = initialState;
    this.#restoreScrollDelay = restoreScrollDelay;
    this.#countState = bodyLockStackCount.get();
    if (!this.#countState) return;
    this.#countState.cancelPendingCleanup();
    this.#countState.ensureInitialStyleCaptured();
    this.#countState.lockMap.set(this.#id, this.#initialState ?? false);
    this.locked = boxWith(() => this.#countState.lockMap.get(this.#id) ?? false, (v) => this.#countState.lockMap.set(this.#id, v));
  }
}
function isAnyLocked(map) {
  for (const [_, value] of map) {
    if (value) return true;
  }
  return false;
}
function Scroll_lock($$payload, $$props) {
  push();
  let {
    preventScroll = true,
    restoreScrollDelay = null
  } = $$props;
  if (preventScroll) {
    new BodyScrollLock(preventScroll, () => restoreScrollDelay);
  }
  pop();
}
function get(valueOrGetValue) {
  return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element) {
  if (typeof window === "undefined") return 1;
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
  return {
    [`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
    [`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
    [`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
    [`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
    [`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
  };
}
function useFloating(options) {
  const openOption = get(options.open) ?? true;
  const middlewareOption = get(options.middleware);
  const transformOption = get(options.transform) ?? true;
  const placementOption = get(options.placement) ?? "bottom";
  const strategyOption = get(options.strategy) ?? "absolute";
  const sideOffsetOption = get(options.sideOffset) ?? 0;
  const alignOffsetOption = get(options.alignOffset) ?? 0;
  const reference = options.reference;
  let x = 0;
  let y = 0;
  const floating = simpleBox(null);
  let strategy = strategyOption;
  let placement = placementOption;
  let middlewareData = {};
  let isPositioned = false;
  const floatingStyles = (() => {
    const xVal = floating.current ? roundByDPR(floating.current, x) : x;
    const yVal = floating.current ? roundByDPR(floating.current, y) : y;
    if (transformOption) {
      return {
        position: strategy,
        left: "0",
        top: "0",
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...floating.current && getDPR(floating.current) >= 1.5 && { willChange: "transform" }
      };
    }
    return {
      position: strategy,
      left: `${xVal}px`,
      top: `${yVal}px`
    };
  })();
  function update() {
    if (reference.current === null || floating.current === null) return;
    computePosition(reference.current, floating.current, {
      middleware: middlewareOption,
      placement: placementOption,
      strategy: strategyOption
    }).then((position) => {
      if (!openOption && x !== 0 && y !== 0) {
        const maxExpectedOffset = Math.max(Math.abs(sideOffsetOption), Math.abs(alignOffsetOption), 15);
        if (position.x <= maxExpectedOffset && position.y <= maxExpectedOffset) return;
      }
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }
  return {
    floating,
    reference,
    get strategy() {
      return strategy;
    },
    get placement() {
      return placement;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles;
    },
    get update() {
      return update;
    }
  };
}
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
const FloatingRootContext = new Context("Floating.Root");
const FloatingContentContext = new Context("Floating.Content");
const FloatingTooltipRootContext = new Context("Floating.Root");
class FloatingRootState {
  static create(tooltip = false) {
    return tooltip ? FloatingTooltipRootContext.set(new FloatingRootState()) : FloatingRootContext.set(new FloatingRootState());
  }
  anchorNode = simpleBox(null);
  customAnchorNode = simpleBox(null);
  triggerNode = simpleBox(null);
  constructor() {
  }
}
class FloatingContentState {
  static create(opts, tooltip = false) {
    return tooltip ? FloatingContentContext.set(new FloatingContentState(opts, FloatingTooltipRootContext.get())) : FloatingContentContext.set(new FloatingContentState(opts, FloatingRootContext.get()));
  }
  opts;
  root;
  // nodes
  contentRef = simpleBox(null);
  wrapperRef = simpleBox(null);
  arrowRef = simpleBox(null);
  contentAttachment = attachRef(this.contentRef);
  wrapperAttachment = attachRef(this.wrapperRef);
  arrowAttachment = attachRef(this.arrowRef);
  // ids
  arrowId = simpleBox(useId());
  #transformedStyle = derived(() => {
    if (typeof this.opts.style === "string") return cssToStyleObj(this.opts.style);
    if (!this.opts.style) return {};
  });
  #updatePositionStrategy = void 0;
  #arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
  #arrowWidth = derived(() => this.#arrowSize?.width ?? 0);
  #arrowHeight = derived(() => this.#arrowSize?.height ?? 0);
  #desiredPlacement = derived(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
  #boundary = derived(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
  #hasExplicitBoundaries = derived(() => this.#boundary().length > 0);
  get hasExplicitBoundaries() {
    return this.#hasExplicitBoundaries();
  }
  set hasExplicitBoundaries($$value) {
    return this.#hasExplicitBoundaries($$value);
  }
  #detectOverflowOptions = derived(() => ({
    padding: this.opts.collisionPadding.current,
    boundary: this.#boundary().filter(isNotNull),
    altBoundary: this.hasExplicitBoundaries
  }));
  get detectOverflowOptions() {
    return this.#detectOverflowOptions();
  }
  set detectOverflowOptions($$value) {
    return this.#detectOverflowOptions($$value);
  }
  #availableWidth = void 0;
  #availableHeight = void 0;
  #anchorWidth = void 0;
  #anchorHeight = void 0;
  #middleware = derived(() => [
    offset({
      mainAxis: this.opts.sideOffset.current + this.#arrowHeight(),
      alignmentAxis: this.opts.alignOffset.current
    }),
    this.opts.avoidCollisions.current && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: this.opts.sticky.current === "partial" ? limitShift() : void 0,
      ...this.detectOverflowOptions
    }),
    this.opts.avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
    size({
      ...this.detectOverflowOptions,
      apply: ({ rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        this.#availableWidth = availableWidth;
        this.#availableHeight = availableHeight;
        this.#anchorWidth = anchorWidth;
        this.#anchorHeight = anchorHeight;
      }
    }),
    this.arrowRef.current && arrow({
      element: this.arrowRef.current,
      padding: this.opts.arrowPadding.current
    }),
    transformOrigin({
      arrowWidth: this.#arrowWidth(),
      arrowHeight: this.#arrowHeight()
    }),
    this.opts.hideWhenDetached.current && hide({
      strategy: "referenceHidden",
      ...this.detectOverflowOptions
    })
  ].filter(Boolean));
  get middleware() {
    return this.#middleware();
  }
  set middleware($$value) {
    return this.#middleware($$value);
  }
  floating;
  #placedSide = derived(() => getSideFromPlacement(this.floating.placement));
  get placedSide() {
    return this.#placedSide();
  }
  set placedSide($$value) {
    return this.#placedSide($$value);
  }
  #placedAlign = derived(() => getAlignFromPlacement(this.floating.placement));
  get placedAlign() {
    return this.#placedAlign();
  }
  set placedAlign($$value) {
    return this.#placedAlign($$value);
  }
  #arrowX = derived(() => this.floating.middlewareData.arrow?.x ?? 0);
  get arrowX() {
    return this.#arrowX();
  }
  set arrowX($$value) {
    return this.#arrowX($$value);
  }
  #arrowY = derived(() => this.floating.middlewareData.arrow?.y ?? 0);
  get arrowY() {
    return this.#arrowY();
  }
  set arrowY($$value) {
    return this.#arrowY($$value);
  }
  #cannotCenterArrow = derived(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
  get cannotCenterArrow() {
    return this.#cannotCenterArrow();
  }
  set cannotCenterArrow($$value) {
    return this.#cannotCenterArrow($$value);
  }
  contentZIndex;
  #arrowBaseSide = derived(() => OPPOSITE_SIDE[this.placedSide]);
  get arrowBaseSide() {
    return this.#arrowBaseSide();
  }
  set arrowBaseSide($$value) {
    return this.#arrowBaseSide($$value);
  }
  #wrapperProps = derived(() => ({
    id: this.opts.wrapperId.current,
    "data-bits-floating-content-wrapper": "",
    style: {
      ...this.floating.floatingStyles,
      // keep off page when measuring
      transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: this.contentZIndex,
      "--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
      "--bits-floating-available-width": `${this.#availableWidth}px`,
      "--bits-floating-available-height": `${this.#availableHeight}px`,
      "--bits-floating-anchor-width": `${this.#anchorWidth}px`,
      "--bits-floating-anchor-height": `${this.#anchorHeight}px`,
      // hide the content if using the hide middleware and should be hidden
      ...this.floating.middlewareData.hide?.referenceHidden && {
        visibility: "hidden",
        "pointer-events": "none"
      },
      ...this.#transformedStyle()
    },
    // Floating UI calculates logical alignment based the `dir` attribute
    dir: this.opts.dir.current,
    ...this.wrapperAttachment
  }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  set wrapperProps($$value) {
    return this.#wrapperProps($$value);
  }
  #props = derived(() => ({
    "data-side": this.placedSide,
    "data-align": this.placedAlign,
    style: styleToString({ ...this.#transformedStyle() }),
    ...this.contentAttachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #arrowStyle = derived(() => ({
    position: "absolute",
    left: this.arrowX ? `${this.arrowX}px` : void 0,
    top: this.arrowY ? `${this.arrowY}px` : void 0,
    [this.arrowBaseSide]: 0,
    "transform-origin": {
      top: "",
      right: "0 0",
      bottom: "center 0",
      left: "100% 0"
    }[this.placedSide],
    transform: {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)"
    }[this.placedSide],
    visibility: this.cannotCenterArrow ? "hidden" : void 0
  }));
  get arrowStyle() {
    return this.#arrowStyle();
  }
  set arrowStyle($$value) {
    return this.#arrowStyle($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    if (opts.customAnchor) {
      this.root.customAnchorNode.current = opts.customAnchor.current;
    }
    watch(() => opts.customAnchor.current, (customAnchor) => {
      this.root.customAnchorNode.current = customAnchor;
    });
    this.floating = useFloating({
      strategy: () => this.opts.strategy.current,
      placement: () => this.#desiredPlacement(),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      open: () => this.opts.enabled.current,
      sideOffset: () => this.opts.sideOffset.current,
      alignOffset: () => this.opts.alignOffset.current
    });
    watch(() => this.contentRef.current, (contentNode) => {
      if (!contentNode) return;
      const win = getWindow(contentNode);
      this.contentZIndex = win.getComputedStyle(contentNode).zIndex;
    });
  }
}
class FloatingAnchorState {
  static create(opts, tooltip = false) {
    return tooltip ? new FloatingAnchorState(opts, FloatingTooltipRootContext.get()) : new FloatingAnchorState(opts, FloatingRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    if (opts.virtualEl && opts.virtualEl.current) {
      root.triggerNode = boxFrom(opts.virtualEl.current);
    } else {
      root.triggerNode = opts.ref;
    }
  }
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function getSideFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$payload, $$props) {
  push();
  let { children, tooltip = false } = $$props;
  FloatingRootState.create(tooltip);
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_anchor($$payload, $$props) {
  push();
  let {
    id,
    children,
    virtualEl,
    ref,
    tooltip = false
  } = $$props;
  FloatingAnchorState.create(
    {
      id: boxWith(() => id),
      virtualEl: boxWith(() => virtualEl),
      ref
    },
    tooltip
  );
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content($$payload, $$props) {
  push();
  let {
    content,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    id,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding = 0,
    hideWhenDetached = false,
    onPlaced = () => {
    },
    sticky = "partial",
    updatePositionStrategy = "optimized",
    strategy = "fixed",
    dir = "ltr",
    style = {},
    wrapperId = useId(),
    customAnchor = null,
    enabled,
    tooltip = false
  } = $$props;
  const contentState = FloatingContentState.create(
    {
      side: boxWith(() => side),
      sideOffset: boxWith(() => sideOffset),
      align: boxWith(() => align),
      alignOffset: boxWith(() => alignOffset),
      id: boxWith(() => id),
      arrowPadding: boxWith(() => arrowPadding),
      avoidCollisions: boxWith(() => avoidCollisions),
      collisionBoundary: boxWith(() => collisionBoundary),
      collisionPadding: boxWith(() => collisionPadding),
      hideWhenDetached: boxWith(() => hideWhenDetached),
      onPlaced: boxWith(() => onPlaced),
      sticky: boxWith(() => sticky),
      updatePositionStrategy: boxWith(() => updatePositionStrategy),
      strategy: boxWith(() => strategy),
      dir: boxWith(() => dir),
      style: boxWith(() => style),
      enabled: boxWith(() => enabled),
      wrapperId: boxWith(() => wrapperId),
      customAnchor: boxWith(() => customAnchor)
    },
    tooltip
  );
  const mergedProps = mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } });
  content?.($$payload, {
    props: contentState.props,
    wrapperProps: mergedProps
  });
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content_static($$payload, $$props) {
  push();
  let { content } = $$props;
  content?.($$payload, { props: {}, wrapperProps: {} });
  $$payload.out += `<!---->`;
  pop();
}
function Popper_content($$payload, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$payload.out += "<!--[-->";
    Floating_layer_content_static($$payload, { content });
  } else {
    $$payload.out += "<!--[!-->";
    Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
  push();
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop: loop2,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    ref,
    tooltip = false,
    contentPointerEvents = "auto",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let content = function($$payload2, { props: floatingProps, wrapperProps }) {
      if (restProps.forceMount && enabled) {
        $$payload2.out += "<!--[-->";
        Scroll_lock($$payload2, { preventScroll });
      } else if (!restProps.forceMount) {
        $$payload2.out += "<!--[1-->";
        Scroll_lock($$payload2, { preventScroll });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, {
            onEscapeKeydown,
            escapeKeydownBehavior,
            enabled,
            ref,
            children: ($$payload4) => {
              {
                let children = function($$payload5, { props: dismissibleProps }) {
                  Text_selection_layer($$payload5, {
                    id,
                    preventOverflowTextSelection,
                    onPointerDown,
                    onPointerUp,
                    enabled,
                    ref,
                    children: ($$payload6) => {
                      popper?.($$payload6, {
                        props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: contentPointerEvents } }),
                        wrapperProps
                      });
                      $$payload6.out += `<!---->`;
                    }
                  });
                };
                Dismissible_layer($$payload4, {
                  id,
                  onInteractOutside,
                  onFocusOutside,
                  interactOutsideBehavior,
                  isValidEvent: isValidEvent2,
                  enabled,
                  ref,
                  children
                });
              }
            }
          });
        };
        Focus_scope($$payload2, {
          onOpenAutoFocus,
          onCloseAutoFocus,
          loop: loop2,
          enabled,
          trapFocus,
          forceMount: restProps.forceMount,
          ref,
          focusScope
        });
      }
      $$payload2.out += `<!---->`;
    };
    Popper_content($$payload, {
      isStatic,
      id,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      enabled,
      tooltip,
      content,
      $$slots: { content: true }
    });
  }
  pop();
}
function Popper_layer($$payload, $$props) {
  let {
    popper,
    open,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop: loop2,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    ref,
    shouldRender,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (shouldRender) {
    $$payload.out += "<!--[-->";
    Popper_layer_inner($$payload, spread_props([
      {
        popper,
        onEscapeKeydown,
        escapeKeydownBehavior,
        preventOverflowTextSelection,
        id,
        onPointerDown,
        onPointerUp,
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        sticky,
        hideWhenDetached,
        updatePositionStrategy,
        strategy,
        dir,
        preventScroll,
        wrapperId,
        style,
        onPlaced,
        customAnchor,
        isStatic,
        enabled: open,
        onInteractOutside,
        onCloseAutoFocus,
        onOpenAutoFocus,
        interactOutsideBehavior,
        loop: loop2,
        trapFocus,
        isValidEvent: isValidEvent2,
        onFocusOutside,
        forceMount: false,
        ref
      },
      restProps
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_force_mount($$payload, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop: loop2,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$payload, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop: loop2,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
function Menu_sub($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    children
  } = $$props;
  MenuSubmenuState.create({
    open: boxWith(() => open, (v) => {
      open = v;
      onOpenChange?.(v);
    }),
    onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
  });
  Floating_layer($$payload, {
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    }
  });
  bind_props($$props, { open });
  pop();
}
function Menu_item($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    children,
    ref = null,
    id = createId(uid),
    disabled = false,
    onSelect = noop,
    closeOnSelect = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = MenuItemState.create({
    id: boxWith(() => id),
    disabled: boxWith(() => disabled),
    onSelect: boxWith(() => onSelect),
    ref: boxWith(() => ref, (v) => ref = v),
    closeOnSelect: boxWith(() => closeOnSelect)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Menu_separator($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = createId(uid),
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const separatorState = MenuSeparatorState.create({
    id: boxWith(() => id),
    ref: boxWith(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, separatorState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Menu_sub_content($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    loop: loop2 = true,
    onInteractOutside = noop,
    forceMount = false,
    onEscapeKeydown = noop,
    interactOutsideBehavior = "defer-otherwise-close",
    escapeKeydownBehavior = "defer-otherwise-close",
    onOpenAutoFocus: onOpenAutoFocusProp = noop,
    onCloseAutoFocus: onCloseAutoFocusProp = noop,
    onFocusOutside = noop,
    side = "right",
    trapFocus = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const subContentState = MenuContentState.create({
    id: boxWith(() => id),
    loop: boxWith(() => loop2),
    ref: boxWith(() => ref, (v) => ref = v),
    isSub: true,
    onCloseAutoFocus: boxWith(() => handleCloseAutoFocus)
  });
  function onkeydown(e) {
    const isKeyDownInside = e.currentTarget.contains(e.target);
    const isCloseKey = SUB_CLOSE_KEYS[subContentState.parentMenu.root.opts.dir.current].includes(e.key);
    if (isKeyDownInside && isCloseKey) {
      subContentState.parentMenu.onClose();
      const triggerNode = subContentState.parentMenu.triggerNode;
      triggerNode?.focus();
      e.preventDefault();
    }
  }
  const dataAttr = subContentState.parentMenu.root.getBitsAttr("sub-content");
  const mergedProps = mergeProps(restProps, subContentState.props, { side, onkeydown, [dataAttr]: "" });
  function handleOpenAutoFocus(e) {
    onOpenAutoFocusProp(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (subContentState.parentMenu.root.isUsingKeyboard && subContentState.parentMenu.contentNode) {
      MenuOpenEvent.dispatch(subContentState.parentMenu.contentNode);
    }
  }
  function handleCloseAutoFocus(e) {
    onCloseAutoFocusProp(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
  }
  function handleInteractOutside(e) {
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    subContentState.parentMenu.onClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    subContentState.parentMenu.onClose();
  }
  function handleOnFocusOutside(e) {
    onFocusOutside(e);
    if (e.defaultPrevented) return;
    if (!isHTMLElement(e.target)) return;
    if (e.target.id !== subContentState.parentMenu.triggerNode?.id) {
      subContentState.parentMenu.onClose();
    }
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, mergedProps, { style: getFloatingContentCSSVars("menu") });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...subContentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps }, null)}><div${spread_attributes({ ...finalProps }, null)}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        {
          ref: subContentState.opts.ref,
          interactOutsideBehavior,
          escapeKeydownBehavior,
          onOpenAutoFocus: handleOpenAutoFocus,
          enabled: subContentState.parentMenu.opts.open.current,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onFocusOutside: handleOnFocusOutside,
          preventScroll: false,
          loop: loop2,
          trapFocus,
          shouldRender: subContentState.shouldRender,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else if (!forceMount) {
    $$payload.out += "<!--[1-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, mergedProps, { style: getFloatingContentCSSVars("menu") });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...subContentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps }, null)}><div${spread_attributes({ ...finalProps }, null)}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer($$payload, spread_props([
        mergedProps,
        {
          ref: subContentState.opts.ref,
          interactOutsideBehavior,
          escapeKeydownBehavior,
          onCloseAutoFocus: handleCloseAutoFocus,
          onOpenAutoFocus: handleOpenAutoFocus,
          open: subContentState.parentMenu.opts.open.current,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onFocusOutside: handleOnFocusOutside,
          preventScroll: false,
          loop: loop2,
          trapFocus,
          shouldRender: subContentState.shouldRender,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Menu_sub_trigger($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    disabled = false,
    ref = null,
    children,
    child,
    onSelect = noop,
    openDelay = 100,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const subTriggerState = MenuSubTriggerState.create({
    disabled: boxWith(() => disabled),
    onSelect: boxWith(() => onSelect),
    id: boxWith(() => id),
    ref: boxWith(() => ref, (v) => ref = v),
    openDelay: boxWith(() => openDelay)
  });
  const mergedProps = mergeProps(restProps, subTriggerState.props);
  Floating_layer_anchor($$payload, {
    id,
    ref: subTriggerState.opts.ref,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  bind_props($$props, { ref });
  pop();
}
function ChangeStatus$2($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeStatus(newStatus) {
    const endpoint = `/applied-controls/${row?.meta?.id}/status`;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      console.error("Error changing status:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changestatus1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeStatus(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <!---->`;
  Menu_separator($$payload, { class: "-mx-1 my-1 block h-px bg-surface-100" });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeImpact($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeImpact(newImpact) {
    const endpoint = `/applied-controls/${row?.meta?.id}/control_impact`;
    const impactValue = newImpact === "--" ? "" : newImpact;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ control_impact: impactValue })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      console.error("Error changing impact:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changeimpact1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeImpact(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeEffort($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeEffort(newEffort) {
    const endpoint = `/applied-controls/${row?.meta?.id}/effort`;
    const effortValue = newEffort === "--" ? "" : newEffort;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ effort: effortValue })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      console.error("Error changing effort:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changeeffort1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeEffort(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeCsfFunction($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeCsfFunction(newCsfFunction) {
    const endpoint = `/applied-controls/${row?.meta?.id}/csf_function`;
    const csfFunctionValue = newCsfFunction === "--" ? "" : newCsfFunction;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csf_function: csfFunctionValue })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      console.error("Error changing CSF function:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changecsffunction2())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeCsfFunction(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeStatus$1($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeStatus(newStatus) {
    const endpoint = `/evidences/${row?.meta?.id}/status`;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({ object: evidence().toLowerCase() })
      });
      handler.invalidate();
    } catch (error) {
      console.error("Error changing status:", error);
      flash.set({
        type: "error",
        message: `Error updating evidence: ${error.message}`
      });
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changestatus1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeStatus(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeStatus($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeStatus(newStatus) {
    const endpoint = `/task-nodes/${row?.meta?.id}/status`;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({ object: tasknode1().toLowerCase() })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({ object: tasknode1().toLowerCase() })
      });
      console.error("Error changing status:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changestatus1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeStatus(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function SelectObject($$payload, $$props) {
  push();
  const flash = getFlash(page$1);
  let { row, handler, URLModel } = $$props;
  async function changeSelected() {
    if (!URLModel) {
      console.error("The URLModel is undefined in the SelectObject component, which prevents the object selected/selected from the ContextMenu.");
      return;
    }
    const endpoint = `/${URLModel}/${row?.meta?.id}/is_selected`;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_selected: !row.is_selected })
    };
    const model = getModelInfo(URLModel);
    const objectTypeName = safeTranslate(model.localName);
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({ object: objectTypeName.toLowerCase() })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({ object: objectTypeName.toLowerCase() })
      });
      console.error("Error changing status:", error);
    }
  }
  if (row) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Menu_item($$payload, {
      onclick: changeSelected,
      class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-surface-50",
      children: ($$payload2) => {
        $$payload2.out += `<span class="flex items-center">${escape_html(row.is_selected ? deselect() : select())}</span>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ChangePriority($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changePriority(newPriority) {
    const endpoint = `/applied-controls/${row?.meta?.id}/priority`;
    const priorityValue = newPriority === "--" ? "" : newPriority;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: priorityValue })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: appliedcontrol1().toLowerCase()
        })
      });
      console.error("Error changing priority:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changepriority1())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changePriority(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function ChangeAttackStage($$payload, $$props) {
  push();
  let { row, handler } = $$props;
  const flash = getFlash(page$1);
  let options = [];
  async function changeAttackStage(newStage) {
    const endpoint = `/elementary-actions/${row?.meta?.id}/attack_stage`;
    const requestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attack_stage: parseInt(newStage) })
    };
    try {
      const response = await fetch(endpoint, requestInit);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      flash.set({
        type: "success",
        message: successfullyupdatedobject2({
          object: elementaryaction1().toLowerCase()
        })
      });
      handler.invalidate();
    } catch (error) {
      flash.set({
        type: "error",
        message: errorupdatingobject2({
          object: elementaryaction1().toLowerCase()
        })
      });
      console.error("Error changing attack stage:", error);
    }
  }
  $$payload.out += `<!---->`;
  Menu_sub($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Menu_sub_trigger($$payload2, {
        class: "flex h-10 select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! data-highlighted:bg-muted data-[state=open]:bg-surface-50",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center">${escape_html(changeattackstage2())}</div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Menu_sub_content($$payload2, {
        class: "z-50 w-full min-w-[180px] max-w-[209px] outline-hidden card bg-white px-1 py-1.5 shadow-md border border-surface-200 cursor-default data-highlighted:bg-surface-50",
        sideOffset: 10,
        children: ($$payload3) => {
          const each_array = ensure_array_like(options);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$payload3.out += `<!---->`;
            Menu_item($$payload3, {
              class: "flex h-10 select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium outline-hidden ring-0! ring-transparent! hover:bg-surface-50",
              onclick: async () => await changeAttackStage(option.value),
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(safeTranslate(option.label))}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function tableSourceMapper(source2, keys) {
  return source2.map((row) => {
    const mappedRow = {};
    keys.forEach((key) => mappedRow[key] = row[key]);
    return mappedRow;
  });
}
const YES_NO_OPTIONS = [
  { label: "yes", value: "true" },
  { label: "no", value: "false" }
];
const SOLUTION_CRITICALITY_OPTIONS = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" }
];
const ENTITY_CRITICALITY_OPTIONS = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" }
];
const CONTENT_TYPE_OPTIONS = [
  { label: "DOMAIN", value: "DO" },
  { label: "GLOBAL", value: "GL" },
  { label: "ENCLAVE", value: "EN" }
];
const YES_NO_UNSET_OPTIONS = [
  { label: "YES", value: "YES" },
  { label: "NO", value: "NO" },
  { label: "--", value: "--" }
];
const RISK_STAGE_OPTIONS = [
  { label: "Inherent", value: "inherent" },
  { label: "Current", value: "current" },
  { label: "Residual", value: "residual" }
];
const PERIMETER_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "perimeters/lc_status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const ACCREDITATION_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "terminologies?field_path=accreditation.status",
    optionsLabelField: "name",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const ACCREDITATION_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "terminologies?field_path=accreditation.category",
    optionsLabelField: "name",
    label: "category",
    browserCache: "force-cache",
    multiple: true
  }
};
const DOMAIN_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "folders?content_type=DO&content_type=GL",
    label: "domain",
    multiple: true
  }
};
const LABELS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "filtering-labels",
    label: "filtering_labels",
    optionsLabelField: "label",
    multiple: true
  }
};
const LIBRARY_LABELS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "library-filtering-labels",
    label: "libraryFilteringLabels",
    optionsLabelField: "label",
    multiple: true
  }
};
const CONTENT_TYPE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "contentType",
    options: CONTENT_TYPE_OPTIONS,
    multiple: true
  }
};
const PRIORITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/priority",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    label: "priority",
    multiple: true
  }
};
const EFFORT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/effort",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    label: "effort",
    multiple: true
  }
};
const PERIMETER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "perimeter",
    optionsEndpoint: "perimeters",
    multiple: true
  }
};
const RISK_ASSESSMENT_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    options: [
      { label: "--", value: "--" },
      { label: "planned", value: "planned" },
      { label: "in_progress", value: "in_progress" },
      { label: "in_review", value: "in_review" },
      { label: "done", value: "done" },
      { label: "deprecated", value: "deprecated" }
    ],
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const QUANT_RISK_SCENARIO_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    options: [
      { label: "--", value: "--" },
      { label: "draft", value: "draft" },
      { label: "open", value: "open" },
      { label: "mitigate", value: "mitigate" },
      { label: "accept", value: "accept" },
      { label: "transfer", value: "transfer" }
    ],
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const RISK_STAGE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "risk_stage",
    options: RISK_STAGE_OPTIONS,
    multiple: true
  }
};
const COMPLIANCE_ASSESSMENT_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "compliance-assessments/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const ENTITY_ASSESSMENT_CONCLUSION_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "entity-assessments/conclusion",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "conclusion",
    browserCache: "force-cache",
    multiple: true
  }
};
const REQUIREMENT_ASSESSMENT_RESULT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "requirement-assessments/result",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "result",
    browserCache: "force-cache",
    multiple: true
  }
};
const APPLIED_CONTROL_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const APPLIED_CONTROL_IMPACT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/control_impact",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "controlImpact",
    browserCache: "force-cache",
    multiple: true
  }
};
const APPLIED_CONTROL_EFFORT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/effort",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "effort",
    browserCache: "force-cache",
    multiple: true
  }
};
const RISK_TOLERANCE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "withinTolerance",
    options: YES_NO_UNSET_OPTIONS,
    multiple: false
  }
};
const TASK_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "task-nodes/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const INCIDENT_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "incidents/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const CAMPAIGN_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "campaigns/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const INCIDENT_DETECTION_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "incidents/detection",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "detection",
    browserCache: "force-cache",
    multiple: true
  }
};
const INCIDENT_SEVERITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "incidents/severity",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "severity",
    browserCache: "force-cache",
    multiple: true
  }
};
const FINDINGS_SEVERITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "findings/severity",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "severity",
    browserCache: "force-cache",
    multiple: true
  }
};
const FINDINGS_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "findings/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const FINDINGS_PRIORITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "findings/priority",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "priority",
    browserCache: "force-cache",
    multiple: true
  }
};
const EXCEPTION_SEVERITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "security-exceptions/severity",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "severity",
    browserCache: "force-cache",
    multiple: true
  }
};
const EXCEPTION_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "security-exceptions/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const PROCESSING_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "processings/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const LEGAL_BASIS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "purposes/legal_basis",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "legalBasis",
    browserCache: "force-cache",
    multiple: true
  }
};
const PROCESSING_NATURE_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "processing-natures",
    label: "nature",
    browserCache: "force-cache",
    multiple: true
  }
};
const ORGANISATION_OBJECTIVE_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "organisation-objectives/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const ORGANISATION_OBJECTIVE_HEALTH_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "organisation-objectives/health",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "health",
    browserCache: "force-cache",
    multiple: true
  }
};
const TREATMENT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "risk-scenarios/treatment",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "treatment",
    browserCache: "force-cache",
    multiple: true
  }
};
const STATE_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "risk-acceptances/state",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "state",
    browserCache: "force-cache",
    multiple: true
  }
};
const APPROVER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "approver",
    optionsEndpoint: "users?is_approver=true",
    optionsLabelField: "email",
    multiple: true
  }
};
const REQUESTER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "requester",
    optionsEndpoint: "users",
    optionsLabelField: "email",
    multiple: true
  }
};
const LINKED_MODELS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "linkedModels",
    optionsEndpoint: "validation-flows/linked_models",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const RISK_ASSESSMENT_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "riskAssessment",
    optionsEndpoint: "risk-assessments",
    multiple: true
  }
};
const REFERENCE_CONTROL_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "referenceControl",
    optionsEndpoint: "reference-controls",
    multiple: true
  }
};
const COMPLIANCE_ASSESSMENT_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "complianceAssessment",
    optionsEndpoint: "compliance-assessments",
    multiple: true
  }
};
const PROVIDER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "provider",
    optionsEndpoint: "stored-libraries/provider",
    optionsLabelField: "label",
    optionsValueField: "value",
    multiple: true
  }
};
const THREAT_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "threats",
    label: "threat",
    multiple: true
  }
};
const LIBRARY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "library",
    optionsEndpoint: "loaded-libraries",
    multiple: true
  }
};
const ASSET_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "assets",
    label: "asset",
    multiple: true
  }
};
const PROCESSING_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "processings",
    label: "processing",
    multiple: true
  }
};
const QUALIFICATION_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "qualification",
    optionsEndpoint: "qualifications",
    multiple: true
  }
};
const PERSONAL_DATA_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "personal-data/category",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "category",
    browserCache: "force-cache",
    multiple: true
  }
};
const SOLUTION_CRITICALITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "criticality",
    options: SOLUTION_CRITICALITY_OPTIONS,
    multiple: true
  }
};
const ENTITY_CRITICALITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "criticality",
    options: ENTITY_CRITICALITY_OPTIONS,
    multiple: true
  }
};
const RISK_IMPACT_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "gravity",
    optionsEndpoint: "risk-matrices/impact",
    optionsLabelField: "label",
    optionsValueField: "value",
    multiple: true
  }
};
const RISK_PROBABILITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "likelihood",
    optionsEndpoint: "risk-matrices/probability",
    optionsLabelField: "label",
    optionsValueField: "value",
    multiple: true
  }
};
const IS_SELECTED_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_selected",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const IS_RECURRENT_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_recurrent",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const TASK_TEMPLATE_ASSIGNED_TO_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "assigned_to",
    optionsLabelField: "email",
    optionsValueField: "id",
    optionsEndpoint: "task-templates/assigned_to",
    multiple: true
  }
};
const USER_IS_ACTIVE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_active",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const USER_IS_THIRD_PARTY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_third_party",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const IS_ASSESSABLE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "assessable",
    options: YES_NO_OPTIONS,
    multiple: true
  }
};
const RISK_ORIGIN_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "risk_origin",
    optionsEndpoint: "terminologies?field_path=ro_to.risk_origin&is_visible=true",
    optionsLabelField: "translated_name",
    browserCache: "force-cache",
    multiple: true
  }
};
const FEARED_EVENT_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "feared_event",
    optionsEndpoint: "feared-events",
    multiple: true
  }
};
const PERTINENCE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "pertinence",
    optionsEndpoint: "ro-to/pertinence",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const ENTITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "entity",
    optionsEndpoint: "entities",
    multiple: true
  }
};
const PROVIDER_ENTITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "providerEntity",
    optionsEndpoint: "entities",
    multiple: true
  }
};
const BENEFICIARY_ENTITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "beneficiaryEntity",
    optionsEndpoint: "entities",
    multiple: true
  }
};
const SOLUTION_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "solutions",
    optionsEndpoint: "solutions",
    multiple: true
  }
};
const ENTITY_RELATIONSHIP_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "terminologies?field_path=entity.relationship",
    optionsLabelField: "name",
    label: "relationship",
    browserCache: "force-cache",
    multiple: true
  }
};
const ACCREDITATION_AUTHORITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "authority",
    optionsEndpoint: "entities?relationship__name=accreditation_authority",
    multiple: true
  }
};
const CURRENT_RISK_LEVEL_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "current_level",
    optionsEndpoint: "risk-matrices/risk",
    optionsLabelField: "label",
    optionsValueField: "value",
    multiple: true
  }
};
const RESIDUAL_RISK_LEVEL_FILTER = {
  component: AutocompleteSelect,
  props: {
    ...CURRENT_RISK_LEVEL_FILTER.props,
    label: "residual_level"
  }
};
({
  props: {
    ...CURRENT_RISK_LEVEL_FILTER.props
  }
});
const STAKEHOLDER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "stakeholder",
    optionsEndpoint: "stakeholders",
    optionsLabelField: "str",
    multiple: true
  }
};
const FRAMEWORK_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "framework",
    optionsEndpoint: "frameworks",
    multiple: true
  }
};
const LANGUAGE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "language",
    optionsEndpoint: "stored-libraries/locale",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const ASSET_TYPE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "type",
    optionsEndpoint: "assets/type",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const ASSET_CLASS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "asset_class",
    optionsEndpoint: "assets/asset_class",
    multiple: true
  }
};
const ASSET_IS_BUSINESS_FUNCTION_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_business_function",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const REFERENCE_CONTROL_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "category",
    optionsEndpoint: "reference-controls/category",
    multiple: true,
    optionsLabelField: "label",
    browserCache: "force-cache",
    optionsValueField: "value"
  }
};
const FINDINGS_ASSESSMENTS_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "category",
    optionsEndpoint: "findings-assessments/category",
    multiple: true,
    optionsLabelField: "label",
    browserCache: "force-cache",
    optionsValueField: "value"
  }
};
const STAKEHOLDER_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "terminologies?field_path=entity.relationship",
    optionsLabelField: "name",
    label: "category",
    browserCache: "force-cache",
    multiple: true
  }
};
const CSF_FUNCTION_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "reference-controls/csf_function",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "csfFunction",
    browserCache: "force-cache",
    multiple: true
  }
};
const APPLIED_CONTROL_CATEGORY_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "category",
    optionsEndpoint: "applied-controls/category",
    multiple: true,
    optionsLabelField: "label",
    browserCache: "force-cache",
    optionsValueField: "value"
  }
};
const APPLIED_CONTROL_CSF_FUNCTION_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "applied-controls/csf_function",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "csfFunction",
    browserCache: "force-cache",
    multiple: true
  }
};
const OWNER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "owner",
    optionsLabelField: "email",
    optionsValueField: "id",
    optionsEndpoint: "applied-controls/owner",
    multiple: true
  }
};
const FINDINGS_OWNER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "owner",
    optionsLabelField: "email",
    optionsValueField: "id",
    optionsEndpoint: "findings/owner",
    multiple: true
  }
};
const LAST_OCCURENCE_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "last_occurrence_status",
    optionsEndpoint: "task-templates/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const NEXT_OCCURENCE_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "next_occurrence_status",
    optionsEndpoint: "task-templates/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const IS_LOADED_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "loadedLibraries",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const IS_UPDATE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "updateAvailable",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const LIBRARY_TYPE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "objectType",
    optionsEndpoint: "stored-libraries/object_type",
    optionsLabelField: "label",
    optionsValueField: "label",
    browserCache: "force-cache",
    multiple: true
  }
};
const IS_ASSIGNED_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "isAssigned",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const PAST_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "past",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const FIELD_PATH_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "field_path",
    optionsEndpoint: "terminologies/field_path",
    optionsLabelField: "label",
    optionsValueField: "value",
    multiple: true
  }
};
const IS_CUSTOM_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_custom",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const BUILTIN_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "builtin",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const IS_VISIBLE_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "is_visible",
    options: YES_NO_OPTIONS,
    multiple: false
  }
};
const EVIDENCE_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "status",
    optionsEndpoint: "evidences/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const CONTRACT_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "status",
    optionsEndpoint: "contracts/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    browserCache: "force-cache",
    multiple: true
  }
};
const EVIDENCE_OWNER_FILTER = {
  component: AutocompleteSelect,
  props: {
    label: "owner",
    optionsLabelField: "email",
    optionsValueField: "id",
    optionsEndpoint: "evidences/owner",
    multiple: true
  }
};
const VULNERABILITY_STATUS_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "vulnerabilities/status",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "status",
    browserCache: "force-cache",
    multiple: true
  }
};
const VULNERABILITY_SEVERITY_FILTER = {
  component: AutocompleteSelect,
  props: {
    optionsEndpoint: "vulnerabilities/severity",
    optionsLabelField: "label",
    optionsValueField: "value",
    label: "severity",
    browserCache: "force-cache",
    multiple: true
  }
};
const listViewFields = {
  folders: {
    head: ["name", "description", "contentType", "parentDomain", "labels"],
    body: ["name", "description", "content_type", "parent_folder", "filtering_labels"],
    filters: {
      content_type: CONTENT_TYPE_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  perimeters: {
    head: ["ref_id", "name", "description", "defaultAssignee", "domain"],
    body: ["ref_id", "name", "description", "default_assignee", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      lc_status: PERIMETER_STATUS_FILTER
    }
  },
  "filtering-labels": {
    head: ["label"],
    body: ["label"]
  },
  "risk-matrices": {
    head: ["name", "description", "provider", "domain"],
    body: ["name", "description", "provider", "folder"],
    meta: ["id", "urn"],
    filters: {
      folder: DOMAIN_FILTER,
      provider: {
        ...PROVIDER_FILTER,
        props: { ...PROVIDER_FILTER.props, optionsEndpoint: "risk-matrices/provider" }
      }
    }
  },
  vulnerabilities: {
    head: ["ref_id", "name", "status", "severity", "applied_controls", "folder", "labels"],
    body: [
      "ref_id",
      "name",
      "status",
      "severity",
      "applied_controls",
      "folder",
      "filtering_labels"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      filtering_labels: LABELS_FILTER,
      status: VULNERABILITY_STATUS_FILTER,
      severity: VULNERABILITY_SEVERITY_FILTER
    }
  },
  "risk-assessments": {
    head: ["ref_id", "name", "riskMatrix", "status", "riskScenarios", "perimeter", "updatedAt"],
    body: [
      "ref_id",
      "str",
      "risk_matrix",
      "status",
      "risk_scenarios_count",
      "perimeter",
      "updated_at"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      perimeter: PERIMETER_FILTER,
      status: RISK_ASSESSMENT_STATUS_FILTER
    }
  },
  threats: {
    head: ["ref_id", "name", "description", "library", "domain", "labels"],
    body: ["ref_id", "name", "description", "library", "folder", "filtering_labels"],
    meta: ["id", "urn"],
    filters: {
      folder: DOMAIN_FILTER,
      provider: {
        ...PROVIDER_FILTER,
        props: { ...PROVIDER_FILTER.props, optionsEndpoint: "threats/provider" }
      },
      library: LIBRARY_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  "risk-scenarios": {
    head: [
      "ref_id",
      "threats",
      "name",
      "inherentLevel",
      "existingAppliedControls",
      "currentLevel",
      "withinTolerance",
      "extraAppliedControls",
      "residualLevel",
      "treatment",
      "riskAssessment"
    ],
    body: [
      "ref_id",
      "threats",
      "name",
      "inherent_level",
      "existing_applied_controls",
      "current_level",
      "within_tolerance",
      "applied_controls",
      "residual_level",
      "treatment",
      "risk_assessment"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      perimeter: PERIMETER_FILTER,
      treatment: TREATMENT_FILTER,
      risk_assessment: RISK_ASSESSMENT_FILTER,
      threats: THREAT_FILTER,
      assets: ASSET_FILTER,
      current_level: CURRENT_RISK_LEVEL_FILTER,
      residual_level: RESIDUAL_RISK_LEVEL_FILTER,
      within_tolerance: RISK_TOLERANCE_FILTER,
      control_impact: APPLIED_CONTROL_IMPACT_FILTER,
      effort: APPLIED_CONTROL_EFFORT_FILTER
    }
  },
  "risk-acceptances": {
    head: ["name", "description", "riskScenarios", "state"],
    body: ["name", "description", "risk_scenarios", "state"],
    filters: {
      folder: DOMAIN_FILTER,
      state: STATE_FILTER,
      approver: APPROVER_FILTER
    }
  },
  "validation-flows": {
    head: [
      "ref_id",
      "status",
      "createdAt",
      "requester",
      "validationDeadline",
      "approver",
      "linkedModels",
      "labels",
      "domain"
    ],
    body: [
      "ref_id",
      "status",
      "created_at",
      "requester",
      "validation_deadline",
      "approver",
      "linked_models",
      "filtering_labels",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      status: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "validation-flows/status",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "status",
          browserCache: "force-cache",
          multiple: true
        }
      },
      requester: REQUESTER_FILTER,
      approver: APPROVER_FILTER,
      linked_models: LINKED_MODELS_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  "applied-controls": {
    head: [
      "id",
      "name",
      "status",
      "eta"
    ],
    body: [
      "ref_id",
      "name",
      "status",
      "eta"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      status: APPLIED_CONTROL_STATUS_FILTER,
      category: APPLIED_CONTROL_CATEGORY_FILTER,
      csf_function: APPLIED_CONTROL_CSF_FUNCTION_FILTER,
      priority: PRIORITY_FILTER,
      effort: EFFORT_FILTER,
      control_impact: APPLIED_CONTROL_IMPACT_FILTER,
      filtering_labels: LABELS_FILTER,
      reference_control: REFERENCE_CONTROL_FILTER,
      eta__lte: void 0,
      is_assigned: IS_ASSIGNED_FILTER,
      owner: OWNER_FILTER
    }
  },
  policies: {
    head: [
      "ref_id",
      "name",
      "priority",
      "status",
      "csfFunction",
      "eta",
      "owner",
      "domain",
      "referenceControl"
    ],
    body: [
      "ref_id",
      "name",
      "priority",
      "status",
      "csf_function",
      "eta",
      "owner",
      "folder",
      "reference_control"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      status: APPLIED_CONTROL_STATUS_FILTER,
      csf_function: CSF_FUNCTION_FILTER,
      owner: OWNER_FILTER,
      priority: PRIORITY_FILTER
    }
  },
  "reference-controls": {
    head: [
      "ref_id",
      "name",
      "description",
      "category",
      "csfFunction",
      "provider",
      "domain",
      "labels"
    ],
    body: [
      "ref_id",
      "name",
      "description",
      "category",
      "csf_function",
      "provider",
      "folder",
      "filtering_labels"
    ],
    meta: ["id", "urn"],
    filters: {
      folder: DOMAIN_FILTER,
      category: REFERENCE_CONTROL_CATEGORY_FILTER,
      provider: {
        ...PROVIDER_FILTER,
        props: { ...PROVIDER_FILTER.props, optionsEndpoint: "reference-controls/provider" }
      },
      csf_function: CSF_FUNCTION_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  assets: {
    head: [
      "ref_id",
      "name",
      "type",
      "securityObjectives",
      "disasterRecoveryObjectives",
      "owner",
      "domain",
      "labels"
    ],
    body: [
      "ref_id",
      "name",
      "type",
      "security_objectives",
      "disaster_recovery_objectives",
      "owner",
      "folder",
      "filtering_labels"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      type: ASSET_TYPE_FILTER,
      filtering_labels: LABELS_FILTER,
      asset_class: ASSET_CLASS_FILTER,
      is_business_function: ASSET_IS_BUSINESS_FUNCTION_FILTER
    }
  },
  "asset-class": {
    head: ["name", "description"],
    body: ["name", "description"]
  },
  users: {
    head: [
      "email",
      "firstName",
      "lastName",
      "userGroups",
      "isActive",
      "expiryDate",
      "keep_local_login",
      "is_third_party",
      "hasMfaEnabled"
    ],
    body: [
      "email",
      "first_name",
      "last_name",
      "user_groups",
      "is_active",
      "expiry_date",
      "keep_local_login",
      "is_third_party",
      "has_mfa_enabled"
    ],
    filters: {
      is_active: USER_IS_ACTIVE_FILTER,
      is_third_party: USER_IS_THIRD_PARTY_FILTER
    }
  },
  teams: {
    head: ["name", "description", "teamEmail"],
    body: ["name", "description", "team_email"]
  },
  "user-groups": {
    head: ["name"],
    body: ["localization_dict"],
    meta: ["id", "builtin"]
  },
  roles: {
    head: ["name", "description"],
    body: ["name", "description"]
  },
  "role-assignments": {
    head: ["user", "userGroup", "role", "perimeter"],
    body: ["user", "user_group", "role", "perimeter_folders"]
  },
  frameworks: {
    head: ["name", "description", "provider", "complianceAssessments", "domain"],
    body: ["name", "description", "provider", "compliance_assessments", "folder"],
    meta: ["id", "urn"],
    filters: {
      folder: DOMAIN_FILTER,
      provider: {
        ...PROVIDER_FILTER,
        props: { ...PROVIDER_FILTER.props, optionsEndpoint: "frameworks/provider" }
      }
    }
  },
  "compliance-assessments": {
    head: [
      "name",
      "framework",
      "status",
      "updatedAt"
    ],
    body: [
      "name",
      "framework",
      "status",
      "updated_at"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      perimeter: PERIMETER_FILTER,
      framework: FRAMEWORK_FILTER,
      status: COMPLIANCE_ASSESSMENT_STATUS_FILTER
    }
  },
  "requirement-assessments": {
    head: ["assessable", "name", "description", "complianceAssessment", "perimeter", "result"],
    body: ["assessable", "name", "description", "compliance_assessment", "perimeter", "result"],
    breadcrumb_link_disabled: true,
    filters: {
      compliance_assessment: COMPLIANCE_ASSESSMENT_FILTER,
      requirement__assessable: IS_ASSESSABLE_FILTER,
      result: REQUIREMENT_ASSESSMENT_RESULT_FILTER,
      compliance_assessment__perimeter: PERIMETER_FILTER
    }
  },
  evidences: {
    head: ["name", "file", "folder", "owner", "status", "updatedAt", "labels"],
    body: ["name", "attachment", "folder", "owner", "status", "updated_at", "filtering_labels"],
    filters: {
      folder: DOMAIN_FILTER,
      filtering_labels: LABELS_FILTER,
      status: EVIDENCE_STATUS_FILTER,
      owner: EVIDENCE_OWNER_FILTER
    }
  },
  "evidence-revisions": {
    head: ["version", "evidence", "file", "size", "updatedAt", "geminiFileId"],
    body: ["version", "evidence", "attachment", "size", "updated_at", "file_search"],
    filters: {
      filtering_labels: LABELS_FILTER
    }
  },
  requirements: {
    head: ["ref_id", "name", "description", "framework"],
    body: ["ref_id", "name", "description", "framework"],
    meta: ["id", "urn"]
  },
  libraries: {
    head: ["provider", "name", "description", "language", "overview"],
    body: ["provider", "name", "description", "locales", "objects_meta"]
  },
  "stored-libraries": {
    head: [
      "provider",
      "builtin",
      "ref_id",
      "name",
      "description",
      "language",
      "overview",
      "publication_date"
    ],
    body: [
      "provider",
      "builtin",
      "ref_id",
      "name",
      "description",
      "locales",
      "objects_meta",
      "publication_date"
    ],
    filters: {
      locale: LANGUAGE_FILTER,
      provider: PROVIDER_FILTER,
      object_type: LIBRARY_TYPE_FILTER,
      is_loaded: IS_LOADED_FILTER,
      is_custom: IS_CUSTOM_FILTER,
      filtering_labels: LIBRARY_LABELS_FILTER,
      is_update: IS_UPDATE_FILTER
    }
  },
  "sso-settings": {
    head: ["name", "provider", "providerId"],
    body: ["name", "provider", "provider_id"]
  },
  "requirement-mapping-sets": {
    head: ["sourceFramework", "targetFramework"],
    body: ["source_framework", "target_framework"],
    filters: {
      provider: {
        ...PROVIDER_FILTER,
        props: { ...PROVIDER_FILTER.props, optionsEndpoint: "requirement-mapping-sets/provider" }
      }
    }
  },
  entities: {
    head: [
      "refId",
      "name",
      "description",
      "domain",
      "parentEntity",
      "relationship",
      "defaultCriticality"
    ],
    body: [
      "ref_id",
      "name",
      "description",
      "folder",
      "parent_entity",
      "relationship",
      "default_criticality"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      parent_entity: ENTITY_FILTER,
      relationship: ENTITY_RELATIONSHIP_FILTER
    }
  },
  "entity-assessments": {
    head: ["name", "entity", "perimeter", "status", "dueDate", "criticality", "conclusion"],
    body: ["name", "entity", "perimeter", "status", "due_date", "criticality", "conclusion"],
    filters: {
      perimeter: PERIMETER_FILTER,
      entity: ENTITY_FILTER,
      status: COMPLIANCE_ASSESSMENT_STATUS_FILTER,
      criticality: ENTITY_CRITICALITY_FILTER,
      conclusion: ENTITY_ASSESSMENT_CONCLUSION_FILTER
    }
  },
  solutions: {
    head: ["refId", "name", "description", "providerEntity", "criticality", "labels"],
    body: ["ref_id", "name", "description", "provider_entity", "criticality", "filtering_labels"],
    filters: {
      provider_entity: ENTITY_FILTER,
      criticality: SOLUTION_CRITICALITY_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  contracts: {
    head: [
      "refId",
      "name",
      "description",
      "status",
      "startDate",
      "endDate",
      "providerEntity",
      "beneficiaryEntity",
      "solutions"
    ],
    body: [
      "ref_id",
      "name",
      "description",
      "status",
      "start_date",
      "end_date",
      "provider_entity",
      "beneficiary_entity",
      "solutions"
    ],
    filters: {
      status: CONTRACT_STATUS_FILTER,
      provider_entity: PROVIDER_ENTITY_FILTER,
      beneficiary_entity: BENEFICIARY_ENTITY_FILTER,
      solutions: SOLUTION_FILTER
    }
  },
  representatives: {
    head: ["email", "entity", "role"],
    body: ["email", "entity", "role"],
    filters: {
      entity: ENTITY_FILTER
    }
  },
  "business-impact-analysis": {
    head: ["name", "perimeter", "status"],
    body: ["name", "perimeter", "status"],
    filters: {
      folder: DOMAIN_FILTER,
      perimeter: PERIMETER_FILTER,
      status: RISK_ASSESSMENT_STATUS_FILTER
    }
  },
  "asset-assessments": {
    head: [
      "refId",
      "asset",
      "folder",
      "bia",
      "childrenAssets",
      "extraDependencies",
      "associatedControls",
      "recoveryDocumented",
      "recoveryTested",
      "recoveryTargetsMet"
    ],
    body: [
      "asset_ref_id",
      "asset",
      "asset_folder",
      "bia",
      "children_assets",
      "dependencies",
      "associated_controls",
      "recovery_documented",
      "recovery_tested",
      "recovery_targets_met"
    ]
  },
  "escalation-thresholds": {
    head: ["pointInTime", "assetAssessment", "qualiImpact", "impactOn", "justification"],
    body: ["get_human_pit", "asset_assessment", "quali_impact", "qualifications", "justification"]
  },
  processings: {
    head: ["refId", "name", "description", "status", "processingNature", "labels", "folder"],
    body: ["ref_id", "name", "description", "status", "nature", "filtering_labels", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      status: PROCESSING_STATUS_FILTER,
      nature: PROCESSING_NATURE_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  "right-requests": {
    head: ["refId", "name", "requestType", "status", "owner", "requestedOn", "dueDate", "folder"],
    body: [
      "ref_id",
      "name",
      "request_type",
      "status",
      "owner",
      "requested_on",
      "due_date",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      request_type: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "right-requests/request_type",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "requestType",
          multiple: true
        }
      },
      status: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "right-requests/status",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "status",
          multiple: true
        }
      },
      processings: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "processings",
          label: "processings",
          multiple: true
        }
      }
    }
  },
  "data-breaches": {
    head: [
      "refId",
      "name",
      "discoveredOn",
      "breachType",
      "riskLevel",
      "status",
      "affectedSubjectsCount",
      "folder"
    ],
    body: [
      "ref_id",
      "name",
      "discovered_on",
      "breach_type",
      "risk_level",
      "status",
      "affected_subjects_count",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      breach_type: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "data-breaches/breach_type",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "breachType",
          multiple: true
        }
      },
      risk_level: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "data-breaches/risk_level",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "riskLevel",
          multiple: true
        }
      },
      status: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "data-breaches/status",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "status",
          multiple: true
        }
      },
      affected_processings: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "processings",
          label: "affectedProcessings",
          multiple: true
        }
      }
    }
  },
  purposes: {
    head: ["name", "description", "legalBasis", "processing"],
    body: ["name", "description", "legal_basis", "processing"],
    filters: {
      processing: PROCESSING_FILTER,
      legal_basis: LEGAL_BASIS_FILTER
    }
  },
  "personal-data": {
    head: ["processing", "name", "category", "isSensitive", "retention", "deletionPolicy"],
    body: ["processing", "name", "category", "is_sensitive", "retention", "deletion_policy"],
    filters: {
      processing: PROCESSING_FILTER,
      category: PERSONAL_DATA_CATEGORY_FILTER
    }
  },
  "data-subjects": {
    head: ["name", "description", "category"],
    body: ["name", "description", "category"]
  },
  "data-recipients": {
    head: ["name", "description", "category"],
    body: ["name", "description", "category"]
  },
  "data-contractors": {
    head: ["name", "description", "entity", "relationshipType", "country", "documentationLink"],
    body: ["name", "description", "entity", "relationship_type", "country", "documentation_link"]
  },
  "data-transfers": {
    head: ["name", "description", "entity", "country", "legalBasis", "documentationLink"],
    body: ["name", "description", "entity", "country", "legal_basis", "documentation_link"]
  },
  "ebios-rm": {
    head: ["name", "description", "domain", "quotationMethod", "createdAt", "updatedAt"],
    body: ["name", "description", "folder", "quotation_method", "created_at", "updated_at"],
    filters: {
      folder: DOMAIN_FILTER
    }
  },
  "feared-events": {
    head: ["selected", "name", "assets", "description", "qualifications", "gravity"],
    body: ["is_selected", "name", "assets", "description", "qualifications", "gravity"],
    filters: {
      assets: ASSET_FILTER,
      qualifications: QUALIFICATION_FILTER,
      gravity: RISK_IMPACT_FILTER,
      is_selected: IS_SELECTED_FILTER
    }
  },
  "ro-to": {
    head: ["isSelected", "riskOrigin", "targetObjective", "fearedEvents", "pertinence"],
    body: ["is_selected", "risk_origin", "target_objective", "feared_events", "pertinence"],
    filters: {
      is_selected: IS_SELECTED_FILTER,
      risk_origin: RISK_ORIGIN_FILTER,
      feared_events: FEARED_EVENT_FILTER,
      pertinence: PERTINENCE_FILTER
    }
  },
  stakeholders: {
    head: [
      "is_selected",
      "entity",
      "category",
      "current_criticality",
      "applied_controls",
      "residual_criticality"
    ],
    body: [
      "is_selected",
      "entity",
      "category",
      "current_criticality",
      "applied_controls",
      "residual_criticality"
    ],
    filters: {
      is_selected: IS_SELECTED_FILTER,
      entity: ENTITY_FILTER,
      category: STAKEHOLDER_CATEGORY_FILTER
    }
  },
  "strategic-scenarios": {
    head: [
      "ref_id",
      "name",
      "description",
      "ro_to_couple",
      "fearedEvents",
      "focusedFearedEvent",
      "attackPaths",
      "gravity"
    ],
    body: [
      "ref_id",
      "name",
      "description",
      "ro_to_couple",
      "feared_events",
      "focused_feared_event",
      "attack_paths",
      "gravity"
    ],
    filters: {
      gravity: RISK_IMPACT_FILTER
    }
  },
  "attack-paths": {
    head: [
      "is_selected",
      "ref_id",
      "name",
      "risk_origin",
      "target_objective",
      "stakeholders",
      "description"
    ],
    body: [
      "is_selected",
      "ref_id",
      "name",
      "risk_origin",
      "target_objective",
      "stakeholders",
      "description"
    ],
    filters: {
      is_selected: IS_SELECTED_FILTER,
      stakeholders: STAKEHOLDER_FILTER
    }
  },
  "operational-scenarios": {
    head: [
      "is_selected",
      "strategicScenario",
      "attackPath",
      "operatingModes",
      "operatingModesDescription",
      "likelihood"
    ],
    body: [
      "is_selected",
      "strategic_scenario",
      "attack_path",
      "operating_modes",
      "operating_modes_description",
      "likelihood"
    ],
    filters: {
      threats: THREAT_FILTER,
      likelihood: RISK_PROBABILITY_FILTER,
      is_selected: IS_SELECTED_FILTER
    }
  },
  "elementary-actions": {
    head: ["ref_id", "folder", "", "name", "attack_stage", "threat"],
    body: ["ref_id", "folder", "icon_fa_class", "name", "attack_stage", "threat"],
    filters: {
      attack_stage: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "elementary-actions/attack_stage",
          label: "attackStage",
          multiple: true
        }
      }
    }
  },
  "operating-modes": {
    head: ["ref_id", "name", "likelihood"],
    body: ["ref_id", "name", "likelihood"]
  },
  "kill-chains": {
    head: ["elementary_action", "attack_stage", "antecedents", "logic_operator"],
    body: ["elementary_action", "attack_stage", "antecedents", "logic_operator"]
  },
  "security-exceptions": {
    head: [
      "ref_id",
      "name",
      "severity",
      "status",
      "expiration_date",
      "domain",
      "associatedObjectsCount",
      "created_at"
    ],
    body: [
      "ref_id",
      "name",
      "severity",
      "status",
      "expiration_date",
      "folder",
      "associated_objects_count",
      "created_at"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      severity: EXCEPTION_SEVERITY_FILTER,
      status: EXCEPTION_STATUS_FILTER
    }
  },
  "findings-assessments": {
    head: ["ref_id", "name", "category", "evidences", "findings", "perimeter"],
    body: ["ref_id", "name", "category", "evidences", "findings_count", "perimeter"],
    filters: {
      folder: DOMAIN_FILTER,
      perimeter: PERIMETER_FILTER,
      category: FINDINGS_ASSESSMENTS_CATEGORY_FILTER
    }
  },
  findings: {
    head: [
      "ref_id",
      "name",
      "findings_assessment",
      "severity",
      "priority",
      "owner",
      "status",
      "applied_controls",
      "labels"
    ],
    body: [
      "ref_id",
      "name",
      "findings_assessment",
      "severity",
      "priority",
      "owner",
      "status",
      "applied_controls",
      "filtering_labels"
    ],
    filters: {
      filtering_labels: LABELS_FILTER,
      severity: FINDINGS_SEVERITY_FILTER,
      status: FINDINGS_STATUS_FILTER,
      priority: FINDINGS_PRIORITY_FILTER,
      owner: FINDINGS_OWNER_FILTER
    }
  },
  incidents: {
    head: [
      "ref_id",
      "name",
      "status",
      "severity",
      "detection",
      "folder",
      "qualifications",
      "entities",
      "reportedAt",
      "updated_at"
    ],
    body: [
      "ref_id",
      "name",
      "status",
      "severity",
      "detection",
      "folder",
      "qualifications",
      "entities",
      "reported_at",
      "updated_at"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      qualifications: QUALIFICATION_FILTER,
      entities: ENTITY_FILTER,
      status: INCIDENT_STATUS_FILTER,
      detection: INCIDENT_DETECTION_FILTER,
      severity: INCIDENT_SEVERITY_FILTER
    }
  },
  "timeline-entries": {
    head: ["entry_type", "entry", "author", "created_at", "updated_at", "timestamp"],
    body: ["entry_type", "entry", "author", "created_at", "updated_at", "timestamp"]
  },
  campaigns: {
    head: ["name", "description", "frameworks", "status"],
    body: ["name", "description", "frameworks", "status"],
    filters: {
      status: CAMPAIGN_STATUS_FILTER,
      frameworks: FRAMEWORK_FILTER
    }
  },
  "organisation-objectives": {
    head: ["refId", "name", "domain", "status", "health", "dueDate", "assignee"],
    body: ["ref_id", "name", "folder", "status", "health", "due_date", "assigned_to"],
    filters: {
      folder: DOMAIN_FILTER,
      status: ORGANISATION_OBJECTIVE_STATUS_FILTER,
      health: ORGANISATION_OBJECTIVE_HEALTH_FILTER
    }
  },
  "organisation-issues": {
    head: ["refId", "name", "category", "origin", "domain"],
    body: ["ref_id", "name", "category", "origin", "folder"],
    filters: {
      folder: DOMAIN_FILTER
    }
  },
  "quantitative-risk-studies": {
    head: ["name", "description", "status", "updatedAt", "domain"],
    body: ["name", "description", "status", "updated_at", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      status: RISK_ASSESSMENT_STATUS_FILTER
    }
  },
  "quantitative-risk-scenarios": {
    head: [
      "isSelected",
      "ref_id",
      "name",
      "quantitativeRiskStudy",
      "assets",
      "threats",
      "qualifications",
      "currentAleDisplay",
      "residualAleDisplay",
      "status"
    ],
    body: [
      "is_selected",
      "ref_id",
      "name",
      "quantitative_risk_study",
      "assets",
      "threats",
      "qualifications",
      "current_ale_display",
      "residual_ale_display",
      "status"
    ],
    filters: {
      status: QUANT_RISK_SCENARIO_STATUS_FILTER,
      assets: ASSET_FILTER,
      threats: THREAT_FILTER,
      is_selected: IS_SELECTED_FILTER
    }
  },
  "quantitative-risk-hypotheses": {
    head: [
      "ref_id",
      "name",
      "riskStage",
      "simulationParameters",
      "lecChart",
      "ale",
      "addedAppliedControls",
      "treatmentCost",
      "rocDisplay",
      "isSelected"
    ],
    body: [
      "ref_id",
      "name",
      "risk_stage",
      "simulation_parameters_display",
      "lec_data",
      "ale_display",
      "added_applied_controls",
      "treatment_cost_display",
      "roc_display",
      "is_selected"
    ],
    filters: {
      is_selected: {
        component: AutocompleteSelect,
        props: {
          label: "is_selected",
          options: YES_NO_OPTIONS,
          multiple: false
        }
      },
      risk_stage: RISK_STAGE_FILTER
    }
  },
  "task-templates": {
    head: [
      "refId",
      "name",
      "is_recurrent",
      "assigned_to",
      "startDate",
      "lastOccurrenceStatus",
      "nextOccurrence",
      "nextOccurrenceStatus",
      "folder"
    ],
    body: [
      "ref_id",
      "name",
      "is_recurrent",
      "assigned_to",
      "task_date",
      "last_occurrence_status",
      "next_occurrence",
      "next_occurrence_status",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      assigned_to: TASK_TEMPLATE_ASSIGNED_TO_FILTER,
      is_recurrent: IS_RECURRENT_FILTER,
      last_occurrence_status: LAST_OCCURENCE_STATUS_FILTER,
      next_occurrence_status: NEXT_OCCURENCE_STATUS_FILTER
    }
  },
  "task-nodes": {
    head: ["due_date", "status"],
    body: ["due_date", "status"],
    filters: {
      status: TASK_STATUS_FILTER,
      past: PAST_FILTER
    }
  },
  qualifications: {
    head: ["name", "abbreviation"],
    body: ["name", "abbreviation"]
  },
  terminologies: {
    head: ["field_path", "name", "description", "translations", "is_visible"],
    body: ["field_path", "name", "description", "translations", "is_visible"],
    filters: {
      field_path: FIELD_PATH_FILTER,
      builtin: BUILTIN_FILTER,
      is_visible: IS_VISIBLE_FILTER
    }
  },
  "generic-collections": {
    head: ["ref_id", "name", "description", "labels", "folder"],
    body: ["ref_id", "name", "description", "filtering_labels", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  accreditations: {
    head: ["ref_id", "name", "category", "status", "authority", "author", "expiry_date", "folder"],
    body: ["ref_id", "name", "category", "status", "authority", "author", "expiry_date", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      status: ACCREDITATION_STATUS_FILTER,
      category: ACCREDITATION_CATEGORY_FILTER,
      authority: ACCREDITATION_AUTHORITY_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  "metric-definitions": {
    head: ["ref_id", "name", "description", "category", "unit", "provider", "labels", "folder"],
    body: [
      "ref_id",
      "name",
      "description",
      "category",
      "unit",
      "provider",
      "filtering_labels",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      category: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metric-definitions/category",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "category",
          browserCache: "force-cache",
          multiple: true
        }
      },
      library: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "loaded-libraries",
          label: "library",
          multiple: true
        }
      },
      provider: {
        ...PROVIDER_FILTER,
        props: {
          ...PROVIDER_FILTER.props,
          optionsEndpoint: "metric-definitions/provider"
        }
      },
      filtering_labels: LABELS_FILTER
    }
  },
  "metric-instances": {
    head: [
      "ref_id",
      "name",
      "metric_definition",
      "rawValue",
      "target_value",
      "unit",
      "status",
      "lastRefresh",
      "folder"
    ],
    body: [
      "ref_id",
      "name",
      "metric_definition",
      "raw_value",
      "target_value",
      "unit",
      "status",
      "last_refresh",
      "folder"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      metric_definition: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metric-definitions",
          label: "metricDefinition",
          multiple: true
        }
      },
      status: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metric-instances/status",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "status",
          browserCache: "force-cache",
          multiple: true
        }
      },
      owner: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "users",
          optionsLabelField: "email",
          label: "owner",
          multiple: true
        }
      },
      filtering_labels: LABELS_FILTER
    }
  },
  "custom-metric-samples": {
    head: ["metric_instance", "timestamp", "display_value"],
    body: ["metric_instance", "timestamp", "display_value"]
  },
  dashboards: {
    head: ["ref_id", "name", "description", "widget_count", "labels", "folder"],
    body: ["ref_id", "name", "description", "widget_count", "filtering_labels", "folder"],
    filters: {
      folder: DOMAIN_FILTER,
      filtering_labels: LABELS_FILTER
    }
  },
  "dashboard-widgets": {
    head: [
      "display_title",
      "metric_instance",
      "chart_type_display",
      "time_range_display",
      "dashboard"
    ],
    body: [
      "display_title",
      "metric_instance",
      "chart_type_display",
      "time_range_display",
      "dashboard"
    ],
    filters: {
      folder: DOMAIN_FILTER,
      dashboard: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metrology/dashboards",
          label: "dashboard",
          multiple: true
        }
      },
      metric_instance: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metrology/metric-instances",
          label: "metricInstance",
          multiple: true
        }
      },
      chart_type: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metrology/dashboard-widgets/chart_type",
          optionsLabelField: "label",
          optionsValueField: "value",
          label: "chartType",
          browserCache: "force-cache",
          multiple: true
        }
      }
    }
  },
  "dashboard-text-widgets": {
    head: ["display_title", "dashboard"],
    body: ["display_title", "dashboard"],
    filters: {
      folder: DOMAIN_FILTER,
      dashboard: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metrology/dashboards",
          label: "dashboard",
          multiple: true
        }
      }
    }
  },
  "dashboard-builtin-widgets": {
    head: ["display_title", "dashboard"],
    body: ["display_title", "dashboard"],
    filters: {
      folder: DOMAIN_FILTER,
      dashboard: {
        component: AutocompleteSelect,
        props: {
          optionsEndpoint: "metrology/dashboards",
          label: "dashboard",
          multiple: true
        }
      }
    }
  },
  actors: {
    head: ["name", "type"],
    body: ["specific", "type"]
  },
  extra: {
    filters: {
      risk: void 0,
      probability: void 0,
      impact: void 0,
      likelihood: void 0,
      gravity: void 0
    },
    body: ["users"]
  }
};
const contextMenuActions = {
  "applied-controls": [
    { component: ChangeStatus$2, props: {} },
    { component: ChangeImpact, props: {} },
    { component: ChangeEffort, props: {} },
    { component: ChangePriority, props: {} },
    { component: ChangeCsfFunction, props: {} }
  ],
  evidences: [{ component: ChangeStatus$1, props: {} }],
  "task-nodes": [{ component: ChangeStatus, props: {} }],
  "feared-events": [{ component: SelectObject, props: {} }],
  "ro-to": [{ component: SelectObject, props: {} }],
  stakeholders: [{ component: SelectObject, props: {} }],
  "attack-paths": [{ component: SelectObject, props: {} }],
  "operational-scenarios": [{ component: SelectObject, props: {} }],
  "elementary-actions": [{ component: ChangeAttackStage, props: {} }]
};
function getListViewFields({
  key,
  featureFlags = {}
}) {
  if (!Object.keys(listViewFields).includes(key)) {
    return { head: [], body: [] };
  }
  const baseEntry = listViewFields[key];
  const model = getModelInfo(key);
  let head = [...baseEntry.head];
  let body = [...baseEntry.body];
  if (model?.flaggedFields) {
    const indicesToPop = body.map((field, index2) => {
      const flag = model.flaggedFields?.[field];
      return flag && !featureFlags[flag] ? index2 : -1;
    }).filter((i) => i !== -1);
    head = head.filter((_, index2) => !indicesToPop.includes(index2));
    body = body.filter((_, index2) => !indicesToPop.includes(index2));
  }
  return {
    ...baseEntry,
    head,
    body
  };
}
const headData = (model) => listViewFields[model].body.reduce((obj, key, index2) => {
  obj[key] = listViewFields[model].head[index2];
  return obj;
}, {});
function LibraryOverview($$payload, $$props) {
  push();
  let { cell, $$slots, $$events, ...rest } = $$props;
  let display = Object.entries(cell);
  function getLocalizedOverview(objectType, count) {
    return libraryoverview1({
      objectType: safeTranslate(objectType),
      count
    });
  }
  const each_array = ensure_array_like(display);
  $$payload.out += `<ul${spread_attributes({ class: "list-disc", ...rest }, null)}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let obj = each_array[$$index];
    $$payload.out += `<li>${escape_html(getLocalizedOverview(obj[0], obj[1]))}</li>`;
  }
  $$payload.out += `<!--]--></ul>`;
  pop();
}
function MarkdownDescription($$payload, $$props) {
  let { cell } = $$props;
  const meta = void 0;
  MarkdownRenderer($$payload, { content: cell });
  bind_props($$props, { meta });
}
function getValue(object, keys) {
  if (typeof keys === "string") {
    return object[keys];
  }
  let finalValue = object;
  for (const key of keys) {
    finalValue = finalValue[key];
  }
  return finalValue;
}
const getOptions = ({
  objects,
  suggestions,
  label = "name",
  value = "id",
  extra_fields = [],
  self = void 0,
  selfSelect = false
}) => {
  const append = (x, y) => !y ? x : !x || x == "" ? y : x + " - " + y;
  const options = objects.map((object) => {
    const my_label = label != "auto" ? object[label] ?? "" : append(object["ref_id"], object["name"] ? object["name"] : object["description"]) ?? "";
    return {
      label: extra_fields.length > 0 ? extra_fields.map((field) => getValue(object, field)).map((string) => `${string}`).join("/") + "/" + my_label : my_label,
      value: object[value],
      suggested: false
    };
  }).filter((option) => {
    if (selfSelect) {
      return true;
    }
    return option.value !== self?.id;
  });
  if (suggestions) {
    const suggestedIds = suggestions.map((suggestion) => suggestion[value]);
    const filteredOptions = options.filter((option) => {
      const isSuggested = suggestedIds.includes(option.value);
      if (isSuggested) {
        option.suggested = true;
      }
      return !isSuggested;
    });
    const suggestedOptions = options.filter((option) => option.suggested);
    const reorderedOptions = suggestedOptions.concat(filteredOptions);
    return reorderedOptions;
  }
  return options;
};
const URL_MODEL_MAP = {
  folders: {
    name: "folder",
    localName: "domain",
    localNamePlural: "domains",
    verboseName: "Domain",
    verboseNamePlural: "Domains",
    listViewUrlParams: "?content_type=DO&content_type=GL",
    foreignKeyFields: [
      { field: "parent_folder", urlModel: "folders" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    reverseForeignKeyFields: [
      { field: "folder", urlModel: "perimeters" },
      { field: "folder", urlModel: "entities" },
      { field: "folder", urlModel: "assets" },
      { field: "folder", urlModel: "applied-controls" },
      {
        field: "folder",
        urlModel: "users",
        detail: true,
        disableCreate: true,
        disableDelete: true,
        endpointUrl: "./users",
        folderPermsNeeded: [{ model: "folder", action: "change" }],
        tableFields: ["email", "first_name", "last_name", "is_active", "roles"]
      }
    ]
  },
  perimeters: {
    name: "perimeter",
    localName: "perimeter",
    localNamePlural: "perimeters",
    verboseName: "Perimeter",
    verboseNamePlural: "Perimeters",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "default_assignee", urlModel: "actors" }
    ],
    selectFields: [{ field: "lc_status" }],
    reverseForeignKeyFields: [
      { field: "perimeter", urlModel: "compliance-assessments" },
      { field: "perimeter", urlModel: "risk-assessments" },
      { field: "perimeter", urlModel: "entity-assessments" },
      { field: "perimeters", urlModel: "campaigns" }
    ],
    filters: [{ field: "lc_status" }, { field: "folder" }, { field: "campaigns" }]
  },
  "risk-matrices": {
    name: "riskmatrix",
    localName: "riskMatrix",
    localNamePlural: "riskMatrices",
    verboseName: "Risk matrix",
    verboseNamePlural: "Risk matrices",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "library", urlModel: "libraries" }
    ]
  },
  "risk-assessments": {
    name: "riskassessment",
    localName: "riskAssessment",
    localNamePlural: "riskAssessments",
    verboseName: "Risk assessment",
    verboseNamePlural: "Risk assessments",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "authors", urlModel: "actors" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "risk_matrix", urlModel: "risk-matrices" },
      { field: "risk_scenarios", urlModel: "risk-scenarios" },
      { field: "ebios_rm_study", urlModel: "ebios-rm" }
    ],
    reverseForeignKeyFields: [{ field: "risk_assessment", urlModel: "risk-scenarios" }],
    selectFields: [{ field: "status" }, { field: "risk_tolerance", valueType: "number" }],
    filters: [{ field: "perimeter" }, { field: "auditor" }, { field: "status" }]
  },
  "risk-assessment_duplicate": {
    name: "riskassessment",
    localName: "riskAssessment",
    localNamePlural: "riskAssessments",
    verboseName: "Risk assessment",
    verboseNamePlural: "Risk assessments",
    foreignKeyFields: [{ field: "perimeter", urlModel: "perimeters" }]
  },
  threats: {
    name: "threat",
    localName: "threat",
    localNamePlural: "threats",
    verboseName: "Threat",
    verboseNamePlural: "Threats",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "library", urlModel: "loaded-libraries" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ]
  },
  "risk-scenarios": {
    name: "riskscenario",
    localName: "riskScenario",
    localNamePlural: "riskScenarios",
    verboseName: "Risk scenario",
    verboseNamePlural: "Risk scenarios",
    flaggedFields: {
      inherent_proba: "inherent_risk",
      inherent_impact: "inherent_risk",
      inherent_level: "inherent_risk"
    },
    foreignKeyFields: [
      { field: "threats", urlModel: "threats" },
      { field: "risk_assessment", urlModel: "risk-assessments" },
      { field: "assets", urlModel: "assets" },
      { field: "vulnerabilities", urlModel: "vulnerabilities" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "existing_applied_controls", urlModel: "applied-controls" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "risk_matrix", urlModel: "risk-matrices" },
      { field: "auditor", urlModel: "users" },
      { field: "owner", urlModel: "actors" },
      { field: "security_exceptions", urlModel: "security-exceptions" },
      { field: "qualifications", urlModel: "terminologies" }
    ],
    filters: [{ field: "threats" }, { field: "risk_assessment" }, { field: "owner" }]
  },
  "applied-controls": {
    name: "appliedcontrol",
    localName: "appliedControl",
    localNamePlural: "appliedControls",
    verboseName: "Applied control",
    verboseNamePlural: "Applied controls",
    detailViewFields: [
      { field: "id" },
      { field: "folder" },
      { field: "reference_control" },
      { field: "category" },
      { field: "csf_function" },
      { field: "priority" },
      { field: "effort" },
      { field: "control_impact" },
      { field: "annual_cost_display" },
      { field: "status" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "eta", type: "date" },
      { field: "owner" },
      { field: "expiry_date", type: "date" },
      { field: "link" },
      { field: "progress_field" },
      { field: "observation" },
      { field: "security_exceptions", urlModel: "security-exceptions" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "sync_mappings" }
    ],
    foreignKeyFields: [
      { field: "reference_control", urlModel: "reference-controls" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "evidences", urlModel: "evidences" },
      { field: "objectives", urlModel: "organisation-objectives" },
      { field: "owner", urlModel: "actors" },
      { field: "security_exceptions", urlModel: "security-exceptions" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "requirement_assessments", urlModel: "requirement-assessments" },
      { field: "risk_scenarios", urlModel: "risk-scenarios" },
      { field: "quantitative_risk_scenarios", urlModel: "quantitative-risk-scenarios" },
      { field: "assets", urlModel: "assets" }
    ],
    reverseForeignKeyFields: [
      { field: "applied_controls", urlModel: "evidences" },
      { field: "applied_controls", urlModel: "task-templates" },
      {
        field: "applied_controls",
        urlModel: "requirement-assessments",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "applied_controls",
        urlModel: "risk-scenarios",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "applied_controls",
        urlModel: "findings",
        disableCreate: true,
        disableDelete: true
      },
      { field: "applied_controls", urlModel: "assets", disableCreate: true, disableDelete: true }
    ],
    selectFields: [
      { field: "status" },
      { field: "category" },
      { field: "csf_function" },
      { field: "effort" },
      { field: "control_impact", valueType: "number" },
      { field: "priority" }
    ],
    filters: [
      { field: "reference_control" },
      { field: "status" },
      { field: "category" },
      { field: "csf_function" },
      { field: "effort" },
      { field: "control_impact" },
      { field: "folder" },
      { field: "owner" },
      { field: "priority" }
    ]
  },
  "applied-controls_duplicate": {
    name: "appliedcontrol",
    localName: "appliedControl",
    localNamePlural: "appliedControls",
    verboseName: "Applied control",
    verboseNamePlural: "Applied controls",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" }
    ]
  },
  policies: {
    name: "appliedcontrol",
    localName: "policy",
    localNamePlural: "policies",
    verboseName: "Policy",
    verboseNamePlural: "Policies",
    foreignKeyFields: [
      { field: "reference_control", urlModel: "reference-controls", urlParams: "category=policy" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "evidences", urlModel: "evidences" },
      { field: "owner", urlModel: "actors" }
    ],
    detailViewFields: [
      { field: "folder" },
      { field: "id" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "priority" },
      { field: "effort" },
      { field: "control_impact" },
      { field: "status" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "eta", type: "date" },
      { field: "owner" },
      { field: "expiry_date", type: "date" },
      { field: "link" },
      { field: "progress_field" },
      { field: "observation" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "sync_mappings" }
    ],
    reverseForeignKeyFields: [
      { field: "applied_controls", urlModel: "evidences" },
      {
        field: "applied_controls",
        urlModel: "requirement-assessments",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "applied_controls",
        urlModel: "risk-scenarios",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "applied_controls",
        urlModel: "findings",
        disableCreate: true,
        disableDelete: true
      }
    ],
    selectFields: [
      { field: "status" },
      { field: "csf_function" },
      { field: "effort" },
      { field: "control_impact", valueType: "number" },
      { field: "priority" }
    ],
    filters: [
      { field: "reference_control" },
      { field: "status" },
      { field: "csf_function" },
      { field: "effort" },
      { field: "control_impact" },
      { field: "folder" },
      { field: "owner" },
      { field: "priority" }
    ]
  },
  vulnerabilities: {
    name: "vulnerability",
    localName: "vulnerability",
    localNamePlural: "vulnerabilities",
    verboseName: "Vulnerability",
    verboseNamePlural: "Vulnerabilities",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "assets", urlModel: "assets" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "security_exceptions", urlModel: "security-exceptions" }
    ],
    selectFields: [{ field: "severity", valueType: "number" }, { field: "status" }],
    filters: [{ field: "folder" }, { field: "filtering_labels" }]
  },
  "filtering-labels": {
    name: "filteringlabel",
    localName: "label",
    localNamePlural: "labels",
    verboseName: "Label",
    verboseNamePlural: "Labels"
  },
  "risk-acceptances": {
    name: "riskacceptance",
    localName: "riskAcceptance",
    localNamePlural: "riskAcceptances",
    verboseName: "Risk acceptance",
    verboseNamePlural: "Risk acceptances",
    foreignKeyFields: [
      {
        field: "risk_scenarios",
        urlModel: "risk-scenarios",
        urlParams: "/acceptable"
      },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "approver", urlModel: "users", urlParams: "is_approver=true" }
    ],
    filters: [{ field: "risk_scenarios" }, { field: "folder" }, { field: "approver" }]
  },
  "validation-flows": {
    name: "validationflow",
    localName: "validationFlow",
    localNamePlural: "validationFlows",
    verboseName: "Validation flow",
    verboseNamePlural: "Validation flows",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "approver", urlModel: "users", urlParams: "is_approver=true&exclude_current=true" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "compliance_assessments", urlModel: "compliance-assessments" },
      { field: "risk_assessments", urlModel: "risk-assessments" },
      { field: "business_impact_analysis", urlModel: "business-impact-analysis" },
      { field: "crq_studies", urlModel: "quantitative-risk-studies" },
      { field: "ebios_studies", urlModel: "ebios-rm" },
      { field: "entity_assessments", urlModel: "entity-assessments" },
      { field: "findings_assessments", urlModel: "findings-assessments" },
      { field: "evidences", urlModel: "evidences" },
      { field: "security_exceptions", urlModel: "security-exceptions" },
      { field: "policies", urlModel: "policies" }
    ],
    selectFields: [{ field: "status" }],
    filters: [
      { field: "folder" },
      { field: "status" },
      { field: "requester" },
      { field: "approver" },
      { field: "linked_models" },
      { field: "filtering_labels" }
    ]
  },
  "reference-controls": {
    name: "referencecontrol",
    localName: "referenceControl",
    localNamePlural: "referenceControls",
    verboseName: "Reference control",
    verboseNamePlural: "Reference controls",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    reverseForeignKeyFields: [
      {
        field: "reference_control",
        urlModel: "applied-controls",
        disableCreate: true,
        disableDelete: true
      }
    ],
    selectFields: [{ field: "category" }, { field: "csf_function" }],
    filters: [{ field: "folder" }]
  },
  assets: {
    name: "asset",
    localName: "asset",
    localNamePlural: "assets",
    verboseName: "Asset",
    verboseNamePlural: "Assets",
    detailViewFields: [
      { field: "id" },
      { field: "folder" },
      { field: "name" },
      { field: "description" },
      { field: "ref_id" },
      { field: "type" },
      { field: "asset_class" },
      { field: "parent_assets" },
      { field: "support_assets" },
      { field: "children_assets" },
      { field: "owner" },
      { field: "is_critical" },
      { field: "filtering_labels" },
      { field: "security_objectives", tooltip: "securityObjectivesTooltip" },
      { field: "disaster_recovery_objectives", tooltip: "disasterRecoveryObjectivesTooltip" },
      { field: "security_capabilities", tooltip: "securityCapabilitiesTooltip" },
      { field: "recovery_capabilities", tooltip: "recoveryCapabilitiesTooltip" },
      { field: "reference_link" },
      { field: "security_exceptions" },
      { field: "solutions" },
      { field: "observation" }
    ],
    reverseForeignKeyFields: [
      {
        field: "assets",
        urlModel: "compliance-assessments",
        disableCreate: true,
        disableDelete: true
      },
      { field: "assets", urlModel: "vulnerabilities" },
      { field: "assets", urlModel: "risk-scenarios", disableCreate: true, disableDelete: true },
      {
        field: "assets",
        urlModel: "quantitative-risk-scenarios",
        disableCreate: true,
        disableDelete: true
      },
      { field: "assets", urlModel: "solutions", disableCreate: true, disableDelete: true },
      { field: "assets", urlModel: "personal-data", disableCreate: true, disableDelete: true },
      { field: "assets", urlModel: "incidents" },
      { field: "assets", urlModel: "applied-controls", disableDelete: true }
    ],
    foreignKeyFields: [
      { field: "parent_assets", urlModel: "assets" },
      { field: "support_assets", urlModel: "assets" },
      { field: "children_assets", urlModel: "assets" },
      { field: "owner", urlModel: "actors" },
      { field: "asset_class", urlModel: "asset-class" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "ebios_rm_studies", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      { field: "security_exceptions", urlModel: "security-exceptions" },
      { field: "overridden_children_capabilities", urlModel: "asset-capabilities" },
      { field: "solutions", urlModel: "solutions" }
    ],
    selectFields: [
      { field: "type" },
      { field: "asset_class" },
      { field: "dora_licenced_activity" },
      { field: "dora_criticality_assessment" },
      { field: "dora_discontinuing_impact" }
    ],
    filters: [
      { field: "parent_assets" },
      { field: "folder" },
      { field: "asset_class" },
      { field: "type" },
      { field: "owner" },
      { field: "filtering_labels" }
    ]
  },
  "asset-class": {
    endpointUrl: "asset-class",
    name: "asset-class",
    localName: "assetClass",
    localNamePlural: "assetClasses",
    verboseName: "assetclass",
    verboseNamePlural: "assetclasses"
  },
  "asset-capabilities": {
    endpointUrl: "asset-capabilities",
    name: "asset-capability",
    localName: "assetCapability",
    localNamePlural: "assetCapabilities",
    verboseName: "Asset capability",
    verboseNamePlural: "Asset capabilities"
  },
  users: {
    name: "user",
    localName: "user",
    localNamePlural: "users",
    verboseName: "User",
    verboseNamePlural: "Users",
    foreignKeyFields: [{ field: "user_groups", urlModel: "user-groups" }],
    filters: []
  },
  teams: {
    name: "team",
    localName: "team",
    localNamePlural: "teams",
    verboseName: "Team",
    verboseNamePlural: "Teams",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "leader", urlModel: "users" },
      { field: "deputies", urlModel: "users" },
      { field: "members", urlModel: "users" }
    ]
  },
  "user-groups": {
    name: "usergroup",
    localName: "userGroup",
    localNamePlural: "userGroups",
    verboseName: "User group",
    verboseNamePlural: "User groups",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" }
    ],
    reverseForeignKeyFields: [
      {
        field: "user_groups",
        urlModel: "users",
        disableCreate: true,
        disableDelete: true,
        folderPermsNeeded: [{ model: "folder", action: "change" }]
      }
    ],
    filters: []
  },
  "role-assignments": {
    name: "roleassignment",
    localName: "roleAssignment",
    localNamePlural: "roleAssignments",
    verboseName: "Role assignment",
    verboseNamePlural: "Role assignments",
    foreignKeyFields: [],
    filters: []
  },
  frameworks: {
    name: "framework",
    localName: "framework",
    localNamePlural: "frameworks",
    verboseName: "Framework",
    verboseNamePlural: "Frameworks",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" }
    ]
  },
  evidences: {
    name: "evidence",
    localName: "evidence",
    localNamePlural: "evidences",
    verboseName: "Evidence",
    verboseNamePlural: "Evidences",
    fileFields: ["attachment"],
    foreignKeyFields: [
      {
        field: "folder",
        urlModel: "folders",
        urlParams: "content_type=DO&content_type=GL&content_type=EN"
      },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "requirement_assessments", urlModel: "requirement-assessments" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "findings", urlModel: "findings" },
      { field: "findings_assessments", urlModel: "findings-assessments" },
      { field: "owner", urlModel: "actors" }
    ],
    reverseForeignKeyFields: [
      { field: "evidence", urlModel: "evidence-revisions" },
      {
        field: "evidences",
        urlModel: "applied-controls",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "evidences",
        urlModel: "compliance-assessments",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "evidences",
        urlModel: "requirement-assessments",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "evidences",
        urlModel: "findings-assessments",
        disableCreate: true,
        disableDelete: true
      },
      { field: "evidences", urlModel: "findings", disableCreate: true, disableDelete: true },
      { field: "evidences", urlModel: "task-templates", disableCreate: true, disableDelete: true }
    ],
    selectFields: [{ field: "status" }],
    detailViewFields: [
      { field: "name" },
      { field: "description" },
      { field: "folder" },
      { field: "owner" },
      { field: "status" },
      { field: "link" },
      { field: "expiry_date" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "filtering_labels" }
    ]
  },
  "evidence-revisions": {
    name: "evidencerevision",
    localName: "evidenceRevision",
    localNamePlural: "evidenceRevisions",
    verboseName: "Evidence revision",
    verboseNamePlural: "Evidence revisions",
    fileFields: ["attachment"],
    foreignKeyFields: [
      { field: "evidence", urlModel: "evidences" },
      { field: "task_node", urlModel: "task-nodes" }
    ]
  },
  "compliance-assessments": {
    name: "complianceassessment",
    localName: "complianceAssessment",
    localNamePlural: "complianceAssessments",
    verboseName: "Compliance assessment",
    verboseNamePlural: "Compliance assessments",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "campaign", urlModel: "campaigns", endpointUrl: "campaigns" },
      { field: "framework", urlModel: "frameworks" },
      { field: "authors", urlModel: "actors" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "baseline", urlModel: "compliance-assessments" },
      { field: "ebios_rm_studies", urlModel: "ebios-rm" },
      { field: "assets", urlModel: "assets" },
      { field: "evidences", urlModel: "evidences" }
    ],
    selectFields: [{ field: "status" }],
    filters: [{ field: "status" }]
  },
  requirements: {
    name: "requirement",
    localName: "requirement",
    localNamePlural: "requirements",
    verboseName: "Requirement",
    verboseNamePlural: "Requirements"
  },
  "requirement-assessments": {
    name: "requirementassessment",
    localName: "requirementAssessment",
    localNamePlural: "requirementAssessments",
    verboseName: "Requirement assessment",
    verboseNamePlural: "Requirement assessments",
    selectFields: [{ field: "status" }, { field: "result" }, { field: "extended_result" }],
    foreignKeyFields: [
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "evidences", urlModel: "evidences" },
      { field: "compliance_assessment", urlModel: "compliance-assessments" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "security_exceptions", urlModel: "security-exceptions" }
    ]
  },
  "stored-libraries": {
    name: "storedlibrary",
    localName: "storedLibrary",
    localNamePlural: "storedLibraries",
    verboseName: "stored Library",
    verboseNamePlural: "stored Libraries"
  },
  "loaded-libraries": {
    name: "loadedlibrary",
    localName: "loadedLibrary",
    localNamePlural: "loadedLibraries",
    verboseName: "loaded Library",
    verboseNamePlural: "loaded Libraries"
  },
  "sso-settings": {
    name: "ssoSettings",
    localName: "ssoSettings",
    localNamePlural: "ssoSettings",
    verboseName: "SSO settings",
    verboseNamePlural: "SSO settings",
    selectFields: [{ field: "provider" }]
  },
  "general-settings": {
    name: "generalSettings",
    localName: "generalSettings",
    localNamePlural: "generalSettings",
    verboseName: "General settings",
    verboseNamePlural: "General settings",
    selectFields: [{ field: "security_objective_scale" }]
  },
  "feature-flags": {
    name: "featureFlags",
    localName: "featureFlags",
    localNamePlural: "featureFlags",
    verboseName: "Feature flag",
    verboseNamePlural: "Feature flags"
  },
  "requirement-mapping-sets": {
    name: "requirementmappingset",
    localName: "requirementMappingSet",
    localNamePlural: "requirementMappingSets",
    verboseName: "Requirement mapping set",
    verboseNamePlural: "Requirement mapping sets",
    foreignKeyFields: [
      { field: "source_framework", urlModel: "frameworks" },
      { field: "target_framework", urlModel: "frameworks" },
      { field: "library", urlModel: "libraries" }
    ]
  },
  entities: {
    name: "entity",
    localName: "entity",
    localNamePlural: "entities",
    verboseName: "Entity",
    verboseNamePlural: "Entities",
    detailViewFields: [
      { field: "id" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "mission" },
      { field: "parent_entity" },
      { field: "relationship" },
      { field: "legal_identifiers" },
      { field: "branches" },
      { field: "reference_link" }
    ],
    reverseForeignKeyFields: [
      { field: "entity", urlModel: "entity-assessments" },
      { field: "entity", urlModel: "representatives" },
      { field: "provider_entity", urlModel: "solutions" },
      { field: "provider_entity", urlModel: "contracts" }
    ],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "owned_folders", urlModel: "folders", urlParams: "owned=false" },
      { field: "parent_entity", urlModel: "entities" },
      { field: "branches", urlModel: "entities" },
      {
        field: "relationship",
        urlModel: "terminologies",
        urlParams: "field_path=entity.relationship"
      }
    ],
    selectFields: [
      { field: "country" },
      { field: "currency" },
      { field: "dora_entity_type" },
      { field: "dora_entity_hierarchy" },
      { field: "dora_provider_person_type" }
    ]
  },
  "entity-assessments": {
    name: "entityassessment",
    localName: "entityAssessment",
    localNamePlural: "entityAssessments",
    verboseName: "Entity assessment",
    verboseNamePlural: "Entity assessments",
    foreignKeyFields: [
      { field: "perimeter", urlModel: "perimeters" },
      { field: "entity", urlModel: "entities" },
      { field: "solutions", urlModel: "solutions" },
      { field: "framework", urlModel: "frameworks" },
      { field: "authors", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "representatives", urlModel: "users", urlParams: "is_third_party=true" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "evidence", urlModel: "evidences" },
      { field: "compliance_assessment", urlModel: "compliance-assessments" }
    ],
    selectFields: [{ field: "status" }, { field: "conclusion" }],
    filters: [{ field: "status" }]
  },
  solutions: {
    name: "solution",
    localName: "solution",
    localNamePlural: "solutions",
    verboseName: "Solution",
    verboseNamePlural: "Solutions",
    reverseForeignKeyFields: [{ field: "solutions", urlModel: "contracts", disableDelete: true }],
    foreignKeyFields: [
      { field: "provider_entity", urlModel: "entities" },
      { field: "recipient_entity", urlModel: "entities" },
      { field: "owner", urlModel: "actors" },
      { field: "assets", urlModel: "assets" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    selectFields: [
      { field: "dora_ict_service_type" },
      { field: "data_location_storage" },
      { field: "data_location_processing" },
      { field: "dora_data_sensitiveness" },
      { field: "dora_reliance_level" },
      { field: "dora_substitutability" },
      { field: "dora_non_substitutability_reason" },
      { field: "dora_has_exit_plan" },
      { field: "dora_reintegration_possibility" },
      { field: "dora_discontinuing_impact" },
      { field: "dora_alternative_providers_identified" }
    ],
    filters: [{ field: "owner" }, { field: "filtering_labels" }]
  },
  contracts: {
    name: "contract",
    localName: "contract",
    localNamePlural: "contracts",
    verboseName: "Contract",
    verboseNamePlural: "Contracts",
    reverseForeignKeyFields: [
      { field: "contracts", urlModel: "evidences", disableDelete: true },
      { field: "contracts", urlModel: "solutions", disableDelete: true, disableCreate: true }
    ],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders" },
      { field: "owner", urlModel: "actors" },
      { field: "provider_entity", urlModel: "entities" },
      { field: "beneficiary_entity", urlModel: "entities" },
      { field: "evidences", urlModel: "evidences" },
      { field: "solutions", urlModel: "solutions" },
      { field: "overarching_contract", urlModel: "contracts" }
    ],
    selectFields: [
      { field: "status" },
      { field: "currency" },
      { field: "dora_contractual_arrangement" },
      { field: "termination_reason" },
      { field: "governing_law_country" }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "ref_id" },
      { field: "description" },
      { field: "folder" },
      { field: "owner" },
      { field: "status" },
      { field: "provider_entity" },
      { field: "beneficiary_entity" },
      { field: "start_date" },
      { field: "end_date" },
      { field: "overarching_contract" },
      { field: "annual_expense" },
      { field: "currency" },
      { field: "dora_contractual_arrangement" },
      { field: "governing_law_country" },
      { field: "notice_period_entity" },
      { field: "notice_period_provider" },
      { field: "is_intragroup" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "filtering_labels" }
    ]
  },
  representatives: {
    name: "representative",
    localName: "representative",
    localNamePlural: "representatives",
    verboseName: "Representative",
    verboseNamePlural: "Representatives",
    foreignKeyFields: [
      { field: "entity", urlModel: "entities" },
      { field: "user", urlModel: "users" }
    ]
  },
  "business-impact-analysis": {
    endpointUrl: "resilience/business-impact-analysis",
    name: "businessimpactanalysis",
    localName: "businessImpactAnalysis",
    localNamePlural: "businessImpactAnalysis",
    verboseName: "businessimpactanalysis",
    verboseNamePlural: "businessimpactanalysis",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "authors", urlModel: "actors" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "risk_matrix", urlModel: "risk-matrices" }
    ],
    reverseForeignKeyFields: [{ field: "bia", urlModel: "asset-assessments" }],
    selectFields: [{ field: "status" }],
    filters: [{ field: "perimeter" }, { field: "auditor" }, { field: "status" }],
    detailViewFields: [
      { field: "id" },
      { field: "folder" },
      { field: "name" },
      { field: "perimeter" },
      { field: "authors" },
      { field: "reviewers" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "description" },
      { field: "version" },
      { field: "is_locked" },
      { field: "observation" }
    ]
  },
  "asset-assessments": {
    endpointUrl: "resilience/asset-assessments",
    name: "assetassessment",
    localName: "assetAssessment",
    localNamePlural: "assetAssessments",
    verboseName: "assetassessment",
    verboseNamePlural: "assetassessments",
    reverseForeignKeyFields: [{ field: "asset_assessment", urlModel: "escalation-thresholds" }],
    foreignKeyFields: [
      { field: "asset", urlModel: "assets" },
      { field: "folder", urlModel: "folders" },
      { field: "asset_folder", urlModel: "folders" },
      { field: "children_assets", urlModel: "assets" },
      { field: "dependencies", urlModel: "assets" },
      { field: "associated_controls", urlModel: "applied-controls" },
      {
        field: "bia",
        urlModel: "business-impact-analysis",
        endpointUrl: "business-impact-analysis"
      }
    ]
  },
  "escalation-thresholds": {
    endpointUrl: "resilience/escalation-thresholds",
    name: "escalationthreshold",
    localName: "escalationThreshold",
    localNamePlural: "escalationThresholds",
    verboseName: "escalationthreshold",
    verboseNamePlural: "escalationthresholds",
    selectFields: [
      { field: "quant_unit" },
      {
        field: "quali_impact",
        valueType: "number",
        detail: true,
        endpointUrl: "resilience/asset-assessments",
        formNestedField: "asset_assessment"
      }
      //this is for edit only
    ],
    foreignKeyFields: [
      {
        field: "asset_assessment",
        urlModel: "asset-assessments",
        endpointUrl: "asset-assessments"
      },
      { field: "qualifications", urlModel: "terminologies" }
    ],
    detailViewFields: [
      { field: "asset_assessment" },
      { field: "get_human_pit" },
      { field: "qualifications" },
      { field: "quali_impact" },
      { field: "justification" },
      { field: "created_at" },
      { field: "updated_at" }
    ]
  },
  processings: {
    endpointUrl: "privacy/processings",
    name: "processing",
    localName: "processing",
    localNamePlural: "processings",
    verboseName: "processing",
    verboseNamePlural: "processings",
    selectFields: [{ field: "status" }, { field: "nature" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "purposes", urlModel: "purposes" },
      { field: "assigned_to", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    reverseForeignKeyFields: [
      { field: "processing", urlModel: "personal-data" },
      { field: "processing", urlModel: "data-subjects" },
      { field: "processing", urlModel: "purposes" },
      { field: "processing", urlModel: "data-recipients" },
      { field: "processing", urlModel: "data-contractors" },
      { field: "processing", urlModel: "data-transfers" },
      {
        field: "processings",
        urlModel: "right-requests",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "processings",
        urlModel: "applied-controls",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "processings",
        urlModel: "evidences",
        disableCreate: true,
        disableDelete: true
      }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "folder" },
      { field: "assigned_to" },
      { field: "status" },
      { field: "dpia_required" },
      { field: "dpia_reference" },
      { field: "nature" },
      { field: "purposes" },
      { field: "created_at" },
      { field: "updated_at" },
      { field: "filtering_labels" }
    ]
  },
  "processing-natures": {
    endpointUrl: "privacy/processing-natures",
    name: "processingnature",
    localName: "processingNature",
    localNamePlural: "processingNatures",
    verboseName: "processing nature",
    verboseNamePlural: "processing natures"
  },
  "right-requests": {
    endpointUrl: "privacy/right-requests",
    name: "rightrequest",
    localName: "rightRequest",
    localNamePlural: "rightRequests",
    verboseName: "right request",
    verboseNamePlural: "right requests",
    selectFields: [{ field: "request_type" }, { field: "status" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "owner", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "processings", urlModel: "processings", endpointUrl: "processings" }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "ref_id" },
      { field: "owner" },
      { field: "requested_on", type: "date" },
      { field: "due_date", type: "date" },
      { field: "request_type" },
      { field: "status" },
      { field: "observation" },
      { field: "processings" },
      { field: "folder" },
      { field: "updated_at", type: "datetime" }
    ]
  },
  "data-breaches": {
    endpointUrl: "privacy/data-breaches",
    name: "databreach",
    localName: "dataBreach",
    localNamePlural: "dataBreaches",
    verboseName: "data breach",
    verboseNamePlural: "data breaches",
    selectFields: [{ field: "breach_type" }, { field: "risk_level" }, { field: "status" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "assigned_to", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "affected_processings", urlModel: "processings" },
      { field: "affected_personal_data", urlModel: "personal-data" },
      { field: "authorities", urlModel: "entities" },
      { field: "remediation_measures", urlModel: "applied-controls" },
      { field: "incident", urlModel: "incidents" }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "ref_id" },
      { field: "assigned_to" },
      { field: "discovered_on", type: "datetime" },
      { field: "breach_type" },
      { field: "risk_level" },
      { field: "status" },
      { field: "affected_subjects_count" },
      { field: "affected_processings" },
      { field: "affected_personal_data" },
      { field: "affected_personal_data_count" },
      { field: "authorities" },
      { field: "authority_notified_on", type: "datetime" },
      { field: "authority_notification_ref" },
      { field: "subjects_notified_on", type: "datetime" },
      { field: "potential_consequences" },
      { field: "remediation_measures" },
      { field: "incident" },
      { field: "reference_link" },
      { field: "observation" },
      { field: "folder" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" }
    ]
  },
  purposes: {
    endpointUrl: "privacy/purposes",
    name: "purpose",
    localName: "purpose",
    localNamePlural: "purposes",
    verboseName: "purpose",
    verboseNamePlural: "purposes",
    selectFields: [{ field: "legal_basis" }],
    foreignKeyFields: [{ field: "processing", urlModel: "processings", endpointUrl: "processings" }]
  },
  "personal-data": {
    endpointUrl: "privacy/personal-data",
    name: "personaldata",
    localName: "personalData",
    localNamePlural: "personalData",
    verboseName: "personal data",
    verboseNamePlural: "personal data",
    foreignKeyFields: [
      { field: "processing", urlModel: "processings", endpointUrl: "processings" },
      { field: "assets", urlModel: "assets", endpointUrl: "assets" }
    ],
    reverseForeignKeyFields: [
      { field: "personal_data", urlModel: "assets", disableCreate: true, disableDelete: true }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "category" },
      { field: "retention" },
      { field: "deletion_policy" },
      { field: "is_sensitive" },
      { field: "processing" },
      { field: "folder" },
      { field: "created_at" },
      { field: "updated_at" }
    ],
    selectFields: [{ field: "category" }, { field: "deletion_policy" }],
    filters: [{ field: "processing" }, { field: "category" }, { field: "assets" }]
  },
  "data-subjects": {
    endpointUrl: "privacy/data-subjects",
    name: "datasubject",
    localName: "dataSubject",
    localNamePlural: "dataSubjects",
    verboseName: "data subject",
    verboseNamePlural: "data subjects",
    foreignKeyFields: [{ field: "processing", urlModel: "processings" }],
    selectFields: [{ field: "category" }]
  },
  "data-recipients": {
    endpointUrl: "privacy/data-recipients",
    name: "datarecipient",
    localName: "dataRecipient",
    localNamePlural: "dataRecipients",
    verboseName: "data recipient",
    verboseNamePlural: "data recipients",
    foreignKeyFields: [{ field: "processing", urlModel: "processings" }],
    selectFields: [{ field: "category" }]
  },
  "data-contractors": {
    endpointUrl: "privacy/data-contractors",
    name: "datacontractor",
    localName: "dataContractor",
    localNamePlural: "dataContractors",
    verboseName: "data contractor",
    verboseNamePlural: "data contractors",
    foreignKeyFields: [
      { field: "processing", urlModel: "processings" },
      { field: "entity", urlModel: "entities" }
    ],
    selectFields: [{ field: "relationship_type" }, { field: "country" }]
  },
  "data-transfers": {
    endpointUrl: "privacy/data-transfers",
    name: "datatransfer",
    localName: "dataTransfer",
    localNamePlural: "dataTransfers",
    verboseName: "data transfer",
    verboseNamePlural: "data transfers",
    foreignKeyFields: [
      { field: "processing", urlModel: "processings" },
      { field: "entity", urlModel: "entities" }
    ],
    selectFields: [{ field: "legal_basis" }, { field: "country" }]
  },
  "ebios-rm": {
    endpointUrl: "ebios-rm/studies",
    name: "ebiosrmstudy",
    localName: "ebiosRmStudy",
    localNamePlural: "ebiosRmStudies",
    verboseName: "Ebios RM study",
    verboseNamePlural: "Ebios RM study",
    foreignKeyFields: [
      { field: "risk_matrix", urlModel: "risk-matrices" },
      { field: "assets", urlModel: "assets" },
      { field: "authors", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "compliance_assessments", urlModel: "compliance-assessments" },
      { field: "reference_entity", urlModel: "entities" }
    ],
    reverseForeignKeyFields: [{ field: "ebios_rm_studies", urlModel: "assets" }],
    selectFields: [{ field: "quotation_method" }]
  },
  "feared-events": {
    endpointUrl: "ebios-rm/feared-events",
    name: "fearedevent",
    localName: "fearedEvent",
    localNamePlural: "fearedEvents",
    verboseName: "Feared event",
    verboseNamePlural: "Feared events",
    foreignKeyFields: [
      { field: "ebios_rm_study", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      { field: "assets", urlModel: "assets", urlParams: "type=PR&ebios_rm_studies=", detail: true },
      { field: "qualifications", urlModel: "terminologies" }
    ],
    selectFields: [{ field: "gravity", valueType: "number", detail: true }]
  },
  "ro-to": {
    endpointUrl: "ebios-rm/ro-to",
    name: "roto",
    localName: "roto",
    localNamePlural: "roto",
    verboseName: "Ro to",
    verboseNamePlural: "Ro to",
    foreignKeyFields: [
      { field: "ebios_rm_study", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      {
        field: "feared_events",
        urlModel: "feared-events",
        endpointUrl: "ebios-rm/feared-events",
        urlParams: "is_selected=true&ebios_rm_study=",
        detail: true
      },
      {
        field: "risk_origin",
        urlModel: "terminologies",
        urlParams: "field_path=ro_to.risk_origin&is_visible=true"
      }
    ],
    selectFields: [
      { field: "motivation", valueType: "number" },
      { field: "resources", valueType: "number" },
      { field: "activity", valueType: "number" }
    ]
  },
  stakeholders: {
    endpointUrl: "ebios-rm/stakeholders",
    name: "stakeholder",
    localName: "stakeholder",
    localNamePlural: "stakeholders",
    verboseName: "Stakeholder",
    verboseNamePlural: "Stakeholders",
    foreignKeyFields: [
      { field: "entity", urlModel: "entities" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "ebios_rm_study", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      {
        field: "category",
        urlModel: "terminologies",
        urlParams: "field_path=entity.relationship&is_visible=true"
      }
    ],
    reverseForeignKeyFields: [
      {
        field: "stakeholders",
        urlModel: "applied-controls"
      }
    ]
  },
  "strategic-scenarios": {
    endpointUrl: "ebios-rm/strategic-scenarios",
    name: "strategicscenario",
    localName: "strategicScenario",
    localNamePlural: "strategicScenarios",
    verboseName: "Strategic scenario",
    verboseNamePlural: "Strategic scenarios",
    foreignKeyFields: [
      { field: "ebios_rm_study", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      { field: "feared_events", urlModel: "feared-events" },
      {
        field: "ro_to_couple",
        urlModel: "ro-to",
        endpointUrl: "ebios-rm/ro-to",
        urlParams: "is_selected=true&used=false&ebios_rm_study=",
        detail: true
      },
      {
        field: "focused_feared_event",
        urlModel: "feared-events",
        endpointUrl: "ebios-rm/feared-events",
        detail: true
      },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      {
        field: "attack_paths",
        urlModel: "attack-paths",
        endpointUrl: "ebios-rm/attack-paths"
      }
    ],
    reverseForeignKeyFields: [
      {
        field: "strategic_scenario",
        urlModel: "attack-paths",
        endpointUrl: "ebios-rm/attack-paths"
      }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "feared_events", urlModel: "feared-events" },
      { field: "ro_to_couple" },
      { field: "focused_feared_event", urlModel: "feared-events" },
      { field: "gravity" },
      { field: "updated_at", type: "datetime" },
      { field: "ebios_rm_study" }
    ]
  },
  "attack-paths": {
    endpointUrl: "ebios-rm/attack-paths",
    name: "attackpath",
    localName: "attackPath",
    localNamePlural: "attackPaths",
    verboseName: "Attack path",
    verboseNamePlural: "Attack paths",
    foreignKeyFields: [
      {
        field: "stakeholders",
        urlModel: "stakeholders",
        endpointUrl: "ebios-rm/stakeholders",
        urlParams: "is_selected=true&ebios_rm_study=",
        detail: true
      },
      { field: "ebios_rm_study", urlModel: "ebios-rm", endpointUrl: "ebios-rm/studies" },
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "ro_to_couple", urlModel: "ro-to" },
      {
        field: "strategic_scenario",
        urlModel: "strategic-scenarios",
        endpointUrl: "ebios-rm/strategic-scenarios",
        urlParams: "ebios_rm_study=",
        detail: true
      }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "ref_id" },
      { field: "form_display_name" },
      { field: "description" },
      { field: "strategic_scenario" },
      { field: "ro_to_couple" },
      { field: "is_selected" },
      { field: "stakeholders" },
      { field: "updated_at", type: "datetime" },
      { field: "ebios_rm_study" }
    ]
  },
  "operational-scenarios": {
    endpointUrl: "ebios-rm/operational-scenarios",
    name: "operationalscenario",
    localName: "operationalScenario",
    localNamePlural: "operationalScenarios",
    verboseName: "Operational scenario",
    verboseNamePlural: "Operational scenarios",
    foreignKeyFields: [
      { field: "ebios_rm_study", urlModel: "ebios-rm" },
      { field: "threats", urlModel: "threats" },
      {
        field: "attack_path",
        urlModel: "attack-paths",
        endpointUrl: "ebios-rm/attack-paths",
        urlParams: "is_selected=true&used=false&ebios_rm_study=",
        detail: true
      },
      {
        field: "strategic_scenario",
        urlModel: "strategic-scenarios",
        endpointUrl: "ebios-rm/strategic-scenarios"
      }
    ],
    reverseForeignKeyFields: [
      {
        field: "operational_scenario",
        urlModel: "operating-modes",
        endpointUrl: "ebios-rm/operating-modes"
      }
    ],
    selectFields: [
      {
        field: "likelihood",
        valueType: "number",
        detail: true,
        endpointUrl: "ebios-rm/studies",
        formNestedField: "ebios_rm_study"
      }
    ]
  },
  "elementary-actions": {
    endpointUrl: "ebios-rm/elementary-actions",
    name: "elementaryaction",
    localName: "elementaryAction",
    localNamePlural: "elementaryActions",
    verboseName: "Elementary action",
    verboseNamePlural: "Elementary actions",
    foreignKeyFields: [
      { field: "threat", urlModel: "threats" },
      { field: "folder", urlModel: "folders" }
    ],
    selectFields: [{ field: "attack_stage", valueType: "number" }, { field: "icon" }],
    detailViewFields: [
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "threat" },
      { field: "icon" },
      { field: "attack_stage" },
      { field: "folder" },
      { field: "created_at" },
      { field: "updated_at" }
    ]
  },
  "operating-modes": {
    endpointUrl: "ebios-rm/operating-modes",
    name: "operatingmode",
    localName: "operatingMode",
    localNamePlural: "operatingModes",
    verboseName: "Operating mode",
    verboseNamePlural: "Operating modes",
    foreignKeyFields: [
      { field: "operational_scenario", urlModel: "operational-scenarios" },
      { field: "elementary_actions", urlModel: "elementary-actions" },
      { field: "folder", urlModel: "folders" }
    ],
    selectFields: [
      {
        field: "likelihood",
        valueType: "number",
        detail: true,
        endpointUrl: "ebios-rm/studies",
        formNestedField: "ebios_rm_study"
      }
    ],
    reverseForeignKeyFields: [
      {
        field: "operating_modes",
        urlModel: "elementary-actions",
        endpointUrl: "ebios-rm/elementary-actions",
        disableDelete: true
      },
      {
        field: "operating_mode",
        urlModel: "kill-chains",
        endpointUrl: "ebios-rm/kill-chains"
      }
    ],
    detailViewFields: [
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "operational_scenario" },
      { field: "likelihood" },
      { field: "created_at" },
      { field: "updated_at" }
    ]
  },
  "kill-chains": {
    endpointUrl: "ebios-rm/kill-chains",
    name: "killchain",
    localName: "killChain",
    localNamePlural: "killChains",
    verboseName: "Kill chain",
    verboseNamePlural: "Kill chains",
    foreignKeyFields: [
      { field: "operating_mode", urlModel: "operating-modes" },
      { field: "elementary_action", urlModel: "elementary-actions" },
      { field: "antecedents", urlModel: "elementary-actions" }
    ],
    selectFields: [{ field: "logic_operator" }]
  },
  "security-exceptions": {
    name: "securityexception",
    localName: "securityException",
    localNamePlural: "securityExceptions",
    verboseName: "Security exception",
    verboseNamePlural: "Security exceptions",
    foreignKeyFields: [
      { field: "owners", urlModel: "actors" },
      { field: "approver", urlModel: "users", urlParams: "is_approver=true" },
      { field: "folder", urlModel: "folders" },
      { field: "assets", urlModel: "assets" }
    ],
    selectFields: [{ field: "severity", valueType: "number" }, { field: "status" }],
    reverseForeignKeyFields: [
      {
        field: "security_exceptions",
        urlModel: "applied-controls",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "security_exceptions",
        urlModel: "assets",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "security_exceptions",
        urlModel: "vulnerabilities",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "security_exceptions",
        urlModel: "requirement-assessments",
        disableCreate: true,
        disableDelete: true
      },
      {
        field: "security_exceptions",
        urlModel: "risk-scenarios",
        disableCreate: true,
        disableDelete: true
      }
    ]
  },
  "findings-assessments": {
    name: "findingsassessment",
    localName: "findingsAssessment",
    localNamePlural: "findingsAssessments",
    verboseName: "Findings assessment",
    verboseNamePlural: "Findings assessments",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "authors", urlModel: "actors" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "owner", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "evidences", urlModel: "evidences" }
    ],
    reverseForeignKeyFields: [
      { field: "findings_assessment", urlModel: "findings" },
      { field: "findings_assessments", urlModel: "evidences" }
    ],
    selectFields: [{ field: "status" }, { field: "category" }],
    detailViewFields: [
      { field: "id" },
      { field: "perimeter" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "authors" },
      { field: "reviewers" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "version" },
      { field: "status" },
      { field: "observation" },
      { field: "is_locked" }
    ]
  },
  findings: {
    name: "finding",
    localName: "finding",
    localNamePlural: "findings",
    verboseName: "Finding",
    verboseNamePlural: "Findings",
    foreignKeyFields: [
      { field: "findings_assessment", urlModel: "findings-assessments" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "evidences", urlModel: "evidences" }
    ],
    reverseForeignKeyFields: [
      // 	{ field: 'findings', urlModel: 'vulnerabilities' },
      // 	{ field: 'findings', urlModel: 'reference-controls' },
      { field: "findings", urlModel: "applied-controls" },
      { field: "findings", urlModel: "evidences" }
    ],
    selectFields: [
      { field: "severity", valueType: "number" },
      { field: "status" },
      { field: "priority", valueType: "number" }
    ],
    filters: [
      { field: "owner" },
      { field: "folder" },
      { field: "status" },
      { field: "severity" },
      { field: "priority" },
      { field: "findings_assessment" },
      { field: "filtering_labels" },
      { field: "applied_controls" },
      { field: "evidences" }
    ]
  },
  incidents: {
    name: "incident",
    localName: "incident",
    localNamePlural: "incidents",
    verboseName: "Incident",
    verboseNamePlural: "Incidents",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders" },
      { field: "threats", urlModel: "threats" },
      { field: "assets", urlModel: "assets" },
      { field: "perimeter", urlModel: "perimeters" },
      { field: "owners", urlModel: "actors", urlParams: "is_third_party=false" },
      { field: "qualifications", urlModel: "terminologies" },
      { field: "entities", urlModel: "entities" }
    ],
    reverseForeignKeyFields: [{ field: "incident", urlModel: "timeline-entries" }],
    selectFields: [
      { field: "severity", valueType: "number" },
      { field: "status" },
      { field: "detection" }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "folder" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "reported_at" },
      { field: "qualifications" },
      { field: "status" },
      { field: "severity" },
      { field: "detection" },
      { field: "assets" },
      { field: "owners" },
      { field: "entities" },
      { field: "created_at" },
      { field: "updated_at" },
      { field: "link" }
    ]
  },
  "timeline-entries": {
    name: "timelineentry",
    localName: "timelineEntry",
    localNamePlural: "timelineEntries",
    verboseName: "Timeline entry",
    verboseNamePlural: "Timeline entries",
    foreignKeyFields: [
      { field: "incident", urlModel: "incidents" },
      { field: "author", urlModel: "actors" },
      { field: "folder", urlModel: "folders" }
    ],
    selectFields: [{ field: "entry_type" }],
    reverseForeignKeyFields: [{ field: "timeline_entries", urlModel: "evidences" }]
  },
  "task-templates": {
    name: "tasktemplate",
    localName: "taskTemplate",
    localNamePlural: "taskTemplates",
    verboseName: "Task template",
    verboseNamePlural: "Task templates",
    selectFields: [{ field: "status" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders" },
      { field: "evidences", urlModel: "evidences" },
      { field: "assigned_to", urlModel: "actors" },
      { field: "assets", urlModel: "assets" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "compliance_assessments", urlModel: "compliance-assessments" },
      { field: "risk_assessments", urlModel: "risk-assessments" },
      { field: "findings_assessment", urlModel: "findings-assessments" }
    ],
    reverseForeignKeyFields: [
      {
        field: "task_template",
        urlModel: "task-nodes",
        disableCreate: true,
        disableDelete: true,
        disableEdit: true,
        defaultFilters: {
          past: [{ value: "false" }]
        }
      }
    ]
  },
  "task-nodes": {
    name: "tasknode",
    localName: "taskNode",
    localNamePlural: "taskNodes",
    verboseName: "Task node",
    verboseNamePlural: "Task nodes",
    selectFields: [{ field: "status" }],
    foreignKeyFields: [
      { field: "task_template", urlModel: "task-templates" },
      { field: "evidences", urlModel: "evidences" },
      { field: "expected_evidence", urlModel: "evidences" },
      { field: "assigned_to", urlModel: "actors" },
      { field: "folder", urlModel: "folders" },
      { field: "applied_controls", urlModel: "applied-controls" },
      { field: "compliance_assessments", urlModel: "compliance-assessments" },
      { field: "risk_assessments", urlModel: "risk-assessments" },
      { field: "assets", urlModel: "assets" },
      { field: "findings_assessment", urlModel: "findings-assessments" }
    ],
    detailViewFields: [
      { field: "task_template" },
      { field: "folder" },
      { field: "name" },
      { field: "assigned_to" },
      { field: "evidences", tooltip: "taskNodeLegacyEvidence" },
      { field: "is_recurrent" },
      { field: "expected_evidence", tooltip: "taskNodeNewEvidence" },
      { field: "applied_controls" },
      { field: "compliance_assessments" },
      { field: "assets" },
      { field: "risk_assessments" },
      { field: "findings_assessment" },
      { field: "created_at" },
      { field: "updated_at" },
      { field: "due_date" },
      { field: "status" },
      { field: "observation" }
    ]
  },
  campaigns: {
    name: "campaign",
    localName: "campaign",
    localNamePlural: "campaigns",
    verboseName: "Campaign",
    verboseNamePlural: "Campaigns",
    selectFields: [{ field: "status" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "framework", urlModel: "frameworks" },
      { field: "perimeters", urlModel: "perimeters" }
    ],
    reverseForeignKeyFields: [
      {
        field: "campaign",
        urlModel: "compliance-assessments",
        disableCreate: true,
        disableDelete: true
      },
      { field: "campaigns", urlModel: "perimeters", disableCreate: true, disableDelete: true }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "framework" },
      { field: "status" },
      { field: "start_date" },
      { field: "due_date" },
      { field: "folder" },
      { field: "created_at" },
      { field: "updated_at" }
    ],
    filters: [
      { field: "status" },
      { field: "framework" },
      { field: "folder" },
      { field: "perimeters" }
    ]
  },
  "organisation-objectives": {
    name: "organisationobjective",
    localName: "organisationObjective",
    localNamePlural: "organisationObjectives",
    verboseName: "Organisation objective",
    verboseNamePlural: "Organisation objectives",
    selectFields: [{ field: "status" }, { field: "health" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "assets", urlModel: "assets" },
      { field: "issues", urlModel: "organisation-issues" },
      { field: "tasks", urlModel: "task-templates" },
      { field: "metrics", urlModel: "metric-instances" },
      { field: "assigned_to", urlModel: "actors" }
    ],
    detailViewFields: [
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "folder" },
      { field: "status" },
      { field: "health" },
      { field: "eta", type: "date" },
      { field: "due_date", type: "date" },
      { field: "observation" },
      { field: "assigned_to" },
      { field: "issues" },
      { field: "assets" },
      { field: "tasks" }
    ],
    reverseForeignKeyFields: [
      {
        field: "objectives",
        urlModel: "applied-controls",
        disableCreate: false,
        disableDelete: true
      },
      {
        field: "organisation_objectives",
        urlModel: "metric-instances",
        disableCreate: false,
        disableDelete: true
      }
    ],
    filters: [{ field: "folder" }]
  },
  "organisation-issues": {
    name: "organisationissue",
    localName: "organisationIssue",
    localNamePlural: "organisationIssues",
    verboseName: "Organisation issue",
    verboseNamePlural: "Organisation issues",
    selectFields: [{ field: "category" }, { field: "origin" }],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "assets", urlModel: "assets" }
    ],
    reverseForeignKeyFields: [
      {
        field: "issues",
        urlModel: "organisation-objectives",
        disableCreate: false,
        disableDelete: true
      }
    ],
    filters: [{ field: "folder" }]
  },
  "quantitative-risk-studies": {
    name: "quantitativeriskstudy",
    localName: "quantitativeRiskStudy",
    localNamePlural: "quantitativeRiskStudies",
    verboseName: "Quantitative Risk Study",
    verboseNamePlural: "Quantitative Risk Studies",
    endpointUrl: "crq/quantitative-risk-studies",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "authors", urlModel: "actors" },
      { field: "reviewers", urlModel: "actors", urlParams: "is_third_party=false" }
    ],
    reverseForeignKeyFields: [
      {
        field: "quantitative_risk_study",
        urlModel: "quantitative-risk-scenarios",
        endpointUrl: "crq/quantitative-risk-scenarios"
      }
    ],
    selectFields: [
      { field: "status", endpointUrl: "crq/quantitative-risk-studies" },
      { field: "distribution_model", endpointUrl: "crq/quantitative-risk-studies" }
    ],
    filters: [{ field: "folder" }, { field: "status" }],
    detailViewFields: [
      { field: "name" },
      { field: "description" },
      { field: "id" },
      { field: "status" },
      { field: "authors" },
      { field: "reviewers" },
      { field: "eta", type: "date" },
      { field: "due_date", type: "date" },
      { field: "risk_tolerance_display" },
      { field: "loss_threshold_display" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" },
      { field: "folder" },
      { field: "observation" }
    ]
  },
  "quantitative-risk-scenarios": {
    name: "quantitativeriskscenario",
    localName: "quantitativeRiskScenario",
    localNamePlural: "quantitativeRiskScenarios",
    verboseName: "Quantitative Risk Scenario",
    verboseNamePlural: "Quantitative Risk Scenarios",
    endpointUrl: "crq/quantitative-risk-scenarios",
    foreignKeyFields: [
      {
        field: "quantitative_risk_study",
        urlModel: "quantitative-risk-studies",
        endpointUrl: "crq/quantitative-risk-studies"
      },
      { field: "assets", urlModel: "assets" },
      { field: "owner", urlModel: "actors" },
      { field: "vulnerabilities", urlModel: "vulnerabilities" },
      { field: "threats", urlModel: "threats" },
      { field: "qualifications", urlModel: "qualifications" }
    ],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "ref_id" },
      { field: "quantitative_risk_study" },
      { field: "description" },
      { field: "priority" },
      { field: "current_ale_display" },
      { field: "status" },
      { field: "assets" },
      { field: "threats" },
      { field: "qualifications" },
      { field: "folder" },
      { field: "observation" },
      { field: "is_selected" }
    ],
    reverseForeignKeyFields: [
      {
        field: "quantitative_risk_scenario",
        urlModel: "quantitative-risk-hypotheses",
        endpointUrl: "crq/quantitative-risk-hypotheses"
      }
    ],
    selectFields: [
      { field: "status", endpointUrl: "crq/quantitative-risk-scenarios" },
      { field: "priority", endpointUrl: "crq/quantitative-risk-scenarios" }
    ],
    filters: [{ field: "quantitative_risk_study" }, { field: "status" }, { field: "priority" }]
  },
  "quantitative-risk-hypotheses": {
    name: "quantitativeriskhypothesis",
    localName: "quantitativeRiskHypothesis",
    localNamePlural: "quantitativeRiskHypotheses",
    verboseName: "Quantitative Risk Hypothesis",
    verboseNamePlural: "Quantitative Risk Hypotheses",
    endpointUrl: "crq/quantitative-risk-hypotheses",
    foreignKeyFields: [
      {
        field: "quantitative_risk_scenario",
        urlModel: "quantitative-risk-scenarios",
        endpointUrl: "crq/quantitative-risk-scenarios"
      },
      { field: "existing_applied_controls", urlModel: "applied-controls" },
      { field: "added_applied_controls", urlModel: "applied-controls" },
      { field: "removed_applied_controls", urlModel: "applied-controls" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    selectFields: [{ field: "risk_stage", endpointUrl: "crq/quantitative-risk-hypotheses" }],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "ref_id" },
      { field: "quantitative_risk_scenario" },
      { field: "simulation_parameters_display" },
      { field: "is_simulation_fresh" },
      { field: "ale_display" },
      { field: "treatment_cost_display" },
      { field: "roc_display" },
      { field: "roc_calculation_explanation" },
      { field: "risk_stage" },
      { field: "existing_applied_controls" },
      { field: "added_applied_controls" },
      { field: "removed_applied_controls" },
      { field: "observation" },
      { field: "is_selected" }
    ]
  },
  terminologies: {
    name: "terminology",
    localName: "terminology",
    localNamePlural: "terminologies",
    verboseName: "Terminology",
    verboseNamePlural: "Terminologies",
    selectFields: [{ field: "field_path" }],
    customNameDescription: true,
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "field_path" },
      { field: "created_at" },
      { field: "updated_at" },
      { field: "builtin" },
      { field: "is_visible" },
      { field: "translations" }
    ]
  },
  roles: {
    endpointUrl: "roles",
    name: "role",
    localName: "role",
    localNamePlural: "roles",
    verboseName: "Role",
    verboseNamePlural: "Roles",
    foreignKeyFields: [{ field: "folder", urlModel: "folders" }],
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "builtin" },
      { field: "permissions" },
      { field: "created_at" },
      { field: "updated_at" }
    ]
  },
  permissions: {
    endpointUrl: "permissions",
    name: "permission",
    localName: "permission",
    localNamePlural: "permissions",
    verboseName: "Permission",
    verboseNamePlural: "Permissions"
  },
  "generic-collections": {
    name: "genericcollection",
    localName: "genericCollection",
    localNamePlural: "genericCollections",
    verboseName: "Generic Collection",
    verboseNamePlural: "Generic Collections",
    endpointUrl: "pmbok/generic-collections",
    detailViewFields: [
      { field: "id" },
      { field: "name" },
      { field: "description" },
      { field: "ref_id" },
      { field: "filtering_labels", urlModel: "filtering-labels" },
      { field: "folder" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" }
    ],
    foreignKeyFields: [{ field: "folder", urlModel: "folders" }],
    reverseForeignKeyFields: [
      { field: "genericcollection", urlModel: "compliance-assessments" },
      { field: "genericcollection", urlModel: "risk-assessments" },
      { field: "genericcollection", urlModel: "quantitative-risk-studies" },
      { field: "genericcollection", urlModel: "ebios-rm" },
      { field: "genericcollection", urlModel: "entity-assessments" },
      { field: "genericcollection", urlModel: "findings-assessments" },
      { field: "genericcollection", urlModel: "evidences" },
      { field: "genericcollection", urlModel: "security-exceptions" },
      { field: "genericcollection", urlModel: "policies" }
    ],
    selectFields: [{ field: "folder" }, { field: "ref_id" }]
  },
  accreditations: {
    name: "accreditation",
    localName: "accreditation",
    localNamePlural: "accreditations",
    verboseName: "Accreditation",
    verboseNamePlural: "Accreditations",
    endpointUrl: "pmbok/accreditations",
    detailViewFields: [
      { field: "id" },
      { field: "folder" },
      { field: "linked_collection", urlModel: "generic-collections" },
      { field: "checklist", urlModel: "compliance-assessments" },
      { field: "category" },
      { field: "status" },
      { field: "authority" },
      { field: "updated_at", type: "datetime" },
      { field: "expiry_date", type: "date" }
    ],
    foreignKeyFields: [
      { field: "folder", urlModel: "folders" },
      { field: "author", urlModel: "actors" },
      { field: "checklist", urlModel: "compliance-assessments" },
      { field: "linked_collection", urlModel: "generic-collections" },
      { field: "authority", urlModel: "entities" }
    ],
    selectFields: [
      { field: "folder" },
      { field: "ref_id" },
      { field: "status", endpointUrl: "pmbok/accreditations" },
      { field: "category", endpointUrl: "pmbok/accreditations" }
    ],
    filters: [
      { field: "folder" },
      { field: "status" },
      { field: "category" },
      { field: "author" },
      { field: "linked_collection" },
      { field: "checklist" },
      { field: "filtering_labels" }
    ]
  },
  "metric-definitions": {
    name: "metricdefinition",
    localName: "metricDefinition",
    localNamePlural: "metricDefinitions",
    verboseName: "Metric definition",
    verboseNamePlural: "Metric definitions",
    endpointUrl: "metrology/metric-definitions",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO&content_type=GL" },
      { field: "library", urlModel: "libraries" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    selectFields: [{ field: "category" }],
    reverseForeignKeyFields: [
      {
        field: "metric_definition",
        urlModel: "metric-instances"
      }
    ],
    filters: [
      { field: "folder" },
      { field: "category" },
      { field: "library" },
      { field: "provider" }
    ]
  },
  "metric-instances": {
    name: "metricinstance",
    localName: "metricInstance",
    localNamePlural: "metricInstances",
    verboseName: "Metric instance",
    verboseNamePlural: "Metric instances",
    endpointUrl: "metrology/metric-instances",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "metric_definition", urlModel: "metric-definitions" },
      { field: "unit", urlModel: "terminologies" },
      { field: "owner", urlModel: "actors" },
      { field: "organisation_objectives", urlModel: "organisation-objectives" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    selectFields: [{ field: "status" }, { field: "collection_frequency" }],
    detailViewFields: [
      { field: "id" },
      { field: "ref_id" },
      { field: "name" },
      { field: "description" },
      { field: "folder" },
      { field: "metric_definition" },
      { field: "unit" },
      { field: "owner" },
      { field: "organisation_objectives" },
      { field: "status" },
      { field: "collection_frequency" },
      { field: "target_value" },
      { field: "current_value" },
      { field: "filtering_labels" },
      { field: "created_at", type: "datetime" },
      { field: "updated_at", type: "datetime" }
    ],
    reverseForeignKeyFields: [
      {
        field: "metric_instance",
        urlModel: "custom-metric-samples",
        fieldForInitialData: ["metric_definition"]
      }
    ],
    filters: [
      { field: "folder" },
      { field: "metric_definition" },
      { field: "status" },
      { field: "collection_frequency" },
      { field: "owner" }
    ]
  },
  "custom-metric-samples": {
    name: "custommetricsample",
    localName: "customMetricSample",
    localNamePlural: "customMetricSamples",
    verboseName: "Custom metric sample",
    verboseNamePlural: "Custom metric samples",
    endpointUrl: "metrology/custom-metric-samples",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "metric_instance", urlModel: "metric-instances" }
    ],
    filters: [{ field: "folder" }, { field: "metric_instance" }]
  },
  dashboards: {
    name: "dashboard",
    localName: "dashboard",
    localNamePlural: "dashboards",
    verboseName: "Dashboard",
    verboseNamePlural: "Dashboards",
    endpointUrl: "metrology/dashboards",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "filtering_labels", urlModel: "filtering-labels" }
    ],
    filters: [{ field: "folder" }],
    reverseForeignKeyFields: [{ field: "widgets", urlModel: "dashboard-widgets" }]
  },
  "dashboard-widgets": {
    name: "dashboardwidget",
    localName: "dashboardWidget",
    localNamePlural: "dashboardWidgets",
    verboseName: "Dashboard widget",
    verboseNamePlural: "Dashboard widgets",
    endpointUrl: "metrology/dashboard-widgets",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "dashboard", urlModel: "dashboards" },
      { field: "metric_instance", urlModel: "metric-instances" }
    ],
    selectFields: [
      { field: "chart_type", valueType: "string", detail: false },
      { field: "time_range", valueType: "string", detail: false },
      { field: "aggregation", valueType: "string", detail: false }
    ],
    filters: [{ field: "folder" }, { field: "dashboard" }, { field: "metric_instance" }]
  },
  "dashboard-text-widgets": {
    name: "dashboardwidget",
    localName: "dashboardTextWidget",
    localNamePlural: "dashboardTextWidgets",
    verboseName: "Dashboard text widget",
    verboseNamePlural: "Dashboard text widgets",
    endpointUrl: "metrology/dashboard-widgets",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "dashboard", urlModel: "dashboards" }
    ]
  },
  "dashboard-builtin-widgets": {
    name: "dashboardwidget",
    localName: "dashboardBuiltinWidget",
    localNamePlural: "dashboardBuiltinWidgets",
    verboseName: "Dashboard builtin widget",
    verboseNamePlural: "Dashboard builtin widgets",
    endpointUrl: "metrology/dashboard-widgets",
    foreignKeyFields: [
      { field: "folder", urlModel: "folders", urlParams: "content_type=DO" },
      { field: "dashboard", urlModel: "dashboards" }
    ],
    selectFields: [
      { field: "chart_type", valueType: "string", detail: false },
      { field: "time_range", valueType: "string", detail: false },
      { field: "aggregation", valueType: "string", detail: false }
    ]
  }
};
const CUSTOM_ACTIONS_COMPONENT = Symbol("CustomActions");
const FIELD_COMPONENT_MAP = {
  evidences: {
    attachment: EvidenceFilePreview
  },
  "evidence-revisions": {
    attachment: EvidenceFilePreview,
    file_search: GeminiFileIdDisplay
  },
  "stored-libraries": {
    locales: LanguageDisplay,
    objects_meta: LibraryOverview,
    [CUSTOM_ACTIONS_COMPONENT]: LibraryActions
  },
  "loaded-libraries": {
    locales: LanguageDisplay,
    objects_meta: LibraryOverview,
    [CUSTOM_ACTIONS_COMPONENT]: LibraryActions
  },
  "user-groups": {
    localization_dict: UserGroupNameDisplay
  },
  "quantitative-risk-hypotheses": {
    lec_data: LecChartPreview
  }
};
function getFieldComponentMap(URLModel) {
  const fieldComponentMap = FIELD_COMPONENT_MAP[URLModel] ?? {};
  const listViewConfig = listViewFields[URLModel] ?? { body: [] };
  if (listViewConfig.body.findIndex((field) => field === "description") >= 0) {
    fieldComponentMap.description = MarkdownDescription;
  }
  return fieldComponentMap;
}
const getModelInfo = (model) => {
  const baseModel = model.split("_")[0];
  const map = URL_MODEL_MAP[model] || URL_MODEL_MAP[baseModel] || {};
  map["urlModel"] = baseModel;
  return map;
};
const urlParamModelVerboseName = (model) => {
  const modelInfo = getModelInfo(model);
  return modelInfo?.localName || modelInfo?.verboseName || model;
};
const urlParamModelDescriptionKey = (model) => {
  const camelCase2 = model.split("-").map((word, index2) => index2 === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
  return `${camelCase2}Description`;
};
const urlParamModelSelectFields = (model) => {
  return URL_MODEL_MAP[model]?.selectFields || [];
};

export { AutocompleteSelect as A, ContextMenuTriggerState as C, Floating_layer as F, MenuRootState as M, Popper_layer_force_mount as P, URL_MODEL_MAP as U, urlParamModelVerboseName as a, urlParamModelSelectFields as b, getListViewFields as c, getFieldComponentMap as d, boxWith as e, MenuMenuState as f, getModelInfo as g, headData as h, contextMenuActions as i, useId as j, Floating_layer_anchor as k, listViewFields as l, mergeProps as m, noop as n, MenuContentState as o, Popper_layer as p, getFloatingContentCSSVars as q, CONTEXT_MENU_TRIGGER_ATTR as r, Menu_separator as s, tableSourceMapper as t, urlParamModelDescriptionKey as u, Menu_item as v, CUSTOM_ACTIONS_COMPONENT as w, getOptions as x };
//# sourceMappingURL=crud-7XzjN-Wp.js.map
