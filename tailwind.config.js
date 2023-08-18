/** @type {import('tailwindcss').Config} */
// * Novagon UI 4 tailwindcss config
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryBlue:{
          primary: '#00B0F0',
          50: '#00E0FF',
        },
        gray:{
          secondary: '#404040',
          100: '#A8A8A8',
        },
        logoPink: '#F000BB'
      },
      fontFamily: {
        albertsans: "'Albert Sans', sans-serif",
        poppins:  "'Poppins', sans-serif",
        jbmono: "'JetBrains Mono', monospace"
      },
      backgroundImage: {
        'hero-img': "url('/public/img/hero/ameer-basheer-gV6taBJuBTk-unsplash.jpg')"
      }
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "mocha"
    }),
  ],
}