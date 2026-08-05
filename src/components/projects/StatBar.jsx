import { Eye, Heart, Download, Bookmark } from "lucide-react";

export default function StatBar({ stats }) {
  const items = [
    { icon: Eye, value: stats.views, label: "Views" },
    { icon: Heart, value: stats.likes, label: "Likes" },
    { icon: Download, value: stats.downloads, label: "Downloads" },
    { icon: Bookmark, value: stats.bookmarks, label: "Bookmarks" },
  ];

  return (
    <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
      {items.map(({ icon: Icon, value, label }) => (
        <span key={label} className="flex items-center gap-1" title={label}>
          <Icon size={13} />
          {value}
        </span>
      ))}
    </div>
  );
}