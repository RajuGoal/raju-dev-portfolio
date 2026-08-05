// Central knowledge base for the AI Assistant.
// Edit this file to update what the assistant knows — no other file needs to change.

export const person = {
  name: "Raju Kushwaha",
  title: "Full-Stack Developer",
  bio: "Raju Kushwaha is a Computer Science and Engineering student (7th Semester) at Aditya College of Engineering and Technology with a CGPA of 8.14. He specializes in Full-Stack Web Development, Backend Development, and AI-powered applications. Passionate about building scalable, user-friendly web applications, he enjoys solving real-world problems using modern technologies and continuously improving his software development skills.",
  location: "Surampalem, Andhra Pradesh, India",
  yearsExperience: 2,
};

export const skills = {
  frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "TypeScript",
  ],

  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "JWT Authentication",
    "Clerk Authentication",
    "OpenAI API",
    "GraphQL",
  ],

  programming: ["Java", "Python", "JavaScript", "C", "SQL"],

  tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Docker",
    "Postman",
    "Jenkins",
    "Kubernetes",
    "AWS (EC2, S3, IAM)",
    "Ubuntu",
    "Linux",
    "Vercel",
  ],

  coreSubjects: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
  ],
};

export const projects = [
  {
    id: "deepseek",
    name: "DeepSeek AI Chat Application",
    tagline: "An AI-powered chat platform built with Next.js",
    description:
      "DeepSeek is a modern AI-powered chat application that enables users to interact with an intelligent assistant through a clean and responsive interface. It features secure authentication using Clerk, MongoDB for data management, Markdown rendering, syntax highlighting for code responses, and seamless integration with the OpenAI API to provide smart conversational experiences.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "OpenAI API",
      "Clerk",
      "Tailwind CSS",
    ],
    links: {
      live: "",
      github: "https://github.com/RajuGoal",
    },
  },

  {
    id: "school-management-system",
    name: "School Management System",
    tagline: "A complete school administration platform",
    description:
      "A full-stack School Management System designed to manage students, teachers, attendance, academic records, and administrative operations. The application provides secure JWT authentication, role-based access control, REST APIs, and MongoDB integration with an intuitive React-based user interface.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Material UI",
      "React Router",
    ],
    links: {
      live: "",
      github: "https://github.com/RajuGoal",
    },
  },

  {
    id: "portfolio",
    name: "Personal Portfolio",
    tagline: "A responsive developer portfolio website",
    description:
      "A modern portfolio website showcasing projects, technical skills, certifications, coding profiles, and professional achievements. It features responsive design, smooth animations, dark/light mode, and an integrated contact form powered by Formspree.",
    stack: ["HTML5", "CSS3", "JavaScript", "Formspree"],
    links: {
      live: "https://rajukushwaha-linkdin.netlify.app",
      github: "https://github.com/RajuGoal",
    },
  },

  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    tagline: "Generate QR codes instantly",
    description:
      "A lightweight web application that instantly generates QR codes from user-provided text or URLs. The project focuses on responsive UI design, JavaScript DOM manipulation, and real-time QR code generation.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    links: {
      live: "",
      github: "https://github.com/RajuGoal",
    },
  },

  {
    id: "javascript-dom-project",
    name: "JavaScript DOM Event Handling Project",
    tagline: "Interactive JavaScript event handling demonstration",
    description:
      "A collection of interactive examples demonstrating JavaScript DOM manipulation, event handling, animations, keyboard events, mouse events, form validation, and dynamic UI updates using vanilla JavaScript.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    links: {
      live: "",
      github: "https://github.com/RajuGoal",
    },
  },
];

export const contact = {
  email: "rajukushwaha4490@gmail.com",
  phone: "+91-8431783540",
  location: "Surampalem, Andhra Pradesh, India",

  resumeUrl: "/resume.pdf",

  socials: {
    portfolio: "https://rajukushwaha-linkdin.netlify.app",
    github: "https://github.com/RajuGoal",
    linkedin: "https://www.linkedin.com/in/raju-kushwaha-667834353",
    hackerrank: "https://www.hackerrank.com/profile/itsme_raju_kuma1",
    leetcode: "https://leetcode.com/u/Raju_Kushwaha/",
    geeksforgeeks:
      "https://www.geeksforgeeks.org/profile/itsmerajukum47q9?tab=activity",
  },
};

// Quick-prompt chips shown in the assistant panel
export const suggestedPrompts = [
  "Tell me about Raju",
  "What projects has he built?",
  "Show his technical skills",
  "Explain DeepSeek AI Chat Application",
  "Explain School Management System",
  "Show certifications",
  "Show coding profiles",
  "How can I contact Raju?",
];
