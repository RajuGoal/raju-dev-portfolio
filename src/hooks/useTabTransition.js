// src/hooks/useTabTransition.js
import { useState, useCallback } from "react";

export function useTabTransition(initialTab) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchTab = useCallback(
    (tabId) => {
      if (tabId === activeTab) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setIsTransitioning(false);
      }, 150);
    },
    [activeTab],
  );

  return { activeTab, switchTab, isTransitioning };
}
