import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      tinos:[ "Tinos", "serif"],
    }

  },
  plugins: [],
} satisfies Config;
