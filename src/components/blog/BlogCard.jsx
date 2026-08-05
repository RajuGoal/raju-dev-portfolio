import { Eye, Heart, Clock } from "lucide-react";
import TagPill from "./TagPill";

export default function BlogCard({ post, onOpen, index, onTagClick }) {
  const stored = JSON.parse(localStorage.getItem(`blog:${post.id}`) || "{}");

  return (
    <div
      className="group bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden
                 hover:border-amber-400/60 hover:-translate-y-1 transition-all duration-300
                 animate-fadeInUp flex flex-col cursor-pointer"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(post)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-950/70 text-amber-300 text-[10px] font-mono rounded border border-slate-700">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2">{post.excerpt}</p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <TagPill key={t} tag={t} onClick={(tag) => onTagClick?.(tag)} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime} min read
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={12} /> {stored.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} /> {stored.likes || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}