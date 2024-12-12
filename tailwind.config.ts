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
      keyframes: {
        'rotate-swing': {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
        'spline-movement': {
          '0%': { top:'33%', left: '20%' },
          '27%': { top: '36%', left: '50%', transform: 'rotate(-10deg)' },
          '66%': { top: '89%', left: '80%' },
          '100%': { top: '33%', left: '20%' },
        },
      },
      animation: {
        'rotate-swing': 'rotate-swing 2s ease-in-out infinite',
        'spline': 'spline-movement 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
      },
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
