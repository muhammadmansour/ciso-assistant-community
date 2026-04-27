import { d as daycount1, h as hourcount1, m as minutecount1, b as m, c as chinese, f as croatian, t as turkish, g as greek, u as ukrainian, i as hungarian, j as danish, k as indonesian, s as swedish, l as czech, n as urdu, o as hindi, p as romanian, q as polish, v as italian, w as dutch, x as german, y as spanish, z as portuguese, A as arabic, B as english, C as french } from './_index-D7NdhnXA.js';

const LOCALE_MAP = {
  en: {
    name: "english",
    flag: "🇬🇧"
  },
  fr: {
    name: "french",
    flag: "🇫🇷"
  },
  de: {
    name: "german",
    flag: "🇩🇪"
  },
  ar: {
    name: "arabic",
    flag: "🇸🇦"
  },
  pt: {
    name: "portuguese",
    flag: "🇧🇷"
  },
  es: {
    name: "spanish",
    flag: "🇪🇸"
  },
  nl: {
    name: "dutch",
    flag: "🇳🇱"
  },
  it: {
    name: "italian",
    flag: "🇮🇹"
  },
  pl: {
    name: "polish",
    flag: "🇵🇱"
  },
  ro: {
    name: "romanian",
    flag: "🇷🇴"
  },
  hi: {
    name: "hindi"
  },
  ur: {
    name: "urdu"
  },
  cs: {
    name: "czech",
    flag: "🇨🇿"
  },
  sv: {
    name: "swedish",
    flag: "🇸🇪"
  },
  id: {
    name: "indonesian",
    flag: "🇮🇩"
  },
  da: {
    name: "danish",
    flag: "🇩🇰"
  },
  hu: {
    name: "hungarian",
    flag: "🇭🇺"
  },
  uk: {
    name: "ukrainian",
    flag: "🇺🇦"
  },
  el: {
    name: "greek",
    flag: "🇬🇷"
  },
  tr: {
    name: "turkish",
    flag: "🇹🇷"
  },
  hr: {
    name: "croatian",
    flag: "🇭🇷"
  },
  zh: {
    name: "chinese",
    flag: "🇨🇳"
  }
};
const language = {
  french: french(),
  english: english(),
  arabic: arabic(),
  portuguese: portuguese(),
  spanish: spanish(),
  german: german(),
  dutch: dutch(),
  italian: italian(),
  polish: polish(),
  romanian: romanian(),
  hindi: hindi(),
  urdu: urdu(),
  czech: czech(),
  swedish: swedish(),
  indonesian: indonesian(),
  danish: danish(),
  hungarian: hungarian(),
  ukrainian: ukrainian(),
  greek: greek(),
  turkish: turkish(),
  croatian: croatian(),
  chinese: chinese()
};
const defaultLangLabels = {
  fr: "Français",
  en: "English",
  ar: "العربية",
  pt: "Português",
  es: "Español",
  nl: "Nederlands",
  de: "Deutsch",
  it: "Italiano",
  pl: "Polski",
  ro: "Română",
  hi: "हिंदी",
  ur: "اردو",
  cs: "Český",
  sv: "Svenska",
  id: "Bahasa Indonesia",
  da: "Dansk",
  hu: "Magyar",
  uk: "Українська",
  el: "Ελληνικά",
  tr: "Türkçe",
  hr: "Hrvatski",
  zh: "简体中文"
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
//# sourceMappingURL=i18n-CMphL55V.js.map
