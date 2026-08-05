import { MapPin } from "lucide-react";
import { contactInfo } from "../../data/contactData";

// Uses OpenStreetMap embed — free, no API key required
export default function LocationMap() {
  const { lat, lng, label } = contactInfo.location;
  const delta = 0.05;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${lat}%2C${lng}&layer=mapnik`;

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
        <MapPin size={16} className="text-amber-400" />
        <span className="text-sm font-mono text-slate-300">{label}</span>
      </div>
      <iframe
        title="Location map"
        src={mapSrc}
        className="w-full h-56 grayscale-[30%] contrast-125"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}