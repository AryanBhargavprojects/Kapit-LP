import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const errors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/errors' }),
  schema: z.object({}).passthrough(),
});

export const collections = { errors };
