import { useEffect, useRef, useState } from "react";

// Custom cursor: dot + trailing ring, grows on hoverable elements
export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  // Hide the real system cursor only while this component is mounted,
  // and restore it automatically when it unmounts (e.g. leaving to /admin)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    function handleMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    }

    function handleOver(e) {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    }

    let raf;
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-400 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-amber-400/60 -translate-x-1/2 -translate-y-1/2
                    transition-all duration-200 ease-out
                    ${hovering ? "w-10 h-10 border-amber-400 bg-amber-400/10" : "w-6 h-6"}`}
      />
    </div>
  );
}