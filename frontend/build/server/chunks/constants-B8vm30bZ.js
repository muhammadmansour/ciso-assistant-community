import { p as public_env } from './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const env = public_env ?? {};
const BASE_API_URL = `${Object.hasOwn(env, "PUBLIC_BACKEND_API_URL") ? env.PUBLIC_BACKEND_API_URL : "http://localhost:8000/api"}`;
const DEFAULT_LANGUAGE = `${Object.hasOwn(env, "PUBLIC_DEFAULT_LANGUAGE") ? env.PUBLIC_DEFAULT_LANGUAGE : "en"}`;
const ALLAUTH_API_URL = `${BASE_API_URL}/_allauth/app/v1`;
`${Object.hasOwn(env, "PUBLIC_BACKEND_API_EXPOSED_URL") ? env.PUBLIC_BACKEND_API_EXPOSED_URL : BASE_API_URL}`;
const complianceResultColorMap = {
  not_assessed: "#d1d5db",
  partially_compliant: "#fde047",
  non_compliant: "#f87171",
  compliant: "#86efac",
  not_applicable: "#000000"
};
const complianceResultTailwindColorMap = {
  not_assessed: "bg-gray-300",
  partially_compliant: "bg-yellow-300",
  non_compliant: "bg-red-300",
  compliant: "bg-green-300",
  not_applicable: "bg-black text-white"
};
const complianceStatusColorMap = {
  to_do: "#9ca3af",
  in_progress: "#f59e0b",
  in_review: "#3b82f6",
  done: "#86efac"
};
const complianceStatusTailwindColorMap = {
  to_do: "bg-gray-400",
  in_progress: "bg-amber-500",
  in_review: "bg-blue-500",
  done: "bg-green-300"
};
const extendedResultColorMap = {
  not_set: "#d1d5db",
  major_nonconformity: "#dc2626",
  minor_nonconformity: "#f97316",
  observation: "#eab308",
  opportunity_for_improvement: "#3b82f6",
  good_practice: "#22c55e"
};
const UUID_REGEX = "([0-9a-f]{8}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{12})";
const UUID_LIST_REGEX = new RegExp(`^${UUID_REGEX}(,${UUID_REGEX})*$`);
const LOCALE_DISPLAY_MAP = {
  en: "🇬🇧 English",
  fr: "🇫🇷 Français",
  de: "🇩🇪 Deutsch",
  es: "🇪🇸 Español",
  it: "🇮🇹 Italiano",
  nl: "🇳🇱 Nederlands",
  pt: "🇵🇹 Português",
  pl: "🇵🇱 Polski",
  ro: "🇷🇴 Română",
  ar: "🇸🇦 العربية",
  cs: "🇨🇿 Český",
  sv: "🇸🇪 Svenska",
  id: "🇮🇩 Bahasa Indonesia",
  da: "🇩🇰 Dansk",
  uk: "🇺🇦 Українська",
  el: "🇬🇷 Ελληνικά",
  tr: "🇹🇷 Türkçe",
  hr: "🇭🇷 Hrvatski",
  zh: "🇨🇳 简体中文"
};
const ISO_8601_REGEX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
const SECURITY_OBJECTIVE_SCALE_MAP = {
  "0-3": ["0", "1", "2", "3", "3"],
  "0-4": ["0", "1", "2", "3", "4"],
  "1-4": ["1", "2", "3", "4", "4"],
  "1-5": ["1", "2", "3", "4", "5"],
  "FIPS-199": ["low", "moderate", "moderate", "high", "high"]
};

export { ALLAUTH_API_URL as A, BASE_API_URL as B, DEFAULT_LANGUAGE as D, ISO_8601_REGEX as I, LOCALE_DISPLAY_MAP as L, SECURITY_OBJECTIVE_SCALE_MAP as S, UUID_REGEX as U, UUID_LIST_REGEX as a, complianceResultColorMap as b, complianceResultTailwindColorMap as c, complianceStatusTailwindColorMap as d, extendedResultColorMap as e, complianceStatusColorMap as f };
//# sourceMappingURL=constants-B8vm30bZ.js.map
