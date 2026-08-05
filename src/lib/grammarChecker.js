// Lightweight local grammar/style checks — catches common resume mistakes
// without needing an external grammar API (which would also need a backend key)
export function checkGrammar(text) {
  const findings = [];

  // Passive voice indicators
  const passiveMatches =
    text.match(/\b(was|were|been|being)\s+\w+ed\b/gi) || [];
  if (passiveMatches.length > 2) {
    findings.push({
      type: "style",
      message: `Detected ${passiveMatches.length} instances of passive voice — prefer active voice ("I led the project" not "the project was led by me").`,
    });
  }

  // First-person pronouns (should generally be avoided on resumes)
  const pronounMatches = text.match(/\b(I|me|my|myself)\b/g) || [];
  if (pronounMatches.length > 0) {
    findings.push({
      type: "style",
      message: `Found ${pronounMatches.length} first-person pronoun(s) ("I", "my") — resumes conventionally omit these.`,
    });
  }

  // Repeated words in close proximity (basic redundancy check)
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
  const freq = {};
  words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
  const overused = Object.entries(freq)
    .filter(
      ([w, c]) =>
        c > 6 && !["experience", "project", "team", "development"].includes(w),
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  overused.forEach(([word, count]) => {
    findings.push({
      type: "repetition",
      message: `The word "${word}" appears ${count} times — consider varying your vocabulary.`,
    });
  });

  // Inconsistent date formatting
  const dateFormats = [
    /\b\d{1,2}\/\d{4}\b/g, // MM/YYYY
    /\b[A-Z][a-z]+\s\d{4}\b/g, // Month YYYY
  ];
  const formatsFound = dateFormats.filter((re) => re.test(text)).length;
  if (formatsFound > 1) {
    findings.push({
      type: "consistency",
      message:
        'Multiple date formats detected — keep date formatting consistent throughout (e.g. always "Jun 2025").',
    });
  }

  return findings;
}
