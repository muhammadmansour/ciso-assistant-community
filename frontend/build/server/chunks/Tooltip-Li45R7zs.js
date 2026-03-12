import { p as push, a6 as props_id, S as attr_class, X as stringify, _ as spread_attributes, a as pop } from './index2-9icAqEyj.js';
import { u as useMachine, d as createAnatomy, e as dataAttr, P as isLeftClick, h as normalizeProps, c as createMachine, a as createGuards, Q as addDomEvent, R as getOverflowAncestors, M as isComposingEvent, j as createProps } from './machine.svelte-CNa8MjEx.js';
import { t as trackFocusVisible, i as isFocusVisible } from './index5-Brzv1W4u.js';
import { m as mergeProps, g as getPlacementStyles, a as getPlacement } from './index8-L4CsUepF.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';

const GET_ORIGINAL_SYMBOL = Symbol();
const getProto = Object.getPrototypeOf;
const objectsToTrack = /* @__PURE__ */ new WeakMap();
const isObjectToTrack = (obj) => obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
const getUntracked = (obj) => {
  if (isObjectToTrack(obj)) {
    return obj[GET_ORIGINAL_SYMBOL] || null;
  }
  return null;
};
const markToTrack = (obj, mark = true) => {
  objectsToTrack.set(obj, mark);
};
function glob() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
}
function globalRef(key, value) {
  const g = glob();
  if (!g) return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet = globalRef("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement = (x) => isReactElement(x) || isVueElement(x) || isDOMElement(x);
var isObject = (x) => x !== null && typeof x === "object";
var canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev = () => process.env.NODE_ENV !== "production";
var proxyStateMap = globalRef("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set) ;
      else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxy(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction2,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
var anatomy = createAnatomy("tooltip").parts("trigger", "arrow", "arrowTip", "positioner", "content");
var parts = anatomy.build();
var getTriggerId = (scope) => scope.ids?.trigger ?? `tooltip:${scope.id}:trigger`;
var getContentId = (scope) => scope.ids?.content ?? `tooltip:${scope.id}:content`;
var getArrowId = (scope) => scope.ids?.arrow ?? `tooltip:${scope.id}:arrow`;
var getPositionerId = (scope) => scope.ids?.positioner ?? `tooltip:${scope.id}:popper`;
var getTriggerEl = (scope) => scope.getById(getTriggerId(scope));
var getPositionerEl = (scope) => scope.getById(getPositionerId(scope));
var store = proxy({ id: null });
function connect(service, normalize) {
  const { state, context, send, scope, prop, event: _event } = service;
  const id = prop("id");
  const hasAriaLabel = !!prop("aria-label");
  const open = state.matches("open", "closing");
  const triggerId = getTriggerId(scope);
  const contentId = getContentId(scope);
  const disabled = prop("disabled");
  const popperStyles = getPlacementStyles({
    ...prop("positioning"),
    placement: context.get("currentPlacement")
  });
  return {
    open,
    setOpen(nextOpen) {
      const open2 = state.matches("open", "closing");
      if (open2 === nextOpen) return;
      send({ type: nextOpen ? "open" : "close" });
    },
    reposition(options = {}) {
      send({ type: "positioning.set", options });
    },
    getTriggerProps() {
      return normalize.button({
        ...parts.trigger.attrs,
        id: triggerId,
        dir: prop("dir"),
        "data-expanded": dataAttr(open),
        "data-state": open ? "open" : "closed",
        "aria-describedby": open ? contentId : void 0,
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (!prop("closeOnClick")) return;
          send({ type: "close", src: "trigger.click" });
        },
        onFocus(event) {
          queueMicrotask(() => {
            if (event.defaultPrevented) return;
            if (disabled) return;
            if (_event.src === "trigger.pointerdown") return;
            if (!isFocusVisible()) return;
            send({ type: "open", src: "trigger.focus" });
          });
        },
        onBlur(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (id === store.id) {
            send({ type: "close", src: "trigger.blur" });
          }
        },
        onPointerDown(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (!isLeftClick(event)) return;
          if (!prop("closeOnPointerDown")) return;
          if (id === store.id) {
            send({ type: "close", src: "trigger.pointerdown" });
          }
        },
        onPointerMove(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          if (event.pointerType === "touch") return;
          send({ type: "pointer.move" });
        },
        onPointerLeave() {
          if (disabled) return;
          send({ type: "pointer.leave" });
        },
        onPointerCancel() {
          if (disabled) return;
          send({ type: "pointer.leave" });
        }
      });
    },
    getArrowProps() {
      return normalize.element({
        id: getArrowId(scope),
        ...parts.arrow.attrs,
        dir: prop("dir"),
        style: popperStyles.arrow
      });
    },
    getArrowTipProps() {
      return normalize.element({
        ...parts.arrowTip.attrs,
        dir: prop("dir"),
        style: popperStyles.arrowTip
      });
    },
    getPositionerProps() {
      return normalize.element({
        id: getPositionerId(scope),
        ...parts.positioner.attrs,
        dir: prop("dir"),
        style: popperStyles.floating
      });
    },
    getContentProps() {
      return normalize.element({
        ...parts.content.attrs,
        dir: prop("dir"),
        hidden: !open,
        "data-state": open ? "open" : "closed",
        role: hasAriaLabel ? void 0 : "tooltip",
        id: hasAriaLabel ? void 0 : contentId,
        "data-placement": context.get("currentPlacement"),
        onPointerEnter() {
          send({ type: "content.pointer.move" });
        },
        onPointerLeave() {
          send({ type: "content.pointer.leave" });
        },
        style: {
          pointerEvents: prop("interactive") ? "auto" : "none"
        }
      });
    }
  };
}
var { and, not } = createGuards();
var machine = createMachine({
  initialState: ({ prop }) => {
    const open = prop("open") || prop("defaultOpen");
    return open ? "open" : "closed";
  },
  props({ props: props2 }) {
    return {
      id: "x",
      openDelay: 1e3,
      closeDelay: 500,
      closeOnPointerDown: true,
      closeOnEscape: true,
      interactive: false,
      closeOnScroll: true,
      closeOnClick: true,
      disabled: false,
      ...props2,
      positioning: {
        placement: "bottom",
        ...props2.positioning
      }
    };
  },
  effects: ["trackFocusVisible", "trackStore"],
  context: ({ bindable }) => ({
    currentPlacement: bindable(() => ({ defaultValue: void 0 })),
    hasPointerMoveOpened: bindable(() => ({ defaultValue: false }))
  }),
  watch({ track, action, prop }) {
    track([() => prop("disabled")], () => {
      action(["closeIfDisabled"]);
    });
    track([() => prop("open")], () => {
      action(["toggleVisibility"]);
    });
  },
  states: {
    closed: {
      entry: ["clearGlobalId"],
      on: {
        "controlled.open": {
          target: "open"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ],
        "pointer.leave": {
          actions: ["clearPointerMoveOpened"]
        },
        "pointer.move": [
          {
            guard: and("noVisibleTooltip", not("hasPointerMoveOpened")),
            target: "opening"
          },
          {
            guard: not("hasPointerMoveOpened"),
            target: "open",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          }
        ]
      }
    },
    opening: {
      effects: ["trackScroll", "trackPointerlockChange", "waitForOpenDelay"],
      on: {
        "after.openDelay": [
          {
            guard: "isOpenControlled",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          }
        ],
        "controlled.open": {
          target: "open"
        },
        "controlled.close": {
          target: "closed"
        },
        open: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ],
        "pointer.leave": [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["clearPointerMoveOpened", "invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          }
        ],
        close: [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ]
      }
    },
    open: {
      effects: ["trackEscapeKey", "trackScroll", "trackPointerlockChange", "trackPositioning"],
      entry: ["setGlobalId"],
      on: {
        "controlled.close": {
          target: "closed"
        },
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "pointer.leave": [
          {
            guard: "isVisible",
            target: "closing",
            actions: ["clearPointerMoveOpened"]
          },
          // == group ==
          {
            guard: "isOpenControlled",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["clearPointerMoveOpened", "invokeOnClose"]
          }
        ],
        "content.pointer.leave": {
          guard: "isInteractive",
          target: "closing"
        },
        "positioning.set": {
          actions: ["reposition"]
        }
      }
    },
    closing: {
      effects: ["trackPositioning", "waitForCloseDelay"],
      on: {
        "after.closeDelay": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "controlled.close": {
          target: "closed"
        },
        "controlled.open": {
          target: "open"
        },
        close: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "pointer.move": [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["setPointerMoveOpened", "invokeOnOpen", "toggleVisibility"]
          },
          {
            target: "open",
            actions: ["setPointerMoveOpened", "invokeOnOpen"]
          }
        ],
        "content.pointer.move": {
          guard: "isInteractive",
          target: "open"
        },
        "positioning.set": {
          actions: ["reposition"]
        }
      }
    }
  },
  implementations: {
    guards: {
      noVisibleTooltip: () => store.id === null,
      isVisible: ({ prop }) => prop("id") === store.id,
      isInteractive: ({ prop }) => !!prop("interactive"),
      hasPointerMoveOpened: ({ context }) => context.get("hasPointerMoveOpened"),
      isOpenControlled: ({ prop }) => prop("open") !== void 0
    },
    actions: {
      setGlobalId: ({ prop }) => {
        store.id = prop("id");
      },
      clearGlobalId: ({ prop }) => {
        if (prop("id") === store.id) {
          store.id = null;
        }
      },
      invokeOnOpen: ({ prop }) => {
        prop("onOpenChange")?.({ open: true });
      },
      invokeOnClose: ({ prop }) => {
        prop("onOpenChange")?.({ open: false });
      },
      closeIfDisabled: ({ prop, send }) => {
        if (!prop("disabled")) return;
        send({ type: "close", src: "disabled.change" });
      },
      reposition: ({ context, event, prop, scope }) => {
        if (event.type !== "positioning.set") return;
        const getPositionerEl2 = () => getPositionerEl(scope);
        return getPlacement(getTriggerEl(scope), getPositionerEl2, {
          ...prop("positioning"),
          ...event.options,
          defer: true,
          listeners: false,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      toggleVisibility: ({ prop, event, send }) => {
        queueMicrotask(() => {
          send({
            type: prop("open") ? "controlled.open" : "controlled.close",
            previousEvent: event
          });
        });
      },
      setPointerMoveOpened: ({ context }) => {
        context.set("hasPointerMoveOpened", true);
      },
      clearPointerMoveOpened: ({ context }) => {
        context.set("hasPointerMoveOpened", false);
      }
    },
    effects: {
      trackFocusVisible: ({ scope }) => {
        return trackFocusVisible({ root: scope.getRootNode?.() });
      },
      trackPositioning: ({ context, prop, scope }) => {
        if (!context.get("currentPlacement")) {
          context.set("currentPlacement", prop("positioning").placement);
        }
        const getPositionerEl2 = () => getPositionerEl(scope);
        return getPlacement(getTriggerEl(scope), getPositionerEl2, {
          ...prop("positioning"),
          defer: true,
          onComplete(data) {
            context.set("currentPlacement", data.placement);
          }
        });
      },
      trackPointerlockChange: ({ send, scope }) => {
        const doc = scope.getDoc();
        const onChange = () => send({ type: "close", src: "pointerlock:change" });
        return addDomEvent(doc, "pointerlockchange", onChange, false);
      },
      trackScroll: ({ send, prop, scope }) => {
        if (!prop("closeOnScroll")) return;
        const triggerEl = getTriggerEl(scope);
        if (!triggerEl) return;
        const overflowParents = getOverflowAncestors(triggerEl);
        const cleanups = overflowParents.map((overflowParent) => {
          const onScroll = () => {
            send({ type: "close", src: "scroll" });
          };
          return addDomEvent(overflowParent, "scroll", onScroll, {
            passive: true,
            capture: true
          });
        });
        return () => {
          cleanups.forEach((fn) => fn?.());
        };
      },
      trackStore: ({ prop, send }) => {
        let cleanup;
        queueMicrotask(() => {
          cleanup = subscribe(store, () => {
            if (store.id !== prop("id")) {
              send({ type: "close", src: "id.change" });
            }
          });
        });
        return () => cleanup?.();
      },
      trackEscapeKey: ({ send, prop }) => {
        if (!prop("closeOnEscape")) return;
        const onKeyDown = (event) => {
          if (isComposingEvent(event)) return;
          if (event.key !== "Escape") return;
          event.stopPropagation();
          send({ type: "close", src: "keydown.escape" });
        };
        return addDomEvent(document, "keydown", onKeyDown, true);
      },
      waitForOpenDelay: ({ send, prop }) => {
        const id = setTimeout(() => {
          send({ type: "after.openDelay" });
        }, prop("openDelay"));
        return () => clearTimeout(id);
      },
      waitForCloseDelay: ({ send, prop }) => {
        const id = setTimeout(() => {
          send({ type: "after.closeDelay" });
        }, prop("closeDelay"));
        return () => clearTimeout(id);
      }
    }
  }
});
createProps()([
  "aria-label",
  "closeDelay",
  "closeOnEscape",
  "closeOnPointerDown",
  "closeOnScroll",
  "closeOnClick",
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "interactive",
  "onOpenChange",
  "defaultOpen",
  "open",
  "openDelay",
  "positioning"
]);
function Tooltip($$payload, $$props) {
  push();
  const id = props_id($$payload);
  const {
    arrow = false,
    zIndex = "auto",
    // Base
    base = "",
    classes = "",
    // Trigger
    triggerBase = "",
    triggerBackground = "",
    triggerClasses = "",
    triggerAriaLabel = "",
    // Positioner
    positionerBase = "",
    positionerClasses = "",
    // Content
    contentBase = "",
    contentBackground = "",
    contentClasses = "",
    // Arrow
    arrowBase = "",
    arrowBackground = "!bg-white",
    arrowClasses = "",
    // Snippets
    trigger,
    content,
    // Events
    onmouseover,
    onclick,
    $$slots,
    $$events,
    // Zag ---
    ...zagProps
  } = $$props;
  const service = useMachine(machine, () => ({ id, ...zagProps }));
  const api = connect(service, normalizeProps);
  const triggerProps = mergeProps(api.getTriggerProps(), { onmouseover, onclick });
  $$payload.out += `<span${attr_class(`${stringify(base)} ${stringify(classes)}`)} data-testid="tooltip">`;
  if (trigger) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button${spread_attributes(
      {
        ...triggerProps,
        class: `${stringify(triggerBase)} ${stringify(triggerBackground)} ${stringify(triggerClasses)}`,
        type: "button",
        "aria-label": triggerAriaLabel
      },
      null
    )}>`;
    trigger($$payload);
    $$payload.out += `<!----></button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (api.open) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...api.getPositionerProps(),
        class: `${stringify(positionerBase)} ${stringify(positionerClasses)}`
      },
      null
    )}>`;
    if (arrow) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes({ ...api.getArrowProps() }, null)}><div${spread_attributes(
        {
          ...api.getArrowTipProps(),
          class: `${stringify(arrowBase)} ${stringify(arrowBackground)} ${stringify(arrowClasses)}`
        },
        null
      )}></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div${spread_attributes(
      {
        ...api.getContentProps(),
        class: `${stringify(contentBase)} ${stringify(contentBackground)} ${stringify(contentClasses)}`,
        style: `z-index: ${stringify(zIndex)};`
      },
      null
    )}>`;
    content?.($$payload);
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span>`;
  pop();
}

export { Tooltip as T };
//# sourceMappingURL=Tooltip-Li45R7zs.js.map
