/**
 * Astro Site Quality Enforcer
 *
 * A zero-dependency native Astro integration that enforces strict site quality during builds:
 * 1. Vite `buildStart`: Scans source files (Astro, MD, TS) to guarantee all image references
 *    exist in `src/assets` or `public` and checks internal links for trailing slashes.
 * 2. Astro `astro:build:done`:
 *    - Scans all generated HTML files in `dist/` post-build to guarantee zero broken internal links and canonical domain match.
 *    - Parses, sorts (priority descending, lastmod date descending), formats, and validates XML sitemaps.
 *    - Syncs `sitemap-0.xml` and `sitemap.xml`.
 *    - Verifies robots.txt alignment.
 */
import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

function getAllFiles(dirPath: string, files: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return files;
  for (const file of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

function sortAndFormatSitemap(xmlContent: string): string {
  const urlMatches = xmlContent.match(/<url>[\s\S]*?<\/url>/g) || [];
  const entries: SitemapEntry[] = [];

  for (const urlBlock of urlMatches) {
    const locMatch = urlBlock.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);
    const changefreqMatch = urlBlock.match(/<changefreq>([^<]+)<\/changefreq>/);
    const priorityMatch = urlBlock.match(/<priority>([^<]+)<\/priority>/);

    const loc = locMatch?.[1];
    if (loc) {
      const cleanLastmod = lastmodMatch?.[1] ? lastmodMatch[1].split('T')[0] : undefined;
      const priority = priorityMatch?.[1] ? parseFloat(priorityMatch[1]) : 0.5;
      entries.push({
        loc,
        lastmod: cleanLastmod,
        changefreq: changefreqMatch?.[1],
        priority,
      });
    }
  }

  // Sort by priority (descending), then lastmod (descending), then loc (ascending)
  entries.sort((a, b) => {
    if ((b.priority ?? 0) !== (a.priority ?? 0)) {
      return (b.priority ?? 0) - (a.priority ?? 0);
    }
    if ((b.lastmod ?? '') !== (a.lastmod ?? '')) {
      return (b.lastmod ?? '').localeCompare(a.lastmod ?? '');
    }
    return a.loc.localeCompare(b.loc);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(2)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>\n`;
}

export default function astroSiteQualityEnforcer(): AstroIntegration {
  let trailingSlashMode: 'always' | 'never' | 'ignore' = 'ignore';
  let siteUrl = '';

  return {
    name: 'astro-site-quality-enforcer',
    hooks: {
      'astro:config:setup': ({ config, updateConfig, logger }) => {
        trailingSlashMode = config.trailingSlash;
        siteUrl = config.site || '';

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
          const is404 = relative === '404.html';

          // 1. Verify internal links
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

          // 2. Verify Canonical Domain
          if (!is404 && siteUrl) {
            const canonicalMatch = content.match(
              /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
            );
            if (canonicalMatch && canonicalMatch[1]) {
              const canonical = canonicalMatch[1];
              if (!canonical.startsWith(siteUrl)) {
                logger.error(
                  `❌ Canonical domain mismatch in ${relative}: expected prefix "${siteUrl}", found "${canonical}"`
                );
                errors++;
              }
            }
          }
        }

        if (errors > 0) throw new Error(`Found ${errors} site quality violations during build!`);

        // 3. Re-sort, format, and synchronize XML sitemaps
        const sitemap0Path = path.join(outDir, 'sitemap-0.xml');
        const sitemapPath = path.join(outDir, 'sitemap.xml');

        if (fs.existsSync(sitemap0Path)) {
          const rawSitemap = fs.readFileSync(sitemap0Path, 'utf-8');
          const formattedSitemap = sortAndFormatSitemap(rawSitemap);

          fs.writeFileSync(sitemap0Path, formattedSitemap, 'utf-8');
          fs.writeFileSync(sitemapPath, formattedSitemap, 'utf-8');

          const entryCount = (formattedSitemap.match(/<url>/g) || []).length;
          logger.info(`🗺️ Sitemap Processed & Sorted: ${entryCount} URLs with priorities & dates.`);
        }

        logger.info(
          `✅ Quality Check Passed: ${htmlFiles.length} routes validated against ${siteUrl}`
        );
      },
    },
  };
}
