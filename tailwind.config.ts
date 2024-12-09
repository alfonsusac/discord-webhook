import type { Config } from "tailwindcss";
import animation from "tailwindcss-animate"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background), 1)",
        foreground: "rgba(var(--foreground), 1)",
        discord: {
          background: "oklab(var(--discord-oklab-bg) / <alpha-value>)",
          foreground: "oklab(var(--discord-oklab-fg) / <alpha-value>)",
          button: "rgba(var(--discord-rgb-button))",
          mention: "var(--discord-oklab-mention)",
          link: "oklab(var(--discord-oklab-link) / <alpha-value> )",
          popover: "oklab(var(--discord-oklab-popover) / <alpha-value>)",
        },
      },
      screens: {
        'mobile': '425px'
      },
      maxWidth: {
        'mobile': '425px'
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      }
    },
  },
  plugins: [
    animation,
  ],
} satisfies Config;
