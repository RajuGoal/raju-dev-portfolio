import { Helmet } from "react-helmet-async";
import { seoConfig } from "../../data/seoData";

// Drop this once at the top of App.jsx for site-wide defaults.
// Pass overrides per-page/section if you ever add routing (e.g. a blog post page).
export default function SEO({
  title = seoConfig.title,
  description = seoConfig.description,
  image = seoConfig.image,
  url = seoConfig.url,
  type = "website",
}) {
  return (
    <Helmet>
      {/* Basic meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoConfig.keywords.join(", ")} />
      <meta name="author" content={seoConfig.author} />
      <meta name="theme-color" content={seoConfig.themeColor} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp previews) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:creator" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data — JSON-LD, tells Google this is a Person/Portfolio */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: seoConfig.author,
          url: seoConfig.url,
          image: seoConfig.image,
          jobTitle: "Full Stack Developer",
          sameAs: [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourusername",
            "https://twitter.com/yourhandle",
          ],
        })}
      </script>
    </Helmet>
  );
}