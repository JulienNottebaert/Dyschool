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
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
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
              50: '#FEEBE4',
              100: '#FDD6C8',
              200: '#FBB095',
              300: '#F88B61',
              400: '#F5652E',
              500: '#EB611C', // Orange
              600: '#BC4D17',
              700: '#8C3911',
              800: '#5D260B',
              900: '#2E1306',
              950: '#170903',
              foreground: '#ffffff',
              DEFAULT: '#EB611C'
            },
            secondary: {
              50: '#E1F0F1',
              100: '#BCE2E4',
              200: '#82C5C8',
              300: '#48A9AB',
              400: '#0F8D8F',
              500: '#095C67', // Vert personnalisé
              600: '#07484F',
              700: '#053437',
              800: '#03221E',
              900: '#01110F',
              950: '#000809',
              DEFAULT: '#095C67' // Définir cette couleur comme la couleur par défaut de secondary
            }
          }
        },
        dark: {
          colors: {
            background: '#18181d',
            foreground: '#fafafa',
            primary: {
              50: '#FEEBE4',
              100: '#FDD6C8',
              200: '#FBB095',
              300: '#F88B61',
              400: '#F5652E',
              500: '#EB611C', // Orange
              600: '#BC4D17',
              700: '#8C3911',
              800: '#5D260B',
              900: '#2E1306',
              950: '#170903',
              foreground: '#ffffff',
              DEFAULT: '#EB611C'
            },
            secondary: {
              50: '#E1F0F1',
              100: '#BCE2E4',
              200: '#82C5C8',
              300: '#48A9AB',
              400: '#0F8D8F',
              500: '#095C67', // Vert personnalisé
              600: '#07484F',
              700: '#053437',
              800: '#03221E',
              900: '#01110F',
              950: '#000809',
              DEFAULT: '#095C67' // Définir cette couleur comme la couleur par défaut de secondary
            }
          }
        }
      }
    })
  ]
}
