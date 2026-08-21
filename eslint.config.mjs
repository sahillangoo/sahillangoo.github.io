import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import lockfile from 'eslint-plugin-lockfile';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

const tsParser = tseslint.parser;
const astroParser = astro.parser;

const lockfileConfigs = lockfile.configs.recommended.filter(
  (config) => !config.files?.includes('**/package.json')
);

export default defineConfig([
  {
    ignores: [
      'dist/**',
      '**/*.d.ts',
      '.github/**',
      'public/pagefind/**',
      '.playwright-browsers/**',
      'playwright-report/**',
      'test-results/**',
      'blob-report/**',
      'playwright/.auth/**',
      'playwright/.cache/**',
      '.astro/**',
      '.agents/**',
      '.codex/**',
      '.cursor/**',
      '.netlify/**',
      '.vercel/**',
      '.wrangler/**',
      'node_modules/**',
      '**/*.log',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        tsconfigRootDir,
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    plugins: {
      lockfile: lockfile,
    },
  },
  ...lockfileConfigs,
  {
    files: ['**/pnpm-lock.yaml'],
    rules: {
      'lockfile/flavor': ['error', 'pnpm'],
    },
  },
  eslintConfigPrettier,
]);
