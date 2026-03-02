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
        gold: "#c9a84c",
        "gold-light": "#e2ce75",
        cream: "#f8f6f0",
        obsidian: "#000000",
        "obsidian-soft": "#0a0a0a",
      },
    },
  },
  plugins: [],
};
export default config;
