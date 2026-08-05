// Edit this file — add/remove projects here.
// Put images in /public/projects/ and reference them like "/projects/yourimage.jpg"

export const projectCategories = ["All", "Web App", "AI/ML", "Frontend"];

export const projects = [
  {
    id: "deepseek",
    title: "DeepSeek AI Chat Application",
    category: "AI/ML",
    cover: "/projects/deepseek-cover.png",
    summary:
      "An AI-powered chat application built with Next.js, Clerk Authentication, MongoDB, and OpenAI API.",
    description:
      "DeepSeek is an intelligent AI chat application that provides real-time conversational responses using the OpenAI API. It features secure user authentication with Clerk, stores chat history in MongoDB, supports Markdown rendering with syntax highlighting, and offers a modern responsive user interface built with Next.js and Tailwind CSS.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "OpenAI API",
      "Clerk Authentication",
    ],
    githubUrl: "https://github.com/RajuGoal",
    liveUrl: "",
    docsUrl: "",
    videoUrl: "",
    screenshots: [
      "/projects/deepseek-1.png",
      "/projects/deepseek-2.png",
      "/projects/deepseek-3.png",
    ],
    features: [
      "Secure Clerk Authentication",
      "AI-powered conversations using OpenAI API",
      "Markdown & Code Syntax Highlighting",
      "MongoDB Chat History Storage",
      "Responsive Modern UI",
      "Real-time Chat Experience",
    ],
    architecture:
      "Next.js frontend communicates with server-side API routes. Clerk handles authentication, MongoDB stores conversations, Mongoose manages database models, and OpenAI API generates AI responses.",
    stats: {
      views: 0,
      likes: 0,
      downloads: 0,
      bookmarks: 0,
    },
    date: "2026-07",
    featured: true,
  },

  {
    id: "school-management-system",
    title: "School Management System",
    category: "Web App",
    cover: "/projects/school-management-cover.png",
    summary:
      "A full-stack School Management System for managing students, teachers, attendance, and academic records.",
    description:
      "A complete school administration platform developed using React, Node.js, Express.js, and MongoDB. It includes authentication, role-based dashboards, attendance management, student records, teacher management, and academic data handling.",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Material UI",
      "React Router",
      "Axios",
    ],
    githubUrl: "https://github.com/RajuGoal",
    liveUrl: "",
    docsUrl: "",
    videoUrl: "",
    screenshots: [
      "/projects/school-1.png",
      "/projects/school-2.png",
      "/projects/school-3.png",
    ],
    features: [
      "Student Management",
      "Teacher Management",
      "Attendance Management",
      "Academic Record Management",
      "Role-based Authentication",
      "Responsive Dashboard",
    ],
    architecture:
      "React frontend communicates with an Express REST API. MongoDB stores application data, JWT provides authentication, and Material UI is used for responsive interface components.",
    stats: {
      views: 0,
      likes: 0,
      downloads: 0,
      bookmarks: 0,
    },
    date: "2026-06",
    featured: true,
  },

  {
    id: "portfolio",
    title: "Developer Portfolio",
    category: "Frontend",
    cover: "/projects/portfolio-cover.png",
    summary:
      "A modern responsive portfolio website showcasing projects, skills, certifications, and coding profiles.",
    description:
      "A fully responsive developer portfolio built using HTML, CSS, and JavaScript. It features dark/light mode, project showcase, certifications, coding profiles, smooth animations, and a contact form integrated with Formspree.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Formspree"],
    githubUrl: "https://github.com/RajuGoal",
    liveUrl: "https://rajukushwaha-linkdin.netlify.app",
    docsUrl: "",
    videoUrl: "",
    screenshots: [
      "/projects/portfolio-1.png",
      "/projects/portfolio-2.png",
      "/projects/portfolio-3.png",
    ],
    features: [
      "Responsive Design",
      "Dark & Light Mode",
      "Contact Form with Formspree",
      "Project Showcase",
      "Certification Section",
      "Smooth Animations",
    ],
    architecture:
      "Static frontend website built with HTML, CSS, and JavaScript. Formspree is used for contact form submission and Netlify is used for deployment.",
    stats: {
      views: 0,
      likes: 0,
      downloads: 0,
      bookmarks: 0,
    },
    date: "2026-08",
    featured: true,
  },

  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    category: "Frontend",
    cover: "/projects/qr-cover.png",
    summary:
      "A responsive web application that instantly generates QR codes from text and URLs.",
    description:
      "A lightweight QR Code Generator developed using HTML, CSS, and JavaScript. Users can generate QR codes instantly for text, URLs, and other information through an intuitive interface.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/RajuGoal",
    liveUrl: "",
    docsUrl: "",
    videoUrl: "",
    screenshots: ["/projects/qr-1.png", "/projects/qr-2.png"],
    features: [
      "Instant QR Code Generation",
      "Responsive Interface",
      "Fast Processing",
      "Simple User Experience",
    ],
    architecture:
      "Pure frontend application using HTML, CSS, and JavaScript with a QR code generation library for real-time QR code creation.",
    stats: {
      views: 0,
      likes: 0,
      downloads: 0,
      bookmarks: 0,
    },
    date: "2025-10",
    featured: false,
  },

  {
    id: "javascript-dom-event-handling",
    title: "JavaScript DOM Event Handling Project",
    category: "Frontend",
    cover: "/projects/dom-cover.png",
    summary:
      "An interactive JavaScript project demonstrating DOM manipulation and event handling.",
    description:
      "A collection of interactive examples built using HTML, CSS, and JavaScript to demonstrate DOM manipulation, mouse events, keyboard events, form validation, animations, and dynamic user interface updates.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/RajuGoal",
    liveUrl: "",
    docsUrl: "",
    videoUrl: "",
    screenshots: ["/projects/dom-1.png", "/projects/dom-2.png"],
    features: [
      "DOM Manipulation",
      "Keyboard Events",
      "Mouse Events",
      "Form Validation",
      "Animations",
      "Dynamic UI Updates",
    ],
    architecture:
      "Pure client-side JavaScript application demonstrating various DOM APIs, browser events, and interactive UI techniques without external frameworks.",
    stats: {
      views: 0,
      likes: 0,
      downloads: 0,
      bookmarks: 0,
    },
    date: "2025-09",
    featured: false,
  },
];
