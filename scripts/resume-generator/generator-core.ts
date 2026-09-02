import fs from 'node:fs';
import path from 'node:path';
import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';
import { SITE } from '../../src/const/site.ts';
import type { ResumeData, ResumeRoleProfile } from '../../src/data/resumes/types.ts';

const ROLES_DIR = path.resolve(process.cwd(), 'src/data/resumes/roles');
const BASE_DATA_PATH = path.resolve(process.cwd(), 'src/data/resumes/base.json');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/resumes');

function safeWriteFileSync(filePath: string, buffer: Buffer): boolean {
  try {
    fs.writeFileSync(filePath, buffer);
    return true;
  } catch (err) {
    const error = err as { code?: string };
    if (error.code === 'EBUSY') {
      console.warn(
        `⚠️ Warning: ${path.basename(filePath)} is currently locked by another process. Skipping overwrite.`
      );
      return false;
    }
    throw err;
  }
}

function escapeTypst(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/`/g, '\\`');
}

function formatProjectUrl(url?: string): { display: string; href: string } | null {
  if (!url) return null;
  let display = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (display.startsWith('github.com/')) {
    const parts = display.split('/');
    if (parts.length >= 3) {
      display = `github:${parts.slice(2).join('/')}`;
    } else {
      display = display.replace('github.com/', 'github:');
    }
  }
  return { display, href: url };
}

