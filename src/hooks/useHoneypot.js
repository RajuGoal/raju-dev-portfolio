import { useState } from "react";

// Basic bot/spam trap — invisible field that only bots fill in.
// Real humans never see or fill it (hidden via CSS, not display:none which some bots detect).
export function useHoneypot() {
  const [honeypot, setHoneypot] = useState("");

  const isBot = honeypot.trim() !== "";

  const HoneypotField = () => (
    <input
      type="text"
      name="website"
      value={honeypot}
      onChange={(e) => setHoneypot(e.target.value)}
      autoComplete="off"
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
      }}
    />
  );

  return { isBot, HoneypotField };
}
