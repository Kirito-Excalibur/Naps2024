import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        mainText: "rgb(var(--mainText) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
  footer: "rgb(var(--footer) / <alpha-value>)",
  "footer-foreground": "rgb(var(--footer-foreground) / <alpha-value>)",
      },
    },
    fontFamily:{
      tinos:[ "Tinos", "serif"],
      newsreader: ["Newsreader", "serif"],
      cinzel: ["Cinzel", "serif"],
    }
  },
  plugins: [],
} satisfies Config;
