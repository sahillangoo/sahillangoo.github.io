/**
 * Astro Site Quality Enforcer
 *
 * A zero-dependency native Astro integration that enforces strict site quality during builds:
 * 1. Vite `buildStart`: Scans source files (Astro, MD, TS) to guarantee all image references
 *    exist in `src/assets` or `public` and checks internal links for trailing slashes.
 * 2. Astro `astro:build:done`: Scans all generated HTML files in `dist/` post-build to guarantee
 *    every internal link (`href`) points to a physically generated HTML route.
 *    Fails the build immediately if any 404s are detected.
 */
import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function getAllFiles(dirPath: string, files: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return files;
  for (const file of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

export default function astroSiteQualityEnforcer(): AstroIntegration {
  let trailingSlashMode: 'always' | 'never' | 'ignore' = 'ignore';

  return {
    name: 'astro-site-quality-enforcer',
    hooks: {
      'astro:config:setup': ({ config, updateConfig, logger }) => {
        trailingSlashMode = config.trailingSlash;

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'vite-plugin-astro-site-quality',
                buildStart() {
                  const srcDir = path.resolve(process.cwd(), 'src');
                  const assetsDir = path.resolve(srcDir, 'assets');
                  const publicDir = path.resolve(process.cwd(), 'public');

                  const allImages = [...getAllFiles(assetsDir), ...getAllFiles(publicDir)];
                  const availableFilenames = new Set(allImages.map((f) => path.basename(f)));

                  let errors = 0;
                  const codeFiles = getAllFiles(srcDir).filter((f) =>
                    /\.(ts|js|astro|md|mdx|json|yml|yaml)$/i.test(f)
                  );

                  for (const filePath of codeFiles) {
                    const relative = path.relative(process.cwd(), filePath);
                    if (relative.includes('astro-site-quality')) continue;

                    const content = fs.readFileSync(filePath, 'utf-8');

                    for (const match of content.matchAll(
                      /['"]([^'"]+\.(?:webp|jpg|jpeg|png|svg))['"]/gi
                    )) {
                      if (
                        !match[1] ||
                        match[1].includes('*') ||
                        match[1].startsWith('http://') ||
                        match[1].startsWith('https://') ||
                        match[1].startsWith('//') ||
                        match[1].startsWith('data:')
                      )
                        continue;
                      const filename = path.basename(match[1]);
                      if (!availableFilenames.has(filename)) {
                        logger.error(`❌ 404 Image Ref: "${filename}" in ${relative}`);
                        errors++;
                      }
                    }

                    for (const match of content.matchAll(/href=["'](\/[^"']+)["']/gi)) {
                      if (!match[1]) continue;
                      const linkStr = match[1].split('#')[0];
                      if (!linkStr) continue;
                      const baseLink = linkStr.split('?')[0];
                      if (!baseLink) continue;
                      const link = baseLink;

                      if (link === '/' || link.includes('.')) continue;

                      if (trailingSlashMode === 'always' && !link.endsWith('/')) {
                        logger.error(`⚠️ Missing trailing slash: "${link}" in ${relative}`);
                        errors++;
                      } else if (trailingSlashMode === 'never' && link.endsWith('/')) {
                        logger.error(`⚠️ Unexpected trailing slash: "${link}" in ${relative}`);
                        errors++;
                      }
                    }
                  }

                  if (errors > 0) throw new Error(`Found ${errors} site quality violations!`);
                },
              },
            ],
          },
        });
      },
      'astro:build:done': ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const htmlFiles = getAllFiles(outDir).filter((f) => f.endsWith('.html'));

        const validRoutes = new Set<string>();
        for (const file of htmlFiles) {
          let route = '/' + path.relative(outDir, file).replace(/\\/g, '/');
          if (route.endsWith('/index.html')) {
            route = route.replace(/\/index\.html$/, '');
            if (route === '') route = '/';
          } else if (route.endsWith('.html')) {
            route = route.replace(/\.html$/, '');
          }

          if (trailingSlashMode === 'always' && route !== '/') {
            route += '/';
          }
          validRoutes.add(route);
        }

        let errors = 0;
        for (const file of htmlFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const relative = path.relative(outDir, file);

          for (const match of content.matchAll(/href=["'](\/[^"']+)["']/g)) {
            if (!match[1]) continue;
            const linkStr = match[1].split('#')[0];
            if (!linkStr) continue;
            const baseLink = linkStr.split('?')[0];
            if (!baseLink) continue;
            let link = baseLink;

            if (link === '/' || link.includes('.')) continue;

            if (trailingSlashMode === 'always' && !link.endsWith('/')) {
              link += '/';
            } else if (trailingSlashMode === 'never' && link.endsWith('/')) {
              link = link.slice(0, -1);
            }

            if (!validRoutes.has(link)) {
              logger.error(`❌ 404 Broken Internal Link: "${link}" found in ${relative}`);
              errors++;
            }
          }
        }

        if (errors > 0) throw new Error(`Found ${errors} broken internal links!`);
        logger.info(`✅ Internal Link Check Passed.`);
      },
    },
  };
}
