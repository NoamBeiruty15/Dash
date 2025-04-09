/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#ff6200",
        background: "#141414",
        secondaryBg: "#1e1e1e",
      },
      spacing: {
        15: "3rem", 
      },
    },
  },
  plugins: [],
};
