// Each entry renders as a "logo" badge using an abbreviation + brand color,
// so the showcase works with zero image assets or icon-library installs.
// Swap `abbr`+`color` for a real <img src="/logos/x.svg"> per item later if
// you'd rather use actual brand logos — TechCard already accepts either.

export const techStackCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Programming",
  "Tools",
];

export const techStack = [
  // Frontend
  { name: "HTML5", category: "Frontend", abbr: "H5", color: "#E34F26" },
  { name: "CSS3", category: "Frontend", abbr: "C3", color: "#1572B6" },
  { name: "JavaScript", category: "Frontend", abbr: "JS", color: "#F7DF1E" },
  { name: "TypeScript", category: "Frontend", abbr: "TS", color: "#3178C6" },
  { name: "React.js", category: "Frontend", abbr: "R", color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", abbr: "N", color: "#000000" },
  { name: "Tailwind CSS", category: "Frontend", abbr: "TW", color: "#38BDF8" },
  { name: "Bootstrap", category: "Frontend", abbr: "BS", color: "#7952B3" },

  // Backend
  { name: "Node.js", category: "Backend", abbr: "ND", color: "#339933" },
  { name: "Express.js", category: "Backend", abbr: "EX", color: "#404D59" },
  { name: "REST APIs", category: "Backend", abbr: "API", color: "#00ACC1" },
  { name: "GraphQL", category: "Backend", abbr: "GQL", color: "#E10098" },
  { name: "JWT", category: "Backend", abbr: "JWT", color: "#F59E0B" },
  { name: "Clerk", category: "Backend", abbr: "CK", color: "#6C47FF" },
  { name: "OpenAI API", category: "Backend", abbr: "AI", color: "#10A37F" },

  // Database
  { name: "MongoDB", category: "Database", abbr: "MDB", color: "#47A248" },
  { name: "Mongoose", category: "Database", abbr: "MGS", color: "#880000" },
  { name: "SQL", category: "Database", abbr: "SQL", color: "#336791" },

  // Cloud
  { name: "AWS", category: "Cloud", abbr: "AWS", color: "#FF9900" },
  { name: "Docker", category: "Cloud", abbr: "DK", color: "#2496ED" },
  { name: "Kubernetes", category: "Cloud", abbr: "K8S", color: "#326CE5" },
  { name: "Vercel", category: "Cloud", abbr: "V", color: "#000000" },

  // Programming Languages
  { name: "Java", category: "Programming", abbr: "J", color: "#F89820" },
  { name: "Python", category: "Programming", abbr: "PY", color: "#3776AB" },
  { name: "C", category: "Programming", abbr: "C", color: "#00599C" },

  // Tools
  { name: "Git", category: "Tools", abbr: "GIT", color: "#F05032" },
  { name: "GitHub", category: "Tools", abbr: "GH", color: "#181717" },
  { name: "VS Code", category: "Tools", abbr: "VS", color: "#007ACC" },
  { name: "Postman", category: "Tools", abbr: "PM", color: "#FF6C37" },
  { name: "Jenkins", category: "Tools", abbr: "JK", color: "#D24939" },
  { name: "Linux", category: "Tools", abbr: "LX", color: "#FCC624" },
  { name: "Ubuntu", category: "Tools", abbr: "UB", color: "#E95420" },
];
