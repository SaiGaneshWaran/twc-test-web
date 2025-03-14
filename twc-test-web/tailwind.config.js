/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'twc-dark': '#1A3640',  // The dark teal background
        'twc-red': '#EF3F36',   // TWC logo red color
      },
      screens: {
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}