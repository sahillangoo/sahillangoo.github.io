import type { HomePageCopy } from './types';

export const homeCopy: HomePageCopy = {
  seo: {
    title: 'Sahil Langoo | Full Stack Systems Engineer & Systems Architect',
    description:
      'Personal portfolio, engineering journal, and systems catalog of Sahil Langoo. Specializing in Astro 7 static architectures, TypeScript, distributed edge proxies, and minimalist UI craft.',
    image: '/og/default.png',
  },
  hero: {
    badge: 'Full Stack Systems Engineer',
    headline:
      'Engineering resilient edge systems, high-throughput web architectures & crafted interfaces.',
    subheadline:
      'I am Sahil Langoo, based in Kashmir, India. I specialize in architecting ultra-fast static web platforms, distributed API proxies, and type-safe systems at Eresolution Consultancy Services and in open source.',
    imageAlt: 'Sahil Langoo - Full Stack Systems Engineer & Systems Architect',
    statusText: 'Available for work',
    locationText: 'Kashmir, India',
    ctas: [
      {
        label: 'View Projects',
        href: '/projects/',
        icon: 'ph:folder-notch-bold',
        variant: 'primary',
      },
      {
        label: 'Resume & CV',
        href: '/resume/',
        icon: 'ph:file-text-bold',
        variant: 'outline',
      },
      {
        label: 'Get in Touch',
        href: '/contact/',
        icon: 'ph:paper-plane-tilt-bold',
        variant: 'ghost',
      },
    ],
  },
  sections: {
    selectedWork: {
      eyebrow: 'Selected Work',
      title: 'Engineered Projects & Systems',
      viewAllText: 'All Projects',
    },
    careerHistory: {
      eyebrow: 'Career History',
      title: 'Experience & Production Roles',
      viewAllText: 'Complete Resume',
    },
    recentWriting: {
      title: 'Recent Engineering Essays',
      viewAllText: 'All Writing ›',
    },
    digitalGarden: {
      title: 'Digital Garden & Technical Notes',
      viewAllText: 'All Notes ›',
    },
    philosophy: {
      eyebrow: 'Engineering Discipline',
      title: 'Core Architecture Principles',
    },
    ctaBanner: {
      title: 'Available for Systems Architecture & Technical Leadership',
      description:
        'Open to high-impact software engineering roles, distributed edge systems design, and select technical consulting engagements.',
      ctas: [
        {
          label: 'Start a Conversation',
          href: '/contact/',
          icon: 'ph:paper-plane-tilt-bold',
          variant: 'primary',
        },
        {
          label: 'Explore GitHub',
          href: 'https://github.com/sahillangoo',
          icon: 'ph:github-logo-bold',
          external: true,
          variant: 'outline',
        },
      ],
    },
  },
};
