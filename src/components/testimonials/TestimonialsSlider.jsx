import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

// Manual slider with dots + arrows + optional autoplay (used on mobile instead of the marquee)
export default function TestimonialsSlider({ testimonials, autoPlay = true, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-full flex justify-center overflow-hidden py-2">
        <div
          key={testimonials[index].id}
          className="animate-fadeInUp"
        >
          <TestimonialCard testimonial={testimonials[index]} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-1.5">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-amber-400" : "w-1.5 bg-slate-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}