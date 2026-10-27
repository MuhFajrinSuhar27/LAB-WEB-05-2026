/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-cream': '#D9C4B0',
        'custom-mint' : '#BBDCE5',
        'custom-blue' : '#66A3BF',
      },
    },
  },
  plugins: [],
};