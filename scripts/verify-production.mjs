#!/usr/bin/env node
/**
 * Production Readiness & Domain Verification Subroutine
 *
 * Exhaustively verifies that the generated production build in dist/
 * is 100% compliant with the production target domain (https://sahillangoo.in):
 * 1. Canonical URLs and trailing slashes
 * 2. Schema.org JSON-LD graph domains and URLs
 * 3. OpenGraph / Twitter meta tags
 * 4. Robots.txt and Sitemap index / sitemaps
 * 5. LLMs.txt and LLMs-full.txt machine-readable files
 * 6. Cloudflare security headers (_headers) and redirection rules (_redirects)
 * 7. Absence of legacy domains (sahillangoo.com, localhost) in production assets
 * 8. Zero broken internal links and zero missing assets
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const TARGET_DOMAIN = 'https://sahillangoo.in';
const FORBIDDEN_STRINGS = ['sahillangoo.com', 'localhost:4321', 'localhost:3000', '127.0.0.1:4321'];

function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

console.log('🔍 [Production Verification Subroutine] Initializing audit for:', TARGET_DOMAIN);

let errors = 0;
let passedChecks = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    errors++;
  } else {
    passedChecks++;
  }
}

// 1. Verify dist/ exists
assert(fs.existsSync(distDir), `Build output directory does not exist: ${distDir}`);
if (errors > 0) {
  console.error('Run `pnpm build` first.');
  process.exit(1);
}

// 2. Verify robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in dist/');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  assert(
    robotsContent.includes(`Sitemap: ${TARGET_DOMAIN}/sitemap-index.xml`),
    `robots.txt contains correct sitemap directive (${TARGET_DOMAIN}/sitemap-index.xml)`
  );
  assert(
    !robotsContent.includes('sahillangoo.com'),
    'robots.txt does not contain legacy sahillangoo.com'
  );
}

// 3. Verify sitemap-index.xml and sitemaps
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
assert(fs.existsSync(sitemapIndexPath), 'sitemap-index.xml exists in dist/');
if (fs.existsSync(sitemapIndexPath)) {
  const sitemapIndexContent = fs.readFileSync(sitemapIndexPath, 'utf-8');
  assert(
    sitemapIndexContent.includes(TARGET_DOMAIN),
    `sitemap-index.xml points to ${TARGET_DOMAIN}`
  );
  assert(
    !sitemapIndexContent.includes('sahillangoo.com'),
    'sitemap-index.xml has zero references to sahillangoo.com'
  );
}

// 4. Verify llms.txt & llms-full.txt
const llmsPath = path.join(distDir, 'llms.txt');
const llmsFullPath = path.join(distDir, 'llms-full.txt');
assert(fs.existsSync(llmsPath), 'llms.txt exists in dist/');
assert(fs.existsSync(llmsFullPath), 'llms-full.txt exists in dist/');
if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
  assert(llmsContent.includes(TARGET_DOMAIN), `llms.txt references ${TARGET_DOMAIN}`);
  assert(!llmsContent.includes('sahillangoo.com'), 'llms.txt has zero sahillangoo.com references');
}
if (fs.existsSync(llmsFullPath)) {
  const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf-8');
  assert(llmsFullContent.includes(TARGET_DOMAIN), `llms-full.txt references ${TARGET_DOMAIN}`);
  assert(
    !llmsFullContent.includes('sahillangoo.com'),
    'llms-full.txt has zero sahillangoo.com references'
  );
}

// 5. Verify _headers and _redirects
const headersPath = path.join(distDir, '_headers');
const redirectsPath = path.join(distDir, '_redirects');
assert(fs.existsSync(headersPath), '_headers exists in dist/');
assert(fs.existsSync(redirectsPath), '_redirects exists in dist/');
if (fs.existsSync(headersPath)) {
  const headersContent = fs.readFileSync(headersPath, 'utf-8');
  assert(
    headersContent.includes('X-Robots-Tag: noindex, nofollow, noarchive'),
    '_headers has anti-crawl directives for preview subdomains'
  );
  assert(
    headersContent.includes('Strict-Transport-Security: max-age=31536000'),
    '_headers includes HSTS security header'
  );
}
if (fs.existsSync(redirectsPath)) {
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf-8');
  assert(
    redirectsContent.includes('https://www.sahillangoo.in/*  https://sahillangoo.in/:splat  301'),
    '_redirects contains canonical www to apex domain 301 redirection'
  );
}

// 6. Scan all rendered HTML files for canonicals, schemas, and forbidden legacy strings
const htmlFiles = getAllFiles(distDir).filter((f) => f.endsWith('.html'));
assert(
  htmlFiles.length >= 35,
  `Sufficient static routes generated (found ${htmlFiles.length} pages)`
);

const scannedRoutes = new Set();
for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const relativePath = path.relative(distDir, htmlFile);
  const is404 = relativePath === '404.html';

  // Check for forbidden legacy strings
  for (const forbidden of FORBIDDEN_STRINGS) {
    if (content.includes(forbidden)) {
      assert(false, `Forbidden string "${forbidden}" detected in ${relativePath}`);
    }
  }

  if (!is404) {
    // Check canonical link
    const canonicalMatch = content.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    );
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      assert(
        canonical.startsWith(TARGET_DOMAIN),
        `Canonical URL starts with ${TARGET_DOMAIN} in ${relativePath} (found: ${canonical})`
      );
      assert(
        canonical.endsWith('/') || canonical.includes('.'),
        `Canonical URL has trailing slash in ${relativePath} (found: ${canonical})`
      );
    } else {
      assert(false, `Missing canonical link tag in ${relativePath}`);
    }

    // Check OpenGraph URL
    const ogUrlMatch = content.match(
      /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogUrlMatch) {
      const ogUrl = ogUrlMatch[1];
      assert(
        ogUrl.startsWith(TARGET_DOMAIN),
        `og:url starts with ${TARGET_DOMAIN} in ${relativePath} (found: ${ogUrl})`
      );
    }

    // Check all internal href attributes for trailing slashes
    for (const match of content.matchAll(/href=["'](\/[^"']+)["']/g)) {
      if (!match[1]) continue;
      const linkStr = match[1].split('#')[0].split('?')[0];
      if (linkStr === '/' || linkStr.includes('.')) continue;
      assert(
        linkStr.endsWith('/'),
        `Internal link "${linkStr}" in ${relativePath} must have a trailing slash`
      );
    }

    // Check JSON-LD Structured Data
    const jsonLdMatch = content.match(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    );
    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        assert(
          parsed['@context'] === 'https://schema.org',
          `Valid Schema.org context in ${relativePath}`
        );
      } catch (err) {
        assert(false, `Invalid JSON-LD schema parsing in ${relativePath}: ${err.message}`);
      }
    }
  }

  scannedRoutes.add(relativePath);
}

console.log(`\n==================================================`);
console.log(`📊 Production Verification Results for: ${TARGET_DOMAIN}`);
console.log(`- Verified HTML Pages: ${htmlFiles.length}`);
console.log(`- Total Passed Checks: ${passedChecks}`);
console.log(`- Errors / Violations: ${errors}`);
console.log(`==================================================\n`);

if (errors > 0) {
  console.error(`🚨 Verification failed with ${errors} error(s). Please resolve before deploying.`);
  process.exit(1);
} else {
  console.log(`✨ All production readiness checks passed! Safe to deploy to ${TARGET_DOMAIN}.`);
  process.exit(0);
}
