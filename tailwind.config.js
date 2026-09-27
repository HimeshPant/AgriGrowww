/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0B221A',
          800: '#12372A',
          700: '#1B4D3B',
          600: '#23654E'
        },
        agri: {
          dark: '#12372A',
          primary: '#2E7D52',
          fresh: '#66BB6A',
          light: '#E8F5E9',
          cream: '#F7F5ED',
          amber: '#F4B942',
          coral: '#D9534F',
          text: '#17211B',
          muted: '#68756D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
