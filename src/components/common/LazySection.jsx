import { Suspense } from "react";
import { SkeletonGrid } from "../animations/Skeleton";

// Wraps any lazy-loaded section with a skeleton fallback instead of a blank gap
export default function LazySection({ children, skeletonCount = 6 }) {
  return (
    <Suspense fallback={<SkeletonGrid count={skeletonCount} />}>
      {children}
    </Suspense>
  );
}