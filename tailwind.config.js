/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#00B0F0',
        secondary: '#404040',
      },
      fontFamily: {
        albertsans: "'Albert Sans', sans-serif"
      },
    },
  },
}