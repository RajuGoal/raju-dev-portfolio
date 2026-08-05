import { Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function GlassToggle() {
  const { glass, setGlass } = useTheme();

  return (
    <button
      onClick={() => setGlass((g) => !g)}
      title="Toggle glassmorphism"
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono transition-colors glass-surface
        ${glass ? "text-accent" : "text-[color:var(--text-muted)]"}`}
    >
      <Sparkles size={13} />
      Glass
    </button>
  );
}