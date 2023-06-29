/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    options: {
      safelist: [
        'hidden',
        'hover:cursor-pointer',
        'text-red-600'
         // Make sure it's specified exactly like this
      ],
    },
  },
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

