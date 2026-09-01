import type { ResumePageCopy } from './types';

export const resumeCopy: ResumePageCopy = {
  seo: {
    title: 'Resume & Curriculum Vitae — Sahil Langoo',
    description:
      'Professional engineering resume, verified career experience at SquadCoders and ECSPL, core technical competencies, and architectural timeline of Sahil Langoo.',
    image: '/og/resume.png',
  },
  header: {
    eyebrow: 'Curriculum Vitae',
    roleSubtitle: 'Full Stack Systems Engineer & Co-Founder • Kashmir, India',
    downloadCta: {
      label: 'Download PDF',
      href: '/resumes/Resume-Sahil-Langoo.pdf',
      icon: 'ph:file-pdf-bold',
      external: true,
    },
    contactCta: {
      label: 'Contact Me',
      href: '/contact/',
      icon: 'ph:paper-plane-tilt-bold',
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
    coreCompetencies: 'Technical Core Competencies',
    languagesTitle: 'Languages & Core',
    frameworksTitle: 'Frameworks & Web Architecture',
    cloudTitle: 'Cloud & Edge Infrastructure',
    databasesToolsTitle: 'Databases, Storage & Quality Tooling',
    educationTitle: 'Education & Academic Credentials',
    certificationsTitle: 'Professional Certifications & Accreditations',
  },
};
