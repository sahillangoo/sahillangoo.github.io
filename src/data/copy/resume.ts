import type { ResumePageCopy } from './types';

export const resumeCopy: ResumePageCopy = {
  seo: {
    title: 'Resume & Curriculum Vitae | Sahil Langoo',
    description:
      'Engineering resume and CV of Sahil Langoo. Career experience at Eresolution, technical competencies, and software systems timeline.',
    image: '/og/resume.png',
  },
  header: {
    eyebrow: 'Curriculum Vitae',
    roleSubtitle: 'Full Stack Systems Engineer • Kashmir, India',
    downloadCta: {
      label: 'Download PDF',
      href: '/resumes/Resume-Sahil-Langoo.pdf',
      icon: 'ph:file-pdf-bold',
      external: true,
    },
    contactCta: {
      label: 'Email Me',
      href: 'mailto:hello@sahillangoo.in',
      icon: 'ph:envelope-simple-bold',
      external: true,
    },
    githubCta: {
      label: 'GitHub',
      href: 'https://github.com/sahillangoo',
      icon: 'ph:github-logo-bold',
      external: true,
    },
  },
  sections: {
    executiveSummary: 'Executive Summary',
    professionalExperience: 'Professional Experience',
    technicalProjects: 'Technical Projects',
    coreCompetencies: 'Technical Core Competencies',
    languagesTitle: 'Languages & Core',
    frameworksTitle: 'Frameworks & Web Architecture',
    cloudTitle: 'Cloud & Edge Infrastructure',
    databasesToolsTitle: 'Databases, Storage & Quality Tooling',
    educationTitle: 'Education & Academic Credentials',
    certificationsTitle: 'Professional Certifications & Accreditations',
  },
};