export function renderTypstSource(data: ResumeData): string {
  const { contact, summary, skills, experience, projects, education, certifications } = data;

  const webDisplay = contact.website.replace(/^https?:\/\//, '');
  const ghDisplay = contact.github.replace(/^https?:\/\//, '');
  const liDisplay = contact.linkedin.replace(/^https?:\/\//, '');

  let typstCode = `
#set page(
  paper: "us-letter",
  margin: (x: 0.52in, top: 0.40in, bottom: 0.40in),
)

#set text(
  font: ("New Computer Modern", "Latin Modern Roman", "Liberation Serif", "Times New Roman"),
  size: 9.8pt,
  lang: "en",
)

#set par(
  justify: false,
  leading: 0.52em,
)

#set list(
  marker: text(size: 7.5pt, baseline: 0.5pt)[•],
  body-indent: 5pt,
  spacing: 3.2pt,
)

// Section Heading Macro with keep-with-next semantics
#show heading.where(level: 2): it => block(width: 100%, breakable: false)[
  #v(5.5pt)
  #text(weight: "bold", size: 11.5pt, it.body)
  #v(-4pt)
  #line(length: 100%, stroke: 0.55pt + black)
  #v(2.2pt)
]

#let section(title) = heading(level: 2)[#smallcaps(title)]

// Experience / Education Subheading Macro (allows natural page break across bullets)
#let entry(title, location, subtitle, dates, bullets) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      text(weight: "bold", size: 10.2pt, title),
      text(weight: "regular", size: 9.6pt, location),
    )
    #v(-2pt)
    #grid(
      columns: (1fr, auto),
      text(style: "italic", size: 9.8pt, subtitle),
      text(style: "italic", size: 9.4pt, dates),
    )
  ]
  if bullets.len() > 0 [
    #v(2pt)
    #list(..bullets)
  ]
  v(3.0pt)
}

// Project Entry Macro (allows natural page break across bullets)
#let project(title, tech, dates, bullets, url: none, url_display: none) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      [
        #text(weight: "bold", size: 10.2pt, title)
        #text(style: "italic", size: 9.4pt)[ | #tech]
        #if url != none [
          #text(size: 8.8pt)[ (#link(url)[#url_display]) ]
        ]
      ],
      text(style: "italic", size: 9.4pt, dates),
    )
  ]
  if bullets.len() > 0 [
    #v(2pt)
    #list(..bullets)
  ]
  v(3.5pt)
}

// --- 1. HEADER ---
#align(center)[
  #text(weight: "bold", size: 21pt, smallcaps("${escapeTypst(contact.name)}")) \\
  #v(2pt)
  #text(size: 9.4pt)[
    ${escapeTypst(contact.location)} $|$ ${escapeTypst(contact.phone)} $|$ #link("mailto:${contact.email}")[#text("${contact.email}")] \\
    #v(2pt)
    #link("${contact.website}")[#text("${webDisplay}")] $|$ #link("${contact.linkedin}")[#text("${liDisplay}")] $|$ #link("${contact.github}")[#text("${ghDisplay}")]
  ]
]
#v(1pt)
`;

  // --- 2. TECHNICAL SUMMARY ---
  if (summary) {
    typstCode += `
// --- TECHNICAL SUMMARY ---
#section("Technical Summary")
#block(width: 100%)[
  #set text(size: 9.5pt)
  ${escapeTypst(summary)}
]
`;
  }

  // --- 3. TECHNICAL SKILLS ---
  typstCode += `
// --- TECHNICAL SKILLS ---
#section("Technical Skills")
#block(width: 100%)[
  #set text(size: 9.5pt)
  #grid(
    columns: (auto, 1fr),
    row-gutter: 2.8pt,
    column-gutter: 6pt,
    [*Languages & Scripting:*], [${skills.languages.map(escapeTypst).join(', ')}],
    [*Frameworks & UI:*], [${skills.frameworks.map(escapeTypst).join(', ')}],
    [*Cloud & DevOps:*], [${skills.cloud.map(escapeTypst).join(', ')}],
    [*Databases & Tools:*], [${skills.databasesAndTools.map(escapeTypst).join(', ')}],
  )
]

// --- 4. PROFESSIONAL EXPERIENCE ---
#section("Professional Experience")
`;

  for (const exp of experience) {
    const bullets = exp.highlights.map((h) => `[${escapeTypst(h)}]`);
    typstCode += `
#entry(
  "${escapeTypst(exp.company)}",
  "${escapeTypst(exp.location)}",
  "${escapeTypst(exp.role)}",
  "${escapeTypst(exp.dates)}",
  (${bullets.join(', ')},)
)
`;
  }

  // --- 5. TECHNICAL PROJECTS ---
  typstCode += `
// --- TECHNICAL PROJECTS ---
#section("Technical Projects")
`;

  for (const proj of projects) {
    const bullets = proj.highlights.map((h) => `[${escapeTypst(h)}]`);
    const formattedUrl = formatProjectUrl(proj.link);
    const urlParam = formattedUrl
      ? `url: "${formattedUrl.href}", url_display: "${formattedUrl.display.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
      : 'url: none, url_display: none';
    typstCode += `
#project(
  "${escapeTypst(proj.name)}",
  "${escapeTypst(proj.tech)}",
  "${escapeTypst(proj.dates)}",
  (${bullets.join(', ')},),
  ${urlParam}
)
`;
  }

  // --- 6. EDUCATION ---
  typstCode += `
// --- EDUCATION ---
#section("Education")
`;

  for (const edu of education) {
    const bullets: string[] = [];
    if (edu.coursework && edu.coursework.length > 0) {
      bullets.push(`*Relevant Coursework:* ${edu.coursework.map(escapeTypst).join(', ')}.`);
    }
    const bulletsParam =
      bullets.length > 0 ? `(${bullets.map((b) => `[${b}]`).join(', ')},)` : '()';
    typstCode += `
#entry(
  "${escapeTypst(edu.institution)}",
  "${escapeTypst(edu.location)}",
  "${escapeTypst(edu.degree)}",
  "${escapeTypst(edu.dates)}",
  ${bulletsParam}
)
`;
  }

  // --- 7. CERTIFICATIONS ---
  if (certifications && certifications.length > 0) {
    typstCode += `
// --- CERTIFICATIONS ---
#section("Certifications")
#block(width: 100%)[
  #set text(size: 9.4pt)
  #grid(
    columns: (1fr, 1fr),
    row-gutter: 3pt,
    column-gutter: 16pt,
    ${certifications.map((c) => `[• *${escapeTypst(c.name)}* _(${escapeTypst(c.issuer)})_]`).join(',\n    ')}
  )
]
`;
  }

  return typstCode;
}

export function buildResumeData(
  roleProfile: ResumeRoleProfile,
  baseData: Pick<ResumeData, 'education' | 'certifications'>
): ResumeData {
  return {
    contact: {
      name: SITE.name,
      legalName: SITE.legalName || SITE.author,
      title: roleProfile.roleTitle,
      location: SITE.detailedLocation || SITE.location,
      phone: SITE.phone || '+91 7006 588 022',
      email: SITE.personalEmail || SITE.email,
      website: SITE.url,
      github: SITE.social.github,
      linkedin: SITE.social.linkedin,
    },
    summary: roleProfile.summary,
    education: baseData.education || [],
    skills: roleProfile.skills,
    experience: roleProfile.experience,
    projects: roleProfile.projects,
    certifications: baseData.certifications || [],
  };
}

export async function generateAllResumes(): Promise<string[]> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const baseData = JSON.parse(fs.readFileSync(BASE_DATA_PATH, 'utf-8'));
  const roleFiles = fs.readdirSync(ROLES_DIR).filter((f) => f.endsWith('.json'));

  const generatedFiles: string[] = [];
  const compiler = NodeCompiler.create();

  for (const roleFile of roleFiles) {
    const rolePath = path.join(ROLES_DIR, roleFile);
    const roleProfile: ResumeRoleProfile = JSON.parse(fs.readFileSync(rolePath, 'utf-8'));

    const resumeData = buildResumeData(roleProfile, baseData);
    const typstSource = renderTypstSource(resumeData);

    const pdfBuffer = compiler.pdf({
      mainFileContent: typstSource,
    });

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error(`Failed to compile PDF for role: ${roleProfile.id}`);
    }

    const targetPath = path.join(OUTPUT_DIR, roleProfile.filename);
    const written = safeWriteFileSync(targetPath, Buffer.from(pdfBuffer));
    if (written) {
      generatedFiles.push(targetPath);
      console.log(
        `✓ Generated: ${roleProfile.filename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`
      );
    }

    // If this is fullstack, also write the canonical Resume-Sahil-Langoo.pdf
    if (roleProfile.id === 'fullstack') {
      const canonicalPath = path.join(OUTPUT_DIR, 'Resume-Sahil-Langoo.pdf');
      const writtenCanonical = safeWriteFileSync(canonicalPath, Buffer.from(pdfBuffer));
      if (writtenCanonical) {
        generatedFiles.push(canonicalPath);
        console.log(
          `✓ Generated Canonical: Resume-Sahil-Langoo.pdf (${(pdfBuffer.length / 1024).toFixed(1)} KB)`
        );
      }
    }
  }

  return generatedFiles;
}
