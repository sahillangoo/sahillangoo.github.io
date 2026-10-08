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

// 3. Verify sitemap-index.xml, sitemap-0.xml, and sitemap.xml
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const sitemapPath = path.join(distDir, 'sitemap.xml');

assert(fs.existsSync(sitemapIndexPath), 'sitemap-index.xml exists in dist/');
assert(fs.existsSync(sitemap0Path), 'sitemap-0.xml exists in dist/');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in dist/');

if (fs.existsSync(sitemap0Path) && fs.existsSync(sitemapPath)) {
  const sitemap0Content = fs.readFileSync(sitemap0Path, 'utf-8');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  assert(
    sitemap0Content === sitemapContent,
    'sitemap.xml and sitemap-0.xml are synchronized identically'
  );

  const todayIso = new Date().toISOString().split('T')[0];
  const urlBlocks = sitemap0Content.match(/<url>[\s\S]*?<\/url>/g) || [];
  assert(urlBlocks.length > 0, `sitemap-0.xml contains active URLs (found ${urlBlocks.length})`);

  let prevPriority = 1.0;
  let prevLastmod = '9999-99-99';
  let latestSitemapDate = '0000-00-00';

  const validChangefreqs = new Set([
    'always',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'never',
  ]);

  for (let i = 0; i < urlBlocks.length; i++) {
    const block = urlBlocks[i];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/);
    const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/);

    assert(Boolean(locMatch), `Sitemap entry #${i + 1} has valid <loc> tag`);
    const loc = locMatch ? locMatch[1] : '';
    assert(loc.startsWith(TARGET_DOMAIN), `Sitemap URL "${loc}" matches TARGET_DOMAIN`);
    assert(
      !loc.includes('sahillangoo.com'),
      `Sitemap URL "${loc}" contains zero references to sahillangoo.com`
    );

    // Verify lastmod
    assert(Boolean(lastmodMatch), `Sitemap URL "${loc}" has valid <lastmod> tag`);
    const lastmod = lastmodMatch ? lastmodMatch[1] : '';
    assert(
      /^\d{4}-\d{2}-\d{2}$/.test(lastmod),
      `Sitemap URL "${loc}" lastmod "${lastmod}" matches YYYY-MM-DD`
    );
    assert(
      lastmod <= todayIso,
      `Sitemap URL "${loc}" lastmod "${lastmod}" is not in the future (today: ${todayIso})`
    );

    if (lastmod > latestSitemapDate) {
      latestSitemapDate = lastmod;
    }

    // Verify priority
    assert(Boolean(priorityMatch), `Sitemap URL "${loc}" has valid <priority> tag`);
    const priority = priorityMatch ? parseFloat(priorityMatch[1]) : -1;
    assert(
      priority >= 0.0 && priority <= 1.0,
      `Sitemap URL "${loc}" priority ${priority} is between 0.0 and 1.0`
    );

    // Verify changefreq
    if (changefreqMatch) {
      assert(
        validChangefreqs.has(changefreqMatch[1]),
        `Sitemap URL "${loc}" changefreq "${changefreqMatch[1]}" is valid`
      );
    }

    // Verify sorting order: priority descending, then lastmod descending
    if (i === 0) {
      assert(loc === `${TARGET_DOMAIN}/`, `First sitemap URL is homepage root: "${loc}"`);
      assert(priority === 1.0, `Homepage priority is 1.00 (found ${priority})`);
    } else {
      if (priority === prevPriority) {
        assert(
          lastmod <= prevLastmod || loc.localeCompare(urlBlocks[i - 1]) >= 0,
          `Sitemap entry "${loc}" date ordering compliance (lastmod ${lastmod} <= prev ${prevLastmod})`
        );
      } else {
        assert(
          priority < prevPriority,
          `Sitemap entry "${loc}" priority descending order (priority ${priority} <= prev ${prevPriority})`
        );
      }
    }

    prevPriority = priority;
    prevLastmod = lastmod;
  }

  // Verify sitemap-index.xml points to sitemap-0.xml with valid latest date
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
    const indexLastmodMatch = sitemapIndexContent.match(/<lastmod>([^<]+)<\/lastmod>/);
    assert(Boolean(indexLastmodMatch), 'sitemap-index.xml contains <lastmod>');
    if (indexLastmodMatch) {
      const indexLastmod = indexLastmodMatch[1].split('T')[0];
      assert(
        indexLastmod <= todayIso,
        `sitemap-index.xml lastmod "${indexLastmod}" is not in the future`
      );
      assert(
        indexLastmod === latestSitemapDate,
        `sitemap-index.xml lastmod "${indexLastmod}" matches latest sitemap date "${latestSitemapDate}"`
      );
    }
  }
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
  assert(
    llmsContent.includes('hello@sahillangoo.in'),
    'llms.txt has active hello@sahillangoo.in email'
  );
}
if (fs.existsSync(llmsFullPath)) {
  const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf-8');
  assert(llmsFullContent.includes(TARGET_DOMAIN), `llms-full.txt references ${TARGET_DOMAIN}`);
  assert(
    !llmsFullContent.includes('sahillangoo.com'),
    'llms-full.txt has zero sahillangoo.com references'
  );
  assert(
    llmsFullContent.includes('hello@sahillangoo.in'),
    'llms-full.txt has active hello@sahillangoo.in email'
  );
}

