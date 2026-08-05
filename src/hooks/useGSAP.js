import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Generic hook: pass a callback that receives (gsap, ScrollTrigger) and a ref-scoped container
export function useGSAP(callback, deps = []) {
  const scope = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
