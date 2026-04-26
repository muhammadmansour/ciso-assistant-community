function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="card bg-white shadow-lg p-4">`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-9jbHZyUq.js.map
