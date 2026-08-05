import { ExternalLink, Award } from "lucide-react";
import DifficultyChart from "./DifficultyChart";
import { useCodeforcesLive } from "../../hooks/useCodeforcesLive";
import { useLeetCodeLive } from "../../hooks/useLeetCodeLive";

export default function ProfileCard({ profile, index }) {
  const isCF = profile.id === "codeforces";
  const isLC = profile.id === "leetcode";

  const { live: cfLive } = useCodeforcesLive(isCF ? profile.handle : null);
  const { live: lcLive } = useLeetCodeLive(isLC ? profile.handle : null);

  const rating = (isCF && cfLive?.rating) || profile.rating;
  const maxRating = (isCF && cfLive?.maxRating) || profile.maxRating;
  const solved =
    (isLC && lcLive?.solved) ||
    (isCF && cfLive?.solved) ||
    profile.solved;
  const breakdown = (isLC && lcLive?.breakdown) || profile.breakdown;

  return (
    <div
      className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 hover:border-amber-400/60 transition-all duration-300 animate-fadeInUp flex flex-col gap-3"
      style={{
        animationDelay: `${index * 70}ms`,
        borderTopColor: profile.color,
        borderTopWidth: 3,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100">{profile.name}</h3>
          <p className="text-xs text-slate-500 font-mono">
            @{profile.handle}
          </p>
        </div>

        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-amber-300 transition-colors"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        {rating != null && (
          <div className="bg-slate-950/50 rounded-lg py-2">
            <p className="text-lg font-bold font-mono text-amber-300">
              {rating}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Rating
            </p>
          </div>
        )}

        {solved != null && (
          <div className="bg-slate-950/50 rounded-lg py-2">
            <p className="text-lg font-bold font-mono text-slate-100">
              {solved}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Solved
            </p>
          </div>
        )}
      </div>

      {maxRating != null && rating != null && (
        <div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
            <span>Progress to Peak</span>
            <span>{maxRating}</span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(rating / maxRating) * 100}%`,
                backgroundColor: profile.color,
              }}
            />
          </div>
        </div>
      )}

      {breakdown && <DifficultyChart breakdown={breakdown} />}

      {profile.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
          {profile.badges.map((b) => (
            <span
              key={b}
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-amber-300 border border-slate-700"
            >
              <Award size={10} /> {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}