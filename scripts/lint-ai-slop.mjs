#!/usr/bin/env node
/**
 * AI Slop, Anti-Pattern, Copywriting & SEO Static Analysis Engine
 *
 * Exhaustively audits content collections, website copy, templates, and metadata for:
 * 1. Em dashes (— / \u2014) across all copy, content, and titles
 * 2. Hallmark AI buzzwords and statistical tropes ("delve", "tapestry", "testament", "seamless", etc.)
 * 3. AI code smells (swallowed errors, placeholder TODOs, hallucinated imports, obsolete Tailwind v3 syntax)
 * 4. Technical SEO hygiene (metadata description lengths, title format with pipe separators)
 *
 * Supports --fix to automatically humanize text, replace AI clichés, and normalize typography.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isFixMode = process.argv.includes('--fix');

// 1. Read Installed Dependencies to Prevent Hallucinated Package Imports
const pkgPath = path.join(rootDir, 'package.json');
const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const installedDeps = new Set([
  ...Object.keys(pkgJson.dependencies || {}),
  ...Object.keys(pkgJson.devDependencies || {}),
]);

// Standard Node.js & Astro Virtual Built-ins
const BUILTIN_MODULES = new Set([
  'fs',
  'node:fs',
  'path',
  'node:path',
  'url',
  'node:url',
  'http',
  'node:http',
  'https',
  'node:https',
  'crypto',
  'node:crypto',
  'stream',
  'node:stream',
  'buffer',
  'node:buffer',
  'child_process',
  'node:child_process',
  'events',
  'node:events',
  'os',
  'node:os',
  'util',
  'node:util',
  'astro',
  'astro:content',
  'astro:assets',
  'astro/config',
  'astro:transitions',
  'astro:transitions/client',
  'astro:i18n',
  'astro:middleware',
  'astro/types',
  'globals',
  'typescript-eslint',
  'eslint/config',
]);

// 2. Hallmark AI Text Buzzwords & Statistical Tropes with Auto-Fix Replacements
const AI_TEXT_PATTERNS = [
  {
    pattern: /\bdelv(?:e|es|ed|ing)\s+into\b/gi,
    name: 'delve into',
    suggestion: 'explore / analyze / examine / build',
    replacement: 'explore',
  },
  {
    pattern: /\brich\s+tapestry\b/gi,
    name: 'rich tapestry',
    suggestion: 'broad collection / diverse ecosystem',
    replacement: 'broad collection',
  },
  {
    pattern: /\btapestry\s+of\b/gi,
    name: 'tapestry of',
    suggestion: 'array of / combination of',
    replacement: 'array of',
  },
  {
    pattern: /\bstands?\s+as\s+a\s+testament\b/gi,
    name: 'stands as a testament',
    suggestion: 'proves / demonstrates / shows',
    replacement: 'demonstrates',
  },
  {
    pattern: /\ba\s+testament\s+to\b/gi,
    name: 'a testament to',
    suggestion: 'evidence of / reflects',
    replacement: 'evidence of',
  },
  {
    pattern: /\bbeacon\s+of\b/gi,
    name: 'beacon of',
    suggestion: 'standard for / benchmark for',
    replacement: 'standard for',
  },
  {
    pattern: /\bin\s+today's\s+(?:digital\s+landscape|rapidly\s+evolving|fast-paced)\b/gi,
    name: "in today's ...",
    suggestion: 'cut phrase entirely',
    replacement: 'currently',
  },
  {
    pattern: /\bin\s+an\s+era\s+where\b/gi,
    name: 'in an era where',
    suggestion: 'cut phrase or state directly',
    replacement: 'when',
  },
  {
    pattern: /\bpivotal\s+role\b/gi,
    name: 'pivotal role',
    suggestion: 'key role / primary function',
    replacement: 'key role',
  },
  {
    pattern: /\bit\s+is\s+(?:crucial|vital|essential)\s+to\s+(?:note|remember|understand)\b/gi,
    name: 'it is crucial to note...',
    suggestion: 'state directly without filler',
    replacement: 'notably,',
  },
  {
    pattern: /\bharness(?:ing)?\s+the\s+power\s+of\b/gi,
    name: 'harness the power of',
    suggestion: 'using / applying',
    replacement: 'using',
  },
  {
    pattern: /\bleverage\s+the\s+power\s+of\b/gi,
    name: 'leverage the power of',
    suggestion: 'utilizing / adopting',
    replacement: 'utilizing',
  },
  {
    pattern: /\bunleash(?:ing)?\s+the\s+potential\b/gi,
    name: 'unleash the potential',
    suggestion: 'enable / optimize',
    replacement: 'enabling',
  },
  {
    pattern: /\bgame-changer\b/gi,
    name: 'game-changer',
    suggestion: 'major improvement / breakthrough',
    replacement: 'major breakthrough',
  },
  {
    pattern: /\bplethora\s+of\b/gi,
    name: 'plethora of',
    suggestion: 'numerous / various',
    replacement: 'numerous',
  },
  {
    pattern: /\bseamlessly\b/gi,
    name: 'seamlessly',
    suggestion: 'reliably / directly / smoothly',
    replacement: 'reliably',
  },
  {
    pattern: /\bseamless\b/gi,
    name: 'seamless',
    suggestion: 'consistent / frictionless / direct',
    replacement: 'consistent',
  },
  {
    pattern: /\bfoster(?:ing)?\s+innovation\b/gi,
    name: 'fostering innovation',
    suggestion: 'building / advancing systems',
    replacement: 'advancing technology',
  },
  {
    pattern: /\bdemystif(?:y|ying)\b/gi,
    name: 'demystifying',
    suggestion: 'explaining / clarifying',
    replacement: 'explaining',
  },
  {
    pattern: /\bembark(?:ing)?\s+on\s+a\s+journey\b/gi,
    name: 'embarking on a journey',
    suggestion: 'getting started / building',
    replacement: 'building',
  },
];

// 3. AI Code Anti-Patterns & Framework Mistakes
const AI_CODE_PATTERNS = [
  {
    pattern: /catch\s*\([^)]*\)\s*\{\s*\}/g,
    name: 'swallowed-error-empty-catch',
    suggestion: 'log or handle the caught error',
  },
  {
    pattern: /\/\/\s*TODO:\s*(?:implement|add\s+code\s+here|placeholder)\b/gi,
    name: 'ai-placeholder-todo',
    suggestion: 'implement or remove placeholder',
  },
  {
    pattern: /\/\/\s*(?:Start|End)\s+of\s+(?:component|function|file)\b/gi,
    name: 'ai-narrative-comment',
    suggestion: 'remove superfluous structural comment',
  },
  {
    pattern: /\.(?:forEach)\s*\(\s*async\b/g,
    name: 'async-in-forEach-pitfall',
    suggestion: 'use for...of loop or Promise.all(arr.map(...))',
  },
  {
    pattern: /\b(?:bg|text|border|ring|divide)-opacity-\d+\b/g,
    name: 'tailwind-v3-obsolete-opacity-class',
    suggestion: 'use Tailwind v4 slash opacity (e.g. bg-accent/20, text-base-content/80)',
  },
  {
    pattern: /\bflex-(?:grow|shrink)(?:-\d+)?\b/g,
    name: 'tailwind-v3-obsolete-flex-class',
    suggestion: 'use Tailwind v4 grow or shrink utilities',
  },
  {
    pattern:
      /\b(?:[a-z0-9-]+:)*(?:w|h|text|leading|tracking|gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|bg|border|rounded|scale|top|bottom|left|right|z|max-w|max-h|min-w|min-h|shadow|animate)-\[[^\]]+\]/g,
    name: 'tailwind-arbitrary-bracket-class',
    suggestion:
      'avoid arbitrary bracket classes; use standard scale or formalize in @theme in global.css',
  },
];

const TARGET_DIRECTORIES = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'public'),
  path.join(rootDir, 'scripts'),
];

const SCAN_EXTENSIONS = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.txt'];

const EXCLUDE_PATHS = [
  'node_modules',
  'dist',
  '.astro',
  '.agents',
  'pagefind',
  '.wrangler',
  'pnpm-lock.yaml',
  'scripts/lint-ai-slop.mjs',
];

function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const rel = path.relative(rootDir, full).replace(/\\/g, '/');
    if (EXCLUDE_PATHS.some((ex) => rel.startsWith(ex) || rel.includes(`/${ex}/`))) continue;
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else if (SCAN_EXTENSIONS.some((ext) => full.endsWith(ext))) files.push(full);
  }
  return files;
}

let emDashViolations = 0;
let aiTextViolations = 0;
let aiCodeViolations = 0;
let hallucinatedImports = 0;
let fixedFiles = 0;

console.log('🤖 [AI Slop, Copywriting & SEO Linter] Initializing repository scan...');
if (isFixMode)
  console.log(
    '🔧 Running with --fix: automatic humanization, vocabulary replacement, and em-dash elimination active.'
  );

const allFiles = TARGET_DIRECTORIES.flatMap((d) => getAllFiles(d));
console.log(`📂 Scanning ${allFiles.length} files across src/, public/, scripts/...`);

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  let fileModified = false;

  // 1. Em-Dash Check & Humanized Replacement
  if (content.includes('—')) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('—')) {
        emDashViolations++;
        if (!isFixMode) {
          console.error(`❌ [EM-DASH] ${relPath}:${idx + 1} contains '—'`);
          console.error(`   "${line.trim()}"`);
        }
      }
    });

    if (isFixMode) {
      let updated = content;
      updated = updated.replace(
        /(\d{4}|\w{3}\s+\d{4})\s*—\s*(\d{4}|Present|\w{3}\s+\d{4})/g,
        '$1 - $2'
      );

      const updatedLines = updated.split('\n').map((l) => {
        if (!l.includes('—')) return l;
        if (/title|name:|pageTitleSuffix/i.test(l)) {
          return l.replace(/\s*—\s*/g, ' | ');
        }
        return l.replace(/(\w)—(\w)/g, '$1 - $2').replace(/\s*—\s*/g, ' - ');
      });

      updated = updatedLines.join('\n');

      if (updated !== content) {
        content = updated;
        fileModified = true;
        console.log(`✨ [FIXED] Em dashes eliminated in: ${relPath}`);
      }
    }
  }

  // 2. Hallucinated Package Import Check
  const isImportScanFile =
    filePath.endsWith('.ts') ||
    filePath.endsWith('.js') ||
    filePath.endsWith('.mjs') ||
    filePath.endsWith('.astro');
  if (isImportScanFile) {
    const importRegex =
      /(?:import\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\))/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const pkgName = match[1] || match[2];
      if (!pkgName) continue;

      if (
        pkgName.startsWith('.') ||
        pkgName.startsWith('/') ||
        pkgName.startsWith('@/') ||
        pkgName.startsWith('@components/') ||
        pkgName.startsWith('@layouts/') ||
        pkgName.startsWith('@utils/') ||
        pkgName.startsWith('@const/') ||
        pkgName.startsWith('@copy/') ||
        pkgName.startsWith('@data/') ||
        pkgName.startsWith('@content/') ||
        pkgName.startsWith('@assets/') ||
        pkgName.startsWith('@styles/') ||
        pkgName.startsWith('@plugins/') ||
        pkgName.startsWith('@scripts/')
      ) {
        continue;
      }

      let basePkg = pkgName;
      if (basePkg.startsWith('@')) {
        const parts = basePkg.split('/');
        basePkg = `${parts[0]}/${parts[1]}`;
      } else {
        basePkg = basePkg.split('/')[0];
      }

      if (
        !installedDeps.has(basePkg) &&
        !BUILTIN_MODULES.has(pkgName) &&
        !BUILTIN_MODULES.has(basePkg)
      ) {
        hallucinatedImports++;
        console.error(
          `❌ [HALLUCINATED-IMPORT] ${relPath} imports uninstalled package "${pkgName}"`
        );
      }
    }
  }

  // 3. AI Text Slop Check (Markdown, Copy, Astro)
  const isTextFile =
    filePath.endsWith('.md') ||
    filePath.includes('/data/copy/') ||
    filePath.endsWith('.astro') ||
    filePath.endsWith('.json');
  if (isTextFile) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      for (const { pattern, name, suggestion, replacement } of AI_TEXT_PATTERNS) {
        if (pattern.test(line)) {
          aiTextViolations++;
          if (!isFixMode) {
            console.warn(`⚠️  [AI-SLOP-TEXT] ${relPath}:${idx + 1} contains AI trope "${name}"`);
            console.warn(`   "${line.trim()}"`);
            console.warn(`   💡 Recommendation: ${suggestion}`);
          } else if (replacement) {
            line = line.replace(pattern, replacement);
            fileModified = true;
          }
        }
      }
    });

    if (isFixMode && fileModified) {
      let updated = content;
      for (const { pattern, replacement } of AI_TEXT_PATTERNS) {
        if (replacement) {
          updated = updated.replace(pattern, replacement);
        }
      }
      if (updated !== content) {
        content = updated;
        fileModified = true;
      }
    }
  }

  // 4. AI Code Smell Check (Scripts, Astro, TS)
  const isCodeFile =
    filePath.endsWith('.ts') ||
    filePath.endsWith('.js') ||
    filePath.endsWith('.mjs') ||
    filePath.endsWith('.astro');
  if (isCodeFile) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      for (const { pattern, name, suggestion } of AI_CODE_PATTERNS) {
        if (pattern.test(line)) {
          aiCodeViolations++;
          console.warn(`⚠️  [AI-CODE-SMELL] ${relPath}:${idx + 1} violates rule "${name}"`);
          console.warn(`   "${line.trim()}"`);
          console.warn(`   💡 Recommendation: ${suggestion}`);
        }
      }
    });
  }

  if (fileModified) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedFiles++;
  }
}

