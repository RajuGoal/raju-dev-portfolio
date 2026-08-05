import { useState, useEffect } from "react";
import { GITHUB_USERNAME } from "../data/githubConfig";

// Fetches user profile + repos + aggregates stars/forks/languages
export function useGitHubStats() {
  const [data, setData] = useState({
    user: null,
    repos: [],
    languages: {},
    totalStars: 0,
    totalForks: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos = await reposRes.json();

        const languages = {};
        let totalStars = 0;
        let totalForks = 0;

        repos.forEach((r) => {
          totalStars += r.stargazers_count;
          totalForks += r.forks_count;
          if (r.language) {
            languages[r.language] = (languages[r.language] || 0) + 1;
          }
        });

        if (!cancelled) {
          setData({
            user,
            repos,
            languages,
            totalStars,
            totalForks,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
