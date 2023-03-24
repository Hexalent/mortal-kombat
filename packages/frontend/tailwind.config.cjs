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
        Poppins: ['Poppins', 'sans-serif']
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
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4198fd',
          secondary: '#D926AA',
          accent: '#1FB2A5',
          neutral: '#191D24',
          'base-100': '#000000',
          'base-200': '#0e0e0e',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  }
}
