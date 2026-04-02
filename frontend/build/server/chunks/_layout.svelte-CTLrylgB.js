function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="card bg-white shadow-lg">`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CTLrylgB.js.map
