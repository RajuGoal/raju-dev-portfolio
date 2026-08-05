import { useState, useEffect } from "react";
import { registerSW } from "virtual:pwa-register";

// Prompts the user when a new version of the site is available
// (works together with vite-plugin-pwa's autoUpdate from vite.config.js)
export function usePWAUpdate() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);

  useEffect(() => {
    const update = registerSW({
      onNeedRefresh: () => setNeedsRefresh(true),
      onOfflineReady: () => console.log("App ready to work offline"),
    });
    setUpdateSW(() => update);
  }, []);

  return { needsRefresh, applyUpdate: () => updateSW?.(true) };
}
