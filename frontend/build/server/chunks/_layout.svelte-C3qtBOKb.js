function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="card p-4 bg-white shadow-lg">`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-C3qtBOKb.js.map
