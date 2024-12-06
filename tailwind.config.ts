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
          background: "var(--discord-oklab-bg)",
          foreground: "var(--discord-oklab-fg)",
          button: "rgba(var(--discord-rgb-button))",
        },
      },
    },
  },
  plugins: [
    animation,
  ],
} satisfies Config;
