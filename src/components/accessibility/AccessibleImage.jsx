// Enforces meaningful alt text at the component level — throws a dev warning
// if alt is missing, empty, or looks like a lazy filename dump.
export default function AccessibleImage({ src, alt, decorative = false, ...props }) {
  if (import.meta.env.DEV && !decorative) {
    if (!alt || alt.trim() === "") {
      console.warn(`AccessibleImage: missing alt text for image "${src}"`);
    } else if (/\.(jpg|png|jpeg|webp)$/i.test(alt)) {
      console.warn(`AccessibleImage: alt text for "${src}" looks like a filename, not a description`);
    }
  }

  return <img src={src} alt={decorative ? "" : alt} role={decorative ? "presentation" : undefined} {...props} />;
}