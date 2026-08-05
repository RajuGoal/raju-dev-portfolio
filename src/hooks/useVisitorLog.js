import { useState, useEffect } from "react";

const LOG_KEY = "visitor-log";
const MAX_LOGS = 200;

// Call recordVisit() once when your real App mounts (not inside the admin dashboard itself)
export function recordVisit() {
  const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  logs.unshift({
    id: crypto.randomUUID(),
    time: new Date().toISOString(),
    page: window.location.pathname,
    referrer: document.referrer || "direct",
    userAgent: navigator.userAgent,
  });
  localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, MAX_LOGS)));
}

export function useVisitorLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem(LOG_KEY) || "[]"));
  }, []);

  const clearLogs = () => {
    localStorage.removeItem(LOG_KEY);
    setLogs([]);
  };

  return { logs, clearLogs };
}
