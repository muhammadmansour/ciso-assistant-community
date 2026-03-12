import { w as writable } from './index-CRjgakYW.js';
import { s as setContext, N as getContext } from './index2-9icAqEyj.js';

const MODAL_STORE_KEY = "modalStore";
function getModalStore() {
  const modalStore = getContext(MODAL_STORE_KEY);
  if (!modalStore)
    throw new Error(
      "modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!"
    );
  return modalStore;
}
function initializeModalStore() {
  const modalStore = modalService();
  return setContext(MODAL_STORE_KEY, modalStore);
}
function modalService() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    update,
    /** Append to end of queue. */
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    /**  Remove first item in queue. */
    close: () => update((mStore) => {
      if (mStore.length > 0) mStore.shift();
      return mStore;
    }),
    /** Remove all items from queue. */
    clear: () => set([])
  };
}

export { getModalStore as g, initializeModalStore as i };
//# sourceMappingURL=stores2-D1NYwn5V.js.map
