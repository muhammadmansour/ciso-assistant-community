import { p as push, M as store_get, ac as store_mutate, W as ensure_array_like, S as attr_class, X as stringify, V as escape_html, U as clsx, Q as unsubscribe_stores, R as bind_props, a as pop, T as attr, ab as maybe_selected, Y as spread_props, _ as spread_attributes, Z as attr_style } from './index2-9icAqEyj.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './index3-BwfRm5YV.js';
import { Bm as objectsnotvisible2, sv as searchplaceholder1, rJ as show, Jv as entries, e as edit, Nv as _delete, t0 as rowcount1, Cl as noentriesfound2, zu as previous, CH as next, I5 as filters, nT as view, Z6 as accept, cO as islocked1, Lw as deleteusermessage2, Mz as deletemodalmessage2, My as deletemodaltitle2, kQ as yes, Pl as confirmyes1, Pk as confirmyesplaceholder3, bp as cancel, kH as submit, Hf as graph } from './_index-DZs3gE-i.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { A as Anchor } from './Anchor-L6GP3zar.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { I as ISO_8601_REGEX } from './constants-B8vm30bZ.js';
import { l as listViewFields, U as URL_MODEL_MAP, d as getFieldComponentMap, c as getListViewFields, t as tableSourceMapper, M as MenuRootState, e as boxWith, n as noop, f as MenuMenuState, F as Floating_layer, i as contextMenuActions, j as useId, C as ContextMenuTriggerState, m as mergeProps, k as Floating_layer_anchor, o as MenuContentState, P as Popper_layer_force_mount, p as Popper_layer, q as getFloatingContentCSSVars, r as CONTEXT_MENU_TRIGGER_ATTR, s as Menu_separator, v as Menu_item, w as CUSTOM_ACTIONS_COMPONENT } from './crud-BJ_TECqM.js';
import { s as safeTranslate, u as unsafeTranslate, t as toCamelCase } from './i18n-MfjzxjGF.js';
import { F as Form, S as SuperDebug } from './Form-s4NDhsV8.js';
import { g as goto } from './breadcrumbs-CnPDyFos.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { b as isDark } from './helpers-Bm9n0CNG.js';
import { c as countMasked, i as isMaskedPlaceholder } from './related-visibility-ukSq_O7b.js';
import { g as getLocale } from './runtime-B_ICGJZJ.js';
import { w as writable, g as get, d as derived } from './index-CRjgakYW.js';
import { t as tableStates, e as tableHandlers } from './stores-CMqbeBUT.js';
import { c as arrayType, s as stringType, o as objectType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import { D as DeleteConfirmModal } from './DeleteConfirmModal-KBvf9zHE.js';

class EventHandler {
  events = {
    change: [],
    clearFilters: [],
    clearSearch: []
  };
  triggerChange = writable(0);
  // legacy
  add(event, callback) {
    this.events[event].push(callback);
  }
  trigger(event) {
    for (const callback of this.events[event]) {
      callback();
    }
    if (event === "change") {
      this.triggerChange.update((store) => {
        return store + 1;
      });
    }
  }
}
class Context {
  totalRows;
  rowsPerPage;
  pageNumber;
  event;
  search;
  filters;
  rows;
  rowCount;
  pages;
  pagesWithEllipsis;
  pageCount;
  sort;
  selected;
  isAllSelected;
  selectedCount;
  selectBy;
  constructor(data, params) {
    this.totalRows = writable(params.totalRows);
    this.rowsPerPage = writable(params.rowsPerPage);
    this.pageNumber = writable(1);
    this.event = new EventHandler();
    this.search = writable("");
    this.filters = writable([]);
    this.rows = writable(data);
    this.rowCount = this.createRowCount();
    this.pages = this.createPages();
    this.pagesWithEllipsis = this.createPagesWithEllipsis();
    this.pageCount = this.createPageCount();
    this.sort = writable(void 0);
    this.selected = writable([]);
    this.isAllSelected = this.createIsAllSelected();
    this.selectedCount = this.createSelectedCount();
    this.selectBy = params.selectBy ?? void 0;
  }
  getState() {
    const pageNumber = get(this.pageNumber);
    const rowsPerPage = get(this.rowsPerPage);
    const sort = get(this.sort);
    const filters2 = get(this.filters);
    return {
      pageNumber,
      rowsPerPage,
      offset: rowsPerPage * (pageNumber - 1),
      search: get(this.search),
      sorted: sort ?? void 0,
      sort: sort ?? void 0,
      filters: filters2.length > 0 ? filters2 : void 0,
      setTotalRows: (value) => this.totalRows.set(value)
    };
  }
  createPages() {
    return derived([this.rowsPerPage, this.totalRows], ([$rowsPerPage, $totalRows]) => {
      if (!$rowsPerPage || !$totalRows) {
        return void 0;
      }
      const pages = Array.from(Array(Math.ceil($totalRows / $rowsPerPage)));
      return pages.map((_, i) => {
        return i + 1;
      });
    });
  }
  createPagesWithEllipsis() {
    return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
      if (!$pages) {
        return void 0;
      }
      if ($pages.length <= 7) {
        return $pages;
      }
      const ellipse = null;
      const firstPage = 1;
      const lastPage = $pages.length;
      if ($pageNumber <= 4) {
        return [
          ...$pages.slice(0, 5),
          ellipse,
          lastPage
        ];
      } else if ($pageNumber < $pages.length - 3) {
        return [
          firstPage,
          ellipse,
          ...$pages.slice($pageNumber - 2, $pageNumber + 1),
          ellipse,
          lastPage
        ];
      } else {
        return [
          firstPage,
          ellipse,
          ...$pages.slice($pages.length - 5, $pages.length)
        ];
      }
    });
  }
  createPageCount() {
    return derived(this.pages, ($pages) => {
      if (!$pages)
        return void 0;
      return $pages.length;
    });
  }
  createRowCount() {
    return derived([this.totalRows, this.pageNumber, this.rowsPerPage], ([$totalRows, $pageNumber, $rowsPerPage]) => {
      if (!$rowsPerPage || !$totalRows) {
        return void 0;
      }
      return {
        total: $totalRows,
        start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
        end: Math.min($pageNumber * $rowsPerPage, $totalRows)
      };
    });
  }
  createIsAllSelected() {
    return derived([this.selected, this.rows], ([$selected, $rows]) => {
      if ($rows.length === 0) {
        return false;
      }
      if (this.selectBy) {
        const ids = $rows.map((row) => row[this.selectBy]);
        return ids.every((id) => $selected.includes(id));
      }
      return $rows.every((row) => $selected.includes(row));
    });
  }
  createSelectedCount() {
    return derived([this.selected, this.totalRows], ([$selected, $totalRows]) => {
      return {
        count: $selected.length,
        total: $totalRows
      };
    });
  }
}
class TriggerHandler {
  context;
  reload;
  constructor(context) {
    this.context = context;
  }
  set(callback) {
    this.reload = callback;
  }
  async invalidate() {
    if (!this.reload)
      return;
    const state = this.context.getState();
    const data = await this.reload(state);
    if (data) {
      this.context.rows.set(data);
    }
  }
}
class SortHandler {
  event;
  hasMultipleSort;
  sort;
  constructor(context) {
    this.event = context.event;
    this.hasMultipleSort = false;
    this.sort = context.sort;
  }
  set(orderBy = null) {
    if (!orderBy)
      return;
    const sort = get(this.sort);
    if (!sort || sort.orderBy !== orderBy) {
      this.asc(orderBy);
    } else if (sort.direction === "asc") {
      this.desc(sort.orderBy);
    } else if (sort.direction === "desc") {
      this.asc(orderBy);
    }
  }
  asc(orderBy) {
    if (!orderBy)
      return;
    this.sort.set({ orderBy, direction: "asc" });
    this.event.trigger("change");
  }
  desc(orderBy) {
    if (!orderBy)
      return;
    this.sort.set({ orderBy, direction: "desc" });
    this.event.trigger("change");
  }
  apply(params = null) {
    if (params) {
      switch (params.direction) {
        case "asc":
          return this.asc(params.orderBy);
        case "desc":
          return this.desc(params.orderBy);
        default:
          return this.set(params.orderBy);
      }
    }
    const sort = get(this.sort);
    if (sort) {
      return this.apply({ orderBy: sort.orderBy, direction: sort.direction });
    }
    return;
  }
}
class SelectHandler {
  rows;
  selected;
  isAllSelected;
  selectBy;
  constructor(context) {
    this.rows = context.rows;
    this.selected = context.selected;
    this.isAllSelected = context.isAllSelected;
    this.selectBy = context.selectBy;
  }
  set(value) {
    const selected = get(this.selected);
    if (selected.includes(value)) {
      this.selected.set(selected.filter((item) => item !== value));
    } else {
      this.selected.set([value, ...selected]);
    }
  }
  all() {
    const rows = get(this.rows);
    const isAllSelected = get(this.isAllSelected);
    this.selected.update((store) => {
      if (this.selectBy) {
        return store = store.filter((item) => !rows.map((row) => row[this.selectBy]).includes(item));
      }
      return store = store.filter((item) => !rows.includes(item));
    });
    if (!isAllSelected) {
      this.selected.update((store) => {
        if (this.selectBy) {
          store = [...rows.map((row) => row[this.selectBy]), ...store];
        } else {
          store = [...rows, ...store];
        }
        return store;
      });
    }
  }
  clear() {
    this.selected.set([]);
  }
}
class PageHandler {
  totalRows;
  pageNumber;
  rowCount;
  rowsPerPage;
  event;
  pages;
  selected;
  constructor(context) {
    this.totalRows = context.totalRows;
    this.pageNumber = context.pageNumber;
    this.rowCount = context.rowCount;
    this.rowsPerPage = context.rowsPerPage;
    this.event = context.event;
    this.pages = context.pages;
    this.selected = context.selected;
  }
  get() {
    return this.pages;
  }
  goto(number) {
    const rowsPerPage = get(this.rowsPerPage);
    const totalRows = get(this.totalRows);
    this.pageNumber.update((store) => {
      if (rowsPerPage && totalRows) {
        if (number >= 1 && number <= Math.ceil(totalRows / rowsPerPage)) {
          store = number;
          this.event.trigger("change");
        }
        return store;
      } else {
        if (number >= 1) {
          store = number;
          this.event.trigger("change");
        }
        return store;
      }
    });
  }
  previous() {
    const number = get(this.pageNumber) - 1;
    this.goto(number);
  }
  next() {
    const number = get(this.pageNumber) + 1;
    this.goto(number);
  }
}
class SearchHandler {
  search;
  constructor(context) {
    this.search = context.search;
  }
  set(value) {
    this.search.set(value ?? null);
  }
  remove() {
    this.search.set(null);
  }
}
class FilterHandler {
  filters;
  constructor(context) {
    this.filters = context.filters;
  }
  set(value, filterBy) {
    const filter = { filterBy, value };
    this.filters.update((store) => {
      store = store.filter((item) => {
        return item.filterBy !== filterBy && item.value;
      });
      if (value) {
        store.push(filter);
      }
      return store;
    });
  }
  remove() {
    this.filters.set([]);
  }
}
class DataHandler {
  context;
  triggerHandler;
  sortHandler;
  selectHandler;
  pageHandler;
  searchHandler;
  filterHandler;
  i18n;
  constructor(data = [], params = { rowsPerPage: 5 }) {
    this.i18n = this.translate(params.i18n);
    this.context = new Context(data, params);
    this.triggerHandler = new TriggerHandler(this.context);
    this.sortHandler = new SortHandler(this.context);
    this.selectHandler = new SelectHandler(this.context);
    this.pageHandler = new PageHandler(this.context);
    this.searchHandler = new SearchHandler(this.context);
    this.filterHandler = new FilterHandler(this.context);
  }
  onChange(callback) {
    this.triggerHandler.set(callback);
  }
  invalidate() {
    this.triggerHandler.invalidate();
  }
  setRows(data) {
    this.context.rows.set(data);
  }
  setTotalRows(value) {
    this.context.totalRows.set(value);
  }
  getRows() {
    return this.context.rows;
  }
  select(value) {
    this.selectHandler.set(value);
  }
  getSelected() {
    return this.context.selected;
  }
  selectAll() {
    this.selectHandler.all();
  }
  isAllSelected() {
    return this.context.isAllSelected;
  }
  getSelectedCount() {
    return this.context.selectedCount;
  }
  clearSelection() {
    this.selectHandler.clear();
  }
  getRowsPerPage() {
    return this.context.rowsPerPage;
  }
  sort(orderBy) {
    this.setPage(1);
    this.sortHandler.set(orderBy);
  }
  applySort(params = null) {
    this.sortHandler.apply(params);
  }
  sortAsc(orderBy) {
    this.setPage(1);
    this.sortHandler.asc(orderBy);
  }
  sortDesc(orderBy) {
    this.setPage(1);
    this.sortHandler.desc(orderBy);
  }
  getSort() {
    return this.context.sort;
  }
  search(value) {
    this.setPage(1);
    this.context.search.set(value);
  }
  clearSearch() {
    this.searchHandler.remove();
  }
  filter(value, filterBy) {
    this.setPage(1);
    return this.filterHandler.set(value, filterBy);
  }
  clearFilters() {
    this.filterHandler.remove();
  }
  getPages(params = { ellipsis: false }) {
    if (params.ellipsis) {
      return this.context.pagesWithEllipsis;
    }
    return this.context.pages;
  }
  getPageCount() {
    return this.context.pageCount;
  }
  getPageNumber() {
    return this.context.pageNumber;
  }
  setPage(value) {
    switch (value) {
      case "previous":
        return this.pageHandler.previous();
      case "next":
        return this.pageHandler.next();
      default:
        return this.pageHandler.goto(value);
    }
  }
  getRowCount() {
    return this.context.rowCount;
  }
  on(event, callback) {
    this.context.event.add(event, callback);
  }
  translate(i18n) {
    return {
      ...{
        search: "Search...",
        show: "Show",
        entries: "entries",
        filter: "Filter",
        rowCount: "Showing {start} to {end} of {total} entries",
        noRows: "No entries found",
        previous: "Previous",
        next: "Next",
        selectedCount: "{count} of {total} row(s)."
      },
      ...i18n
    };
  }
  /**
   *
   * @depracted use on('change', callback) instead
   */
  getTriggerChange() {
    return this.context.event.triggerChange;
  }
  /**
   *
   * @deprecated use applySort() instead
   */
  applySorting(params = null) {
    this.applySort(params);
  }
  /**
   *
   * @deprecated use getSort() instead
   */
  getSorted() {
    return this.getSort();
  }
}
function defaults(data, adapter, options) {
  if (data && "superFormValidationLibrary" in data) {
    options = adapter;
    adapter = data;
    data = null;
  }
  const validator = adapter;
  const optionDefaults = options?.defaults ?? validator.defaults;
  return {
    id: options?.id ?? validator.id ?? "",
    valid: false,
    posted: false,
    errors: {},
    data: { ...optionDefaults, ...data },
    constraints: validator.constraints,
    shape: validator.shape
  };
}
function Context_menu($$payload, $$props) {
  push();
  let {
    open = false,
    dir = "ltr",
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    children
  } = $$props;
  const root = MenuRootState.create({
    variant: boxWith(() => "context-menu"),
    dir: boxWith(() => dir),
    onClose: () => {
      open = false;
      onOpenChange?.(false);
    }
  });
  MenuMenuState.create(
    {
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    },
    root
  );
  Floating_layer($$payload, {
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    }
  });
  bind_props($$props, { open });
  pop();
}
function Context_menu_content($$payload, $$props) {
  push();
  let {
    id = useId(),
    child,
    children,
    ref = null,
    loop = true,
    onInteractOutside = noop,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    preventScroll = true,
    side = "right",
    sideOffset = 2,
    align = "start",
    // we need to explicitly pass this prop to the PopperLayer to override
    // the default menu behavior of handling outside interactions on the trigger
    onEscapeKeydown = noop,
    forceMount = false,
    trapFocus = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = MenuContentState.create({
    id: boxWith(() => id),
    loop: boxWith(() => loop),
    ref: boxWith(() => ref, (v) => ref = v),
    onCloseAutoFocus: boxWith(() => onCloseAutoFocus)
  });
  const mergedProps = mergeProps(restProps, contentState.props, {
    side,
    sideOffset,
    align,
    onOpenAutoFocus,
    isValidEvent,
    trapFocus,
    loop,
    id,
    ref: contentState.opts.ref,
    preventScroll,
    onInteractOutside: handleInteractOutside,
    onEscapeKeydown: handleEscapeKeydown,
    shouldRender: contentState.shouldRender
  });
  function handleInteractOutside(e) {
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    if (e.target && e.target instanceof Element) {
      const subContentSelector = `[${contentState.parentMenu.root.getBitsAttr("sub-content")}]`;
      if (e.target.closest(subContentSelector)) return;
    }
    contentState.parentMenu.onClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.parentMenu.onClose();
  }
  function isValidEvent(e) {
    if ("button" in e && e.button === 2) {
      const target = e.target;
      if (!target) return false;
      const isAnotherContextTrigger = target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`) !== contentState.parentMenu.triggerNode;
      return isAnotherContextTrigger;
    }
    return false;
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("context-menu")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
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
        contentState.popperProps,
        {
          enabled: contentState.parentMenu.opts.open.current,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else if (!forceMount) {
    $$payload.out += "<!--[1-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("context-menu")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
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
        contentState.popperProps,
        {
          open: contentState.parentMenu.opts.open.current,
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
function Context_menu_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = ContextMenuTriggerState.create({
    id: boxWith(() => id),
    disabled: boxWith(() => disabled),
    ref: boxWith(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { style: { pointerEvents: "auto" } }, {
    style: restProps.style,
    tabindex: restProps.tabindex
  });
  $$payload.out += `<!---->`;
  Floating_layer_anchor($$payload, {
    id,
    virtualEl: triggerState.virtualElement,
    ref: triggerState.opts.ref,
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
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function PromptConfirmModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  const cBase = "card bg-white p-6 w-modal space-y-6";
  const cHeader = "text-xl font-medium text-gray-900";
  const cForm = "space-y-4";
  let {
    parent,
    _form = {},
    URLModel = "",
    id = "",
    formAction = "",
    bodyComponent,
    bodyProps = {},
    debug = false
  } = $$props;
  const sf = _form && Object.keys(_form).length ? superForm(_form, {
    dataType: "json",
    id: `confirm-modal-form-${crypto.randomUUID()}`
  }) : null;
  let userInput = "";
  yes().toLowerCase();
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)} role="dialog" aria-modal="true"><header${attr_class(clsx(cHeader))}>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> <article>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body ?? "(body missing)")}</article> `;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-sm text-gray-500">Loading...</div>`;
    }
    $$payload.out += `<!--]--> <div><p class="text-sm font-medium text-red-600 mb-2">${escape_html(confirmyes1())}</p> <input type="text" data-testid="delete-prompt-confirm-textfield"${attr("value", userInput)}${attr("placeholder", confirmyesplaceholder3())} class="w-full px-3 py-2 text-sm border border-surface-300 focus:outline-none focus:ring"${attr("aria-label", confirmyes1())}/></div> `;
    if (sf) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<form method="POST"${attr("action", formAction)}${attr_class(`modal-form ${stringify(cForm)}`)}><footer class="flex gap-3 justify-end pt-4 border-t border-gray-200"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">${escape_html(cancel())}</button> <input type="hidden" name="urlmodel"${attr("value", URLModel)}/> <input type="hidden" name="id"${attr("value", id)}/> <button class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" data-testid="delete-prompt-confirm-button"${attr("disabled", true, true)}>${escape_html(submit())}</button></footer></form> `;
      if (debug === true) {
        $$payload.out += "<!--[-->";
        SuperDebug($$payload, { data: sf?.form });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<footer class="flex gap-3 justify-end pt-4 border-t border-gray-200"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">${escape_html(cancel())}</button> <button class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed" type="button"${attr("disabled", true, true)}>${escape_html(submit())}</button></footer>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function TableRowActions($$payload, $$props) {
  push();
  getModalStore();
  let {
    row,
    model = void 0,
    detailURL,
    editURL,
    disableEdit = false,
    disableView = false,
    deleteForm = null,
    URLModel,
    identifierField = "id",
    preventDelete = false,
    preventEdit = false,
    baseClass = "space-x-2 whitespace-nowrap flex flex-row items-center text-base text-gray-400 justify-end",
    hasBody = false,
    head,
    body,
    tail
  } = $$props;
  const user = page.data.user;
  let canDeleteObject = !preventDelete && (model ? page.params.id ? canPerformAction({
    user,
    action: "delete",
    model: model.name,
    domain: model.name === "folder" ? row.meta.id : row.meta.folder?.id ?? row.meta.folder ?? user.root_folder_id
  }) : Object.hasOwn(user.permissions, `delete_${model.name}`) : false);
  let canEditObject = !preventEdit && (model ? page.params.id ? canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: model.name === "folder" ? row.meta.id : row.meta.folder?.id ?? row.meta.folder ?? user.root_folder_id
  }) : Object.hasOwn(user.permissions, `change_${model.name}`) : false);
  let displayDetail = detailURL && !disableView;
  let displayEdit = canEditObject && !disableEdit && URLModel && !["frameworks", "risk-matrices", "ebios-rm"].includes(URLModel) && editURL;
  let displayDelete = canDeleteObject && deleteForm !== null;
  $$payload.out += `<span${attr_class(clsx(baseClass))}>`;
  head?.($$payload);
  $$payload.out += `<!----> `;
  body?.($$payload);
  $$payload.out += `<!----> `;
  if (!hasBody) {
    $$payload.out += "<!--[-->";
    if (displayDetail) {
      $$payload.out += "<!--[-->";
      Anchor($$payload, {
        breadcrumbAction: "push",
        href: detailURL,
        class: "unstyled cursor-pointer text-gray-400 hover:text-blue-600 transition-colors",
        "data-testid": "tablerow-detail-button",
        children: ($$payload2) => {
          $$payload2.out += `<i class="fa-solid fa-eye"></i>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (URLModel === "operating-modes") {
      $$payload.out += "<!--[-->";
      Anchor($$payload, {
        breadcrumbAction: "push",
        label: graph(),
        href: `/operating-modes/${row.meta.id}/graph/`,
        stopPropagation: true,
        class: "unstyled cursor-pointer text-gray-400 hover:text-blue-600 transition-colors",
        "data-testid": "tablerow-edit-button",
        children: ($$payload2) => {
          $$payload2.out += `<i class="fa-solid fa-project-diagram"></i>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (displayEdit) {
      $$payload.out += "<!--[-->";
      Anchor($$payload, {
        breadcrumbAction: "push",
        label: edit(),
        href: editURL,
        stopPropagation: true,
        class: "unstyled cursor-pointer text-gray-400 hover:text-blue-600 transition-colors",
        "data-testid": "tablerow-edit-button",
        children: ($$payload2) => {
          $$payload2.out += `<i class="fa-solid fa-pen-to-square"></i>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (displayDelete) {
      $$payload.out += "<!--[-->";
      if (URLModel === "folders") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"${attr("aria-label", _delete())} data-testid="tablerow-delete-button"><i class="fa-solid fa-trash"></i></button>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<button class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"${attr("aria-label", _delete())} data-testid="tablerow-delete-button"><i class="fa-solid fa-trash"></i></button>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  tail?.($$payload);
  $$payload.out += `<!----></span>`;
  pop();
}
const loadTableData = async ({
  state,
  URLModel,
  endpoint,
  fields,
  featureFlags = {}
}) => {
  const url = new URL(endpoint, window.location.origin);
  const params = new URLSearchParams(url.search);
  const newParams = getParams(state);
  newParams.forEach((value, key) => params.append(key, value));
  url.search = params.toString();
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`[loadTableData] ${URLModel} fetch failed: ${res.status} ${res.statusText}`);
    state.setTotalRows(0);
    return [];
  }
  const response = await res.json();
  state.setTotalRows(response.count ?? 0);
  const baseFields = getListViewFields({ key: URLModel, featureFlags });
  const fieldsToUse = fields?.head && fields.head.length > 0 && fields.head.toString() !== baseFields.head.toString() ? {
    ...baseFields,
    head: fields.head,
    body: fields.body.length > 0 ? fields.body : fields.head
  } : baseFields;
  const bodyData = tableSourceMapper(response.results ?? [], fieldsToUse.body);
  fieldsToUse.body.reduce((obj, key, index) => {
    obj[key] = fieldsToUse.head[index];
    return obj;
  }, {});
  const table = {
    body: bodyData,
    meta: response
    // metaData
  };
  return table.body.map((item, index) => {
    return { ...item, meta: table?.meta?.results ? { ...table.meta.results[index] } : void 0 };
  });
};
const getParams = ({ offset, rowsPerPage, search, sort, filters: filters2 }) => {
  const params = new URLSearchParams();
  params.set("offset", offset.toString() ?? "0");
  params.set("limit", rowsPerPage.toString() ?? "10");
  if (search) {
    params.set("search", search);
  }
  if (sort) {
    params.set("ordering", `${sort.direction === "desc" ? "-" : ""}${sort.orderBy}`);
  }
  if (filters2) {
    for (const filter of filters2) {
      const filterKey = filter.filterBy.toString();
      if (Array.isArray(filter.value)) {
        for (const val of filter.value) {
          params.append(filterKey, val.toString());
        }
      } else if (filter.value) {
        params.append(filterKey, filter.value.toString());
      }
    }
  }
  return params;
};
function Pagination($$payload, $$props) {
  push();
  var $$store_subs;
  let { handler, URLModel } = $$props;
  const pageNumber = handler.getPageNumber();
  handler.getRowsPerPage();
  const pageCount = handler.getPageCount();
  const pages = handler.getPages({ ellipsis: true });
  $$payload.out += `<section class="flex"><button type="button"${attr_class("svelte-1e29dy0", void 0, {
    "disabled": store_get($$store_subs ??= {}, "$pageNumber", pageNumber) === 1
  })}>${escape_html(previous())}</button> `;
  if (store_get($$store_subs ??= {}, "$pages", pages) === void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button type="button" class="svelte-1e29dy0">${escape_html(store_get($$store_subs ??= {}, "$pageNumber", pageNumber))}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$pages", pages));
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let page2 = each_array[$$index];
      $$payload.out += `<button type="button"${attr_class("svelte-1e29dy0", void 0, {
        "active": store_get($$store_subs ??= {}, "$pageNumber", pageNumber) === page2,
        "ellipse": page2 === null
      })}>${escape_html(page2 ?? "...")}</button>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <button type="button"${attr_class("svelte-1e29dy0", void 0, {
    "disabled": store_get($$store_subs ??= {}, "$pageNumber", pageNumber) === store_get($$store_subs ??= {}, "$pageCount", pageCount)
  })}>${escape_html(next())}</button></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function RowCount($$payload, $$props) {
  push();
  var $$store_subs;
  let { handler } = $$props;
  const rowCount = handler.getRowCount();
  if (store_get($$store_subs ??= {}, "$rowCount", rowCount) === void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<aside class="text-sm text-gray-500" data-testid="row-count">`;
    if (store_get($$store_subs ??= {}, "$rowCount", rowCount)?.total > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(rowcount1({
        start: store_get($$store_subs ??= {}, "$rowCount", rowCount).start,
        end: store_get($$store_subs ??= {}, "$rowCount", rowCount).end,
        total: store_get($$store_subs ??= {}, "$rowCount", rowCount).total
      }))}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(noentriesfound2())}`;
    }
    $$payload.out += `<!--]--></aside>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function RowsPerPage($$payload, $$props) {
  push();
  var $$store_subs;
  let { handler } = $$props;
  handler.getPageNumber();
  const rowsPerPage = handler.getRowsPerPage();
  handler.getRowCount();
  store_get($$store_subs ??= {}, "$rowsPerPage", rowsPerPage) ?? store_get($$store_subs ??= {}, "$tableStates", tableStates)[page.url.pathname]?.rowsPerPage ?? 10;
  const options = [5, 10, 20, 50, 100];
  const each_array = ensure_array_like(options);
  $$payload.out += `<aside class="flex items-center text-sm text-gray-500">${escape_html(show())} <select class="bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 w-[80px] mx-2 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">`;
  $$payload.select_value = store_get($$store_subs ??= {}, "$rowsPerPage", rowsPerPage);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let option = each_array[$$index];
    $$payload.out += `<option${attr("value", option)}${maybe_selected($$payload, option)}>${escape_html(option)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> ${escape_html(entries())}</aside>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Search($$payload, $$props) {
  push();
  let { handler, initialValue = "" } = $$props;
  let value = initialValue;
  if (initialValue) {
    handler.search(initialValue);
  }
  $$payload.out += `<div class="relative max-w-sm"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i> <input class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"${attr("placeholder", searchplaceholder1())} data-testid="search-input" id="search-input" type="search"${attr("value", value)}/></div>`;
  pop();
}
function Th($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    handler,
    orderBy = "",
    _class = "cursor-pointer select-none ",
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  _class += rest.class;
  const identifier = orderBy?.toString();
  const sort = handler.getSort();
  let isActive = store_get($$store_subs ??= {}, "$sort", sort)?.orderBy === identifier;
  $$payload.out += `<th${attr_class(`${stringify(_class)} hover:text-black`, "svelte-fpdnhw", { "active": isActive })} data-testid="tableheader" role="columnheader"${attr("aria-sort", store_get($$store_subs ??= {}, "$sort", sort)?.orderBy === identifier ? store_get($$store_subs ??= {}, "$sort", sort)?.direction === "asc" ? "ascending" : "descending" : "none")}><div class="flex items-center h-full">`;
  children?.($$payload);
  $$payload.out += `<!----> <span${attr_class("pl-2 before:border-b-surface-200 before:mt-0.5 after:border-t-surface-200 after:mt-0.5 svelte-fpdnhw", void 0, {
    "asc": store_get($$store_subs ??= {}, "$sort", sort)?.direction === "asc",
    "desc": store_get($$store_subs ??= {}, "$sort", sort)?.direction === "desc"
  })} aria-hidden="true">`;
  if (isActive && store_get($$store_subs ??= {}, "$sort", sort)?.direction === "asc") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="fa-solid fa-sort-up"></i>`;
  } else if (isActive && store_get($$store_subs ??= {}, "$sort", sort)?.direction === "desc") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<i class="fa-solid fa-sort-down"></i>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span></div></th>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function ThFilter($$payload, $$props) {
  push();
  let { filterBy = "" } = $$props;
  let value = "";
  let classProp = "";
  $$payload.out += `<th${attr_class(`${stringify(classProp)} py-0!`)}><input type="text" class="input variant-form-material placeholder:text-xs bg-transparent p-0"${attr("placeholder", `Filter ${stringify(filterBy)}...`)}${attr("aria-label", `Filter by ${stringify(filterBy)}`)} role="searchbox"${attr("value", value)}/></th>`;
  pop();
}
function ModelTable($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    source = { head: [], body: [] },
    interactive = true,
    search = true,
    thFilter = false,
    thFilterFields = [],
    rowsPerPage = true,
    rowCount = true,
    pagination = true,
    numberRowsPerPage = store_get($$store_subs ??= {}, "$tableStates", tableStates)[page.url.pathname]?.rowsPerPage ?? 10,
    orderBy = void 0,
    element = "table",
    text = "text-sm",
    backgroundColor = "bg-white",
    color = "text-gray-700",
    regionHead = "",
    regionHeadCell = "text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50",
    regionBody = "bg-white",
    regionCell = "max-w-[65ch] max-h-[8em] overflow-hidden hover:overflow-y-auto",
    regionFoot = "",
    regionFootCell = "",
    displayActions = true,
    disableCreate = false,
    disableEdit = false,
    disableDelete = false,
    disableView = false,
    identifierField = "id",
    deleteForm = void 0,
    URLModel = void 0,
    baseEndpoint = `/${URLModel}`,
    detailQueryParameter = void 0,
    fields = [],
    canSelectObject = false,
    overrideFilters = {},
    defaultFilters = {},
    hideFilters = false,
    initialSearchValue = "",
    tableFilters = URLModel && listViewFields[URLModel] && Object.hasOwn(listViewFields[URLModel], "filters") ? listViewFields[URLModel].filters : {},
    folderId = "",
    forcePreventDelete = false,
    forcePreventEdit = false,
    expectedCount = void 0,
    onFilterChange = () => {
    },
    quickFilters,
    optButton,
    selectButton,
    addButton,
    badge,
    actions,
    actionsBody,
    actionsHead,
    tail
  } = $$props;
  const modalStore = getModalStore();
  let model = URL_MODEL_MAP[URLModel];
  const tableSource = Object.keys(source.head).filter((key) => !(model?.flaggedFields && Object.hasOwn(model.flaggedFields, key) && Object.hasOwn(page.data?.featureflags, model.flaggedFields[key]) && page.data?.featureflags[model.flaggedFields[key]] === false)).reduce(
    (acc, key) => {
      acc.head[key] = source.head[key];
      return acc;
    },
    {
      head: {},
      body: source.body,
      meta: source.meta
    }
  );
  detailQueryParameter = detailQueryParameter ? `?${detailQueryParameter}` : "";
  const user = page.data.user;
  const isRelatedField = (fieldName) => relatedFieldNames.has(fieldName);
  let classesBase = `${backgroundColor}`;
  let classesTable = `${element} ${text} ${color}`;
  const handler = new DataHandler(
    tableSource.body.map((item, index) => {
      return {
        ...item,
        meta: tableSource.meta ? tableSource.meta.results ? { ...tableSource.meta.results[index] } : { ...tableSource.meta[index] } : void 0
      };
    }),
    {
      rowsPerPage: pagination ? store_get($$store_subs ??= {}, "$tableStates", tableStates)[page.url.pathname]?.rowsPerPage ?? numberRowsPerPage : 0,
      totalRows: source?.meta?.count
    }
  );
  const rows = handler.getRows();
  const relatedFieldNames = new Set(model?.foreignKeyFields?.map((field) => field.field) ?? []);
  const hiddenRowCount = typeof expectedCount === "number" ? expectedCount : 0;
  store_mutate($$store_subs ??= {}, "$tableHandlers", tableHandlers, store_get($$store_subs ??= {}, "$tableHandlers", tableHandlers)[baseEndpoint] = handler);
  handler.onChange((state) => loadTableData({
    state,
    URLModel,
    endpoint: baseEndpoint,
    fields: fields.length > 0 ? { head: fields, body: fields } : {
      head: typeof tableSource.head[0] === "string" ? Object.values(tableSource.head) : Object.keys(tableSource.head),
      body: typeof tableSource.body[0] === "string" ? Object.values(tableSource.body) : Object.keys(tableSource.body)
    },
    featureFlags: page.data?.featureflags
  }));
  const actionsURLModel = URLModel;
  const preventDelete = (row) => actionsURLModel === "stored-libraries" && (row?.meta?.builtin || row?.meta?.is_loaded) || !URLModel?.includes("libraries") && Object.hasOwn(row?.meta, "urn") && row?.meta?.urn || URLModel?.includes("campaigns") && row?.meta?.compliance_assessments.length > 0 || Object.hasOwn(row?.meta, "reference_count") && row?.meta?.reference_count > 0 || ["severity_changed", "status_changed"].includes(row?.meta?.entry_type) || forcePreventDelete;
  const preventEdit = (row) => forcePreventEdit;
  let contextMenuOpenRow = void 0;
  const filters$1 = source?.filters ?? tableFilters;
  const filteredFields = Object.keys(filters$1);
  const filterValues = Object.fromEntries(filteredFields.map((field) => {
    const urlValues = page.url.searchParams.getAll(field).map((value) => ({ value }));
    const defaultValue = defaultFilters[field] || [];
    return [
      field,
      urlValues.length > 0 ? urlValues : defaultValue
    ];
  }));
  run(() => {
    hideFilters = hideFilters || !Object.entries(filters$1).some(([_, filter]) => !filter.hide);
  });
  const filterInitialData = {};
  for (const [key, value] of page.url.searchParams) {
    filterInitialData[key] ??= [];
    filterInitialData[key].push(value);
  }
  for (const field of filteredFields) {
    if (!filterInitialData[field] && filterValues[field]?.length > 0) {
      filterInitialData[field] = filterValues[field].map((v) => v.value);
    }
  }
  const zodFiltersObject = {};
  Object.keys(filters$1).forEach((k) => {
    zodFiltersObject[k] = arrayType(stringType()).optional().nullable();
  });
  const _form = superForm(defaults(filterInitialData, zod(objectType(zodFiltersObject))), {
    SPA: true,
    validators: zod(objectType(zodFiltersObject)),
    dataType: "json",
    invalidateAll: false,
    applyAction: false,
    resetForm: false,
    taintedMessage: false,
    validationMethod: "auto"
  });
  let fieldComponentMap = getFieldComponentMap(URLModel);
  let canCreateObject = model ? page.params.id ? canPerformAction({
    user,
    action: "add",
    model: model.name,
    domain: folderId || page.data?.data?.folder?.id || page.data?.data?.folder || page.params.id || user.root_folder_id
  }) : Object.hasOwn(user.permissions, `add_${model.name}`) : false;
  let contextMenuCanEditObject = (model ? page.params.id ? canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: model.name === "folder" ? contextMenuOpenRow?.meta.id : user.root_folder_id
  }) : Object.hasOwn(user.permissions, `change_${model.name}`) : false) && true;
  let contextMenuDisplayEdit = contextMenuCanEditObject && URLModel && !["frameworks", "risk-matrices", "ebios-rm"].includes(URLModel);
  let contextMenuCanDeleteObject = !preventDelete({ meta: [] }) && (model ? page.params.id ? canPerformAction({
    user,
    action: "delete",
    model: model.name,
    domain: model.name === "folder" ? contextMenuOpenRow?.meta.id : user.root_folder_id
  }) : Object.hasOwn(user.permissions, `delete_${model.name}`) : false);
  let contextMenuDisplayDelete = contextMenuCanDeleteObject && deleteForm !== void 0;
  function contextMenuModalConfirmDelete(id, row) {
    const modalComponent = {
      ref: DeleteConfirmModal,
      props: {
        _form: deleteForm,
        id,
        debug: false,
        URLModel
      }
    };
    const name = URLModel === "users" && row.first_name ? `${row.first_name} ${row.last_name} (${row.email})` : row.name ?? row.meta?.str ?? Object.values(row)[0];
    const body = URLModel === "users" ? deleteusermessage2({ name }) : deletemodalmessage2({ name });
    const modal = {
      type: "component",
      component: modalComponent,
      title: deletemodaltitle2(),
      body
    };
    modalStore.trigger(modal);
  }
  function contextMenuPromptModalConfirmDelete(id, row) {
    const modalComponent = {
      ref: PromptConfirmModal,
      props: {
        _form: deleteForm,
        id,
        debug: false,
        URLModel,
        formAction: "?/delete"
      }
    };
    const name = URLModel === "users" && row.first_name ? `${row.first_name} ${row.last_name} (${row.email})` : row.name ?? Object.values(row)[0];
    const body = URLModel === "users" ? deleteusermessage2({ name }) : deletemodalmessage2({ name });
    const modal = {
      type: "component",
      component: modalComponent,
      title: deletemodaltitle2(),
      body
    };
    modalStore.trigger(modal);
  }
  let filterCount = filteredFields?.reduce((acc, field) => acc + filterValues?.[field]?.length, 0);
  let classesHexBackgroundText = (backgroundHexColor) => {
    return isDark(backgroundHexColor) ? "text-white" : "";
  };
  const tail_render = tail;
  const MULTI_VALUE_COLUMNS = [
    "owner",
    "filtering_labels",
    "linked_models",
    "threats",
    "assets",
    "applied_controls",
    "existing_applied_controls",
    "evidences",
    "qualifications",
    "user_groups"
  ];
  const isMultiValueColumn = (key) => {
    return MULTI_VALUE_COLUMNS.includes(key) || tableSource.body.length > 0 && Array.isArray(tableSource.body[0][key]);
  };
  const convertLinkedModelName = (snakeCaseName) => {
    const mapping = {
      compliance_assessments: "complianceAssessments",
      risk_assessments: "riskAssessments",
      business_impact_analysis: "businessImpactAnalysis",
      crq_studies: "quantitativeRiskStudies",
      ebios_studies: "ebiosRMStudies",
      entity_assessments: "entityAssessments",
      findings_assessments: "findingsAssessments",
      evidences: "evidences",
      security_exceptions: "securityExceptions",
      policies: "policies"
    };
    return mapping[snakeCaseName] || snakeCaseName;
  };
  let openState = false;
  const each_array_1 = ensure_array_like(Object.entries(tableSource.head));
  $$payload.out += `<div${attr_class(`table-wrap ${stringify(classesBase)} rounded-lg overflow-hidden`)}><header class="flex justify-between items-center space-x-8 p-3 border-b border-gray-100">`;
  if (!hideFilters) {
    $$payload.out += "<!--[-->";
    {
      let trigger = function($$payload2) {
        $$payload2.out += `<i class="fa-solid fa-filter mr-2"></i> ${escape_html(filters())} `;
        if (filterCount) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="text-sm">${escape_html(filterCount)}</span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }, content = function($$payload2) {
        {
          let children = function($$payload3, { form }) {
            const each_array = ensure_array_like(filteredFields);
            $$payload3.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let field = each_array[$$index];
              if (filters$1[field]?.component) {
                $$payload3.out += "<!--[-->";
                const FilterComponent = filters$1[field].component;
                $$payload3.out += `<!---->`;
                FilterComponent($$payload3, spread_props([
                  { form, field },
                  filters$1[field].props,
                  {
                    fieldContext: "filter",
                    label: safeTranslate(filters$1[field].props?.label),
                    onChange: (value) => {
                      const arrayValue = Array.isArray(value) ? value : [value];
                      const sanitizedArrayValue = arrayValue.filter((v) => v !== null && v !== void 0);
                      filterValues[field] = sanitizedArrayValue.map((v) => ({ value: v }));
                    }
                  }
                ]));
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            }
            $$payload3.out += `<!--]-->`;
          };
          Form($$payload2, {
            _form,
            validators: zod(objectType({})),
            children,
            $$slots: { default: true }
          });
        }
      };
      Popover($$payload, {
        open: openState,
        onOpenChange: (e) => openState = e.open,
        positioning: { placement: "bottom-start" },
        triggerBase: "btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm rounded-lg self-end relative",
        contentBase: "card p-3 bg-white max-w-lg shadow-xl space-y-2 border border-gray-200 rounded-xl",
        zIndex: "1000",
        autoFocus: false,
        onPointerDownOutside: () => openState = false,
        closeOnInteractOutside: false,
        trigger,
        content,
        $$slots: { trigger: true, content: true }
      });
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (search) {
    $$payload.out += "<!--[-->";
    Search($$payload, { handler, initialValue: initialSearchValue });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (pagination && rowsPerPage) {
    $$payload.out += "<!--[-->";
    RowsPerPage($$payload, { handler });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex space-x-2 items-center">`;
  optButton?.($$payload);
  $$payload.out += `<!----> `;
  if (canSelectObject) {
    $$payload.out += "<!--[-->";
    selectButton?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (canCreateObject && !disableCreate) {
    $$payload.out += "<!--[-->";
    addButton?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></header> `;
  quickFilters?.($$payload, filterValues, _form, () => {
  });
  $$payload.out += `<!----> `;
  if (hiddenRowCount > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mx-2 mb-2 rounded border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">${escape_html(objectsnotvisible2({ count: hiddenRowCount }))}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <table${attr_class(`table caption-bottom ${stringify(classesTable)}`, void 0, { "table-interactive": interactive })} role="grid"><thead${attr_class(`table-head ${stringify(regionHead)}`)}><tr><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let [key, heading] = each_array_1[$$index_1];
    if (fields.length === 0 || fields.includes(key)) {
      $$payload.out += "<!--[-->";
      Th($$payload, {
        handler,
        orderBy: isMultiValueColumn(key) ? void 0 : key,
        class: regionHeadCell,
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(safeTranslate(heading))}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if (displayActions) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<th${attr_class(`${stringify(regionHeadCell)} select-none text-end`)}></th>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></tr>`;
  if (thFilter) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(Object.entries(tableSource.head));
    $$payload.out += `<tr><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let [key, _] = each_array_2[$$index_2];
      if (thFilterFields.includes(key)) {
        $$payload.out += "<!--[-->";
        ThFilter($$payload, { filterBy: key });
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<th></th>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></tr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></thead><!---->`;
  Context_menu($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      {
        let child = function($$payload3, { props }) {
          const each_array_3 = ensure_array_like(store_get($$store_subs ??= {}, "$rows", rows));
          $$payload3.out += `<tbody${spread_attributes(
            {
              ...props,
              class: `w-full divide-y divide-gray-100 ${stringify(regionBody)}`
            },
            null
          )}><!--[-->`;
          for (let rowIndex = 0, $$length = each_array_3.length; rowIndex < $$length; rowIndex++) {
            let row = each_array_3[rowIndex];
            row?.meta ?? row;
            const each_array_4 = ensure_array_like(Object.entries(row));
            $$payload3.out += `<tr${attr("aria-rowindex", rowIndex + 1)} class="hover:bg-blue-50/50 even:bg-gray-50/30 cursor-pointer transition-colors duration-150"><!--[-->`;
            for (let $$index_5 = 0, $$length2 = each_array_4.length; $$index_5 < $$length2; $$index_5++) {
              let [key, value] = each_array_4[$$index_5];
              if (key !== "meta") {
                $$payload3.out += "<!--[-->";
                fieldComponentMap[key];
                $$payload3.out += `<td role="gridcell"><div${attr_class(clsx(regionCell))}>`;
                {
                  $$payload3.out += "<!--[!-->";
                  $$payload3.out += `<div data-testid="model-table-td-array-elem" class="base-font-family whitespace-pre-line break-words">`;
                  if (Array.isArray(value)) {
                    $$payload3.out += "<!--[-->";
                    const hiddenCount = isRelatedField(key) ? countMasked(value) : 0;
                    const visibleValues = isRelatedField(key) ? value.filter((item) => !isMaskedPlaceholder(item)) : value;
                    if (visibleValues.length > 0) {
                      $$payload3.out += "<!--[-->";
                      const each_array_5 = ensure_array_like([...visibleValues].sort((a, b) => {
                        if (!a.str && typeof a === "object" || !b.str && typeof b === "object") return 0;
                        return safeTranslate(a.str || a).localeCompare(safeTranslate(b.str || b));
                      }));
                      $$payload3.out += `<ul class="list-disc pl-4 whitespace-normal"><!--[-->`;
                      for (let $$index_3 = 0, $$length3 = each_array_5.length; $$index_3 < $$length3; $$index_3++) {
                        let val = each_array_5[$$index_3];
                        $$payload3.out += `<li>`;
                        if (key === "linked_models" && typeof val === "string") {
                          $$payload3.out += "<!--[-->";
                          $$payload3.out += `${escape_html(safeTranslate(convertLinkedModelName(val)))}`;
                        } else if (key === "security_objectives" || key === "security_capabilities") {
                          $$payload3.out += "<!--[1-->";
                          const [securityObjectiveName, securityObjectiveValue] = Object.entries(val)[0];
                          $$payload3.out += `${escape_html(safeTranslate(securityObjectiveName).toUpperCase())}: ${escape_html(securityObjectiveValue)}`;
                        } else if (val.str && val.id && key !== "qualifications" && key !== "relationship") {
                          $$payload3.out += "<!--[2-->";
                          const itemHref = `/${model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel || key.replace(/_/g, "-")}/${val.id}`;
                          Anchor($$payload3, {
                            href: itemHref,
                            class: "anchor",
                            stopPropagation: true,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(val.str)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else if (val.str) {
                          $$payload3.out += "<!--[3-->";
                          $$payload3.out += `${escape_html(safeTranslate(val.str))}`;
                        } else if (typeof val === "string" && val.includes(":") && unsafeTranslate(val.split(":")[0])) {
                          $$payload3.out += "<!--[4-->";
                          $$payload3.out += `<span class="text">${escape_html(unsafeTranslate(val.split(":")[0] + "Colon"))}
																					${escape_html(val.split(":")[1])}</span>`;
                        } else {
                          $$payload3.out += "<!--[!-->";
                          $$payload3.out += `${escape_html(val ?? "-")}`;
                        }
                        $$payload3.out += `<!--]--></li>`;
                      }
                      $$payload3.out += `<!--]--></ul> `;
                      if (hiddenCount > 0) {
                        $$payload3.out += "<!--[-->";
                        $$payload3.out += `<p class="mt-1 text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: hiddenCount }))}</p>`;
                      } else {
                        $$payload3.out += "<!--[!-->";
                      }
                      $$payload3.out += `<!--]-->`;
                    } else if (hiddenCount > 0) {
                      $$payload3.out += "<!--[1-->";
                      $$payload3.out += `<p class="text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: hiddenCount }))}</p>`;
                    } else {
                      $$payload3.out += "<!--[!-->";
                      $$payload3.out += `--`;
                    }
                    $$payload3.out += `<!--]-->`;
                  } else if (isMaskedPlaceholder(value)) {
                    $$payload3.out += "<!--[1-->";
                    if (isRelatedField(key)) {
                      $$payload3.out += "<!--[-->";
                      $$payload3.out += `<p class="text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: 1 }))}</p>`;
                    } else {
                      $$payload3.out += "<!--[!-->";
                      $$payload3.out += `--`;
                    }
                    $$payload3.out += `<!--]-->`;
                  } else if (value && value.str) {
                    $$payload3.out += "<!--[2-->";
                    if (value.id) {
                      $$payload3.out += "<!--[-->";
                      const itemHref = `/${model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel}/${value.id}`;
                      if (key === "ro_to_couple") {
                        $$payload3.out += "<!--[-->";
                        Anchor($$payload3, {
                          breadcrumbAction: "push",
                          href: itemHref,
                          class: "anchor",
                          children: ($$payload4) => {
                            $$payload4.out += `<!---->${escape_html(safeTranslate(toCamelCase(value.str.split(" - ")[0])))} - ${escape_html(value.str.split("-")[1])}`;
                          },
                          $$slots: { default: true }
                        });
                      } else {
                        $$payload3.out += "<!--[!-->";
                        Anchor($$payload3, {
                          breadcrumbAction: "push",
                          href: itemHref,
                          class: "anchor",
                          children: ($$payload4) => {
                            $$payload4.out += `<!---->${escape_html(value.str)}`;
                          },
                          $$slots: { default: true }
                        });
                      }
                      $$payload3.out += `<!--]-->`;
                    } else {
                      $$payload3.out += "<!--[!-->";
                      $$payload3.out += `${escape_html(value.str ?? "-")}`;
                    }
                    $$payload3.out += `<!--]-->`;
                  } else if (value && value.hexcolor) {
                    $$payload3.out += "<!--[3-->";
                    $$payload3.out += `<p${attr_class(`flex w-fit min-w-24 justify-center px-2 py-1 rounded-md ml-2 whitespace-nowrap ${stringify(classesHexBackgroundText(value.hexcolor))}`)}${attr_style(`background-color: ${stringify(value.hexcolor)}`)}>${escape_html(safeTranslate(value.name ?? value.str) ?? "-")}</p>`;
                  } else if (ISO_8601_REGEX.test(value) && (key === "created_at" || key === "updated_at" || key === "expiry_date" || key === "accepted_at" || key === "rejected_at" || key === "revoked_at" || key === "eta" || key === "timestamp" || key === "reported_at" || key === "discovered_on")) {
                    $$payload3.out += "<!--[4-->";
                    $$payload3.out += `${escape_html(formatDateOrDateTime(value, getLocale()))}`;
                  } else if ([true, false].includes(value)) {
                    $$payload3.out += "<!--[5-->";
                    $$payload3.out += `<span class="ml-4">${escape_html(safeTranslate(value ?? "-"))}</span>`;
                  } else if (key === "progress") {
                    $$payload3.out += "<!--[6-->";
                    $$payload3.out += `<span class="ml-9">${escape_html(safeTranslate("percentageDisplay", { number: value }))}</span>`;
                  } else if (key === "translations") {
                    $$payload3.out += "<!--[7-->";
                    if (Object.keys(value).length > 0) {
                      $$payload3.out += "<!--[-->";
                      const each_array_6 = ensure_array_like(Object.entries(value));
                      $$payload3.out += `<div class="flex flex-col gap-2"><!--[-->`;
                      for (let $$index_4 = 0, $$length3 = each_array_6.length; $$index_4 < $$length3; $$index_4++) {
                        let [lang, translation] = each_array_6[$$index_4];
                        $$payload3.out += `<div class="flex flex-row gap-2"><strong>${escape_html(lang)}:</strong> <span>${escape_html(safeTranslate(translation))}</span></div>`;
                      }
                      $$payload3.out += `<!--]--></div>`;
                    } else {
                      $$payload3.out += "<!--[!-->";
                      $$payload3.out += `--`;
                    }
                    $$payload3.out += `<!--]-->`;
                  } else if (URLModel == "risk-acceptances" && key === "name" && row.meta?.accepted_at && row.meta?.revoked_at == null) {
                    $$payload3.out += "<!--[8-->";
                    $$payload3.out += `<div class="flex items-center space-x-2"><span>${escape_html(safeTranslate(value ?? "-"))}</span> <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-sm dark:bg-green-200 dark:text-green-900">${escape_html(accept())}</span></div>`;
                  } else if ((key === "name" || key === "str") && row.meta?.is_locked) {
                    $$payload3.out += "<!--[9-->";
                    $$payload3.out += `<div class="flex items-center space-x-2"><i class="fa-solid fa-lock text-yellow-600"${attr("title", islocked1())}></i> <span class="text-yellow-600">${escape_html(safeTranslate(value ?? "-"))}</span></div>`;
                  } else if (key === "icon_fa_class") {
                    $$payload3.out += "<!--[10-->";
                    $$payload3.out += `<i${attr_class(`text-lg fa ${stringify(value)}`)}></i>`;
                  } else if (value && value.name) {
                    $$payload3.out += "<!--[11-->";
                    $$payload3.out += `${escape_html(value.name)}`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                    if (value?.length > 300) {
                      $$payload3.out += "<!--[-->";
                      $$payload3.out += `${escape_html(safeTranslate(value ?? "-").slice(0, 300))}...`;
                    } else {
                      $$payload3.out += "<!--[!-->";
                      $$payload3.out += `${escape_html(safeTranslate(value ?? "-"))}`;
                    }
                    $$payload3.out += `<!--]-->`;
                  }
                  $$payload3.out += `<!--]--> `;
                  badge?.($$payload3, key, row);
                  $$payload3.out += `<!----></div>`;
                }
                $$payload3.out += `<!--]--></div></td>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            }
            $$payload3.out += `<!--]-->`;
            if (displayActions) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<td${attr_class(`text-end ${stringify(regionCell)}`)} role="gridcell">`;
              if (actions) {
                $$payload3.out += "<!--[-->";
                actions($$payload3, { meta: row.meta });
                $$payload3.out += `<!---->`;
              } else if (row.meta[identifierField]) {
                $$payload3.out += "<!--[1-->";
                const actionsComponent = fieldComponentMap[CUSTOM_ACTIONS_COMPONENT];
                {
                  let head = function($$payload4) {
                    if (actionsHead) {
                      $$payload4.out += "<!--[-->";
                      actionsHead?.($$payload4);
                      $$payload4.out += `<!---->`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]-->`;
                  }, body = function($$payload4) {
                    if (actionsBody) {
                      $$payload4.out += "<!--[-->";
                      actionsBody?.($$payload4);
                      $$payload4.out += `<!---->`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]-->`;
                  }, tail2 = function($$payload4) {
                    const ActionsComponent = actionsComponent;
                    if (tail_render) {
                      $$payload4.out += "<!--[-->";
                      tail_render($$payload4);
                      $$payload4.out += `<!---->`;
                    } else if (ActionsComponent) {
                      $$payload4.out += "<!--[1-->";
                      $$payload4.out += `<!---->`;
                      ActionsComponent($$payload4, {
                        meta: row.meta ?? {},
                        actionsURLModel,
                        handler
                      });
                      $$payload4.out += `<!---->`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]-->`;
                  };
                  TableRowActions($$payload3, {
                    deleteForm: disableDelete ? null : deleteForm,
                    model,
                    URLModel: actionsURLModel,
                    detailURL: `/${actionsURLModel}/${row.meta[identifierField]}${detailQueryParameter}`,
                    editURL: !(row.meta.builtin || row.meta.urn) || URLModel === "terminologies" ? `/${actionsURLModel}/${row.meta[identifierField]}/edit?next=${encodeURIComponent(page.url.pathname + page.url.search)}` : void 0,
                    row,
                    hasBody: actionsBody,
                    identifierField,
                    disableEdit,
                    disableView,
                    preventDelete: preventDelete(row),
                    preventEdit: preventEdit(),
                    head,
                    body,
                    tail: tail2
                  });
                }
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></td>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></tr>`;
          }
          $$payload3.out += `<!--]--></tbody>`;
        };
        Context_menu_trigger($$payload2, { child, $$slots: { child: true } });
      }
      $$payload2.out += `<!----> `;
      if (contextMenuDisplayEdit || contextMenuDisplayDelete || Object.hasOwn(contextMenuActions, URLModel)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Context_menu_content($$payload2, {
          class: "z-50 min-w-[180px] outline-hidden bg-white px-1 py-1.5 shadow-md border border-surface-200 rounded-md",
          children: ($$payload3) => {
            if (Object.hasOwn(contextMenuActions, URLModel)) {
              $$payload3.out += "<!--[-->";
              const each_array_7 = ensure_array_like(contextMenuActions[URLModel]);
              $$payload3.out += `<!--[-->`;
              for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
                let action = each_array_7[$$index_7];
                $$payload3.out += `<!---->`;
                action.component($$payload3, {
                  row: contextMenuOpenRow,
                  handler,
                  URLModel,
                  action
                });
                $$payload3.out += `<!---->`;
              }
              $$payload3.out += `<!--]--> <!---->`;
              Menu_separator($$payload3, { class: "-mx-1 my-1 block h-px bg-surface-100" });
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<!---->`;
              Menu_item($$payload3, {
                class: "flex h-10 w-full select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer data-highlighted:bg-surface-50",
                onclick: () => {
                  goto(`/${actionsURLModel}/${contextMenuOpenRow?.meta[identifierField]}/edit?next=${encodeURIComponent(page.url.pathname + page.url.search)}`, { breadcrumbAction: "push" });
                },
                children: ($$payload4) => {
                  $$payload4.out += `<!---->${escape_html(edit())}`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!----> <!---->`;
              Menu_item($$payload3, {
                class: "flex h-10 w-full select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer data-highlighted:bg-surface-50",
                onclick: () => {
                  goto(`/${actionsURLModel}/${contextMenuOpenRow?.meta[identifierField]}/`, { breadcrumbAction: "push" });
                },
                children: ($$payload4) => {
                  $$payload4.out += `<!---->${escape_html(view())}`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!---->`;
            }
            $$payload3.out += `<!--]--> `;
            if (contextMenuDisplayDelete) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<!---->`;
              Menu_separator($$payload3, { class: "-mx-1 my-1 block h-px bg-surface-100" });
              $$payload3.out += `<!----> <!---->`;
              Menu_item($$payload3, {
                class: "flex h-10 w-full select-none items-center rounded-xs py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer text-red-500 data-highlighted:bg-surface-50",
                onclick: () => {
                  if (URLModel === "folders") {
                    contextMenuPromptModalConfirmDelete(contextMenuOpenRow?.meta[identifierField], contextMenuOpenRow);
                  } else {
                    contextMenuModalConfirmDelete(contextMenuOpenRow?.meta[identifierField], contextMenuOpenRow);
                  }
                },
                children: ($$payload4) => {
                  $$payload4.out += `<!---->${escape_html(_delete())}`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  if (tableSource.foot) {
    $$payload.out += "<!--[-->";
    const each_array_8 = ensure_array_like(tableSource.foot);
    $$payload.out += `<tfoot${attr_class(`table-foot ${stringify(regionFoot)}`)}><tr><!--[-->`;
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let cell = each_array_8[$$index_8];
      $$payload.out += `<td${attr_class(clsx(regionFootCell))}>${escape_html(cell)}</td>`;
    }
    $$payload.out += `<!--]--></tr></tfoot>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></table> <footer class="flex justify-between items-center space-x-8 p-3 border-t border-gray-100 bg-gray-50/30">`;
  if (rowCount && pagination) {
    $$payload.out += "<!--[-->";
    RowCount($$payload, { handler });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (pagination) {
    $$payload.out += "<!--[-->";
    Pagination($$payload, { handler, URLModel });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></footer></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { detailQueryParameter, hideFilters });
  pop();
}

export { DataHandler as D, ModelTable as M, Pagination as P, RowsPerPage as R, Search as S, TableRowActions as T, RowCount as a, loadTableData as l };
//# sourceMappingURL=ModelTable-BZ-7wwsg.js.map
