import { generateAllResumes } from './generator-core.ts';
import { validateGeneratedResumes } from './validate.ts';

async function main() {
  console.log('🚀 Starting ATS Multi-Role Resume Generation Pipeline...\n');
  const startTime = Date.now();

  try {
    const files = await generateAllResumes();
    const duration = Date.now() - startTime;
    console.log(
      `\n🎉 Successfully generated ${files.length} ATS-optimized resumes in ${duration}ms!\n`
    );

    const valid = validateGeneratedResumes();
    if (!valid) {
      process.exit(1);
    }
  } catch (err) {
    console.error('\n❌ Resume generation failed:', err);
    process.exit(1);
  }
}

main();
