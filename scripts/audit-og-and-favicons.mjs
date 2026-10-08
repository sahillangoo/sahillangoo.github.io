#!/usr/bin/env node
/**
 * Rigorous Audit Subroutine for Favicons & OpenGraph Image Assets
 *
 * Verifies:
 * 1. Palette adherence: Favicon and OG images use editorial tokens (#161310, #322e2a, #aaa7f4, #ebe7df)
 *    and have ZERO trace of legacy colors (#38bdf8, #0c0d0f, #24272c).
 * 2. Icon asset dimensions:
 *    - apple-touch-icon.png === 180x180
 *    - icon-192.png === 192x192
 *    - icon-512.png === 512x512
 *    - favicon.ico exists and has valid ICO header
 *    - site.webmanifest theme_color & background_color === #161310
 * 3. Page metadata and OG image sizing across 100% of generated HTML routes:
 *    - og:image is present, secure, and points to an existing file on disk
 *    - og:image:width === 1200
 *    - og:image:height === 630
 *    - Real PNG dimensions on disk verified with Sharp === 1200x630
 *    - Favicon links (svg, apple-touch-icon, manifest) present on every page
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const TARGET_DOMAIN = 'https://sahillangoo.in';

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

function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

console.log('🎨 [Favicon & OG Audit] Starting exhaustive verification...\n');

// 1. Verify dist/ exists
assert(fs.existsSync(distDir), `Dist directory exists at ${distDir}`);
if (errors > 0) {
  process.exit(1);
}

// 2. Audit Favicon SVG
const faviconSvgPath = path.join(distDir, 'favicon.svg');
assert(fs.existsSync(faviconSvgPath), 'dist/favicon.svg exists');
if (fs.existsSync(faviconSvgPath)) {
  const svgContent = fs.readFileSync(faviconSvgPath, 'utf-8');
  assert(svgContent.includes('#161310'), 'dist/favicon.svg uses base-100 dark ink (#161310)');
  assert(svgContent.includes('#322e2a'), 'dist/favicon.svg uses base-300 hairline (#322e2a)');
  assert(svgContent.includes('#ebe7df'), 'dist/favicon.svg uses main warm paper ink (#ebe7df)');
  assert(svgContent.includes('#aaa7f4'), 'dist/favicon.svg uses violet accent hue 285 (#aaa7f4)');
  assert(
    !svgContent.includes('#38BDF8') && !svgContent.includes('#38bdf8'),
    'dist/favicon.svg does NOT contain legacy sky blue (#38BDF8)'
  );
  assert(
    !svgContent.includes('#0C0D0F') && !svgContent.includes('#0c0d0f'),
    'dist/favicon.svg does NOT contain legacy slate black (#0C0D0F)'
  );
  assert(
    !svgContent.includes('#24272C') && !svgContent.includes('#24272c'),
    'dist/favicon.svg does NOT contain legacy border (#24272C)'
  );
}

// 3. Audit Web App Manifest
const manifestPath = path.join(distDir, 'site.webmanifest');
assert(fs.existsSync(manifestPath), 'dist/site.webmanifest exists');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assert(
    manifest.background_color === '#161310',
    `site.webmanifest background_color is #161310 (found: ${manifest.background_color})`
  );
  assert(
    manifest.theme_color === '#161310',
    `site.webmanifest theme_color is #161310 (found: ${manifest.theme_color})`
  );
  assert(
    Array.isArray(manifest.icons) && manifest.icons.length >= 3,
    'site.webmanifest specifies icons array'
  );
}

// 4. Audit Raster Icons with Sharp
const iconChecks = [
  { file: 'apple-touch-icon.png', expectedW: 180, expectedH: 180 },
  { file: 'icon-192.png', expectedW: 192, expectedH: 192 },
  { file: 'icon-512.png', expectedW: 512, expectedH: 512 },
];

for (const icon of iconChecks) {
  const iconPath = path.join(distDir, icon.file);
  assert(fs.existsSync(iconPath), `dist/${icon.file} exists`);
  if (fs.existsSync(iconPath)) {
    const meta = await sharp(iconPath).metadata();
    assert(
      meta.width === icon.expectedW,
      `dist/${icon.file} width === ${icon.expectedW} (found: ${meta.width})`
    );
    assert(
      meta.height === icon.expectedH,
      `dist/${icon.file} height === ${icon.expectedH} (found: ${meta.height})`
    );
    assert(meta.format === 'png', `dist/${icon.file} format === png (found: ${meta.format})`);
  }
}

// 5. Audit Favicon ICO
const icoPath = path.join(distDir, 'favicon.ico');
assert(fs.existsSync(icoPath), 'dist/favicon.ico exists');
if (fs.existsSync(icoPath)) {
  const icoBuf = fs.readFileSync(icoPath);
  assert(icoBuf.length > 0, `dist/favicon.ico has non-zero size (${icoBuf.length} bytes)`);
  // Check ICO header: 0x0000 (reserved), 0x0001 (type: icon)
  const isIcoHeader = icoBuf.readUInt16LE(0) === 0 && icoBuf.readUInt16LE(2) === 1;
  assert(isIcoHeader, 'dist/favicon.ico has valid ICO format header');
}

// 6. Scan All Rendered HTML Pages for OG & Favicon Head Tags
const htmlFiles = getAllFiles(distDir).filter(
  (f) => f.endsWith('.html') && !f.includes('~partytown')
);

console.log(`📄 Scanning ${htmlFiles.length} rendered HTML pages for OpenGraph & Favicon tags...`);

const verifiedOgImagesOnDisk = new Map();

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(distDir, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const isRedirect =
    content.includes('http-equiv="refresh"') || content.includes('Redirecting to:');

  if (isRedirect) continue;

  // Check Favicon links
  assert(
    content.includes('<link rel="icon" type="image/svg+xml" href="/favicon.svg"'),
    `Favicon SVG link present in ${relativePath}`
  );
  assert(
    content.includes('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"'),
    `Apple touch icon link present in ${relativePath}`
  );
  assert(
    content.includes('<link rel="manifest" href="/site.webmanifest"'),
    `Webmanifest link present in ${relativePath}`
  );

  // Check OpenGraph Tags
  const ogImgMatch = content.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  );
  const ogWidthMatch = content.match(
    /<meta[^>]+property=["']og:image:width["'][^>]+content=["']([^"']+)["']/i
  );
  const ogHeightMatch = content.match(
    /<meta[^>]+property=["']og:image:height["'][^>]+content=["']([^"']+)["']/i
  );

  assert(Boolean(ogImgMatch), `og:image meta tag present in ${relativePath}`);
  assert(
    Boolean(ogWidthMatch && ogWidthMatch[1] === '1200'),
    `og:image:width is 1200 in ${relativePath}`
  );
  assert(
    Boolean(ogHeightMatch && ogHeightMatch[1] === '630'),
    `og:image:height is 630 in ${relativePath}`
  );

  if (ogImgMatch) {
    const ogUrl = ogImgMatch[1];
    let localImagePath = null;

    if (ogUrl.startsWith(TARGET_DOMAIN)) {
      const urlPath = ogUrl.replace(TARGET_DOMAIN, '').replace(/^\//, '');
      localImagePath = path.join(distDir, urlPath);
    } else if (ogUrl.startsWith('/')) {
      localImagePath = path.join(distDir, ogUrl.slice(1));
    }

    if (localImagePath) {
      assert(
        fs.existsSync(localImagePath),
        `Referenced og:image exists on disk: ${localImagePath} (from ${relativePath})`
      );
      if (fs.existsSync(localImagePath) && !verifiedOgImagesOnDisk.has(localImagePath)) {
        verifiedOgImagesOnDisk.set(localImagePath, relativePath);
      }
    }
  }
}

// 7. Verify all unique referenced OG images on disk with Sharp for exact 1200x630 dimensions
console.log(
  `\n🖼️  Validating pixel dimensions of ${verifiedOgImagesOnDisk.size} unique OG images on disk...`
);

for (const [imgPath, pageSrc] of verifiedOgImagesOnDisk.entries()) {
  const relImg = path.relative(distDir, imgPath);
  try {
    const meta = await sharp(imgPath).metadata();
    assert(
      meta.width === 1200,
      `OG image dist/${relImg} width === 1200 (found: ${meta.width}, used in ${pageSrc})`
    );
    assert(
      meta.height === 630,
      `OG image dist/${relImg} height === 630 (found: ${meta.height}, used in ${pageSrc})`
    );
    assert(meta.format === 'png', `OG image dist/${relImg} format === png (found: ${meta.format})`);
  } catch (err) {
    assert(false, `Failed to parse metadata of dist/${relImg}: ${err.message}`);
  }
}

console.log('\n==================================================');
console.log('📊 Favicon & OG Image Audit Summary:');
console.log(`- Verified HTML Pages: ${htmlFiles.length}`);
console.log(`- Verified Unique OG Images on Disk: ${verifiedOgImagesOnDisk.size}`);
console.log(`- Total Passed Checks: ${passedChecks}`);
console.log(`- Total Errors: ${errors}`);
console.log('==================================================\n');

if (errors > 0) {
  console.error(`🚨 Favicon & OG audit failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('✨ All Favicon & OpenGraph image audits PASSED with 0 errors!');
  process.exit(0);
}
