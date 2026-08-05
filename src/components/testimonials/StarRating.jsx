import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-amber-400" : "text-slate-700"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}