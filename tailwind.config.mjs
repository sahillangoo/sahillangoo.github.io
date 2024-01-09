/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
extend: {
  fontFamily: {
    display: ["Playfair Display", "Georgia", "serif"],
    body: ["Figtree", "Arial", "sans-serif"],
    mono: ["JetBrains Mono", "Courier New", "monospace"],
  },
  variants: {},
},
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        InfinityDark: {
          ...require("daisyui/src/theming/themes")["night"],
          "primary": "#2e6b55",
          "primary-content": "#fefdfc",
          "secondary": "#e0a256",
          "secondary-content": "#fefdfc",
          "accent": "#d7574b",
          "accent-content": "#fefdfc",
          "tertiary": "#51a0bc",
          "tertiary-content": "#fefdfc",
          "base-100": "#040c0b",
          "base-200": "#0d1f1c",
          "base-300": "#162f2b",

        },
      },
      {
        InfinityLight: {
          ...require("daisyui/src/theming/themes")["autumn"],
          "primary": "#2e6b55",
          "primary-content": "#fefdfc",
          "secondary": "#e0a256",
          "secondary-content": "#fefdfc",
          "accent": "#d7574b",
          "accent-content": "#fefdfc",
          "tertiary": "#51a0bc",
          "tertiary-content": "#fefdfc",
          "base-100": "#fefdfc",
          "base-200": "#f9f9f9",
          "base-300": "#f3f3f3",
        },
      },
    ],
    darkTheme: "InfinityDark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};

module.exports = config;
