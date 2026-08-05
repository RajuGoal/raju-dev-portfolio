import { testimonials } from "../../data/testimonialsData";
import TestimonialsMarquee from "./TestimonialsMarquee";
import TestimonialsSlider from "./TestimonialsSlider";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 px-6 bg-slate-950 overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 12 — TESTIMONIALS 
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          What People Say
        </h2>
      </div>

      {/* Auto-scroll marquee on desktop/tablet */}
      <div className="hidden sm:block">
        <TestimonialsMarquee testimonials={testimonials} />
      </div>

      {/* Manual slider on mobile (marquee is harder to read on narrow screens) */}
      <div className="sm:hidden max-w-sm mx-auto">
        <TestimonialsSlider testimonials={testimonials} />
      </div>
    </section>
  );
}