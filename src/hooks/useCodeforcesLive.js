import { useState, useEffect } from "react";

// Codeforces has a real, official, free public API — this is fully live.
export function useCodeforcesLive(handle) {
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, statusRes] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
          fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
        ]);
        const userData = await userRes.json();
        const statusData = await statusRes.json();

        if (userData.status !== "OK" || cancelled) return;

        const info = userData.result[0];
        const solvedSet = new Set();
        if (statusData.status === "OK") {
          statusData.result.forEach((sub) => {
            if (sub.verdict === "OK") {
              solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
          });
        }

        if (!cancelled) {
          setLive({
            rating: info.rating,
            maxRating: info.maxRating,
            rank: info.rank,
            solved: solvedSet.size,
          });
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { live, loading };
}
