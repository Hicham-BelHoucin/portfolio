/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
      colors: {
        primary: {
          50: "#eeebfb",
          100: "#74b4e8",
          200: "#8c74e4",
          300: "#ccc4f4",
          400: "#bcacec",
          500: "#F86F03",
          // 500: "#643cd4",
          600: "#ac9cec",
          700: "#e4e0f8",
          800: "#9c84e4",
          900: "#7c5cdc",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
