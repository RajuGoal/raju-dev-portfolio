import { useState, useEffect, useRef } from "react";

// Loads an image only when it's about to enter the viewport
export function useLazyImage(src) {
  const ref = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadedSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // start loading 200px before it's visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return [ref, loadedSrc];
}
