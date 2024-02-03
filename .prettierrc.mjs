/** @type {import('prettier').Config} */
export default {
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-css-order',
    // 'prettier-plugin-astro-organize-imports',
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
  printWidth: 100,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  trailingComma: 'es5',
  // cssEnable: ['css', 'less', 'sass'],
  // singleAttributePerLine: true,
};
