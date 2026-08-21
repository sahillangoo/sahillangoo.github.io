/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'ignore',
  semi: true,
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-css-order',
    'prettier-plugin-packagejson',
  ],
  overrides: [
    {
      files: ['**/*.astro'],
      options: {
        parser: 'astro',
      },
    },
    {
      files: ['**/*.{json,jsonc,md,mdx,toml,yml,yaml,css,html}'],
      options: {
        useTabs: false,
      },
    },
  ],
};
