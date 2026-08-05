import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono font-bold text-amber-400">Raju Kushwaha</span>

        <div className="flex items-center gap-6">
          <a href="#about" className="text-sm text-slate-300 hover:text-amber-300">About</a>
          <a href="#projects" className="text-sm text-slate-300 hover:text-amber-300">Projects</a>
          <a href="#contact" className="text-sm text-slate-300 hover:text-amber-300">Contact</a>

          {/* Admin link — plain <a>, not a React Router Link, since you're not using a router */}
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono hover:border-amber-400/60 hover:text-amber-300 transition-colors"
          >
            <LayoutDashboard size={13} /> Admin
          </a>
        </div>
      </div>
    </nav>
  );
}