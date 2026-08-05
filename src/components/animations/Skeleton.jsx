// Base shimmer block — compose these into skeleton layouts per section
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-800/60 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 flex flex-col gap-3">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, cols = "sm:grid-cols-2 lg:grid-cols-3" }) {
  return (
    <div className={`grid grid-cols-1 ${cols} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}