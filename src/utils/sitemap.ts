import fs from 'node:fs';
import path from 'node:path';
import { ChangeFreqEnum, type SitemapItem } from '@astrojs/sitemap';

const DEFAULT_BUILD_DATE = new Date().toISOString().split('T')[0] ?? '2026-08-22';

// Extract content dates from frontmatters
function extractContentDates(contentDir: string): Map<string, string> {
  const map = new Map<string, string>();
  const dirPath = path.resolve(process.cwd(), 'src/content', contentDir);

  if (!fs.existsSync(dirPath)) return map;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');

    const updatedMatch = content.match(/updatedDate:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})['"]?/);
    const publishMatch = content.match(/publishDate:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})['"]?/);

    const date = updatedMatch?.[1] || publishMatch?.[1] || DEFAULT_BUILD_DATE;
    map.set(slug, date);
  }

  return map;
}

export function createSitemapSerializer(buildDate: string = DEFAULT_BUILD_DATE) {
  const blogDates = extractContentDates('blog');
  const noteDates = extractContentDates('notes');
  const projectDates = extractContentDates('projects');

  // Compute latest update / publish dates per collection
  const allBlogDates = Array.from(blogDates.values()).sort().reverse();
  const allNoteDates = Array.from(noteDates.values()).sort().reverse();
  const allProjectDates = Array.from(projectDates.values()).sort().reverse();

  const latestBlogDate = allBlogDates[0] ?? buildDate;
  const latestNoteDate = allNoteDates[0] ?? buildDate;
  const latestProjectDate = allProjectDates[0] ?? buildDate;

  return function serialize(item: SitemapItem): SitemapItem | undefined {
    const url = item.url;
    const parsed = new URL(url);
    const pathname = parsed.pathname;

    // 1. Filter out ignored pages
    if (
      pathname === '/404/' ||
      pathname === '/404' ||
      pathname === '/rss.xml' ||
      pathname.startsWith('/blog/tag/') ||
      pathname.startsWith('/blog/tag') ||
      pathname.match(/^\/blog\/\d+\/?$/) ||
      pathname.match(/^\/notes\/\d+\/?$/)
    ) {
      return undefined;
    }

    // 2. Homepage (Priority 1.0) - Reflects the latest build date at top of sitemap
    if (pathname === '/' || pathname === '') {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.DAILY,
        priority: 1.0,
        lastmod: buildDate,
      };
    }

    // 3. Primary Section Hubs (Priority 0.9) - Reflect latest collection updates
    if (pathname === '/projects/' || pathname === '/projects') {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.WEEKLY,
        priority: 0.9,
        lastmod: latestProjectDate,
      };
    }

    if (pathname === '/blog/' || pathname === '/blog') {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.WEEKLY,
        priority: 0.9,
        lastmod: latestBlogDate,
      };
    }

    if (pathname === '/notes/' || pathname === '/notes') {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.WEEKLY,
        priority: 0.9,
        lastmod: latestNoteDate,
      };
    }

    if (
      pathname === '/about/' ||
      pathname === '/about' ||
      pathname === '/resume/' ||
      pathname === '/resume'
    ) {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.9,
        lastmod: buildDate,
      };
    }

    // 4. Case Studies / Projects (Priority 0.85)
    if (pathname.startsWith('/projects/')) {
      const slug = pathname.replace(/^\/projects\//, '').replace(/\/$/, '');
      const date = projectDates.get(slug) ?? latestProjectDate;
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.85,
        lastmod: date,
      };
    }

    // 5. Engineering Deep Dives / Blog (Priority 0.85) - Specific updated/published date
    if (pathname.startsWith('/blog/') && !pathname.startsWith('/blog/category/')) {
      const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
      const date = blogDates.get(slug) ?? latestBlogDate;
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.85,
        lastmod: date,
      };
    }

    // 6. Digital Garden Notes (Priority 0.75)
    if (pathname.startsWith('/notes/')) {
      const slug = pathname.replace(/^\/notes\//, '').replace(/\/$/, '');
      const date = noteDates.get(slug) ?? latestNoteDate;
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.75,
        lastmod: date,
      };
    }

    // 7. Categories & Secondary Pages (Priority 0.60)
    if (
      pathname.startsWith('/blog/category/') ||
      pathname === '/contact/' ||
      pathname === '/now/' ||
      pathname === '/uses/' ||
      pathname === '/colophon/' ||
      pathname === '/links/'
    ) {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.6,
        lastmod: buildDate,
      };
    }

    // Default fallback
    return {
      ...item,
      url,
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.5,
      lastmod: buildDate,
    };
  };
}
