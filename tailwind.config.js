/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lentera: {
          primary: "#F59E0B", // Warm Amber
          base: "#8B5CF6",    // Soft Violet
          text: "#1E1B4B",    // Indigo Dusk
          bg: "#FAFAF9",      // Warm Stone
          highlight: "#FEF3C7" // Pale Gold
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
