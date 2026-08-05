import { CalendarClock } from "lucide-react";
import { contactInfo } from "../../data/contactData";

export default function CalendarBooking() {
  return (
    <a
      href={contactInfo.calendlyUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30
                 hover:bg-amber-400/20 hover:border-amber-400/50 transition-all duration-300 group"
    >
      <span className="p-2 rounded-full bg-amber-400 text-slate-950 group-hover:scale-110 transition-transform">
        <CalendarClock size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-100">Book a Call</p>
        <p className="text-xs text-slate-500">Schedule a 30-min chat directly on my calendar</p>
      </div>
    </a>
  );
}