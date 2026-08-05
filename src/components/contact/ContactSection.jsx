import { Mail } from "lucide-react";
import { contactInfo } from "../../data/contactData";
import AvailabilityBadge from "./AvailabilityBadge";
import ContactForm from "./ContactForm";
import WhatsAppButton from "./WhatsAppButton";
import LocationMap from "./LocationMap";
import QRCodeCard from "./QRCodeCard";
import CalendarBooking from "./CalendarBooking";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-6">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          FIG. 14 — CONTACT
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          Let's Build Something
        </h2>
        <AvailabilityBadge />
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Left: form */}
        <ContactForm />

        {/* Right: quick contact options */}
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/60 border border-slate-700
                       hover:border-amber-400/50 transition-all duration-300 group"
          >
            <span className="p-2 rounded-full bg-slate-800 text-amber-400 group-hover:scale-110 transition-transform">
              <Mail size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-100">Email Me</p>
              <p className="text-xs text-slate-500">{contactInfo.email}</p>
            </div>
          </a>

          <WhatsAppButton />
          <CalendarBooking />
          <LocationMap />
          <QRCodeCard />
        </div>
      </div>
    </section>
  );
}