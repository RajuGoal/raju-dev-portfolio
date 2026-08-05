import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far the user has scrolled through a tall container, as a 0–1
 * value. 0 = container's top just entered the bottom of the viewport,
 * 1 = container's bottom has reached the top of the viewport.
 * Used to drive the timeline spine's animated fill.
 */
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleScroll() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const scrolled = viewportH - rect.top;
      const pct = Math.min(1, Math.max(0, scrolled / total));
      setProgress(pct);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return [ref, progress];
}
