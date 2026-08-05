import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem("a11y-high-contrast") === "true"
  );
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem("a11y-reduced-motion");
    if (saved !== null) return saved === "true";
    // Default to OS preference if user hasn't chosen explicitly
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [fontScale, setFontScale] = useState(
    () => Number(localStorage.getItem("a11y-font-scale")) || 1
  );

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-high-contrast", highContrast ? "on" : "off");
    root.setAttribute("data-reduced-motion", reducedMotion ? "on" : "off");
    root.style.setProperty("--font-scale", fontScale);
    localStorage.setItem("a11y-high-contrast", String(highContrast));
    localStorage.setItem("a11y-reduced-motion", String(reducedMotion));
    localStorage.setItem("a11y-font-scale", String(fontScale));
  }, [highContrast, reducedMotion, fontScale]);

  return (
    <AccessibilityContext.Provider
      value={{ highContrast, setHighContrast, reducedMotion, setReducedMotion, fontScale, setFontScale }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used inside AccessibilityProvider");
  return ctx;
}