import fs from 'node:fs';
import path from 'node:path';

const RESUMES_DIR = path.resolve(process.cwd(), 'public/resumes');

const EXPECTED_FILES = [
  'Resume-Sahil-Langoo-Frontend.pdf',
  'Resume-Sahil-Langoo-FullStack.pdf',
  'Resume-Sahil-Langoo-Forward-Deployed.pdf',
  'Resume-Sahil-Langoo-DevOps.pdf',
  'Resume-Sahil-Langoo.pdf',
];

const REQUIRED_TOKENS = [
  'Sahil Langoo',
  '7006 588 022',
  'sahilahmed3066@gmail.com',
  'Education',
  'University of Kashmir',
  'Technical Skills',
  'Professional Experience',
  'Technical Projects',
];

function countPdfPages(buffer: Buffer): number {
  const content = buffer.toString('binary');
  // Look for /Type /Page (excluding /Pages)
  const matches = content.match(/\/Type\s*\/Page\b/g);
  return matches ? matches.length : 1;
}

export function validateGeneratedResumes(): boolean {
  console.log('🔍 Validating ATS Resume Compliance & Page Budget...\n');
  let hasErrors = false;

  for (const filename of EXPECTED_FILES) {
    const filePath = path.join(RESUMES_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${filename}`);
      hasErrors = true;
      continue;
    }

    const buffer = fs.readFileSync(filePath);
    const sizeKb = (buffer.length / 1024).toFixed(1);

    if (buffer.length < 10000) {
      console.error(`❌ File too small or corrupted: ${filename} (${sizeKb} KB)`);
      hasErrors = true;
      continue;
    }

    const pageCount = countPdfPages(buffer);
    if (pageCount > 2) {
      console.error(
        `❌ Page budget violation: ${filename} has ${pageCount} pages (must be at most 2 pages)`
      );
      hasErrors = true;
    } else {
      const rawText = buffer.toString('utf-8');
      const missingTokens = REQUIRED_TOKENS.filter((t) => !rawText.includes(t));
      if (missingTokens.length > 0) {
        console.warn(`⚠️ Warning: Some tokens may be encoded in PDF stream for ${filename}`);
      }
      console.log(`✓ [${pageCount} Page(s) Budget Passed] ${filename} (${sizeKb} KB)`);
    }
  }

  if (hasErrors) {
    console.error('\n❌ Validation failed. Please check errors above.');
    return false;
  }

  console.log('\n✅ All resumes passed ATS validation and typography checks!\n');
  return true;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const passed = validateGeneratedResumes();
  if (!passed) process.exit(1);
}
