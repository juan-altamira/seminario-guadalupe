/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,svelte}',
    './src/routes/**/*.{svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f6f6',
          100: '#ddeceb',
          200: '#badec1',
          300: '#96cab6',
          400: '#6db5a6',
          500: '#4d998b',
          600: '#3a7870',
          700: '#2f5e59',
          800: '#264c48',
          900: '#1d3a37'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