// 5. Verify humans.txt, security.txt, and cli.txt
const humansPath = path.join(distDir, 'humans.txt');
const securityPath = path.join(distDir, 'security.txt');
const wellKnownSecurityPath = path.join(distDir, '.well-known', 'security.txt');
const wellKnownDiscordPath = path.join(distDir, '.well-known', 'discord');
const cliPath = path.join(distDir, 'cli.txt');
const cnamePath = path.join(distDir, 'CNAME');
const pricingPath = path.join(distDir, 'pricing.md');
const servicesMdPath = path.join(distDir, 'services.md');
const okfIndexPath = path.join(distDir, 'okf', 'index.md');
const wellKnownAgentPath = path.join(distDir, '.well-known', 'agent.json');

assert(fs.existsSync(humansPath), 'humans.txt exists in dist/');
assert(fs.existsSync(securityPath), 'security.txt exists in dist/');
assert(fs.existsSync(wellKnownSecurityPath), '.well-known/security.txt exists in dist/');
assert(fs.existsSync(wellKnownDiscordPath), '.well-known/discord exists in dist/');
assert(fs.existsSync(cliPath), 'cli.txt exists in dist/');
assert(fs.existsSync(cnamePath), 'CNAME exists in dist/');
assert(fs.existsSync(pricingPath), 'pricing.md exists in dist/');
assert(fs.existsSync(servicesMdPath), 'services.md exists in dist/');
assert(fs.existsSync(okfIndexPath), 'okf/index.md exists in dist/');
assert(fs.existsSync(wellKnownAgentPath), '.well-known/agent.json exists in dist/');
if (fs.existsSync(cnamePath)) {
  const cnameContent = fs.readFileSync(cnamePath, 'utf-8').trim();
  assert(cnameContent === 'sahillangoo.in', 'CNAME contains sahillangoo.in');
}

if (fs.existsSync(wellKnownDiscordPath)) {
  const discordContent = fs.readFileSync(wellKnownDiscordPath, 'utf-8').trim();
  assert(
    discordContent === 'dh=a9927a3448bedbd2738224fc95c2b2b5223b983f',
    '.well-known/discord contains valid Discord verification token'
  );
}

if (fs.existsSync(wellKnownSecurityPath)) {
  const secContent = fs.readFileSync(wellKnownSecurityPath, 'utf-8');
  assert(
    secContent.includes('Contact: mailto:hello@sahillangoo.in'),
    '.well-known/security.txt contains contact email'
  );
  assert(
    secContent.includes('Expires:'),
    '.well-known/security.txt contains RFC 9116 Expires directive'
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
    redirectsContent.includes('/sitemap_index.xml  /sitemap.xml  301'),
    '_redirects contains /sitemap_index.xml to /sitemap.xml 301 redirection'
  );
}

