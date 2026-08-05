// Every skill shown in the Skills section. `proficiency` drives the circular
// progress ring (0-100). `years` and `note` show on the card's hover flip.

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "DevOps",
  "Programming",
  "Tools",
  "AI",
];

export const skills = [
  // ===========================
  // Frontend
  // ===========================

  {
    name: "HTML5",
    category: "Frontend",
    proficiency: 95,
    years: 2,
    note: "Semantic HTML, accessibility, responsive web structure.",
  },
  {
    name: "CSS3",
    category: "Frontend",
    proficiency: 92,
    years: 2,
    note: "Responsive layouts, Flexbox, Grid, animations.",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    proficiency: 90,
    years: 2,
    note: "ES6+, DOM manipulation, asynchronous programming.",
  },
  {
    name: "React.js",
    category: "Frontend",
    proficiency: 88,
    years: 2,
    note: "Hooks, reusable components, state management.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    proficiency: 85,
    years: 1,
    note: "App Router, SSR, API Routes, authentication.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: 90,
    years: 1,
    note: "Responsive UI development and modern styling.",
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    proficiency: 85,
    years: 2,
    note: "Responsive components and layout design.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    proficiency: 70,
    years: 1,
    note: "Type-safe React and Next.js development.",
  },

  // ===========================
  // Backend
  // ===========================

  {
    name: "Node.js",
    category: "Backend",
    proficiency: 88,
    years: 2,
    note: "Backend APIs, middleware, authentication, server development.",
  },
  {
    name: "Express.js",
    category: "Backend",
    proficiency: 90,
    years: 2,
    note: "RESTful APIs, routing, middleware, authentication.",
  },
  {
    name: "REST APIs",
    category: "Backend",
    proficiency: 88,
    years: 2,
    note: "API design, CRUD operations, authentication.",
  },
  {
    name: "GraphQL",
    category: "Backend",
    proficiency: 65,
    years: 1,
    note: "Basic GraphQL queries and API integration.",
  },
  {
    name: "JWT Authentication",
    category: "Backend",
    proficiency: 82,
    years: 1,
    note: "Secure authentication using JSON Web Tokens.",
  },
  {
    name: "Clerk Authentication",
    category: "Backend",
    proficiency: 78,
    years: 1,
    note: "Authentication and user management in Next.js.",
  },

  // ===========================
  // Database
  // ===========================

  {
    name: "MongoDB",
    category: "Database",
    proficiency: 88,
    years: 2,
    note: "Collections, schema design, aggregation, CRUD operations.",
  },
  {
    name: "Mongoose",
    category: "Database",
    proficiency: 86,
    years: 2,
    note: "ODM modeling, validation, schema relationships.",
  },
  {
    name: "SQL",
    category: "Database",
    proficiency: 82,
    years: 2,
    note: "Queries, joins, normalization, relational databases.",
  },

  // ===========================
  // Cloud
  // ===========================

  {
    name: "AWS",
    category: "Cloud",
    proficiency: 72,
    years: 1,
    note: "EC2, S3, IAM fundamentals and deployment.",
  },
  {
    name: "Vercel",
    category: "Cloud",
    proficiency: 90,
    years: 1,
    note: "Deploying React and Next.js applications.",
  },

  // ===========================
  // DevOps
  // ===========================

  {
    name: "Docker",
    category: "DevOps",
    proficiency: 75,
    years: 1,
    note: "Containerizing Node.js and React applications.",
  },
  {
    name: "Jenkins",
    category: "DevOps",
    proficiency: 72,
    years: 1,
    note: "Basic CI/CD pipeline creation and automation.",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    proficiency: 65,
    years: 1,
    note: "Container orchestration fundamentals.",
  },

  // ===========================
  // Programming
  // ===========================

  {
    name: "Java",
    category: "Programming",
    proficiency: 88,
    years: 2,
    note: "Object-Oriented Programming, collections, problem solving.",
  },
  {
    name: "Python",
    category: "Programming",
    proficiency: 82,
    years: 2,
    note: "Automation, scripting, data processing.",
  },
  {
    name: "C",
    category: "Programming",
    proficiency: 75,
    years: 2,
    note: "Programming fundamentals and algorithms.",
  },

  // ===========================
  // Tools
  // ===========================

  {
    name: "Git",
    category: "Tools",
    proficiency: 90,
    years: 2,
    note: "Version control, branching, merging, collaboration.",
  },
  {
    name: "GitHub",
    category: "Tools",
    proficiency: 90,
    years: 2,
    note: "Repository management and collaborative development.",
  },
  {
    name: "VS Code",
    category: "Tools",
    proficiency: 95,
    years: 2,
    note: "Primary IDE with extensions and debugging tools.",
  },
  {
    name: "Postman",
    category: "Tools",
    proficiency: 85,
    years: 2,
    note: "API testing and debugging.",
  },
  {
    name: "Linux",
    category: "Tools",
    proficiency: 78,
    years: 1,
    note: "Ubuntu, terminal commands, server management.",
  },

  // ===========================
  // AI
  // ===========================

  {
    name: "OpenAI API",
    category: "AI",
    proficiency: 82,
    years: 1,
    note: "Integrated AI chat functionality into Next.js applications.",
  },
  {
    name: "Prompt Engineering",
    category: "AI",
    proficiency: 85,
    years: 1,
    note: "Designing structured prompts for reliable AI responses.",
  },
  {
    name: "AI Application Development",
    category: "AI",
    proficiency: 80,
    years: 1,
    note: "Building AI-powered web applications using modern LLM APIs.",
  },
];
