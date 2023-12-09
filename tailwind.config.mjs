/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "rubik-glitch": ['"Rubik Glitch"', ...defaultTheme.fontFamily.sans],
        syncopate: ["Syncopate", ...defaultTheme.fontFamily.sans],
        audiowide: ["Audiowide", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        fill: "rgba(var(--color-fill))",
        accent: "rgba(var(--color-accent))",
        accent2: "rgba(var(--color-accent-2))",
        card: "rgba(var(--color-card))",
        "card-muted": "rgba(var(--color-card-muted))",
        "accent-border": "rgba(var(--color-border))"
      }
    }
  },
  plugins: []
};
