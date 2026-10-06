import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// Shared Reusable Primitives & Sub-Schemas
// ---------------------------------------------------------------------------
const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must conform to ISO 8601 YYYY-MM-DD');

const stringArrayDefaultEmpty = z.array(z.string()).default([]);
const defaultOrderSchema = z.number().default(99);

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// ---------------------------------------------------------------------------
// Collection Schema Definitions
// ---------------------------------------------------------------------------
export const projectCategorySchema = z.enum([
  'web-app',
  'open-source',
  'cli-tool',
  'systems',
  'design-engineering',
]);

export const projectSchema = z.object({
  title: z.string(),
  resumeTitle: z.string().optional(),
  description: z.string(),
  summary: z.string().optional(),
  category: projectCategorySchema,
  tags: stringArrayDefaultEmpty,
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  featuredImage: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  year: z.number().int(),
  role: z.string().default('Lead Engineer / Designer'),
  order: defaultOrderSchema,
  publishDate: isoDateSchema,
  highlights: z.array(z.string()).optional(),
});

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  companyUrl: z.string().optional(),
  location: z.string(),
  period: z.string(),
  current: z.boolean().default(false),
  highlights: z.array(z.string()),
  skills: stringArrayDefaultEmpty,
  order: defaultOrderSchema,
});

export const siteSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  about: z.string(),
  skills: z.object({
    languages: z.array(z.string()),
    frameworks: z.array(z.string()),
    databases: z.array(z.string()),
    cloud: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  principles: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

export const linkCategorySchema = z.enum(['social', 'work', 'writing', 'resource', 'contact']);

export const linkSchema = z.object({
  title: z.string(),
  url: z.string(),
  category: linkCategorySchema,
  order: defaultOrderSchema,
  highlight: z.boolean().default(false),
  description: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Inferred TypeScript Types
// ---------------------------------------------------------------------------
export type ProjectEntryData = z.infer<typeof projectSchema>;
export type ExperienceEntryData = z.infer<typeof experienceSchema>;
export type SiteEntryData = z.infer<typeof siteSchema>;
export type LinkEntryData = z.infer<typeof linkSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;

export interface BlogEntryData {
  title: string;
  description: string;
  publishDate: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage?: unknown;
  draft: boolean;
  readingTime?: string;
  faqs?: FaqItem[];
}

// ---------------------------------------------------------------------------
// Defined Collections
// ---------------------------------------------------------------------------
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: isoDateSchema,
      updatedDate: isoDateSchema.optional(),
      category: z.string().default('Engineering'),
      tags: stringArrayDefaultEmpty,
      featured: z.boolean().default(false),
      coverImage: image().optional(),
      draft: z.boolean().default(false),
      readingTime: z.string().optional(),
      faqs: z.array(faqItemSchema).optional(),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/experience' }),
  schema: experienceSchema,
});

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/site' }),
  schema: siteSchema,
});

const links = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/links' }),
  schema: linkSchema,
});

export const collections = {
  projects,
  blog,
  experience,
  site,
  links,
};
