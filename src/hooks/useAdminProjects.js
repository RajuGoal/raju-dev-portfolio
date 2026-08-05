import { useState, useEffect } from "react";
import { projects as defaultProjects } from "../data/projectsData";

const STORAGE_KEY = "admin-projects";

export function useAdminProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setProjects(stored ? JSON.parse(stored) : defaultProjects);
  }, []);

  const persist = (next) => {
    setProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addProject = (project) => {
    persist([
      ...projects,
      { ...project, id: project.id || crypto.randomUUID() },
    ]);
  };

  const updateProject = (id, updates) => {
    persist(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id) => {
    persist(projects.filter((p) => p.id !== id));
  };

  return { projects, addProject, updateProject, deleteProject };
}
