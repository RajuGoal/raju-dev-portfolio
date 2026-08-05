import { useState } from "react";
import { useLazyImage } from "../../hooks/useLazyImage";

// Drop-in replacement for <img> — lazy loads, shows a blur placeholder,
// and serves WebP with a fallback automatically if you provide both.
export default function OptimizedImage({
  src,
  webpSrc,
  alt,
  className = "",
  width,
  height,
}) {
  const [ref, loadedSrc] = useLazyImage(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder while loading */}
      <div
        className={`absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {loadedSrc && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={loadedSrc}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      )}
    </div>
  );
}