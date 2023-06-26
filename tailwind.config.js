/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "left-bottom": "5px 5px rgba(253, 252, 125, 1.0)",
      },
    },
  },
  plugins: [],
};
