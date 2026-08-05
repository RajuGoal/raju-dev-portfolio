// Edit this file — put your actual PDF files in /public/resume/

export const resumeVersions = [
  {
    id: "standard",
    label: "Standard",
    description:
      "Professional recruiter-friendly resume highlighting education, internships, projects, technical skills, and certifications.",
    file: "/resume/resume-standard.pdf",
    icon: "📄",
  },
  {
    id: "ats",
    label: "ATS-Optimized",
    description:
      "ATS-friendly resume with optimized keywords for Software Developer, Full-Stack Developer, and Backend Developer roles.",
    file: "/resume/resume-ats.pdf",
    icon: "🤖",
  },
  {
    id: "design",
    label: "Designer Version",
    description:
      "Modern visually designed resume featuring projects, skills, coding profiles, and certifications.",
    file: "/resume/resume-design.pdf",
    icon: "🎨",
  },
  {
    id: "onepage",
    label: "One-Page Summary",
    description:
      "Concise one-page resume ideal for internships, campus placements, and quick recruiter screening.",
    file: "/resume/resume-onepage.pdf",
    icon: "📃",
  },
];

// Used by the Interactive Resume tab — same content as your resume, but structured as data

export const interactiveResume = {
  summary:
    "Computer Science and Engineering student (7th Semester) with a CGPA of 8.14 at Aditya College of Engineering and Technology. Passionate Full-Stack Developer experienced in building scalable web applications, AI-powered solutions, and modern responsive websites using React, Next.js, Node.js, Express.js, MongoDB, Java, and JavaScript.",

  experience: [
    {
      role: "Web Development & Cloud Integration Intern",
      company: "SkillDzire, AICTE & REDUCANO (APSCHE Collaboration)",
      period: "Apr 2026 — Jun 2026",
      points: [
        "Successfully completed a short-term internship in Web Development & Cloud Integration.",
        "Built responsive web applications using modern frontend and backend technologies.",
        "Learned cloud deployment concepts and cloud integration techniques.",
        "Worked on real-world project-based learning and collaborative development.",
      ],
    },

    {
      role: "Web Development Intern",
      company: "SkillDzire",
      period: "May 2025 — Jul 2025",
      points: [
        "Completed hands-on internship in Web Development.",
        "Developed responsive websites using HTML, CSS, JavaScript, and modern web technologies.",
        "Strengthened frontend and backend development fundamentals.",
      ],
    },
  ],

  education: [
    {
      degree: "B.Tech, Computer Science and Engineering",
      institute: "Aditya College of Engineering and Technology (JNTUK)",
      period: "2023 — 2027",
      details: "Current CGPA: 8.14 / 10 | Currently in 7th Semester",
    },
  ],

  skills: [
    "Java",
    "JavaScript",
    "Python",
    "C",
    "SQL",
    "HTML5",
    "CSS3",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "Tailwind CSS",
    "Bootstrap",
    "REST APIs",
    "GraphQL",
    "Git",
    "GitHub",
    "Docker",
    "Jenkins",
    "Kubernetes",
    "AWS (EC2, S3, IAM)",
    "Postman",
    "Linux",
    "Ubuntu",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
  ],
};
