/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Playfair Display", "serif"],
        secondary: ["Gabarito", "sans-serif"],
        main: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      variants: {},
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        InfinityLight: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2e6b55",
          secondary: "#e0a256",
          accent: "#d7574b",
          neutral: "#51a0bc",
          "base-100": "#e0e0df",
        },
      },
      {
        InfinityDark: {
          ...require("daisyui/src/theming/themes")["night"],
          primary: "#2e6b55",
          secondary: "#e0a256",
          accent: "#d7574b",
          neutral: "#51a0bc",
          "base-100": "#0d151c",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        InfinityReading: {
          ...require("daisyui/src/theming/themes")["retro"],
          primary: "#2e6b55",
          secondary: "#e0a256",
          accent: "#d7574b",
          neutral: "#51a0bc",
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
