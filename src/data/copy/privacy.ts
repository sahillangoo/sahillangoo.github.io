import type { PrivacyPageCopy } from './types';

export const privacyCopy: PrivacyPageCopy = {
  seo: {
    title: 'Privacy Policy & Telemetry Disclosures | Sahil Langoo',
    description:
      'Formal privacy statement, telemetry disclosures, and tracking technologies inventory for sahillangoo.in, covering Cloudflare Analytics, Google Analytics, GTM, and Microsoft Clarity.',
    image: '/og/privacy.png',
  },
  header: {
    badge: 'Legal & Compliance Disclosure',
    title: 'Privacy Policy',
    effectiveDate: 'October 1, 2026',
    lastUpdated: 'October 7, 2026',
    description:
      'This Privacy Policy delineates the protocols, methodologies, and legal standards governing the collection, processing, transmission, and retention of electronic data, client telemetry, and behavioral metrics across sahillangoo.in.',
  },
  overview: {
    title: 'Data Controller & Architectural Scope',
    controller: 'Sahil Ahmad Langoo (operating as Sahil Langoo)',
    contact: 'hello@sahillangoo.in',
    summary:
      'This website functions as an engineering portfolio, technical journal, and distributed systems catalog. We operate under a foundational principle of data minimization and zero-knowledge architecture: we do not maintain user account registries, do not collect personal financial or billing information, and do not monetize visitor records through data brokerage or programmatic advertisement auctions. Any electronic processing performed is strictly dedicated to infrastructure security, edge performance diagnostics, audience measurement, and user interface behavioral optimization in compliance with the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679), the UK Data Protection Act 2018 (UK GDPR), the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), and the Digital Personal Data Protection Act (DPDPA 2023).',
  },
  cookiesTableTitle: 'Inventory of Client Storage & Telemetry Identifiers',
  cookiesTableDescription:
    'The following matrix details all first-party and third-party storage tokens, HTTP cookies, and local browser state keys utilized across the platform.',
  cookies: [
    {
      name: 'theme',
      provider: 'sahillangoo.in (First-Party)',
      category: 'Essential',
      lifespan: 'Persistent (Local Storage)',
      purpose:
        'Maintains user color scheme preference (editorialDark or editorialLight) across navigation lifecycles without transmitting identifiers across networks.',
    },
    {
      name: '_ga',
      provider: 'Google LLC (Google Analytics 4)',
      category: 'Analytics',
      lifespan: '2 years from creation/update',
      purpose:
        'Calculates visitor, session, and campaign engagement metrics by establishing a pseudonymous, randomly generated client identifier token.',
    },
    {
      name: '_ga_<CONTAINER_ID>',
      provider: 'Google LLC (Google Analytics 4)',
      category: 'Analytics',
      lifespan: '2 years from creation/update',
      purpose:
        'Maintains stateful telemetry parameters and session counter attributes associated with specific Google Analytics 4 data streams.',
    },
    {
      name: '_clck',
      provider: 'Microsoft Corporation (Microsoft Clarity)',
      category: 'Behavioral',
      lifespan: '1 year from creation/update',
      purpose:
        'Persists a unique pseudonymous Clarity User ID and settings across multiple browser sessions to prevent duplicate visitor enumeration.',
    },
    {
      name: '_clsk',
      provider: 'Microsoft Corporation (Microsoft Clarity)',
      category: 'Behavioral',
      lifespan: '1 day (Session)',
      purpose:
        'Connects multiple page views by the same visitor into a single behavioral session recording sequence during active site engagement.',
    },
    {
      name: 'CLID',
      provider: 'Microsoft Corporation (Microsoft Clarity)',
      category: 'Behavioral',
      lifespan: '1 year',
      purpose:
        'Identifies unique browser instances across domains for Microsoft behavioral analysis, site optimization, and fraud prevention diagnostics.',
    },
    {
      name: 'Cloudflare Web Analytics',
      provider: 'Cloudflare, Inc.',
      category: 'Analytics',
      lifespan: 'Stateless / 0 Bytes',
      purpose:
        'Operates entirely cookie-less. Does not write or read client cookies or browser local storage; telemetry is processed ephemerally at the edge.',
    },
  ],
  sections: [
    {
      id: 'telemetry-disclosures',
      title: 'Third-Party Analytics & Telemetry Processors',
      badge: 'Processor Audits',
      paragraphs: [
        'To continuously verify distributed edge latency, debug rendering regressions, assess technical essay resonance, and refine interface responsiveness, we interface with specialized third-party telemetry and behavioral observability services. Each processor executes within tightly constrained operational boundaries outlined below.',
      ],
      subsections: [
        {
          title: '1. Cloudflare Web Analytics (Edge Telemetry & Core Web Vitals)',
          description:
            'We deploy Cloudflare Web Analytics, a privacy-first measurement platform provided by Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA). Cloudflare Web Analytics is engineered specifically to measure site health and performance indicators without impinging upon end-user privacy.',
          bullets: [
            'Cookie-less Execution: Cloudflare Web Analytics does not set, read, or store persistent cookies, local storage entries, or session storage records on client devices.',
            'Zero Cross-Site Fingerprinting: The platform does not calculate canvas hashes, audio fingerprints, or hardware signatures to track individuals across distinct domains or digital identities.',
            'Telemetry Harvested: Metrics captured comprise Core Web Vitals (Largest Contentful Paint [LCP], Cumulative Layout Shift [CLS], Interaction to Next Paint [INP]), Time to First Byte (TTFB), page render intervals, HTTP referrer headers, device platform, browser user agent strings, and coarse regional geolocation.',
            'Ephemeral IP Processing: IP addresses are inspected transiently within volatile edge server RAM solely to determine country-level routing and are immediately discarded without persistent disk serialization.',
            'Further Information: For exhaustive architectural specifications, consult the Cloudflare Privacy Policy (https://www.cloudflare.com/privacypolicy/) and Cloudflare Web Analytics documentation (https://www.cloudflare.com/web-analytics/).',
          ],
        },
        {
          title: '2. Google Analytics 4 & Off-Thread Partytown Execution',
          description:
            'We utilize Google Analytics 4 (GA4), an event-driven web analytics suite administered by Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; for EEA residents, Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). GA4 measures aggregate visitor engagement and operational interface telemetry.',
          bullets: [
            'Worker Thread Isolation: To safeguard main-thread responsiveness, preserve 0ms Total Blocking Time (TBT), and protect page load velocity, the Google Analytics client runtime is decoupled from the browser main execution thread and isolated within an off-thread background Web Worker via Partytown.',
            'IP Masking & Anonymization: In Google Analytics 4, IP anonymization is active by default. Full IP strings are not serialized to disk; rather, incoming IP addresses are momentarily processed at regional ingestion endpoints to infer coarse geographic parameters (city/metro level) and are subsequently purged before telemetry is committed to permanent datastores.',
            'Identifiers & Attributes: GA4 relies upon pseudonymous alphanumeric client identifiers (e.g., _ga) to distinguish distinct sessions, record page interaction events (astro:page-load triggers, scroll milestones, and outbound link navigation), screen dimensions, and language preferences.',
            'Cross-Border Safeguards: Data ingested by Google may be transferred to and archived on servers within the United States pursuant to the EU-U.S. Data Privacy Framework (DPF) and European Commission Standard Contractual Clauses (SCCs).',
            'Opt-Out Mechanisms: Visitors may indefinitely preclude Google Analytics from capturing interaction signals across all web destinations by deploying the official Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout).',
          ],
        },
        {
          title: '3. Google Tag Manager (GTM Infrastructure & Container Orchestration)',
          description:
            'We deploy Google Tag Manager (GTM) infrastructure, operated by Google LLC, as a stateless container delivery system to provision measurement libraries (specifically via https://www.googletagmanager.com/gtag/js).',
          bullets: [
            'Stateless Delivery: Google Tag Manager acts exclusively as a content distribution mechanism and script orchestrator. GTM itself does not instantiate tracking profiles, does not write distinct advertising cookies, and does not record personal behavioral data in an autonomous capacity.',
            'Transmission Headers: When requesting tag configurations from Google content delivery networks, the client browser inherently transmits network connection headers, including the outbound IP address and HTTP User-Agent. These headers are processed purely to service the cryptographic payload delivery request from the nearest edge node.',
            'Privacy Governance: All tracking directives orchestrated through container definitions are strictly governed by the overarching Google Privacy & Terms disclosure (https://policies.google.com/privacy).',
          ],
        },
        {
          title: '4. Microsoft Clarity (Behavioral Analytics, Heatmaps & Session Replay)',
          description:
            'We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. Additionally, we use this information for site optimization, fraud/security purposes, and advertising. For more information about how Microsoft collects and uses your data, visit the Microsoft Privacy Statement (https://privacy.microsoft.com/en-us/privacystatement).',
          bullets: [
            'Behavioral Metrics Ingested: Clarity records cursor coordinate vectors, click velocity, scrolling depth, dynamic document layout shifts (CLS telemetry), navigation timelines between internal pages, time-on-page intervals, JavaScript errors, and hardware viewport dimensions.',
            'Mandatory Client-Side Masking: Strict automated content masking is programmatically enforced in the browser DOM prior to any recording serialization. All input text fields, form elements, sensitive alphanumeric patterns, and personally identifiable text strings are redacted into obfuscated masks before telemetry leaves the client sandbox.',
            'Tracking Technologies Employed: Microsoft Clarity deploys first-party cookies (e.g., _clck and _clsk) alongside third-party identifiers to stitch disparate web page transitions into coherent interaction sessions across page routing events.',
            'Opt-Out & Privacy Controls: Visitors can manage their interest-based advertising preferences and data collection settings via the Microsoft Privacy Dashboard (https://account.microsoft.com/privacy) or through cross-industry opt-out portals such as the Digital Advertising Alliance (DAA) WebChoices Tool (https://optout.aboutads.info/) and the Network Advertising Initiative (NAI) Consumer Opt-Out (https://optout.networkadvertising.org/).',
          ],
        },
      ],
    },
    {
      id: 'legal-bases',
      title: 'Lawful Bases for Data Processing (GDPR Article 6)',
      badge: 'Statutory Foundations',
      paragraphs: [
        'Pursuant to Article 6(1) of the General Data Protection Regulation (GDPR) and reciprocal international privacy statutes, electronic processing of technical usage telemetry across sahillangoo.in is anchored upon the following lawful foundations:',
      ],
      subsections: [
        {
          title: 'Legitimate Interests (Art. 6(1)(f) GDPR)',
          description:
            'Processing is necessary for the purposes of legitimate interests pursued by the Data Controller, specifically:',
          bullets: [
            'Guaranteeing infrastructure integrity, network resilience, DDoS mitigation, and edge firewall defense against automated attack vectors.',
            'Diagnosing software anomalies, script exceptions, layout regressions, and performance bottlenecks across heterogeneous browsers and operating environments.',
            'Auditing technical content resonance, reader engagement patterns, and optimizing interface usability through aggregated behavioral telemetry.',
          ],
        },
        {
          title: 'Consent & Electronic Privacy Directives (Art. 6(1)(a) GDPR)',
          description:
            'Where local statutory mandates (such as the EU ePrivacy Directive 2002/58/EC as amended) require prior consent for the deposition and retrieval of non-essential persistent cookies or behavioral identifiers, such processing is subject to affirmative user consent signals, browser configuration choices, and revocable consent preferences.',
        },
      ],
    },
    {
      id: 'automated-signals',
      title: 'Automated Browser Signals & Client-Side Opt-Outs',
      badge: 'Technical Controls',
      paragraphs: [
        'We acknowledge and respect modern consumer privacy standards and automated browser configuration signals designed to limit tracking surface area.',
      ],
      subsections: [
        {
          title: 'Global Privacy Control (GPC) & Do Not Track (DNT)',
          description:
            'Our edge infrastructure and client runtime support client-side privacy signals. When our platform detects an active Global Privacy Control signal (navigator.globalPrivacyControl === true) or Do Not Track header (navigator.doNotTrack === "1"), we treat such signals as an explicit request to restrict non-essential behavioral profiling and analytics aggregation.',
        },
        {
          title: 'Native Browser Storage & Cookie Disabling',
          description:
            'You may configure your browser software to reject all third-party cookies, clear existing cache artifacts, block cross-site tracking scripts, or alert you when cookies are dispatched. Consult the configuration documentation for your respective browser engine (Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge). Please note that disabling browser storage mechanisms may alter cosmetic preference persistence, such as your selected dark/light visual theme.',
        },
      ],
    },
    {
      id: 'retention-transfers',
      title: 'Data Retention Schedules & International Transfers',
      badge: 'Lifecycle & Geography',
      paragraphs: [
        'We adhere to rigorous temporal retention boundaries to prevent unnecessary data persistence. Telemetry logs and pseudonymous records are archived only for the duration essential to fulfill diagnostic and analytical requirements:',
      ],
      subsections: [
        {
          title: 'Retention Timeframes',
          description: 'Operational retention windows are enforced per processor category:',
          bullets: [
            'Google Analytics 4: User-level and event-level exploratory records are configured with an automated expiration cycle of two (2) months to fourteen (14) months, after which aggregated records are systematically purged.',
            'Microsoft Clarity: Session replay recordings and raw behavioral interaction sequences are retained on Microsoft cloud infrastructure for a maximum rolling window of thirty (30) to ninety (90) days pursuant to standard Clarity data lifecycles.',
            'Cloudflare Web Analytics: Aggregated performance metrics are preserved for historical trend inspection, with raw IP-derived request streams discarded instantaneously at the edge edge runtime.',
          ],
        },
        {
          title: 'Transborder Data Flows',
          description:
            'Due to the globally distributed architecture of Cloudflare Pages edge networks, Google cloud clusters, and Microsoft infrastructure, collected telemetry may be transmitted to, stored in, and processed within jurisdictions outside your country of residence, including the United States. International transfers originating from the European Economic Area (EEA), United Kingdom, or Switzerland rely upon European Commission Standard Contractual Clauses (SCCs), UK International Data Transfer Agreements (IDTAs), and commercial adequacy frameworks including the EU-U.S. Data Privacy Framework.',
        },
      ],
    },
    {
      id: 'security-architecture',
      title: 'Technical Security & Cryptographic Safeguards',
      badge: 'Defensive Engineering',
      paragraphs: [
        'In conformity with GDPR Article 32 (Security of Processing), we enforce comprehensive administrative, technical, and architectural countermeasures to safeguard all data transmitted to and from this platform:',
        '1. Universal Transport Encryption: All network communication is mandated through Transport Layer Security (TLS 1.3 / TLS 1.2) utilizing modern cipher suites and HTTP Strict Transport Security (HSTS) with preloading.',
        '2. Edge Defense & Firewall Hardening: Network edge traffic is routed through Cloudflare Web Application Firewall (WAF) to neutralize zero-day vulnerabilities, malicious scraping bots, and DDoS amplification attempts.',
        '3. Content Security Policies & Subresource Integrity: External script inclusions are strictly restricted to audited domains (Cloudflare Insights, Google Tag Manager, and Microsoft Clarity) with rigorous origin validation and worker sandbox containment.',
      ],
    },
  ],
  rightsTitle: 'Data Subject Rights & Statutory Protections',
  rightsDescription:
    'Under applicable global data protection statutes (including GDPR Articles 15 through 22 and CCPA/CPRA Sections 1798.100 through 1798.125), visitors possess enforceable legal entitlements regarding their data:',
  rights: [
    {
      title: 'Right of Access & Data Portability (Art. 15 & 20 GDPR)',
      description:
        'The entitlement to obtain verification as to whether personal telemetry concerning you is being processed, and to obtain a structured, machine-readable copy of any verifiable records.',
    },
    {
      title: 'Right to Rectification & Erasure (Art. 16 & 17 GDPR)',
      description:
        'The entitlement to rectify inaccurate data or request the definitive erasure of your pseudonymous identifiers and telemetry records ("Right to be Forgotten").',
    },
    {
      title: 'Right to Restriction of Processing & Objection (Art. 18 & 21 GDPR)',
      description:
        'The entitlement to demand that data processing be suspended, or to object at any time to telemetry collection conducted under legitimate interests grounds.',
    },
    {
      title: 'California Consumer Rights (CCPA / CPRA Protections)',
      description:
        'California residents have the right to know the categories of personal information collected, the right to delete personal information, the right to correct inaccurate records, and the right to non-discrimination for exercising statutory privacy privileges. We explicitly confirm that we do NOT sell, rent, release, disclose, disseminate, or transfer personal information to third parties for monetary or other valuable consideration.',
    },
    {
      title: 'Right to Lodge a Complaint with a Supervisory Authority',
      description:
        'If you believe that our processing of your telemetry infringes applicable statutory protections, you maintain the legal right to submit a formal complaint with the relevant Data Protection Authority (DPA) in your EU member state of habitual residence, place of work, or place of alleged infringement.',
    },
  ],
  contactSection: {
    title: 'Privacy Compliance Office & Inquiries',
    description:
      'If you have questions, grievances, or wish to exercise statutory data subject privileges regarding this Privacy Policy, please contact the Data Controller directly via encrypted or standard electronic mail. We endeavor to investigate and resolve all inquiries within thirty (30) calendar days pursuant to international statutory norms.',
    email: 'hello@sahillangoo.in',
  },
};
