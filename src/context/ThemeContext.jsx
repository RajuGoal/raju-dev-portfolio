import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const ACCENT_PRESETS = [
  { name: "Amber", value: "#f59e0b" },
  { name: "Cyan", value: "#22d3ee" },
  { name: "Violet", value: "#a78bfa" },
  { name: "Emerald", value: "#34d399" },
  { name: "Rose", value: "#fb7185" },
  { name: "Blue", value: "#60a5fa" },
];

function getInitialMode() {
  const saved = localStorage.getItem("theme-mode");
  if (saved === "dark" || saved === "light") return saved;
  // "auto" — fall back to OS preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme-mode") || "auto"
  );
  const [resolvedMode, setResolvedMode] = useState(getInitialMode);
  const [accent, setAccent] = useState(
    () => localStorage.getItem("theme-accent") || ACCENT_PRESETS[0].value
  );
  const [glass, setGlass] = useState(
    () => localStorage.getItem("theme-glass") === "true"
  );

  // Resolve "auto" against OS preference, and listen for OS changes live
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function apply() {
      const effective =
        mode === "auto" ? (mq.matches ? "dark" : "light") : mode;
      setResolvedMode(effective);
    }

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mode]);

  // Push values onto <html> as data attributes / CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedMode);
    root.setAttribute("data-glass", glass ? "on" : "off");
    root.style.setProperty("--accent", accent);
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-accent", accent);
    localStorage.setItem("theme-glass", String(glass));
  }, [mode, resolvedMode, accent, glass]);

  const value = {
    mode, // "auto" | "dark" | "light" (user's selection)
    resolvedMode, // "dark" | "light" (actual applied)
    setMode,
    accent,
    setAccent,
    accentPresets: ACCENT_PRESETS,
    glass,
    setGlass,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}