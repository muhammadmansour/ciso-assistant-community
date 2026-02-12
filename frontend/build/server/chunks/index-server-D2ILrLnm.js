import { a9 as current_component, n as noop } from './index2-9icAqEyj.js';

function lifecycle_function_unavailable(name) {
  const error = new Error(`lifecycle_function_unavailable
\`${name}(...)\` is not available on the server
https://svelte.dev/e/lifecycle_function_unavailable`);
  error.name = "Svelte error";
  throw error;
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function createEventDispatcher() {
  return noop;
}
function mount() {
  lifecycle_function_unavailable("mount");
}
async function tick() {
}

export { createEventDispatcher as c, mount as m, onDestroy as o, tick as t };
//# sourceMappingURL=index-server-D2ILrLnm.js.map
