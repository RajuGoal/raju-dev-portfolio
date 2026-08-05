import { codingProfiles, totalSolvedAll } from "../../data/codingProfilesData";
import ProfileCard from "./ProfileCard";
import RatingComparisonChart from "./RatingComparisonChart";

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 07 — CODING PROFILES
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
          Competitive Programming
        </h2>
        <p className="text-slate-400 font-mono text-sm">
          {totalSolvedAll}+ problems solved across platforms
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Rating comparison chart */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
            Rating Comparison
          </h3>
          <RatingComparisonChart profiles={codingProfiles} />
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {codingProfiles.map((p, i) => (
            <ProfileCard key={p.id} profile={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}