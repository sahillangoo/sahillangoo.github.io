import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import lockfile from 'eslint-plugin-lockfile';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import oxlint from 'eslint-plugin-oxlint';
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
      // Build & Distribution outputs
      'dist/**',
      '.output/**',
      '.astro/**',
      '.mf/**',
      '.unlighthouse/**',
      'public/pagefind/**',

      // Cloudflare & Deployment Artifacts
      '.wrangler/**',
      '.vercel/**',
      '.netlify/**',

      // Dependencies & Package Manager
      'node_modules/**',

      // Caches, Logs & Reports
      '**/*.log',
      '.eslintcache',
      '.prettiercache',
      '.oxlintcache',
      '.parcel-cache/**',
      '.turbo/**',

      // Test Reports, E2E & Browser Artifacts
      'test-results/**',
      'playwright-report/**',
      'blob-report/**',
      'playwright/.cache/**',
      'playwright/.auth/**',
      '.playwright-browsers/**',

      // Tooling, CI & AI Agent Directories
      '.github/**',
      '.agents/**',
      '.codex/**',
      '.cursor/**',

      // TypeScript Ambient Declarations
      '**/*.d.ts',
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
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.strict,
  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-strict'],
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
      '@typescript-eslint/no-explicit-any': 'error',
      'astro/no-set-html-directive': 'off',
      'astro/no-set-text-directive': 'error',
      'astro/valid-compile': 'error',
      'astro/no-unused-css-selector': 'error',
      'astro/prefer-class-list-directive': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        tsconfigRootDir,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
    },
  },
  {
    plugins: {
      lockfile,
    },
  },
  ...lockfileConfigs,
  {
    files: ['**/pnpm-lock.yaml'],
    rules: {
      'lockfile/flavor': ['error', 'pnpm'],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-useless-return': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
    },
  },
  ...oxlint.configs['flat/recommended'],
  eslintConfigPrettier,
]);
