const flowbite = require('flowbite-react/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        current: '#D10024',
        yellow: {
          400: '#FAB529',
          DEFAULT: '#FAB529'
        },
        blue: {
          400: '#166FB8',
          DEFAULT: '#166FB8'
        },
        'primary-300': '#FBCA4F',
        primary: {
          DEFAULT: '#D10024',
          600: '#A6021E'
        },
        secondary: '#166FB8',
        'secondary-700': '#0a5da1',
        header: '#2B2D42',
        lightDark: '#1E1F29'
        // tertiary: '#585858',
      },

      screens: {
        sm: '576px',
        md: '960px',
        // lg: '1440px'
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px'
      }
    }
  },
  plugins: [
    // ...
    flowbite.plugin()
  ]
}
