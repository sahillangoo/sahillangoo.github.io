import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    category: z.enum(['web-app', 'open-source', 'cli-tool', 'systems', 'design-engineering']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    featuredImage: z.string().optional(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    year: z.number().int(),
    role: z.string().default('Lead Engineer / Designer'),
    order: z.number().default(99),
    publishDate: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string().default('Engineering'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.string(),
    topic: z.string().default('General'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().optional(),
    location: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
    highlights: z.array(z.string()),
    skills: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/site' }),
  schema: z.object({
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
  }),
});

const links = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/links' }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    category: z.enum(['social', 'work', 'writing', 'resource', 'contact']),
    order: z.number().default(99),
    highlight: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = {
  projects,
  blog,
  notes,
  experience,
  site,
  links,
};
