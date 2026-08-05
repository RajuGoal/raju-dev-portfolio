import { contactInfo } from "../../data/contactData";

const STATUS_STYLES = {
  available: { color: "bg-green-400", text: "text-green-400", label: "Available" },
  busy: { color: "bg-amber-400", text: "text-amber-400", label: "Limited Availability" },
  unavailable: { color: "bg-red-400", text: "text-red-400", label: "Not Available" },
};

export default function AvailabilityBadge() {
  const { status, message } = contactInfo.availability;
  const style = STATUS_STYLES[status];

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-700">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.color} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${style.color}`} />
      </span>
      <span className={`text-sm font-mono font-semibold ${style.text}`}>{style.label}</span>
      <span className="text-slate-500 text-sm hidden sm:inline">— {message}</span>
    </div>
  );
}