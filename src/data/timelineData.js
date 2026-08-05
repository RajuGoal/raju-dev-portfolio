// Every entry in the unified timeline. Add/edit freely — order is preserved
// as written (oldest first), and `upcoming: true` renders a dashed "future" node.

export const timelineCategories = {
  education: { label: "Education", color: "#60A5FA" }, // blue
  internship: { label: "Internship", color: "#34D399" }, // emerald
  project: { label: "Project", color: "#FFA94D" }, // amber (brand accent)
  achievement: { label: "Achievement", color: "#F472B6" }, // pink
  certificate: { label: "Certificate", color: "#A78BFA" }, // violet
  goal: { label: "Future Goal", color: "#94A3B8" }, // slate (dashed/upcoming)
};

export const timelineEvents = [
  {
    id: "edu-1",
    category: "education",
    title: "Started B.Tech in Computer Science & Engineering",
    org: "Aditya College of Engineering and Technology (JNTUK)",
    date: "2023",
    description:
      "Began undergraduate studies in Computer Science and Engineering with a focus on software development, programming, and core computer science subjects.",
  },

  {
    id: "intern-1",
    category: "internship",
    title: "Web Development Internship",
    org: "SkillDzire",
    date: "May 2025 - Jul 2025",
    description:
      "Completed a short-term Web Development internship where I built responsive web applications and strengthened frontend and backend development skills.",
  },

  {
    id: "cert-1",
    category: "certificate",
    title: "NPTEL - Design & Implementation of Human-Computer Interfaces",
    org: "IIT Guwahati",
    date: "Oct 2025",
    description:
      "Successfully completed the 12-week NPTEL course and earned an Elite certificate with a score of 60/100.",
  },

  {
    id: "cert-2",
    category: "certificate",
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    org: "Oracle",
    date: "Oct 2025",
    description:
      "Earned Oracle AI Foundations certification covering Artificial Intelligence, Machine Learning, and Oracle Cloud Infrastructure fundamentals.",
  },

  {
    id: "achievement-1",
    category: "achievement",
    title: "Completed Multiple Professional Certifications",
    org: "Oracle, IBM, Forage & LinkedIn Learning",
    date: "Oct 2025",
    description:
      "Completed certifications in AI, Cloud Computing, Cybersecurity, Data Analytics, SQL, DevOps, Java, Python, and Full-Stack Development.",
  },

  {
    id: "intern-2",
    category: "internship",
    title: "Web Development & Cloud Integration Internship",
    org: "SkillDzire, AICTE & APSCHE",
    date: "Apr 2026 - Jun 2026",
    description:
      "Completed a Web Development & Cloud Integration internship focused on cloud technologies, deployment, and modern web application development.",
  },

  {
    id: "project-1",
    category: "project",
    title: "DeepSeek AI Chat Application",
    org: "Personal Project",
    date: "2026",
    description:
      "Built an AI-powered chat application using Next.js, React, MongoDB, Clerk Authentication, and OpenAI API with Markdown rendering and syntax highlighting.",
  },

  {
    id: "project-2",
    category: "project",
    title: "School Management System",
    org: "Academic Project",
    date: "2026",
    description:
      "Developed a full-stack School Management System with React, Express.js, MongoDB, JWT authentication, and role-based access control.",
  },

  {
    id: "project-3",
    category: "project",
    title: "Personal Portfolio Website",
    org: "Personal Project",
    date: "2026",
    description:
      "Designed and developed a responsive developer portfolio showcasing projects, certifications, technical skills, coding profiles, and contact information.",
  },

  {
    id: "project-4",
    category: "project",
    title: "QR Code Generator",
    org: "Personal Project",
    date: "2026",
    description:
      "Created a responsive QR Code Generator using HTML, CSS, and JavaScript with real-time QR generation functionality.",
  },

  {
    id: "edu-2",
    category: "education",
    title: "Currently Pursuing B.Tech (7th Semester)",
    org: "Aditya College of Engineering and Technology (JNTUK)",
    date: "2026",
    description:
      "Currently in the 7th Semester with a CGPA of 8.14, focusing on Full-Stack Development, Cloud Computing, and AI technologies.",
  },

  {
    id: "goal-1",
    category: "goal",
    title: "Graduate with Excellent Academic Performance",
    org: "Future Goal",
    date: "2027",
    description:
      "Complete B.Tech in Computer Science and Engineering while strengthening software engineering and problem-solving skills.",
    upcoming: true,
  },

  {
    id: "goal-2",
    category: "goal",
    title: "Secure a Software Developer / Full-Stack Developer Role",
    org: "Career Goal",
    date: "2027",
    description:
      "Join a leading technology company as a Software Engineer or Full-Stack Developer and contribute to impactful real-world applications.",
    upcoming: true,
  },

  {
    id: "goal-3",
    category: "goal",
    title: "Become an AI & Full-Stack Engineer",
    org: "Long-Term Goal",
    date: "Future",
    description:
      "Continue learning AI, Cloud Computing, and scalable web technologies while contributing to innovative software products and open-source projects.",
    upcoming: true,
  },
];
