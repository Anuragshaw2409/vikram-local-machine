/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'custom-blue':'#5E17EB',
        'custom-pink': '#FF66C4'
      }
    },
  },
  plugins: [],
}

