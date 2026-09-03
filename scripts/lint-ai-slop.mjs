#!/usr/bin/env node
/**
 * AI Slop, Anti-Pattern, Copywriting & SEO Static Analysis Engine
 *
 * Exhaustively audits content collections, website copy, templates, and metadata for:
 * 1. Tier 1 (Errors, Exit 1):
 *    - Em dashes (— / \u2014) across all copy, content, and titles
 *    - User-facing emojis in content, prose, and headings
 *    - High-confidence AI filler tropes ("delve into", "rich tapestry", "testament to", etc.)
 *    - Hallucinated / uninstalled package imports
 * 2. Tier 2 (Warnings, Exit 0 normally, Exit 1 with --strict):
 *    - Tech & resume buzzwords ("proven track record", "spearheaded", "passionate about", etc.)
 *    - AI code smells (empty catch, placeholder TODOs, async in forEach, obsolete Tailwind v3 syntax)
 *
 * Supports:
 * - --strict: Fail the build on any Tier 2 warnings
 * - --fix: Automatically humanize text, replace AI clichés, and normalize typography outside code fences
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isFixMode = process.argv.includes('--fix');
const isStrictMode = process.argv.includes('--strict');

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

// 2. Tier 1: High-Confidence AI Filler Tropes (Exit 1 Errors)
const TIER_1_TEXT_PATTERNS = [
  {
    pattern: /\bdelv(?:e|es|ed|ing)\s+into\b/i,
    name: 'delve into',
    suggestion: 'explore / analyze / examine / build',
    replacement: 'explore',
  },
  {
    pattern: /\brich\s+tapestry\b/i,
    name: 'rich tapestry',
    suggestion: 'broad collection / diverse ecosystem',
    replacement: 'broad collection',
  },
  {
    pattern: /\btapestry\s+of\b/i,
    name: 'tapestry of',
    suggestion: 'array of / combination of',
    replacement: 'array of',
  },
  {
    pattern: /\bstands?\s+as\s+a\s+testament\b/i,
    name: 'stands as a testament',
    suggestion: 'proves / demonstrates / shows',
    replacement: 'demonstrates',
  },
  {
    pattern: /\ba\s+testament\s+to\b/i,
    name: 'a testament to',
    suggestion: 'evidence of / reflects',
    replacement: 'evidence of',
  },
  {
    pattern: /\bbeacon\s+of\b/i,
    name: 'beacon of',
    suggestion: 'standard for / benchmark for',
    replacement: 'standard for',
  },
  {
    pattern: /\bin\s+today's\s+(?:digital\s+landscape|rapidly\s+evolving|fast-paced)\b/i,
    name: "in today's ...",
    suggestion: 'cut phrase entirely',
    replacement: 'currently',
  },
  {
    pattern: /\bin\s+an\s+era\s+where\b/i,
    name: 'in an era where',
    suggestion: 'cut phrase or state directly',
    replacement: 'when',
  },
  {
    pattern: /\bpivotal\s+role\b/i,
    name: 'pivotal role',
    suggestion: 'key role / primary function',
    replacement: 'key role',
  },
  {
    pattern: /\bit\s+is\s+(?:crucial|vital|essential)\s+to\s+(?:note|remember|understand)\b/i,
    name: 'it is crucial to note...',
    suggestion: 'state directly without filler',
    replacement: 'notably,',
  },
  {
    pattern: /\bharness(?:ing)?\s+the\s+power\s+of\b/i,
    name: 'harness the power of',
    suggestion: 'using / applying',
    replacement: 'using',
  },
  {
    pattern: /\bleverage\s+the\s+power\s+of\b/i,
    name: 'leverage the power of',
    suggestion: 'utilizing / adopting',
    replacement: 'utilizing',
  },
  {
    pattern: /\bunleash(?:ing)?\s+the\s+potential\b/i,
    name: 'unleash the potential',
    suggestion: 'enable / optimize',
    replacement: 'enabling',
  },
  {
    pattern: /\bgame-changer\b/i,
    name: 'game-changer',
    suggestion: 'major improvement / breakthrough',
    replacement: 'major breakthrough',
  },
  {
    pattern: /\bplethora\s+of\b/i,
    name: 'plethora of',
    suggestion: 'numerous / various',
    replacement: 'numerous',
  },
  {
    pattern: /\bseamlessly\b/i,
    name: 'seamlessly',
    suggestion: 'reliably / directly / smoothly',
    replacement: 'reliably',
  },
  {
    pattern: /\bseamless\b/i,
    name: 'seamless',
    suggestion: 'consistent / frictionless / direct',
    replacement: 'consistent',
  },
  {
    pattern: /\bfoster(?:ing)?\s+innovation\b/i,
    name: 'fostering innovation',
    suggestion: 'building / advancing systems',
    replacement: 'advancing technology',
  },
  {
    pattern: /\bdemystif(?:y|ying)\b/i,
    name: 'demystifying',
    suggestion: 'explaining / clarifying',
    replacement: 'explaining',
  },
  {
    pattern: /\bembark(?:ing)?\s+on\s+a\s+journey\b/i,
    name: 'embarking on a journey',
    suggestion: 'getting started / building',
    replacement: 'building',
  },
];

// 3. Tier 2: Resume & Tech Buzzwords (Warnings, Exit 1 only with --strict)
const TIER_2_TEXT_PATTERNS = [
  {
    pattern: /\bproven\s+(?:track\s+)?record\b/i,
    name: 'proven track record',
    suggestion: 'experienced in / history of / demonstrated ability',
    replacement: 'experienced in',
  },
  {
    pattern: /\bspearhead(?:ed|ing)?\b/i,
    name: 'spearheaded',
    suggestion: 'led / architected / directed',
    replacement: 'architected',
  },
  {
    pattern: /\bpassionate\s+about\b/i,
    name: 'passionate about',
    suggestion: 'focused on / dedicated to / building',
    replacement: 'focused on',
  },
  {
    pattern: /\bcutting[- ]edge\b/i,
    name: 'cutting-edge',
    suggestion: 'modern / production / advanced',
    replacement: 'modern',
  },
  {
    pattern: /\bstate[- ]of[- ]the[- ]art\b/i,
    name: 'state-of-the-art',
    suggestion: 'high-performance / advanced / modern',
    replacement: 'modern',
  },
  {
    pattern: /\bsupercharg(?:e|ed|ing|es)\b/i,
    name: 'supercharge',
    suggestion: 'accelerate / optimize / enhance',
    replacement: 'accelerate',
  },
];

// 4. Tier 2: AI Code Anti-Patterns & Framework Mistakes (Warnings)
const AI_CODE_PATTERNS = [
  {
    pattern: /catch\s*\([^)]*\)\s*\{\s*\}/,
    name: 'swallowed-error-empty-catch',
    suggestion: 'log or handle the caught error',
  },
  {
    pattern: /\/\/\s*TODO:\s*(?:implement|add\s+code\s+here|placeholder)\b/i,
    name: 'ai-placeholder-todo',
    suggestion: 'implement or remove placeholder',
  },
  {
    pattern: /\/\/\s*(?:Start|End)\s+of\s+(?:component|function|file)\b/i,
    name: 'ai-narrative-comment',
    suggestion: 'remove superfluous structural comment',
  },
  {
    pattern: /\.(?:forEach)\s*\(\s*async\b/,
    name: 'async-in-forEach-pitfall',
    suggestion: 'use for...of loop or Promise.all(arr.map(...))',
  },
  {
    pattern: /\b(?:bg|text|border|ring|divide)-opacity-\d+\b/,
    name: 'tailwind-v3-obsolete-opacity-class',
    suggestion: 'use Tailwind v4 slash opacity (e.g. bg-accent/20, text-base-content/80)',
  },
  {
    pattern: /\bflex-(?:grow|shrink)(?:-\d+)?\b/,
    name: 'tailwind-v3-obsolete-flex-class',
    suggestion: 'use Tailwind v4 grow or shrink utilities',
  },
  {
    pattern:
      /\b(?:[a-z0-9-]+:)*(?:w|h|text|leading|tracking|gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|bg|border|rounded|scale|top|bottom|left|right|z|max-w|max-h|min-w|min-h|shadow|animate)-\[[^\]]+\]/,
    name: 'tailwind-arbitrary-bracket-class',
    suggestion:
      'avoid arbitrary bracket classes; use standard scale or formalize in @theme in global.css',
  },
];

// Emoji Detection: Extended Pictographic, excluding legal typographic symbols (©, ®, ™)
const EMOJI_REGEX = /(?![©®™])\p{Extended_Pictographic}/u;
const EMOJI_GLOBAL_REGEX = /(?![©®™])\p{Extended_Pictographic}/gu;

// Em-Dash Detection: literal '—' or HTML entities
const EM_DASH_REGEX = /(?:—|&mdash;|&#8212;|&#x2014;)/;

const TARGET_DIRECTORIES = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'public'),
  path.join(rootDir, 'scripts'),
];

const SCAN_EXTENSIONS = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.mdx', '.txt'];

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
    if (
      EXCLUDE_PATHS.some(
        (ex) => rel === ex || rel.startsWith(`${ex}/`) || rel.includes(`/${ex}/`)
      )
    )
      continue;
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else if (SCAN_EXTENSIONS.some((ext) => full.endsWith(ext))) files.push(full);
  }
  return files;
}

function getAuditFiles() {
  const files = TARGET_DIRECTORIES.flatMap((d) => getAllFiles(d));
  const rootReadme = path.join(rootDir, 'README.md');
  if (fs.existsSync(rootReadme) && !files.includes(rootReadme)) {
    files.push(rootReadme);
  }
  return files;
}

function isUserContentFile(relPath) {
  // Strictly scope user-facing content/prose/emoji checks: exclude infrastructure and internal utilities
  if (
    relPath.startsWith('scripts/') ||
    relPath.startsWith('src/plugins/') ||
    relPath.startsWith('src/utils/') ||
    relPath.startsWith('src/styles/') ||
    relPath.endsWith('.d.ts') ||
    relPath === 'src/data/copy/types.ts'
  ) {
    return false;
  }
  if (relPath.endsWith('.json')) {
    if (relPath.includes('package.json') || relPath.includes('tsconfig')) return false;
    return true;
  }
  if (relPath === 'README.md') return true;
  if (relPath.endsWith('.md') || relPath.endsWith('.mdx')) return true;
  if (
    relPath.startsWith('public/') &&
    (relPath.endsWith('.txt') || relPath.endsWith('.md') || relPath.endsWith('.json'))
  ) {
    return true;
  }
  if (relPath.startsWith('src/data/copy/')) return true;
  if (relPath.startsWith('src/data/resumes/')) return true;
  if (relPath.startsWith('src/content/')) return true;
  if (relPath.startsWith('src/const/')) return true;
  if (relPath.endsWith('.astro')) return true;
  return false;
}

function isCodeFile(relPath) {
  return (
    relPath.endsWith('.ts') ||
    relPath.endsWith('.tsx') ||
    relPath.endsWith('.js') ||
    relPath.endsWith('.mjs') ||
    relPath.endsWith('.astro')
  );
}

function isImportScanFile(relPath) {
  return (
    relPath.endsWith('.ts') ||
    relPath.endsWith('.tsx') ||
    relPath.endsWith('.js') ||
    relPath.endsWith('.mjs') ||
    relPath.endsWith('.astro')
  );
}

function maskMarkdownInlineCode(line, state) {
  let result = '';
  let i = 0;
  while (i < line.length) {
    if (state.inInlineCode) {
      const delim = '`'.repeat(state.inlineDelimLen);
      const closeIdx = line.indexOf(delim, i);
      if (closeIdx === -1) {
        result += ' '.repeat(line.length - i);
        i = line.length;
      } else {
        result += ' '.repeat(closeIdx + delim.length - i);
        i = closeIdx + delim.length;
        state.inInlineCode = false;
        state.inlineDelimLen = 0;
      }
    } else {
      if (line[i] === '`') {
        let count = 1;
        while (i + count < line.length && line[i + count] === '`') {
          count++;
        }
        const delim = '`'.repeat(count);
        const closeIdx = line.indexOf(delim, i + count);
        if (closeIdx === -1) {
          state.inInlineCode = true;
          state.inlineDelimLen = count;
          result += ' '.repeat(line.length - i);
          i = line.length;
        } else {
          result += ' '.repeat(closeIdx + count - i);
          i = closeIdx + count;
        }
      } else {
        result += line[i];
        i++;
      }
    }
  }
  return result;
}

function replaceEmDashes(text, isTitleLine) {
  if (!EM_DASH_REGEX.test(text)) return text;
  if (isTitleLine) {
    return text.replace(/(?:\s*(?:—|&mdash;|&#8212;|&#x2014;)\s*)/g, ' | ');
  } else {
    return text
      .replace(
        /(\d{4}|\w{3}\s+\d{4})\s*(?:—|&mdash;|&#8212;|&#x2014;)\s*(\d{4}|Present|\w{3}\s+\d{4})/g,
        '$1 - $2'
      )
      .replace(/(\w)(?:—|&mdash;|&#8212;|&#x2014;)(\w)/g, '$1 - $2')
      .replace(/(?:\s*(?:—|&mdash;|&#8212;|&#x2014;)\s*)/g, ' - ');
  }
}

function applyFixesToProse(text, fullLine) {
  let fixed = text;
  const isTitleLine = /title|name:|pageTitleSuffix/i.test(fullLine);

  if (EM_DASH_REGEX.test(fixed)) {
    fixed = replaceEmDashes(fixed, isTitleLine);
  }

  if (EMOJI_REGEX.test(fixed)) {
    fixed = fixed.replace(EMOJI_GLOBAL_REGEX, '').replace(/\s{2,}/g, ' ');
  }

  for (const { pattern, replacement } of TIER_1_TEXT_PATTERNS) {
    if (replacement && pattern.test(fixed)) {
      const globalRegex = new RegExp(pattern.source, 'gi');
      fixed = fixed.replace(globalRegex, replacement);
    }
  }

  for (const { pattern, replacement } of TIER_2_TEXT_PATTERNS) {
    if (replacement && pattern.test(fixed)) {
      const globalRegex = new RegExp(pattern.source, 'gi');
      fixed = fixed.replace(globalRegex, replacement);
    }
  }

  return fixed;
}

let emDashViolations = 0;
let emojiViolations = 0;
let tier1TextViolations = 0;
let tier2TextViolations = 0;
let aiCodeViolations = 0;
let hallucinatedImports = 0;
let fixedFiles = 0;

console.log('🤖 [AI Slop, Copywriting & SEO Linter] Initializing repository scan...');
if (isFixMode)
  console.log(
    '🔧 Running with --fix: automatic humanization, vocabulary replacement, and em-dash elimination active.'
  );
if (isStrictMode)
  console.log('🛡️  Running with --strict: Tier 2 warnings will trigger process exit 1.');

const allFiles = getAuditFiles();
console.log(`📂 Scanning ${allFiles.length} files across src/, public/, scripts/, root...`);

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  let fileModified = false;

  // 1. Hallucinated Package Import Check (Tier 1 Error)
  if (isImportScanFile(relPath)) {
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
          `❌ [TIER-1-IMPORT] ${relPath} imports uninstalled package "${pkgName}"`
        );
      }
    }
  }

  // 2. User Content Scanner (Tier 1 & Tier 2 Text, Em-Dashes, Emojis)
  if (isUserContentFile(relPath)) {
    const isMarkdown =
      relPath.endsWith('.md') || relPath.endsWith('.mdx') || relPath === 'README.md';
    const isAstro = relPath.endsWith('.astro');

    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockChar = '';
    let codeBlockLength = 0;
    const inlineCodeState = { inInlineCode: false, inlineDelimLen: 0 };

    let inAstroFrontmatter = false;
    let astroFrontmatterCount = 0;
    let inScriptTag = false;
    let inStyleTag = false;

    const updatedLines = [];

    for (let idx = 0; idx < lines.length; idx++) {
      let line = lines[idx];
      const trimmed = line.trim();

      // In Astro files: track frontmatter, script, and style blocks (treat them as code, not prose)
      if (isAstro) {
        if (trimmed === '---') {
          astroFrontmatterCount++;
          inAstroFrontmatter = astroFrontmatterCount === 1;
          updatedLines.push(line);
          continue;
        }
        if (inAstroFrontmatter) {
          updatedLines.push(line);
          continue;
        }
        if (/<script\b/i.test(trimmed)) {
          inScriptTag = true;
        }
        if (inScriptTag) {
          if (/<\/script>/i.test(trimmed)) inScriptTag = false;
          updatedLines.push(line);
          continue;
        }
        if (/<style\b/i.test(trimmed)) {
          inStyleTag = true;
        }
        if (inStyleTag) {
          if (/<\/style>/i.test(trimmed)) inStyleTag = false;
          updatedLines.push(line);
          continue;
        }
      }

      // In Markdown files: Code-fence state machine supporting arbitrary length delimiters
      if (isMarkdown) {
        const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
        if (!inCodeBlock && fenceMatch) {
          inCodeBlock = true;
          codeBlockChar = fenceMatch[1][0];
          codeBlockLength = fenceMatch[1].length;
          updatedLines.push(line);
          continue;
        } else if (inCodeBlock) {
          const closeMatch = trimmed.match(/^(`{3,}|~{3,})/);
          if (
            closeMatch &&
            closeMatch[1][0] === codeBlockChar &&
            closeMatch[1].length >= codeBlockLength &&
            trimmed.slice(closeMatch[1].length).trim() === ''
          ) {
            inCodeBlock = false;
            codeBlockChar = '';
            codeBlockLength = 0;
          }
          updatedLines.push(line);
          continue;
        }
      }

      // 2e. Auto-Remediation (--fix)
      if (isFixMode) {
        let newLine;
        if (isMarkdown) {
          const segments = line.split(/(`+[^`\n]+`+)/g);
          const fixedSegments = segments.map((seg, segIdx) => {
            if (segIdx % 2 === 1) return seg; // Inside inline code: preserve untouched
            return applyFixesToProse(seg, line);
          });
          newLine = fixedSegments.join('');
        } else {
          newLine = applyFixesToProse(line, line);
        }

        if (newLine !== line) {
          line = newLine;
          fileModified = true;
        }

        // Audit the line after fixing for any remaining unfixable errors
        const postFixedMasked = isMarkdown ? maskMarkdownInlineCode(line, inlineCodeState) : line;
        if (EM_DASH_REGEX.test(postFixedMasked)) {
          emDashViolations++;
          console.error(`❌ [TIER-1-EM-DASH] ${relPath}:${idx + 1} contains unfixable em-dash ('—')`);
        }
        if (EMOJI_REGEX.test(postFixedMasked)) {
          emojiViolations++;
          console.error(`❌ [TIER-1-EMOJI] ${relPath}:${idx + 1} contains unfixable user-facing emoji`);
        }
        for (const { pattern, name } of TIER_1_TEXT_PATTERNS) {
          if (pattern.test(postFixedMasked)) {
            tier1TextViolations++;
            console.error(`❌ [TIER-1-AI-TEXT] ${relPath}:${idx + 1} contains unfixable AI filler "${name}"`);
          }
        }
        for (const { pattern, name } of TIER_2_TEXT_PATTERNS) {
          if (pattern.test(postFixedMasked)) {
            tier2TextViolations++;
            console.warn(`⚠️  [TIER-2-BUZZWORD] ${relPath}:${idx + 1} contains unfixable buzzword "${name}"`);
          }
        }
      } else {
        // Prepare audited line: for Markdown mask inline code spans; for TS/JS template literals preserve as copy
        const maskedLine = isMarkdown ? maskMarkdownInlineCode(line, inlineCodeState) : line;

        // 2a. Em-Dash Check (Tier 1 Error)
        if (EM_DASH_REGEX.test(maskedLine)) {
          emDashViolations++;
          console.error(`❌ [TIER-1-EM-DASH] ${relPath}:${idx + 1} contains em-dash ('—')`);
          console.error(`   "${line.trim()}"`);
        }

        // 2b. User-Facing Emoji Check (Tier 1 Error, excluding legal typography ©, ®, ™)
        if (EMOJI_REGEX.test(maskedLine)) {
          emojiViolations++;
          console.error(`❌ [TIER-1-EMOJI] ${relPath}:${idx + 1} contains user-facing emoji`);
          console.error(`   "${line.trim()}"`);
        }

        // 2c. Tier 1 High-Confidence AI Filler Tropes (Tier 1 Error)
        for (const { pattern, name, suggestion } of TIER_1_TEXT_PATTERNS) {
          if (pattern.test(maskedLine)) {
            tier1TextViolations++;
            console.error(
              `❌ [TIER-1-AI-TEXT] ${relPath}:${idx + 1} contains AI filler "${name}"`
            );
            console.error(`   "${line.trim()}"`);
            console.error(`   💡 Recommendation: ${suggestion}`);
          }
        }

        // 2d. Tier 2 Resume & Tech Buzzwords (Tier 2 Warning)
        for (const { pattern, name, suggestion } of TIER_2_TEXT_PATTERNS) {
          if (pattern.test(maskedLine)) {
            tier2TextViolations++;
            console.warn(
              `⚠️  [TIER-2-BUZZWORD] ${relPath}:${idx + 1} contains buzzword "${name}"`
            );
            console.warn(`   "${line.trim()}"`);
            console.warn(`   💡 Recommendation: ${suggestion}`);
          }
        }
      }

      updatedLines.push(line);
    }

    if (isFixMode && fileModified) {
      content = updatedLines.join('\n');
    }
  }

  // 3. AI Code Anti-Patterns & Framework Mistakes (Tier 2 Warnings)
  if (isCodeFile(relPath)) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      for (const { pattern, name, suggestion } of AI_CODE_PATTERNS) {
        if (pattern.test(line)) {
          aiCodeViolations++;
          console.warn(`⚠️  [TIER-2-CODE-SMELL] ${relPath}:${idx + 1} violates rule "${name}"`);
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

const totalTier1Errors =
  emDashViolations + emojiViolations + tier1TextViolations + hallucinatedImports;
const totalTier2Warnings = tier2TextViolations + aiCodeViolations;

console.log('\n==================================================');
console.log('📊 AI Slop, Copywriting & SEO Audit Results:');
console.log(`- Files Audited: ${allFiles.length}`);
if (isFixMode) {
  console.log(`- Files Auto-Remediated: ${fixedFiles}`);
  console.log(`- Remaining Tier 1 Errors: ${totalTier1Errors}`);
  console.log(`- Remaining Tier 2 Warnings: ${totalTier2Warnings}`);
} else {
  console.log(`- Tier 1 Errors (Exit 1):`);
  console.log(`    * Em-Dash Violations: ${emDashViolations}`);
  console.log(`    * User-Facing Emojis: ${emojiViolations}`);
  console.log(`    * AI Filler Clichés: ${tier1TextViolations}`);
  console.log(`    * Hallucinated Imports: ${hallucinatedImports}`);
  console.log(`- Tier 2 Warnings (${isStrictMode ? 'Strict Mode: Exit 1' : 'Exit 0'}):`);
  console.log(`    * Tech/Resume Buzzwords: ${tier2TextViolations}`);
  console.log(`    * AI Code Smells: ${aiCodeViolations}`);
}
console.log('==================================================\n');

let hasFailed = false;

if (totalTier1Errors > 0) {
  if (isFixMode) {
    console.error(
      `❌ Build Gate Failed: Found ${totalTier1Errors} unfixable Tier 1 error(s). Review logs above.`
    );
  } else {
    console.error(
      `❌ Build Gate Failed: Found ${totalTier1Errors} Tier 1 error(s). Run \`pnpm fix:ai\` to auto-fix where possible.`
    );
  }
  hasFailed = true;
}

if (isStrictMode && totalTier2Warnings > 0) {
  console.error(
    `❌ Strict Gate Failed: Found ${totalTier2Warnings} Tier 2 warning(s) under --strict.`
  );
  hasFailed = true;
}

if (hasFailed) {
  process.exit(1);
}

if (!isFixMode && totalTier2Warnings > 0) {
  console.warn(
    `⚠️  Audit Notice: Review ${totalTier2Warnings} Tier 2 warning(s) above to maintain high editorial craft.`
  );
}

if (isFixMode && fixedFiles > 0) {
  console.log(`✨ Auto-remediation complete: ${fixedFiles} file(s) updated. All issues resolved!`);
} else {
  console.log('✨ AI Slop, Copywriting & SEO Audit Passed!');
}
