import { useState, useCallback } from "react";

// Frontend "soft" rate limiting — stops accidental spam-clicking (e.g. double form submits),
// NOT a real defense against a determined attacker, who can just call your API directly.
// Real rate limiting must happen server-side.
export function useRateLimit(
  action,
  { maxAttempts = 3, windowMs = 60000 } = {},
) {
  const [blocked, setBlocked] = useState(false);

  const attempt = useCallback(
    async (...args) => {
      const key = `ratelimit:${action}`;
      const record = JSON.parse(localStorage.getItem(key) || "[]").filter(
        (t) => Date.now() - t < windowMs,
      );

      if (record.length >= maxAttempts) {
        setBlocked(true);
        setTimeout(() => setBlocked(false), windowMs);
        return { allowed: false };
      }

      record.push(Date.now());
      localStorage.setItem(key, JSON.stringify(record));
      return { allowed: true };
    },
    [action, maxAttempts, windowMs],
  );

  return { attempt, blocked };
}
