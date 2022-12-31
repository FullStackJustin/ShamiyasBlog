/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      cursor: {
        'sparkle': 'url("/src/assets/sparkle.png")',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }, 
    },
  },
  plugins: [],
}
