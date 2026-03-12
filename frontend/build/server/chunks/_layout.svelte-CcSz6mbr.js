function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="flex flex-col space-y-4">`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CcSz6mbr.js.map
