import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { X, Heart, Eye, Clock } from "lucide-react";
import { useBlogEngagement } from "../../hooks/useBlogEngagement";
import TagPill from "./TagPill";
import CommentSection from "./CommentSection";
import "highlight.js/styles/atom-one-dark.css";

export default function BlogPostModal({ post, onClose }) {
  const { views, likes, liked, toggleLike, comments, addComment } = useBlogEngagement(post.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-amber-300 z-10 bg-slate-950/60 rounded-full p-1.5"
        >
          <X size={18} />
        </button>

        <img src={post.cover} alt={post.title} className="w-full h-56 object-cover rounded-t-2xl" />

        <div className="p-6 md:p-8 flex flex-col gap-5">
          <div>
            <p className="text-amber-400 font-mono text-xs tracking-widest mb-1">{post.category}</p>
            <h2 className="text-2xl font-bold text-slate-100 leading-snug">{post.title}</h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono border-y border-slate-800 py-3">
            <span className="flex items-center gap-1">
              <Clock size={13} /> {post.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={13} /> {views}
            </span>
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 transition-colors ${liked ? "text-red-400" : "hover:text-red-400"}`}
            >
              <Heart size={13} fill={liked ? "currentColor" : "none"} /> {likes}
            </button>
          </div>

          {/* Markdown content */}
          <div className="prose prose-invert prose-sm md:prose-base max-w-none
                          prose-headings:text-amber-300 prose-a:text-amber-400
                          prose-code:text-amber-300 prose-code:bg-slate-950 prose-code:px-1 prose-code:rounded
                          prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
                          prose-strong:text-slate-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <CommentSection comments={comments} onAdd={addComment} />
          </div>
        </div>
      </div>
    </div>
  );
}