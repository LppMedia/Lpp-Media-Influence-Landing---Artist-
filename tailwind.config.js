/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        lpp: {
          purple: '#7c3aed',
          darkPurple: '#4c1d95',
          blue: '#2563eb',
          dark: '#020617',
          surface: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}