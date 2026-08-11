/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: '#0a0d14',
        card: '#121824',
        border: '#1f293d',
        primary: {
          DEFAULT: '#3b82f6',
          strong: '#60a5fa',
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
