/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'base': "0 2px 10px 0 rgba(0, 0, 0, .1)",
      },
    },
  },
  plugins: [],
}

