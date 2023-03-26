/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {

    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        Poppins: ['Poppins', 'sans-serif'],
        russo: ['Russo One', 'sans-serif'],
        mortal: ['Mortal', 'sans-serif'],
        immortal: ['Immortal', 'sans-serif'],
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
