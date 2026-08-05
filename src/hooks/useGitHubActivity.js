import { useState, useEffect } from "react";
import { GITHUB_USERNAME } from "../data/githubConfig";

const EVENT_LABELS = {
  PushEvent: "pushed to",
  PullRequestEvent: "opened a pull request in",
  IssuesEvent: "opened an issue in",
  CreateEvent: "created",
  ForkEvent: "forked",
  WatchEvent: "starred",
  IssueCommentEvent: "commented on",
};

export function useGitHubActivity() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
    )
      .then((res) => res.json())
      .then((events) => {
        if (cancelled) return;
        const parsed = events
          .filter((e) => EVENT_LABELS[e.type])
          .slice(0, 8)
          .map((e) => ({
            id: e.id,
            type: e.type,
            label: EVENT_LABELS[e.type],
            repo: e.repo.name,
            date: e.created_at,
          }));
        setActivity(parsed);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return { activity, loading };
}
