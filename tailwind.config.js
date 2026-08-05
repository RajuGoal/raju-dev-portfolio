/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: "#0B1E3A",
          panel: "#12294D",
          line: "#2D4A73",
          lineFaint: "#1B3357",
          text: "#EDF2FA",
          muted: "#8FA5C9",
          amber: "#FFA94D",
        },

        // Added from second config
        accent: "var(--accent)",
      },

      fontFamily: {
        display: ['"JetBrains Mono"', "monospace"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },

      backgroundImage: {
        grid: "linear-gradient(#1B3357 1px, transparent 1px), linear-gradient(90deg, #1B3357 1px, transparent 1px)",
      },

      backgroundSize: {
        grid: "32px 32px",
      },

      keyframes: {
        draw: {
          "0%": {
            strokeDashoffset: "1000",
          },
          "100%": {
            strokeDashoffset: "0",
          },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(15px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        // Added shimmer animation
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },

      animation: {
        draw: "draw 2s ease-out forwards",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",

        // Added shimmer animation
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },

  plugins: [],
};
