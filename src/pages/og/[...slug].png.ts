import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

export async function getStaticPaths() {
  const [blog, projects] = await Promise.all([getCollection('blog'), getCollection('projects')]);

  const publishedBlog = blog.filter((post) => !post.data.draft);
  const publishedProjects = projects.filter((project) => !project.data.draft);

  const paths = [
    // Core main pages
    {
      params: { slug: 'default' },
      props: {
        title: 'Sahil Langoo | Full Stack Systems Engineer',
        category: 'PORTFOLIO & JOURNAL',
        description:
          'Engineering high-performance web systems, creative interfaces, and robust software.',
        readingTime: 'sahillangoo.in',
      },
    },
    {
      params: { slug: 'projects' },
      props: {
        title: 'Engineered Systems & Production Projects',
        category: 'PRODUCTION CASE STUDIES',
        description:
          'High-performance web apps, developer tooling, and distributed edge architectures.',
        readingTime: 'Case Studies',
      },
    },
    {
      params: { slug: 'blog' },
      props: {
        title: 'Engineering Essays & Technical Writing',
        category: 'TECHNICAL JOURNAL',
        description:
          'Technical essays on distributed edge proxies, TypeScript, Web Performance, and minimalism.',
        readingTime: 'Essays & Articles',
      },
    },
    {
      params: { slug: 'resume' },
      props: {
        title: 'Sahil Langoo | Resume & Curriculum Vitae',
        category: 'CAREER & EXPERIENCE',
        description:
          'Co-Founder & Lead Engineer at SquadCoders. Full stack systems, TypeScript, and edge architectures.',
        readingTime: 'Curriculum Vitae',
      },
    },
    {
      params: { slug: 'about' },
      props: {
        title: 'About Sahil Langoo | Engineering Philosophy & Craft',
        category: 'ENGINEERING & PHILOSOPHY',
        description:
          'Full Stack Systems Engineer and Co-Founder at SquadCoders. Minimalist UI craft & edge systems.',
        readingTime: 'About Me',
      },
    },
    {
      params: { slug: 'now' },
      props: {
        title: 'Now | Current Priorities & Active Projects',
        category: 'NOW FOCUS',
        description:
          'Public declaration of current priorities, active projects, learning quests, and focus areas.',
        readingTime: 'Priorities',
      },
    },
    {
      params: { slug: 'uses' },
      props: {
        title: 'Uses & Developer Setup | Tools & Hardware',
        category: 'GEAR & ENVIRONMENT',
        description:
          'Living inventory of hardware, software, editors, terminal tools, and cloud services.',
        readingTime: 'Developer Setup',
      },
    },
    {
      params: { slug: 'colophon' },
      props: {
        title: 'Technical Colophon & Architecture Specifications',
        category: 'SITE SPECIFICATIONS',
        description:
          'Technical colophon detailing typography, OKLCH color science, build architecture, and performance.',
        readingTime: 'Colophon',
      },
    },
    {
      params: { slug: 'links' },
      props: {
        title: 'Sahil Langoo | Verified Links & Profiles',
        category: 'VERIFIED PROFILES',
        description:
          'Quick access links to official profiles, repositories, technical essays, and portfolio.',
        readingTime: 'Links & Social',
      },
    },
    // Blog articles
    ...publishedBlog.map((post) => ({
      params: { slug: `blog/${post.id}` },
      props: {
        title: post.data.title,
        category: post.data.category.toUpperCase(),
        description: post.data.description,
        readingTime: post.data.readingTime || '5 min read',
      },
    })),
    // Projects
    ...publishedProjects.map((project) => ({
      params: { slug: `projects/${project.id}` },
      props: {
        title: project.data.title,
        category: project.data.category.toUpperCase(),
        description: project.data.description,
        readingTime: `${project.data.year} • Project`,
      },
    })),
  ];

  return paths;
}

const XML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};
const XML_ESCAPE_REGEX = /[&<>"']/g;

function escapeXml(unsafe: string): string {
  return unsafe.replace(XML_ESCAPE_REGEX, (ch) => XML_ESCAPE_MAP[ch] || ch);
}

function wrapText(text: string, maxCharsPerLine: number = 38, maxLines: number = 3): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      if (lines.length === maxLines - 1) {
        currentLine = `${currentLine}...`;
        lines.push(currentLine);
        currentLine = '';
        break;
      }
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, category, description, readingTime } = props as {
    title: string;
    category: string;
    description: string;
    readingTime: string;
  };

  const titleLines = wrapText(title, 34, 3);
  const descLines = wrapText(description || '', 55, 2);

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${240 + i * 56}" font-size="44" font-weight="700" fill="#f8fafc">${escapeXml(line)}</tspan>`
    )
    .join('');

  const descTspans = descLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${270 + titleLines.length * 56 + i * 32}" font-size="22" fill="#94a3b8">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d151c" />
      <stop offset="100%" stop-color="#080e14" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.75" opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Border Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="16" fill="none" stroke="#1e293b" stroke-width="2" />

  <!-- Header Category & Domain with Logo -->
  <text x="80" y="100" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#38bdf8" letter-spacing="2">
    ${escapeXml(category)}
  </text>
  <g transform="translate(1090, 76)">
    <rect width="30" height="30" rx="8" fill="#0c0d0f" stroke="#24272c" stroke-width="1.5" />
    <text x="15" y="21" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="14" fill="#38bdf8" letter-spacing="-0.5">SL</text>
  </g>
  <text x="1076" y="97" text-anchor="end" font-family="monospace, monospace" font-size="16" font-weight="500" fill="#64748b">
    sahillangoo.in
  </text>

  <!-- Title & Description -->
  <text font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
    ${titleTspans}
    ${descTspans}
  </text>

  <!-- Divider Line -->
  <line x1="80" y1="510" x2="1120" y2="510" stroke="#1e293b" stroke-width="1.5" />

  <!-- Footer Author Badge with Official SL Brand Logo -->
  <g transform="translate(80, 528)">
    <rect width="46" height="46" rx="12" fill="#0c0d0f" stroke="#24272c" stroke-width="2" />
    <text x="23" y="32" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="20" fill="#38bdf8" letter-spacing="-1">SL</text>
  </g>
  
  <text x="142" y="548" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#f1f5f9">
    Sahil Langoo
  </text>
  <text x="142" y="568" font-family="monospace, monospace" font-size="12" fill="#64748b">
    Full Stack Systems Engineer • @SquadCoders
  </text>

  <!-- Meta Badge -->
  <text x="1120" y="558" text-anchor="end" font-family="monospace, monospace" font-size="15" font-weight="500" fill="#38bdf8">
    ${escapeXml(readingTime)}
  </text>
</svg>
`;

  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 8, palette: true })
    .toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
