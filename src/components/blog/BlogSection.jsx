import { useState, useMemo } from "react";
import { blogPosts, blogCategories } from "../../data/blogData";
import BlogToolbar from "./BlogToolbar";
import BlogCard from "./BlogCard";
import BlogPostModal from "./BlogPostModal";

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = activeCategory === "All" || post.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        post.title.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="blog" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">FIG. 15 — BLOG</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Writing & Notes</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <BlogToolbar
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onOpen={setSelected}
                onTagClick={(tag) => setSearch(tag)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 font-mono py-10">No posts match your search.</p>
        )}
      </div>

      {selected && <BlogPostModal post={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}