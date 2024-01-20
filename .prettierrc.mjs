/** @type {import('prettier').Config} */
export default {
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-css-order',
    'prettier-plugin-astro-organize-imports',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  // defaults that apply to all files unless overridden above
  singleQuote: true,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  // singleAttributePerLine: true,
};
