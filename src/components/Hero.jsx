import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground.jsx";
import useTypingEffect from "../hooks/useTypingEffect.js";
import { profile } from "../data/content.js";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export default function Hero() {
  const typed = useTypingEffect(profile.roles, {
    typingSpeed: 65,
    erasingSpeed: 35,
    pauseTime: 1500,
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-blueprint-bg"
    >
      <div className="absolute inset-0 bg-grid bg-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B1E3A_75%)]" />

      <ParticleBackground />

      <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-blueprint-muted/60 hidden sm:block">
        FIG. 01 — PORTFOLIO
      </div>

      <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-blueprint-muted/60 hidden sm:block">
        SCALE 1:1
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-blueprint-muted/60 hidden sm:block">
        REV. {new Date().getFullYear()}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 w-full py-32 flex flex-col items-center text-center">
        {/* Availability */}
        <div
          className="opacity-0 animate-fadeUp flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-blueprint-muted border border-blueprint-line rounded-full px-4 py-1.5 mb-8 bg-blueprint-panel/60 backdrop-blur-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            {profile.available && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                profile.available
                  ? "bg-emerald-400"
                  : "bg-blueprint-muted"
              }`}
            />
          </span>

          {profile.available
            ? "Available for work"
            : "Not currently available"}
        </div>

        {/* Avatar */}
        <div
          className="opacity-0 animate-fadeUp corner-brackets mb-8 p-1"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-blueprint-amber/60 shadow-[0_0_40px_-10px_rgba(255,169,77,0.5)] bg-blueprint-panel flex items-center justify-center">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display text-3xl text-blueprint-amber">
                {profile.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h1
          className="opacity-0 animate-fadeUp font-display text-4xl sm:text-6xl font-bold tracking-tight text-blueprint-text"
          style={{ animationDelay: "0.3s" }}
        >
          {profile.name}
        </h1>

        {/* Typing Effect */}
        <div
          className="opacity-0 animate-fadeUp mt-4 h-8 flex items-center justify-center font-mono text-lg sm:text-xl text-blueprint-amber"
          style={{ animationDelay: "0.4s" }}
        >
          <span>{typed}</span>
          <span className="typing-cursor h-6" />
        </div>

        {/* Buttons */}
        <div
          className="opacity-0 animate-fadeUp mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center gap-2 bg-blueprint-amber text-blueprint-bg font-semibold px-6 py-3 rounded-md hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-amber focus-visible:ring-offset-2 focus-visible:ring-offset-blueprint-bg"
          >
            <Briefcase size={18} />
            Hire Me
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 border border-blueprint-line text-blueprint-text font-medium px-6 py-3 rounded-md hover:border-blueprint-amber hover:text-blueprint-amber transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-amber focus-visible:ring-offset-2 focus-visible:ring-offset-blueprint-bg"
          >
            <Download size={18} />
            Download Resume
          </a>

          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 text-blueprint-muted hover:text-blueprint-text font-medium px-6 py-3 transition"
          >
            View Projects
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Social Icons */}
        <div
          className="opacity-0 animate-fadeUp mt-12 flex items-center gap-5"
          style={{ animationDelay: "0.6s" }}
        >
          {profile.socials.map(({ label, href, icon }) => {
            const Icon = ICONS[icon];

            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-blueprint-muted hover:text-blueprint-amber transition-colors"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blueprint-muted/70">
        <span className="font-mono text-[10px] tracking-widest">
          SCROLL
        </span>

        <div className="w-px h-8 bg-gradient-to-b from-blueprint-muted/70 to-transparent" />
      </div>
    </section>
  );
}