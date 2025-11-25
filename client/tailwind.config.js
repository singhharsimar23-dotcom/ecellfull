/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B21A8',
          dark: '#581C87',
          light: '#7C3AED',
        },
        accent: {
          DEFAULT: '#14B8A6',
          dark: '#0D9488',
          light: '#2DD4BF',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

