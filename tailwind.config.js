/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#17211b', paper: '#f7f4ed', sage: '#4f6858', coral: '#e76f51' },
      boxShadow: { card: '0 18px 45px rgba(23, 33, 27, 0.08)' }
    }
  },
  plugins: []
}
