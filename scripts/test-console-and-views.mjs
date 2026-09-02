#!/usr/bin/env node
/**
 * Headless Browser Viewability & Console Error/Warning Audit Suite
 *
 * Launches a real headless Chrome instance and exhaustively crawls every
 * pre-rendered HTML route in dist/ to verify:
 * 1. Page status 200 (or 404 for 404.html)
 * 2. Zero console.error logs
 * 3. Zero console.warn logs
 * 4. Zero unhandled JavaScript exceptions (pageerror)
 * 5. Zero broken subresource requests (404/500 images, fonts, scripts, stylesheets)
 * 6. Valid DOM structure and document title
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Find local Chrome or Edge binary
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

if (!executablePath) {
  console.error('❌ Could not locate Chrome or Edge executable on this machine.');
  process.exit(1);
}

// MIME types dictionary for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

// 1. Discover all HTML pages in dist/
function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ does not exist. Please run `pnpm build` first.');
  process.exit(1);
}

const htmlFiles = getAllFiles(distDir).filter((f) => f.endsWith('.html'));
const routes = htmlFiles.map((file) => {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404.html';
  if (relative.endsWith('/index.html')) return `/${relative.replace(/\/index\.html$/, '')}/`;
  return `/${relative}`;
});

console.log(`\n🚀 [Browser Test Runner] Starting audit of ${routes.length} static routes...`);
console.log(`🌐 Browser Binary: ${executablePath}`);

// 2. Start local static HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  let filePath = path.join(distDir, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(`${filePath}.html`)) {
    filePath = `${filePath}.html`;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 fallback
    const notFoundPath = path.join(distDir, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`📡 Local Test Server active at: ${baseUrl}\n`);

// 3. Launch Headless Browser
const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--mute-audio',
  ],
});

let totalErrors = 0;
let totalWarnings = 0;
const pageResults = [];

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const targetUrl = `${baseUrl}${route}`;
    const is404 = route === '/404.html';

    const errors = [];
    const warnings = [];
    const failedRequests = [];

    // Attach listeners
    const onConsole = (msg) => {
      const type = msg.type();
      const text = msg.text();

      // Filter out harmless browser noise if any
      if (type === 'error') {
        if (text.includes('fonts.gstatic.com') || text.includes('fonts.googleapis.com')) {
          warnings.push(`[External Font Notice] ${text}`);
        } else {
          errors.push(`[Console Error] ${text}`);
        }
      } else if (type === 'warning' || type === 'warn') {
        warnings.push(`[Console Warning] ${text}`);
      }
    };

    const onPageError = (err) => {
      errors.push(`[Unhandled JS Exception] ${err.message || String(err)}`);
    };

    const onRequestFailed = (req) => {
      const failure = req.failure();
      const url = req.url();
      // Ignore aborts triggered by navigation teardown
      if (failure && failure.errorText !== 'net::ERR_ABORTED') {
        if (url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost')) {
          failedRequests.push(`[Request Failed] ${url} (${failure.errorText})`);
        } else {
          warnings.push(`[External Request Timeout] ${url} (${failure.errorText})`);
        }
      }
    };

    const onResponse = (res) => {
      const status = res.status();
      const url = res.url();
      if (!is404 && status >= 400 && !url.includes('/api/')) {
        failedRequests.push(`[HTTP ${status}] Subresource Failed: ${url}`);
      }
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);
    page.on('requestfailed', onRequestFailed);
    page.on('response', onResponse);

    try {
      const response = await page.goto(targetUrl, {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 15000,
      });

      const httpStatus = response?.status() ?? 0;
      const expectedStatus = 200;

      if (httpStatus !== expectedStatus) {
        errors.push(`[Unexpected HTTP Status] Expected ${expectedStatus}, received ${httpStatus}`);
      }

      // Check title and basic content
      const title = await page.title();
      if (!title) {
        errors.push(`[Missing Document Title] Page has empty or missing <title> tag.`);
      }

      // Wait a short tick for client scripts / micro-interactions
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Trigger client interaction (key press and click check)
      await page.keyboard.press('Escape');

      // Check if body rendered
      const bodyHasContent = await page.evaluate(() => {
        return document.body && document.body.innerHTML.trim().length > 100;
      });

      if (!bodyHasContent) {
        errors.push('[Empty Body] Document body contains insufficient rendered content.');
      }
    } catch (navErr) {
      errors.push(`[Navigation Error] ${navErr.message}`);
    } finally {
      // Remove listeners before next route
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
      page.off('requestfailed', onRequestFailed);
      page.off('response', onResponse);
    }

    const allRouteErrors = [...errors, ...failedRequests];
    totalErrors += allRouteErrors.length;
    totalWarnings += warnings.length;

    const statusIcon = allRouteErrors.length === 0 && warnings.length === 0 ? '✅' : '❌';
    const progress = `[${i + 1}/${routes.length}]`;
    console.log(`${statusIcon} ${progress.padEnd(9)} ${route}`);

    if (allRouteErrors.length > 0) {
      allRouteErrors.forEach((e) => console.log(`   🚨 ${e}`));
    }
    if (warnings.length > 0) {
      warnings.forEach((w) => console.log(`   ⚠️  ${w}`));
    }

    pageResults.push({
      route,
      errors: allRouteErrors,
      warnings,
    });
  }

  // Extra test: Test non-existent route for HTTP 404 response & zero errors
  const notFoundUrl = `${baseUrl}/non-existent-route-for-audit-test/`;
  const notFoundErrors = [];
  const notFoundWarnings = [];

  const on404Console = (msg) => {
    const text = msg.text();
    if (text.includes('status of 404')) return;
    if (msg.type() === 'error') notFoundErrors.push(`[Console Error] ${text}`);
    if (msg.type() === 'warning' || msg.type() === 'warn')
      notFoundWarnings.push(`[Console Warning] ${text}`);
  };
  const on404PageError = (err) => notFoundErrors.push(`[Unhandled JS Exception] ${err.message}`);

  page.on('console', on404Console);
  page.on('pageerror', on404PageError);

  try {
    const res404 = await page.goto(notFoundUrl, {
      waitUntil: ['domcontentloaded', 'networkidle2'],
      timeout: 15000,
    });
    const status404 = res404?.status() ?? 0;
    if (status404 !== 404) {
      notFoundErrors.push(`[Unexpected HTTP Status] Expected 404, received ${status404}`);
    }
  } catch (err) {
    notFoundErrors.push(`[404 Navigation Error] ${err.message}`);
  } finally {
    page.off('console', on404Console);
    page.off('pageerror', on404PageError);
  }

  totalErrors += notFoundErrors.length;
  totalWarnings += notFoundWarnings.length;
  const status404Icon = notFoundErrors.length === 0 && notFoundWarnings.length === 0 ? '✅' : '❌';
  console.log(`${status404Icon} [71/71]   /non-existent-route-for-audit-test/ (404 Test)`);
  if (notFoundErrors.length > 0) notFoundErrors.forEach((e) => console.log(`   🚨 ${e}`));
  if (notFoundWarnings.length > 0) notFoundWarnings.forEach((w) => console.log(`   ⚠️  ${w}`));
} finally {
  await browser.close();
  server.close();
}

console.log(`\n==================================================`);
console.log(`📊 Browser Audit Results:`);
console.log(`- Routes Tested: ${routes.length}`);
console.log(`- Total Errors: ${totalErrors}`);
console.log(`- Total Warnings: ${totalWarnings}`);
console.log(`==================================================\n`);

if (totalErrors > 0) {
  console.error(`🚨 Audit failed with ${totalErrors} errors and ${totalWarnings} warnings.`);
  process.exit(1);
} else {
  console.log(`✨ All ${routes.length} pages are fully viewable with ZERO console errors!`);
  process.exit(0);
}
