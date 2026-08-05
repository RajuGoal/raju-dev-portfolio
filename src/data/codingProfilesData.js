// Edit this file — your handles + manually-entered stats
// (Most platforms have no public API, so this is the source of truth.
//  Codeforces/LeetCode can optionally auto-refresh via the hooks below.)

export const codingProfiles = [
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "Raju_Kushwaha",
    profileUrl: "https://leetcode.com/u/Raju_Kushwaha/",
    color: "#ffa116",
    rating: null,
    maxRating: null,
    solved: 49,
    totalProblems: 3721,
    badges: [],
    breakdown: {
      Easy: 29,
      Medium: 20,
      Hard: 0,
    },
  },

  {
    id: "hackerrank",
    name: "HackerRank",
    handle: "itsme_raju_kuma1",
    profileUrl: "https://www.hackerrank.com/profile/itsme_raju_kuma1",
    color: "#2ec866",
    rating: null,
    maxRating: null,
    solved: null,
    totalProblems: null,
    badges: [],
    breakdown: null,
  },

  {
    id: "gfg",
    name: "GeeksforGeeks",
    handle: "itsmerajukum47q9",
    profileUrl:
      "https://www.geeksforgeeks.org/profile/itsmerajukum47q9?tab=activity",
    color: "#2f8d46",
    rating: null,
    maxRating: null,
    solved: null,
    totalProblems: null,
    badges: [],
    breakdown: null,
  },

  {
    id: "github",
    name: "GitHub",
    handle: "RajuGoal",
    profileUrl: "https://github.com/RajuGoal",
    color: "#24292f",
    rating: null,
    maxRating: null,
    solved: null,
    totalProblems: null,
    badges: [],
    breakdown: null,
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "raju-kushwaha-667834353",
    profileUrl: "https://www.linkedin.com/in/raju-kushwaha-667834353",
    color: "#0A66C2",
    rating: null,
    maxRating: null,
    solved: null,
    totalProblems: null,
    badges: [],
    breakdown: null,
  },
];

// Total solved across all platforms (used for the summary header)
export const totalSolvedAll = codingProfiles.reduce(
  (sum, p) => sum + (p.solved || 0),
  0,
);
