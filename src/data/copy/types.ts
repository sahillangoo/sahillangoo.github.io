export interface PageSeoMetadata {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
}

export interface HomeFact {
  label: string;
  value: string;
  note?: string;
  href?: string;
  icon?: string;
}

export interface HomePageCopy {
  seo: PageSeoMetadata;
  hero: {
    kicker: string;
    name: string;
    leadBefore: string;
    leadEmphasis: string;
    leadAfter: string;
    leadMuted: string;
    bioBefore: string;
    bioCompany: string;
    bioMiddle: string;
    bioStudio: string;
    bioAfter: string;
    imageAlt: string;
    imageQuote: string;
    resumeLabel: string;
    workLabel: string;
  };
  snapshot: {
    value: string;
    label: string;
    note: string;
    href?: string;
    facts: HomeFact[];
  };
  sections: {
    selectedWork: {
      index: string;
      title: string;
      description: string;
      viewAllText: string;
    };
    careerHistory: {
      index: string;
      title: string;
      description: string;
      viewAllText: string;
    };
    recentWriting: {
      index: string;
      title: string;
      description: string;
      viewAllText: string;
    };
    philosophy: {
      index: string;
      title: string;
      description: string;
    };
    about: {
      index: string;
      title: string;
      pull: string;
      paragraphs: string[];
      facts: HomeFact[];
    };
    contact: {
      title: string;
      description: string;
      email: string;
      openToLabel: string;
      openTo: string[];
      ctas: CtaButton[];
    };
  };
}

export interface AboutPageCopy {
  seo: PageSeoMetadata;
  hero: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
  };
  principles: {
    title: string;
  };
  dailyStack: {
    title: string;
    groups: {
      label: string;
      value: string;
    }[];
  };
  connectCta: {
    title: string;
    description: string;
    cta: CtaButton;
  };
}

export interface ProjectsPageCopy {
  seo: PageSeoMetadata;
  header: {
    badge: string;
    title: string;
    description: string;
  };
}

export interface BlogPageCopy {
  seo: {
    title: string;
    pageTitleSuffix: (page: number) => string;
    description: string;
  };
  header: {
    badgePrefix: string;
    title: string;
    description: string;
    topicsLabel: string;
  };
}

export interface NowPageCopy {
  seo: PageSeoMetadata;
  header: {
    badge: string;
    title: string;
    description: string;
  };
  sections: {
    category: string;
    icon: string;
    items: string[];
  }[];
  availabilityCard: {
    title: string;
    description: string;
    cta: CtaButton;
  };
}

export interface UsesPageCopy {
  seo: PageSeoMetadata;
  header: {
    badge: string;
    title: string;
    description: string;
  };
  sections: {
    title: string;
    icon: string;
    items: {
      name: string;
      description: string;
    }[];
  }[];
}

export interface ColophonPageCopy {
  seo: PageSeoMetadata;
  header: {
    badge: string;
    title: string;
    description: string;
  };
  sections: {
    specificationsTitle: string;
    specifications: {
      label: string;
      value: string;
    }[];
    principlesTitle: string;
    principles: {
      title: string;
      description: string;
    }[];
  };
}

export interface ResumePageCopy {
  seo: PageSeoMetadata;
  header: {
    eyebrow: string;
    roleSubtitle: string;
    downloadCta?: CtaButton;
    roleResumes?: { label: string; href: string }[];
    contactCta: CtaButton;
    githubCta: CtaButton;
  };
  sections: {
    executiveSummary: string;
    professionalExperience: string;
    technicalProjects?: string;
    coreCompetencies: string;
    languagesTitle: string;
    frameworksTitle: string;
    cloudTitle: string;
    databasesToolsTitle: string;
    educationTitle: string;
    certificationsTitle: string;
  };
}

export interface LinksPageCopy {
  seo: PageSeoMetadata;
  header: {
    initials: string;
  };
  mainSiteCard: {
    title: string;
    description: string;
    href: string;
  };
}

export interface NotFoundPageCopy {
  seo: PageSeoMetadata;
  code: string;
  title: string;
  description: string;
  homeButton: CtaButton;
}

export interface NavigationCopy {
  brand: {
    name: string;
    tagline: string;
  };
  footerNav: {
    label: string;
    href: string;
  }[];
  footerSections: {
    navigation: {
      title: string;
      links: { label: string; href: string }[];
    };
    system: {
      title: string;
      links: { label: string; href: string }[];
    };
    connect: {
      title: string;
    };
  };
  footerTelemetry: {
    copyright: (year: number) => string;
  };
}

export interface PrivacyCookieItem {
  name: string;
  provider: string;
  category: 'Essential' | 'Analytics' | 'Behavioral';
  lifespan: string;
  purpose: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  badge?: string;
  paragraphs: string[];
  subsections?: {
    title: string;
    description: string;
    bullets?: string[];
  }[];
}

export interface PrivacyPageCopy {
  seo: PageSeoMetadata;
  header: {
    badge: string;
    title: string;
    effectiveDate: string;
    lastUpdated: string;
    description: string;
  };
  overview: {
    title: string;
    controller: string;
    contact: string;
    summary: string;
  };
  cookiesTableTitle: string;
  cookiesTableDescription: string;
  cookies: PrivacyCookieItem[];
  sections: PrivacySection[];
  rightsTitle: string;
  rightsDescription: string;
  rights: {
    title: string;
    description: string;
  }[];
  contactSection: {
    title: string;
    description: string;
    email: string;
  };
}
