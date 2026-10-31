/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf6f1',
          100: '#f1e7dc',
          200: '#e4d0bd',
          300: '#d3b49a',
          400: '#bd9270',
          500: '#a97652',
          600: '#895a3e',
          700: '#6d4632',
          800: '#493126',
          900: '#2c211b'
        },
        cream: '#fffdf9',
        sage: '#71816a'
      },
      boxShadow: {
        soft: '0 16px 45px rgba(64, 42, 28, 0.08)',
        card: '0 8px 24px rgba(64, 42, 28, 0.06)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};
