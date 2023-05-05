/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './*.html',
    './**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        'gray-dark': "rgba(40, 40, 40, var(--tw-bg-opacity, 1))",
      },
    },
  },
  plugins: [],
}

