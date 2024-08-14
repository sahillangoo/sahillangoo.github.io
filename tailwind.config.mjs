/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
const config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}'],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '0.875rem' }],
      },
      backgroundImage: {
        'hero-wave': "url('/images/bg_wave.svg')",
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', ...defaultTheme.fontFamily.serif],
        body: ['Figtree', 'Arial', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Courier New', ...defaultTheme.fontFamily.mono],
        urdu: ['Gulzar', 'Arial', ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      variants: {},
    },
  },
  plugins: [
    // require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        InfinityDark: {
          ...require('daisyui/src/theming/themes')['night'],
          primary: '#2e6b55',
          'primary-content': '#fff',
          secondary: '#E3AA64',
          'secondary-content': '#000',
          accent: '#d7574b',
          'accent-content': '#000',
          tertiary: '#51a0bc',
          'tertiary-content': '#000',
          'base-100': '#010E0A',
          'base-200': '#0d1f1c',
          'base-300': '#162f2b',
        },
      },
      {
        InfinityLight: {
          ...require('daisyui/src/theming/themes')['night'],
          primary: '#2e6b55',
          'primary-content': '#e3fcf3',
          secondary: '#E3AA64',
          'secondary-content': '#000',
          accent: '#d7574b',
          'accent-content': '#000',
          tertiary: '#51a0bc',
          'tertiary-content': '#000',
          'base-100': '#f1fefa',
          'base-200': '#f9f9f9',
          'base-300': '#f3f3f3',
        },
      },
    ],
    darkTheme: 'InfinityDark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};

export default config;
