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
      params: { slug: 'services' },
      props: {
        title: 'Engineering Services & Systems Architecture Consulting',
        category: 'CAPABILITIES & CONSULTING',
        description:
          'Specialized engineering consulting: Cloudflare edge proxies, server-side Meta CAPI, Astro static architectures, and technical SEO/AEO.',
        readingTime: 'Consulting Offerings',
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
    {
      params: { slug: 'privacy' },
      props: {
        title: 'Privacy Policy & Telemetry Disclosures',
        category: 'COMPLIANCE & TELEMETRY',
        description:
          'Formal privacy statement, telemetry disclosures, and tracking technologies inventory for sahillangoo.in.',
        readingTime: 'Privacy Policy',
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

  const titleLines = wrapText(title, 38, 3);
  const descLines = wrapText(description || '', 66, 2);

  // Dynamic vertical balancing based on title length
  let titleStartY = 215;
  if (titleLines.length === 1) titleStartY = 235;
  else if (titleLines.length === 3) titleStartY = 190;

  const titleLineHeight = 62;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleStartY + i * titleLineHeight}" font-size="52" font-family="'Instrument Serif', Georgia, 'Times New Roman', serif" font-weight="400" fill="#ebe7df">${escapeXml(line)}</tspan>`
    )
    .join('');

  const descStartY = titleStartY + titleLines.length * titleLineHeight + 24;
  const descLineHeight = 36;

  const descTspans = descLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${descStartY + i * descLineHeight}" font-size="24" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" font-weight="400" fill="#ebe7df" opacity="0.9">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid Warm Ink Canvas (#161310 - Base Dark) -->
  <rect width="1200" height="630" fill="#161310" />

  <!-- Outer Hairline Framing (#322e2a - Base Border) -->
  <rect x="36" y="36" width="1128" height="558" rx="12" fill="none" stroke="#322e2a" stroke-width="1.5" />

  <!-- Header: Category in Main Ink (#ebe7df) with Violet Accent Dot Indicator (#aaa7f4) -->
  <g transform="translate(80, 88)">
    <circle cx="4" cy="-3" r="3.5" fill="#aaa7f4" />
    <text x="18" y="1" font-family="'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" font-weight="600" fill="#ebe7df" letter-spacing="2.5">
      ${escapeXml(category)}
    </text>
  </g>

  <!-- Header: Domain & Brand Monogram in Main Ink (#ebe7df) -->
  <text x="1064" y="92" text-anchor="end" font-family="'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" font-weight="500" fill="#ebe7df" opacity="0.85">
    sahillangoo.in
  </text>
  <g transform="translate(1080, 72)">
    <rect width="32" height="32" rx="8" fill="#1d1916" stroke="#322e2a" stroke-width="1.2" />
    <text x="16" y="22" text-anchor="middle" font-family="'Instrument Serif', Georgia, 'Times New Roman', serif" font-size="17" fill="#ebe7df">SL</text>
    <circle cx="26" cy="10" r="1.8" fill="#aaa7f4" />
  </g>

  <!-- Typography Content Block in Main Ink (#ebe7df) -->
  <text>
    ${titleTspans}
    ${descTspans}
  </text>

  <!-- Hairline Section Divider (#322e2a) -->
  <line x1="80" y1="504" x2="1120" y2="504" stroke="#322e2a" stroke-width="1" />

  <!-- Footer: SL Monogram Badge & Author Identity in Main Ink (#ebe7df) -->
  <g transform="translate(80, 524)">
    <rect width="48" height="48" rx="10" fill="#1d1916" stroke="#322e2a" stroke-width="1.5" />
    <text x="24" y="34" text-anchor="middle" font-family="'Instrument Serif', Georgia, 'Times New Roman', serif" font-size="26" fill="#ebe7df">SL</text>
    <circle cx="39" cy="16" r="2.5" fill="#aaa7f4" />
  </g>

  <text x="144" y="546" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" font-size="19" font-weight="500" fill="#ebe7df">
    Sahil Langoo
  </text>
  <text x="144" y="566" font-family="'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" fill="#ebe7df" opacity="0.85">
    Systems Architect &amp; Full Stack Engineer • @SquadCoders
  </text>

  <!-- Footer: Meta / Reading Time Badge in Main Ink (#ebe7df) -->
  <g transform="translate(1120, 555)">
    <text x="0" y="0" text-anchor="end" font-family="'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" font-weight="500" fill="#ebe7df">
      ${escapeXml(readingTime)}
    </text>
  </g>
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
