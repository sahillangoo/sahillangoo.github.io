#!/usr/bin/env node
/**
 * Linkinator Link & Fragment Anchor SEO Crawler
 *
 * Scans all generated HTML pages in dist/ to ensure:
 * 1. Zero 404 dead links across all routes, assets, and images.
 * 2. Valid URL fragment identifiers / anchors (#section-id).
 * 3. Consistent internal link routing and trailing slashes.
 *
 * Usage:
 *   node scripts/audit-links.mjs           # Internal link + fragment check (fast, deterministic)
 *   node scripts/audit-links.mjs --all     # Internal + external links check
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { check } from 'linkinator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const checkAll = process.argv.includes('--all') || process.argv.includes('--external');

console.log('🔗 [Linkinator Link Crawler] Initializing link audit...');
console.log(`📂 Scanning build directory: ${distDir}`);
console.log(
  `🌐 Mode: ${checkAll ? 'Full (Internal + External URLs)' : 'Internal Only (Skipping third-party domains)'}`
);

if (!fs.existsSync(distDir)) {
  console.error(`❌ Build directory does not exist at ${distDir}. Run \`pnpm build\` first.`);
  process.exit(1);
}

const startTime = Date.now();

try {
  const result = await check({
    path: '**/*.html',
    serverRoot: 'dist',
    directoryListing: true,
    recurse: false,
    checkFragments: true,
    allowInsecureCerts: true,
    linksToSkip: checkAll ? [] : ['^(https?:\\/\\/(?!localhost|127\\.0\\.0\\.1|sahillangoo\\.in))'],
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalLinks = result.links.length;
  const brokenLinks = result.links.filter((l) => l.state === 'BROKEN');
  const skippedLinks = result.links.filter((l) => l.state === 'SKIPPED');
  const passedLinks = result.links.filter((l) => l.state === 'OK');

  console.log('\n==================================================');
  console.log('📊 Link & Anchor Audit Results:');
  console.log(`- Total Links Checked: ${totalLinks}`);
  console.log(`  * Valid Links (OK): ${passedLinks.length}`);
  console.log(`  * Skipped Links: ${skippedLinks.length}`);
  console.log(`  * Broken Links: ${brokenLinks.length}`);
  console.log(`- Scan Duration: ${durationSec}s`);
  console.log('==================================================\n');

  if (brokenLinks.length > 0) {
    console.error(`🚨 Detected ${brokenLinks.length} broken link(s):`);
    for (const link of brokenLinks) {
      console.error(
        `  - [Status ${link.status || 'ERR'}] ${link.url} (Parent: ${link.parent || 'root'})`
      );
    }
    process.exit(1);
  }

  console.log('✨ All links and fragment anchors verified successfully! Zero broken links.');
  process.exit(0);
} catch (err) {
  console.error('❌ Linkinator crawl encountered an error:', err.message);
  process.exit(1);
}
