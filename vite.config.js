import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    // Gzip + Brotli compression on build output
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    // Replaces the manual sw.js from section 24 with a properly generated one
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon-192.png", "icons/icon-512.png"],
      manifest: false, // using your existing public/manifest.json
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "github-api-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 }, // 1 hour
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30 days
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Manual chunk splitting — vendor code cached separately from your app code,
        // so a code change doesn't invalidate the cached React/Three.js/etc. bundle
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "three-vendor": ["three"],
          "chart-vendor": ["recharts"],
          "motion-vendor": ["framer-motion", "gsap"],
        },
      },
    },
    // Warn if any chunk exceeds this — helps you catch accidental bloat
    chunkSizeWarningLimit: 600,
  },
});
