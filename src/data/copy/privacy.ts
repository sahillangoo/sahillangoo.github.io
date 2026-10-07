import type { PrivacyPageCopy } from './types';

export const privacyCopy: PrivacyPageCopy = {
  seo: {
    title: 'Privacy Policy & Telemetry Disclosures | Sahil Langoo',
    description:
      'Statutory privacy policy, data fiduciary disclosures, and telemetry inventory for sahillangoo.in under the Digital Personal Data Protection Act, 2023 (DPDPA), GDPR, and CCPA.',
    image: '/og/privacy.png',
  },
  header: {
    badge: 'Statutory Compliance & Fiduciary Disclosure',
    title: 'Privacy Policy',
    effectiveDate: 'October 1, 2026',
    lastUpdated: 'October 7, 2026',
    description:
      'Statutory disclosure of data processing protocols, fiduciary obligations, telemetry mechanisms, and client storage architectures across sahillangoo.in pursuant to the Digital Personal Data Protection Act, 2023 and international privacy frameworks.',
  },
  overview: {
    title: 'Data Fiduciary & Architectural Scope',
    controller: 'Sahil Ahmad Langoo (Data Fiduciary under DPDPA 2023)',
    contact: 'hello@sahillangoo.in',
    summary:
      'This website operates as an engineering portfolio, technical journal, and distributed systems archive. We operate under rigorous data minimization principles: we maintain zero user registries, collect no financial or payment credentials, and execute zero data brokerage transactions. Personal data processing is restricted to infrastructure resilience, edge security diagnostics, audience measurement, and user interface optimization in compliance with the Digital Personal Data Protection Act, 2023 (DPDPA 2023, Act No. 22 of 2023), the Information Technology Act, 2000 (SPDI Rules 2011), the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679), the UK Data Protection Act 2018 (UK GDPR), and the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA).',
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
      name: 'sl_sound_effects',
      provider: 'sahillangoo.in (First-Party)',
      category: 'Functional',
      lifespan: 'Persistent (Local Storage)',
      purpose:
        'Persists client-side acoustic feedback state (enabled or disabled) for user interface navigation events without transmitting state to any server.',
    },
    {
      name: 'sl_tts_voice',
      provider: 'sahillangoo.in (First-Party)',
      category: 'Functional',
      lifespan: 'Persistent (Local Storage)',
      purpose:
        'Stores the identifier of the client-selected synthetic speech voice for on-device Web Speech API article narration.',
    },
    {
      name: 'sl_spotify_track_idx',
      provider: 'sahillangoo.in (First-Party)',
      category: 'Functional',
      lifespan: 'Persistent (Local Storage)',
      purpose:
        'Maintains playback index state for the client-side music preview component across browser sessions.',
    },
    {
      name: 'sl_weather_data',
      provider: 'sahillangoo.in (First-Party)',
      category: 'Functional',
      lifespan: '1 hour (Local Storage Cache)',
      purpose:
        'Caches ambient meteorological observations and cache timestamps locally on the device to suppress redundant external API queries.',
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
        'Operates entirely cookie-less. Does not write or read client cookies or browser local storage; telemetry is processed ephemerally at edge nodes.',
    },
  ],
  sections: [
    {
      id: 'indian-statutory-governance',
      title: 'Indian Statutory Governance & Fiduciary Mandates',
      badge: 'Statutory Mandates',
      paragraphs: [
        'Under the Digital Personal Data Protection Act, 2023 (DPDPA 2023, Act No. 22 of 2023) and the Information Technology Act, 2000, read in conjunction with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules), this digital platform is subject to statutory obligations governing digital personal data.',
        'Sahil Ahmad Langoo is designated as the "Data Fiduciary" pursuant to Section 2(i) of the DPDPA 2023, determining the purpose and means of personal data processing. Visitors accessing this web infrastructure are recognized as "Data Principals" pursuant to Section 2(j) of the Act, endowed with non-derogable statutory rights and institutional protections.',
      ],
      subsections: [
        {
          title: 'Section 4: Grounds for Processing Digital Personal Data',
          description:
            'Processing of digital personal data is conducted strictly in accordance with statutory grounds under Section 4 of the DPDPA 2023:',
          bullets: [
            'Consent-Based Grounds (Section 4(1)(a)): Digital personal data is processed only following explicit notice and voluntary consent provided by the Data Principal for non-essential telemetry or voluntary communications.',
            'Certain Legitimate Uses (Section 4(1)(b) & Section 7): Technical processing is undertaken for specified legitimate uses under Section 7, including the provision of technical services voluntarily requested by the Data Principal, network infrastructure security, and incident response.',
          ],
        },
        {
          title: 'Section 6: Notice, Transparency & Consent Architecture',
          description:
            'In adherence to Section 6 of the DPDPA 2023, this platform presents comprehensive disclosures accompanying every request for consent or data submission:',
          bullets: [
            'Itemized Notification: Data Principals are explicitly informed of the categories of digital personal data collected, specific processing purposes, and technical retention periods.',
            'Manner of Exercising Rights: Information is continuously accessible regarding the precise procedures through which Data Principals may exercise statutory rights under Section 11 through Section 14.',
            'Grievance Redressal Directives: Clear notice is provided regarding the designated Grievance Officer and the statutory right to register complaints with the Data Protection Board of India.',
            'Consent Revocation: Where processing is anchored upon consent, Data Principals maintain the unqualified right to withdraw consent at any time through client browser settings or direct electronic communication.',
          ],
        },
        {
          title: 'Section 8 & Section 16: Fiduciary Obligations & Cross-Border Framework',
          description:
            'The Data Fiduciary enforces rigorous operational controls pursuant to Section 8 and Section 16 of the DPDPA 2023:',
          bullets: [
            'Reasonable Security Safeguards (Section 8(5)): Implementation of appropriate technical and organizational measures to prevent personal data breaches, unauthorized disclosure, or unlawful modification.',
            'Cessation of Retention (Section 8(7)): Complete erasure of digital personal data as soon as the purpose for which it was collected has been achieved or upon withdrawal of consent.',
            'Cross-Border Transfers (Section 16): International data transfers comply with statutory notifications issued by the Central Government of India, ensuring transferred records receive adequate protection.',
          ],
        },
      ],
    },
    {
      id: 'audience-protocols',
      title: 'Audience-Specific Interaction & Evaluation Protocols',
      badge: 'Interaction Protocols',
      paragraphs: [
        'To maintain architectural transparency, this platform establishes distinct processing protocols based on specific visitor interactions and functional interfaces.',
      ],
      subsections: [
        {
          title: '1. Technical Hiring Managers, Recruiters & Enterprise Evaluators',
          description:
            'Protocols governing professional assessment interactions, curriculum vitae evaluations, and outbound source verification:',
          bullets: [
            'Stateless Resume Delivery: Professional resume assets, including compiled PDF artifacts and Typst source documents, are distributed through stateless Cloudflare edge caches with zero active server-side session tracking.',
            'Zero Candidate Profiling: The platform does not deploy applicant scoring engines, candidate tracking systems (ATS beacons), or behavioural profiling algorithms against enterprise visitors.',
            'Zero DRM & Zero Web Beacons: Resume PDF documents generated from Typst source files contain pure vector graphics primitives and standard hyperlinked uniform resource identifiers. They contain no embedded JavaScript runtimes, no digital rights management (DRM) wrappers, and no invisible web beacons or pingbacks.',
            'Unmonitored Outbound Repositories: External hyperlinks directing evaluators to GitHub source repositories, LinkedIn profiles, or third-party certifications execute direct client navigation without intermediate redirect trackers, referral parameter injection, or click analytics proxies.',
          ],
        },
        {
          title: '2. Engineering Blog Readers & Technical Content Consumers',
          description:
            'Protocols governing technical documentation readership, code consumption, and content accessibility features:',
          bullets: [
            'In-Memory Clipboard Operations: Code snippet copying utilities operate entirely client-side using the native browser navigator.clipboard.writeText API. Clipboard contents are never logged, inspected, or transmitted over network sockets.',
            'On-Device Web Speech Synthesis: The Article Audio Reader utility uses the native client-side window.speechSynthesis interface. All synthetic acoustic rendering is executed locally by the host operating system voice engine; zero audio streams, speech telemetry, or listener transcripts are recorded or transmitted to external servers.',
            'Machine-Readable Syndication & LLM Context: Public feeds, including RSS syndication (/rss.xml), visual sitemaps (/sitemap-index.xml), and machine-readable text corpora (/llms.txt, /llms-full.txt), are statically provisioned. Accessing these distribution endpoints produces standard edge server web log telemetry without individual reader identification.',
          ],
        },
      ],
    },
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
            'Identifiers & Attributes: GA4 relies upon pseudonymous alphanumeric client identifiers (such as _ga) to distinguish distinct sessions, record page interaction events (astro:page-load triggers, scroll milestones, and outbound link navigation), screen dimensions, and language preferences.',
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
            'Tracking Technologies Employed: Microsoft Clarity deploys first-party cookies (such as _clck and _clsk) alongside third-party identifiers to connect disparate web page transitions into coherent interaction sessions across page routing events.',
            'Opt-Out & Privacy Controls: Visitors can manage their interest-based advertising preferences and data collection settings via the Microsoft Privacy Dashboard (https://account.microsoft.com/privacy) or through cross-industry opt-out portals such as the Digital Advertising Alliance (DAA) WebChoices Tool (https://optout.aboutads.info/) and the Network Advertising Initiative (NAI) Consumer Opt-Out (https://optout.networkadvertising.org/).',
          ],
        },
      ],
    },
    {
      id: 'lawful-bases',
      title: 'Multijurisdictional Lawful Bases for Data Processing',
      badge: 'Statutory Foundations',
      paragraphs: [
        'Electronic processing of technical usage telemetry across sahillangoo.in is anchored upon recognized statutory foundations across applicable privacy legislations:',
      ],
      subsections: [
        {
          title: 'Digital Personal Data Protection Act, 2023 (DPDPA 2023, India)',
          description:
            'Processing activities within the territorial scope of India are anchored upon statutory provisions of the DPDPA 2023:',
          bullets: [
            'Section 4(1)(a) & Section 6 (Consent): Processing of optional behavioral telemetry identifiers and functional client preferences is grounded in free, specific, informed, and unambiguous consent.',
            'Section 7 (Legitimate Uses): Essential technical operations, network defense, diagnostics, and addressing direct inquiries are conducted under recognized statutory legitimate use categories.',
          ],
        },
        {
          title: 'General Data Protection Regulation (GDPR / UK GDPR)',
          description:
            'Processing activities concerning Data Subjects within the European Economic Area (EEA) and the United Kingdom comply with Article 6(1) of Regulation (EU) 2016/679 and UK GDPR:',
          bullets: [
            'Article 6(1)(f) (Legitimate Interests): Technical telemetry necessary to safeguard edge infrastructure, defeat DDoS attacks, resolve layout anomalies, and measure aggregated reader engagement.',
            'Article 6(1)(a) (Consent): Retrieval or storage of non-essential persistent cookies and behavioral markers subject to the EU ePrivacy Directive (Directive 2002/58/EC as amended).',
          ],
        },
        {
          title: 'California Consumer Privacy Act (CCPA / CPRA, United States)',
          description:
            'In compliance with the California Consumer Privacy Act as amended by the California Privacy Rights Act (Cal. Civ. Code § 1798.100 et seq.):',
          bullets: [
            'Notice at Collection: Comprehensive disclosure of categories of personal information collected and operational business purposes.',
            'Zero Sale or Sharing: The Data Fiduciary explicitly confirms that no personal information is sold, rented, released, or shared with third parties for cross-context behavioral advertising or monetary consideration.',
          ],
        },
      ],
    },
    {
      id: 'automated-signals',
      title: 'Automated Browser Signals & Client-Side Opt-Outs',
      badge: 'Technical Controls',
      paragraphs: [
        'We acknowledge modern consumer privacy standards and automated browser configuration signals designed to limit tracking surface area.',
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
            'You may configure your browser software to reject all third-party cookies, clear existing cache artifacts, block cross-site tracking scripts, or alert you when cookies are dispatched. Consult the configuration documentation for your respective browser engine (Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge). Please note that disabling browser storage mechanisms may alter cosmetic preference persistence, such as your selected dark or light visual theme.',
        },
      ],
    },
    {
      id: 'retention-transfers',
      title: 'Data Retention Schedules & Transborder Data Flows',
      badge: 'Lifecycle & Geography',
      paragraphs: [
        'We adhere to strict temporal retention boundaries pursuant to Section 8(7) of the DPDPA 2023 and GDPR Article 5(1)(e) to prevent unnecessary data persistence. Telemetry logs and pseudonymous records are archived only for the duration essential to fulfill diagnostic and analytical requirements:',
      ],
      subsections: [
        {
          title: 'Retention Timeframes',
          description: 'Operational retention windows are enforced per processor category:',
          bullets: [
            'Google Analytics 4: User-level and event-level exploratory records are configured with an automated expiration cycle of two (2) months to fourteen (14) months, after which aggregated records are systematically purged.',
            'Microsoft Clarity: Session replay recordings and raw behavioral interaction sequences are retained on Microsoft cloud infrastructure for a maximum rolling window of thirty (30) to ninety (90) days pursuant to standard Clarity data lifecycles.',
            'Cloudflare Web Analytics: Aggregated performance metrics are preserved for historical trend inspection, with raw IP-derived request streams discarded instantaneously at edge runtime.',
            'Local Browser Storage: Client-side preference tokens remain stored locally on the client hardware until cleared by the user or invalidated by storage retention timers (such as 1 hour for meteorological cache).',
          ],
        },
        {
          title: 'Transborder Data Flows (DPDPA Section 16 & GDPR Chapter V)',
          description:
            'Due to the globally distributed architecture of Cloudflare Pages edge networks, Google cloud clusters, and Microsoft infrastructure, collected telemetry may be transmitted to, stored in, and processed within jurisdictions outside India or the EEA, including the United States. International transfers comply with Section 16 of the DPDPA 2023 and Chapter V of the GDPR via European Commission Standard Contractual Clauses (SCCs), UK International Data Transfer Agreements (IDTAs), and the EU-U.S. Data Privacy Framework.',
        },
      ],
    },
    {
      id: 'security-architecture',
      title: 'Technical Security & Cryptographic Safeguards',
      badge: 'Defensive Engineering',
      paragraphs: [
        'In conformity with Section 8(5) of the DPDPA 2023 and GDPR Article 32 (Security of Processing), we enforce comprehensive administrative, technical, and architectural countermeasures to safeguard all data transmitted to and from this platform:',
        '1. Universal Transport Encryption: All network communication is mandated through Transport Layer Security (TLS 1.3 / TLS 1.2) utilizing modern cipher suites and HTTP Strict Transport Security (HSTS) with preloading.',
        '2. Edge Defense & Firewall Hardening: Network edge traffic is routed through Cloudflare Web Application Firewall (WAF) to mitigate zero-day vulnerabilities, malicious scraping bots, and DDoS amplification attempts.',
        '3. Content Security Policies & Subresource Integrity: External script inclusions are strictly restricted to audited domains (Cloudflare Insights, Google Tag Manager, and Microsoft Clarity) with rigorous origin validation and worker sandbox containment.',
      ],
    },
    {
      id: 'grievance-redressal',
      title: 'Designated Grievance Redressal Mechanism & Regulatory Escalation',
      badge: 'Statutory Recourse',
      paragraphs: [
        'In strict adherence to Section 8(9) and Section 13 of the Digital Personal Data Protection Act, 2023, the Data Fiduciary has instituted an expeditious, transparent grievance redressal channel to resolve complaints or inquiries from Data Principals.',
      ],
      subsections: [
        {
          title: 'Designated Grievance Officer Contact Details',
          description:
            'Data Principals may submit formal inquiries, grievances, or requests concerning the processing of their digital personal data directly to the designated officer:',
          bullets: [
            'Officer Name: Sahil Ahmad Langoo',
            'Designation: Data Fiduciary & Grievance Officer',
            'Statutory Jurisdiction: Srinagar, Jammu & Kashmir, India - 190001',
            'Electronic Channel: hello@sahillangoo.in',
            'Response Protocol: Formal acknowledgments are rendered within 48 hours of receipt; substantive resolutions are provided within a maximum statutory timeframe of thirty (30) calendar days.',
          ],
        },
        {
          title: 'Escalation to the Data Protection Board of India (DPBI)',
          description:
            'Pursuant to Section 13(3) and Section 18 of the DPDPA 2023, if a Data Principal is aggrieved by the resolution rendered by the Data Fiduciary, or if no response is provided within thirty (30) days from the filing of the grievance, the Data Principal has the statutory right to escalate the dispute and lodge a formal complaint before the Data Protection Board of India (DPBI).',
        },
      ],
    },
  ],
  rightsTitle: 'Data Principal & Data Subject Statutory Rights',
  rightsDescription:
    'Under the Digital Personal Data Protection Act, 2023 (DPDPA Sections 11 through 14), the General Data Protection Regulation (GDPR Articles 15 through 22), and the California Consumer Privacy Act (CCPA/CPRA), visitors possess enforceable legal entitlements regarding their digital personal data:',
  rights: [
    {
      title: 'Right to Access Information (DPDPA Sec. 11 / GDPR Art. 15)',
      description:
        'Data Principals have the right to obtain a summary of digital personal data being processed, processing activities undertaken, and identities of all Data Fiduciaries and Data Processors with whom personal data has been shared.',
    },
    {
      title: 'Right to Correction & Erasure (DPDPA Sec. 12 / GDPR Art. 16 & 17)',
      description:
        'Data Principals maintain the statutory right to rectify inaccurate or misleading personal data, complete incomplete records, update data, and require the erasure of personal data that is no longer necessary for the specified processing purpose.',
    },
    {
      title: 'Right of Grievance Redressal (DPDPA Sec. 13)',
      description:
        'Data Principals are entitled to readily accessible redressal mechanisms provided by the Data Fiduciary in respect of any act or omission regarding performance of obligations under the Act.',
    },
    {
      title: 'Right to Nominate (DPDPA Sec. 14)',
      description:
        'Data Principals have the statutory right to designate, in accordance with applicable statutory rules, any individual who shall, in the event of death or incapacity of the Data Principal, exercise the rights conferred by the Act.',
    },
    {
      title: 'Right to Restrict & Object (GDPR Art. 18 & 21)',
      description:
        'EEA and UK Data Subjects have the right to request restriction of processing, object to processing conducted on legitimate interest grounds, and obtain machine-readable copies of personal data (data portability under GDPR Art. 20).',
    },
    {
      title: 'California Consumer Privacy Rights (CCPA / CPRA Protections)',
      description:
        'California consumers possess the right to know, delete, and correct personal information, and the right to freedom from discrimination. The Data Fiduciary does not sell or share personal data for valuable consideration.',
    },
    {
      title: 'Right to Lodge Regulatory Complaints',
      description:
        'Data Principals in India may escalate unresolved grievances to the Data Protection Board of India (DPBI). Data Subjects within the European Union maintain the right to lodge complaints with their competent National Supervisory Authority pursuant to GDPR Article 77.',
    },
  ],
  contactSection: {
    title: 'Statutory Privacy Office & Regulatory Communication',
    description:
      'To exercise statutory rights under the Digital Personal Data Protection Act, 2023, the GDPR, or the CCPA/CPRA, or to submit a formal inquiry to the Data Fiduciary, please communicate via our designated electronic channel. All communications are reviewed pursuant to statutory schedules.',
    email: 'hello@sahillangoo.in',
  },
};
