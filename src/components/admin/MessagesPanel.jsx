import { Trash2, Mail, MailOpen } from "lucide-react";
import { useMessages } from "../../hooks/useMessages";

export default function MessagesPanel() {
  const { messages, markRead, deleteMessage } = useMessages();

  if (messages.length === 0) {
    return (
      <p className="text-slate-500 font-mono text-sm">
        No stored messages. (If you're using EmailJS, messages go straight to your inbox and won't appear here.)
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {messages.map((m) => (
        <div
          key={m.id}
          onClick={() => markRead(m.id)}
          className="flex items-start justify-between bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 cursor-pointer"
        >
          <div className="flex gap-3">
            {m.read ? <MailOpen size={16} className="text-slate-500 mt-0.5" /> : <Mail size={16} className="text-amber-400 mt-0.5" />}
            <div>
              <p className="text-sm font-semibold text-slate-200">{m.name} · {m.email}</p>
              <p className="text-sm text-slate-400">{m.message}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); deleteMessage(m.id); }}
            className="text-slate-500 hover:text-red-400 flex-shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}