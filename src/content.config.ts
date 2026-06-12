import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.record(z.unknown()),
});

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: articleSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog/en' }),
  schema: articleSchema,
});

const newsletter = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/newsletter' }),
  schema: articleSchema.extend({
    edition: z.number().optional(),
  }),
});

const newsletterEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/newsletter/en' }),
  schema: articleSchema.extend({
    edition: z.number().optional(),
  }),
});

export const collections = { pages, blog, blogEn, newsletter, newsletterEn };
