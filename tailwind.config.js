/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#ff6200",
        background: "#121212",
        secondaryBg: "#1a1a1a",
      },
      spacing: {
        15: "3rem", // You can adjust the value as you like
      },
    },
  },
  plugins: [],
};
