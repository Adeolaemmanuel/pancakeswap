/** @type {import('tailwindcss').Config} */

const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "./src/container/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