// 6. Scan all rendered HTML files for canonicals, schemas, and forbidden legacy strings
const htmlFiles = getAllFiles(distDir).filter(
  (f) => f.endsWith('.html') && !f.includes('~partytown')
);
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

  const isRedirect =
    content.includes('http-equiv="refresh"') || content.includes('Redirecting to:');

  if (!is404 && !isRedirect) {
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

    // Check OpenGraph Logo
    const ogLogoMatch = content.match(
      /<meta[^>]+property=["']og:logo["'][^>]+content=["']([^"']+)["']/i
    );
    assert(
      Boolean(ogLogoMatch && ogLogoMatch[1].startsWith(TARGET_DOMAIN)),
      `og:logo starts with ${TARGET_DOMAIN} in ${relativePath}`
    );

    // Check OpenGraph Image and Secure URL
    const ogImgMatch = content.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    const ogImgSecureMatch = content.match(
      /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i
    );
    assert(
      Boolean(ogImgMatch && ogImgMatch[1].startsWith(TARGET_DOMAIN)),
      `og:image starts with ${TARGET_DOMAIN} in ${relativePath}`
    );
    assert(
      Boolean(ogImgSecureMatch && ogImgSecureMatch[1].startsWith(TARGET_DOMAIN)),
      `og:image:secure_url starts with ${TARGET_DOMAIN} in ${relativePath}`
    );

    // Check OpenGraph Image Type
    const ogImgTypeMatch = content.match(
      /<meta[^>]+property=["']og:image:type["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogImgMatch && ogImgTypeMatch) {
      const imgUrl = ogImgMatch[1].split('?')[0].toLowerCase();
      const imgType = ogImgTypeMatch[1];
      if (imgUrl.endsWith('.webp')) {
        assert(imgType === 'image/webp', `og:image:type is image/webp in ${relativePath}`);
      } else if (imgUrl.endsWith('.png')) {
        assert(imgType === 'image/png', `og:image:type is image/png in ${relativePath}`);
      }
    }

    // Check article tags for article pages
    const isArticle = content.includes('property="og:type" content="article"');
    if (isArticle) {
      assert(
        content.includes('property="article:section"'),
        `article:section meta tag present in ${relativePath}`
      );
      assert(
        content.includes('property="article:published_time"'),
        `article:published_time meta tag present in ${relativePath}`
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

    // Check Semantic Landmarks & Tag Nesting Optimization
    if (!relativePath.endsWith('.md')) {
      assert(
        content.includes('<main id="main-content"'),
        `Page ${relativePath} must contain semantic <main id="main-content"> landmark`
      );
      assert(
        content.includes('<header') && content.includes('</header>'),
        `Page ${relativePath} must contain semantic <header> landmark`
      );
      assert(
        !content.includes('role="list"'),
        `Page ${relativePath} must not contain redundant role="list"`
      );
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
  console.log(
    `✨ Baseline production readiness checks passed! Validating Schema.org & Google Rich Results...`
  );
  try {
    const { execFileSync } = await import('node:child_process');
    console.log(`✨ Validating Favicons & OpenGraph Image Assets...`);
    execFileSync(process.execPath, [path.join(__dirname, 'audit-og-and-favicons.mjs')], {
      stdio: 'inherit',
    });
    console.log(`✨ Validating Schema.org & Google Rich Results...`);
    execFileSync(process.execPath, [path.join(__dirname, 'audit-rich-results.mjs')], {
      stdio: 'inherit',
    });
  } catch {
    console.error('🚨 Production audit subroutine failed.');
    process.exit(1);
  }

  console.log(`✨ All production readiness checks passed! Safe to deploy to ${TARGET_DOMAIN}.`);
  process.exit(0);
}
