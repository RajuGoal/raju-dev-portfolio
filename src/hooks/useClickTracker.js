import { useEffect } from "react";

// Tracks clicks on anything tagged with data-track="label" — e.g. resume download,
// project links, contact button. Attach data-track="resume_download" to any element.
export function useClickTracker() {
  useEffect(() => {
    function handleClick(e) {
      const el = e.target.closest("[data-track]");
      if (!el) return;

      const label = el.getAttribute("data-track");
      const clicks = JSON.parse(
        localStorage.getItem("analytics-clicks") || "[]",
      );
      clicks.unshift({ label, time: new Date().toISOString() });
      localStorage.setItem(
        "analytics-clicks",
        JSON.stringify(clicks.slice(0, 300)),
      );

      fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      }).catch(() => {});
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
