import { useState, useEffect } from "react";

// Uses a popular community wrapper API (unofficial — LeetCode has no public API).
// If it goes down, the component silently falls back to your manual data.
export function useLeetCodeLive(handle) {
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || data.status !== "success") return;
        setLive({
          solved: data.totalSolved,
          totalProblems: data.totalQuestions,
          breakdown: {
            Easy: data.easySolved,
            Medium: data.mediumSolved,
            Hard: data.hardSolved,
          },
          ranking: data.ranking,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { live, loading };
}
