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
  singleQuote: true,
  printWidth: 120,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  trailingComma: 'es5',
  singleAttributePerLine: true,
  // cssEnable: ['css', 'less', 'sass'],
};
