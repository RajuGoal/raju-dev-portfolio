import { useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

// Auto-scrolling infinite marquee, pauses on hover, supports manual drag/swipe
export default function TestimonialsMarquee({ testimonials }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Duplicate the list so the scroll loop is seamless
  const looped = [...testimonials, ...testimonials];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex w-max"
        style={{
          animation: `marquee 40s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {looped.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}