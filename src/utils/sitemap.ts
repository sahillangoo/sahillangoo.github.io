import fs from 'node:fs';
import path from 'node:path';
import { ChangeFreqEnum, type SitemapItem } from '@astrojs/sitemap';

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

    const updatedMatch = content.match(/updatedDate:\s*['"]([^'"]+)['"]/);
    const publishMatch = content.match(/publishDate:\s*['"]([^'"]+)['"]/);

    const date = updatedMatch?.[1] || publishMatch?.[1] || '2026-08-22';
    map.set(slug, date);
  }

  return map;
}

export function createSitemapSerializer() {
  const blogDates = extractContentDates('blog');
  const noteDates = extractContentDates('notes');
  const projectDates = extractContentDates('projects');

  // Find max date for hubs
  const allBlogDates = Array.from(blogDates.values()).sort().reverse();
  const allNoteDates = Array.from(noteDates.values()).sort().reverse();
  const allProjectDates = Array.from(projectDates.values()).sort().reverse();

  const latestBlogDate = allBlogDates[0] || '2026-08-22';
  const latestNoteDate = allNoteDates[0] || '2026-08-22';
  const latestProjectDate = allProjectDates[0] || '2026-08-22';
  const globalLatestDate =
    [latestBlogDate, latestNoteDate, latestProjectDate, '2026-08-22'].sort().reverse()[0] ||
    '2026-08-22';

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

    // 2. Homepage (Priority 1.0)
    if (pathname === '/' || pathname === '') {
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.DAILY,
        priority: 1.0,
        lastmod: globalLatestDate,
      };
    }

    // 3. Primary Section Hubs (Priority 0.9)
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
        lastmod: '2026-08-22',
      };
    }

    // 4. Case Studies / Projects (Priority 0.85)
    if (pathname.startsWith('/projects/')) {
      const slug = pathname.replace(/^\/projects\//, '').replace(/\/$/, '');
      const date = projectDates.get(slug) || latestProjectDate;
      return {
        ...item,
        url,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.85,
        lastmod: date,
      };
    }

    // 5. Engineering Deep Dives / Blog (Priority 0.85)
    if (pathname.startsWith('/blog/') && !pathname.startsWith('/blog/category/')) {
      const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
      const date = blogDates.get(slug) || latestBlogDate;
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
      const date = noteDates.get(slug) || latestNoteDate;
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
        lastmod: '2026-08-22',
      };
    }

    // Default fallback
    return {
      ...item,
      url,
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.5,
      lastmod: '2026-08-22',
    };
  };
}
