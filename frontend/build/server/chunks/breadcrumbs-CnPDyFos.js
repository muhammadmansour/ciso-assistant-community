import { w as writable } from './index-CRjgakYW.js';
import { g as goto$1 } from './client2-CItqzqlw.js';
import { av as home } from './_index-DZs3gE-i.js';

const homeCrumb = { label: home(), href: "/", icon: "fa-regular fa-compass" };
const createBreadcrumbs = (initialValue) => {
  const breadcrumbs2 = writable(initialValue);
  function mergeCrumbs(crumbs) {
    const mergedCrumbs = [];
    for (const crumb of crumbs) {
      const lastCrumb = mergedCrumbs[mergedCrumbs.length - 1];
      if (lastCrumb?.href !== crumb.href) {
        mergedCrumbs.push(crumb);
      }
    }
    return mergedCrumbs;
  }
  function push(crumb) {
    breadcrumbs2.update((value) => {
      const newCrumbs = mergeCrumbs([...value.slice(1, value.length), ...crumb]);
      return [homeCrumb, ...newCrumbs.slice(-5)];
    });
  }
  function updateCrumb(hrefPattern, updatedCrumb) {
    breadcrumbs2.update((crumbs) => {
      for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        if (hrefPattern.test(crumb.href ?? "")) {
          crumbs[i] = { ...crumb, ...updatedCrumb };
        }
      }
      return crumbs;
    });
  }
  function replace(crumb) {
    breadcrumbs2.update(() => {
      return mergeCrumbs([homeCrumb, ...crumb]);
    });
  }
  function slice(index) {
    breadcrumbs2.update((value) => {
      return value.slice(0, index + 1);
    });
  }
  return {
    ...breadcrumbs2,
    push,
    updateCrumb,
    replace,
    slice
  };
};
const breadcrumbs = createBreadcrumbs([homeCrumb]);
function goto(url, _opts = {}) {
  const opts = {
    crumbs: breadcrumbs,
    label: "",
    breadcrumbAction: "push",
    ..._opts
  };
  const { crumbs, label, breadcrumbAction } = opts;
  const crumb = { label, href: url };
  crumbs[breadcrumbAction]([crumb]);
  return goto$1(url, opts);
}

export { breadcrumbs as b, goto as g };
//# sourceMappingURL=breadcrumbs-CnPDyFos.js.map
