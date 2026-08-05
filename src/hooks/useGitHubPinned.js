import { useState, useEffect } from "react";
import { GITHUB_USERNAME } from "../data/githubConfig";

// Uses a community API to fetch pinned repos (GitHub has no official public endpoint for this)
export function useGitHubPinned() {
  const [pinned, setPinned] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setPinned(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return { pinned, loading };
}
