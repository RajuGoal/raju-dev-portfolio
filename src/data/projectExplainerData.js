// Edit this — one detailed knowledge entry per project.
// This is what answers questions like "Explain DeepSeek" instantly, no AI needed.

export const projectExplanations = {
  deepseek: {
    name: "DeepSeek AI Chat Application",
    aliases: [
      "deepseek",
      "deepseek ai",
      "ai chat",
      "chat application",
      "chatbot",
    ],
    summary:
      "A full-stack AI-powered chat application built using Next.js, MongoDB, Clerk Authentication, and OpenAI API.",

    whatItDoes:
      "DeepSeek allows authenticated users to interact with an AI assistant in real time. Users can ask questions, generate code, receive Markdown-formatted responses, and securely manage conversations through an intuitive and responsive interface.",

    architecture:
      "The application is built using Next.js 15 with React and TypeScript on the frontend. Clerk handles user authentication, while the backend uses Next.js API Routes integrated with MongoDB through Mongoose. OpenAI API powers AI-generated responses. Tailwind CSS provides responsive UI styling, and PrismJS enables syntax highlighting for code blocks.",

    databaseDesign:
      "MongoDB stores user accounts, chat conversations, and AI response history. Mongoose schemas define collections for users and conversations, making it easy to retrieve previous chats while maintaining scalable document-based storage.",

    keyDecisions: [
      "Used Next.js for both frontend and backend to simplify project architecture.",
      "Integrated Clerk Authentication instead of building a custom authentication system.",
      "Selected MongoDB because chat conversations have flexible document structures.",
      "Implemented Markdown rendering and PrismJS for better AI code responses.",
      "Used Tailwind CSS for a modern, responsive, and maintainable UI.",
    ],

    challenges:
      "The biggest challenge was integrating AI responses while maintaining secure authentication and storing chat history efficiently in MongoDB. Proper error handling and response formatting were also essential for a smooth user experience.",
  },

  schoolmanagement: {
    name: "School Management System",
    aliases: [
      "school management",
      "school system",
      "student management",
      "sms",
    ],

    summary:
      "A complete full-stack school management platform for managing students, teachers, attendance, and academic records.",

    whatItDoes:
      "The system enables administrators to manage students, teachers, attendance, classes, and academic records. Secure authentication ensures only authorized users can access administrative features.",

    architecture:
      "The frontend is developed using React with Material UI and React Router. The backend uses Node.js and Express.js with REST APIs. MongoDB stores all application data, while JWT provides secure authentication and authorization.",

    databaseDesign:
      "MongoDB collections store students, teachers, attendance records, academic information, and user accounts. Relationships are maintained using ObjectIds, making the application scalable and efficient.",

    keyDecisions: [
      "Used React for a dynamic and responsive frontend.",
      "Implemented JWT authentication for secure login.",
      "Selected MongoDB for flexible student and academic record management.",
      "Designed REST APIs for communication between frontend and backend.",
      "Used Material UI to provide a professional interface.",
    ],

    challenges:
      "Managing multiple user roles and implementing secure CRUD operations while maintaining data consistency across different modules was the most challenging part of the project.",
  },

  portfolio: {
    name: "Personal Portfolio",

    aliases: ["portfolio", "personal portfolio", "website"],

    summary:
      "A responsive portfolio website showcasing projects, certifications, coding profiles, and technical skills.",

    whatItDoes:
      "The portfolio introduces me professionally, displays my projects, highlights technical skills, certifications, coding profiles, and provides a contact form for recruiters and clients.",

    architecture:
      "The website is built using HTML5, CSS3, and JavaScript. Formspree handles contact form submissions without requiring a backend server. The website is deployed on Netlify.",

    databaseDesign:
      "This project does not use a database because it is a static portfolio website.",

    keyDecisions: [
      "Used a lightweight frontend-only architecture.",
      "Integrated Formspree instead of creating a backend.",
      "Optimized the website for responsiveness and fast loading.",
      "Designed an ATS-friendly portfolio suitable for recruiters.",
    ],

    challenges:
      "Designing a professional user interface while maintaining fast loading speed and responsiveness across different devices.",
  },

  qrcode: {
    name: "QR Code Generator",

    aliases: ["qr code", "qr generator", "qr"],

    summary:
      "A web application that instantly generates QR codes from user input.",

    whatItDoes:
      "Users can enter text or URLs and instantly generate downloadable QR codes.",

    architecture:
      "Built using HTML5, CSS3, and Vanilla JavaScript with a QR Code generation library.",

    databaseDesign:
      "No database is required because QR codes are generated entirely on the client side.",

    keyDecisions: [
      "Implemented client-side QR generation for better performance.",
      "Created a responsive interface.",
      "Kept the project lightweight without requiring a backend.",
    ],

    challenges:
      "Handling different input formats while ensuring generated QR codes remain accurate and scannable.",
  },

  javascriptdom: {
    name: "JavaScript DOM Event Handling Project",

    aliases: ["dom project", "javascript dom", "event handling"],

    summary:
      "A collection of interactive JavaScript examples demonstrating DOM manipulation and event handling.",

    whatItDoes:
      "The project demonstrates DOM selection, event listeners, animations, keyboard events, mouse events, dynamic content updates, and form validation using vanilla JavaScript.",

    architecture:
      "Pure frontend application built with HTML5, CSS3, and JavaScript without any frameworks.",

    databaseDesign:
      "No database is required because all functionality runs entirely in the browser.",

    keyDecisions: [
      "Focused on learning JavaScript fundamentals.",
      "Used pure JavaScript instead of frameworks.",
      "Implemented reusable event handling examples.",
    ],

    challenges:
      "Managing multiple event listeners efficiently while keeping the code organized and easy to understand.",
  },
};

// Generic architecture/database explanations that apply across projects if asked generally

export const generalExplanations = {
  architecture:
    "Most of my projects follow a modern full-stack architecture using React or Next.js for the frontend, Node.js and Express.js (or Next.js API Routes) for backend services, MongoDB for data storage, and REST APIs for communication. Authentication is handled using Clerk or JWT depending on the project.",

  mongodbDesign:
    "I use MongoDB because it provides flexible document-based storage, making it suitable for applications like AI chat systems, school management platforms, and user-based applications. Mongoose schemas are used for validation, relationships, and efficient querying while maintaining scalability.",
};
