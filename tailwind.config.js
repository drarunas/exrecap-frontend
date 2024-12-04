/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./*.vue"
  ],
  theme: {
    extend: {
      colors: {
        'main': colors.indigo[500],
        'main-dark': colors.indigo[600],
        'secondary': '#9C739B',
        'secondary-light': '#BAA6BA'
      }
    }
  },
    plugins: [],

}
