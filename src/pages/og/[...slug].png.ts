import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

export async function getStaticPaths() {
  const blog = await getCollection('blog');
  const projects = await getCollection('projects');
  const notes = await getCollection('notes');

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
          'Deep dives on distributed edge proxies, TypeScript, Web Performance, and minimalism.',
        readingTime: 'Essays & Articles',
      },
    },
    {
      params: { slug: 'notes' },
      props: {
        title: 'Digital Garden & System Notes',
        category: 'DIGITAL GARDEN',
        description:
          'Compact mental models, CSS architectures, OKLCH theming, and edge computing notes.',
        readingTime: 'Knowledge Base',
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
    ...blog.map((post) => ({
      params: { slug: `blog/${post.id}` },
      props: {
        title: post.data.title,
        category: post.data.category.toUpperCase(),
        description: post.data.description,
        readingTime: post.data.readingTime || '5 min read',
      },
    })),
    // Projects
    ...projects.map((project) => ({
      params: { slug: `projects/${project.id}` },
      props: {
        title: project.data.title,
        category: project.data.category.toUpperCase(),
        description: project.data.description,
        readingTime: `${project.data.year} • Project`,
      },
    })),
    // Notes
    ...notes.map((note) => ({
      params: { slug: `notes/${note.id}` },
      props: {
        title: note.data.title,
        category: `NOTE • ${note.data.topic.toUpperCase()}`,
        description: note.data.description || 'Digital garden note & mental model.',
        readingTime: 'Garden Note',
      },
    })),
  ];

  return paths;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine: number = 38): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length >= 3) break;
  }
  if (currentLine && lines.length < 3) lines.push(currentLine);
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, category, description, readingTime } = props as {
    title: string;
    category: string;
    description: string;
    readingTime: string;
  };

  const titleLines = wrapText(title, 34);
  const descLines = wrapText(description || '', 55).slice(0, 2);

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

  <!-- Header Category & Domain -->
  <rect x="80" y="80" width="auto" height="34" rx="6" fill="#1e293b" />
  <text x="80" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#38bdf8" letter-spacing="2">
    ${escapeXml(category)}
  </text>
  <text x="1120" y="102" text-anchor="end" font-family="monospace, monospace" font-size="16" font-weight="500" fill="#64748b">
    sahillangoo.in
  </text>

  <!-- Title & Description -->
  <text font-family="system-ui, -apple-system, sans-serif">
    ${titleTspans}
    ${descTspans}
  </text>

  <!-- Divider Line -->
  <line x1="80" y1="510" x2="1120" y2="510" stroke="#1e293b" stroke-width="1.5" />

  <!-- Footer Author Badge -->
  <circle cx="104" cy="552" r="20" fill="#38bdf8" />
  <text x="104" y="558" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#0c0d12">SL</text>
  
  <text x="138" y="550" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#f1f5f9">
    Sahil Langoo
  </text>
  <text x="138" y="568" font-family="monospace, monospace" font-size="12" fill="#64748b">
    Full Stack Systems Engineer • @SquadCoders
  </text>

  <!-- Meta Badge -->
  <text x="1120" y="558" text-anchor="end" font-family="monospace, monospace" font-size="15" font-weight="500" fill="#38bdf8">
    ${escapeXml(readingTime)}
  </text>
</svg>
`;

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
