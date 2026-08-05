import { useState, useRef, useEffect } from "react";
import { Accessibility, Contrast, Zap, Type, X } from "lucide-react";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const {
    highContrast, setHighContrast,
    reducedMotion, setReducedMotion,
    fontScale, setFontScale,
  } = useAccessibility();

  // Close on outside click or Escape
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-haspopup="true"
        className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 transition-colors"
      >
        <Accessibility size={18} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Accessibility settings"
          className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col gap-4 shadow-xl z-50"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Accessibility</h3>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          {/* High Contrast */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2 text-sm text-slate-300">
              <Contrast size={15} /> High Contrast
            </span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-4 h-4 accent-amber-400"
            />
          </label>

          {/* Reduced Motion */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2 text-sm text-slate-300">
              <Zap size={15} /> Reduce Motion
            </span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 accent-amber-400"
            />
          </label>

          {/* Font Size */}
          <div>
            <span className="flex items-center gap-2 text-sm text-slate-300 mb-2">
              <Type size={15} /> Text Size
            </span>
            <div className="flex gap-2">
              {[
                { label: "A", scale: 1 },
                { label: "A+", scale: 1.15 },
                { label: "A++", scale: 1.3 },
              ].map((opt) => (
                <button
                  key={opt.scale}
                  onClick={() => setFontScale(opt.scale)}
                  aria-pressed={fontScale === opt.scale}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors
                    ${fontScale === opt.scale
                      ? "bg-amber-400 text-slate-900 border-amber-400 font-bold"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-400/50"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}