import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const OPTIONS = [
  { id: "light", icon: Sun, label: "Light" },
  { id: "auto", icon: Monitor, label: "Auto" },
  { id: "dark", icon: Moon, label: "Dark" },
];

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full glass-surface">
      {OPTIONS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setMode(id)}
          title={label}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            mode === id
              ? "bg-accent text-slate-900"
              : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
          }`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}