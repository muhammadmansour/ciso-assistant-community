const isURL = (url) => {
  try {
    const urlToCheck = new URL(url);
    if (urlToCheck.protocol !== "http:" && urlToCheck.protocol !== "https:") return false;
    return true;
  } catch (e) {
    return false;
  }
};
function getRequirementTitle(ref_id, name) {
  const pattern = (ref_id ? 2 : 0) + (name ? 1 : 0);
  const title = pattern == 3 ? `${ref_id} - ${name}` : pattern == 2 ? ref_id : pattern == 1 ? name : "";
  return title;
}
function displayScoreColor(value, max_score, inversedColors = false) {
  value ??= 0;
  value = value * 100 / max_score;
  if (inversedColors) {
    if (value < 25) {
      return "stroke-green-300";
    }
    if (value < 50) {
      return "stroke-yellow-300";
    }
    if (value < 75) {
      return "stroke-orange-400";
    }
    return "stroke-red-400";
  } else {
    if (value < 25) {
      return "stroke-red-400";
    }
    if (value < 50) {
      return "stroke-orange-400";
    }
    if (value < 75) {
      return "stroke-yellow-300";
    }
    return "stroke-green-300";
  }
}
function formatScoreValue(value, max_score, fullDonut = false) {
  if (value === null) {
    return 0;
  } else if (fullDonut) {
    return 100;
  }
  return value * 100 / max_score;
}
function getSecureRedirect(url) {
  const SECURE_REDIRECT_URL_REGEX = /^\/\w+/;
  return typeof url === "string" && SECURE_REDIRECT_URL_REGEX.test(url) ? url : "";
}
function darkenColor(hex, amount) {
  hex = hex.slice(1);
  const num = parseInt(hex, 16);
  let r = (num >> 16) - amount * 255;
  let g = (num >> 8 & 255) - amount * 255;
  let b = (num & 255) - amount * 255;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}
function isDark(hexcolor) {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1e3;
  return brightness < 128;
}
const getSearchTarget = (opt) => {
  if (typeof opt === "string" || typeof opt === "number") {
    return String(opt).trim();
  }
  if (!opt || typeof opt !== "object") {
    return "";
  }
  if (opt.label === void 0) {
    const opt_str = JSON.stringify(opt);
    console.error(`MultiSelect option ${opt_str} is an object but has no label key`);
    return "";
  }
  const components = [];
  if (opt.path && Array.isArray(opt.path)) {
    const pathString = opt.path.filter(Boolean).map((item) => String(item).trim()).join(" ");
    if (pathString) {
      components.push(pathString);
    }
  }
  const mainLabel = String(opt.label || "").trim();
  if (mainLabel) {
    components.push(mainLabel);
  }
  if (opt.translatedLabel && opt.translatedLabel !== opt.label) {
    const translatedLabel = String(opt.translatedLabel).trim();
    if (translatedLabel && translatedLabel !== mainLabel) {
      components.push(translatedLabel);
    }
  }
  if (opt.value !== void 0 && opt.value !== opt.label) {
    const valueString = String(opt.value).trim();
    if (valueString && valueString !== mainLabel) {
      components.push(valueString);
    }
  }
  if (opt.infoString?.string) {
    const infoString = String(opt.infoString.string).trim();
    if (infoString) {
      components.push(infoString);
    }
  }
  const searchTarget = components.join(" ");
  return normalizeSearchString(searchTarget);
};
function normalizeSearchString(str) {
  return str.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}", "gu"), "").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}
function isQuestionVisible(question, answers) {
  if (!question.depends_on) return true;
  const dependency = question.depends_on;
  const targetAnswer = answers[dependency.question];
  if (targetAnswer === void 0 || targetAnswer === null) return false;
  if (dependency.condition === "any") {
    if (Array.isArray(targetAnswer)) {
      return targetAnswer.some((a) => dependency.answers.includes(a));
    }
    return dependency.answers.includes(targetAnswer);
  }
  if (dependency.condition === "all") {
    if (Array.isArray(targetAnswer)) {
      return dependency.answers.every((a) => targetAnswer.includes(a));
    }
    return dependency.answers.length === 1 && dependency.answers[0] === targetAnswer;
  }
  return true;
}
function computeRequirementScoreAndResult(requirementAssessment, answers) {
  const questions = requirementAssessment.requirement.questions;
  if (!questions) return { score: null, result: null };
  let totalScore = 0;
  const min_score = requirementAssessment.compliance_assessment.min_score || 0;
  const max_score = requirementAssessment.compliance_assessment.max_score || 100;
  let results = [];
  let visibleCount = 0;
  let answeredVisibleCount = 0;
  let hasAnyScorableQuestions = false;
  let hasAnyResultQuestions = false;
  for (const [q_urn, question] of Object.entries(questions)) {
    if (question.choices && Array.isArray(question.choices)) {
      for (const choice of question.choices) {
        if (choice.add_score) {
          hasAnyScorableQuestions = true;
        }
        if (choice.compute_result) {
          hasAnyResultQuestions = true;
        }
      }
    }
  }
  if (!hasAnyScorableQuestions) {
    totalScore = null;
  }
  for (const [q_urn, question] of Object.entries(questions)) {
    if (!isQuestionVisible(question, answers)) continue;
    visibleCount++;
    const selectedChoiceURNs = answers?.[q_urn];
    const hasAnswer = selectedChoiceURNs !== void 0 && selectedChoiceURNs !== null && !(typeof selectedChoiceURNs === "string" && selectedChoiceURNs.trim() === "") && !(Array.isArray(selectedChoiceURNs) && selectedChoiceURNs.length === 0);
    if (!hasAnswer) {
      continue;
    }
    answeredVisibleCount++;
    const choiceURNs = Array.isArray(selectedChoiceURNs) ? selectedChoiceURNs : [selectedChoiceURNs];
    if (!question.choices || !Array.isArray(question.choices)) continue;
    for (const urn of choiceURNs) {
      const selectedChoice = question.choices.find((choice) => choice.urn === urn);
      if (!selectedChoice) continue;
      if (selectedChoice.add_score !== void 0 && selectedChoice.add_score !== null) {
        totalScore += selectedChoice.add_score;
      }
      if (selectedChoice.compute_result !== void 0 && selectedChoice.compute_result !== null) {
        results.push(!!selectedChoice.compute_result);
      }
    }
  }
  if (visibleCount === 0) {
    return { score: null, result: "not_applicable" };
  }
  if (totalScore !== null) {
    totalScore = Math.max(min_score, Math.min(max_score, totalScore));
  }
  if (answeredVisibleCount < visibleCount && hasAnyResultQuestions) {
    return { score: totalScore, result: "not_assessed" };
  }
  let result = hasAnyResultQuestions ? "not_assessed" : null;
  if (results?.length > 0) {
    if (results.every((r) => r === true)) result = "compliant";
    else if (results.some((r) => r === true)) result = "partially_compliant";
    else result = "non_compliant";
  }
  return { score: totalScore, result };
}

export { getSearchTarget as a, isDark as b, isQuestionVisible as c, displayScoreColor as d, getRequirementTitle as e, formatScoreValue as f, getSecureRedirect as g, darkenColor as h, isURL as i, computeRequirementScoreAndResult as j, normalizeSearchString as n };
//# sourceMappingURL=helpers-Bm9n0CNG.js.map
