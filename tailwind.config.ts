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
        cream: "#FAF8F4",
        "warm-white": "#F5F2EC",
        ink: "#1C1917",
        "ink-soft": "#44403C",
        "ink-muted": "#78716C",
        accent: "#8B6F5E",
        "accent-light": "#E8DDD6",
        "accent-pale": "#F5EDE7",
        border: "#E5DDD5",
        success: "#4A7C59",
        "success-light": "#EBF4EE",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
        md: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
