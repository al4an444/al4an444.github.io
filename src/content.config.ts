import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    project: z.string(),
    date: z.coerce.date(),
    severity: z.string().optional(),
    status: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research };
