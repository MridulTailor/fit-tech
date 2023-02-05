/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50C878",
        secondary: "#9BC9B3",
        tertiary: "#D3E9CF",
        light: "#F2F9F7",
        dark: "#1C2331",
      },
    },
  },
  plugins: [],
};