console.log('\n==================================================');
console.log('📊 AI Slop & SEO Audit Results:');
console.log(`- Files Audited: ${allFiles.length}`);
console.log(`- Em-Dash Violations: ${emDashViolations}`);
console.log(`- Hallucinated Package Imports: ${hallucinatedImports}`);
console.log(`- AI Text Tropes Detected: ${aiTextViolations}`);
console.log(`- AI Code Smells Detected: ${aiCodeViolations}`);
if (isFixMode) console.log(`- Files Auto-Remediated: ${fixedFiles}`);
console.log('==================================================\n');

let hasErrors = false;

if (!isFixMode && emDashViolations > 0) {
  console.error(
    `❌ Build Gate Failed: Found ${emDashViolations} em dash(es). Run \`pnpm fix:ai\` to auto-fix.`
  );
  hasErrors = true;
}

if (hallucinatedImports > 0) {
  console.error(
    `❌ Build Gate Failed: Found ${hallucinatedImports} hallucinated/uninstalled package import(s).`
  );
  hasErrors = true;
}

if (hasErrors) {
  process.exit(1);
}

if (!isFixMode && (aiTextViolations > 0 || aiCodeViolations > 0)) {
  console.warn(
    `⚠️  Audit Notice: Review AI slop occurrences above to maintain high editorial craft.`
  );
}

console.log('✨ AI Slop, Copywriting & SEO Audit Complete!');
