import { useState, useEffect } from "react";
import { ADMIN_PASSWORD } from "../data/adminConfig";

const SESSION_KEY = "admin-session";
const SESSION_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (session && session.expires > Date.now()) {
      setIsAuthed(true);
    }
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ expires: Date.now() + SESSION_DURATION }),
      );
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  };

  return { isAuthed, login, logout };
}
