/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["w-safe", "h-safe"],
  theme: {
    extend: {
      screens: {
        "login-min-width": "835px",
      }
    },
  },
  plugins: [],
};
