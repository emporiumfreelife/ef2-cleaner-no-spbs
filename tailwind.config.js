/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0D1B2A',
        'brand-mid': '#1B263B',
        'brand-light': '#415A77',
        'brand-secondary': '#778DA9',
        'brand-text': '#E0E1DD',
        'brand-accent': '#3A86FF',
      },
    },
  },
  plugins: [],
};
