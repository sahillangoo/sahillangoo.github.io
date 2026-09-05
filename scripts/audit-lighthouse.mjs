#!/usr/bin/env node
/**
 * Unlighthouse Multi-Page Auditor Subroutine
 *
 * Runs comprehensive multi-page Lighthouse audits:
 * - By default: serves dist/ locally on a background HTTP server and runs Unlighthouse
 * - With --live: audits the production deployed site https://sahillangoo.in
 * - With --ci: runs in headless non-interactive CI budget enforcement mode
 *
 * Usage:
 *   node scripts/audit-lighthouse.mjs        # Interactive multi-page audit with visual UI
 *   node scripts/audit-lighthouse.mjs --ci   # Headless CI budget audit
 *   node scripts/audit-lighthouse.mjs --live # Audits live https://sahillangoo.in
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const isCi = process.argv.includes('--ci');
const isLive = process.argv.includes('--live');
const PORT = 4322;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function createLocalServer() {
  return http.createServer((req, res) => {
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
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      const stream = fs.createReadStream(filePath);
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500);
        res.end();
      });
      stream.pipe(res);
    } else {
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
}

async function main() {
  console.log('🏛️  [Unlighthouse Auditor] Initializing multi-page Lighthouse runner...');

  let server = null;
  let targetSite = 'https://sahillangoo.in';

  if (!isLive) {
    if (!fs.existsSync(distDir)) {
      console.error(`❌ Build directory does not exist at ${distDir}. Run \`pnpm build\` first.`);
      process.exit(1);
    }

    server = createLocalServer();
    await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
    targetSite = `http://127.0.0.1:${PORT}`;
    console.log(`🌐 Local static preview server running at ${targetSite}`);
  } else {
    console.log(`🌐 Auditing live production deployment at ${targetSite}`);
  }

  const binaryName =
    process.platform === 'win32'
      ? isCi
        ? 'unlighthouse-ci.cmd'
        : 'unlighthouse.cmd'
      : isCi
        ? 'unlighthouse-ci'
        : 'unlighthouse';
  const binaryPath = path.resolve(rootDir, 'node_modules', '.bin', binaryName);

  const args = ['--site', targetSite, '--desktop'];

  if (isCi) {
    args.push('--build-static');
  }

  // Forward extra args passed to this script
  const passThroughArgs = process.argv.slice(2).filter((arg) => arg !== '--ci' && arg !== '--live');
  args.push(...passThroughArgs);

  console.log(`🚀 Spawning ${binaryName} with arguments:`, args.join(' '));

  const child = spawn(binaryPath, args, {
    stdio: 'inherit',
    cwd: rootDir,
    shell: true,
  });

  const cleanup = () => {
    if (server) {
      server.close();
    }
  };

  process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
  });

  child.on('exit', (code) => {
    cleanup();
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('❌ Failed to run Unlighthouse:', err);
  process.exit(1);
});
