import { useEffect, useRef } from "react";
import {
  detectDevice,
  detectBrowser,
  detectOS,
  detectCountry,
  getReferralSource,
} from "../lib/analyticsTracker";

// Records ONE session locally (this visitor's own browser) and sends it to your
// backend if configured. Without a backend, it only writes to localStorage —
// meaning you'd only ever see YOUR OWN visits, not real visitor data.
const ANALYTICS_ENDPOINT = "/api/track-visit"; // set this up if you want real cross-visitor data

export function useSessionTracker() {
  const startTime = useRef(Date.now());
  const pagesVisited = useRef(new Set([window.location.pathname]));
  const sent = useRef(false);

  useEffect(() => {
    async function recordSession() {
      const country = await detectCountry();

      const session = {
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        country,
        device: detectDevice(),
        browser: detectBrowser(),
        os: detectOS(),
        referrer: getReferralSource(),
        pagesVisited: Array.from(pagesVisited.current),
      };

      // Local fallback (only visible to you, on this browser)
      const local = JSON.parse(
        localStorage.getItem("analytics-sessions") || "[]",
      );
      local.unshift(session);
      localStorage.setItem(
        "analytics-sessions",
        JSON.stringify(local.slice(0, 200)),
      );

      // Real backend (visible to you, from all visitors) — silently skipped if not deployed
      try {
        await fetch(ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(session),
        });
      } catch {
        // no backend configured — that's fine, local fallback already saved above
      }
    }

    recordSession();

    // Track time spent when the visitor leaves
    function handleUnload() {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      const local = JSON.parse(
        localStorage.getItem("analytics-sessions") || "[]",
      );
      if (local[0]) {
        local[0].timeSpent = timeSpent;
        localStorage.setItem("analytics-sessions", JSON.stringify(local));
      }
      navigator.sendBeacon?.(
        ANALYTICS_ENDPOINT + "/duration",
        JSON.stringify({ timeSpent }),
      );
    }

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
}
