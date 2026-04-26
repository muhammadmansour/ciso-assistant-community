import { s as setContext, N as getContext } from './index2-9icAqEyj.js';

function createContext(defaultValue) {
  var key = Symbol();
  var set = function(value) {
    return setContext(key, value);
  };
  var get = function() {
    var _a2;
    return (_a2 = getContext(key)) !== null && _a2 !== void 0 ? _a2 : defaultValue;
  };
  return [set, get, key];
}
var _a$3;
var setAccordionContext = (_a$3 = createContext(), _a$3[0]), getAccordionContext = _a$3[1];
_a$3[2];
var _a$2;
_a$2 = createContext({
  parent: "none",
  value: "",
  expanded: false
}), _a$2[0];
_a$2[1];
_a$2[2];
var _a$1;
_a$1 = createContext({
  api: {},
  indicatorText: ""
}), _a$1[0];
_a$1[1];
_a$1[2];
var _a;
var setTabContext = (_a = createContext({
  fluid: false,
  api: {}
}), _a[0]), getTabContext = _a[1];
_a[2];

export { setTabContext as a, getTabContext as b, getAccordionContext as g, setAccordionContext as s };
//# sourceMappingURL=Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js.map
