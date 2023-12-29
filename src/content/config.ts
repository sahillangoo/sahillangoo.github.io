import { z, defineCollection, reference } from 'astro:content';

// Define common schema properties
const commonSchema = (collectionName: string) =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    // canonicalURL: z.string().url().optional(),
  });

// Define blog-specific schema properties
const blogSchema = commonSchema('blog').extend({
  category: z.enum(['tech', 'life', 'movies', 'web', 'misc']).optional(),
});

// Define project-specific schema properties
const projectSchema = commonSchema('projects').extend({
  category: z.enum(['web', 'mobile', 'desktop', 'misc']).optional(),
  githubLink: z.string().optional(),
  projectLink: z.string().optional(),
});

const blog = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = { blog, projects };
