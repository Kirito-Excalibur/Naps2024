import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      tinos:[ "Tinos", "serif"],
      newsreader: ["Newsreader", "serif"],
      cinzel: ["Cinzel", "serif"],
      pacifico:["Pacifico","serif"]
    }

  },
  plugins: [],
} satisfies Config;
