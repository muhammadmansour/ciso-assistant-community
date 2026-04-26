function formatDateOrDateTime(isoString, locale = "en-US") {
  if (typeof isoString !== "string") {
    return isoString;
  }
  const hasTime = isoString.includes("T");
  const date = new Date(isoString);
  if (hasTime) {
    return date.toLocaleString(locale);
  } else {
    return date.toLocaleDateString(locale);
  }
}

export { formatDateOrDateTime as f };
//# sourceMappingURL=datetime-CDLVyquZ.js.map
