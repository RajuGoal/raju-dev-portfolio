import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function AccentPicker() {
  const { accent, setAccent, accentPresets } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {accentPresets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => setAccent(preset.value)}
          title={preset.name}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ backgroundColor: preset.value }}
        >
          {accent === preset.value && <Check size={13} className="text-slate-900" />}
        </button>
      ))}

      {/* Custom color picker */}
      <label
        className="w-6 h-6 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer relative overflow-hidden"
        style={{ borderColor: "var(--text-muted)" }}
        title="Custom color"
      >
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
        />
      </label>
    </div>
  );
}