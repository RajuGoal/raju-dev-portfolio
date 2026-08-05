import { atsRules } from "../data/resumeReviewData";

// Fully local, rule-based scorer — no AI, no network call, works instantly
export function scoreResume(text) {
  const lower = text.toLowerCase();
  const issues = [];
  const wins = [];
  let score = 100;

  // Check required sections exist
  atsRules.requiredSections.forEach((section) => {
    if (!lower.includes(section)) {
      score -= 12;
      issues.push(
        `Missing a clear "${section}" section heading — ATS parsers look for this exact keyword.`,
      );
    } else {
      wins.push(`Has a "${section}" section.`);
    }
  });

  // Weak verb usage
  const weakCount = atsRules.weakVerbs.filter((v) => lower.includes(v)).length;
  if (weakCount > 0) {
    score -= weakCount * 4;
    issues.push(
      `Found ${weakCount} weak phrase(s) like "responsible for" — replace with action verbs (e.g. "led", "built").`,
    );
  }

  // Strong verb usage
  const strongCount = atsRules.strongVerbs.filter((v) =>
    lower.includes(v),
  ).length;
  if (strongCount >= 3) {
    wins.push(`Uses ${strongCount} strong action verbs.`);
  } else {
    score -= 8;
    issues.push(
      "Uses very few strong action verbs — aim for at least 3-5 across your bullet points.",
    );
  }

  // Quantified achievements (numbers/%)
  const hasNumbers = /\d+%|\$\d+|\d+x|\d+\+/.test(text);
  if (hasNumbers) {
    wins.push("Includes quantified achievements (numbers, %, or metrics).");
  } else {
    score -= 10;
    issues.push(
      'No quantified achievements found — add numbers where possible (e.g. "reduced load time by 35%").',
    );
  }

  // Length check (word count)
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 200) {
    score -= 10;
    issues.push(
      "Resume seems short — ATS and recruiters generally expect 400-800 words for 1-2 pages.",
    );
  } else if (wordCount > 1000) {
    score -= 8;
    issues.push(
      "Resume seems long — consider trimming to 1-2 pages worth of content.",
    );
  } else {
    wins.push("Resume length looks appropriate.");
  }

  // Contact info presence
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /\d{10}|\(\d{3}\)\s?\d{3}-\d{4}/.test(text);
  if (!hasEmail) {
    score -= 8;
    issues.push(
      "No email address detected — make sure contact info is in plain text, not an image.",
    );
  }
  if (!hasPhone) {
    score -= 4;
    issues.push("No phone number detected in plain text.");
  }

  score = Math.max(0, Math.min(100, score));

  return { score: Math.round(score), issues, wins, wordCount };
}
