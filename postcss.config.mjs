export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Đảm bảo quét đúng tất cả các file
  ],
  theme: {
    extend: {},
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
