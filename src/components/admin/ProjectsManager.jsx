import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminProjects } from "../../hooks/useAdminProjects";
import ProjectForm from "./ProjectForm";

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject } = useAdminProjects();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (data) => {
    if (editing) updateProject(editing.id, data);
    else addProject(data);
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-100">Projects ({projects.length})</h3>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-sm font-bold hover:bg-amber-300"
        >
          <Plus size={15} /> Add Project
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">{p.title}</p>
              <p className="text-xs text-slate-500">{p.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setEditing(p); setShowForm(true); }}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => confirm(`Delete "${p.title}"?`) && deleteProject(p.id)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProjectForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}