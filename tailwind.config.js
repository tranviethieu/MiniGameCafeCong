/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beVietnam: ['"Be Vietnam Pro"', "sans-serif"],
        pacifico: ['"Pacifico"', "cursive"],
      },
    },
  },
  plugins: [],
};
