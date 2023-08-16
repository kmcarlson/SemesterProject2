/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    options: {
      safelist: [
        'hidden',
        'hover:cursor-pointer',
        'text-red-600',
        'my-2',
        'border-solid',

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
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

