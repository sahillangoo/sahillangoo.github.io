import type { NowPageCopy } from './types';

export const nowCopy: NowPageCopy = {
  seo: {
    title: "Now | What I'm Doing Right Now | Sahil Langoo",
    description:
      'A live declaration of what Sahil Langoo is currently working on, engineering architectures, studying, reading, and building.',
    image: '/og/now.png',
  },
  header: {
    badge: 'Now Page (Public Declaration)',
    title: "What I'm Doing Right Now",
    description:
      'A live public record of my current engineering focus, technical investigations, reading queue, and active priorities.',
  },
  sections: [
    {
      category: 'Engineering & Systems Architecture at Eresolution Consultancy Services',
      icon: 'ph:code-bold',
      items: [
        'Architecting high-concurrency Cloudflare Worker API gateways and server-side Meta Conversions API (CAPI) event streams with Hono.',
        'Hardening payment and verification proxies (Experian OTP, Razorpay order lifecycle bounding) and multi-tenant observability.',
        'Triaging production Sentry exceptions, suppressing synthetic in-app browser errors across Meta IAB and iOS WebKit frames.',
      ],
    },
    {
      category: 'Client Platforms & Studio Engineering at @SquadCoders',
      icon: 'ph:laptop-bold',
      items: [
        'Delivering the editorial cinematography showcase for UK Director of Photography Rooh Yaseen (roohyaseen.com) with Astro 7, Lenis kinetic scrolling, and 0.00 CLS.',
        'Architecting the SquadCoders Go REST API (Chi, Huma v2, pure-Go SQLite) with RFC 9457 error contracts, constant-time auth, and in-memory pure-Go PDF document generation.',
        'Scaling full-stack platforms including SoulMedia UK (soulmedia.uk), Hotel Akbar Sonamarg (hotelakbarsonamarg.com), and HackerForce tactical platform (hackerforce.io).',
      ],
    },
    {
      category: 'Systems Tooling, Local AI & Consulting Packaging',
      icon: 'ph:sparkle-bold',
      items: [
        'Packaging specialized systems architecture consulting services covering edge proxies, server-side CAPI, static migrations, and AEO/GEO discovery endpoints.',
        'Open-source systems tooling: Windows 11 & WSL2 Maintenance Suite (zero-dependency PowerShell engine for developer storage reclamation) and Bio Dissertation Generator.',
        'Maintaining Tech Resume Expert, encoding Harvard MCS and FAANG screening heuristics into an open-source career intelligence platform.',
      ],
    },
    {
      category: 'Reading & Technical Literature',
      icon: 'ph:book-open-bold',
      items: [
        'Designing Data-Intensive Applications by Martin Kleppmann.',
        'Refactoring UI by Adam Wathan & Steve Schoger.',
        'RFC 9457 (Problem Details for HTTP APIs) and distributed edge caching research papers.',
      ],
    },
  ],
  availabilityCard: {
    title: 'Based in Kashmir, India',
    description:
      'Operating globally across UTC+5:30 (IST), UTC, and EST time zones with asynchronous discipline.',
    cta: {
      label: 'Connect & Links',
      href: '/links/',
      icon: 'ph:link-bold',
    },
  },
};
