import { useState, useEffect } from "react";

// Pairs with your Contact form — if using EmailJS only, messages go straight to your inbox
// and never touch this. This hook is useful if you later add a backend inbox instead/also.
const KEY = "contact-messages";

export function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem(KEY) || "[]"));
  }, []);

  const markRead = (id) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, read: true } : m,
    );
    setMessages(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const deleteMessage = (id) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { messages, markRead, deleteMessage };
}
