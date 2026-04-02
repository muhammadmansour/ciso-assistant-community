import { w as writable } from './index-CRjgakYW.js';

var stores = {
  local: {},
  session: {}
};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (options == null ? void 0 : options.onError) console.warn("onError has been deprecated. Please use onWriteError instead");
  const serializer = (_a = options == null ? void 0 : options.serializer) != null ? _a : JSON;
  const storageType = (_b = options == null ? void 0 : options.storage) != null ? _b : "local";
  const syncTabs = (_c = options == null ? void 0 : options.syncTabs) != null ? _c : true;
  const onWriteError = (_e = (_d = options == null ? void 0 : options.onWriteError) != null ? _d : options == null ? void 0 : options.onError) != null ? _e : (e) => console.error(`Error when writing value from persisted store "${key}" to ${storageType}`, e);
  const onParseError = (_f = options == null ? void 0 : options.onParseError) != null ? _f : (newVal, e) => console.error(`Error when parsing ${newVal ? '"' + newVal + '"' : "value"} from persisted store "${key}"`, e);
  const beforeRead = (_g = options == null ? void 0 : options.beforeRead) != null ? _g : (val) => val;
  const beforeWrite = (_h = options == null ? void 0 : options.beforeWrite) != null ? _h : (val) => val;
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  const storage = browser ? getStorage(storageType) : null;
  function updateStorage(key2, value) {
    const newVal = beforeWrite(value);
    try {
      storage == null ? void 0 : storage.setItem(key2, serializer.stringify(newVal));
    } catch (e) {
      onWriteError(e);
    }
  }
  function maybeLoadInitial() {
    function serialize(json2) {
      try {
        return serializer.parse(json2);
      } catch (e) {
        onParseError(json2, e);
      }
    }
    const json = storage == null ? void 0 : storage.getItem(key);
    if (json == null) return initialValue;
    const serialized = serialize(json);
    if (serialized == null) return initialValue;
    const newVal = beforeRead(serialized);
    return newVal;
  }
  if (!stores[storageType][key]) {
    const initial = maybeLoadInitial();
    const store = writable(initial, (set2) => {
      if (browser && storageType == "local" && syncTabs) {
        const handleStorage = (event) => {
          if (event.key === key && event.newValue) {
            let newVal;
            try {
              newVal = serializer.parse(event.newValue);
            } catch (e) {
              onParseError(event.newValue, e);
              return;
            }
            const processedVal = beforeRead(newVal);
            set2(processedVal);
          }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[storageType][key] = {
      set(value) {
        set(value);
        updateStorage(key, value);
      },
      update(callback) {
        return store.update((last) => {
          const value = callback(last);
          updateStorage(key, value);
          return value;
        });
      },
      reset() {
        this.set(initialValue);
      },
      subscribe
    };
  }
  return stores[storageType][key];
}
const showNotification = writable(
  "false"
);
showNotification.subscribe((val) => {
});
const pageTitle = writable("");
const modelName = writable("");
const modelDescription = writable("");
const clientSideToast = writable(void 0);
const requirementAssessmentsList = [];
const hideSuggestions = persisted("hideSuggestions", requirementAssessmentsList, {
  storage: "session"
});
const showAllEvents = persisted("showAllEvents", true, {
  storage: "session"
});
const lastAccordionItem = persisted("lastAccordionItem", ["compliance", "organization", "governance", "metrology"]);
const expandedNodes = [];
const expandedNodesState = persisted("expandedNodes", expandedNodes, {
  storage: "session"
});
const createModalCache = {
  _urlModel: "",
  _cacheToDelete: /* @__PURE__ */ new Set(),
  data: {},
  deleteCache(cacheName) {
    this._cacheToDelete.add(cacheName);
  },
  garbageCollect() {
    for (const cacheName of this._cacheToDelete) {
      delete this.data[cacheName];
    }
    this._cacheToDelete.clear();
  },
  clear() {
    for (const cacheName of Object.keys(this.data)) {
      delete this.data[cacheName];
    }
  },
  setModelName(urlModelFromPage) {
    if (this._urlModel !== urlModelFromPage) this.clear();
    this._urlModel = urlModelFromPage;
  }
};
const driverInstance = writable(null);
const tableHandlers = writable({});
const tableStates = persisted("tableStates", {});
function createPersistedAuditFilters() {
  const initial = {};
  const { subscribe, set, update } = writable(initial);
  return {
    subscribe,
    set,
    update,
    setStatus(id, statusArray) {
      update((filters) => {
        if (!filters[id]) filters[id] = {};
        filters[id].selectedStatus = statusArray;
        return filters;
      });
    },
    setResults(id, resultsArray) {
      update((filters) => {
        if (!filters[id]) filters[id] = {};
        filters[id].selectedResults = resultsArray;
        return filters;
      });
    },
    setExtendedResults(id, extendedResultsArray) {
      update((filters) => {
        if (!filters[id]) filters[id] = {};
        filters[id].selectedExtendedResults = extendedResultsArray;
        return filters;
      });
    },
    setDisplayOnlyAssessableNodes(id, displayOnlyAssessableNodes) {
      update((filters) => {
        if (!filters[id]) filters[id] = {};
        filters[id].displayOnlyAssessableNodes = displayOnlyAssessableNodes;
        return filters;
      });
    }
  };
}
const auditFiltersStore = createPersistedAuditFilters();

export { createModalCache as a, modelDescription as b, clientSideToast as c, driverInstance as d, tableHandlers as e, auditFiltersStore as f, expandedNodesState as g, hideSuggestions as h, lastAccordionItem as l, modelName as m, pageTitle as p, showAllEvents as s, tableStates as t };
//# sourceMappingURL=stores-D-WMoATo.js.map
