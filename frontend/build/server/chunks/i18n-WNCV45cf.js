import { d as daycount1, h as hourcount1, m as minutecount1, b as m, c as english } from './_index-DEXNURl5.js';

const LOCALE_MAP = {
  en: {
    name: "english",
    flag: "🇬🇧"
  }
};
const language = {
  english: english()
};
const defaultLangLabels = {
  en: "English"
};
function toCamelCase(str) {
  if (typeof str !== "string") return str;
  str = str.charAt(0).toLowerCase() + str.slice(1);
  return str.replace(/[_-\s]\w/g, (match) => match.charAt(1).toUpperCase());
}
function unsafeTranslate(key, params = {}, options = {}) {
  try {
    if (typeof key === "object" && key !== null && "day" in key && "hour" in key && "minute" in key) {
      const { day, hour, minute } = key;
      const parts = [];
      if (day !== void 0 && day !== 0) parts.push(`${daycount1({ count: day }, options)}`);
      if (hour !== void 0 && hour !== 0)
        parts.push(`${hourcount1({ count: hour }, options)}`);
      if (minute !== void 0 && minute !== 0)
        parts.push(`${minutecount1({ count: minute }, options)}`);
      return parts.join(", ");
    }
    if (Object.hasOwn(m, key) && typeof m[key] === "function") {
      return m[key](params, options);
    }
    if (typeof key === "string" && key) {
      let res = key.match("^([^:]+):([^:]+)$");
      if (res) {
        return (Object.hasOwn(m, res[1]) && typeof m[res[1]] === "function" ? m[res[1]](params, options) : res[1]) + ":" + res[2];
      }
    }
    if (Object.hasOwn(m, toCamelCase(key)) && typeof m[toCamelCase(key)] === "function") {
      return m[toCamelCase(key)](params, options);
    }
    if (typeof key === "boolean") {
      return key ? "✅" : "❌";
    }
    if (key === "YES") {
      return "✅";
    }
    if (key === "NO") {
      return "❌";
    }
    if (typeof key === "string" && key.includes("->")) {
      const parts = key.split("->");
      if (parts.length === 2) {
        const [from, to] = parts;
        const translatedFrom = m[toCamelCase(from)] ? m[toCamelCase(from)](params, options) : from;
        const translatedTo = m[toCamelCase(to)] ? m[toCamelCase(to)](params, options) : to;
        return translatedFrom + "->" + translatedTo;
      }
    }
    if (typeof key === "string" && key.includes("/")) {
      const parts = key.split("/");
      const translatedParts = parts.map((part) => {
        const camelCasePart = toCamelCase(part);
        return m[camelCasePart] ? m[camelCasePart](params, options) : part;
      });
      return translatedParts.join("/");
    }
  } catch (e) {
    console.error(`Error translating key "${key}"`, e);
  }
}
function safeTranslate(key, params = {}, options = {}) {
  return unsafeTranslate(key, params, options) || key;
}

export { LOCALE_MAP as L, defaultLangLabels as d, language as l, safeTranslate as s, toCamelCase as t, unsafeTranslate as u };
//# sourceMappingURL=i18n-WNCV45cf.js.map
