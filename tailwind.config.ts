import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors - calm and modern
        background: "#FAFAF9",
        foreground: "#1C1C1E",

        // Muted grays
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        // Soft accent colors for node types
        note: {
          light: "#FFF4E6",
          DEFAULT: "#FFE4B5",
          dark: "#F5D9A0",
        },
        link: {
          light: "#E8F4FB",
          DEFAULT: "#A8D8F0",
          dark: "#7EC8E3",
        },
        image: {
          light: "#F3EFF8",
          DEFAULT: "#D4C5E8",
          dark: "#BBA5D8",
        },
        todo: {
          light: "#E8F5E9",
          DEFAULT: "#B8E6B8",
          dark: "#A0D9A0",
        },
        analytics: {
          light: "#E6F3F5",
          DEFAULT: "#B0DADC",
          dark: "#8FC9CC",
        },

        // UI accent
        accent: {
          light: "#E8EEFF",
          DEFAULT: "#8B9AFF",
          dark: "#6B7AE5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.08)",
        lift: "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
