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

export function renderTypstSource(data: ResumeData): string {
  const { contact, education, skills, experience, projects, certifications } = data;

  const webDisplay = contact.website.replace(/^https?:\/\//, '');
  const ghDisplay = contact.github.replace(/^https?:\/\//, '');
  const liDisplay = contact.linkedin.replace(/^https?:\/\//, '');

  let typstCode = `
#set page(
  paper: "us-letter",
  margin: (x: 0.55in, top: 0.5in, bottom: 0.5in),
)

#set text(
  font: ("New Computer Modern", "Latin Modern Roman", "Liberation Serif", "Times New Roman"),
  size: 10pt,
  lang: "en",
  spacing: 100%,
)

#set par(
  justify: true,
  leading: 0.62em,
)

// Section Heading Macro (Jake's Resume Gold Standard)
#let section(title) = {
  v(8pt)
  text(weight: "bold", size: 12pt, smallcaps(title))
  v(-4pt)
  line(length: 100%, stroke: 0.6pt + black)
  v(3pt)
}

// Experience / Education Subheading Macro
#let entry(title, location, subtitle, dates, bullets) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      text(weight: "bold", size: 10.5pt)[#title],
      text(weight: "bold", size: 10pt)[#location],
    )
    #v(-2pt)
    #grid(
      columns: (1fr, auto),
      text(style: "italic", size: 10pt)[#subtitle],
      text(style: "italic", size: 9.5pt)[#dates],
    )
    #v(-2pt)
    #for b in bullets [
      #v(2.5pt)
      #grid(
        columns: (10pt, 1fr),
        [•],
        [#text(size: 9.8pt)[#b]]
      )
    ]
    #v(3pt)
  ]
}

// Project Entry Macro
#let project(title, tech, dates, bullets, url: none) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      [
        #text(weight: "bold", size: 10.5pt)[#title]
        #text(style: "italic", size: 9.5pt)[ | #tech]
        #if url != none [
          #text(size: 9pt)[ (#link(url)[#url.replace("https://", "")]) ]
        ]
      ],
      text(style: "italic", size: 9.5pt)[#dates],
    )
    #v(-2pt)
    #for b in bullets [
      #v(2.5pt)
      #grid(
        columns: (10pt, 1fr),
        [•],
        [#text(size: 9.8pt)[#b]]
      )
    ]
    #v(3pt)
  ]
}

// --- HEADER ---
#align(center)[
  #text(weight: "bold", size: 22pt, smallcaps("${escapeTypst(contact.name)}")) \\
  #v(2pt)
  #text(size: 9.5pt)[
    ${escapeTypst(contact.location)} $|$ ${escapeTypst(contact.phone)} $|$ #link("mailto:${contact.email}")[#text("${contact.email}")] \\
    #v(2pt)
    #link("${contact.website}")[#text("${webDisplay}")] $|$ #link("${contact.linkedin}")[#text("${liDisplay}")] $|$ #link("${contact.github}")[#text("${ghDisplay}")]
  ]
]
#v(2pt)

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

  typstCode += `
// --- TECHNICAL SKILLS ---
#section("Technical Skills")
#block(width: 100%)[
  #set text(size: 9.8pt)
  #grid(
    columns: (auto, 1fr),
    row-gutter: 3pt,
    column-gutter: 6pt,
    [*Languages & Scripting:*], [${skills.languages.map(escapeTypst).join(', ')}],
    [*Frameworks & UI:*], [${skills.frameworks.map(escapeTypst).join(', ')}],
    [*Cloud & DevOps:*], [${skills.cloud.map(escapeTypst).join(', ')}],
    [*Databases & Tools:*], [${skills.databasesAndTools.map(escapeTypst).join(', ')}],
  )
]

// --- PROFESSIONAL EXPERIENCE ---
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

  typstCode += `
// --- TECHNICAL PROJECTS ---
#section("Technical Projects")
`;

  for (const proj of projects) {
    const bullets = proj.highlights.map((h) => `[${escapeTypst(h)}]`);
    const urlParam = proj.link ? `url: "${proj.link}"` : 'url: none';
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

  if (certifications && certifications.length > 0) {
    typstCode += `
// --- CERTIFICATIONS ---
#section("Certifications")
#block(width: 100%)[
  #set text(size: 9.5pt)
  #grid(
    columns: (1fr, 1fr),
    row-gutter: 3pt,
    column-gutter: 14pt,
    ${certifications.map((c) => `[*${escapeTypst(c.name)}* — _${escapeTypst(c.issuer)}_]`).join(',\n    ')}
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
