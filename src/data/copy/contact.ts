import type { ContactPageCopy } from './types';

export const contactCopy: ContactPageCopy = {
  seo: {
    title: 'Contact & Engineering Inquiries | Sahil Langoo',
    description:
      'Get in touch with Sahil Langoo for software engineering, system architecture consulting, open-source collaboration, or project inquiries.',
    image: '/og/contact.png',
  },
  header: {
    eyebrow: 'Inquiries',
    title: 'Start a Conversation',
    description:
      'Available for full-stack systems engineering roles, distributed edge architectures, and select technical consulting. Direct inquiries typically receive a response within 24 hours.',
  },
  sidebar: {
    emailLabel: 'Direct Email',
    locationLabel: 'Location & Timezone',
    statusLabel: 'Current Status',
    verifiedProfilesLabel: 'Verified Profiles',
  },
  form: {
    title: 'Send a Message',
    description:
      'Fill out the details below to initialize a direct email draft, or email directly at hello@sahillangoo.in.',
    nameLabel: 'Your Name',
    namePlaceholder: 'e.g. Alex Rivera',
    emailLabel: 'Your Email',
    emailPlaceholder: 'e.g. alex@company.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'e.g. Systems Engineering Role / Consulting Inquiry',
    messageLabel: 'Message & Scope',
    messagePlaceholder: 'Outline the technical problem, project goals, timeline, and tech stack...',
    submitButton: 'Send Message',
    submittingButton: 'Preparing...',
    statusSuccess: 'Opening your default mail client...',
  },
};
