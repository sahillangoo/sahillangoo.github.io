#!/usr/bin/env node
/**
 * Automated Full-Page Screenshot Capture Suite
 * Captures full-page screenshots for Mobile, Tablet, and Desktop across Dark and Light themes.
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
const tempDir = path.resolve(rootDir, '.temp', 'screenshots');

// Ensure output directory exists
fs.mkdirSync(tempDir, { recursive: true });

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

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory does not exist. Please run `pnpm build` first.');
  process.exit(1);
}

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

// Start local HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  let filePath = cleanPath ? path.resolve(distDir, cleanPath) : path.join(distDir, 'index.html');

  if (cleanPath === 'favicon.ico' && !fs.existsSync(filePath)) {
    const svgPath = path.join(distDir, 'favicon.svg');
    if (fs.existsSync(svgPath)) filePath = svgPath;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(`${filePath}.html`)) {
    filePath = `${filePath}.html`;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`📡 Local Test Server running at: ${baseUrl}`);

const VIEWPORTS = {
  mobile: { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 1, isMobile: false, hasTouch: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};

const THEMES = [
  { key: 'dark', themeName: 'editorialDark' },
  { key: 'light', themeName: 'editorialLight' },
];

const PAGES = [
  { key: 'home', route: '/' },
  { key: 'about', route: '/about/' },
  { key: 'projects', route: '/projects/' },
  { key: 'blog', route: '/blog/' },
  { key: 'resume', route: '/resume/' },
];

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--font-render-hinting=none',
  ],
});

try {
  const page = await browser.newPage();

  for (const pageConfig of PAGES) {
    for (const [vpKey, vpConfig] of Object.entries(VIEWPORTS)) {
      await page.setViewport(vpConfig);

      for (const themeConfig of THEMES) {
        const url = `${baseUrl}${pageConfig.route}`;
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Apply theme and disable CSS animations/transitions for crisp screenshots
        await page.evaluate((theme) => {
          document.documentElement.setAttribute('data-theme', theme);
          try {
            localStorage.setItem('theme', theme);
          } catch {
            // Ignore storage access errors in sandboxed environments
          }

          // Disable transitions and animations to prevent motion blurs
          const style = document.createElement('style');
          style.id = '__audit_disable_motion__';
          style.innerHTML = `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `;
          document.head.appendChild(style);
        }, themeConfig.themeName);

        // Small pause to let DOM settle and layout recalculate
        await new Promise((r) => setTimeout(r, 250));

        const filename = `${pageConfig.key}-${themeConfig.key}-${vpKey}.png`;
        const destPath = path.join(tempDir, filename);

        await page.screenshot({
          path: destPath,
          fullPage: true,
        });

        console.log(`📸 Captured: ${filename}`);
      }
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`\n✅ All screenshots captured successfully in: ${tempDir}`);
