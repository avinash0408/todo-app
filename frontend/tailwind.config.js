/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '1/10': '10%',
        '9/10': '90%',
        '1/20': '5%',
        '19/29': '95%' // Custom height class
      },
    },
  },
  plugins: [],
}

