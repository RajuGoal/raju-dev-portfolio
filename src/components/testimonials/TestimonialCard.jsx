import { Quote } from "lucide-react";
import StarRating from "./StarRating";

export default function TestimonialCard({ testimonial }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[380px] bg-slate-900/60 border border-slate-700 rounded-xl p-6
                 flex flex-col gap-4 hover:border-amber-400/60 transition-colors duration-300 mx-3"
    >
      <Quote size={26} className="text-amber-400/50" />

      <p className="text-sm text-slate-300 leading-relaxed line-clamp-5">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/40"
          onError={(e) => {
            e.currentTarget.src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1e293b&color=fbbf24`;
          }}
        />
        <div className="flex-1">
          <p className="font-mono text-sm font-semibold text-slate-100">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}