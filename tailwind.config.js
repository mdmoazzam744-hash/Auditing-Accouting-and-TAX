/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          950: '#1A0E07',
          900: '#2C1810',
          850: '#3A2015',
          800: '#4A2B1D',
          700: '#6B4228',
          600: '#8C5A37',
          500: '#B07B50',
          400: '#CFA079',
          300: '#E2C4A8',
        },
        cream: {
          50: '#FDFCF9',
          100: '#F9F5EE',
          200: '#F3ECE0',
          300: '#EADBCC',
          400: '#DFC7B0',
          500: '#CFB194',
        },
        gold: {
          50: '#FBF8EE',
          100: '#F7EFCE',
          200: '#EFE09F',
          300: '#E4CD6E',
          400: '#DAB844',
          500: '#D4AF37', // Classic Royal Gold
          600: '#B89225',
          700: '#947219',
          800: '#755716',
          900: '#543D11',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
