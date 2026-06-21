function _layout($$payload, $$props) {
  let { children } = $$props;
  children?.($$payload);
  $$payload.out += `<!---->`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-0yB81X2U.js.map
