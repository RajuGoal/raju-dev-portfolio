import { useState } from "react";
import { Send } from "lucide-react";

export default function CommentSection({ comments, onAdd }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onAdd({ name, text, date: new Date().toISOString() });
    setText("");
  };

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
        Comments ({comments.length})
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Raju Kushwaha"
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm
                     focus:outline-none focus:border-amber-400"
        />
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm
                       focus:outline-none focus:border-amber-400 resize-none"
          />
          <button
            type="submit"
            className="px-4 rounded-lg bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-sm text-slate-500 font-mono">Be the first to comment.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-300 text-xs font-bold flex-shrink-0">
              {c.name[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{c.name}</p>
              <p className="text-sm text-slate-400">{c.text}</p>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                {new Date(c.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}