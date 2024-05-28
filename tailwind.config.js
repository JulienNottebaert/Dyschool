const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        opendyslexic: ['OpenDyslexic', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#fafafa',
            foreground: '#262626',
            primary: {
              50: '#FDF3EC',
              100: '#FBE0D1',
              200: '#F8BC9C',
              300: '#F59868',
              400: '#F27533',
              500: '#F18B4A', // Default color
              600: '#C0663C',
              700: '#8F482D',
              800: '#5E2B1E',
              900: '#2E0E0F',
              950: '#1A0808',
              foreground: '#ffffff',
              DEFAULT: '#F18B4A'
            },
            secondary: {
              50: '#EDE7F3',
              100: '#D9CBE7',
              200: '#B399CF',
              300: '#8C66B7',
              400: '#66348F',
              500: '#67378C', // Default color
              600: '#4C2967',
              700: '#331C44',
              800: '#190E22',
              900: '#0A030E',
              950: '#060207'
            }
          }
        },
        dark: {
          colors: {
            background: '#18181d',
            foreground: '#fafafa',
            primary: {
              50: '#FDF3EC',
              100: '#FBE0D1',
              200: '#F8BC9C',
              300: '#F59868',
              400: '#F27533',
              500: '#F18B4A', // Default color
              600: '#C0663C',
              700: '#8F482D',
              800: '#5E2B1E',
              900: '#2E0E0F',
              950: '#1A0808',
              foreground: '#ffffff',
              DEFAULT: '#F18B4A'
            },
            secondary: {
              50: '#EDE7F3',
              100: '#D9CBE7',
              200: '#B399CF',
              300: '#8C66B7',
              400: '#66348F',
              500: '#67378C', // Default color
              600: '#4C2967',
              700: '#331C44',
              800: '#190E22',
              900: '#0A030E',
              950: '#060207'
            }
          }
        }
      }
    })
  ]
}
