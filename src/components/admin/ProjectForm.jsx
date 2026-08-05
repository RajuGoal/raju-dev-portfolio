import { useState } from "react";
import { X } from "lucide-react";

const EMPTY = {
  title: "", category: "Web App", cover: "", summary: "", description: "",
  techStack: "", githubUrl: "", liveUrl: "", docsUrl: "",
};

export default function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, techStack: initial.techStack?.join(", ") || "" }
      : EMPTY
  );

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      stats: initial?.stats || { views: 0, likes: 0, downloads: 0, bookmarks: 0 },
      screenshots: initial?.screenshots || [],
      features: initial?.features || [],
      architecture: initial?.architecture || "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col gap-3"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-100">{initial ? "Edit Project" : "Add Project"}</h3>
          <button type="button" onClick={onCancel} className="text-slate-400 hover:text-amber-300">
            <X size={18} />
          </button>
        </div>

        {[
          ["title", "Title"], ["cover", "Cover Image URL"], ["summary", "Short Summary"],
          ["description", "Full Description"], ["techStack", "Tech Stack (comma-separated)"],
          ["githubUrl", "GitHub URL"], ["liveUrl", "Live Demo URL"], ["docsUrl", "Docs URL"],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col gap-1">
            <label className="text-xs font-mono text-slate-500 uppercase">{label}</label>
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono text-slate-500 uppercase">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
          >
            {["Web App", "Mobile", "AI/ML", "Open Source"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="mt-2 px-4 py-2.5 rounded-lg bg-amber-400 text-slate-900 font-bold text-sm hover:bg-amber-300">
          Save Project
        </button>
      </form>
    </div>
  );
}