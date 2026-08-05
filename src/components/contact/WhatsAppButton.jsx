import { MessageCircle } from "lucide-react";
import { contactInfo } from "../../data/contactData";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi! I found your portfolio and would like to connect.");
  const url = `https://wa.me/${contactInfo.phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-green-500/10 border border-green-500/30
                 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 group"
    >
      <span className="p-2 rounded-full bg-green-500 text-slate-950 group-hover:scale-110 transition-transform">
        <MessageCircle size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-100">Chat on WhatsApp</p>
        <p className="text-xs text-slate-500">Usually replies within a few hours</p>
      </div>
    </a>
  );
}