/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        copper: "#c2622a",
        "copper-light": "#d4784a",
        dark: "#0f1923",
        "dark-card": "#162030",
        "dark-border": "#1e2d3d",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
