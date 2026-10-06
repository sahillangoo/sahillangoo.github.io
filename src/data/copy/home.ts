import type { HomePageCopy } from './types';

export const homeCopy: HomePageCopy = {
  seo: {
    title: 'Sahil Langoo | Full Stack Systems Engineer & Systems Architect',
    description:
      'Engineering portfolio and systems catalog of Sahil Langoo. Specializing in Astro architectures, TypeScript, distributed edge proxies, and minimalist UI craft.',
    image: '/og/default.png',
  },
  hero: {
    kicker: 'Software Engineer · Full Stack · Systems',
    name: 'Sahil Langoo',
    leadBefore: 'I build ',
    leadEmphasis: 'high-performance',
    leadAfter: ' web systems and thoughtful interfaces',
    leadMuted: ', from static platforms and edge APIs to Go services.',
    bioBefore: 'Currently a Systems & Backend Integration Engineer at ',
    bioCompany: 'Eresolution Consultancy Services',
    bioMiddle: ', and co-founder of ',
    bioStudio: 'SquadCoders',
    bioAfter: '.',
    imageAlt: 'Sahil Langoo - Full Stack Systems Engineer & Systems Architect',
    imageQuote: '“Observe. Decompose. Reconstruct.”',
    resumeLabel: 'View resume',
    workLabel: 'Explore work',
  },
  snapshot: {
    value: '2,094',
    label: 'GitHub',
    note: 'contributions, last year',
    href: 'https://github.com/sahillangoo',
    facts: [
      {
        label: 'Reads',
        value: '5.4k+',
        note: 'on daily.dev',
        href: 'https://daily.dev/sahillangoo',
      },
      { label: 'Projects', value: '17', note: 'sites, APIs, and tools' },
      { label: 'Teams', value: 'India & Europe', note: 'In-house, contract, studio' },
    ],
  },
  sections: {
    selectedWork: {
      index: '01',
      title: 'Selected Work',
      description: 'Systems, products, and interfaces I have built.',
      viewAllText: 'All work',
    },
    careerHistory: {
      index: '02',
      title: 'Experience',
      description:
        'In-house, contract, and studio work across edge infrastructure, backend services, and product frontends.',
      viewAllText: 'Full resume',
    },
    recentWriting: {
      index: '04',
      title: 'Writing',
      description: 'Things I have been thinking about, building, and figuring out.',
      viewAllText: 'View all writing',
    },
    philosophy: {
      index: '03',
      title: 'Engineering',
      description: 'The principles behind the work, and the tools I reach for.',
    },
    about: {
      index: '05',
      title: 'Beyond the code',
      pull: 'Building from India, with teams across India and Europe.',
      paragraphs: [
        'I work on systems, infrastructure, and the interfaces in front of them. The writing is the public notebook: architecture notes, production lessons, and the occasional opinion.',
      ],
      facts: [
        {
          label: 'Writing',
          value: '5.4k+ reads on daily.dev',
          href: 'https://daily.dev/sahillangoo',
          icon: 'ph:article-bold',
        },
        {
          label: 'Elsewhere',
          value: '@kashurgeek on X',
          href: 'https://x.com/kashurgeek',
          icon: 'ph:x-logo-bold',
        },
      ],
    },
    contact: {
      title: 'Looking for the next engineering problem to solve.',
      description:
        'Full-time roles and select consulting engagements, wherever the work is. A short note is the best way to start.',
      email: 'hello@sahillangoo.in',
      openToLabel: 'Open to',
      openTo: [
        'Software Engineering',
        'Full Stack Engineering',
        'Backend / Systems Engineering',
        'Technical consulting',
      ],
      ctas: [
        {
          label: 'Get in touch',
          href: '/links/',
          icon: 'ph:arrow-up-right-bold',
          variant: 'primary',
        },
        {
          label: 'View resume',
          href: '/resume/',
          icon: 'ph:file-text-bold',
          variant: 'outline',
        },
      ],
    },
  },
};
