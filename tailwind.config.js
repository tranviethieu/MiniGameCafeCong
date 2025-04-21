/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beVietnam: [
          "sans-serif",
          "Cousine",
          "BeauLuloClean",
          "iCielBCHuskey",
          "MYRIADPRO",
          "NittiTypewriter",
        ],
        pacifico: ['"Pacifico"', "cursive"],
      },
    },
  },
  plugins: [],
};
