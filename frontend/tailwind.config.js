/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gradient2' : 'linear-gradient(315deg, rgba(38,103,255,1) 35%, rgba(255,212,0,1) 100%)'
      }
    },
  },
  plugins: [],
}

