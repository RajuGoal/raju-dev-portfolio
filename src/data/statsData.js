// Edit this file — your real numbers here
// You can pull some of these dynamically later (e.g. from projectsData.js / githubConfig.js)

import {
  Rocket,
  Award,
  Wrench,
  Github,
  Briefcase,
  Eye,
  Download,
  GitCommit,
  Clock,
} from "lucide-react";

export const stats = [
  {
    id: "projects",
    label: "Projects",
    value: 5,
    suffix: "+",
    icon: Rocket,
  },

  {
    id: "certificates",
    label: "Certificates",
    value: 15,
    suffix: "+",
    icon: Award,
  },

  {
    id: "skills",
    label: "Skills",
    value: 30,
    suffix: "+",
    icon: Wrench,
  },

  {
    id: "repos",
    label: "GitHub Repos",
    value: 10,
    suffix: "+",
    icon: Github,
  },

  {
    id: "experience",
    label: "Experience",
    value: 2,
    suffix: " yrs",
    icon: Briefcase,
  },

  {
    id: "visitors",
    label: "Visitors",
    value: 0,
    suffix: "+",
    icon: Eye,
  },

  {
    id: "downloads",
    label: "Resume Downloads",
    value: 0,
    suffix: "+",
    icon: Download,
  },

  {
    id: "commits",
    label: "Commits",
    value: 500,
    suffix: "+",
    icon: GitCommit,
  },

  {
    id: "codingHours",
    label: "Coding Hours",
    value: 1200,
    suffix: "+",
    icon: Clock,
  },
];
